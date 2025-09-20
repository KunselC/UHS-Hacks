import os
from google import genai

def chatLLM(PHI, prompt):
    env = {}
    with open('.env.example') as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith('#'):
                continue
            key, value = line.split('=', 1)
            env[key] = value
    client = genai.Client(api_key=env["GEMINI_API_KEY"])

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=f"""you are an educator that gives information about plants.
        given a plant health index of {PHI} using NDVI. 
        {prompt} 
        be concise about your answer but informative"""
    )

    # Accessing the generated text
    if response.candidates:
        candidate = response.candidates[0]
        if candidate.content and candidate.content.parts:
            return (candidate.content.parts[0].text)
        else:
            print("No content parts found.")
    else:
        print("No candidates found.")
print(chatLLM(0.2,"How long does the plant have to live?"))