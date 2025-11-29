const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach((item) => {
  const header = item.querySelector(".accordion-header");
  const content = item.querySelector(".accordion-content");
  const icon = item.querySelector(".chevron-icon");
  const counterElement = item.querySelector(".accordion-counter");
  const progressBar = item.querySelector(".progress-bar");
  const checkboxes = item.querySelectorAll(".custom-checkbox");
  const totalProblems = checkboxes.length;

  function updateProgress() {
    const checkedCount = item.querySelectorAll(
      ".custom-checkbox:checked"
    ).length;
    const percentage =
      totalProblems > 0 ? (checkedCount / totalProblems) * 100 : 0;
    if (counterElement) {
      counterElement.textContent = `${checkedCount} / ${totalProblems}`;
    }
    if (progressBar) {
      progressBar.style.width = percentage + "%";
    }
  }

  if (header) {
    header.addEventListener("click", () => {
      if (content) content.classList.toggle("hidden");
      if (icon) icon.classList.toggle("rotate-180");
    });
  }

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updateProgress);
  });

  updateProgress();
});