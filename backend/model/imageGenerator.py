# paragraphs -> format: array of bounding box coordinates and text
# generate image with provided coordinates with font of opendyslexic

from PIL import Image, ImageDraw, ImageFont


def replace_text(image_path: str, paragraphs, output_path="output.png"):
    """
    Takes the original image and a list of (bbox, text) tuples,
    replaces paragraph areas with new content, and saves result.
    """
    image = Image.open(image_path)
    draw = ImageDraw.Draw(image)

    for (x1, y1, x2, y2), text in paragraphs: # coordinates, text
        # Fill the paragraph region with white
        draw.rectangle([x1, y1, x2, y2], fill="white")

        # Example replacement: just put a placeholder

        # Load dyslexia font
        dys_font = ImageFont.truetype('backend/model/data/open_dyslexic/OpenDyslexic-Regular.otf')
        # draw text with custom dyslexia font
        draw.text((x1, y1), "[REPLACED]", fill="black")

        # replace draw that within white rectangle

    image.save(output_path)
    print(f"Output image saved as {output_path}")