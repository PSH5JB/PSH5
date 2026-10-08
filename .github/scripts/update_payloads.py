"""GitHub Actions script: checks each payload repo for new releases and downloads updates."""
import glob, json, os, re, shutil, sys, tempfile, urllib.request, zipfile

PAYLOADS = "payloads"
KEXP = "src/kexp.js"
VERSIONS_FILE = ".github/payload-versions.json"

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
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=120) as r, open(dest, "wb") as f:
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


def update_kexp_const(const, new_val):
    with open(KEXP) as f:
        content = f.read()
    m = re.search(rf'const {const} = "([^"]+)"', content)
    if m and m.group(1) != new_val:
        content = re.sub(
            rf'const {const} = "[^"]+"',
            f'const {const} = "{new_val}"',
            content,
        )
        with open(KEXP, "w") as f:
            f.write(content)
        print(f"  kexp.js: {const} = {new_val}")


def remove_old_versioned(prefix_glob, keep_name):
    for f in glob.glob(f"{PAYLOADS}/{prefix_glob}"):
        if os.path.basename(f) != keep_name:
            print(f"  removing {os.path.basename(f)}")
            os.remove(f)


def update_fixed_gh(key, repo, asset_pat, dest):
    print(f"\n--- {dest}")
    try:
        rel = gh_get(f"https://api.github.com/repos/{repo}/releases/latest")
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
    changed[0] = True


def update_fixed_zip_gh(key, repo, asset_pat, inner, dest):
    print(f"\n--- {dest} (zip)")
    try:
        rel = gh_get(f"https://api.github.com/repos/{repo}/releases/latest")
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
    changed[0] = True


def update_versioned_gh(key, repo, asset_pat, glob_prefix, const):
    print(f"\n--- {const} (versioned)")
    try:
        rel = gh_get(f"https://api.github.com/repos/{repo}/releases/latest")
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


# ── run ───────────────────────────────────────────────────────────────────────

update_fixed_gh("np-fake-signin", "earthonion/np-fake-signin",  r"np-fake-signin-ps5\.elf$",  "np-fake-signin-ps5.elf")
update_fixed_gh("CheatRunner",    "notmaj0r/CheatRunner",        r"CheatRunner\.elf$",         "CheatRunner.elf")
update_fixed_gh("blackbox",       "D3ATHLY/blackbox",            r"^blackbox\.elf$",           "blackbox.elf")
update_fixed_zip_gh("ShadowMountPlus", "drakmor/ShadowMountPlus", r"\.zip$",                  "shadowmountplus.elf", "shadowmountplus.elf")
update_versioned_gh("pldmgr",     "itsPLK/ps5-payload-manager",  r"pldmgr_v.*\.elf$",         "pldmgr_v*.elf",    "PLDMGR_ELF")
update_versioned_cb("AnyPad",     "elmonomalva0/Any-Pad-ps5",    r"AnyPad-PS5-.*\.elf$",      "AnyPad-PS5-*.elf", "ANYPAD_ELF")

# ── save & output ─────────────────────────────────────────────────────────────

with open(VERSIONS_FILE, "w") as f:
    json.dump(versions, f, indent=2)
    f.write("\n")

gh_out = os.environ.get("GITHUB_OUTPUT", "")
if gh_out:
    with open(gh_out, "a") as f:
        f.write(f"changed={'true' if changed[0] else 'false'}\n")

print(f"\nResult: changed={changed[0]}")
