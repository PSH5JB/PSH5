"""Unpack emu title folders from release zips so Relapse can copy files."""
import glob, os, shutil, zipfile

ROOT = os.path.join("payloads", "emulators")

JOBS = [
    ("PS5SX2/PS5SX2-vk-*.zip", "PS5SX2/PPSA99203", "PPSA99203"),
    ("XPSemu/PPSA97358.zip", "XPSemu/PPSA97358", "PPSA97358"),
]


def extract_title(zip_path, dest_dir, title_id):
    if os.path.isdir(dest_dir):
        shutil.rmtree(dest_dir)
    os.makedirs(dest_dir, exist_ok=True)
    prefix = title_id + "/"
    n = 0
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
            n += 1
    print(f"extracted {n} files from {zip_path} -> {dest_dir}")


def main():
    for pattern, dest_rel, title_id in JOBS:
        matches = sorted(glob.glob(os.path.join(ROOT, pattern)))
        if not matches:
            print("no zip for", pattern)
            continue
        zip_path = matches[-1]
        dest_dir = os.path.join(ROOT, dest_rel)
        extract_title(zip_path, dest_dir, title_id)


if __name__ == "__main__":
    main()
