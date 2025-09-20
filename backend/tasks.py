from celery_app import celery_app
from image_processor import analyze_vegetation_health
from data_integrator import get_environmental_data
from risk_engine import calculate_risk
from database import save_assessment
import os
from loguru import logger

@celery_app.task
def process_image_analysis(file_path: str, latitude: float, longitude: float):
    """
    Async task to process image analysis and risk assessment.
    """
    try:
        logger.info(f"Starting async processing for {latitude}, {longitude}")
        
        # Analyze vegetation health
        veg_health = analyze_vegetation_health(file_path)
        
        # Get environmental data
        env_data = get_environmental_data(latitude, longitude)
        
        # Calculate risk
        risk_result = calculate_risk(veg_health, env_data)
        
        # Save to database
        assessment_id = save_assessment({
            "latitude": latitude,
            "longitude": longitude,
            "vegetation_health": veg_health,
            "environmental_data": env_data,
            "risk_assessment": risk_result,
            "image_path": file_path
        })
        
        # Clean up temp file
        if os.path.exists(file_path):
            os.remove(file_path)
        
        logger.info(f"Completed async processing, assessment ID: {assessment_id}")
        return assessment_id
        
    except Exception as e:
        logger.error(f"Error in async processing: {str(e)}")
        raise
