from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class Contact(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    company: Optional[str] = None
    phone: Optional[str] = None
    message: str
    service_interest: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    phone: Optional[str] = None
    message: str
    service_interest: Optional[str] = None

class QuoteRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    company: str
    phone: str
    project_type: str
    budget: str
    timeline: str
    description: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class QuoteRequestCreate(BaseModel):
    name: str
    email: EmailStr
    company: str
    phone: str
    project_type: str
    budget: str
    timeline: str
    description: str

class Project(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    client: str
    category: str  # web, mobile, ux, marketing
    description: str
    challenge: str
    solution: str
    results: str
    technologies: List[str]
    image_url: str
    featured: bool = False
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    slug: str
    author: str
    category: str  # ux-design, web-development, mobile, emerging-tech
    excerpt: str
    content: str
    image_url: str
    published: bool = True
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Testimonial(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    company: str
    role: str
    content: str
    rating: int
    image_url: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Newsletter(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class NewsletterCreate(BaseModel):
    email: EmailStr


# Routes
@api_router.get("/")
async def root():
    return {"message": "Agency API is running"}

# Contact endpoints
@api_router.post("/contacts", response_model=Contact)
async def create_contact(input: ContactCreate):
    contact_dict = input.model_dump()
    contact_obj = Contact(**contact_dict)
    
    doc = contact_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    await db.contacts.insert_one(doc)
    return contact_obj

@api_router.get("/contacts", response_model=List[Contact])
async def get_contacts():
    contacts = await db.contacts.find({}, {"_id": 0}).to_list(1000)
    
    for contact in contacts:
        if isinstance(contact['timestamp'], str):
            contact['timestamp'] = datetime.fromisoformat(contact['timestamp'])
    
    return contacts

# Quote request endpoints
@api_router.post("/quotes", response_model=QuoteRequest)
async def create_quote(input: QuoteRequestCreate):
    quote_dict = input.model_dump()
    quote_obj = QuoteRequest(**quote_dict)
    
    doc = quote_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    await db.quotes.insert_one(doc)
    return quote_obj

@api_router.get("/quotes", response_model=List[QuoteRequest])
async def get_quotes():
    quotes = await db.quotes.find({}, {"_id": 0}).to_list(1000)
    
    for quote in quotes:
        if isinstance(quote['timestamp'], str):
            quote['timestamp'] = datetime.fromisoformat(quote['timestamp'])
    
    return quotes

# Portfolio/Projects endpoints
@api_router.get("/projects", response_model=List[Project])
async def get_projects(category: Optional[str] = None, featured: Optional[bool] = None):
    query = {}
    if category:
        query['category'] = category
    if featured is not None:
        query['featured'] = featured
    
    projects = await db.projects.find(query, {"_id": 0}).to_list(1000)
    
    for project in projects:
        if isinstance(project['timestamp'], str):
            project['timestamp'] = datetime.fromisoformat(project['timestamp'])
    
    return projects

@api_router.get("/projects/{project_id}", response_model=Project)
async def get_project(project_id: str):
    project = await db.projects.find_one({"id": project_id}, {"_id": 0})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    if isinstance(project['timestamp'], str):
        project['timestamp'] = datetime.fromisoformat(project['timestamp'])
    
    return project

# Blog endpoints
@api_router.get("/blog", response_model=List[BlogPost])
async def get_blog_posts(category: Optional[str] = None):
    query = {"published": True}
    if category:
        query['category'] = category
    
    posts = await db.blog_posts.find(query, {"_id": 0}).sort("timestamp", -1).to_list(1000)
    
    for post in posts:
        if isinstance(post['timestamp'], str):
            post['timestamp'] = datetime.fromisoformat(post['timestamp'])
    
    return posts

@api_router.get("/blog/{slug}", response_model=BlogPost)
async def get_blog_post(slug: str):
    post = await db.blog_posts.find_one({"slug": slug, "published": True}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    if isinstance(post['timestamp'], str):
        post['timestamp'] = datetime.fromisoformat(post['timestamp'])
    
    return post

# Testimonials endpoints
@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    testimonials = await db.testimonials.find({}, {"_id": 0}).to_list(1000)
    
    for testimonial in testimonials:
        if isinstance(testimonial['timestamp'], str):
            testimonial['timestamp'] = datetime.fromisoformat(testimonial['timestamp'])
    
    return testimonials

# Newsletter endpoint
@api_router.post("/newsletter", response_model=Newsletter)
async def subscribe_newsletter(input: NewsletterCreate):
    # Check if email already exists
    existing = await db.newsletter.find_one({"email": input.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already subscribed")
    
    newsletter_dict = input.model_dump()
    newsletter_obj = Newsletter(**newsletter_dict)
    
    doc = newsletter_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    await db.newsletter.insert_one(doc)
    return newsletter_obj


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()