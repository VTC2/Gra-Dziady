"use strict";

// ----- Konfiguracja Gry -----
const BOOK_ANIMATION_DURATIONS = {
  introSettle: 1500,      // Czas na ustabilizowanie się książki na początku
  coverOpen: 2000,        // Czas otwierania przedniej okładki
  page1Turn: 1800,        // Czas obracania strony 1
  page2Turn: 1700,        // Czas obracania strony 2
  contentFadeInDelay: 500,// Opóźnienie pojawienia się zawartości gry po otwarciu stron
  contentFadeIn: 800,
};
const TEXT_ANIMATION_CHAR_DELAY = 20; // Milisekundy między znakami
const TEXT_ANIMATION_LINE_DELAY = 150; // Milisekundy między liniami (jeśli animujemy całe linie)

// ----- Stan Gry -----
let gameState = {
  currentScene: "prolog",
  isBookOpen: false,
  isGameActive: false,
  audioContext: null, // Dla lepszego zarządzania audio
};
let konrad = { mist: 0, rew: true, bal_inba: false, inmate_trust: false, duch_przew: false };
let grajace = []; // Tablica aktywnych obiektów Audio
let isCicho = false;
let currentParagraphIndex = 0; // Do śledzenia wyświetlanych paragrafów dla animacji

// ----- Inicjalizacja -----
document.addEventListener('DOMContentLoaded', initializeGameEnvironment);

function initializeGameEnvironment() {
  setupAudio();
  setupMuteButton();
  initializeParticleEffect(); // Inicjalizacja efektu cząsteczek
  startBookAnimationSequence();
}

function setupAudio() {
  try {
    gameState.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    console.log("AudioContext initialized.");
  } catch (e) {
    console.warn("Web Audio API is not supported in this browser.", e);
  }
}

function setupMuteButton() {
  const muteButton = document.getElementById("mute-btn");
  muteButton.addEventListener("click", toggleMute);
  updateMuteButtonVisuals(); // Ustawienie początkowego wyglądu przycisku
}

// ----- Animacja Książki -----
async function startBookAnimationSequence() {
  const body = document.body;
  const bookLoadingOverlay = document.getElementById('book-loading-overlay');

  // Symulacja ładowania zasobów (możesz tu dodać prawdziwe preloading)
  await new Promise(resolve => setTimeout(resolve, 1500)); 
  
  body.classList.add('book-loaded'); // Ukryj overlay ładowania, pokaż książkę
  await new Promise(resolve => setTimeout(resolve, 500)); // Czas na zniknięcie overlay

  body.classList.remove('loading-book');
  body.classList.add('book-intro'); // Książka pojawia się i ustawia
  await new Promise(resolve => setTimeout(resolve, BOOK_ANIMATION_DURATIONS.introSettle));

  body.classList.add('book-opening'); // Zaczyna się otwieranie
  // Czekamy na zakończenie wszystkich animacji otwierania (najdłuższa + opóźnienie)
  const totalOpenTime = Math.max(
    BOOK_ANIMATION_DURATIONS.coverOpen + 1000, // 1000ms to opóźnienie z CSS dla #book-cover-front
    BOOK_ANIMATION_DURATIONS.page1Turn + 1300,
    BOOK_ANIMATION_DURATIONS.page2Turn + 1450
  );
  await new Promise(resolve => setTimeout(resolve, totalOpenTime));

  body.classList.remove('book-intro', 'book-opening');
  body.classList.add('book-open');
  gameState.isBookOpen = true;

  await new Promise(resolve => setTimeout(resolve, BOOK_ANIMATION_DURATIONS.contentFadeInDelay));
  body.classList.add('game-active'); // Aktywuje opacity dla #actual-game-content
  gameState.isGameActive = true;
  
  console.log("Book animation finished, starting game logic.");
  startGameLogic(); // Rozpocznij logikę gry dopiero po animacji
}


