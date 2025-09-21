import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def chatLLM(PHI, prompt):
    try:
        # Get API key from environment
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables")
        
        # Configure the client
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-2.0-flash-exp')

        response = model.generate_content(
            f"""You are an educational AI assistant that provides information about environmental science and plant health.
            
            Context: Plant Health Index (PHI) using NDVI: {PHI}
            (0.0-0.2 = Poor health, 0.2-0.4 = Fair, 0.4-0.6 = Good, 0.6-0.8 = Very good, 0.8-1.0 = Excellent)
            
            User Question: {prompt}
            
            Please provide a concise but informative educational response that helps the user learn about environmental science, plant health, or related topics."""
        )

        return response.text
            
    except Exception as e:
        print(f"Error in chatLLM: {str(e)}")
        return f"I'm experiencing technical difficulties. Please try again later. Error: {str(e)}"