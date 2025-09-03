const affirmations = [
  "Fresh beginnings, bright possibilities.",
  "Let light green calm your mind.",
  "Today is a new, positive step.",
  "Feel the energy of nature and renewal."
];
const quoteDiv = document.getElementById("affirmation-quote");
let i = 0;
function showAffirmation() {
  quoteDiv.textContent = affirmations[i % affirmations.length];
  i++;
}
showAffirmation();
setInterval(showAffirmation, 5000);

const heading = document.querySelector(".light-green-heading");
heading.addEventListener("mouseover", () => {
  heading.style.textShadow = "0 0 18px #b4f8c8, 0 0 42px #5dd39e";
});
heading.addEventListener("mouseleave", () => {
  heading.style.textShadow = "0 2px 16px #b4f8c844";
});
