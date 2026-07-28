// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Live clock in hero viewport
const clockEl = document.getElementById('clock');
function tickClock(){
  const now = new Date();
  const hh = String(now.getHours()).padStart(2,'0');
  const mm = String(now.getMinutes()).padStart(2,'0');
  const ss = String(now.getSeconds()).padStart(2,'0');
  clockEl.textContent = `${hh}:${mm}:${ss}`;
}
tickClock();
setInterval(tickClock, 1000);

// Crosshair coordinates follow the pointer within the hero viewport
const heroViewport = document.querySelector('.hero .viewport');
const coordX = document.getElementById('coordX');
const coordY = document.getElementById('coordY');

if (heroViewport && window.matchMedia('(hover: hover)').matches) {
  heroViewport.addEventListener('mousemove', (e) => {
    const rect = heroViewport.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    coordX.textContent = `X: ${x.toFixed(1)}`;
    coordY.textContent = `Y: ${y.toFixed(1)}`;
  });
}

// Scroll reveal
const revealTargets = document.querySelectorAll('.section, .contact-section .viewport');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => observer.observe(el));

// Hero viewport is visible on load — reveal immediately
window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.hero .viewport').classList.add('in-view');
});
