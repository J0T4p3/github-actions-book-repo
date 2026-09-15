from fastapi import FastAPI, HTTPException
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


class BlogPostCreate(BaseModel):
    title: str
    text: str
    author: str


class BlogPost(BlogPostCreate):
    id: int


posts: list[BlogPost] = []
next_post_id = 1




@app.get("/api/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/posts")
def get_posts() -> list[BlogPost]:
    return posts


@app.post("/api/posts", status_code=201)
def create_post(post: BlogPostCreate) -> BlogPost:
    global next_post_id

    created_post = BlogPost(id=next_post_id, **post.model_dump())
    posts.append(created_post)
    next_post_id += 1
    return created_post


@app.delete("/api/posts/{post_id}")
def delete_post(post_id: int) -> BlogPost:
    for index, post in enumerate(posts):
        if post.id == post_id:
            return posts.pop(index)

    raise HTTPException(status_code=404, detail="Post not found")
