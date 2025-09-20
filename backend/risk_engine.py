from typing import Dict, Any
import math

def calculate_risk(vegetation_health: float, environmental_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Calculate overall risk score combining vegetation health and environmental factors.
    
    Returns dict with risk scores and recommendations.
    """
    
    # Extract environmental factors
    drought_index = environmental_data.get('drought', {}).get('index', 2.0)
    fire_fwi = environmental_data.get('fire_weather', {}).get('fwi', 5.0)
    weather_temp = environmental_data.get('weather', {}).get('temperature', 25)
    weather_humidity = environmental_data.get('weather', {}).get('humidity', 50)
    
    # Normalize vegetation health (already 0-100)
    veg_score = vegetation_health
    
    # Normalize drought index (assuming -4 to +4 range, convert to 0-100)
    drought_score = max(0, min(100, (drought_index + 4) * 12.5))
    
    # Normalize fire weather index (assuming 0-30 range, convert to 0-100)
    fire_score = max(0, min(100, (fire_fwi / 30) * 100))
    
    # Weight the factors
    # Vegetation health: 40%
    # Drought: 30%
    # Fire weather: 30%
    overall_risk = (veg_score * 0.4) + (drought_score * 0.3) + (fire_score * 0.3)
    
    # Determine risk category
    if overall_risk < 25:
        category = "Low"
    elif overall_risk < 50:
        category = "Medium"
    elif overall_risk < 75:
        category = "High"
    else:
        category = "Extreme"
    
    # Generate recommendation
    recommendation = generate_recommendation(veg_score, drought_score, fire_score, category)
    
    return {
        'vegetation_health': veg_score,
        'drought_index': {
            'numeric': drought_index,
            'categorical': environmental_data.get('drought', {}).get('category', 'Unknown')
        },
        'fire_risk_index': {
            'numeric': fire_fwi,
            'categorical': environmental_data.get('fire_weather', {}).get('category', 'Unknown')
        },
        'overall_risk_score': round(overall_risk, 1),
        'risk_category': category,
        'recommendation': recommendation
    }

def generate_recommendation(veg_score: float, drought_score: float, fire_score: float, category: str) -> str:
    """Generate advisory text based on risk factors."""
    
    recommendations = []
    
    if veg_score < 50:
        recommendations.append("Water plants regularly to improve vegetation health")
    
    if drought_score > 50:
        recommendations.append("Implement water conservation measures")
    
    if fire_score > 50:
        recommendations.append("Clear dry vegetation and maintain defensible space")
    
    if category == "Extreme":
        recommendations.append("URGENT: High wildfire and drought risk - take immediate action")
    elif category == "High":
        recommendations.append("Monitor conditions closely and prepare emergency plans")
    
    if not recommendations:
        recommendations.append("Conditions are favorable - continue normal maintenance")
    
    return ". ".join(recommendations)
