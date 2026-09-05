# Gate 1 review outputs

The Gate 1 comparison and usage boards are generated raster review outputs. They are intentionally not authoritative brand masters.

Generate them after building the candidates:

```bash
uv run scripts/brand/build-wordmark.py \
  --all-candidates \
  --preview-dir /tmp/sellogram-wordmark-previews

uv run scripts/brand/render-wordmark-review.py \
  --source brand/identity/wordmark/source/source-uppercase.png \
  --previews /tmp/sellogram-wordmark-previews \
  --out /tmp/sellogram-wordmark-review
```

The renderer produces:

- `gate-1-comparison.png`
- `faithful-usage.png`
- `disciplined-usage.png`
- `characterful-usage.png`

Do not promote any candidate to the production master until the Gate 1 review is explicitly approved.
