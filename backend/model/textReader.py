import pytesseract
from pytesseract import Output
from PIL import Image, ImageDraw

# Load your PNG image
image = Image.open("input.png")

# Run OCR with bounding box output
data = pytesseract.image_to_data(image, output_type=Output.DICT)

# Loop through detected text
for i in range(len(data["text"])):
    word = data["text"][i]
    if word.strip():  # skip empty results
        x, y, w, h = data["left"][i], data["top"][i], data["width"][i], data["height"][i]
        print(f"Detected: '{word}' at ({x}, {y}, {w}, {h})")

        # Draw rectangle around detected text (optional visualization)
        draw = ImageDraw.Draw(image)
        draw.rectangle([x, y, x+w, y+h], outline="red", width=2)

image.show()