const affirmations = [
  "You are capable of amazing things!",
  "Every day is a fresh start.",
  "You are stronger than you think.",
  "Believe in yourself and all that you are.",
  "Your potential is endless.",
  "You are worthy of love and success.",
  "Progress, not perfection.",
  "You are enough, just as you are.",
  "Difficult roads often lead to beautiful destinations.",
  "You can do hard things!",
  "Your mind is powerful and your heart is brave.",
  "Small steps every day lead to big results.",
  "You are making a difference just by being you.",
  "Let go of what you can’t control.",
  "You are growing, even when it feels slow.",
  "You have overcome so much already.",
  "Your dreams are valid and achievable.",
  "You radiate positivity and strength.",
  "You are not alone on this journey.",
  "You are becoming the best version of yourself.",
  "Peace begins with you.",
  "Your feelings are valid.",
  "Breathe in calm, breathe out stress.",
  "Healing is a journey, not a race.",
  "You bring light into the world.",
  "It’s okay to rest and recharge.",
  "You are resilient, even in tough times.",
  "Happiness is growing within you.",
  "You are learning and improving every day.",
  "You deserve kindness—especially from yourself.",
  "Trust the timing of your life.",
  "You are a work of art in progress.",
  "Your presence matters.",
  "You are safe, loved, and supported.",
  "Even small victories are worth celebrating.",
  "Your story is still unfolding beautifully.",
  "You are calm, centered, and at peace.",
  "Gratitude fills your heart and guides your path.",
  "You are more than enough.",
  "Joy flows into your life with ease.",
];

function showAffirmation() {
  const idx = Math.floor(Math.random() * affirmations.length);
  const el = document.getElementById("affirmation-quote");
  if (el) el.textContent = affirmations[idx];
}

showAffirmation();
