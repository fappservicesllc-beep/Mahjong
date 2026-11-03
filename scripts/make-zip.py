#!/usr/bin/env python3
"""
Empaqueta el código fuente del proyecto en un ZIP descargable.

Genera dos archivos dentro de client/public/download/ para que el servidor
de desarrollo los sirva directamente:

  mahjong-master-key-source.zip  -> solo el codigo (ligero, sin imagenes)
  mahjong-master-key-full.zip    -> codigo + todas las imagenes del sitio

Uso:  python3 scripts/make-zip.py
"""

import os
import re
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "client", "public", "download")

# ---------------------------------------------------------------------------
# HeyLloyd-only dependency, stripped on export.
#
# client/index.html carries two <script> tags pointing at /__heylloyd/ready.js
# and /__heylloyd/picker.js. Those files are injected by the HeyLloyd sandbox
# (editor loading overlay + element picker) and do NOT exist on any other host,
# so on a self-hosted deploy they would 404 on every page load.
#
# They must stay in the working copy (the sandbox needs them), so instead of
# deleting them we rewrite index.html as it is written INTO the zip. The file
# on disk is never modified. Everything else is copied byte for byte — in
# particular, no Shopify permalink, price, or pixel line is ever touched.
# ---------------------------------------------------------------------------
HEYLLOYD_SCRIPT_RE = re.compile(
    r"[ \t]*<script[^>]*/__heylloyd/[^>]*>\s*</script>\s*\n?",
    re.IGNORECASE,
)

EXPORT_NOTE = (
    "    <!-- HeyLloyd editor scripts (/__heylloyd/*) were removed on export:\n"
    "         they exist only inside the HeyLloyd sandbox. Nothing else in this\n"
    "         file was changed. See MIGRATION.md section 6. -->\n"
)


def transform_for_export(rel_path: str, data: bytes) -> bytes:
    """Rewrite host-specific bits as the file is written into the zip."""
    if rel_path.replace("\\", "/") != "client/index.html":
        return data

    text = data.decode("utf-8")
    cleaned, count = HEYLLOYD_SCRIPT_RE.subn("", text)
    if count:
        # Stripping the tags also eats the indentation in front of the
        # following </head>, so match it loosely and restore both.
        cleaned = re.sub(
            r"[ \t]*</head>",
            EXPORT_NOTE + "  </head>",
            cleaned,
            count=1,
        )
    return cleaned.encode("utf-8")

# Carpetas que nunca se incluyen: dependencias, artefactos de build,
# metadatos del editor y los propios ZIP generados.
SKIP_DIRS = {
    "node_modules",
    "dist",
    ".git",
    ".heylloyd",
    ".cache",
    "download",
    "__heylloyd",
    "__pycache__",
}

SKIP_FILES = {".DS_Store"}

# Extensiones consideradas "asset pesado" (se excluyen del ZIP ligero).
ASSET_EXT = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".mp4", ".pdf", ".zip"}


def collect(include_assets: bool):
    """Devuelve (ruta_absoluta, ruta_dentro_del_zip) para cada archivo."""
    found = []
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for name in filenames:
            if name in SKIP_FILES:
                continue
            abs_path = os.path.join(dirpath, name)
            rel_path = os.path.relpath(abs_path, ROOT)

            # attached_assets guarda los originales subidos al editor; las
            # versiones usadas por el sitio ya viven en client/public.
            if rel_path.startswith("attached_assets"):
                continue

            # Duplicate of client/public created by the sandbox; vite only
            # ever reads client/public, so shipping it would confuse things.
            if rel_path.replace("\\", "/").startswith("public/"):
                continue

            # El ZIP ligero omite ademas cualquier imagen o binario.
            ext = os.path.splitext(name)[1].lower()
            if not include_assets and ext in ASSET_EXT:
                continue

            found.append((abs_path, rel_path))
    return sorted(found, key=lambda pair: pair[1])


def build(filename: str, include_assets: bool):
    os.makedirs(OUT_DIR, exist_ok=True)
    target = os.path.join(OUT_DIR, filename)
    files = collect(include_assets)

    with zipfile.ZipFile(target, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as zf:
        for abs_path, rel_path in files:
            arcname = os.path.join("mahjong-master-key", rel_path)
            with open(abs_path, "rb") as fh:
                data = fh.read()
            zf.writestr(arcname, transform_for_export(rel_path, data))

    size_mb = os.path.getsize(target) / (1024 * 1024)
    print(f"{filename}: {len(files)} archivos, {size_mb:.1f} MB")


if __name__ == "__main__":
    build("mahjong-master-key-source.zip", include_assets=False)
    build("mahjong-master-key-full.zip", include_assets=True)
