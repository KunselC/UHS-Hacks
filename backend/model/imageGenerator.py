from PIL import Image, ImageDraw

def replace_text(image_path: str, paragraphs, output_path="output.png"):
    """
    Takes the original image and a list of (bbox, text) tuples,
    replaces paragraph areas with new content, and saves result.
    """
    image = Image.open(image_path)
    draw = ImageDraw.Draw(image)

    for (x1, y1, x2, y2), text in paragraphs:
        # Fill the paragraph region with white
        draw.rectangle([x1, y1, x2, y2], fill="white")

        # Example replacement: just put a placeholder
        draw.text((x1, y1), "[REPLACED]", fill="black")

    image.save(output_path)
    print(f"Output image saved as {output_path}")