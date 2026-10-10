"""GitHub Actions script: checks each payload repo for new releases and downloads updates."""
import glob, json, os, re, shutil, sys, tempfile, urllib.request, zipfile

PAYLOADS = "payloads"
KEXP = "src/kexp.js"
VERSIONS_FILE = ".github/payload-versions.json"

VER_CONSTS = {
    "blackbox": "BLACKBOX_VER",
    "CheatRunner": "CHEATRUNNER_VER",
    "ShadowMountPlus": "SHADOWMOUNT_VER",
    "PS5SX2": "EMU_PS5SX2_VER",
    "snes9x": "EMU_SNES9X_VER",
    "XPSemu": "EMU_XPSEMU_VER",
    "PS5X360": "EMU_PS5X360_VER",
    "Porpoise": "EMU_PORPOISE_VER",
    "PS5CEMU-HAR": "EMU_PS5CEMU_VER",
    "ProsperoEden": "EMU_PROSPEROEDEN_VER",
    "PS5_RPCS3": "EMU_PS5RPCS3_VER",
    "PS5_RetroArch": "EMU_PS5RA_VER",
}

PATH_CONSTS = {
    "snes9x": "EMU_SNES9X_ELF",
    "Porpoise": "EMU_PORPOISE_ZIP",
    "PS5CEMU-HAR": "EMU_PS5CEMU_ZIP",
    "ProsperoEden": "EMU_PROSPEROEDEN_ZIP",
    "PS5SX2_zip": "EMU_PS5SX2_ZIP",
}

with open(VERSIONS_FILE) as f:
    versions = json.load(f)

gh_token = os.environ.get("GH_TOKEN", "")
changed = [False]


def gh_get(url):
    req = urllib.request.Request(url, headers={
        "Authorization": f"Bearer {gh_token}",
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    })
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read())


def cb_get(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read())


def download(url, dest):
    os.makedirs(os.path.dirname(dest) or ".", exist_ok=True)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=300) as r, open(dest, "wb") as f:
        while True:
            chunk = r.read(65536)
            if not chunk:
                break
            f.write(chunk)


def find_asset(release, pattern):
    for a in release.get("assets", []):
        if re.search(pattern, a["name"]):
            return a["browser_download_url"], a["name"]
    return None, None


def gh_release(repo):
    try:
        return gh_get(f"https://api.github.com/repos/{repo}/releases/latest")
    except Exception:
        rels = gh_get(f"https://api.github.com/repos/{repo}/releases?per_page=10")
        for rel in rels:
            if rel.get("draft"):
                continue
            if rel.get("assets"):
                return rel
        raise RuntimeError("no usable release")


def update_kexp_const(const, new_val):
    with open(KEXP) as f:
        content = f.read()
    m = re.search(rf'const {const} = "([^"]+)"', content)
    if m and m.group(1) != new_val:
        content = re.sub(
            rf'const {const} = "[^"]+"',
            f'const {const} = "{new_val}"',
            content,
            count=1,
        )
        with open(KEXP, "w") as f:
            f.write(content)
        print(f"  kexp.js: {const} = {new_val}")


def remove_old_versioned(prefix_glob, keep_name):
    for f in glob.glob(f"{PAYLOADS}/{prefix_glob}"):
        if os.path.basename(f) != keep_name:
            print(f"  removing {os.path.basename(f)}")
            os.remove(f)


def extract_title(zip_path, dest_dir, title_id):
    if os.path.isdir(dest_dir):
        shutil.rmtree(dest_dir)
    os.makedirs(dest_dir, exist_ok=True)
    prefix = title_id + "/"
    with zipfile.ZipFile(zip_path) as z:
        for name in z.namelist():
            if name.endswith("/"):
                continue
            rel = None
            idx = name.find(prefix)
            if idx >= 0:
                rel = name[idx + len(prefix):]
            elif "/" not in name.rstrip("/"):
                rel = name
            if not rel:
                continue
            out = os.path.join(dest_dir, rel.replace("/", os.sep))
            os.makedirs(os.path.dirname(out), exist_ok=True)
            with z.open(name) as src, open(out, "wb") as dst:
                dst.write(src.read())
    print(f"  extracted {title_id} -> {dest_dir}")


