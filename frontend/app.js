const form = document.querySelector("#post-form");
const result = document.querySelector("#result");
const postsList = document.querySelector("#posts-list");

function renderPosts(posts) {
  postsList.replaceChildren();

  if (posts.length === 0) {
    postsList.textContent = "No posts yet. Be the first to publish one.";
    return;
  }

  posts.forEach((post) => {
    const article = document.createElement("article");
    const title = document.createElement("h3");
    const text = document.createElement("p");
    const author = document.createElement("p");

    title.textContent = post.title;
    text.textContent = post.text;
    author.textContent = post.author;
    article.append(title, text, author);
    postsList.append(article);
  });
}

async function loadPosts() {
  const response = await fetch("http://localhost:8000/api/posts");
  if (!response.ok) {
    throw new Error("Unable to load posts.");
  }

  renderPosts(await response.json());
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  result.textContent = "Sending...";

  const formData = new FormData(form);
  const payload = {
    title: formData.get("title"),
    text: formData.get("text"),
    author: formData.get("author-name"),
  };

  try {
    const response = await fetch("http://localhost:8000/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("The server rejected the submission.");
    }

    const data = await response.json();
    result.textContent = "Post published.";
    form.reset();
    await loadPosts();
  } catch (error) {
    result.textContent = error.message;
  }
});

loadPosts().catch((error) => {
  result.textContent = error.message;
});
