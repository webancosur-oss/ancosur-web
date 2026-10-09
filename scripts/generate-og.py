#!/usr/bin/env python3
"""
Genera las imágenes Open Graph (vista previa al compartir en
WhatsApp, Facebook, X, LinkedIn, iMessage) en public/og/.

Uso:
    python3 scripts/generate-og.py              # todas
    python3 scripts/generate-og.py neo-balto    # solo algunas

Requisitos: google-chrome y Pillow (pip install pillow).
Los datos (estado, tipo, ubicación, metraje) salen de
data/projects.ts. No se muestran precios.
"""

import html
import os
import re
import subprocess
import sys
import tempfile

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "og")
PUB = "file://" + os.path.join(ROOT, "public")
ASSETS = "file://" + os.path.join(ROOT, "scripts", "og-assets")
S = PUB + "/assets/projects/sliders/"
LOGOS = PUB + "/assets/images/"

WEB = "www.ancosur.com"
WHATSAPP = "971 069 763"

# --------------------------------------------------------------
# Datos de data/projects.ts
# --------------------------------------------------------------

source = open(os.path.join(ROOT, "data", "projects.ts"), encoding="utf8").read()
PROJECTS = {}
for block in re.findall(r"\{\s*id:\s*\d+,([\s\S]*?)\n  \}", source):
    def field(key, block=block):
        match = re.search(key + r':\s*"([^"]*)"', block)
        return match.group(1) if match else ""
    PROJECTS[field("name")] = {
        key: field(key)
        for key in ("type", "city", "address", "bedrooms", "area", "status")
    }

STATUS = {
    "PRE VENTA": "Preventa",
    "LANZAMIENTO": "Lanzamiento",
    "EN CONSTRUCCIÓN": "En construcción",
    "ENTREGA INMEDIATA": "Entrega inmediata",
    "ENTREGADO": "Proyecto entregado",
}

KIND = {
    "Departamento": "Departamentos",
    "Lote": "Lotes",
    "Resort": "Resort club",
    "Casas": "Casas",
}

# slug de /og, nombre en data/projects.ts, foto, logo
PROJECT_IMAGES = [
    ("neo-balto", "Neo Balto", S + "neo-balto.webp", "neo-balto.svg"),
    ("neo-xport", "Neo Xport", S + "neo-xport.webp", "neo-xport.svg"),
    ("neo-eterna", "Neo Eterna", S + "neo-eterna.webp", "neo-eterna.svg"),
    ("neo-origen", "Neo Origen", S + "neoorigen.webp", "neo-origen.svg"),
    ("neo-rivera", "Neo Rivera", S + "neo-rivera.webp", "neo-rivera.svg"),
    ("neo-emperatriz", "Neo Emperatriz", S + "neoemperatriz.webp", "neo-emperatriz.svg"),
    ("distrito-san-carlos", "Distrito San Carlos", S + "distrito-san-carlos.webp", "distrito-sancarlos.svg"),
    ("moro416", "Moro 416", S + "moro416.webp", "moro416.svg"),
    ("camino-real", "Camino Real", S + "caminoreal.webp", "camino-real.svg"),
    ("colinas-de-moro", "Las Colinas de Moro", S + "colinas.webp", "colinas-de-moro.svg"),
    ("terrazas-concepcion", "Las Terrazas de Concepción", S + "terrazas.webp", "las-terrazas-de-concepcion.svg"),
]

# --------------------------------------------------------------
# Plantilla
# --------------------------------------------------------------

WHATSAPP_ICON = (
    '<svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true"><path fill="#fff" '
    'd="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2 7L3 29l6.4-2c2 1.1 4.3 1.7 6.6 1.7 7.2 0 13-5.7 '
    '13-12.8S23.2 3 16 3Zm0 23.4c-2.1 0-4.1-.6-5.9-1.7l-.4-.3-3.8 1.2 1.2-3.7-.3-.4a10.4 10.4 0 0 1-1.6-5.6C5.2 '
    '10 10 5.3 16 5.3s10.8 4.7 10.8 10.5S22 26.4 16 26.4Zm5.9-7.8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.8 '
    '8.8 0 0 1-4.4-3.8c-.3-.6.3-.5 1-1.8.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 '
    '1.1-1.2 2.8s1.2 3.2 1.4 3.4c.2.2 2.4 3.6 5.8 5.1 2.2.9 3 1 4.1.8.7-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4Z"/></svg>'
)

