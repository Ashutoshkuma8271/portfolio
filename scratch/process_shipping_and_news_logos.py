import os
from PIL import Image

user_dir = r"C:\Users\91933\.gemini\antigravity-ide\brain\b0340b14-f68f-4c26-b589-f2ba7b2e3a7d\.user_uploaded"
target_dir = r"c:\Users\91933\Downloads\folio-main-v4\src\assets\images\focus"

shipping_src = os.path.join(user_dir, "media_1790075693585.png")
livemint_src = os.path.join(user_dir, "media_1790075797194.png")
reuters_src = os.path.join(user_dir, "media_1790075888332.png")

# 1. India Shipping News: Crop the circular ship bow emblem on the left
ship_img = Image.open(shipping_src).convert("RGBA")
w, h = ship_img.size
# Left circle emblem is in approx left 25% of the image
emblem_crop = ship_img.crop((0, 0, int(w * 0.28), h))
emblem_data = []
for p in emblem_crop.getdata():
    if p[0] > 240 and p[1] > 240 and p[2] > 240:
        emblem_data.append((255, 255, 255, 0))
    else:
        emblem_data.append(p)
emblem_crop.putdata(emblem_data)
bbox = emblem_crop.getbbox()
if bbox:
    emblem_crop = emblem_crop.crop(bbox)
max_dim = max(emblem_crop.size)
sq_ship = Image.new("RGBA", (max_dim + 16, max_dim + 16), (255, 255, 255, 0))
sq_ship.paste(emblem_crop, ((max_dim + 16 - emblem_crop.width)//2, (max_dim + 16 - emblem_crop.height)//2))
sq_ship = sq_ship.resize((512, 512), Image.Resampling.LANCZOS)
sq_ship.save(os.path.join(target_dir, "indiashippingnews-logo.png"))
print("Saved indiashippingnews-logo.png")

# 2. Livemint:
mint_img = Image.open(livemint_src).convert("RGBA")
mint_data = []
for p in mint_img.getdata():
    if p[0] > 240 and p[1] > 240 and p[2] > 240:
        mint_data.append((255, 255, 255, 0))
    else:
        mint_data.append(p)
mint_img.putdata(mint_data)
bbox = mint_img.getbbox()
if bbox:
    mint_img = mint_img.crop(bbox)
mint_img.save(os.path.join(target_dir, "livemint-logo.png"))
print("Saved livemint-logo.png")

# 3. Reuters: Crop orange dotted spiral emblem (or full logo)
reuters_img = Image.open(reuters_src).convert("RGBA")
reuters_data = []
for p in reuters_img.getdata():
    if p[0] > 240 and p[1] > 240 and p[2] > 240:
        reuters_data.append((255, 255, 255, 0))
    else:
        reuters_data.append(p)
reuters_img.putdata(reuters_data)
rw, rh = reuters_img.size
# Crop spiral emblem on the left
spiral_crop = reuters_img.crop((0, 0, int(rw * 0.38), rh))
s_bbox = spiral_crop.getbbox()
if s_bbox:
    spiral_crop = spiral_crop.crop(s_bbox)
s_max = max(spiral_crop.size)
sq_reuters = Image.new("RGBA", (s_max + 16, s_max + 16), (255, 255, 255, 0))
sq_reuters.paste(spiral_crop, ((s_max + 16 - spiral_crop.width)//2, (s_max + 16 - spiral_crop.height)//2))
sq_reuters = sq_reuters.resize((512, 512), Image.Resampling.LANCZOS)
sq_reuters.save(os.path.join(target_dir, "reuters-logo.png"))
print("Saved reuters-logo.png")
