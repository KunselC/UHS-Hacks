import httpx
import os
import json
from typing import Dict, Any
import asyncio
from loguru import logger

# API Keys
# Note: Open-Meteo and NASA POWER don't require API keys for basic usage
NASA_API_KEY = os.getenv("NASA_API_KEY", "")  # Optional for POWER API

async def get_environmental_data(latitude: float, longitude: float) -> Dict[str, Any]:
    """
    Fetch environmental data from various APIs.
    
    Returns dict with weather, drought, vegetation indices, and fire data.
    """
    data = {}
    
    try:
        # Fetch weather data
        weather_data = await get_weather_data(latitude, longitude)
        data['weather'] = weather_data
        
        # Fetch drought data
        drought_data = await get_drought_data(latitude, longitude)
        data['drought'] = drought_data
        
        # Fetch vegetation indices
        veg_data = await get_vegetation_data(latitude, longitude)
        data['vegetation'] = veg_data
        
        # Fetch fire weather data
        fire_data = await get_fire_weather_data(latitude, longitude)
        data['fire_weather'] = fire_data
        
        logger.info(f"Successfully fetched environmental data for {latitude}, {longitude}")
        return data
        
    except Exception as e:
        logger.error(f"Error fetching environmental data: {str(e)}")
        # Return default/mock data
        return {
            'weather': {'temperature': 25, 'humidity': 50, 'precipitation': 0},
            'drought': {'index': 2.0, 'category': 'Moderate'},
            'vegetation': {'ndvi': 0.6},
            'fire_weather': {'fwi': 5.0, 'category': 'Low'}
        }

async def get_weather_data(lat: float, lon: float) -> Dict[str, Any]:
    """Get weather data from Open-Meteo (free, no API key required)."""
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,relative_humidity_2m,precipitation&hourly=temperature_2m,relative_humidity_2m,precipitation&timezone=auto"
    
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        if response.status_code == 200:
            data = response.json()
            current = data.get('current', {})
            return {
                'temperature': current.get('temperature_2m', 25),
                'humidity': current.get('relative_humidity_2m', 50),
                'precipitation': current.get('precipitation', 0)
            }
        else:
            logger.warning(f"Open-Meteo API error: {response.status_code}")
            return {'temperature': 25, 'humidity': 50, 'precipitation': 0}

async def get_drought_data(lat: float, lon: float) -> Dict[str, Any]:
    """Get drought data from US Drought Monitor."""
    # For simplicity, using a mock API or static data
    # In production, integrate with actual drought APIs
    return {
        'index': 1.5,  # Palmer Drought Severity Index
        'category': 'Mild'
    }

async def get_vegetation_data(lat: float, lon: float) -> Dict[str, Any]:
    """Get vegetation and meteorological data from NASA POWER API (free, no API key required)."""
    # NASA POWER API provides meteorological data including some vegetation-related parameters
    url = f"https://power.larc.nasa.gov/api/temporal/daily/point?start=20240101&end=20240102&latitude={lat}&longitude={lon}&community=RE&parameters=T2M,RH2M,PRECTOTCORR,ALLSKY_SFC_SW_DWN&format=json"
    
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        if response.status_code == 200:
            data = response.json()
            properties = data.get('properties', {})
            parameter_data = properties.get('parameter', {})
            
            # Extract some relevant parameters
            # Note: POWER API doesn't provide direct NDVI, but we can use solar radiation as proxy
            solar_radiation = parameter_data.get('ALLSKY_SFC_SW_DWN', {})
            if solar_radiation:
                # Use solar radiation as a proxy for vegetation health (higher radiation = healthier vegetation)
                latest_value = list(solar_radiation.values())[0] if solar_radiation else 200
                # Convert to 0-1 scale roughly
                ndvi_proxy = min(1.0, max(0.0, latest_value / 300))
                return {'ndvi': ndvi_proxy * 100}  # Convert to 0-100 scale
            
            return {'ndvi': 0.6}
        else:
            logger.warning(f"NASA POWER API error: {response.status_code}")
            return {'ndvi': 0.6}

async def get_fire_weather_data(lat: float, lon: float) -> Dict[str, Any]:
    """Get fire weather data."""
    # Simplified fire weather index calculation
    # In production, integrate with RAWS or similar
    return {
        'fwi': 4.2,  # Fire Weather Index
        'category': 'Low'
    }
