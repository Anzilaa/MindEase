from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List
import uuid
import os

app = FastAPI(title="MindEase API", description="API for Mental Wellness Resources")

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

# Resource model - updated to match frontend structure
class Resource(BaseModel):
    id: int
    title: str
    description: str
    type: str  # video, audio, guide
    language: str
    url: str
    thumbnail: str

# Sample data from frontend
resources_data = [
    {
        "id": 1,
        "title": "Mindful Breathing",
        "description": "A short guide to mindful breathing.",
        "type": "guide",
        "language": "english",
        "url": "#",
        "thumbnail": "https://www.mindful.org/content/uploads/Meditation-Mindfulness-1-1024x640.jpg"
    },
    {
        "id": 2,
        "title": "Guided Meditation",
        "description": "A relaxing audio meditation.",
        "type": "audio",
        "language": "hindi",
        "url": "#",
        "thumbnail": "https://www.shutterstock.com/image-vector/deep-breath-mindfulness-concept-woman-260nw-2497488045.jpg"
    },
    {
        "id": 3,
        "title": "Managing Stress",
        "description": "Video tips to manage daily stress.",
        "type": "video",
        "language": "english",
        "url": "#",
        "thumbnail": "https://thumbs.dreamstime.com/b/professional-stress-management-work-cartoon-subordinate-laughs-boss-anger-managing-emotions-workplace-resolves-conflict-149996769.jpg"
    },
    {
        "id": 4,
        "title": "Journaling for Anxiety",
        "description": "A guide on how to use journaling.",
        "type": "guide",
        "language": "hindi",
        "url": "#",
        "thumbnail": "https://gocalmer.com/images/woman-with-a-journal.jpeg"
    },
    {
        "id": 5,
        "title": "Peaceful Sleep Music",
        "description": "Music to help you fall asleep.",
        "type": "audio",
        "language": "english",
        "url": "#",
        "thumbnail": "https://thumbs.dreamstime.com/b/person-illustrated-sleeping-bed-wearing-smartwatch-displays-heart-rate-other-health-data-room-softly-lit-396695210.jpg"
    },
    {
        "id": 6,
        "title": "Yoga for Calmness",
        "description": "Simple yoga poses for relaxation.",
        "type": "video",
        "language": "bengali",
        "url": "#",
        "thumbnail": "https://static.vecteezy.com/system/resources/previews/024/620/959/non_2x/yoga-meditation-mindfulness-relaxation-and-inner-peace-serene-calm-woman-enjoying-meditation-in-nature-while-her-eyes-closed-breathing-exercises-with-hands-in-zen-gesture-concept-illustration-vector.jpg"
    },
    {
        "id": 7,
        "title": "Coping with Depression",
        "description": "A short guide to coping mechanisms.",
        "type": "guide",
        "language": "telugu",
        "url": "#",
        "thumbnail": "https://click2pro.com/media/blog/74dd755258738135ac18558a69faaa01.jpg"
    },
    {
        "id": 8,
        "title": "Breathing Exercises",
        "description": "Simple breathing exercises for quick relief.",
        "type": "audio",
        "language": "marathi",
        "url": "#",
        "thumbnail": "https://lirp.cdn-website.com/056e16c2/dms3rep/multi/opt/Deep+Breathing+Exercises+3-640w.png"
    },
    {
        "id": 9,
        "title": "Healthy Mindset",
        "description": "A video about building a positive mindset.",
        "type": "video",
        "language": "tamil",
        "url": "#",
        "thumbnail": "https://img.freepik.com/premium-vector/mental-health-concept-woman-with-mind-healthy-icons-illustration-design_24877-66811.jpg"
    },
    {
        "id": 10,
        "title": "Managing Overthinking",
        "description": "Guide to stop overthinking.",
        "type": "guide",
        "language": "gujarati",
        "url": "#",
        "thumbnail": "https://c8.alamy.com/comp/2WP8YF6/anxiety-character-mental-health-issues-woman-coping-with-psychological-stress-mental-disorder-emotional-and-physical-symptom-flat-vector-illustration-2WP8YF6.jpg"
    },
    {
        "id": 11,
        "title": "Relaxing Rain Sounds",
        "description": "Audio for a relaxing atmosphere.",
        "type": "audio",
        "language": "kannada",
        "url": "#",
        "thumbnail": "https://blenderartists.org/uploads/default/optimized/4X/f/4/b/f4b2c7eb7a8bf328098b9481872fadb9e57ffb26_2_1024x1024.jpeg"
    },
    {
        "id": 12,
        "title": "Self-Care Tips",
        "description": "A video on simple self-care routines.",
        "type": "video",
        "language": "malayalam",
        "url": "#",
        "thumbnail": "https://media.licdn.com/dms/image/v2/D4D12AQHTtPVP_3J3Jw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1687946240654?e=2147483647&v=beta&t=DHjvqt6_QkzZMMYGt8FkQ26By7e_vO_1XjekI6wR7Uc"
    },
    {
        "id": 13,
        "title": "Gratitude Journal",
        "description": "A guide to starting a gratitude journal.",
        "type": "guide",
        "language": "punjabi",
        "url": "#",
        "thumbnail": "https://media.istockphoto.com/id/1488247074/vector/learning-and-reading-concept.jpg?s=612x612&w=0&k=20&c=qPiVkW4bjR4xJ-iugnBub-OGL8HA4D2u6d0DcwS0V3g="
    },
    {
        "id": 14,
        "title": "Calmness Meditation",
        "description": "A deep meditation audio for calmness.",
        "type": "audio",
        "language": "odia",
        "url": "#",
        "thumbnail": "https://static.vecteezy.com/system/resources/previews/024/620/959/non_2x/yoga-meditation-mindfulness-relaxation-and-inner-peace-serene-calm-woman-enjoying-meditation-in-nature-while-her-eyes-closed-breathing-exercises-with-hands-in-zen-gesture-concept-illustration-vector.jpg"
    },
    {
        "id": 15,
        "title": "Emotional Regulation",
        "description": "Video on how to regulate emotions.",
        "type": "video",
        "language": "assamese",
        "url": "#",
        "thumbnail": "https://lindsaybraman.com/wp-content/uploads/2021/03/LB-2021-Rainbow-Regulation-SEL-SlidesB-2.png"
    }
]

@app.get("/")
async def read_root():
    
    file_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "root", "resources.html")
    if os.path.exists(file_path):
        return FileResponse(file_path)
    return {"message": "HTML file not found. Please make sure resources.html exists."}

@app.get("/resources", response_model=List[Resource])
async def get_resources():
    return resources_data

@app.get("/resources/{resource_id}")
async def get_resource(resource_id: int):
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