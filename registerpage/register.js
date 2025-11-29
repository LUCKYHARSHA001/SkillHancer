document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const repasswordInput = document.getElementById("repassword");

  function updateInputStyles(focusedElementId) {
    emailInput.classList.remove(
      "default-width",
      "expanded-width",
      "shrunk-width",
      "border-right"
    );
    passwordInput.classList.remove(
      "default-width",
      "expanded-width",
      "shrunk-width",
      "border-right"
    );

    if (focusedElementId === "email") {
      emailInput.classList.add("expanded-width");
      passwordInput.classList.add("shrunk-width");
    } else if (focusedElementId === "password") {
      passwordInput.classList.add("expanded-width");
      emailInput.classList.add("shrunk-width");
    } else {
      emailInput.classList.add("default-width");
      passwordInput.classList.add("default-width");
    }
  }

  updateInputStyles(null);
  emailInput.addEventListener("focus", () => updateInputStyles("email"));

  passwordInput.addEventListener("focus", () => updateInputStyles("password"));

  emailInput.addEventListener("blur", () => {
    if (document.activeElement !== passwordInput) {
      updateInputStyles(null);
    }
  });
  passwordInput.addEventListener("blur", () => {
    if (document.activeElement !== emailInput) {
      updateInputStyles(null);
    }
  });
});
function to_signinpage() {
  const newLocal = window.location.href = "../loginpage/login.html";
}