"""
Colour-grades photos so they look like one shoot, then resizes them for the site.

    pip install pillow numpy
    python3 scripts/grade-images.py photos-raw/map.txt

map.txt has one line per photo:  <source file>  <slot name>
e.g.  pexels-123.jpg  hero
Source files are looked up next to map.txt. Output goes to public/images as
<slot>.jpg (2000px) and <slot>-900.jpg (phones).

The grade: gentle white-balance correction, warm highlights, slightly
lifted blacks, soft contrast and a touch less saturation — a warm,
editorial look that matches the cream-and-spice palette.
"""

import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageOps

OUT = Path(__file__).resolve().parent.parent / "public" / "images"


def grade(img: Image.Image) -> Image.Image:
    a = np.asarray(img.convert("RGB"), dtype=np.float32) / 255.0

    # 1. Partial grey-world white balance, nudged warm (removes blue/green casts)
    means = a.reshape(-1, 3).mean(0)
    target = means.mean() * np.array([1.03, 1.0, 0.94])
    gain = 1 + 0.45 * (target / np.maximum(means, 1e-3) - 1)
    # Only ever warm an image up: never add blue or strip red from warm food shots
    gain[0] = max(gain[0], 1.0)
    gain[2] = min(gain[2], 1.0)
    a *= gain / gain[1]

    # 2. Exposure: bring the mid-point toward a consistent brightness
    lum = a @ np.array([0.2126, 0.7152, 0.0722])
    med = float(np.median(lum))
    gamma = np.clip(np.log(0.46) / np.log(max(med, 1e-3)), 0.8, 1.25)
    a = np.clip(a, 0, 1) ** (gamma * 0.5 + 0.5)

    # 3. Soft S-curve with lifted blacks and rolled-off highlights
    s = a * a * (3 - 2 * a)
    a = 0.65 * a + 0.35 * s
    a = 0.035 + a * (0.955 - 0.035)

    # 4. Slightly less saturation, so mixed sources sit together
    lum = (a @ np.array([0.2126, 0.7152, 0.0722]))[..., None]
    a = lum + (a - lum) * 0.88

    # 5. Split tone: warm amber highlights, faintly warm-brown shadows
    l = lum
    a += (1 - l) * np.array([0.022, 0.008, -0.012]) + l * np.array([0.045, 0.02, -0.035])

    # 6. Soft vignette to hold the eye in the frame
    h, w = a.shape[:2]
    yy, xx = np.ogrid[-1:1:h * 1j, -1:1:w * 1j]
    a *= (1 - 0.14 * np.clip(xx * xx + yy * yy - 0.35, 0, None))[..., None]

    return Image.fromarray((np.clip(a, 0, 1) * 255 + 0.5).astype(np.uint8))


def main(map_file: str) -> None:
    map_path = Path(map_file)
    OUT.mkdir(parents=True, exist_ok=True)
    for line in map_path.read_text().splitlines():
        line = line.split("#")[0].strip()
        if not line:
            continue
        src, slot = line.split()
        img = ImageOps.exif_transpose(Image.open(map_path.parent / src))
        img.thumbnail((2400, 2400), Image.LANCZOS)  # grade at a manageable size
        g = grade(img)
        for width, suffix, q in ((2000, "", 80), (900, "-900", 78)):
            out = g.copy()
            if out.width > width:
                out = out.resize((width, round(out.height * width / out.width)), Image.LANCZOS)
            out.save(OUT / f"{slot}{suffix}.jpg", quality=q, optimize=True, progressive=True)
        print(f"✓ {slot:<22} ← {src}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "photos-raw/map.txt")
