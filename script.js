/* ========= GLOBAL SCENE CONTROLLER ========= */

const scenes = document.querySelectorAll(".scene");
let currentScene = 0;

function showScene(index) {
  scenes.forEach(scene => scene.style.display = "none");
  scenes[index].style.display = "flex";
  currentScene = index;

  /* 🔥 SCENE CHANGE SIGNAL (IMPORTANT) */
  document.dispatchEvent(
    new CustomEvent("sceneChange", { detail: index })
  );
}

/* start with scene 1 */
showScene(0);

/* continue buttons */
document.querySelectorAll(".continue-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    if (currentScene < scenes.length - 1) {
      showScene(currentScene + 1);
    }
  });
});
/* ================= SCENE 1 JS ================= */


/* Word-by-word animation for "Click below" text */
const clickText = document.querySelector(".intro-click");

if (clickText) {
  const originalText = clickText.textContent;
  clickText.textContent = "";
  let index = 0;

  function typeText() {
    if (index < originalText.length) {
      clickText.textContent += originalText[index];
      index++;
      setTimeout(typeText, 60); // typing speed
    }
  }

  setTimeout(typeText, 500); // small delay after load
}

/* Open My Heart → go to Scene 2 */
const openBtn = document.querySelector(".primary-btn");

if (openBtn) {
  openBtn.addEventListener("click", () => {
    showScene(1);
  });
}
/* ================= SCENE 2 : FINAL STABLE JS ================= */

const deliveryBtn = document.querySelector(".delivery-btn");
const outlineBox = document.querySelector(".letter-outline-box");
const envelope = document.querySelector(".envelope");
const letterBox = document.querySelector(".letter-content-box");
const continueBtn = document.querySelector("#scene-2 .continue-btn");
const withLove = document.getElementById("withLoveText");

/* BGM */
const bgm = new Audio("music/01-bgm.mp3");
bgm.loop = true;

/* TYPEWRITER — SINGLE PASS */
function typeWriter(element, text, speed = 45, done) {
  element.classList.add("typing");
  let i = 0;
  element.innerHTML = "";

  function write() {
    if (i < text.length) {
      element.innerHTML += text[i] === "\n" ? "<br>" : text[i];
      i++;
      setTimeout(write, speed);
    } else {
      element.classList.remove("typing");
      if (done) done();
    }
  }
  write();
}

/* CLICK */
deliveryBtn.addEventListener("click", () => {

  /* start bgm */
  bgm.play().catch(() => {});

  /* envelope open */
  envelope.classList.add("open-envelope");

  /* fade envelope */
  setTimeout(() => {
    outlineBox.style.opacity = "0";
    outlineBox.style.transition = "opacity 0.8s ease";
  }, 1200);

  /* show letter */
  setTimeout(() => {
    outlineBox.style.display = "none";
    letterBox.style.display = "block";

    /* TYPE BOTH LINES TOGETHER */
    typeWriter(
      withLove,
      "With all my love,\nAlways yours 💕",
      45,
      () => {
        continueBtn.style.display = "inline-block";
      }
    );

  }, 2000);
});
/* ================= SCENE 3 : FINAL PLAYLIST JS ================= */

const scene3 = document.getElementById("scene-3");

