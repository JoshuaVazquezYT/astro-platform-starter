from fastapi import FastAPI, Form, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
import requests
import os
import json
from typing import Optional
import base64

app = FastAPI(title="TTS AI Video Generator API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load API key from environment variable
ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY", "YOUR_ELEVENLABS_API_KEY")

# Voice options with SFW/NSFW categories
VOICE_OPTIONS = []
for i in range(100):
    category = "SFW" if i < 50 else "NSFW"
    gender = "female" if i % 3 == 0 else "male" if i % 3 == 1 else "neutral"
    age = "young" if i % 3 == 0 else "adult" if i % 3 == 1 else "mature"
    accent = ["American", "British", "Australian", "Canadian", "Irish"][i % 5]
    
    VOICE_OPTIONS.append({
        "id": f"VOICE_ID_{i:03d}",
        "name": f"{category} Voice {i + 1}",
        "gender": gender,
        "age": age,
        "accent": accent,
        "description": f"A {age} {gender} voice with {accent} accent ({category})",
        "category": category.lower()
    })

# Style options with SFW/NSFW categories
STYLE_OPTIONS = []
for i in range(100):
    category = "SFW" if i < 50 else "NSFW"
    genres = ["Animation", "Realistic", "Artistic", "Sci-Fi", "Fantasy"] if i < 50 else ["Intimate", "Artistic", "Fantasy", "Luxury", "Performance"]
    genre = genres[i % len(genres)]
    
    STYLE_OPTIONS.append({
        "id": f"STYLE_ID_{i:03d}",
        "name": f"{category} Style {i + 1}",
        "description": f"A {genre.lower()} {category.lower()} video style",
        "category": category.lower(),
        "genre": genre
    })

@app.get("/")
def read_root():
    return {"message": "TTS AI Video Generator API", "version": "1.0.0"}

@app.get("/voices")
def get_voices(category: Optional[str] = None):
    """Get all available voices, optionally filtered by category (sfw/nsfw)"""
    voices = VOICE_OPTIONS
    if category:
        voices = [v for v in voices if v["category"] == category.lower()]
    return {"voices": voices}

@app.get("/styles")
def get_styles(category: Optional[str] = None):
    """Get all available styles, optionally filtered by category (sfw/nsfw)"""
    styles = STYLE_OPTIONS
    if category:
        styles = [s for s in styles if s["category"] == category.lower()]
    return {"styles": styles}

@app.post("/generate-tts")
async def generate_tts(text: str = Form(...), voice_id: str = Form(...)):
    """Generate text-to-speech audio using ElevenLabs API"""
    if not text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    
    if ELEVENLABS_API_KEY == "YOUR_ELEVENLABS_API_KEY":
        # Mock response for demo purposes
        return {
            "success": True,
            "message": "TTS generation complete (mocked)",
            "voice_id": voice_id,
            "text_length": len(text),
            "audio_duration": len(text) * 0.1  # Rough estimate
        }
    
    try:
        response = requests.post(
            f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}",
            headers={
                "xi-api-key": ELEVENLABS_API_KEY,
                "Content-Type": "application/json"
            },
            json={
                "text": text,
                "voice_settings": {
                    "stability": 0.5,
                    "similarity_boost": 0.75,
                    "style": 0.0,
                    "use_speaker_boost": True
                }
            }
        )
        
        if response.status_code == 200:
            # Convert audio to base64 for JSON response
            audio_base64 = base64.b64encode(response.content).decode('utf-8')
            return {
                "success": True,
                "audio_base64": audio_base64,
                "voice_id": voice_id,
                "text_length": len(text)
            }
        else:
            raise HTTPException(status_code=response.status_code, detail="TTS generation failed")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"TTS generation error: {str(e)}")

@app.post("/generate-video")
async def generate_video(
    text: str = Form(...),
    voice_id: str = Form(...),
    style_id: str = Form(...),
    mode: str = Form(default="sfw")
):
    """Generate AI video with TTS (mocked until backend is integrated)"""
    
    # Validate inputs
    if not text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    
    voice = next((v for v in VOICE_OPTIONS if v["id"] == voice_id), None)
    style = next((s for s in STYLE_OPTIONS if s["id"] == style_id), None)
    
    if not voice:
        raise HTTPException(status_code=400, detail="Invalid voice ID")
    if not style:
        raise HTTPException(status_code=400, detail="Invalid style ID")
    
    # Check category matching
    if mode.lower() == "sfw" and (voice["category"] == "nsfw" or style["category"] == "nsfw"):
        raise HTTPException(status_code=400, detail="Cannot use NSFW voice/style in SFW mode")
    
    # Mock video generation process
    return {
        "success": True,
        "message": "Video generation started (mocked)",
        "job_id": f"job_{hash(text + voice_id + style_id) % 1000000:06d}",
        "estimated_duration": len(text) * 2,  # 2 seconds per character estimate
        "voice": voice,
        "style": style,
        "mode": mode,
        "status": "processing"
    }

@app.get("/status/{job_id}")
def get_status(job_id: str):
    """Get video generation status"""
    # Mock status response
    import random
    progress = random.randint(10, 95)
    
    return {
        "job_id": job_id,
        "status": "processing" if progress < 95 else "completed",
        "progress": progress,
        "message": f"Generating video... {progress}% complete",
        "estimated_time_remaining": max(0, (100 - progress) * 2)  # seconds
    }

@app.post("/upload-file")
async def upload_file(file: UploadFile = File(...)):
    """Upload a file for processing"""
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded")
    
    # Mock file processing
    file_size = len(await file.read())
    await file.seek(0)  # Reset file pointer
    
    return {
        "success": True,
        "filename": file.filename,
        "size": file_size,
        "content_type": file.content_type,
        "message": "File uploaded successfully (mocked)"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)