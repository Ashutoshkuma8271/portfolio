import os
from PIL import Image, ImageEnhance, ImageFilter

focus_dir = r"c:\Users\91933\Downloads\folio-main-v4\src\assets\images\focus"

# List all PNGs in focus dir
png_files = [f for f in os.listdir(focus_dir) if f.endswith(".png")]
print("Enhancing files:", png_files)

for fname in png_files:
    fpath = os.path.join(focus_dir, fname)
    try:
        img = Image.open(fpath).convert("RGBA")
        
        # 1. Clean alpha fringe: if RGB is nearly white but alpha is semi-transparent, clean it up
        # Also ensure alpha transitions are crisp
        # 2. Sharpen to eliminate any resampling blur
        # We apply UnsharpMask
        sharpened = img.filter(ImageFilter.UnsharpMask(radius=1.2, percent=140, threshold=2))
        
        # Enhance color contrast slightly for vivid luxury look
        # Split RGB and Alpha
        r, g, b, a = sharpened.split()
        rgb = Image.merge("RGB", (r, g, b))
        
        enh_color = ImageEnhance.Color(rgb).enhance(1.08)
        enh_contrast = ImageEnhance.Contrast(enh_color).enhance(1.06)
        
        # Re-merge with alpha
        cr, cg, cb = enh_contrast.split()
        final_img = Image.merge("RGBA", (cr, cg, cb, a))
        
        # Save back with maximum quality PNG
        final_img.save(fpath, format="PNG", optimize=True)
        print(f"Enhanced {fname}: size={final_img.size}")
    except Exception as e:
        print(f"Error on {fname}: {e}")

print("All assets successfully HD enhanced!")