if (scene3) {

  /* MAIN ELEMENTS */
  const songImg   = scene3.querySelector(".player-image img");
  const songTitle = scene3.querySelector(".song-title");
  const songQuote = scene3.querySelector(".song-quote");
  const playBtn   = scene3.querySelector(".play-overlay");
  const prevBtn   = scene3.querySelector(".nav-btn.prev");
  const nextBtn   = scene3.querySelector(".nav-btn.next");
  const dots      = scene3.querySelectorAll(".song-indicators .dot");
  const continue3 = document.getElementById("scene3Continue");

  /* TIMELINE ELEMENTS (🔥 THIS WAS MISSING) */
  const timeline      = scene3.querySelector(".timeline-player");
  const timelineImg   = scene3.querySelector(".timeline-thumb");
  const timelineTitle = scene3.querySelector(".timeline-title");
  const timelineQuote = scene3.querySelector(".timeline-quote");
  const timelinePlay  = scene3.querySelector(".timeline-play");
  const timelineBar   = scene3.querySelector(".timeline-bar");

  /* SONG DATA — EXACT PATHS */
  const songs = [
    {
      title: "Tera Mera Pyaar Amar",
      img: "images/image5.jpg",
      quoteA: "Loving you feels like choosing peace.",
      quoteB: "Some bonds are so deep that even eternity feels short 🧿",
      file: "music/02-tera-mera-pyar-amar.mp3"
    },
    {
      title: "Oh Saahib",
      img: "images/image6.jpg",
      quoteA: "You’re not a coincidence, you’re my destiny",
      quoteB: "Our love isn’t bound by moments or memories; it exists beyond time 💕",
      file: "music/03-oh-sahib.mp3"
    },
    {
      title: "Deewaniyat",
      img: "images/image7.jpg",
      quoteA: "You own this heart – dedicated to you",
      quoteB: "Even if the world ends, I'd still find you 💞",
      file: "music/04-deewaniyat.mp3"
    }
  ];

  let index = 0;
  const songAudio = new Audio();

  /* LOAD SONG */
  function loadSong(i) {
    songImg.src = songs[i].img;
    songTitle.textContent = songs[i].title;
    songQuote.textContent = songs[i].quoteB;
    songAudio.src = songs[i].file;

    /* TIMELINE DATA */
    timelineImg.src = songs[i].img;
    timelineTitle.textContent = songs[i].title;
    timelineQuote.textContent = songs[i].quoteA;

    dots.forEach(d => d.classList.remove("active"));
    dots[i].classList.add("active");

    playBtn.textContent = "▶";
    timelinePlay.textContent = "▶";
    timeline.classList.add("hidden");

    songAudio.pause();
  }

  loadSong(index);

  /* PLAY / PAUSE (MAIN IMAGE) */
  playBtn.addEventListener("click", () => {
    if (songAudio.paused) {
      bgm.pause();
      songAudio.play();

      playBtn.textContent = "⏸";
      timelinePlay.textContent = "⏸";

      scene3.querySelector(".player-image").classList.add("playing");
      timeline.classList.remove("hidden");   // 🔥 SHOW TIMELINE
    } else {
      songAudio.pause();
      bgm.play();

      playBtn.textContent = "▶";
      timelinePlay.textContent = "▶";

      scene3.querySelector(".player-image").classList.remove("playing");
    }
  });

  /* TIMELINE PLAY BUTTON */
  timelinePlay.addEventListener("click", () => {
    if (songAudio.paused) {
      bgm.pause();
      songAudio.play();
      playBtn.textContent = "⏸";
      timelinePlay.textContent = "⏸";
    } else {
      songAudio.pause();
      bgm.play();
      playBtn.textContent = "▶";
      timelinePlay.textContent = "▶";
    }
  });

  /* PROGRESS BAR */
  songAudio.addEventListener("timeupdate", () => {
    if (songAudio.duration) {
      timelineBar.value = (songAudio.currentTime / songAudio.duration) * 100;
    }
  });

  timelineBar.addEventListener("input", () => {
    songAudio.currentTime = (timelineBar.value / 100) * songAudio.duration;
  });

  /* NEXT */
  nextBtn.addEventListener("click", () => {
    index = (index + 1) % songs.length;
    loadSong(index);
  });

  /* PREVIOUS */
  prevBtn.addEventListener("click", () => {
    index = (index - 1 + songs.length) % songs.length;
    loadSong(index);
  });

  /* SONG ENDED */
songAudio.addEventListener("ended", () => {
  playBtn.textContent = "▶";
  timelinePlay.textContent = "▶";
  scene3.querySelector(".player-image").classList.remove("playing");

  bgm.play().catch(() => {});
});

  /* ========= SCENE 3 : CONTINUE BUTTON (FINAL & SAFE) ========= */

if (continue3) {
  continue3.style.display = "none";

  let unlocked = false;

  function showContinue() {
    if (!unlocked) {
      continue3.style.display = "inline-block";
      unlocked = true;
    }
  }

  /* user interaction se unlock */
  playBtn.addEventListener("click", showContinue);
  nextBtn.addEventListener("click", showContinue);
  prevBtn.addEventListener("click", showContinue);

  /* continue → next scene */
  continue3.addEventListener("click", () => {

  /* 🔥 HARD STOP everything from Scene 3 */
  songAudio.pause();
  songAudio.currentTime = 0;

  bgm.pause();
  bgm.currentTime = 0;

  /* clean visual state */
  playBtn.textContent = "▶";
  timelinePlay.textContent = "▶";
  timeline.classList.add("hidden");
  scene3.querySelector(".player-image").classList.remove("playing");

  /* go to Scene-4 */
  showScene(3);
});
}
}
/* ================= SCENE 4 : FLIP CARDS FINAL JS ================= */

