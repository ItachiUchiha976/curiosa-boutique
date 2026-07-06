#!/usr/bin/env python3
# Génère og-image.png (1200x630) pour le partage social — thème sépia Échos du Passé.
from PIL import Image, ImageDraw, ImageFont
import os

W, H = 1200, 630
img = Image.new("RGB", (W, H), "#1a1208")
d = ImageDraw.Draw(img)

# dégradé vertical sépia
top = (44, 32, 19); bot = (22, 16, 10)
for y in range(H):
    t = y / H
    r = int(top[0] + (bot[0]-top[0])*t)
    g = int(top[1] + (bot[1]-top[1])*t)
    b = int(top[2] + (bot[2]-top[2])*t)
    d.line([(0, y), (W, y)], fill=(r, g, b))

# cadre doré
d.rectangle([26, 26, W-26, H-26], outline="#d9a441", width=4)

def font(size, bold=True):
    candidates = [
        "C:/Windows/Fonts/georgiab.ttf" if bold else "C:/Windows/Fonts/georgia.ttf",
        "C:/Windows/Fonts/timesbd.ttf" if bold else "C:/Windows/Fonts/times.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
    ]
    for c in candidates:
        if os.path.exists(c):
            return ImageFont.truetype(c, size)
    return ImageFont.load_default()

def center(text, y, f, fill):
    bb = d.textbbox((0, 0), text, font=f)
    w = bb[2] - bb[0]
    d.text(((W - w)/2, y), text, font=f, fill=fill)

center("É C H O S   D U   P A S S É", 70, font(30), "#d9a441")
center("Mythe ou Réalité ?", 150, font(96), "#e9c477")
center("Le quiz des grandes idées reçues de l'Histoire", 285, font(38, False), "#cdbb98")

# pastille verdict-style
center("Vikings · Napoléon · Pyramides · Cléopâtre…", 380, font(34, False), "#f4e9d4")
center("Sauras-tu démêler le vrai du faux ?", 470, font(44), "#e9c477")
center("Quiz gratuit · 10 questions · 3 min", 545, font(30, False), "#a98f5f")

img.save("og-image.png", "PNG")
print("og-image.png written", img.size)
