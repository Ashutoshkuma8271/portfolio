import os
from PIL import Image, ImageOps

user_dir = r"C:\Users\91933\.gemini\antigravity-ide\brain\b0340b14-f68f-4c26-b589-f2ba7b2e3a7d\.user_uploaded"
target_dir = r"c:\Users\91933\Downloads\folio-main-v4\src\assets\images\focus"

clock_src = os.path.join(user_dir, "media_1790074265529.png")
np_src = os.path.join(user_dir, "media_1790074428067.png")

# 1. Process Nagaland Post logo
np_img = Image.open(np_src).convert("RGBA")
w, h = np_img.size
print("NP size:", w, h)

# Crop the circular emblem with shield in the upper region
# Let's crop upper 70%
circle_crop = np_img.crop((int(w * 0.15), int(h * 0.12), int(w * 0.85), int(h * 0.72)))

# Clean transparency: convert white pixels to transparent
datas = circle_crop.getdata()
new_data = []
for item in datas:
    # item is (R, G, B, A)
    if item[0] > 225 and item[1] > 225 and item[2] > 225:
        new_data.append((255, 255, 255, 0))
    else:
        # Keep crisp dark lines
        new_data.append((26, 26, 26, item[3]))

circle_crop.putdata(new_data)
# Autocrop transparent borders
bbox = circle_crop.getbbox()
if bbox:
    circle_crop = circle_crop.crop(bbox)

# Make it square with padding
max_dim = max(circle_crop.size)
square_np = Image.new("RGBA", (max_dim + 20, max_dim + 20), (255, 255, 255, 0))
offset = ((max_dim + 20 - circle_crop.width) // 2, (max_dim + 20 - circle_crop.height) // 2)
square_np.paste(circle_crop, offset)
square_np = square_np.resize((512, 512), Image.Resampling.LANCZOS)
square_np.save(os.path.join(target_dir, "nagaland-post-logo.png"))
print("Saved nagaland-post-logo.png successfully")

# 2. Process Clock Icon
clock_img = Image.open(clock_src).convert("RGBA")
c_datas = clock_img.getdata()
new_clock_data = []
for item in c_datas:
    # If light / white / watermark background, make transparent
    if item[0] > 200 and item[1] > 200 and item[2] > 200:
        new_clock_data.append((255, 255, 255, 0))
    else:
        # Give rich warm gold tone: #C79A3D (rgb: 199, 154, 61)
        new_clock_data.append((199, 154, 61, item[3]))

clock_img.putdata(new_clock_data)
c_bbox = clock_img.getbbox()
if c_bbox:
    clock_img = clock_img.crop(c_bbox)

c_dim = max(clock_img.size)
square_clock = Image.new("RGBA", (c_dim + 16, c_dim + 16), (255, 255, 255, 0))
c_offset = ((c_dim + 16 - clock_img.width) // 2, (c_dim + 16 - clock_img.height) // 2)
square_clock.paste(clock_img, c_offset)
square_clock = square_clock.resize((256, 256), Image.Resampling.LANCZOS)
square_clock.save(os.path.join(target_dir, "clock-gold-icon.png"))
print("Saved clock-gold-icon.png successfully")
