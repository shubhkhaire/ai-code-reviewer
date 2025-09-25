from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv
import json


# Load API key from .env
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY not found in .env file!")

app = FastAPI(title="AI Code Reviewer")

# ✅ Enable CORS so React frontend can access this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development; change to frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeInput(BaseModel):
    code: str

@app.post("/api/review")
def review_code(input: CodeInput):
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "gpt-4",
        "messages": [
            {
                "role": "system",
                "content": (
                    "You are a strict code reviewer. "
                    "Check the following code for security, performance, and best practices. "
                    "Respond strictly in JSON with keys: Security, Performance, BestPractices, OverallRating."
                )
            },
            {"role": "user", "content": input.code}
        ],
        "temperature": 0
    }

    try:
        response = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers=headers,
            json=payload,
            timeout=30
        )
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        return {"review": {"error": f"Request failed: {str(e)}"}}

    data = response.json()
    content = data.get("choices", [{}])[0].get("message", {}).get("content", "")

    try:
        review = json.loads(content)
    except json.JSONDecodeError:
        review = {"error": "Invalid JSON from OpenAI", "raw": content}

    return {"review": review}
