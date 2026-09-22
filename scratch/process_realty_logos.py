import os
from PIL import Image, ImageEnhance, ImageFilter

user_dir = r"C:\Users\91933\.gemini\antigravity-ide\brain\b0340b14-f68f-4c26-b589-f2ba7b2e3a7d\.user_uploaded"
target_dir = r"c:\Users\91933\Downloads\folio-main-v4\src\assets\images\focus"

files = {
    "ndtv": os.path.join(user_dir, "media_1790077891576.png"),
    "indiatoday": os.path.join(user_dir, "media_1790078126473.png"),
    "forbes": os.path.join(user_dir, "media_1790078151634.png"),
    "jll": os.path.join(user_dir, "media_1790078214250.png")
}

for k, v in files.items():
    print(f"{k}: exists={os.path.exists(v)}")

# 1. NDTV:
ndtv_img = Image.open(files["ndtv"]).convert("RGBA")
# Autocrop or make rounded square
bbox = ndtv_img.getbbox()
if bbox:
    ndtv_img = ndtv_img.crop(bbox)
ndtv_dim = max(ndtv_img.size)
sq_ndtv = Image.new("RGBA", (ndtv_dim, ndtv_dim), (0, 0, 0, 0))
sq_ndtv.paste(ndtv_img, ((ndtv_dim - ndtv_img.width)//2, (ndtv_dim - ndtv_img.height)//2))
sq_ndtv = sq_ndtv.resize((512, 512), Image.Resampling.LANCZOS)
sq_ndtv = sq_ndtv.filter(ImageFilter.UnsharpMask(radius=1.2, percent=140, threshold=2))
sq_ndtv.save(os.path.join(target_dir, "ndtv-logo.png"), format="PNG", optimize=True)
print("Saved ndtv-logo.png")

# 2. India Today:
it_img = Image.open(files["indiatoday"]).convert("RGBA")
# Remove outer checkered/transparent checker if any, crop red square
it_datas = it_img.getdata()
new_it_data = []
for p in it_datas:
    # If grey/white checkerboard pixel, make transparent
    if (p[0] > 180 and p[1] > 180 and p[2] > 180) and not (p[0] > 240 and p[1] < 100):
        # check if it is part of the white text inside the red box vs outside
        new_it_data.append(p)
    else:
        new_it_data.append(p)
# Actually in the image, the red box with "INDIA TODAY" is in the center
# Let's find bounding box of red color (R > 180, G < 60, B < 60)
red_pixels = []
for p in it_img.getdata():
    if p[0] > 160 and p[1] < 70 and p[2] < 70:
        red_pixels.append((p[0], p[1], p[2], 255))
    elif p[0] > 230 and p[1] > 230 and p[2] > 230:
        # white text
        red_pixels.append(p)
    else:
        red_pixels.append((255, 255, 255, 0))
it_img.putdata(red_pixels)
it_bbox = it_img.getbbox()
if it_bbox:
    it_img = it_img.crop(it_bbox)
it_dim = max(it_img.size)
sq_it = Image.new("RGBA", (it_dim, it_dim), (0, 0, 0, 0))
sq_it.paste(it_img, ((it_dim - it_img.width)//2, (it_dim - it_img.height)//2))
sq_it = sq_it.resize((512, 512), Image.Resampling.LANCZOS)
sq_it = sq_it.filter(ImageFilter.UnsharpMask(radius=1.2, percent=140, threshold=2))
sq_it.save(os.path.join(target_dir, "indiatoday-logo.png"), format="PNG", optimize=True)
print("Saved indiatoday-logo.png")

# 3. Forbes India:
f_img = Image.open(files["forbes"]).convert("RGBA")
f_data = []
for p in f_img.getdata():
    if p[0] > 240 and p[1] > 240 and p[2] > 240:
        f_data.append((255, 255, 255, 0))
    else:
        f_data.append(p)
f_img.putdata(f_data)
f_bbox = f_img.getbbox()
if f_bbox:
    f_img = f_img.crop(f_bbox)
f_img = f_img.filter(ImageFilter.UnsharpMask(radius=1.2, percent=140, threshold=2))
f_img.save(os.path.join(target_dir, "forbesindia-logo.png"), format="PNG", optimize=True)
print("Saved forbesindia-logo.png")

# 4. JLL:
jll_img = Image.open(files["jll"]).convert("RGBA")
jll_data = []
for p in jll_img.getdata():
    if p[0] > 240 and p[1] > 240 and p[2] > 240:
        jll_data.append((255, 255, 255, 0))
    else:
        jll_data.append(p)
jll_img.putdata(jll_data)
j_bbox = jll_img.getbbox()
if j_bbox:
    jll_img = jll_img.crop(j_bbox)
jll_img = jll_img.filter(ImageFilter.UnsharpMask(radius=1.2, percent=140, threshold=2))
jll_img.save(os.path.join(target_dir, "jll-logo.png"), format="PNG", optimize=True)
print("Saved jll-logo.png")