GLOBE_ICON = (
    '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" fill="none" stroke="#fff" stroke-width="2">'
    '<circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5c2.6 2.8 3.9 6 3.9 9.5S14.6 18.7 12 21.5'
    'M12 2.5C9.4 5.3 8.1 8.5 8.1 12s1.3 6.7 3.9 9.5"/></svg>'
)

CSS = """
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&display=block');
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1200px;height:630px;overflow:hidden;background:#07110c;font-family:Manrope,Arial,sans-serif;color:#fff}
.photo{position:absolute;inset:0;background-size:cover;background-position:center}
.shade{position:absolute;inset:0;background:
 linear-gradient(90deg,rgba(5,12,8,.95) 0%,rgba(5,12,8,.86) 40%,rgba(5,12,8,.3) 66%,rgba(5,12,8,0) 84%),
 linear-gradient(0deg,rgba(5,12,8,.7) 0%,rgba(5,12,8,0) 30%)}
.bar{position:absolute;left:0;top:0;bottom:0;width:10px;background:#00a74f}
.content{position:absolute;left:72px;top:56px;bottom:40px;right:60px;display:flex;flex-direction:column}
.brand img{height:50px;display:block}
.main{margin:auto 0;width:620px}
.pill{display:inline-block;padding:9px 18px;border-radius:999px;background:#00a74f;font-size:19px;font-weight:700;letter-spacing:.04em;text-transform:uppercase}
.kind{display:inline-block;margin-left:12px;font-size:19px;font-weight:600;color:rgba(255,255,255,.78);letter-spacing:.08em;text-transform:uppercase}
.logo{margin-top:30px;height:118px;display:flex;align-items:center}
.logo img{max-height:118px;max-width:460px;filter:brightness(0) invert(1)}
.title{font-size:60px;line-height:1.04;font-weight:800;letter-spacing:-.02em}
.loc{margin-top:26px;font-size:27px;font-weight:600;color:#fff}
.facts{margin-top:12px;font-size:24px;font-weight:500;color:rgba(255,255,255,.8)}
.facts span+span:before{content:"·";margin:0 12px;color:#2fd47a}
.sub{margin-top:22px;font-size:27px;line-height:1.35;font-weight:500;color:rgba(255,255,255,.85);max-width:600px}
.contact{display:flex;gap:16px}
.chip{display:flex;align-items:center;gap:12px;white-space:nowrap;padding:13px 22px;border-radius:14px;font-size:26px;font-weight:700;letter-spacing:.01em}
.web{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.25)}
.wa{background:#25d366;color:#fff}
"""


def contact():
    return (
        '<div class="contact">'
        f'<div class="chip web">{GLOBE_ICON}{WEB}</div>'
        f'<div class="chip wa">{WHATSAPP_ICON}{WHATSAPP}</div>'
        "</div>"
    )


def page(photo, inner, position="center"):
    return (
        '<!doctype html><html><head><meta charset="utf-8">'
        f"<style>{CSS}</style></head><body>"
        f'<div class="photo" style="background-image:url(\'{photo}\');background-position:{position}"></div>'
        '<div class="shade"></div><div class="bar"></div>'
        '<div class="content">'
        f'<div class="brand"><img src="{LOGOS}ancosur-logo.svg"></div>'
        f'<div class="main">{inner}</div>'
        f"{contact()}"
        "</div></body></html>"
    )


def project_inner(name, logo):
    data = PROJECTS[name]
    esc = html.escape
    city = data["city"].title() if data["city"].isupper() else data["city"]
    address = re.sub(r"\s*\(.*?\)", "", data["address"])
    location = esc(city) if address in (city, "") else f"{esc(city)} · {esc(address)}"
    bedrooms = data["bedrooms"] if data["bedrooms"] not in ("", "Lote") else ""
    facts = "".join(f"<span>{esc(x)}</span>" for x in (data["area"], bedrooms) if x)
    return (
        f'<span class="pill">{esc(STATUS.get(data["status"], data["status"]))}</span>'
        f'<span class="kind">{esc(KIND.get(data["type"], data["type"]))}</span>'
        f'<div class="logo"><img src="{LOGOS}{logo}"></div>'
        f'<div class="loc">{location}</div>'
        f'<div class="facts">{facts}</div>'
    )


