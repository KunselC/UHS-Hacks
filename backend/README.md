# Drought & Wildfire Risk Assessment Backend

A FastAPI-based backend service for analyzing vegetation health from images and assessing drought and wildfire risk using environmental data.

## Features

- **Image Analysis**: Uses Google Gemini Vision to analyze vegetation health from photos
- **Environmental Data Integration**: Fetches weather from Open-Meteo (free), vegetation data from NASA POWER (free), and fire weather data
- **Risk Assessment**: Combines multiple factors to provide comprehensive risk scores
- **Data Storage**: MongoDB for storing assessment results
- **Async Processing**: Celery for background task processing
- **Docker Support**: Containerized deployment

## API Endpoints

### POST /upload

Upload a vegetation image with location coordinates for analysis.

**Parameters:**

- `file`: Image file (jpg/png)
- `latitude`: Float
- `longitude`: Float

**Response:**

```json
{
  "assessment_id": "string",
  "message": "Assessment completed successfully"
}
```

### GET /risk/{assessment_id}

Retrieve risk assessment results.

**Response:**

```json
{
  "vegetation_health": 75.5,
  "drought_index": {
    "numeric": 2.1,
    "categorical": "Moderate"
  },
  "fire_risk_index": {
    "numeric": 6.8,
    "categorical": "Medium"
  },
  "overall_risk_score": 65.2,
  "risk_category": "High",
  "recommendation": "Water plants regularly. Monitor conditions closely."
}
```

## Setup

### Local Development

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # The Gemini API key is already included
   # Open-Meteo and NASA POWER APIs are free and don't require keys
   ```

4. **Start MongoDB and Redis**

   ```bash
   # Using Docker Compose
   docker-compose up -d mongodb redis
   ```

5. **Start Celery worker (optional, for async processing)**

   ```bash
   ./start_celery.sh
   ```

6. **Run the application**
   ```bash
   uvicorn main:app --reload
   ```

### Docker Deployment

1. **Build and run with Docker Compose**

   ```bash
   docker-compose up --build
   ```

2. **Access the API**
   - API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

### Testing the API

1. **Health check**

   ```bash
   curl http://localhost:8000/health
   ```

2. **Upload image for analysis**

   ```bash
   curl -X POST "http://localhost:8000/upload" \
     -F "file=@/path/to/vegetation_image.jpg" \
     -F "latitude=37.7749" \
     -F "longitude=-122.4194"
   ```

3. **Get risk assessment**
   ```bash
   curl http://localhost:8000/risk/{assessment_id}
   ```

## Configuration

### Required API Keys

- **GEMINI_API_KEY**: Google Gemini Vision API key (provided)
- **OPENWEATHER_API_KEY**: Not needed - using free Open-Meteo API
- **NASA_API_KEY**: Not needed - using free NASA POWER API

### Environment Variables

- `MONGODB_URL`: MongoDB connection string
- `REDIS_URL`: Redis connection string
- `DEBUG`: Enable debug mode
- `LOG_LEVEL`: Logging level (DEBUG, INFO, WARNING, ERROR)

## Cloud Deployment

### AWS

1. **EC2 Instance**

   ```bash
   # Launch EC2 instance with Ubuntu
   # Install Docker
   sudo apt update
   sudo apt install docker.io
   sudo systemctl start docker
   ```

2. **MongoDB Atlas**

   - Create MongoDB Atlas cluster
   - Get connection string
   - Update MONGODB_URL in .env

3. **Deploy**
   ```bash
   # Build and run
   docker-compose up -d
   ```

### Google Cloud

1. **Cloud Run**

   ```bash
   gcloud run deploy --source .
   ```

2. **Cloud Build**
   ```yaml
   # cloudbuild.yaml
   steps:
     - name: "gcr.io/cloud-builders/docker"
       args: ["build", "-t", "gcr.io/$PROJECT_ID/drought-backend", "."]
     - name: "gcr.io/cloud-builders/docker"
       args: ["push", "gcr.io/$PROJECT_ID/drought-backend"]
   ```

## Development

### Running Tests

```bash
pytest
```

### Code Formatting

```bash
black .
isort .
```

### API Documentation

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Architecture

- **FastAPI**: Web framework
- **Gemini Vision**: Image analysis
- **MongoDB**: Data storage
- **Redis**: Message broker for Celery
- **Celery**: Background task processing
- **Docker**: Containerization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Run tests
5. Submit a pull request

## License

MIT License