def update_fixed_gh(key, repo, asset_pat, dest):
    print(f"\n--- {dest}")
    try:
        rel = gh_release(repo)
    except Exception as e:
        print(f"  skipped: {e}")
        return
    tag = rel.get("tag_name", "unknown")
    if versions.get(key) == tag:
        print(f"  up to date ({tag})")
        return
    url, name = find_asset(rel, asset_pat)
    if not url:
        print(f"  no matching asset")
        return
    tmp = tempfile.mktemp(suffix=".elf")
    print(f"  downloading {name} ({tag})")
    download(url, tmp)
    shutil.move(tmp, f"{PAYLOADS}/{dest}")
    versions[key] = tag
    if key in VER_CONSTS:
        update_kexp_const(VER_CONSTS[key], tag)
    changed[0] = True


def update_fixed_zip_gh(key, repo, asset_pat, inner, dest):
    print(f"\n--- {dest} (zip)")
    try:
        rel = gh_release(repo)
    except Exception as e:
        print(f"  skipped: {e}")
        return
    tag = rel.get("tag_name", "unknown")
    if versions.get(key) == tag:
        print(f"  up to date ({tag})")
        return
    url, name = find_asset(rel, asset_pat)
    if not url:
        print(f"  no matching asset")
        return
    tmpzip = tempfile.mktemp(suffix=".zip")
    print(f"  downloading {name} ({tag})")
    download(url, tmpzip)
    with zipfile.ZipFile(tmpzip) as z:
        with z.open(inner) as src, open(f"{PAYLOADS}/{dest}", "wb") as dst:
            dst.write(src.read())
    os.unlink(tmpzip)
    versions[key] = tag
    if key in VER_CONSTS:
        update_kexp_const(VER_CONSTS[key], tag)
    changed[0] = True


def update_versioned_gh(key, repo, asset_pat, glob_prefix, const):
    print(f"\n--- {const} (versioned)")
    try:
        rel = gh_release(repo)
    except Exception as e:
        print(f"  skipped: {e}")
        return
    tag = rel.get("tag_name", "unknown")
    if versions.get(key) == tag:
        print(f"  up to date ({tag})")
        return
    url, name = find_asset(rel, asset_pat)
    if not url:
        print(f"  no matching asset")
        return
    print(f"  downloading {name} ({tag})")
    download(url, f"{PAYLOADS}/{name}")
    remove_old_versioned(glob_prefix, name)
    update_kexp_const(const, name)
    versions[key] = tag
    changed[0] = True


def update_versioned_cb(key, repo, asset_pat, glob_prefix, const):
    print(f"\n--- {const} (versioned, Codeberg)")
    try:
        rels = cb_get(f"https://codeberg.org/api/v1/repos/{repo}/releases?limit=1")
        rel = rels[0]
    except Exception as e:
        print(f"  skipped: {e}")
        return
    tag = rel.get("tag_name", "unknown")
    if versions.get(key) == tag:
        print(f"  up to date ({tag})")
        return
    url, name = find_asset(rel, asset_pat)
    if not url:
        print(f"  no matching asset")
        return
    print(f"  downloading {name} ({tag})")
    download(url, f"{PAYLOADS}/{name}")
    remove_old_versioned(glob_prefix, name)
    update_kexp_const(const, name)
    versions[key] = tag
    changed[0] = True


