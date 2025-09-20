import google.generativeai as genai
import os
from PIL import Image
from typing import Dict, Any
import asyncio
from loguru import logger

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

async def analyze_vegetation_health(image_path: str) -> float:
    """
    Analyze vegetation health from image using Gemini Vision.
    
    Returns a health score from 0-100.
    """
    try:
        # Load image
        image = Image.open(image_path)
        
        # Create model
        model = genai.GenerativeModel('gemini-pro-vision')
        
        # Prompt for vegetation analysis
        prompt = """
        Analyze this vegetation/grass image and provide a health assessment.
        Consider:
        - Color and greenness (healthy green vs. yellow/brown)
        - Signs of stress or dryness
        - Patchiness or dead vegetation areas
        - Overall vitality
        
        Provide a health score from 0-100 where:
        100 = Perfectly healthy, vibrant green vegetation
        0 = Completely dead/dry vegetation
        
        Also provide a brief explanation of your assessment.
        
        Format your response as:
        Score: [number]
        Explanation: [brief text]
        """
        
        # Generate response
        response = model.generate_content([prompt, image])
        response_text = response.text
        
        # Parse score from response
        score_line = [line for line in response_text.split('\n') if line.startswith('Score:')]
        if score_line:
            score_str = score_line[0].replace('Score:', '').strip()
            try:
                score = float(score_str)
                score = max(0, min(100, score))  # Clamp to 0-100
                logger.info(f"Vegetation health score: {score}")
                return score
            except ValueError:
                logger.warning(f"Could not parse score from response: {score_str}")
        
        # Fallback: try to extract any number
        import re
        numbers = re.findall(r'\d+\.?\d*', response_text)
        if numbers:
            score = float(numbers[0])
            score = max(0, min(100, score))
            logger.info(f"Extracted vegetation health score: {score}")
            return score
        
        # Default fallback
        logger.warning("Could not extract health score, using default")
        return 50.0
        
    except Exception as e:
        logger.error(f"Error analyzing vegetation health: {str(e)}")
        return 50.0  # Default neutral score
