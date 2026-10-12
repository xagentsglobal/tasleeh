"""Turn source photos into the responsive WebP files the page uses.

1. Put originals in photos-src/ named after the slots in src/images.js
   (hero.jpg, survey.jpg, svc-mep.jpg, ...). Any of jpg/jpeg/png/webp.
2. Run: python3 scripts/process_photos.py

Each photo is centre-cropped to the slot's aspect ratio and exported at every
width listed in src/images.js. Slots with no source photo get a neutral tonal
placeholder so the layout still renders. og.webp is rebuilt from the hero.
Optional focal point: hero.jpg + "hero.focus" containing e.g. "0.5 0.3".
"""

import json
import re
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "photos-src"
OUT = ROOT / "public" / "images"
NAVY = (14, 42, 71)
AMBER = (242, 169, 0)


def load_manifest():
    # Evaluate the JS manifest with node so there is one source of truth.
    js = "import('./src/images.js').then(m => console.log(JSON.stringify(m.photos)))"
    out = subprocess.run(["node", "--input-type=module", "-e", js], cwd=ROOT, capture_output=True, text=True, check=True)
    return json.loads(out.stdout)


def find_source(name):
    for ext in ("jpg", "jpeg", "png", "webp"):
        p = SRC / f"{name}.{ext}"
        if p.exists():
            return p
    return None


def crop_to(img, ratio, focus=(0.5, 0.5)):
    rw, rh = ratio
    w, h = img.size
    target = rw / rh
    if w / h > target:
        nw = round(h * target)
        x = min(max(round(w * focus[0] - nw / 2), 0), w - nw)
        return img.crop((x, 0, x + nw, h))
    nh = round(w / target)
    y = min(max(round(h * focus[1] - nh / 2), 0), h - nh)
    return img.crop((0, y, w, y + nh))


def placeholder(ratio, seed):
    w = 1600
    h = round(w * ratio[1] / ratio[0])
    img = Image.new("RGB", (w, h), (34, 58, 84))
    d = ImageDraw.Draw(img)
    tones = [(58, 86, 116), (96, 118, 140), (24, 48, 74), (140, 150, 160)]
    for i in range(7):
        k = (seed * 7 + i * 13) % 100 / 100
        cx, cy = w * ((k * 1.7 + i * 0.23) % 1), h * ((k + i * 0.37) % 1)
        r = w * (0.18 + 0.1 * ((i + seed) % 3))
        d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=tones[(i + seed) % len(tones)])
    return img.filter(ImageFilter.GaussianBlur(w / 14))


def build_og(hero):
    w, h = 1200, 630
    img = crop_to(hero, (w, h)).resize((w, h), Image.LANCZOS)
    shade = Image.new("RGBA", (w, h))
    sd = ImageDraw.Draw(shade)
    for x in range(w):  # navy fade from the left for legibility
        a = max(0, min(235, round(235 * (1 - x / (w * 0.75)))))
        sd.line([(x, 0), (x, h)], fill=(*NAVY, a))
    img = Image.alpha_composite(img.convert("RGBA"), shade)
    logo = Image.open(ROOT / "public/brand/logo-tasleeh-white.png")
    logo = logo.resize((300, round(300 * logo.size[1] / logo.size[0])), Image.LANCZOS)
    img.alpha_composite(logo, (72, 64))
    d = ImageDraw.Draw(img)
    fdir = Path("/usr/share/fonts/opentype/inter")
    bold = ImageFont.truetype(str(fdir / "Inter-Bold.otf"), 54) if fdir.exists() else ImageFont.load_default(54)
    med = ImageFont.truetype(str(fdir / "Inter-Medium.otf"), 28) if fdir.exists() else ImageFont.load_default(28)
    for i, line in enumerate(["Planned maintenance", "for UAE buildings."]):
        d.text((72, 250 + i * 66), line, font=bold, fill="white")
    d.rectangle([72, 420, 132, 426], fill=AMBER)
    d.text((72, 450), "Book a free post-summer property survey", font=med, fill=(225, 231, 238))
    d.text((72, 492), "800 222 333", font=med, fill=AMBER)
    img.convert("RGB").save(ROOT / "public/og.webp", "WEBP", quality=80, method=6)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    manifest = load_manifest()
    hero_img = None
    for i, (name, slot) in enumerate(manifest.items()):
        src = find_source(name)
        if src:
            img = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
            focus_file = src.with_suffix(".focus")
            focus = tuple(map(float, focus_file.read_text().split())) if focus_file.exists() else (0.5, 0.5)
            img = crop_to(img, slot["ratio"], focus)
            kind = "photo"
        else:
            img = placeholder(slot["ratio"], i)
            kind = "PLACEHOLDER"
        if name == "hero":
            hero_img = img
        for w in slot["widths"]:
            h = round(w * slot["ratio"][1] / slot["ratio"][0])
            out = OUT / f"{name}-{w}.webp"
            img.resize((w, h), Image.LANCZOS).save(out, "WEBP", quality=74, method=6)
        print(f"{name:12} {kind:11} -> {', '.join(str(w) for w in slot['widths'])}")
    if hero_img is not None:
        build_og(hero_img)
        print("og.webp rebuilt")


if __name__ == "__main__":
    main()
