import os
from PIL import Image, ImageEnhance, ImageFilter

user_dir = r"C:\Users\91933\.gemini\antigravity-ide\brain\b0340b14-f68f-4c26-b589-f2ba7b2e3a7d\.user_uploaded"
target_dir = r"c:\Users\91933\Downloads\folio-main-v4\src\assets\images\focus"

sarkaritel_src = os.path.join(user_dir, "media_1790077145352.png")
print("Sarkaritel exists:", os.path.exists(sarkaritel_src))

img = Image.open(sarkaritel_src).convert("RGBA")
w, h = img.size
print("Size:", w, h)

# Crop the main logo region
datas = img.getdata()
new_data = []
for p in datas:
    if p[0] > 240 and p[1] > 240 and p[2] > 240:
        new_data.append((255, 255, 255, 0))
    else:
        new_data.append(p)
img.putdata(new_data)

bbox = img.getbbox()
if bbox:
    cropped = img.crop(bbox)
else:
    cropped = img

# Sharpen and enhance contrast
sharpened = cropped.filter(ImageFilter.UnsharpMask(radius=1.2, percent=140, threshold=2))
r, g, b, a = sharpened.split()
rgb = Image.merge("RGB", (r, g, b))
enh_contrast = ImageEnhance.Contrast(rgb).enhance(1.08)
cr, cg, cb = enh_contrast.split()
final_img = Image.merge("RGBA", (cr, cg, cb, a))

final_img.save(os.path.join(target_dir, "sarkaritel-logo.png"), format="PNG", optimize=True)
print("Saved sarkaritel-logo.png successfully")
