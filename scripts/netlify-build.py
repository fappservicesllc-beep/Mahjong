"""Generate downloadable source from tracked working files, then build.

Using an isolated copy avoids publishing local .env files, Netlify credentials,
caches, or other untracked files through the public source downloads.
"""
from pathlib import Path
import shutil
import subprocess
import tempfile

root = Path(__file__).resolve().parent.parent
files = subprocess.check_output(
    ["git", "ls-files", "-z"], cwd=root
).decode().split("\0")
if not any(name == "package.json" for name in files):
    raise SystemExit("Build requires the project files to be tracked in Git.")

with tempfile.TemporaryDirectory(prefix="mahjong-downloads-") as tmp:
    staging = Path(tmp)
    for name in filter(None, files):
        relative = Path(name)
        if any(part in {".git", ".netlify", "node_modules", "dist", "download"}
               for part in relative.parts):
            continue
        if relative.name.startswith(".env") and relative.name != ".env.example":
            continue
        source = root / relative
        if source.is_symlink():
            raise SystemExit(f"Refusing to package a symlink: {name}")
        if source.is_file():
            target = staging / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(source, target)
    subprocess.run(["python3", "scripts/make-zip.py"], cwd=staging, check=True)
    destination = root / "client/public/download"
    destination.mkdir(parents=True, exist_ok=True)
    for archive in (staging / "client/public/download").glob("*.zip"):
        shutil.copyfile(archive, destination / archive.name)

subprocess.run(["npm", "run", "build"], cwd=root, check=True)
