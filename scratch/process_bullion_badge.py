import os
from PIL import Image

user_dir = r"C:\Users\91933\.gemini\antigravity-ide\brain\b0340b14-f68f-4c26-b589-f2ba7b2e3a7d\.user_uploaded"
target_dir = r"c:\Users\91933\Downloads\folio-main-v4\src\assets\images\focus"

bullion_src = os.path.join(user_dir, "media_1790075339996.jpg")
print("Bullion image exists:", os.path.exists(bullion_src))

img = Image.open(bullion_src).convert("RGB")
w, h = img.size
print("Size:", w, h)

# 1. Save as high-res sector banner / hd image
img.save(os.path.join(target_dir, "gold-bullion-hd.jpg"), quality=95)
img.save(os.path.join(target_dir, "gold-bullion-hd.png"))
print("Saved gold-bullion-hd.png/jpg")

# 2. Extract emblem for category pill badge
# In the image, the bottom plaque has a gold circle globe icon on left, or we can crop the gold bars + coins
# Let's crop the gold bullion bars and coins (top-left / center area) for a rich 3D gold bullion badge
gold_crop = img.crop((int(w * 0.12), int(h * 0.14), int(w * 0.52), int(h * 0.62)))
# Make a circular or rounded badge with soft transparent vignette
gold_crop = gold_crop.convert("RGBA")
# Resize to 512x512
gold_badge = gold_crop.resize((512, 512), Image.Resampling.LANCZOS)

# Create circular mask for a clean badge
from PIL import ImageDraw
mask = Image.new("L", (512, 512), 0)
draw = ImageDraw.Draw(mask)
draw.ellipse((8, 8, 504, 504), fill=255)

# Add gold border around circular badge
gold_badge_final = Image.new("RGBA", (512, 512), (0, 0, 0, 0))
gold_badge_final.paste(gold_badge, (0, 0), mask=mask)

draw_border = ImageDraw.Draw(gold_badge_final)
draw_border.ellipse((8, 8, 504, 504), outline=(199, 154, 61, 255), width=8)
draw_border.ellipse((16, 16, 496, 496), outline=(229, 195, 120, 220), width=4)

gold_badge_final.save(os.path.join(target_dir, "bullion-gift-city-badge.png"))
print("Saved bullion-gift-city-badge.png (512x512 circular luxury gold bullion badge)")

# 3. Also update gold-icon.png for the desk selector button
gold_badge_final.save(os.path.join(target_dir, "gold-icon.png"))
print("Saved gold-icon.png")
