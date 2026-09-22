import os
from PIL import Image, ImageDraw

user_dir = r"C:\Users\91933\.gemini\antigravity-ide\brain\b0340b14-f68f-4c26-b589-f2ba7b2e3a7d\.user_uploaded"
target_dir = r"c:\Users\91933\Downloads\folio-main-v4\src\assets\images\focus"

fleet_src = os.path.join(user_dir, "media_1790076058088.png")
print("Fleet image exists:", os.path.exists(fleet_src))

img = Image.open(fleet_src).convert("RGBA")
w, h = img.size
print("Size:", w, h)

# 1. Save as high-res fleet sector visual
img.save(os.path.join(target_dir, "fleet-hd.png"))
print("Saved fleet-hd.png")

# 2. Extract circular badge
# Autocrop non-white / circular region
# In the image, the circular emblem is centered
# Let's crop the circle precisely
# Find bounding box of non-white pixels
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

# Create clean circular mask with gold border
mask = Image.new("L", (512, 512), 0)
draw = ImageDraw.Draw(mask)
draw.ellipse((4, 4, 508, 508), fill=255)

fleet_badge = Image.new("RGBA", (512, 512), (0, 0, 0, 0))
fleet_badge.paste(sq_img, (0, 0), mask=mask)

draw_b = ImageDraw.Draw(fleet_badge)
draw_b.ellipse((4, 4, 508, 508), outline=(199, 154, 61, 255), width=6)

fleet_badge.save(os.path.join(target_dir, "multimodal-port-badge.png"))
fleet_badge.save(os.path.join(target_dir, "fleet-icon.png"))
print("Saved multimodal-port-badge.png and fleet-icon.png")
