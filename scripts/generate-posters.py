#!/usr/bin/env python3
"""
Genera los afiches de campañas de /promociones en
public/assets/campanias/ (1080x1080, WebP).

Uso:
    python3 scripts/generate-posters.py              # todos
    python3 scripts/generate-posters.py showroom     # solo uno

Requisitos: google-chrome y Pillow.
"""

import os
import subprocess
import sys
import tempfile

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB = "file://" + os.path.join(ROOT, "public")
ASSETS = "file://" + os.path.join(ROOT, "scripts", "og-assets")
OUT = os.path.join(ROOT, "public", "assets", "campanias")

FONTS = (
    "@import url('https://fonts.googleapis.com/css2?"
    "family=Creepster&family=Manrope:wght@500;700;800&display=block');"
)

BASE_CSS = FONTS + """
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1080px;overflow:hidden;font-family:Manrope,Arial,sans-serif;color:#fff;background:#050806}
.layer{position:absolute;inset:0;background-size:cover;background-position:center}
.logo{position:absolute;left:50%;transform:translateX(-50%);bottom:46px;height:58px}
"""

# --------------------------------------------------------------
# SHOWROOM · EDICIÓN HALLOWEEN
# --------------------------------------------------------------

SHOWROOM = BASE_CSS + """
.monster{background-image:url('{PUB}/assets/campanias/depaween.webp');background-size:1500px auto;background-position:78% 26%;filter:saturate(1.15) brightness(.85)}
.dark{background:
  linear-gradient(155deg, #030805 0%, #030805 24%, rgba(3,8,5,0) 44%),
  radial-gradient(ellipse at 50% 26%, rgba(57,255,140,.20), transparent 55%),
  linear-gradient(180deg, rgba(3,8,5,.55) 0%, rgba(3,8,5,.25) 30%, rgba(3,8,5,.82) 58%, #030805 74%)}
.maquetas{top:auto;height:330px;bottom:0;background-image:url('{ASSETS}/showroom-maquetas.webp');background-size:1080px auto;background-position:center bottom;
  -webkit-mask-image:linear-gradient(180deg,transparent 0%,#000 45%);mask-image:linear-gradient(180deg,transparent 0%,#000 45%);filter:hue-rotate(-20deg) saturate(.9) brightness(.8)}
.fog{background:linear-gradient(0deg, rgba(57,255,140,.16), transparent 30%)}
.content{position:absolute;left:0;right:0;top:400px;text-align:center}
.tag{display:inline-block;padding:10px 22px;border-radius:999px;background:#ff7a00;color:#160800;font-weight:800;font-size:24px;letter-spacing:.14em;text-transform:uppercase;box-shadow:0 0 40px rgba(255,122,0,.55)}
h1{margin-top:22px;font-family:Creepster,cursive;font-weight:400;font-size:150px;line-height:.9;letter-spacing:.04em;color:#7dffb4;
  text-shadow:0 0 18px rgba(57,255,140,.9),0 0 60px rgba(57,255,140,.55),0 6px 0 #04140b}
.sub{margin-top:6px;font-family:Creepster,cursive;font-size:64px;letter-spacing:.06em;color:#fff;text-shadow:0 0 22px rgba(255,255,255,.35)}
.info{display:flex;justify-content:center;gap:16px;margin-top:30px}
.info span{padding:14px 22px;border:1px solid rgba(125,255,180,.45);border-radius:14px;background:rgba(3,12,7,.78);font-size:26px;font-weight:700}
.info b{color:#7dffb4}
.tagline{margin-top:22px;font-size:26px;font-weight:600;color:rgba(255,255,255,.88)}
"""

