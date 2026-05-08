document.addEventListener("DOMContentLoaded", () => {
 // ===== ELEMENTY =====
 const counterEl = document.getElementById("counter");
 const messageEl = document.getElementById("message");
 const loveNoteEl = document.getElementById("love-note");
 const countdownEl = document.getElementById("move-in-countdown");
 const dateTimeEl = document.getElementById("datetime");

 const openBtn = document.getElementById("open-letter");
 const closeBtn = document.getElementById("close-letter");
 const overlay = document.getElementById("letter-overlay");
 const hero = document.querySelector(".hero");
 const letter = document.getElementById("letter");

 const letterText = document.getElementById("letter-text");
 const paperSound = document.getElementById("paper-sound");

 const bgMusic = document.getElementById("bg-music");
 const musicToggle = document.getElementById("music-toggle");
 const quoteEl = document.getElementById("quote");

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

 // ===== DNI RAZEM =====
 function countDaysTogether() {
  const startDate = new Date("2024-08-27");
  const today = new Date();
  const days = Math.floor((today - startDate) / 86400000);
  const months = Math.floor(days / 30);

  loveNoteEl.innerHTML = `Od 19 lutego 2024 mój świat jest lepszy.<br>
    I każdego dnia utwierdzam się w tym,
    że to Ciebie chcę kiedyś nazwać swoją żoną. ❤️
  `;
  counterEl.innerHTML = `Jesteśmy już razem <span class="highlight-number">${days}</span> dni!`;
  if (months > 0) {
   messageEl.textContent = `To już ${months} ${
    months === 1 ? "miesiąc" : "miesiący"
   } razem ❤️`;
  }
 }

 // ===== COUNTDOWN =====
 function updateMoveInCountdown() {
  const moveInDate = new Date("2025-06-07T12:00:00");
  const diff = moveInDate - new Date();

  if (diff <= 0) {
   countdownEl.textContent =
    "Ba najlepsze jest to, że już mieszkamy razem! 🏠❤️";
   return;
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);

  countdownEl.textContent = `Do wspólnego zamieszkania: ${days} dni, ${hours} godzin, ${minutes} minut`;
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

 // ===== TRYB NOWOROCZNY =====
 const today = new Date();
 const isNewYear =
  (today.getMonth() === 11 && today.getDate() === 31) ||
  (today.getMonth() === 0 && today.getDate() === 1);

 const normalText =
  "Zuzia,\n\n" +
  "ostatnio poświęcam Ci mniej czasu, niż bym chciał. Nowa praca wymaga ode mnie dużo energii i czasem wracam zmęczony i zamyślony.\n\n" +
  "Chcę jednak, żebyś wiedziała, że bardzo Cię kocham, ufam Ci i naprawdę za Tobą tęsknię.\n\n" +
  "Nie zawsze potrafię to pokazać i nie zawsze jestem idealny, ale to nie zmienia tego, że widzę Cię w swojej przyszłości.\n\n" +
  "Chcę najpierw dobrze odnaleźć się zawodowo żeby móc  zbudować dla nas stabilne życie.\n\n" +
  "A potem spełnić nasze marzenia - mieć własne mieszkanie, zwierzątko i poprosić Cię, żebyś została moją żoną.\n\n" +
  "Kocham Cię nad życie❤️";
 const newYearText =
  "Nowy rok.\nNowe dni.\nAle jedno się nie zmienia.\n\nTo, że wybieram Ciebie.\nKażdego dnia.\n\n❤️";

 const letterContent = isNewYear ? newYearText : normalText;

 // ===== PISANIE LISTU =====
 let typingInterval;

 function typeLetterText() {
  letterText.innerHTML = '<span id="cursor">|</span>';
  let index = 0;

  typingInterval = setInterval(() => {
   const cursor = document.getElementById("cursor");
   letterText.insertBefore(
    document.createTextNode(letterContent[index]),
    cursor,
   );
   index++;

   if (index >= letterContent.length) {
    clearInterval(typingInterval);
    cursor.remove();
   }
  }, 60);
 }

 // ===== QUOTE DNIA =====
 const quotes = [
  "Dom to nie adres. To Ty.",
  "Przy Tobie wszystko ma sens.",
  "Jesteś moim ulubionym miejscem na świecie.",
  "Najpiękniejsza część mojego dnia zaczyna się od Ciebie.",
  "Nie potrzebuję nic więcej, kiedy mam Ciebie.",
  "Z Tobą zwykłe chwile stają się wyjątkowe.",
  "Mój świat jest lepszy, odkąd w nim jesteś.",
  "Ty jesteś moim spokojem.",
  "Najbardziej lubię wracać do Ciebie.",
  "Wśród milionów ludzi wybrałbym Ciebie za każdym razem.",
  "Kocham Cię bardziej niż potrafię ubrać w słowa.",
  "Jesteś moim szczęśliwym przypadkiem.",
  "W Twoich ramionach jest mój dom.",
  "Z Tobą wszystko jest prostsze.",
  "Najlepsze wspomnienia mają Ciebie w środku.",
 ];

 if (isNewYear) {
  quoteEl.querySelector(".quote-text").innerHTML =
   "Nowy rok.<br />My nadal razem.";
 } else {
  const index =
   Math.floor((today - new Date("2024-01-01")) / 86400000) % quotes.length;
  quoteEl.querySelector(".quote-text").textContent = quotes[index];
 }

 // ===== LIST OPEN =====
 openBtn.addEventListener("click", () => {
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
  hero.classList.add("dimmed");

  paperSound.currentTime = 0;
  paperSound.play();

  typeLetterText();
 });

 // ===== LIST CLOSE =====
 closeBtn.addEventListener("click", () => {
  letter.classList.add("closing");

  setTimeout(() => {
   overlay.classList.remove("active");
   hero.classList.remove("dimmed");
   document.body.style.overflow = "";

   letter.classList.remove("closing");
   clearInterval(typingInterval);
   letterText.textContent = "";
  }, 600);
 });

 // ===== START =====
 updateDateTime();
 countDaysTogether();
 updateMoveInCountdown();

 setInterval(updateDateTime, 60000);
 setInterval(updateMoveInCountdown, 60000);
});
