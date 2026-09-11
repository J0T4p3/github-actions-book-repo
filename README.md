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

## Releases

Release Please manages the backend and frontend as independent release
components. Each component starts at version `0.1.0` and receives tags such as
`backend-v0.1.1` and `frontend-v0.1.1`.

Use conventional commit scopes to identify the component:

```text
feat(backend): add post validation
fix(frontend): improve mobile layout
```

When changes are pushed to `main`, the Release Please workflow opens or updates
a release pull request. Merging that pull request creates the component's
GitHub release, changelog, and semver tag. A `feat` commit creates a minor
release, while `fix` creates a patch release; use `!` for a breaking change.
