
from text_reader import extract_paragraphs # from textReader
from generate_image import replace_text

def main():
    input_path = "input.png"
    output_path = "output.png"

    # Step 1: Extract paragraphs (coords + text)
    paragraphs = extract_paragraphs(input_path)

    # Debug print
    for bbox, text in paragraphs:
        print(f"Found paragraph at {bbox}: {text}")

    # Step 2: Replace them in the image
    replace_text(input_path, paragraphs, output_path)

if __name__ == "__main__":
    main()