def update_emu_asset(key, repo, asset_pat, dest_rel, path_const=None, extract_title_id=None, skip_download=False):
    print(f"\n--- {dest_rel}")
    try:
        rel = gh_release(repo)
    except Exception as e:
        print(f"  skipped: {e}")
        return None
    tag = rel.get("tag_name", "unknown")
    url, name = find_asset(rel, asset_pat)
    if not url:
        print(f"  no matching asset")
        return tag
    dest_dir = os.path.dirname(f"{PAYLOADS}/{dest_rel}")
    # dest_rel may use the asset filename; rewrite if the pattern captures a new name.
    if dest_rel.endswith("/") or dest_rel.endswith("*"):
        dest = f"{PAYLOADS}/{os.path.dirname(dest_rel)}/{name}" if dest_rel.endswith("*") else f"{PAYLOADS}/{dest_rel}{name}"
        rel_out = dest[len(PAYLOADS) + 1:]
    elif "{name}" in dest_rel:
        rel_out = dest_rel.replace("{name}", name)
        dest = f"{PAYLOADS}/{rel_out}"
    else:
        dest = f"{PAYLOADS}/{dest_rel}"
        rel_out = dest_rel
        # If the on-disk name is versioned, keep the GitHub asset name instead.
        if os.path.basename(dest_rel).count(".") >= 1 and name != os.path.basename(dest_rel):
            if re.search(r"v?\d", os.path.basename(dest_rel)):
                rel_out = os.path.dirname(dest_rel) + "/" + name
                dest = f"{PAYLOADS}/{rel_out}"
    if versions.get(key) == tag and os.path.isfile(dest):
        print(f"  up to date ({tag})")
        return tag
    if skip_download:
        print(f"  tag {tag} (download skipped, file is gitignored or too large)")
        versions[key] = tag
        if key in VER_CONSTS:
            update_kexp_const(VER_CONSTS[key], tag)
        changed[0] = True
        return tag
    print(f"  downloading {name} ({tag})")
    tmp = tempfile.mktemp(suffix=os.path.splitext(name)[1] or ".bin")
    download(url, tmp)
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    shutil.move(tmp, dest)
    if path_const:
        update_kexp_const(path_const, rel_out)
    if key in VER_CONSTS:
        update_kexp_const(VER_CONSTS[key], tag)
    if extract_title_id:
        extract_title(dest, os.path.join(os.path.dirname(dest), extract_title_id), extract_title_id)
    versions[key] = tag
    changed[0] = True
    return tag


def update_emu_versioned_dir(key, repo, asset_pat, dest_dir, glob_pat, path_const, extract_title_id=None):
    print(f"\n--- {dest_dir}")
    try:
        rel = gh_release(repo)
    except Exception as e:
        print(f"  skipped: {e}")
        return
    tag = rel.get("tag_name", "unknown")
    if versions.get(key) == tag:
        print(f"  up to date ({tag})")
        return
    url, name = find_asset(rel, asset_pat)
    if not url:
        print(f"  no matching asset")
        return
    dest = f"{PAYLOADS}/{dest_dir}/{name}"
    print(f"  downloading {name} ({tag})")
    download(url, dest)
    remove_old_versioned(f"{dest_dir}/{glob_pat}", name)
    rel_out = f"{dest_dir}/{name}"
    if path_const:
        update_kexp_const(path_const, rel_out)
    if key in VER_CONSTS:
        update_kexp_const(VER_CONSTS[key], tag)
    if extract_title_id:
        extract_title(dest, f"{PAYLOADS}/{dest_dir}/{extract_title_id}", extract_title_id)
    versions[key] = tag
    changed[0] = True


# ── run ───────────────────────────────────────────────────────────────────────

update_fixed_gh("np-fake-signin", "earthonion/np-fake-signin",  r"np-fake-signin-ps5\.elf$",  "np-fake-signin-ps5.elf")
update_fixed_gh("CheatRunner",    "notmaj0r/CheatRunner",        r"CheatRunner\.elf$",         "CheatRunner.elf")
update_fixed_gh("blackbox",       "D3ATHLY/blackbox",            r"^blackbox\.elf$",           "blackbox.elf")
update_fixed_gh("blackbox_ffpkg", "D3ATHLY/blackbox",            r"^PPSA01453\.ffpkg$",        "PPSA01453.ffpkg")
# Prefer the direct ELF; fall back to the zip if a release only ships a zip.
print("\n--- shadowmountplus.elf")
try:
    sm = gh_release("drakmor/ShadowMountPlus")
    sm_tag = sm.get("tag_name", "unknown")
    if versions.get("ShadowMountPlus") == sm_tag:
        print(f"  up to date ({sm_tag})")
    else:
        url, name = find_asset(sm, r"^shadowmountplus\.elf$")
        if url:
            print(f"  downloading {name} ({sm_tag})")
            download(url, f"{PAYLOADS}/shadowmountplus.elf")
            versions["ShadowMountPlus"] = sm_tag
            update_kexp_const("SHADOWMOUNT_VER", sm_tag)
            changed[0] = True
        else:
            update_fixed_zip_gh("ShadowMountPlus", "drakmor/ShadowMountPlus", r"ShadowMountPlus.*\.zip$", "shadowmountplus.elf", "shadowmountplus.elf")