// ----- Logika Gry (Główna Pętla) -----
async function startGameLogic() {
  if (!gameState.isGameActive) {
    console.warn("startGameLogic called before game is active.");
    return;
  }
  currentParagraphIndex = 0; // Resetuj licznik paragrafów na start gry
  const okno_gry = document.getElementById("main-game");
  okno_gry.innerHTML = ''; // Wyczyść okno gry na start

  await animateTextDisplay("prolog");
  await displayTitle("Dziady Część III: Wielka Improwizacja");
  await displayTitle("WIĘZIENIE W WILNIE");

  setActiveSceneBackground("tlo1");
  playSound('audio/cela.wav', { loop: true, id: 'celaAmbience' });

  await animateTextDisplay("scena1_1");
  let ac = await displayChoices("scena1_2x");
  console.log("Wybór 1:", ac);
  removeActiveSceneBackground("tlo1");
  setActiveSceneBackground("tlo2");

  switch (ac) {
    case 1: await animateTextDisplay("scena1_2a"); konrad.inmate_trust = true; break;
    case 2: await animateTextDisplay("scena1_2b"); konrad.mist++; break;
    case 3: await animateTextDisplay("scena1_2c"); konrad.inmate_trust = true; break;
  }

  if (konrad.inmate_trust) {
    await animateTextDisplay("scena1_3");
    let death = await displayChoices("scena1_4x");
    switch (death) {
      case 1:
        await animateTextDisplay("scena1_4a");
        playSound('audio/shoot.wav', { id: 'gunshot' });
        await animateTextDisplay("scena1_4a_5");
        return await gameOver();
      case 2:
        await animateTextDisplay("scena1_4b");
        let syt = Math.floor(Math.random() * 3) + 1;
        switch (syt) {
          case 1: /* ... (reszta logiki jak wcześniej, używając animateTextDisplay i displayChoices) ... */ break;
          // Uzupełnij pozostałe przypadki analogicznie
        }
        // Przykład:
        if (syt === 1) {
            await animateTextDisplay("scena1_5");
            let straz = await displayChoices("scena1_5x");
            if (straz === 1) await animateTextDisplay("scena1_5a");
            else { /* ... */ }
        } else if (syt === 2) { /* ... */ }
        else { /* ... */ }
        break; // Dodano break
    }
  }
  stopSound('celaAmbience');
  
  playSound('audio/pw.wav', { id: 'improvisationMusic' });
  await animateTextDisplay("scena2_1");
  let imp = await displayChoices("scena2_2x");
  // ... (kontynuuj konwersję reszty logiki gry, zastępując 'wtekst' przez 'animateTextDisplay' i 'wybor' przez 'displayChoices')
  
  // Przykład dla salonu
  stopSound('improvisationMusic');
  removeActiveSceneBackground("tlo2");
  await displayTitle("SALON WARSZAWSKI");
  setActiveSceneBackground("tlo-salon");
  playSound('audio/salon.wav', { loop: true, id: 'salonAmbience' });
  await animateTextDisplay("scena3_1");
  // ... itd.

  // Na końcu, po zakończeniu wszystkich scen:
  // await animateTextDisplay("scena6_5");
  // await gameOver();
}

async function gameOver() {
  await displayTitle("KONIEC");
  await animateTextDisplay("scena6_6");
  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";
  let replayButton = document.createElement("button");
  replayButton.textContent = "Zagraj Ponownie";
  replayButton.onclick = () => window.location.reload();
  choicesDiv.appendChild(replayButton);
}


// ----- Funkcje Pomocnicze UI -----
async function displayTitle(titleText) {
  const mainGameDiv = document.getElementById("main-game");
  const titleElement = document.createElement("p"); // Używamy p, bo .tytul jest dla p
  titleElement.classList.add("tytul");
  titleElement.innerHTML = titleText; // Użyj innerHTML jeśli tytuł zawiera formatowanie

  // Animacja pojawiania się tytułu
  titleElement.style.opacity = "0";
  titleElement.style.transform = "translateY(30px) scale(0.9)";
  titleElement.style.transition = "opacity 0.7s ease-out, transform 0.7s ease-out";
  
  mainGameDiv.appendChild(titleElement);
  mainGameDiv.scrollTop = mainGameDiv.scrollHeight;

  // Wymuś reflow dla animacji
  await new Promise(requestAnimationFrame); 
  titleElement.style.opacity = "1";
  titleElement.style.transform = "translateY(0) scale(1)";

  // Czekaj na kliknięcie "Dalej" tylko jeśli nie ma innych wyborów
  const choicesDiv = document.getElementById("choices");
  if (!choicesDiv.hasChildNodes()) {
    const dalejButton = createActionButton("Dalej", "dalej-title-btn");
    choicesDiv.appendChild(dalejButton);
    await waitForButtonClick(dalejButton.id);
    choicesDiv.innerHTML = ""; // Wyczyść po kliknięciu
  } else {
     // Jeśli są wybory, zakładamy, że gra będzie czekać na wybór gracza
  }
}