def text_inner(title, subtitle, pill=None):
    head = f'<span class="pill">{html.escape(pill)}</span><div style="height:26px"></div>' if pill else ""
    return f'{head}<div class="title">{title}</div><div class="sub">{subtitle}</div>'


# Portada: mosaico de tres proyectos a la derecha
HOME_CSS = """
.mosaic{position:absolute;right:0;top:0;bottom:0;width:520px;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:8px;padding:8px 8px 8px 0}
.mosaic div{background-size:cover;background-position:center;border-radius:4px}
.mosaic div:first-child{grid-row:1 / 3}
.home-shade{position:absolute;inset:0;background:linear-gradient(90deg,#07110c 0%,#07110c 50%,rgba(7,17,12,.6) 58%,rgba(7,17,12,0) 68%)}
.cats{margin-top:28px;display:flex;gap:10px}
.cats span{padding:9px 16px;border-radius:999px;border:1px solid rgba(47,212,122,.55);color:#2fd47a;font-size:20px;font-weight:700}
.big-logo img{height:84px;display:block}
.tag{margin-top:26px;font-size:50px;line-height:1.06;font-weight:800;letter-spacing:-.02em}
.tag b{color:#2fd47a}
"""


def home_page():
    photos = [S + "distrito-san-carlos.webp", S + "colinas.webp", ASSETS + "/zagari.webp"]
    mosaic = "".join(f'<div style="background-image:url(\'{p}\')"></div>' for p in photos)
    return (
        '<!doctype html><html><head><meta charset="utf-8">'
        f"<style>{CSS}{HOME_CSS}</style></head><body>"
        f'<div class="mosaic">{mosaic}</div><div class="home-shade"></div><div class="bar"></div>'
        '<div class="content" style="right:520px">'
        '<div style="margin:auto 0">'
        f'<div class="big-logo"><img src="{LOGOS}ancosur-logo.svg"></div>'
        '<div class="tag">Tu nuevo hogar en<br><b>Huancayo</b> te espera</div>'
        '<div class="cats"><span>Departamentos</span><span>Lotes</span><span>Resorts</span></div>'
        "</div>"
        f"{contact()}"
        "</div></body></html>"
    )


# --------------------------------------------------------------
# Render
# --------------------------------------------------------------

def render(slug, document):
    with tempfile.TemporaryDirectory() as tmp:
        page_path = os.path.join(tmp, "og.html")
        png_path = os.path.join(tmp, "og.png")
        with open(page_path, "w", encoding="utf8") as handle:
            handle.write(document)
        subprocess.run(
            [
                "google-chrome", "--headless=new", "--disable-gpu", "--hide-scrollbars",
                "--allow-file-access-from-files", "--virtual-time-budget=6000",
                "--window-size=1200,630", f"--screenshot={png_path}", "file://" + page_path,
            ],
            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True,
        )
        image = Image.open(png_path).convert("RGB").crop((0, 0, 1200, 630))

    output = os.path.join(OUT, f"{slug}.jpg")
    quality = 86
    while True:
        image.save(output, "JPEG", quality=quality, optimize=True, progressive=True)
        if os.path.getsize(output) < 190 * 1024 or quality <= 66:
            break
        quality -= 4
    print(f"{slug:22s} {os.path.getsize(output) // 1024} KB")


def main():
    only = set(sys.argv[1:])
    jobs = {"ancosur": home_page()}

    for slug, name, photo, logo in PROJECT_IMAGES:
        jobs[slug] = page(photo, project_inner(name, logo))

    jobs["resorts"] = page(
        ASSETS + "/zagari.webp",
        '<span class="pill">Resort club</span>'
        f'<div class="logo"><img src="{LOGOS}zagari.svg"></div>'
        '<div class="loc">San Ramón · Chanchamayo</div>'
        '<div class="facts"><span>Selva Central</span><span>Más de 20 amenidades</span></div>',
    )
    jobs["nosotros"] = page(
        S + "distrito-san-carlos.webp",
        text_inner(
            "Más de 10 años<br>construyendo Huancayo",
            "Conoce a ANCOSUR Inmobiliaria: nuestra historia, equipo y proyectos.",
        ),
    )

    os.makedirs(OUT, exist_ok=True)
    for slug, document in jobs.items():
        if not only or slug in only:
            render(slug, document)


if __name__ == "__main__":
    main()
