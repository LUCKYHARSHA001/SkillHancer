document.addEventListener("DOMContentLoaded", function () {
  const sidebarButtons = document.querySelectorAll(".sidebar-button");
  const dashboardSections = document.querySelectorAll(".dashboard-section");

  function showSection(sectionId) {
    dashboardSections.forEach((section) => {
      section.classList.remove("active");
    });
    document.getElementById(sectionId).classList.add("active");
  }

  sidebarButtons.forEach((button) => {
    button.addEventListener("click", function () {
      sidebarButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const contentId = this.dataset.content + "-content";
      showSection(contentId);
    });
  });

  if (sidebarButtons.length > 0) {
    sidebarButtons[0].click();
  }

  const updateProgressBtn = document.querySelector(".update-progress-btn");
  if (updateProgressBtn) {
    updateProgressBtn.addEventListener("click", function () {
      alert(
        "Progress update feature under development! (This is just a dummy button)"
      );
    });
  }
});