async function animateTextDisplay(sceneKey) {
  const mainGameDiv = document.getElementById("main-game");
  const sceneLines = tekst[sceneKey];

  if (!sceneLines) {
    console.error("Nie znaleziono tekstu dla sceny:", sceneKey);
    const errorP = document.createElement("p");
    errorP.textContent = "Błąd: Brak tekstu dla sceny.";
    mainGameDiv.appendChild(errorP);
    return;
  }

  const paragraph = document.createElement("p");
  paragraph.id = `scene-text-${sceneKey}-${currentParagraphIndex++}`;
  paragraph.classList.add("game-text-paragraph"); // Dodaj klasę dla stylizacji
  mainGameDiv.appendChild(paragraph);
  
  // Pokaż paragraf z animacją (jeśli zdefiniowano w CSS)
  paragraph.classList.add('visible');


  for (const line of sceneLines) {
    const words = line.split(/(\s+)/); // Dzieli, zachowując spacje jako osobne elementy
    for (const word of words) {
        if (word.trim() === '') { // Jeśli to tylko spacja
            paragraph.innerHTML += word; // Dodaj spację bez animacji
            continue;
        }
        const chars = word.split('');
        for (const char of chars) {
            const span = document.createElement("span");
            span.className = "char-animated";
            span.textContent = char;
            span.style.animationDelay = `${Math.random() * 0.1}s`; // Lekkie losowe opóźnienie dla naturalności
            paragraph.appendChild(span);
            mainGameDiv.scrollTop = mainGameDiv.scrollHeight;
            await new Promise(resolve => setTimeout(resolve, TEXT_ANIMATION_CHAR_DELAY));
        }
    }
    paragraph.appendChild(document.createElement("br"));
    paragraph.appendChild(document.createElement("br"));
    mainGameDiv.scrollTop = mainGameDiv.scrollHeight;
    // await new Promise(resolve => setTimeout(resolve, TEXT_ANIMATION_LINE_DELAY)); // Opcjonalne opóźnienie między liniami
  }
  
  // Po wyświetleniu całego tekstu, czekaj na przycisk "Dalej"
  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = ""; // Wyczyść poprzednie
  const dalejButton = createActionButton("Dalej", `dalej-scene-${sceneKey}-btn`);
  choicesDiv.appendChild(dalejButton);
  await waitForButtonClick(dalejButton.id);
  choicesDiv.innerHTML = ""; // Wyczyść przycisk "Dalej"
}


async function displayChoices(sceneChoicesKey) {
  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = ""; // Wyczyść poprzednie
  const choiceTexts = tekst[sceneChoicesKey];

  if (!choiceTexts) {
    console.error("Nie znaleziono wyborów dla klucza:", sceneChoicesKey);
    return null; // Lub rzuć błąd
  }

  return new Promise(resolve => {
    choiceTexts.forEach((choiceText, index) => {
      const button = createActionButton(choiceText, `choice-btn-${index}`);
      button.addEventListener("click", () => resolve(index + 1), { once: true });
      button.style.opacity = "0";
      button.style.transform = "translateY(10px)";
      button.style.transition = `opacity 0.3s ease-out ${index * 0.1}s, transform 0.3s ease-out ${index * 0.1}s`;
      choicesDiv.appendChild(button);
      
      // Trigger animation
      requestAnimationFrame(() => {
        button.style.opacity = "1";
        button.style.transform = "translateY(0)";
      });
    });
  });
}

function createActionButton(text, id) {
  const button = document.createElement("button");
  button.textContent = text;
  button.id = id;
  // Możesz dodać tu więcej klas lub stylów dla przycisków akcji
  return button;
}

function waitForButtonClick(buttonId) {
  return new Promise(resolve => {
    const button = document.getElementById(buttonId);
    if (button) {
      button.addEventListener("click", resolve, { once: true });
    } else {
      console.warn(`Przycisk o ID '${buttonId}' nie został znaleziony.`);
      resolve(); // Rozwiąż, aby uniknąć blokady, jeśli przycisk nie istnieje
    }
  });
}

