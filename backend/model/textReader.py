import pytesseract
from PIL import Image
from bs4 import BeautifulSoup

def extract_paragraphs(image_path: str):
    """
    Runs OCR on the given image and returns a list of
    (bbox, text) tuples, where bbox = (x1, y1, x2, y2).
    """
    image = Image.open(image_path)

    # Get HOCR output (HTML-like)
    hocr = pytesseract.image_to_pdf_or_hocr(image, extension='hocr')
    hocr_text = hocr.decode("utf-8")

    # Parse HOCR with BeautifulSoup
    soup = BeautifulSoup(hocr_text, "html.parser")
    paragraphs = []

    for par in soup.find_all("p", class_="ocr_par"):
        title = par.get("title")
        if title and "bbox" in title:
            bbox_str = title.split("bbox")[1].split(";")[0].strip()
            x1, y1, x2, y2 = map(int, bbox_str.split())
            paragraphs.append(((x1, y1, x2, y2), par.get_text(strip=True)))

    return paragraphs