# AI Code Reviewer

## Problem
Manual code reviews take time and effort. Developers need quick feedback on best practices, security, and performance.

## Solution
This project provides an AI-powered code reviewer that:
- Accepts code input
- Reviews for security, performance, and best practices
- Returns structured feedback

## How to Run
1. Go to `api/`
2. Create `.env` with `OPENAI_API_KEY`
3. Install dependencies: `pip install -r requirements.txt`
4. Start backend: `uvicorn main:app --reload --port 8000`
5. Open `frontend/index.html` in browser