SHOWROOM_HTML = """
<div class="layer monster"></div>
<div class="layer dark"></div>
<div class="layer maquetas"></div>
<div class="layer fog"></div>
<div class="content">
  <span class="tag">Edición Halloween</span>
  <h1>SHOWROOM</h1>
  <div class="sub">inmobiliario</div>
  <div class="info">
    <span><b>Sáb. 17</b> de octubre</span>
    <span>11:00 a. m. – 5:00 p. m.</span>
  </div>
  <div class="tagline">Sala de ventas Ancosur · Av. San Carlos 1481</div>
</div>
<img class="logo" src="{PUB}/assets/images/ancosur-logo.svg">
"""

# --------------------------------------------------------------
# FAMILIA ANCOSUR (promoción permanente)
# --------------------------------------------------------------

FAMILIA = BASE_CSS + """
.photo{background-image:url('{PUB}/assets/projects/sliders/distrito-san-carlos.webp');background-size:cover;background-position:62% center}
.shade{background:
  linear-gradient(180deg, rgba(4,20,11,.2) 0%, rgba(4,20,11,.55) 38%, #04140b 66%),
  radial-gradient(ellipse at 50% 100%, rgba(0,167,79,.35), transparent 60%)}
.content{position:absolute;left:70px;right:70px;top:300px}
.kicker{display:inline-block;padding:10px 20px;border-radius:999px;background:#00a74f;font-size:22px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}
h1{margin-top:24px;font-size:84px;line-height:1;font-weight:800;letter-spacing:-.02em}
h1 span{color:#55e69a}
.lead{margin-top:20px;font-size:32px;line-height:1.35;font-weight:500;color:rgba(255,255,255,.9)}
.perks{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:38px}
.perk{padding:20px 18px;border:1px solid rgba(85,230,154,.35);border-radius:18px;background:rgba(4,20,11,.75)}
.perk b{display:block;font-size:46px;font-weight:800;color:#55e69a;line-height:1}
.perk span{display:block;margin-top:8px;font-size:21px;font-weight:600;line-height:1.3;color:rgba(255,255,255,.9)}
"""

FAMILIA_HTML = """
<div class="layer photo"></div>
<div class="layer shade"></div>
<div class="content">
  <span class="kicker">Familia Ancosur</span>
  <h1>Compra tu lote<br>o depa <span>y accede a<br>beneficios exclusivos</span></h1>
  <div class="perks">
    <div class="perk"><b>15</b><span>marcas aliadas con descuentos</span></div>
    <div class="perk"><b>50%</b><span>de descuento en estética y spa</span></div>
    <div class="perk"><b>30%</b><span>en decoración y acabados</span></div>
  </div>
</div>
<img class="logo" src="{PUB}/assets/images/ancosur-logo.svg">
"""

POSTERS = {
    "showroom-halloween": (SHOWROOM, SHOWROOM_HTML),
    "familia-ancosur": (FAMILIA, FAMILIA_HTML),
}


def render(name, css, body):
    document = (
        '<!doctype html><html><head><meta charset="utf-8"><style>'
        + css.replace("{PUB}", PUB).replace("{ASSETS}", ASSETS)
        + "</style></head><body>"
        + body.replace("{PUB}", PUB)
        + "</body></html>"
    )
    with tempfile.TemporaryDirectory() as tmp:
        page = os.path.join(tmp, "poster.html")
        png = os.path.join(tmp, "poster.png")
        with open(page, "w", encoding="utf8") as handle:
            handle.write(document)
        subprocess.run(
            [
                "google-chrome", "--headless=new", "--disable-gpu", "--hide-scrollbars",
                "--allow-file-access-from-files", "--virtual-time-budget=8000",
                "--window-size=1080,1080", f"--screenshot={png}", "file://" + page,
            ],
            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True,
        )
        image = Image.open(png).convert("RGB").crop((0, 0, 1080, 1080))

    output = os.path.join(OUT, f"{name}.webp")
    image.save(output, "WEBP", quality=84, method=6)
    print(f"{name:20s} {os.path.getsize(output) // 1024} KB")


def main():
    only = set(sys.argv[1:])
    for name, (css, body) in POSTERS.items():
        if not only or name in only:
            render(name, css, body)


if __name__ == "__main__":
    main()
