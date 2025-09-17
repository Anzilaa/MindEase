from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List
import uuid
import os

app = FastAPI(title="MindWell API", description="API for Mental Wellness Resources")

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static files (HTML, CSS, JS)
app.mount("/static", StaticFiles(directory="."), name="static")

# Resource model
class Resource(BaseModel):
    id: str
    title: str
    description: str
    type: str  # video, audio, guide
    language: str
    url: str
    thumbnail: str

# Sample data
resources_data = [
    {
        "id": str(uuid.uuid4()),
        "title": "Mindfulness Meditation Guide",
        "description": "A 10-minute guided meditation for beginners to practice mindfulness.",
        "type": "audio",
        "language": "English",
        "url": "https://example.com/audio/meditation.mp3",
        "thumbnail": "https://www.mindful.org/content/uploads/Meditation-Mindfulness-1-1024x640.jpg"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Yoga for Stress Relief",
        "description": "A gentle yoga sequence to release tension and reduce stress.",
        "type": "video",
        "language": "Hindi",
        "url": "https://www.youtube.com/watch?v=q-ueboQo_jU",
        "thumbnail": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Understanding Anxiety",
        "description": "A comprehensive guide to understanding and managing anxiety.",
        "type": "guide",
        "language": "English",
        "url": "https://www.samh.org.uk/documents/SAMH_Understanding_anxiety%2C_e-use.pdf",
        "thumbnail": "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Deep Breathing Exercises",
        "description": "Learn breathing techniques to calm your nervous system.",
        "type": "audio",
        "language": "Telugu",
        "url": "https://example.com/audio/breathing.mp3",
        "thumbnail": "https://www.bhf.org.uk/-/media/images/information-support/heart-matters/2023/december/wellbeing/deep-breathing-620x400.png?rev=4506ebd34dab4476b56c225b6ff3ad60&la=en&h=400&w=620&hash=725D49F995EDEA5C3934CB671E023CA2"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Cognitive Behavioral Therapy Basics",
        "description": "Introduction to CBT techniques for negative thought patterns.",
        "type": "video",
        "language": "English",
        "url": "https://www.youtube.com/watch?v=vpeLcMdmKek",
        "thumbnail": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Sleep Hygiene Guide",
        "description": "Tips and practices for improving your sleep quality.",
        "type": "guide",
        "language": "English",
        "url": "https://www.cci.health.wa.gov.au/~/media/CCI/Mental-Health-Professionals/Sleep/Sleep---Information-Sheets/Sleep-Information-Sheet---04---Sleep-Hygiene.pdf",
        "thumbnail": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Morning Meditation for Clarity",
        "description": "Start your day with a clear mind and positive energy.",
        "type": "audio",
        "language": "Kannada",
        "url": "https://example.com/audio/morning.mp3",
        "thumbnail": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Managing Depression",
        "description": "Strategies for coping with depressive thoughts and feelings.",
        "type": "video",
        "language": "English",
        "url": "https://www.youtube.com/watch?v=MQB3UUTh8aQ",
        "thumbnail": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
]

@app.get("/")
async def read_root():
    # Compute absolute path to resources.html in the root folder
    file_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "root", "resources.html")
    if os.path.exists(file_path):
        return FileResponse(file_path)
    return {"message": "HTML file not found. Please make sure resources.html exists."}

@app.get("/resources", response_model=List[Resource])
async def get_resources():
    return resources_data

@app.get("/resources/{resource_id}")
async def get_resource(resource_id: str):
    for resource in resources_data:
        if resource["id"] == resource_id:
            return resource
    return {"error": "Resource not found"}

@app.get("/resources/type/{resource_type}")
async def get_resources_by_type(resource_type: str):
    filtered = [r for r in resources_data if r["type"] == resource_type]
    return filtered

@app.get("/resources/language/{language}")
async def get_resources_by_language(language: str):
    filtered = [r for r in resources_data if r["language"].lower() == language.lower()]
    return filtered

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)