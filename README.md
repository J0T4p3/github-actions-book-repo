# Simple FastAPI project

This project contains a small FastAPI backend and a static blog frontend. Posts
are stored in memory and are lost when the backend restarts.

## Run the backend

```bash
cd backend
python -m pip install -r requirements.txt
uvicorn main:app --reload
```

The API is available at `http://localhost:8000`. The API provides `GET /api/posts` to retrieve all posts and `POST /api/posts`
to create a post with `title` and `text` fields. Interactive API
documentation is available at `http://localhost:8000/docs`.

## Run the frontend

From the repository root, serve the frontend with any static file server:

```bash
python -m http.server 3000 --directory frontend
```

Open `http://localhost:3000` in a browser and submit the form.
