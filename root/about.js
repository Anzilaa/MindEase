// Navbar brand glow every 2s
const brand = document.querySelector(".navbar-brand");
setInterval(() => {
  brand.style.textShadow =
    "0 0 10px #a5d6a7, 0 0 20px #66bb6a, 0 0 40px #2e7d32";
  setTimeout(() => (brand.style.textShadow = "none"), 1000);
}, 2000);

// Fade-in effect on scroll for main content
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate__animated", "animate__fadeInUp");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll("main .col-md-6").forEach(el => observer.observe(el));