const scene4 = document.getElementById("scene-4");

if (scene4) {

  const cards = scene4.querySelectorAll(".flip-card");
  const continueBtn4 = scene4.querySelector(".continue-btn");

  /* hide continue initially */
  if (continueBtn4) continueBtn4.style.display = "none";

  function updateState() {
    const openCards = scene4.querySelectorAll(".flip-card.open").length;

    /* 🎵 BGM logic — CLEAN & SAFE */
    if (openCards > 0 && bgm.paused) {
      bgm.play().catch(() => {});
    }

    if (openCards === 0 && !bgm.paused) {
      bgm.pause();
      bgm.currentTime = 0;
    }

    /* Continue button — ONLY when all cards open */
    if (openCards === cards.length) {
      continueBtn4.style.display = "inline-block";
    } else {
      continueBtn4.style.display = "none";
    }
  }

  /* CARD CLICK — flip & flip back */
  cards.forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("open");
      updateState();
    });
  });

  /* CONTINUE → SCENE 5 */
  if (continueBtn4) {
    continueBtn4.addEventListener("click", () => {

      /* stop bgm before leaving */
      bgm.pause();
      bgm.currentTime = 0;

      scenes[currentScene].style.display = "none";
      currentScene = 4;   // Scene-5 index
      scenes[currentScene].style.display = "flex";
    });
  }
}
/* ================= SCENE 5 : ALL MESSAGES UNLOCKED JS ================= */

const scene5 = document.getElementById("scene-5");

if (scene5) {
  const openFinalBtn = scene5.querySelector(".final-letter-btn");

  /* Scene-5 start hote hi BGM OFF */
  bgm.pause();
  bgm.currentTime = 0;

  /* Open Final Letter → Scene-6 (PROPER WAY) */
  if (openFinalBtn) {
    openFinalBtn.addEventListener("click", () => {
      showScene(5); // 🔥 ONLY THIS LINE
    });
  }
}
/* ================= SCENE 6 : FINAL LETTER (FINAL COMBINED JS) ================= */

const scene6 = document.getElementById("scene-6");

