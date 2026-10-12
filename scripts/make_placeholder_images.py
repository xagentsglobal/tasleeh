"""Generate placeholder images in public/ at the exact sizes the page expects.

These are stand-ins so the layout, dimensions and Lighthouse checks can be
verified before the real documentary photography arrives. Replace these files
with real photos at the same names and aspect ratios (4:3 for hero/survey,
1200x630 for og), exported as WebP:

  public/hero.webp      1200x900   rooftop AC condensers, Dubai tower
  public/hero-640.webp   640x480
  public/survey.webp    1200x900   engineer with tablet in a plant room
  public/survey-640.webp 640x480
  public/og.webp        1200x630   social share card

Usage: python3 scripts/make_placeholder_images.py
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

PUBLIC = Path(__file__).resolve().parent.parent / "public"
NAVY = (14, 42, 71)
AMBER = (242, 169, 0)
FONT_DIR = Path("/usr/share/fonts/opentype/inter")


def font(weight, size):
    for name in (f"Inter-{weight}.otf", "Inter-Bold.otf"):
        p = FONT_DIR / name
        if p.exists():
            return ImageFont.truetype(str(p), size)
    return ImageFont.load_default(size)


def vertical_gradient(w, h, top, bottom):
    img = Image.new("RGB", (w, h))
    d = ImageDraw.Draw(img)
    for y in range(h):
        t = y / (h - 1)
        d.line([(0, y), (w, y)], fill=tuple(round(a + (b - a) * t) for a, b in zip(top, bottom)))
    return img


def hero():
    w, h = 1200, 900
    img = vertical_gradient(w, h, (120, 140, 160), (205, 196, 180))
    d = ImageDraw.Draw(img)
    # Distant towers
    for x, tw, th in [(40, 90, 420), (160, 70, 520), (260, 110, 360), (420, 80, 600), (900, 120, 480), (1060, 90, 380)]:
        d.rectangle([x, h - 380 - th + 300, x + tw, h], fill=(150, 160, 172))
    # Roof slab
    d.rectangle([0, 600, w, h], fill=(96, 100, 104))
    d.rectangle([0, 588, w, 604], fill=(140, 142, 145))
    # Rows of condenser units
    for row, (y, s) in enumerate([(470, 1.0), (560, 1.25)]):
        uw, uh = int(170 * s), int(130 * s)
        for i in range(-1, 8):
            x = 60 + i * (uw + 40) + row * 60
            d.rectangle([x, y, x + uw, y + uh], fill=(214, 216, 214), outline=(120, 124, 128), width=3)
            for k in range(2):
                cx = x + uw * (0.3 + 0.4 * k)
                cy = y + uh * 0.5
                r = uh * 0.32
                d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(70, 74, 80))
                d.ellipse([cx - r * 0.25, cy - r * 0.25, cx + r * 0.25, cy + r * 0.25], fill=(150, 150, 150))
    # Technician silhouette
    d.ellipse([820, 330, 880, 390], fill=NAVY)
    d.rounded_rectangle([800, 390, 905, 600], radius=18, fill=NAVY)
    d.rectangle([800, 450, 905, 470], fill=AMBER)  # hi-vis band
    img = img.filter(ImageFilter.GaussianBlur(1.2))
    return img


def survey():
    w, h = 1200, 900
    img = vertical_gradient(w, h, (62, 72, 84), (40, 46, 54))
    d = ImageDraw.Draw(img)
    # Pipework
    for y, c in [(150, (150, 120, 70)), (230, (90, 120, 150)), (310, (170, 170, 170))]:
        d.rectangle([0, y, w, y + 36], fill=c)
    for x in (200, 520, 840):
        d.rectangle([x, 0, x + 34, h], fill=(120, 126, 132))
        d.rectangle([x - 14, 140, x + 48, 350], outline=(60, 60, 60), width=4)
    # Panels
    for x in (60, 980):
        d.rectangle([x, 420, x + 170, 860], fill=(180, 184, 188), outline=(90, 94, 98), width=4)
        for k in range(4):
            d.rectangle([x + 20, 450 + k * 95, x + 150, 520 + k * 95], outline=(110, 114, 118), width=3)
    # Engineer with tablet
    d.ellipse([560, 380, 640, 460], fill=(200, 170, 140))
    d.rounded_rectangle([520, 460, 680, 900], radius=26, fill=NAVY)
    d.rectangle([520, 540, 680, 562], fill=AMBER)
    d.rounded_rectangle([600, 560, 720, 650], radius=8, fill=(30, 30, 34), outline=(220, 220, 220), width=4)
    return img.filter(ImageFilter.GaussianBlur(1.2))


def og():
    w, h = 1200, 630
    img = Image.new("RGB", (w, h), NAVY)
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, 18, h], fill=AMBER)
    d.text((90, 90), "TASLEEH", font=font("Bold", 64), fill=(255, 255, 255))
    d.text((90, 170), "FACILITIES MANAGEMENT · PART OF TIGER HOLDING", font=font("SemiBold", 22), fill=AMBER)
    lines = ["Planned maintenance for UAE buildings.", "One contract, one number, every trade."]
    for i, line in enumerate(lines):
        d.text((90, 270 + i * 70), line, font=font("Bold", 52), fill=(255, 255, 255))
    d.text((90, 480), "Book a free post-summer property survey  ·  800 222 333", font=font("Medium", 30), fill=(174, 185, 198))
    return img


def save(img, name, size=None):
    if size:
        img = img.resize(size, Image.LANCZOS)
    img.save(PUBLIC / name, "WEBP", quality=72, method=6)
    print(f"{name}: {img.size[0]}x{img.size[1]}, {(PUBLIC / name).stat().st_size // 1024} KB")


if __name__ == "__main__":
    PUBLIC.mkdir(exist_ok=True)
    h, s = hero(), survey()
    save(h, "hero.webp")
    save(h, "hero-640.webp", (640, 480))
    save(s, "survey.webp")
    save(s, "survey-640.webp", (640, 480))
    save(og(), "og.webp")
