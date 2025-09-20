import os
from typing import Dict, Any, Optional
from datetime import datetime
from loguru import logger

# Try to import motor, fallback to in-memory storage if not available
try:
    import motor.motor_asyncio
    MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
    client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URL)
    db = client.drought_fire_db
    assessments_collection = db.assessments
    MONGODB_AVAILABLE = True
except ImportError:
    MONGODB_AVAILABLE = False
    logger.warning("MongoDB not available, using in-memory storage")
    # In-memory storage fallback
    in_memory_storage = {}

async def save_assessment(assessment_data: Dict[str, Any]) -> str:
    """
    Save assessment data to database.
    
    Returns the assessment ID.
    """
    try:
        # Add timestamp
        assessment_data['timestamp'] = datetime.utcnow()
        
        if MONGODB_AVAILABLE:
            # Insert document
            result = await assessments_collection.insert_one(assessment_data)
            assessment_id = str(result.inserted_id)
        else:
            # Use in-memory storage
            import uuid
            assessment_id = str(uuid.uuid4())
            in_memory_storage[assessment_id] = assessment_data
        
        logger.info(f"Saved assessment with ID: {assessment_id}")
        return assessment_id
        
    except Exception as e:
        logger.error(f"Error saving assessment: {str(e)}")
        raise

async def get_assessment(assessment_id: str) -> Optional[Dict[str, Any]]:
    """
    Retrieve assessment by ID.
    """
    try:
        if MONGODB_AVAILABLE:
            from bson import ObjectId
            assessment = await assessments_collection.find_one({"_id": ObjectId(assessment_id)})
            
            if assessment:
                # Convert ObjectId to string
                assessment['_id'] = str(assessment['_id'])
                logger.info(f"Retrieved assessment: {assessment_id}")
                return assessment
        else:
            # Check in-memory storage
            assessment = in_memory_storage.get(assessment_id)
            if assessment:
                logger.info(f"Retrieved assessment from memory: {assessment_id}")
                return assessment
        
        logger.warning(f"Assessment not found: {assessment_id}")
        return None
            
    except Exception as e:
        logger.error(f"Error retrieving assessment: {str(e)}")
        raise

async def get_assessments_by_location(latitude: float, longitude: float, radius_km: float = 10) -> list:
    """
    Get historical assessments for a location within radius.
    """
    try:
        # Calculate radius in degrees (approximate)
        radius_deg = radius_km / 111  # 1 degree ≈ 111 km
        
        query = {
            "latitude": {"$gte": latitude - radius_deg, "$lte": latitude + radius_deg},
            "longitude": {"$gte": longitude - radius_deg, "$lte": longitude + radius_deg}
        }
        
        assessments = await assessments_collection.find(query).sort("timestamp", -1).to_list(length=50)
        
        # Convert ObjectIds to strings
        for assessment in assessments:
            assessment['_id'] = str(assessment['_id'])
        
        return assessments
        
    except Exception as e:
        logger.error(f"Error retrieving assessments by location: {str(e)}")
        return []