function setActiveSceneBackground(className) {
    // Najpierw usuń wszystkie inne tła, jeśli istnieją
    const backgrounds = ['tlo1', 'tlo2', 'tlo-salon', 'tlo-widzenie', 'tlo-bal', 'tlo-escape']; // Dodaj wszystkie możliwe klasy tła
    const mainGame = document.getElementById('main-game'); // Lub inny element, który ma tło
    
    backgrounds.forEach(bg => mainGame.classList.remove(bg));

    // Dodaj nowe tło
    if (className) {
        mainGame.classList.add(className);
    }
}
function removeActiveSceneBackground(className) {
    const mainGame = document.getElementById('main-game');
    if (className) {
        mainGame.classList.remove(className);
    }
}

// ----- Zarządzanie Dźwiękiem -----
function playSound(src, options = {}) {
  if (isCicho || !gameState.audioContext) return;

  // Zatrzymaj poprzedni dźwięk o tym samym ID, jeśli istnieje
  if (options.id) {
    stopSound(options.id);
  }

  const audio = new Audio(src);
  audio.loop = !!options.loop;
  audio.volume = options.volume || 0.7; // Domyślna głośność
  if (options.id) {
    audio.dataset.soundId = options.id; // Zapisz ID w atrybucie data
  }

  audio.play().catch(e => console.warn(`Błąd odtwarzania dźwięku ${src}:`, e));
  grajace.push(audio);
  return audio;
}

function stopSound(soundId) {
  grajace = grajace.filter(audio => {
    if (audio.dataset.soundId === soundId) {
      audio.pause();
      audio.currentTime = 0;
      return false; // Usuń z tablicy
    }
    return true; // Zachowaj w tablicy
  });
}

function toggleMute() {
  isCicho = !isCicho;
  grajace.forEach(audio => {
    audio.muted = isCicho;
  });
  if (isCicho) { // Jeśli wyciszono, zatrzymaj wszystkie dźwięki dla pewności
    grajace.forEach(audio => {
        audio.pause();
        // audio.currentTime = 0; // Opcjonalnie resetuj czas
    });
  } else {
    // Można by tu wznowić dźwięki, które powinny grać (np. muzykę tła),
    // ale to wymagałoby bardziej złożonego zarządzania stanem audio.
    // Na razie, po włączeniu dźwięku, nowe dźwięki będą odtwarzane normalnie.
  }
  updateMuteButtonVisuals();
}
function updateMuteButtonVisuals() {
    const muteButton = document.getElementById("mute-btn");
    const icon = muteButton.querySelector('.icon-placeholder');
    if (isCicho) {
        muteButton.classList.add("cisza");
        if (icon) icon.textContent = "🔇"; // Zmień na ikonę wyciszenia
        muteButton.setAttribute('aria-label', 'Włącz dźwięk');
    } else {
        muteButton.classList.remove("cisza");
        if (icon) icon.textContent = "🔊"; // Zmień na ikonę głośności
        muteButton.setAttribute('aria-label', 'Wycisz dźwięk');
    }
}


// ----- Efekty Cząsteczkowe (Dust Motes / Embers) -----
function initializeParticleEffect() {
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  const particleCount = 50; // Ilość cząsteczek

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5; // Rozmiar cząsteczki
      this.speedX = Math.random() * 0.4 - 0.2; // Prędkość pozioma
      this.speedY = Math.random() * 0.4 - 0.2; // Prędkość pionowa
      this.opacity = Math.random() * 0.3 + 0.1; // Przezroczystość
      this.color = `rgba(220, 200, 170, ${this.opacity})`; // Kolor pyłku/iskry
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.size > 0.1) this.size -= 0.005; // Stopniowe zanikanie
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      if (this.size <= 0.1) return;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function animateParticles() {
    if (!gameState.isBookOpen) { // Rysuj cząsteczki tylko gdy książka jest widoczna
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
        p.update();
        p.draw();
        });
        // Resetuj cząsteczki, które zniknęły
        particles = particles.filter(p => p.size > 0.1);
        while (particles.length < particleCount) {
        particles.push(new Particle());
        }
    } else { // Gdy książka jest otwarta i gra aktywna, można zmniejszyć intensywność lub zmienić efekt
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Czyść canvas, jeśli nie chcemy efektu podczas gry
    }
    requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();
}