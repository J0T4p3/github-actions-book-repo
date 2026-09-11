from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI(title="Simple Blog API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class BlogPost(BaseModel):
    title: str
    text: str


posts: list[BlogPost] = []


@app.get("/api/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/posts")
def get_posts() -> list[BlogPost]:
    return posts


@app.post("/api/posts", status_code=201)
def create_post(post: BlogPost) -> BlogPost:
    posts.append(post)
    return post
