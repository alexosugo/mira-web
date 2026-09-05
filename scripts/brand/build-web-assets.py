# /// script
# requires-python = ">=3.11"
# dependencies = ["cairosvg>=2.7", "pillow>=11"]
# ///
from __future__ import annotations

import io
from pathlib import Path

import cairosvg
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
SYMBOL_MASTER = ROOT / "brand/identity/symbol/master/sellogram-symbol.svg"
PUBLIC = ROOT / "public"

INK = "#1B2620"
PAPER = "#F2F6F3"


def render_symbol(svg: str, size: int, *, background: str | None = None) -> Image.Image:
    rendered = cairosvg.svg2png(
        bytestring=svg.replace("currentColor", INK).encode(),
        output_width=size,
        output_height=size,
    )
    icon = Image.open(io.BytesIO(rendered)).convert("RGBA")
    if background is None:
        return icon

    canvas = Image.new("RGBA", (size, size), background)
    canvas.alpha_composite(icon)
    return canvas


def save_png(svg: str, name: str, size: int, *, background: str | None = None) -> None:
    render_symbol(svg, size, background=background).save(PUBLIC / name, format="PNG")


def main() -> None:
    svg = SYMBOL_MASTER.read_text()

    # SVG favicon is the locked S / Pure master itself. Raster files below are
    # generated outputs from the same master and preserve its approved framing.
    (PUBLIC / "favicon.svg").write_text(svg)
    (PUBLIC / "favicon-light.svg").write_text(svg.replace("currentColor", PAPER))

    save_png(svg, "favicon-16x16.png", 16)
    save_png(svg, "favicon-32x32.png", 32)
    save_png(svg, "favicon.png", 512, background=PAPER)
    save_png(svg, "apple-touch-icon.png", 180, background=PAPER)
    save_png(svg, "android-chrome-192x192.png", 192, background=PAPER)
    save_png(svg, "android-chrome-512x512.png", 512, background=PAPER)
    save_png(svg, "mstile-150x150.png", 150, background=PAPER)

    # ICO contains the standard small favicon sizes, all generated from S / Pure.
    ico_source = render_symbol(svg, 256)
    ico_source.save(PUBLIC / "favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])


if __name__ == "__main__":
    main()
