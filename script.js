const wishButton = document.getElementById("wishBtn");
const wishMessage = document.getElementById("wishMessage");
const musicBtn = document.getElementById("musicBtn");

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = ["❤️", "💕", "✨", "🌸"][Math.floor(Math.random() * 4)];
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "-30px";
  heart.style.animationDuration = (3 + Math.random() * 3) + "s";
  heart.style.fontSize = (14 + Math.random() * 18) + "px";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 6500);
}

setInterval(createHeart, 850);

wishButton?.addEventListener("click", () => {
  wishMessage.textContent = "✨ Wish made! May it come true in the most beautiful way. ✨";
  wishButton.textContent = "Wish sent 💖";
  for (let i = 0; i < 18; i++) {
    setTimeout(createHeart, i * 80);
  }
});

let musicOn = false;
let audioContext;

musicBtn?.addEventListener("click", () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (!musicOn) {
    musicOn = true;
    musicBtn.textContent = "♫";
    playNote(523.25, 0);
    playNote(659.25, 180);
    playNote(783.99, 360);
  } else {
    musicOn = false;
    musicBtn.textContent = "♪";
  }
});

function playNote(frequency, delay) {
  if (!musicOn) return;
  setTimeout(() => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, audioContext.currentTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.6);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.65);
  }, delay);
}
