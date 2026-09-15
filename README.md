# Simple Angular + FastAPI project

This project contains a small FastAPI backend and an Angular blog frontend.
Posts are stored in memory and are lost when the backend restarts.

## Run the backend

```bash
cd backend
uv sync
uv run uvicorn main:app --reload
```

The API is available at `http://localhost:8000`. The API provides `GET /api/posts` to retrieve all posts, `POST /api/posts`
to create a post with `title`, `text`, and `author` fields, and `DELETE /api/posts/{post_id}` to remove a post by its ID.
Each returned post includes an `id` field. Interactive API
documentation is available at `http://localhost:8000/docs`.

## Run the frontend

Install the frontend dependencies once, then start the Angular development
server:

```bash
cd frontend
npm install
npm start
```

Open the URL printed by Angular (normally `http://localhost:4200`) and submit
the form.

## Releases

Release Please manages the repository as one project-level release named MPM.
The current project version is `0.3.0`, and future releases use tags in the
format `MPM@major.minor.patch`, such as `MPM@0.3.1` or `MPM@1.0.0`.

Use conventional commits without a backend/frontend release scope:

```text
feat: add post validation
fix: improve mobile layout
```

When changes are pushed to `main`, the Release Please workflow opens or updates
a single release pull request. Merging it creates one GitHub release, a root
`CHANGELOG.md`, and an MPM semver tag. A `feat` commit creates a minor release,
while `fix` creates a patch release; use `!` for a breaking change.
