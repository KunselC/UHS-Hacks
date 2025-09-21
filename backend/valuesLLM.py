import os
import json
import re
from google import genai  # Updated import

def clean_gemini_json(raw_output):
    """
    Cleans Gemini's raw output:
    - Removes ```json or ``` code block markers
    - Strips extra whitespace and newlines
    - Returns a JSON string ready for json.loads
    """
    # Remove ```json or ``` code block markers
    cleaned = re.sub(r"```(json)?", "", raw_output, flags=re.IGNORECASE)
    # Strip leading/trailing whitespace and newlines
    return cleaned.strip()

def chatLLM_image(image_path):
    prompt = """
Given this image of a plant, output the following attributes in JSON format:

1. predicted_ndvi: float (-1 to 1)
2. leaf_area_index: float (0 to 10)
3. chlorophyll_content: float (0 to 100)
4. water_stress: float (0 to 1, where 0 = healthy, 1 = severe stress)
5. pest_disease_risk: float (0 to 1, where 0 = none, 1 = high risk)
6. growth_stage: string (seedling, vegetative, flowering, fruiting)
7. canopy_density: float (0 to 1)
"""

    # Load API key from .env.example
    env = {}
    with open(".env.example") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            key, value = line.split("=", 1)
            env[key] = value

    client = genai.Client(api_key=env["GEMINI_API_KEY"])

    # 1️⃣ Upload the image
    uploaded_file = client.files.upload(file=image_path)

    # 2️⃣ Send a prompt referencing the uploaded file
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[
            uploaded_file,  # Include the uploaded image
            f"""
            You are an expert agronomist.
            {prompt}
            Provide the output as raw JSON only, without any markdown formatting.
            """
        ]
    )

    # 3️⃣ Parse output
    if response.candidates:
        candidate = response.candidates[0]
        if candidate.content and candidate.content.parts:
            text_output = candidate.content.parts[0].text.strip()
            cleaned_json_str = clean_gemini_json(text_output)
            try:
                plant_data = json.loads(cleaned_json_str)
                return plant_data
            except json.JSONDecodeError:
                print("Could not parse JSON. Raw output:", text_output)
                return {"raw_output": text_output}
    else:
        print("No candidates found.")

# Example usage
plant_attributes = chatLLM_image("input.png")
print(plant_attributes)

# Optionally save
with open("plant_attributes.json", "w") as f:
    json.dump(plant_attributes, f)


#calling the function will put the stuff in plant_attributes.json
#it takes from input.png, so your camera should put an image in input.png