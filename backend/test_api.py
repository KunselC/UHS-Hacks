#!/usr/bin/env python3
"""
Test script for the Drought & Wildfire Risk Assessment API.
"""

import asyncio
import httpx
import json

async def test_api():
    """Test the API endpoints."""
    
    # Test health check
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get("http://localhost:8000/health")
            print(f"Health check: {response.status_code}")
            print(f"Response: {response.json()}")
        except Exception as e:
            print(f"Health check failed: {e}")
            return
    
    print("\nAPI is running! Ready for testing.")
    print("To test the /upload endpoint, you can use curl:")
    print("""
curl -X POST "http://localhost:8000/upload" \\
  -F "file=@/path/to/your/image.jpg" \\
  -F "latitude=37.7749" \\
  -F "longitude=-122.4194"
""")

if __name__ == "__main__":
    asyncio.run(test_api())
