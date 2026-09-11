const form = document.querySelector("#message-form");
const result = document.querySelector("#result");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  result.textContent = "Sending...";

  const formData = new FormData(form);
  const payload = {
    name: formData.get("name"),
    message: formData.get("message"),
  };

  try {
    const response = await fetch("http://localhost:8000/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("The server rejected the submission.");
    }

    const data = await response.json();
    result.textContent = data.message;
    form.reset();
  } catch (error) {
    result.textContent = error.message;
  }
});
