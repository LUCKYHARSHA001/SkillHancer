const feedbackInput = document.getElementById("feedbackInput");
const feedbackList = document.getElementById("feedbackList");

feedbackInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter" && feedbackInput.value.trim() !== "") {
    addFeedback(feedbackInput.value.trim());
    feedbackInput.value = "";
  }
});

function addFeedback(text) {
  const feedbackBox = document.createElement("div");
  feedbackBox.className = "feedback-box";

  const feedbackText = document.createElement("div");
  feedbackText.innerText = text;

  const likeSection = document.createElement("div");
  likeSection.className = "like-section";

  const likeButton = document.createElement("button");
  likeButton.className = "like-btn";
  likeButton.innerText = "👍";

  const likeCount = document.createElement("span");
  likeCount.className = "like-count";
  likeCount.innerText = "0";

  likeButton.addEventListener("click", () => {
    likeCount.innerText = parseInt(likeCount.innerText) + 1;
  });

  likeSection.appendChild(likeButton);
  likeSection.appendChild(likeCount);

  feedbackBox.appendChild(feedbackText);
  feedbackBox.appendChild(likeSection);

  feedbackList.prepend(feedbackBox);
}


["Great service!", "Website is a bit slow.", "Loved the support team!"].forEach(fb => addFeedback(fb));


const canvas = document.getElementById("dots-bg");
const ctx = canvas.getContext("2d");
let dots = [];
const DOTS_COUNT = 60;
const DOT_RADIUS = 2;
const SPEED = 0.3;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function initDots() {
  dots = [];
  for (let i = 0; i < DOTS_COUNT; i++) {
    dots.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5) * SPEED,
      dy: (Math.random() - 0.5) * SPEED,
    });
  }
}
initDots();

function animateDots() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let dot of dots) {
    dot.x += dot.dx;
    dot.y += dot.dy;
    if (dot.x < 0 || dot.x > canvas.width) dot.dx *= -1;
    if (dot.y < 0 || dot.y > canvas.height) dot.dy *= -1;
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.globalAlpha = 0.8;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
  requestAnimationFrame(animateDots);
}
animateDots();