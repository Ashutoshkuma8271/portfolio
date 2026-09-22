import os
from PIL import Image

user_dir = r"C:\Users\91933\.gemini\antigravity-ide\brain\b0340b14-f68f-4c26-b589-f2ba7b2e3a7d\.user_uploaded"
target_dir = r"c:\Users\91933\Downloads\folio-main-v4\src\assets\images\focus"

files = {
    "indian_express": os.path.join(user_dir, "media_1790074768564.png"),
    "moneycontrol": os.path.join(user_dir, "media_1790074812791.png"),
    "toi": os.path.join(user_dir, "media_1790074868429.png"),
    "gulf_news": os.path.join(user_dir, "media_1790074933049.png"),
    "india_com": os.path.join(user_dir, "media_1790074960334.png"),
}

for k, v in files.items():
    print(f"{k}: exists={os.path.exists(v)}")

# 1. The Indian Express:
# Crop the upper flame or full icon
ie_img = Image.open(files["indian_express"]).convert("RGBA")
# Make white background transparent
ie_data = []
for p in ie_img.getdata():
    if p[0] > 240 and p[1] > 240 and p[2] > 240:
        ie_data.append((255, 255, 255, 0))
    else:
        ie_data.append(p)
ie_img.putdata(ie_data)
bbox = ie_img.getbbox()
if bbox:
    ie_img = ie_img.crop(bbox)
# Fit in 512x512 square
ie_max = max(ie_img.size)
ie_sq = Image.new("RGBA", (ie_max + 16, ie_max + 16), (255, 255, 255, 0))
ie_sq.paste(ie_img, ((ie_max + 16 - ie_img.width)//2, (ie_max + 16 - ie_img.height)//2))
ie_sq = ie_sq.resize((512, 512), Image.Resampling.LANCZOS)
ie_sq.save(os.path.join(target_dir, "indianexpress-logo.png"))
print("Saved indianexpress-logo.png")

# 2. Moneycontrol:
mc_img = Image.open(files["moneycontrol"]).convert("RGBA")
mc_data = []
for p in mc_img.getdata():
    if p[0] > 235 and p[1] > 235 and p[2] > 235:
        mc_data.append((255, 255, 255, 0))
    else:
        mc_data.append(p)
mc_img.putdata(mc_data)
bbox = mc_img.getbbox()
if bbox:
    mc_img = mc_img.crop(bbox)
mc_img.save(os.path.join(target_dir, "moneycontrol-logo.png"))
print("Saved moneycontrol-logo.png")

# 3. Times of India (TOI):
toi_img = Image.open(files["toi"]).convert("RGBA")
# Autocrop
bbox = toi_img.getbbox()
if bbox:
    toi_img = toi_img.crop(bbox)
# Let's save a clean 512x512 with subtle rounded corners or tight rectangular badge
toi_img.save(os.path.join(target_dir, "timesofindia-logo.png"))
print("Saved timesofindia-logo.png")

# 4. Gulf News:
gn_img = Image.open(files["gulf_news"]).convert("RGBA")
gn_data = []
for p in gn_img.getdata():
    if p[0] > 240 and p[1] > 240 and p[2] > 240:
        gn_data.append((255, 255, 255, 0))
    else:
        gn_data.append(p)
gn_img.putdata(gn_data)
bbox = gn_img.getbbox()
if bbox:
    gn_img = gn_img.crop(bbox)
gn_max = max(gn_img.size)
gn_sq = Image.new("RGBA", (gn_max + 16, gn_max + 16), (255, 255, 255, 0))
gn_sq.paste(gn_img, ((gn_max + 16 - gn_img.width)//2, (gn_max + 16 - gn_img.height)//2))
gn_sq = gn_sq.resize((512, 512), Image.Resampling.LANCZOS)
gn_sq.save(os.path.join(target_dir, "gulfnews-logo.png"))
print("Saved gulfnews-logo.png")

# 5. India.com / India News:
ind_img = Image.open(files["india_com"]).convert("RGBA")
ind_data = []
for p in ind_img.getdata():
    if p[0] > 240 and p[1] > 240 and p[2] > 240:
        ind_data.append((255, 255, 255, 0))
    else:
        ind_data.append(p)
ind_img.putdata(ind_data)
bbox = ind_img.getbbox()
if bbox:
    ind_img = ind_img.crop(bbox)
ind_img.save(os.path.join(target_dir, "indiacom-logo.png"))
print("Saved indiacom-logo.png")
