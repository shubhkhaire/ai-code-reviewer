### Local Setup
- Install Python 3.10+
- Add `.env` file with `OPENAI_API_KEY`
- Run `uvicorn main:app --reload --port 8000`
- Open `frontend/index.html`

### Deployment
- API: Deploy to Railway/Render
- Frontend: Deploy to Vercel/Netlify
- DB: Use SQLite/PostgreSQL with schema.sql
