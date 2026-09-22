import os
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance

user_dir = r"C:\Users\91933\.gemini\antigravity-ide\brain\b0340b14-f68f-4c26-b589-f2ba7b2e3a7d\.user_uploaded"
target_dir = r"c:\Users\91933\Downloads\folio-main-v4\src\assets\images\focus"

oil_src = os.path.join(user_dir, "media_1790077624903.png")
print("Oil image exists:", os.path.exists(oil_src))

img = Image.open(oil_src).convert("RGBA")
w, h = img.size
print("Size:", w, h)

# 1. Save full image as high-res sector visual
img.save(os.path.join(target_dir, "oilgas-hd.png"))
print("Saved oilgas-hd.png")

# 2. Extract circular emblem
# Autocrop white border
datas = img.getdata()
new_data = []
for p in datas:
    if p[0] > 248 and p[1] > 248 and p[2] > 248:
        new_data.append((255, 255, 255, 0))
    else:
        new_data.append(p)
img.putdata(new_data)

bbox = img.getbbox()
if bbox:
    img_cropped = img.crop(bbox)
else:
    img_cropped = img

# Make it square
dim = max(img_cropped.size)
sq_img = Image.new("RGBA", (dim, dim), (0, 0, 0, 0))
sq_img.paste(img_cropped, ((dim - img_cropped.width)//2, (dim - img_cropped.height)//2))
sq_img = sq_img.resize((512, 512), Image.Resampling.LANCZOS)

# Create clean circular mask with gold/emerald border
mask = Image.new("L", (512, 512), 0)
draw = ImageDraw.Draw(mask)
draw.ellipse((4, 4, 508, 508), fill=255)

oil_badge = Image.new("RGBA", (512, 512), (0, 0, 0, 0))
oil_badge.paste(sq_img, (0, 0), mask=mask)

draw_b = ImageDraw.Draw(oil_badge)
draw_b.ellipse((4, 4, 508, 508), outline=(199, 154, 61, 255), width=6)
draw_b.ellipse((10, 10, 502, 502), outline=(18, 51, 43, 220), width=3)

# Sharpen and enhance
oil_badge = oil_badge.filter(ImageFilter.UnsharpMask(radius=1.2, percent=140, threshold=2))
oil_badge.save(os.path.join(target_dir, "hydrocarbon-badge.png"))
oil_badge.save(os.path.join(target_dir, "oilgas-icon.png"))
print("Saved hydrocarbon-badge.png and oilgas-icon.png successfully")
