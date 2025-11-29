function to_registerpage() {
    window.location.href = "../logincheck.html";
}
function to_feedbackpage() {
    window.location.href = "feedback/feedback.html";
}
function to_dashboardpage() {
    window.location.href = "dashboard/dashboard.html";
}
function to_cheatsheet() {
    window.location.href = "cheatsheets/intro.html";
}
function to_languagepage() {
    window.location.href = "languages/cpage.html";
}
function to_resourcespage() {
    window.location.href = "../resources/CSEresource.html";
}


function closeM() {
    document.querySelector('.mobiles-options').style.left = "-280px"; 
}

function openM() {
    document.querySelector('.mobiles-options').style.left = "0px"; 
}


const canvas = document.getElementById('dots-bg');
const ctx = canvas.getContext('2d');
let dots = [];
const DOTS_COUNT = 60;
const DOT_RADIUS = 2;
const SPEED = 0.3;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function initDots() {
    dots = [];
    for (let i = 0; i < DOTS_COUNT; i++) {
        dots.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            dx: (Math.random() - 0.5) * SPEED,
            dy: (Math.random() - 0.5) * SPEED
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
        ctx.fillStyle = 'white';
        ctx.globalAlpha = 0.8;
        ctx.fill();
        ctx.globalAlpha = 1;
    }
    requestAnimationFrame(animateDots);
}
animateDots();