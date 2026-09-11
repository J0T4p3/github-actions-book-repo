from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI(title="Simple Form API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class FormSubmission(BaseModel):
    name: str
    message: str


@app.get("/api/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/submit")
def submit_form(submission: FormSubmission) -> dict[str, str]:
    return {
        "message": f"Thanks, {submission.name}! Your message was received.",
        "submitted_message": submission.message,
    }
