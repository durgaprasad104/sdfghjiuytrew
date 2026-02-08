import sys
from collections import Counter

try:
    from PIL import Image
    
    def get_dominant_color(image_path):
        img = Image.open(image_path)
        img = img.resize((50, 50))  # Resize for speed
        img = img.convert('RGB')
        
        # Get colors
        colors = img.getdata()
        
        # Filter out white/near-white and transparent pixels (if RGBA)
        filtered_colors = [
            c for c in colors 
            if not (c[0] > 240 and c[1] > 240 and c[2] > 240) # Exclude white
        ]
        
        if not filtered_colors:
            return None

        # Count most frequent colors
        counter = Counter(filtered_colors)
        most_common = counter.most_common(1)[0][0]
        
        return "#{:02x}{:02x}{:02x}".format(most_common[0], most_common[1], most_common[2])

    color = get_dominant_color('src/assets/logo_crop.png')
    print(f"DOMINANT_COLOR:{color}")

except ImportError:
    print("PIL_NOT_YOUR_FAULT")
except Exception as e:
    print(f"ERROR:{e}")
