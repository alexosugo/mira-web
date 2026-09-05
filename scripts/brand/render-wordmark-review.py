# /// script
# requires-python = ">=3.11"
# dependencies = ["pillow>=11", "numpy>=2", "opencv-python-headless>=4.10"]
# ///
from __future__ import annotations

import argparse
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

PAPER = '#F2F6F3'
INK = '#1B2620'
INK_LIGHT = '#49584F'
LINE = '#DCE6DF'
FERN = '#177E54'
NIGHT = '#0E1E17'
WHITE = '#FFFFFF'

FONT = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
FONT_BOLD = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'


def font(size: int, bold: bool = False):
    path = FONT_BOLD if bold else FONT
    return ImageFont.truetype(path, size=size)


def load_mask(path: Path) -> np.ndarray:
    gray = np.array(Image.open(path).convert('L'))
    return (gray < 128).astype(np.uint8) * 255


def ink_bounds(mask: np.ndarray):
    ys, xs = np.where(mask > 0)
    return int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1


def crop_mask(mask: np.ndarray) -> np.ndarray:
    x0, y0, x1, y1 = ink_bounds(mask)
    return mask[y0:y1, x0:x1]


def render_mask(mask: np.ndarray, width: int, color: str) -> Image.Image:
    mask = crop_mask(mask)
    h, w = mask.shape
    height = max(1, round(width * h / w))
    resized = cv2.resize(mask, (width, height), interpolation=cv2.INTER_LANCZOS4)
    alpha = Image.fromarray(resized).convert('L')
    rgba = Image.new('RGBA', (width, height), color)
    rgba.putalpha(alpha)
    return rgba


def paste_center_y(canvas: Image.Image, art: Image.Image, x: int, cy: int):
    canvas.alpha_composite(art, (x, round(cy - art.height / 2)))


def draw_label(draw: ImageDraw.ImageDraw, text: str, xy: tuple[int, int], size: int = 18, color: str = INK_LIGHT):
    draw.text(xy, text, fill=color, font=font(size, bold=True), spacing=4)


def comparison(source: np.ndarray, candidates: dict[str, np.ndarray], out: Path):
    canvas = Image.new('RGBA', (1600, 1200), PAPER)
    draw = ImageDraw.Draw(canvas)
    draw.text((72, 54), 'Sellogram · Gate 1', fill=INK, font=font(38, True))
    draw.text((72, 105), 'Wordmark refinements · same approved concept, shown at the same visual height', fill=INK_LIGHT, font=font(18))

    rows = [
        ('SOURCE', 'Approved direction', source),
        ('FAITHFUL', 'Geometry cleanup only', candidates['faithful']),
        ('DISCIPLINED', 'Tighter rhythm and optical balance', candidates['disciplined']),
        ('CHARACTERFUL', 'Stronger lead S and more compact core', candidates['characterful']),
    ]
    top = 170
    row_h = 245
    for i, (name, note, mask) in enumerate(rows):
        y = top + i * row_h
        if i:
            draw.line((72, y-22, 1528, y-22), fill=LINE, width=2)
        draw_label(draw, name, (72, y+24), 17)
        draw.text((72, y+54), note, fill=INK_LIGHT, font=font(14))
        art = render_mask(mask, 980, INK)
        paste_center_y(canvas, art, 420, y+74)
    canvas.convert('RGB').save(out, optimize=True)


def usage(name: str, mask: np.ndarray, out: Path):
    canvas = Image.new('RGBA', (1600, 1200), PAPER)
    draw = ImageDraw.Draw(canvas)
    draw.text((72, 50), f'Sellogram · {name.capitalize()}', fill=INK, font=font(36, True))
    draw.text((72, 99), 'Gate 1 usage tests', fill=INK_LIGHT, font=font(17))

    draw_label(draw, 'PRIMARY · DARK ON PAPER', (72, 162), 14)
    art = render_mask(mask, 1120, INK)
    paste_center_y(canvas, art, 72, 300)

    draw.rectangle((0, 442, 1600, 710), fill=NIGHT)
    draw_label(draw, 'REVERSED · PAPER ON NIGHT', (72, 466), 14, '#8BD9B3')
    rev = render_mask(mask, 900, PAPER)
    paste_center_y(canvas, rev, 350, 590)

    draw_label(draw, 'MONOCHROME', (72, 750), 14)
    mono = Image.new('RGBA', (690, 210), WHITE)
    mono_art = render_mask(mask, 600, '#000000')
    mono.alpha_composite(mono_art, (42, round((210-mono_art.height)/2)))
    canvas.alpha_composite(mono, (72, 785))

    draw_label(draw, 'WEBSITE HEADER · 160 PX', (835, 750), 14)
    header = Image.new('RGBA', (693, 110), PAPER)
    hd = ImageDraw.Draw(header)
    hd.line((0, 109, 693, 109), fill=LINE, width=1)
    logo = render_mask(mask, 160, INK)
    header.alpha_composite(logo, (24, round((110-logo.height)/2)))
    hd.text((392, 44), 'How it works', fill=INK_LIGHT, font=font(12))
    hd.text((482, 44), 'Pricing', fill=INK_LIGHT, font=font(12))
    hd.rounded_rectangle((556, 31, 674, 79), radius=24, fill=FERN)
    hd.text((579, 45), 'Get started', fill=PAPER, font=font(12, True))
    canvas.alpha_composite(header, (835, 785))

    draw_label(draw, 'SMALL USE · 120 PX', (835, 934), 14)
    small = render_mask(mask, 120, INK)
    canvas.alpha_composite(small, (835, 978))
    draw.text((835, 1050), 'Inspect the e aperture, double-l rhythm, g descender, r/a join, and m at this size.', fill=INK_LIGHT, font=font(13))

    canvas.convert('RGB').save(out, optimize=True)


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--source', type=Path, required=True)
    p.add_argument('--previews', type=Path, required=True)
    p.add_argument('--out', type=Path, required=True)
    args = p.parse_args()
    args.out.mkdir(parents=True, exist_ok=True)

    source = load_mask(args.source)
    candidates = {name: load_mask(args.previews / f'{name}.png') for name in ['faithful','disciplined','characterful']}
    comparison(source, candidates, args.out / 'gate-1-comparison.png')
    for name, mask in candidates.items():
        usage(name, mask, args.out / f'{name}-usage.png')

if __name__ == '__main__':
    main()
