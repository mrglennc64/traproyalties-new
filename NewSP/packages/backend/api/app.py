import sys
import os
from pathlib import Path

# Add the backend directory to Python path
backend_dir = Path(__file__).parent.parent
sys.path.append(str(backend_dir))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services.pro_scanner import PROScanner
import uvicorn

app = FastAPI()

# Allow frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3002"],
    allow_methods=["*"],
    allow_headers=["*"],
)

scanner = PROScanner()

@app.post("/api/scan-catalog")
async def scan_catalog(tracks: list):
    """Scan a catalog of tracks across PROs"""
    results = scanner.batch_scan_catalog(tracks)
    return results

@app.get("/api/health")
async def health():
    return {"status": "healthy", "service": "PRO Scanner"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)