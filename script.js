document.addEventListener("DOMContentLoaded", () => {
  // ===== ELEMENTS =====
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

  // Navigation
  const navBtns = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll(".section");

  // Proposal elements
  const proposalSection = document.getElementById("proposal-section");
  const proposalCountdown = document.getElementById("proposal-countdown");
  const skipToProposalBtn = document.getElementById("skip-to-proposal");
  const proposalOverlay = document.getElementById("proposal-overlay");
  const proposalModal = document.getElementById("proposal-modal");
  const closeProposalBtn = document.getElementById("close-proposal");
  const btnYes = document.getElementById("btn-yes");
  const btnNo = document.getElementById("btn-no");
  const yesMessage = document.getElementById("yes-message");

  // Gallery elements
  const galleryGrid = document.getElementById("gallery-grid");
  const galleryModal = document.getElementById("gallery-modal");
  const modalImage = document.getElementById("modal-image");
  const modalClose = document.getElementById("modal-close");
  const modalPrev = document.getElementById("modal-prev");
  const modalNext = document.getElementById("modal-next");
  const modalCounter = document.getElementById("modal-counter");

  // ===== CONSTANTS =====
  const START_DATE = new Date("2024-08-27T07:38:00");
  const FIRST_MEETING = new Date("2024-06-04T21:38:00");
  const PROPOSAL_DATES = [
    new Date(new Date().getFullYear(), 7, 28), // 28 sierpnia
    new Date(new Date().getFullYear(), 7, 13), // 13 sierpnia
  ];

  let typingInterval;
  let musicPlaying = false;
  let galleryImages = [];
  let currentImageIndex = 0;
  let codeSequence = [];
  const correctCode = ["1", "3", "7", "9"];

  // ===== NAVIGATION =====
  navBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const sectionId = btn.dataset.section;
      
      // Remove active from all buttons and sections
      navBtns.forEach(b => b.classList.remove("active"));
      sections.forEach(s => s.classList.remove("active"));
      
      // Add active to clicked button and corresponding section
      btn.classList.add("active");
      document.getElementById(sectionId).classList.add("active");
    });
  });

  // ===== DATE & TIME =====
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

  // ===== COUNT DAYS =====
  function countDaysTogether() {
    const today = new Date();
    const days = Math.floor((today - START_DATE) / 86400000);
    const months = Math.floor(days / 30);

    loveNoteEl.innerHTML = `
      Poznaliśmy się: 4 czerwca 2024 🌟<br />
      Jesteśmy razem: od 27 sierpnia 2024 💕<br />
      <span style="font-size: 0.95rem; margin-top: 10px; display: block;">
        I każdego dnia utwierdzam się w tym,<br />
        że chcę spędzić z Tobą całą resztę życia ❤️
      </span>
    `;

    counterEl.innerHTML = `Jesteśmy już razem <span class="highlight-number">${days}</span> dni!`;

    if (months > 0) {
      messageEl.textContent = `To już ${months} ${
        months === 1 ? "miesiąc" : "miesiące"
      } wspólnych wspomnień ❤️`;
    }
  }

  // ===== MOVE IN COUNTDOWN =====
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

    countdownEl.textContent = `Do wspólnego zamieszkania: ${days} dni, ${hours} godzin ⏰`;
  }

  // ===== CHECK PROPOSAL DATE =====
  function checkProposalDate() {
    const today = new Date();

    let isProposalDateSoon = false;
    let daysToProposal = Infinity;

    PROPOSAL_DATES.forEach((date) => {
      const diff = date - today;
      const days = Math.floor(diff / 86400000);

      if (days >= -1 && days <= 7) {
        isProposalDateSoon = true;
        if (days >= 0 && days < daysToProposal) {
          daysToProposal = days;
        }
      }
    });

    if (isProposalDateSoon) {
      proposalSection.classList.remove("hidden");

      if (daysToProposal === 0) {
        proposalCountdown.textContent =
          "🎉 To jest dzisiaj! Coś specjalnego czeka! 🎉";
      } else if (daysToProposal === 1) {
        proposalCountdown.textContent = "Jutro coś niesamowitego! 💝";
      } else if (daysToProposal > 1) {
        proposalCountdown.textContent = `Coś pięknego za ${daysToProposal} dni! ✨`;
      }
    } else {
      proposalSection.classList.add("hidden");
    }
  }

  // ===== GALLERY FUNCTIONS =====
  function loadGallery() {
    // HARDCODED IMAGES - Dodaj nowe zdjęcia tutaj!
    const hardcodedImages = [
      'photos/Snapchat-1191008483.jpg',
      'photos/Snapchat-1511814101.jpg',
      'photos/Snapchat-785216609.jpg',
      'photos/Snapchat-689432158.jpg',
      'photos/Snapchat-924077993.jpg',
      'photos/Snapchat-580944748.jpg',
      'photos/IMG_20250322_164702131_HDR.jpg',
      'photos/nasze.jpg',
      'photos/20241107_195612_104349-2.jpg',
      'photos/20241213_170828.jpg',
      'photos/327425056_5756022907768598_6199398.jpg',
      'photos/352362353_6176105419093676_6558231.jpg',
      'photos/360107885_6305874729450077_8006338.jpg',
    ];

    if (hardcodedImages.length === 0) {
      galleryGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
          <p style="font-size: 1.2rem; color: var(--accent-light);">
            📁 Żadnych zdjęć w folderze 'photos'<br>
            <span style="font-size: 1rem;">Dodaj zdjęcia do folderu!<br>
            <strong style="color: var(--primary);">photos/</strong>
          </p>
        </div>
      `;
      return;
    }

    galleryImages = hardcodedImages;
    renderGallery();
  }

  function renderGallery() {
    galleryGrid.innerHTML = '';
    
    galleryImages.forEach((imagePath, index) => {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.innerHTML = `
        <img src="${imagePath}" alt="Zdjęcie ${index + 1}" loading="lazy" />
        <div class="gallery-overlay">
          <span class="gallery-overlay-text">👁️</span>
        </div>
      `;
      
      item.addEventListener('click', () => openGalleryModal(index));
      galleryGrid.appendChild(item);
    });
  }

  function openGalleryModal(index) {
    if (galleryImages.length === 0) return;
    
    currentImageIndex = index;
    galleryModal.classList.add('active');
    updateModalImage();
  }

  function updateModalImage() {
    if (galleryImages.length === 0) return;
    
    modalImage.src = galleryImages[currentImageIndex];
    modalCounter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
  }

  modalClose.addEventListener('click', () => {
    galleryModal.classList.remove('active');
  });

  modalPrev.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateModalImage();
  });

  modalNext.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateModalImage();
  });

  // Keyboard navigation for gallery
  document.addEventListener('keydown', (e) => {
    if (!galleryModal.classList.contains('active')) return;
    
    if (e.key === 'ArrowLeft') modalPrev.click();
    if (e.key === 'ArrowRight') modalNext.click();
    if (e.key === 'Escape') modalClose.click();
  });

  // ===== TIMELINE =====
  function generateTimeline() {
    const timelineContainer = document.getElementById('timeline-container');
    
    const events = [
      {
        date: '4 czerwca 2024',
        title: '❤️ Pierwszy Spotkanie',
        description: 'Poznaliśmy się o 21:38. To był najlepszy dzień w moim życiu.'
      },
      {
        date: '27 sierpnia 2024',
        title: '💕 Jesteśmy Razem!',
        description: 'Od tego dnia wiedzę, że chcę budować z Tobą przyszłość.'
      },
      {
        date: 'Dzisiaj',
        title: '✨ Nasza Historia',
        description: 'Każdy dzień z Tobą jest wspomnieniem na zawsze.'
      },
      {
        date: '28 augusztus / 13 sierpnia',
        title: '💍 Coś Specjalnego',
        description: 'Czeka na Ciebie na tej stronie!'
      }
    ];

    timelineContainer.innerHTML = events.map((event, idx) => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="timeline-date">${event.date}</div>
          <div class="timeline-title">${event.title}</div>
          <div class="timeline-description">${event.description}</div>
        </div>
      </div>
    `).join('');
  }

  // ===== MUSIC CONTROL =====
  bgMusic.volume = 0.12;

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

  // ===== NEW YEAR MODE =====
  const today = new Date();
  const isNewYear =
    (today.getMonth() === 11 && today.getDate() === 31) ||
    (today.getMonth() === 0 && today.getDate() === 1);

  const normalText =
    "Zuzia,\n\n" +
    "Dzisiaj siedziałem sam i poczułem jak bardzo jest pusty ten dom bez Ciebie. Cisza, którą tutaj czuję, " +
    "to cisza tęsknoty. Tęsknoty za Tobą.\n\n" +
    "Rozumiem teraz, że to nie o miejscu, nie o rzeczach. To o tym, że bez Ciebie wszystko traci kolor. " +
    "Ty jesteś dla mnie najważniejszą osobą na świecie. Nie wyobrażam sobie życia, w którym Ciebie nie ma.\n\n" +
    "Każdy dzień z Tobą to dzień, który ma sens. Twój śmiech, Twoje objęcia, sposób w jaki na mnie patrzysz - " +
    "to wszystko to dla mnie wszystko.\n\n" +
    "Czekam aż będę mógł Cię znowu przytulić i powiedzieć Ci najszczęśliwszą rzecz w moim życiu.\n\n" +
    "Kocham Cię nad życie. Naprawdę. ❤️";

  const newYearText =
    "Nowy rok.\nNowe dni.\nAle jedno się nie zmienia.\n\nTo, że wybieram Ciebie.\nKażdego dnia.\nNa zawsze.\n\n❤️";

  const letterContent = isNewYear ? newYearText : normalText;

  // ===== QUOTES =====
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

  // ===== TYPE LETTER =====
  function typeLetterText() {
    letterText.innerHTML = '<span id="cursor">|</span>';
    let index = 0;

    typingInterval = setInterval(() => {
      const cursor = document.getElementById("cursor");
      if (cursor) {
        const char = letterContent[index];
        if (char === "\n") {
          letterText.insertBefore(document.createElement("br"), cursor);
        } else {
          letterText.insertBefore(document.createTextNode(char), cursor);
        }
      }
      index++;

      if (index >= letterContent.length) {
        clearInterval(typingInterval);
        if (cursor) cursor.remove();
      }
    }, 60);
  }

  // ===== LETTER EVENTS =====
  openBtn.addEventListener("click", () => {
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
    hero.classList.add("dimmed");

    if (paperSound) {
      paperSound.currentTime = 0;
      paperSound.play().catch(() => {});
    }

    typeLetterText();
  });

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

  // ===== PROPOSAL EVENTS =====
  skipToProposalBtn.addEventListener("click", () => {
    proposalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  closeProposalBtn.addEventListener("click", () => {
    proposalOverlay.classList.remove("active");
    document.body.style.overflow = "";
    yesMessage.classList.add("hidden");
  });

  btnYes.addEventListener("click", () => {
    yesMessage.classList.remove("hidden");
    btnYes.disabled = true;
    btnNo.disabled = true;
    triggerConfetti();
    playClickSound();
  });

  btnNo.addEventListener("click", () => {
    const randomX = Math.random() * 200 - 100;
    const randomY = Math.random() * 200 - 100;
    btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
  });

  // ===== PROPOSAL TEXT INPUT =====
  const proposalTextInput = document.getElementById("proposal-text-input");
  const proposalCheckBtn = document.getElementById("proposal-check-btn");

  // Sprawdzanie na Enter
  proposalTextInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      proposalCheckBtn.click();
    }
  });

  // Sprawdzanie na klik przycisku
  proposalCheckBtn.addEventListener("click", () => {
    const answer = proposalTextInput.value.toLowerCase().trim();

    if (answer === "tak" || answer === "yes") {
      // ✅ POPRAWNA ODPOWIEDŹ!
      yesMessage.classList.remove("hidden");
      btnYes.disabled = true;
      btnNo.disabled = true;
      proposalCheckBtn.disabled = true;
      proposalTextInput.disabled = true;
      triggerConfetti();
      playClickSound();
      activateHeartRain(); // Dodatkowy efekt!
      proposalTextInput.value = "";
    } else if (answer === "nie" || answer === "no") {
      // ❌ PRZYCISK UCIEKA!
      const randomX = Math.random() * 200 - 100;
      const randomY = Math.random() * 200 - 100;
      btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
      
      // Animacja drżenia inputu
      proposalTextInput.classList.add("error");
      setTimeout(() => {
        proposalTextInput.classList.remove("error");
      }, 500);
      
      // Wyczyść input
      proposalTextInput.value = "";
    } else {
      // ⚠️ BŁĘDNA ODPOWIEDŹ!
      proposalTextInput.classList.add("error");
      setTimeout(() => {
        proposalTextInput.classList.remove("error");
      }, 500);
    }
  });

  // ===== EASTER EGG: CODE 1379 =====
  document.addEventListener("keydown", (e) => {
    // Only add digit keys
    if (/^[0-9]$/.test(e.key)) {
      codeSequence.push(e.key);
      
      // Keep only last 4 digits
      if (codeSequence.length > 4) {
        codeSequence.shift();
      }

      // Check if sequence matches
      if (codeSequence.join("") === correctCode.join("")) {
        activateHeartRain();
        codeSequence = []; // Reset
      }
    }
  });

  // ===== EASTER EGGS: CLICK RAIN =====
  let globalHeartClickCount = 0;
  document.addEventListener("click", (e) => {
    if (e.target.closest("button, input, a")) return;

    if (e.clientX < window.innerWidth / 2 && e.clientY < window.innerHeight / 2) {
      globalHeartClickCount++;

      const heart = document.createElement("div");
      heart.textContent = "❤️";
      heart.style.position = "fixed";
      heart.style.left = e.clientX + "px";
      heart.style.top = e.clientY + "px";
      heart.style.fontSize = "2rem";
      heart.style.pointerEvents = "none";
      heart.style.animation = `heartFloat ${Math.random() * 2 + 1}s ease-out forwards`;
      heart.style.zIndex = "999";

      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 2500);

      if (globalHeartClickCount >= 10) {
        activateHeartRain();
        globalHeartClickCount = 0;
      }
    }
  });

  // ===== CONFETTI & EFFECTS =====
  function triggerConfetti() {
    const colors = ["💕", "💗", "✨", "🎊", "🎉"];
    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement("div");
      confetti.style.position = "fixed";
      confetti.style.fontSize = Math.random() * 30 + 20 + "px";
      confetti.textContent = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.top = "-50px";
      confetti.style.pointerEvents = "none";
      confetti.style.zIndex = "9999";
      confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;

      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 4000);
    }

    const style = document.createElement("style");
    if (!document.querySelector("style[data-confetti]")) {
      style.setAttribute("data-confetti", "true");
      style.textContent = `
        @keyframes confettiFall {
          to {
            transform: translateY(100vh) rotateZ(360deg);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  function activateHeartRain() {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes heartFloat {
        0% {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
        100% {
          transform: translateY(-100px) scale(0.5);
          opacity: 0;
        }
      }

      @keyframes heartRain {
        to {
          transform: translateY(100vh);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const heart = document.createElement("div");
        heart.textContent = "❤️";
        heart.style.position = "fixed";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.top = "-50px";
        heart.style.fontSize = Math.random() * 30 + 20 + "px";
        heart.style.pointerEvents = "none";
        heart.style.zIndex = "999";
        heart.style.animation = `heartRain ${Math.random() * 3 + 2}s linear forwards`;

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 4000);
      }, i * 50);
    }
  }

  function playClickSound() {
    // Simple beep sound (optional)
  }

  // ===== PARTICLES =====
  function createParticles() {
    const container = document.querySelector(".particles-container");
    if (!container) return;

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = Math.random() * 100 + "%";
      particle.textContent = ["💕", "💗", "✨", "💫", "⭐"][
        Math.floor(Math.random() * 5)
      ];
      particle.style.fontSize = Math.random() * 20 + 15 + "px";
      particle.style.animation = `float ${Math.random() * 5 + 5}s infinite`;

      container.appendChild(particle);
    }

    const style = document.createElement("style");
    style.textContent = `
      @keyframes float {
        0% {
          transform: translateY(0) rotateZ(0deg);
          opacity: 1;
        }
        50% {
          transform: translateY(-50px) rotateZ(180deg);
          opacity: 0.7;
        }
        100% {
          transform: translateY(0) rotateZ(360deg);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ===== INIT =====
  updateDateTime();
  countDaysTogether();
  updateMoveInCountdown();
  checkProposalDate();
  createParticles();
  loadGallery();
  generateTimeline();

  setInterval(updateDateTime, 60000);
  setInterval(updateMoveInCountdown, 60000);
  setInterval(checkProposalDate, 60000);
});
