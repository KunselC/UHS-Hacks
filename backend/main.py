from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import uvicorn
import os
from dotenv import load_dotenv
from loguru import logger

# Load environment variables
load_dotenv()

# Import our modules
from image_processor import analyze_vegetation_health
from data_integrator import get_environmental_data
from risk_engine import calculate_risk
from database import save_assessment, get_assessment
from chatLLM import chatLLM

# Optional Celery import
try:
    from tasks import process_image_analysis
    CELERY_AVAILABLE = True
except ImportError:
    CELERY_AVAILABLE = False
    logger.warning("Celery not available, running synchronously")

app = FastAPI(title="Drought & Wildfire Risk Assessment API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UploadResponse(BaseModel):
    assessment_id: str
    message: str

class RiskResponse(BaseModel):
    vegetation_health: float
    drought_index: dict
    fire_risk_index: dict
    overall_risk_score: float
    risk_category: str
    recommendation: str

class ChatRequest(BaseModel):
    question: str
    phi: Optional[float] = 0.5  # Default Plant Health Index

class ChatResponse(BaseModel):
    response: str
    phi: float

@app.post("/upload", response_model=UploadResponse)
async def upload_image_and_location(
    file: UploadFile = File(...),
    latitude: float = Form(...),
    longitude: float = Form(...)
):
    """
    Upload vegetation image and location for analysis.
    """
    if not file:
        raise HTTPException(status_code=400, detail="No file uploaded")
    
    try:
        # Save uploaded file temporarily
        file_path = f"temp_{file.filename}"
        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        if CELERY_AVAILABLE:
            # Process asynchronously with Celery
            task = process_image_analysis.delay(file_path, latitude, longitude)
            assessment_id = task.id
            message = "Assessment queued for processing"
        else:
            # Process synchronously
            veg_health = await analyze_vegetation_health(file_path)
            env_data = await get_environmental_data(latitude, longitude)
            risk_result = calculate_risk(veg_health, env_data)
            
            assessment_id = await save_assessment({
                "latitude": latitude,
                "longitude": longitude,
                "vegetation_health": veg_health,
                "environmental_data": env_data,
                "risk_assessment": risk_result,
                "image_path": file_path
            })
            
            # Clean up temp file
            os.remove(file_path)
            message = "Assessment completed successfully"
        
        return UploadResponse(
            assessment_id=assessment_id,
            message=message
        )
        
    except Exception as e:
        logger.error(f"Error processing upload: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/risk/{assessment_id}", response_model=RiskResponse)
async def get_risk_assessment(assessment_id: str):
    """
    Get risk assessment by ID.
    """
    try:
        assessment = await get_assessment(assessment_id)
        if not assessment:
            raise HTTPException(status_code=404, detail="Assessment not found")
        
        return RiskResponse(**assessment["risk_assessment"])
        
    except Exception as e:
        logger.error(f"Error retrieving assessment: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/chat", response_model=ChatResponse)
async def chat_with_ai(request: ChatRequest):
    """
    Chat with the AI about environmental and plant health topics.
    """
    try:
        # Use Victor's chatLLM function
        ai_response = chatLLM(request.phi, request.question)
        
        if not ai_response:
            raise HTTPException(status_code=500, detail="AI response generation failed")
        
        return ChatResponse(response=ai_response, phi=request.phi)
        
    except Exception as e:
        logger.error(f"Error in AI chat: {str(e)}")
        raise HTTPException(status_code=500, detail="AI chat service error")

@app.post("/upload-image")
async def upload_image(file: UploadFile = File(...)):
    """
    Upload and save image as input.png for ML processing.
    """
    try:
        # Save the uploaded image as input.png in the backend directory
        file_path = "input.png"
        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        return {"message": "Image saved successfully as input.png", "filename": file_path}
        
    except Exception as e:
        logger.error(f"Error saving image: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to save image")

@app.get("/health")
async def health_check():
    """
    Health check endpoint.
    """
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
