function toggleStep(header) {
  const step = header.parentElement;
  const content = step.querySelector(".content");
  const arrow = header.querySelector(".arrow");

  const isVisible = content.style.display === "block";
  content.style.display = isVisible ? "none" : "block";
  arrow.style.transform = isVisible ? "rotate(0deg)" : "rotate(180deg)";
}

function updateProgress(checkbox) {
  const step = checkbox.closest(".step");
  const checkboxes = step.querySelectorAll("input[type='checkbox']");
  const checked = step.querySelectorAll(
    "input[type='checkbox']:checked"
  ).length;
  const total = checkboxes.length;

  const percent = (checked / total) * 100;
  step.querySelector(".progress-bar div").style.width = percent + "%";
  step.querySelector(".progress-count").textContent = `${checked} / ${total}`;
}