except Exception as e:
    print(f"  skipped: {e}")
update_versioned_gh("webkit-autoloader", "itsPLK/ps5-webkit-autoloader", r"webkit-autoloader-installer_v.*.elf$", "webkit-autoloader-installer_v*.elf", "AUTOLOADER_ELF")
update_versioned_cb("AnyPad",     "elmonomalva0/Any-Pad-ps5",    r"AnyPad-PS5-.*\.elf$",      "AnyPad-PS5-*.elf", "ANYPAD_ELF")

# Emulators — zip/elf names are rewritten in kexp.js when the GitHub tag moves.
update_fixed_gh("PS5SX2", "Swordpdf/PS5SX2", r"ps5sx2-aio\.elf$", "emulators/PS5SX2/PS5SXHelper.elf")
update_emu_versioned_dir("PS5SX2_zip", "Swordpdf/PS5SX2", r"^PS5SX2-vk-.*\.zip$", "emulators/PS5SX2", "PS5SX2-vk-*.zip", "EMU_PS5SX2_ZIP", "PPSA99203")
# Keep the SX2 app version in lockstep with the zip tag (aio SHA can stay the same).
if versions.get("PS5SX2_zip"):
    update_kexp_const("EMU_PS5SX2_VER", versions["PS5SX2_zip"])
    versions["PS5SX2"] = versions["PS5SX2_zip"]

update_emu_versioned_dir("snes9x", "MisterTemaki/snes9xPS5", r"^Snes9xPS5-v.*\.elf$", "emulators/snes9x", "Snes9xPS5-v*.elf", "EMU_SNES9X_ELF")
update_fixed_gh("XPSemu_helper", "ZiZc3/XPSemu", r"^helper\.elf$", "emulators/XPSemu/helper.elf")
update_emu_versioned_dir("XPSemu", "ZiZc3/XPSemu", r"^PPSA97358\.zip$", "emulators/XPSemu", "PPSA97358.zip", None, "PPSA97358")
update_emu_versioned_dir("PS5X360", "BrinooTk/PS5X360", r"^PPSA50011\.zip$", "emulators/PS5X360", "PPSA50011.zip", None)
update_emu_versioned_dir("Porpoise", "elripalda/Porpoise-Dolphin-Emulator-for-PS5", r"^Porpoise-.*\.zip$", "emulators/Porpoise", "Porpoise-*.zip", "EMU_PORPOISE_ZIP")
update_emu_versioned_dir("PS5CEMU-HAR", "premohq/PS5CEMU-HAR", r"^PS5CEMU-HAR-v.*\.zip$", "emulators/PS5CEMU-HAR", "PS5CEMU-HAR-v*.zip", "EMU_PS5CEMU_ZIP")
update_emu_versioned_dir("ProsperoEden", "blackbearreloaded/ProsperoEden", r"^ProsperoEden-v.*\.zip$", "emulators/ProsperoEden", "ProsperoEden-v*.zip", "EMU_PROSPEROEDEN_ZIP")
update_emu_asset("PS5_RPCS3", "dmzebro/PS5_RPCS3", r"^PPSA42674\.zip$", "emulators/PS5_RPCS3/PPSA42674.zip", skip_download=True)
update_emu_asset("PS5_RetroArch", "mihawk-99/PS5_RetroArch", r"^PS5_RetroArch-.*\.zip$", "emulators/PS5_RetroArch/PS5_RetroArch-v1.0.0-beta1.zip", path_const="EMU_PS5RA_ZIP", skip_download=True)

# ── save & output ─────────────────────────────────────────────────────────────

with open(VERSIONS_FILE, "w") as f:
    json.dump(versions, f, indent=2)
    f.write("\n")

gh_out = os.environ.get("GITHUB_OUTPUT", "")
if gh_out:
    with open(gh_out, "a") as f:
        f.write(f"changed={'true' if changed[0] else 'false'}\n")

print(f"\nResult: changed={changed[0]}")
