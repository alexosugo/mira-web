# /// script
# requires-python = ">=3.11"
# dependencies = [
#   "opencv-python-headless>=4.10",
#   "pillow>=11",
#   "numpy>=2",
# ]
# ///
from __future__ import annotations

import argparse
import hashlib
import json
from dataclasses import dataclass
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageFilter

SOURCE_LABELS = ["S", "e", "l", "l", "o", "g", "r", "a", "m"]
INK_THRESHOLD = 128
MIN_COMPONENT_AREA = 1000
TARGET_VIEWBOX = (1264, 300)
UPSAMPLE = 4

CANDIDATES = {
    "faithful": {
        "blur_sigma": 0.55,
        "width_scale": [1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00],
        "gap_scale": [1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00],
        "y_shift": [0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    "disciplined": {
        "blur_sigma": 0.85,
        "width_scale": [1.00, 0.98, 0.98, 0.98, 0.99, 0.99, 0.96, 0.99, 0.97],
        "gap_scale": [0.94, 0.90, 0.88, 0.91, 0.91, 0.88, 0.90, 0.92],
        "y_shift": [0, 0, 0, 0, 0, 1, 0, 0, 0],
    },
    "characterful": {
        "blur_sigma": 0.70,
        "width_scale": [1.025, 0.98, 0.96, 0.96, 1.00, 1.015, 0.98, 1.00, 0.98],
        "gap_scale": [0.91, 0.88, 0.86, 0.89, 0.88, 0.86, 0.88, 0.90],
        "y_shift": [0, 0, 0, 0, 0, 2, 0, 0, 0],
    },
}

@dataclass
class Letter:
    label: str
    mask: np.ndarray
    x: int
    y: int
    w: int
    h: int
    area: int


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for block in iter(lambda: f.read(65536), b""):
            h.update(block)
    return h.hexdigest()


def load_letters(source: Path) -> tuple[list[Letter], dict]:
    gray = np.array(Image.open(source).convert("L"))
    ink = (gray < INK_THRESHOLD).astype(np.uint8)
    num, labels, stats, _ = cv2.connectedComponentsWithStats(ink, 8)
    components = []
    for i in range(1, num):
        x, y, w, h, area = [int(v) for v in stats[i]]
        if area >= MIN_COMPONENT_AREA:
            components.append((i, x, y, w, h, area))
    components.sort(key=lambda row: row[1])
    if len(components) != len(SOURCE_LABELS):
        raise RuntimeError(f"Expected nine letter components, found {len(components)}")

    xmin = min(row[1] for row in components)
    ymin = min(row[2] for row in components)
    xmax = max(row[1] + row[3] for row in components)
    ymax = max(row[2] + row[4] for row in components)

    letters: list[Letter] = []
    for label, (i, x, y, w, h, area) in zip(SOURCE_LABELS, components):
        component = (labels[y:y+h, x:x+w] == i).astype(np.uint8) * 255
        letters.append(Letter(label, component, x-xmin, y-ymin, w, h, area))

    metrics = {
        "source_sha256": sha256(source),
        "source_size": [int(gray.shape[1]), int(gray.shape[0])],
        "ink_bounds": [xmin, ymin, xmax, ymax],
        "target_viewbox": list(TARGET_VIEWBOX),
        "letters": [
            {"label": l.label, "x": l.x, "y": l.y, "w": l.w, "h": l.h, "area": l.area}
            for l in letters
        ],
    }
    return letters, metrics


def smooth_resize(mask: np.ndarray, width_scale: float, sigma: float) -> np.ndarray:
    image = Image.fromarray(mask)
    if sigma:
        image = image.filter(ImageFilter.GaussianBlur(radius=sigma))
    arr = (np.array(image) >= 128).astype(np.uint8) * 255
    new_width = max(1, round(arr.shape[1] * width_scale))
    if new_width != arr.shape[1]:
        arr = cv2.resize(arr, (new_width, arr.shape[0]), interpolation=cv2.INTER_LANCZOS4)
        arr = (arr >= 128).astype(np.uint8) * 255
    return arr


def build_candidate(letters: list[Letter], config: dict) -> np.ndarray:
    target_w, target_h = TARGET_VIEWBOX
    canvas = np.zeros((target_h, target_w), dtype=np.uint8)
    original_gaps = [letters[i+1].x - (letters[i].x + letters[i].w) for i in range(len(letters)-1)]

    x = letters[0].x
    previous_width = None
    for i, letter in enumerate(letters):
        if i > 0:
            gap = round(original_gaps[i-1] * config["gap_scale"][i-1])
            x = x + previous_width + gap

        shape = smooth_resize(letter.mask, config["width_scale"][i], config["blur_sigma"])
        y = letter.y + config["y_shift"][i]
        h, w = shape.shape
        x0, y0 = max(0, x), max(0, y)
        x1, y1 = min(target_w, x+w), min(target_h, y+h)
        if x1 > x0 and y1 > y0:
            src = shape[y0-y:y1-y, x0-x:x1-x]
            canvas[y0:y1, x0:x1] = np.maximum(canvas[y0:y1, x0:x1], src)
        previous_width = w
    return canvas


def format_num(value: float) -> str:
    value = round(float(value) * 4) / 4
    if abs(value) < 1e-9:
        return "0"
    text = f"{value:.2f}".rstrip("0").rstrip(".")
    if text.startswith("0."):
        text = text[1:]
    elif text.startswith("-0."):
        text = "-" + text[2:]
    return text


def contour_to_path(contour: np.ndarray, scale: int) -> str:
    # Stable coarse controls, converted to smooth midpoint quadratics.
    pts = cv2.approxPolyDP(contour, 4.0, True).reshape(-1, 2).astype(np.float64) / scale
    if len(pts) < 3:
        return ""
    start = (pts[-1] + pts[0]) / 2
    current = start.copy()
    values: list[str] = []
    for i, control in enumerate(pts):
        endpoint = (control + pts[(i + 1) % len(pts)]) / 2
        values.extend([
            format_num(control[0] - current[0]),
            format_num(control[1] - current[1]),
            format_num(endpoint[0] - current[0]),
            format_num(endpoint[1] - current[1]),
        ])
        current = endpoint
    return f"M{format_num(start[0])} {format_num(start[1])}q{' '.join(values)}z"


def mask_to_svg(mask: np.ndarray, title: str) -> str:
    target_w, target_h = TARGET_VIEWBOX
    up = cv2.resize(mask, (target_w*UPSAMPLE, target_h*UPSAMPLE), interpolation=cv2.INTER_CUBIC)
    up = (up >= 128).astype(np.uint8) * 255
    contours, _ = cv2.findContours(up, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_NONE)
    d = "".join(contour_to_path(contour, UPSAMPLE) for contour in contours)
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {target_w} {target_h}">'
        f'<path d="{d}" fill="currentColor" fill-rule="evenodd"/></svg>\n'
    )


def save_mask_preview(mask: np.ndarray, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(255-mask).save(path, optimize=True)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", type=Path, default=Path("brand/identity/wordmark/source/source-uppercase.png"))
    parser.add_argument("--root", type=Path, default=Path("."))
    parser.add_argument("--metrics-only", action="store_true")
    parser.add_argument("--all-candidates", action="store_true")
    parser.add_argument("--preview-dir", type=Path)
    args = parser.parse_args()

    letters, metrics = load_letters(args.source)
    metrics_path = args.root / "brand/identity/wordmark/generated/letter-metrics.json"
    metrics_path.parent.mkdir(parents=True, exist_ok=True)
    metrics_path.write_text(json.dumps(metrics, indent=2) + "\n")

    if args.metrics_only and not args.all_candidates:
        return

    for name, config in CANDIDATES.items():
        mask = build_candidate(letters, config)
        svg_path = args.root / f"brand/identity/wordmark/candidates/{name}/sellogram-{name}.svg"
        svg_path.parent.mkdir(parents=True, exist_ok=True)
        svg_path.write_text(mask_to_svg(mask, f"Sellogram — {name} Gate 1 refinement"))
        if args.preview_dir:
            save_mask_preview(mask, args.preview_dir / f"{name}.png")

if __name__ == "__main__":
    main()
