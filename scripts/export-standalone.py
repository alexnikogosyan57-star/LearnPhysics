"""Pack the production build into an offline HTML document (stdlib only)."""
from pathlib import Path
import base64
import mimetypes
import re

root = Path(__file__).resolve().parents[1]
build = root / "dist"
html = (build / "index.html").read_text()


def data_uri(path):
    mime = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    return "data:" + mime + ";base64," + base64.b64encode(path.read_bytes()).decode()


def inline_css(match):
    css_path = build / match.group(1)
    css = css_path.read_text()

    def asset(asset_match):
        relative = asset_match.group(1).strip("\"'")
        path = css_path.parent / relative
        return "url(" + data_uri(path) + ")" if path.exists() else asset_match.group(0)

    return "<style>" + re.sub(r"url\(([^)]+)\)", asset, css) + "</style>"


def inline_js(match):
    js = (build / match.group(1)).read_text()
    # Vite emits local image URLs as quoted strings. Inline the mascot, too.
    for path in [*(build / "assets").glob("*.webp"), *(build / "assets").glob("*.mp4"), *(build / "assets").glob("*.webm"), *(build / "assets").glob("*.png")]:
        uri = data_uri(path)
        for prefix in ("./assets/", "/assets/"):
            js = js.replace('"' + prefix + path.name + '"', '"' + uri + '"')
        js = re.sub(r'new URL\("' + re.escape(path.name) + r'",import.meta.url\)\.href', '"' + uri + '"', js)
    return '<script type="module">' + js.replace("</script", "<\\/script") + "</script>"


html = re.sub(r'<link rel="stylesheet"[^>]*href="\./([^"]+)"[^>]*>', inline_css, html)
html = re.sub(r'<script type="module"[^>]*src="\./([^"]+)"[^>]*></script>', inline_js, html)
output = build / "physics-app.html"
output.write_text(html)
print(f"Standalone application: {output} ({output.stat().st_size:,} bytes)")
