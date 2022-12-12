function onSubmit(e) {
  e.preventDefault();

  const prompt = document.querySelector("#prompt").value;
  const size = document.querySelector("#size").value;

  if (prompt === "") {
    alert("원하는 이미지를 설명해주세요");
    return;
  }
  console.log("START0", prompt, size);

  generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
  console.log("SDF");
  try {
    showSpinner();
    console.log("START");
    const response = await fetch("/openai/generateimage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });
    if (!response.ok) {
      removeSpinner();
      throw new Error("해당 이미지는 생성될 수 없습니다");
    }
    const data = await response.json();

    const imageUrl = data.data;

    document.querySelector("#image").src = imageUrl;
    removeSpinner();
  } catch (error) {
    document.querySelector(".msg").textContent = error;
  }
}

function showSpinner() {
  document.querySelector(".loading").classList.add("show");
}
function removeSpinner() {
  document.querySelector(".loading").classList.remove("show");
}

document.querySelector("#image-form").addEventListener("submit", onSubmit);