if (scene6) {

  const title      = scene6.querySelector(".final-text h3");
  const paragraphs = scene6.querySelectorAll(".final-text p");
  const emojis     = scene6.querySelector(".final-emojis");

  const btnSeal    = scene6.querySelector(".btn-seal");
  const btnRestart = scene6.querySelector(".btn-restart");

  /* store original paragraph text ONCE */
  paragraphs.forEach(p => {
    if (!p.dataset.original) {
      p.dataset.original = p.textContent.trim();
    }
  });

  /* ================= RESET ================= */
  function resetScene6() {
    title.style.opacity = 0;
    title.style.animation = "none";

    emojis.style.opacity = 0;
    emojis.style.animation = "none";

    paragraphs.forEach(p => {
      p.textContent = "";
    });
  }

  /* ================= TYPEWRITER ================= */
  function typeText(el, text, speed = 40, done) {
    let i = 0;
    el.textContent = "";

    function step() {
      if (i < text.length) {
        el.textContent += text[i++];
        setTimeout(step, speed);
      } else if (done) {
        done();
      }
    }
    step();
  }

  /* ================= MAIN ANIMATION ================= */
  function startScene6() {
    resetScene6();

    /* 🎵 BGM START */
    bgm.currentTime = 0;
    bgm.play().catch(() => {});

    /* TITLE APPEAR */
    setTimeout(() => {
      title.style.opacity = 1;
      title.style.animation = "fadeUp 0.8s ease forwards";
    }, 300);

    /* LETTER CONTENT */
    setTimeout(() => {
      let i = 0;

      function showNextParagraph() {
        if (i < paragraphs.length) {
          typeText(
            paragraphs[i],
            paragraphs[i].dataset.original,
            40,
            () => {
              i++;
              setTimeout(showNextParagraph, 700);
            }
          );
        } else {
          /* EMOJIS AFTER LETTER */
          setTimeout(() => {
            emojis.style.opacity = 1;
            emojis.style.animation = "fadeUp 0.8s ease forwards";
          }, 1200);
        }
      }

      showNextParagraph();
    }, 1600);
  }

  /* ================= AUTO START WHEN SCENE 6 OPENS ================= */
  document.addEventListener("sceneChange", e => {
    if (e.detail === 5) {   // Scene-6 index
      startScene6();
    }
  });

  /* ================= RESTART (ONLY SCENE 6) ================= */
  btnRestart?.addEventListener("click", () => {
    bgm.pause();
    bgm.currentTime = 0;
    startScene6();
  });

  /* ================= SEAL LETTER → SCENE 7 ================= */
  btnSeal?.addEventListener("click", () => {
    bgm.pause();
    bgm.currentTime = 0;
    showScene(6); // Scene-7
  });

}
/* ================= SCENE 7 : FINAL SEALED LETTER JS ================= */

const scene7 = document.getElementById("scene-7");

if (scene7) {

  const overlay = scene7.querySelector(".seal-overlay");
  const heartsBox = scene7.querySelector(".sealed-hearts");
  const btnAgain = scene7.querySelector(".btn-again");
  const btnKiss = scene7.querySelector(".btn-kiss");

  const hearts = ["♡","♡","♡","♡","♡","♡","♡"];

  function resetScene7() {
    heartsBox.textContent = hearts.join(" ");
  }

  /* 💌 START SEALING */
  function startSealing() {
    overlay.style.display = "flex";

    setTimeout(() => {
      overlay.style.display = "none";
      fillHearts();
    }, 2600);
  }

  /* ❤️ HEARTS FILL */
  function fillHearts() {
    let i = 0;
    const filled = [];

    const interval = setInterval(() => {
      filled.push("❤️");
      heartsBox.textContent =
        filled.join(" ") + " " + hearts.slice(i + 1).join(" ");
      i++;
      if (i === hearts.length) clearInterval(interval);
    }, 300);
  }

  /* 💋 FLOATING KISS */
  function createKiss() {
    const kiss = document.createElement("div");
    kiss.className = "kiss";
    kiss.textContent = "💋";
    kiss.style.left = Math.random() * 100 + "vw";
    document.body.appendChild(kiss);

    setTimeout(() => kiss.remove(), 6000);
  }

  btnKiss?.addEventListener("click", () => {
    bgm.currentTime = 0;
    bgm.play().catch(()=>{});

    let count = 0;
    const kissInterval = setInterval(() => {
      createKiss();
      count++;
      if (count === 8) clearInterval(kissInterval);
    }, 700);

    setTimeout(() => {
      bgm.pause();
      bgm.currentTime = 0;
    }, 10000);
  });

  btnAgain?.addEventListener("click", () => {
    bgm.pause();
    bgm.currentTime = 0;
    resetScene7();
    showScene(0);
  });

  /* AUTO START */
  document.addEventListener("sceneChange", e => {
    if (e.detail === 6) {
      resetScene7();
      startSealing();
    }
  });
}