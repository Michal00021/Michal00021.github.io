document.addEventListener("DOMContentLoaded", () => {
 // ELEMENTY
 const counterEl = document.getElementById("counter");
 const messageEl = document.getElementById("message");
 const countdownEl = document.getElementById("move-in-countdown");
 const dateTimeEl = document.getElementById("datetime");

 const openBtn = document.getElementById("open-letter");
 const closeBtn = document.getElementById("close-letter");
 const overlay = document.getElementById("letter-overlay");
 const hero = document.querySelector(".hero");

 const letterText = document.getElementById("letter-text");
 const paperSound = document.getElementById("paper-sound");

 const bgMusic = document.getElementById("bg-music");
 const musicToggle = document.getElementById("music-toggle");
 const quoteEl = document.getElementById("quote");

 const quotes = [
  "To nie jest strona. To jest nasze miejsce.",
  "Każdy dzień z Tobą to dobry dzień.",
  "Nie liczę dni. Liczę chwile z Tobą.",
  "Dom to nie adres. To Ty.",
  "Wybrałem Ciebie i to Ty jesteś dla mnie najlepsza",
  "Z Tobą wszystko ma sens.",
 ];

 function loadDailyQuote() {
  const start = new Date("2024-01-01");
  const today = new Date();
  const dayIndex =
   Math.floor((today - start) / (1000 * 60 * 60 * 24)) % quotes.length;

  const quoteTextEl = quoteEl.querySelector(".quote-text");
  quoteTextEl.innerHTML = quotes[dayIndex];
 }

 // ===== MUZYKA =====
 bgMusic.volume = 0.15;
 let musicPlaying = false;

 musicToggle.addEventListener("click", () => {
  if (!musicPlaying) {
   bgMusic.play();
   musicPlaying = true;
   musicToggle.textContent = "⏸";
  } else {
   bgMusic.pause();
   musicPlaying = false;
   musicToggle.textContent = "🎵";
  }
 });

 function fadeMusic(to, duration = 400) {
  const step = (bgMusic.volume - to) / (duration / 20);
  const interval = setInterval(() => {
   bgMusic.volume = Math.max(0, bgMusic.volume - step);
   if (Math.abs(bgMusic.volume - to) < 0.02) {
    bgMusic.volume = to;
    clearInterval(interval);
   }
  }, 20);
 }

 // ===== LIST =====
 const fullText =
  "Zuzia, serio zrobię dla Ciebie wszystko! \nKocham Cię nad życie ❤️";
 let typingInterval;

 function typeLetterText() {
  letterText.innerHTML = '<span id="cursor">|</span>';
  let index = 0;

  typingInterval = setInterval(() => {
   const cursor = document.getElementById("cursor");
   letterText.insertBefore(document.createTextNode(fullText[index]), cursor);
   index++;

   if (index >= fullText.length) {
    clearInterval(typingInterval);
    cursor.remove();
   }
  }, 60);
 }
 loadDailyQuote();

 openBtn.addEventListener("click", () => {
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
  hero.classList.add("dimmed");

  paperSound.currentTime = 0;
  paperSound.play();

  if (musicPlaying) fadeMusic(0.15);
  typeLetterText();
 });

 closeBtn.addEventListener("click", () => {
  const letter = document.querySelector(".letter");

  // ⛔ zatrzymaj dźwięk kartki
  paperSound.pause();
  paperSound.currentTime = 0;

  // ▶️ wznów muzykę w tle (jeśli była włączona)
  if (musicPlaying) {
   bgMusic.volume = 0.05; // start cicho
   bgMusic.play();

   // delikatny fade-in
   const fadeIn = setInterval(() => {
    if (bgMusic.volume < 0.15) {
     bgMusic.volume += 0.01;
    } else {
     bgMusic.volume = 0.15;
     clearInterval(fadeIn);
    }
   }, 30);
  }

  // 🎬 animacja zamykania koperty
  letter.classList.add("closing");

  setTimeout(() => {
   overlay.classList.remove("active");
   document.body.style.overflow = "";
   hero.classList.remove("dimmed");

   letter.classList.remove("closing");
   clearInterval(typingInterval);
   letterText.textContent = "";
  }, 600);
 });

 // ===== DATA =====
 function updateDateTime() {
  const now = new Date();
  dateTimeEl.textContent = now.toLocaleString("pl-PL", {
   year: "numeric",
   month: "2-digit",
   day: "2-digit",
   hour: "2-digit",
   minute: "2-digit",
  });
 }

 function countDaysTogether() {
  const startDate = new Date("2024-08-27");
  const today = new Date();
  const days = Math.floor((today - startDate) / 86400000);
  const months = Math.floor(days / 30);

  counterEl.textContent = `Jesteśmy już razem ${days} dni`;
  if (months > 0) {
   messageEl.textContent = `To już ${months} ${
    months === 1 ? "miesiąc" : "miesiący"
   } razem ❤️`;
  }
 }

 function updateMoveInCountdown() {
  const moveInDate = new Date("2025-06-07T12:00:00");
  const diff = moveInDate - new Date();

  if (diff <= 0) {
   countdownEl.textContent = "Ba już mieszkamy razem! 🏠❤️";
   return;
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);

  countdownEl.textContent = `Do wspólnego zamieszkania: ${days} dni, ${hours} godzin, ${minutes} minut`;
 }

 updateDateTime();
 countDaysTogether();
 updateMoveInCountdown();

 setInterval(updateDateTime, 60000);
 setInterval(updateMoveInCountdown, 60000);
});
