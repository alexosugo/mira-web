# /// script
# requires-python = ">=3.11"
# dependencies = ["cairosvg>=2.7", "pillow>=11"]
# ///
from __future__ import annotations

import argparse
import io
from pathlib import Path

import cairosvg
from PIL import Image, ImageDraw, ImageFont

PAPER = '#F2F6F3'
INK = '#1B2620'
INK_LIGHT = '#49584F'
FERN = '#177E54'
NIGHT = '#0E1E17'

CANDIDATES = {
    'loop': 'brand/identity/symbol/candidates/loop/sellogram-loop.svg',
    'fragment': 'brand/identity/symbol/candidates/fragment/sellogram-fragment.svg',
    'crop': 'brand/identity/symbol/candidates/crop/sellogram-crop.svg',
}

NOTES = {
    'loop': 'LOOP / DEVICE · paired counters from the wordmark o-geometry',
    'fragment': 'FRAGMENT · lowercase g lifted directly from the selected wordmark',
    'crop': 'EXTREME CROP · oversized middle-word geometry',
}


def font(size: int, bold: bool = False):
    path = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf' if bold else '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
    return ImageFont.truetype(path, size=size)


def render(svg_path: Path, size: int, color: str) -> Image.Image:
    svg = svg_path.read_text().replace('currentColor', color)
    png = cairosvg.svg2png(bytestring=svg.encode(), output_width=size, output_height=size)
    return Image.open(io.BytesIO(png)).convert('RGBA')


def tile_with_icon(svg_path: Path, size: int, bg: str, fg: str, tile_size: int = 250) -> Image.Image:
    tile = Image.new('RGBA', (tile_size, tile_size), bg)
    icon = render(svg_path, size, fg)
    offset = ((tile_size - size) // 2, (tile_size - size) // 2)
    tile.alpha_composite(icon, offset)
    return tile


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--root', type=Path, default=Path('.'))
    p.add_argument('--out', type=Path, default=Path('/tmp/sellogram-gate2-review.png'))
    args = p.parse_args()

    board = Image.new('RGB', (1800, 1250), PAPER)
    draw = ImageDraw.Draw(board)
    draw.text((60, 40), 'Sellogram · Gate 2 compact identity', fill=INK, font=font(28, True))
    draw.text((60, 82), 'Direct SVG renders · no initials · no SG monogram · no Instagram camera geometry', fill=INK_LIGHT, font=font(18))

    for name, y in zip(CANDIDATES, [145, 500, 855]):
        svg_path = args.root / CANDIDATES[name]
        draw.text((60, y), NOTES[name], fill=INK, font=font(20, True))
        top = y + 50

        board.paste(tile_with_icon(svg_path, 220, PAPER, INK).convert('RGB'), (60, top))
        draw.text((60, top + 260), '220px vector render', fill=INK_LIGHT, font=font(14))

        board.paste(tile_with_icon(svg_path, 190, NIGHT, PAPER).convert('RGB'), (340, top))
        draw.text((340, top + 260), 'reversed', fill=INK_LIGHT, font=font(14))

        avatar = Image.new('RGBA', (250, 250), PAPER)
        ImageDraw.Draw(avatar).ellipse((35, 35, 215, 215), fill=FERN)
        avatar.alpha_composite(render(svg_path, 132, PAPER), (59, 59))
        board.paste(avatar.convert('RGB'), (620, top))
        draw.text((620, top + 260), '180px circular avatar', fill=INK_LIGHT, font=font(14))

        for x, size, factor in [(900, 32, 4), (1110, 16, 8)]:
            sample = Image.new('RGBA', (180, 250), '#FFFFFF')
            icon = render(svg_path, size, INK)
            sample.alpha_composite(icon, (20, 30))
            sample.alpha_composite(icon.resize((size * factor, size * factor), Image.Resampling.NEAREST), (20, 90))
            board.paste(sample.convert('RGB'), (x, top))
            draw.text((x, top + 260), f'{size}px actual + pixel view', fill=INK_LIGHT, font=font(14))

        app = Image.new('RGBA', (420, 250), PAPER)
        ad = ImageDraw.Draw(app)
        ad.rounded_rectangle((20, 20, 212, 212), radius=44, fill=INK)
        app.alpha_composite(render(svg_path, 144, PAPER), (44, 44))
        app.alpha_composite(render(svg_path, 180, INK), (230, 26))
        board.paste(app.convert('RGB'), (1320, top))
        draw.text((1320, top + 260), 'app icon / 192px plain', fill=INK_LIGHT, font=font(14))

    args.out.parent.mkdir(parents=True, exist_ok=True)
    board.save(args.out, quality=95)


if __name__ == '__main__':
    main()
