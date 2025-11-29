document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("main-header");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      }
    });
  });

  const animatedItems = document.querySelectorAll(".animated-item");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );
  animatedItems.forEach((item) => observer.observe(item));

  const contactForm = document.querySelector(".contact-form");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const submitButton = contactForm.querySelector(".btn-submit");
    const originalText = submitButton.textContent;
    submitButton.textContent = "Thank you!";
    submitButton.style.backgroundColor = "#28a745";
    setTimeout(() => {
      submitButton.textContent = originalText;
      submitButton.style.backgroundColor = "#6ed3cf";
      contactForm.reset();
    }, 3000);
  });

  const canvas = document.getElementById("neural-canvas");
  const ctx = canvas.getContext("2d");

  let particlesArray;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const mouse = { x: null, y: null };
  window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
  });

  class Particle {
    constructor(x, y, directionX, directionY, size) {
      this.x = x;
      this.y = y;
      this.directionX = directionX;
      this.directionY = directionY;
      this.size = size;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = "rgba(110, 211, 207, 0.5)";
      ctx.fill();
    }

    update() {
      if (this.x > canvas.width || this.x < 0)
        this.directionX = -this.directionX;
      if (this.y > canvas.height || this.y < 0)
        this.directionY = -this.directionY;
      this.x += this.directionX;
      this.y += this.directionY;
      this.draw();
    }
  }

  function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
      let size = Math.random() * 2 + 1;
      let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
      let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
      let directionX = Math.random() * 0.4 - 0.2;
      let directionY = Math.random() * 0.4 - 0.2;
      particlesArray.push(new Particle(x, y, directionX, directionY, size));
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
    }
    connect();
  }

  function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        let distance = Math.sqrt(
          Math.pow(particlesArray[a].x - particlesArray[b].x, 2) +
            Math.pow(particlesArray[a].y - particlesArray[b].y, 2)
        );
        if (distance < canvas.width / 7) {
          opacityValue = 1 - distance / 150;
          ctx.strokeStyle = `rgba(110, 211, 207, ${opacityValue})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }

  window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
  });

  window.addEventListener("mouseout", () => {
    mouse.x = undefined;
    mouse.y = undefined;
  });

  init();
  animate();
});