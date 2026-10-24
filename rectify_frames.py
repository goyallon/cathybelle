"""Perspective correction from manually located inner black-frame corners.

Coordinates are relative to the original image, ordered TL, TR, BR, BL.
Output is rotated 90 degrees clockwise. Originals are never overwritten.
"""
from pathlib import Path
import json
import numpy as np
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent
OUTPUT = ROOT / 'images' / 'rectified'
OUTPUT.mkdir(parents=True, exist_ok=True)
CORNERS = {
    'P1000151.JPG': [(0.198, 0.130), (0.821, 0.088), (0.818, 0.835), (0.184, 0.754)],
    'P1000152.JPG': [(0.108, 0.073), (0.737, 0.071), (0.744, 0.950), (0.086, 0.929)],
    'P1000153.JPG': [(0.095, 0.036), (0.779, 0.006), (0.789, 0.950), (0.097, 0.932)],
    'P1000155.JPG': [(0.037, 0.066), (0.902, 0.013), (0.906, 0.916), (0.043, 0.900)],
    'P1000156.JPG': [(0.043, 0.050), (0.877, 0.040), (0.877, 0.936), (0.052, 0.901)],
}
previews = []
# Measured inner painting corners in the first rectified, clockwise-rotated views.
# These corrections remove the remaining slivers of black frame at each corner.
REFINEMENTS = {
    'P1000151.JPG': [(0.006, .004), (.975, .005), (.995, .995), (.006, .995)],
    'P1000152.JPG': [(.004, .007), (.996, .003), (.995, .995), (.008, .990)],
    'P1000153.JPG': [(.006, .003), (.997, .003), (.997, .993), (.006, .993)],
    'P1000155.JPG': [(.043, .006), (.997, .003), (.997, .994), (.010, .994)],
    'P1000156.JPG': [(.011, .034), (.952, .042), (.991, .993), (.005, .997)],
}
for name, normalized in CORNERS.items():
    im = ImageOps.exif_transpose(Image.open(ROOT / name)).convert('RGB')
    points = np.array([(x * im.width, y * im.height) for x, y in normalized])
    width = round((np.linalg.norm(points[1]-points[0]) + np.linalg.norm(points[2]-points[3])) / 2)
    height = round((np.linalg.norm(points[3]-points[0]) + np.linalg.norm(points[2]-points[1])) / 2)
    # Pillow's transform maps output coordinates back into the source quadrilateral.
    destination = [(0, 0), (width-1, 0), (width-1, height-1), (0, height-1)]
    matrix, target = [], []
    for (x, y), (u, v) in zip(destination, points):
        matrix.extend([[x, y, 1, 0, 0, 0, -u*x, -u*y], [0, 0, 0, x, y, 1, -v*x, -v*y]])
        target.extend([u, v])
    coeff = np.linalg.solve(np.array(matrix), np.array(target))
    # Map the refined corners back into the original photograph so only one
    # resampling is required for the final corrected painting.
    refined = []
    for x, y in [REFINEMENTS[name][i] for i in (1, 2, 3, 0)]:
        u, v = y * (width-1), (1-x) * (height-1)
        a,b,c,d,e,f,g,h = coeff
        denominator = g*u+h*v+1
        refined.append(((a*u+b*v+c)/denominator, (d*u+e*v+f)/denominator))
    points = np.array(refined)
    matrix, target = [], []
    for (x,y),(u,v) in zip(destination, points):
        matrix.extend([[x,y,1,0,0,0,-u*x,-u*y],[0,0,0,x,y,1,-v*x,-v*y]])
        target.extend([u,v])
    coeff = np.linalg.solve(np.array(matrix), np.array(target))
    corrected = im.transform((width, height), Image.Transform.PERSPECTIVE, coeff, Image.Resampling.BICUBIC)
    corrected = corrected.transpose(Image.Transpose.ROTATE_270)
    corrected.thumbnail((2400, 2400), Image.Resampling.LANCZOS)
    corrected.save(OUTPUT / (Path(name).stem.lower()+'.jpg'), quality=94, optimize=True)
    thumb = corrected.copy()
    thumb.thumbnail((260, 360))
    tile = Image.new('RGB', (280, 390), 'white')
    tile.paste(thumb, ((280-thumb.width)//2, 10))
    from PIL import ImageDraw
    ImageDraw.Draw(tile).text((10, 372), name, fill='black')
    previews.append(tile)
    print(name, corrected.size)
sheet = Image.new('RGB', (280*len(previews), 390), 'white')
for index, tile in enumerate(previews):
    sheet.paste(tile, (280*index, 0))
sheet.save(OUTPUT / 'verification.jpg')
(OUTPUT / 'corners.json').write_text(json.dumps(CORNERS, indent=2), encoding='utf-8')
