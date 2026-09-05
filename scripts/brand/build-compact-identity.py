from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
MASTER = ROOT / "brand/identity/wordmark/master/sellogram.svg"
OUT = ROOT / "brand/identity/symbol/candidates"
SYMBOL_MASTER = ROOT / "brand/identity/symbol/master/sellogram-symbol.svg"


def read_subpaths() -> list[str]:
    svg = MASTER.read_text()
    match = re.search(r'<path d="([^"]+)"', svg)
    if not match:
        raise RuntimeError("Sellogram master path not found")
    subpaths = re.findall(r'M[^M]+', match.group(1))
    if len(subpaths) != 13:
        raise RuntimeError(f"Expected 13 master subpaths, found {len(subpaths)}")
    return subpaths


def write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content)


def main() -> None:
    parts = read_subpaths()

    # Selected Disciplined master subpath order:
    # m; g outer; g counter; a outer; a counter; r; o outer; o counter;
    # e outer; e aperture; l; l; S.
    g = parts[1] + parts[2]
    r = parts[5]
    o = parts[6] + parts[7]
    s = parts[12]

    # Approved compact identity: S / Pure. The glyph path is copied exactly
    # from the production wordmark; only the square viewBox provides framing.
    s_pure = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -24.5 273 273"><path d="{s}" fill="currentColor"/></svg>\n'''

    # Historical Gate 2 explorations retained for design history only.
    loop = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">\n  <g fill="currentColor" fill-rule="evenodd" transform="translate(-430 -20)">\n    <path d="{o}"/>\n  </g>\n  <g fill="currentColor" fill-rule="evenodd" transform="matrix(.78 0 0 .78 -239.5 63.5)">\n    <path d="{o}"/>\n  </g>\n</svg>\n'''

    fragment = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="600 40 256 256">\n  <path d="{g}" fill="currentColor" fill-rule="evenodd"/>\n</svg>\n'''

    crop = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="560 20 300 300">\n  <path d="{o}{g}{r}" fill="currentColor" fill-rule="evenodd"/>\n</svg>\n'''

    write(OUT / "s-pure/sellogram-s-pure.svg", s_pure)
    write(SYMBOL_MASTER, s_pure)
    write(OUT / "loop/sellogram-loop.svg", loop)
    write(OUT / "fragment/sellogram-fragment.svg", fragment)
    write(OUT / "crop/sellogram-crop.svg", crop)


if __name__ == "__main__":
    main()
