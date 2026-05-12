"""
Remove white background from LBRN logo PNG.
Uses flood-fill from corners to detect and remove the outer white area,
preserving the white text inside the red badge.
"""
from PIL import Image
import os

INPUT = os.path.join("public", "logos", "LBRN_NEW.png")
OUTPUT = os.path.join("public", "logos", "LBRN_NEW_transparent.png")

img = Image.open(INPUT).convert("RGBA")
pixels = img.load()
w, h = img.size

# Flood fill from edges: mark all "white-ish" pixels reachable from
# the border as transparent. This preserves white inside the red badge.
THRESHOLD = 230  # pixels with R,G,B all above this are "white"

visited = set()
queue = []

# Seed from all border pixels
for x in range(w):
    queue.append((x, 0))
    queue.append((x, h - 1))
for y in range(h):
    queue.append((0, y))
    queue.append((w - 1, y))

while queue:
    x, y = queue.pop()
    if (x, y) in visited:
        continue
    if x < 0 or x >= w or y < 0 or y >= h:
        continue
    visited.add((x, y))

    r, g, b, a = pixels[x, y]
    if r >= THRESHOLD and g >= THRESHOLD and b >= THRESHOLD:
        pixels[x, y] = (r, g, b, 0)  # make transparent
        # Check 4 neighbors
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in visited:
                queue.append((nx, ny))

img.save(OUTPUT)
print(f"Done! Saved to {OUTPUT} ({os.path.getsize(OUTPUT)} bytes)")
