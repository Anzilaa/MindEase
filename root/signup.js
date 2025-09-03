const affirmations = [
  "Green energy brings renewal.",
  "Welcome! Grow and thrive with us.",
  "Your wellness is budding forth.",
  "Nature-inspired calm starts here."
];
const quoteDiv = document.getElementById("affirmation-quote");
let i = 0;
function showAffirmation() {
  quoteDiv.textContent = affirmations[i % affirmations.length];
  i++;
}
showAffirmation();
setInterval(showAffirmation, 5000);

const heading = document.querySelector(".green-heading");
heading.addEventListener("mouseover", () => {
  heading.style.textShadow = "0 0 16px #66bb6a, 0 0 40px #23b95f";
});
heading.addEventListener("mouseleave", () => {
  heading.style.textShadow = "0 2px 5px #388e3c55";
});

// Password confirmation validation
const form = document.getElementById("signup-form");
form.addEventListener("submit", function(event) {
  const password = document.getElementById("signup-password").value;
  const confirm = document.getElementById("signup-confirm").value;
  if (password !== confirm) {
    event.preventDefault();
    alert("Passwords do not match!");
  }
});
