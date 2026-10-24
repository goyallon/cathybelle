"""Crop the photographed print at its visible inner corners and rectify it.

The print extends beyond the left/right edges of the source photograph.
Only the visible photograph is used; no missing image content is invented.
"""
from pathlib import Path
import numpy as np
from PIL import Image, ImageOps

root = Path(__file__).resolve().parents[1]
source = ImageOps.exif_transpose(Image.open(root / 'photo.jpeg')).convert('RGB')
corners = [(0, 179), (944, 192), (944, 1607), (0, 1612)]
width, height = 945, 1424
destination = [(0, 0), (width - 1, 0), (width - 1, height - 1), (0, height - 1)]
matrix, target = [], []
for (x, y), (u, v) in zip(destination, corners):
    matrix.extend([[x,y,1,0,0,0,-u*x,-u*y], [0,0,0,x,y,1,-v*x,-v*y]])
    target.extend([u,v])
coefficients = np.linalg.solve(np.array(matrix), np.array(target))
result = source.transform((width,height), Image.Transform.PERSPECTIVE, coefficients, Image.Resampling.BICUBIC)
output = root / 'images' / 'cathy-belle-atelier.jpg'
result.save(output, quality=95, optimize=True)
print(output)

