async function wybor(scene) {
  const okno_wyboru = document.getElementById("wybory");
  okno_wyboru.innerHTML = "";
  gameState.currentScene = scene;
  let sceneText = tekst[scene];

  return new Promise(function (resolve) {
    for (let i = 0; i < sceneText.length; i++) {
      let przycisk = document.createElement("button");
      przycisk.id = "scene-choice-" + scene + "-" + i;
      przycisk.classList.add("scene-button");
      przycisk.textContent = sceneText[i];

      (function (numer) {
        przycisk.addEventListener("click", function () {
          resolve(numer);
          
        });
      })(i + 1);

      okno_wyboru.appendChild(przycisk);
    }
  });
}

async function wtekst(scene) {
    
  const okno_tekstu = document.getElementById("main-game");
  const okno_wyboru = document.getElementById("choices");
  okno_wyboru.innerHTML = "";
  let but = document.createElement("button");
  but.id = `test`;
  but.innerText = "dalej";
  gameState.currentScene = scene;
  okno_wyboru.appendChild(but);

  let p = document.createElement("p");
  p.id = `scene-text-${scene}`;
  p.classList.add(`scene-text-${a}`);

  let sceneText = tekst[gameState.currentScene];

  sceneText.forEach(function (line) {
    p.appendChild(document.createTextNode(line));
    p.appendChild(document.createElement("br"));
    p.appendChild(document.createElement("br"));
  });

  okno_tekstu.appendChild(p);
  console.log(scene);
  await czekajNaKlikniecie("test");
}

async function title(tytul) {
  const currentPage = $('#flipbook').turn('page');
  const okno_tekstu = document.querySelector(`div[page="${currentPage}"]`);
 
  okno_tekstu.innerHTML = "";
  let p = document.createElement("h2");
  p.classList.add("tytul");
  p.innerHTML = tytul;
  okno_tekstu.appendChild(p);
  let btn = document.createElement("button");
  btn.id = "test";
  btn.innerText = "Dalej";
    okno_tekstu.appendChild(btn);
  await czekajNaKlikniecie("test");
}

  function czekajNaKlikniecie(idPrzycisku) {
    return new Promise(function (resolve) {
      document.getElementById(idPrzycisku).addEventListener(
        "click",
        function () {
          resolve();
        },
        { once: true }
      );
    });
  }

/*
document.getElementById("mute-btn").addEventListener("click", () => {
  isCicho = !isCicho;
  grajace.forEach(function (audio) {
    audio.muted = isCicho;
  });

  const muteButton = document.getElementById("mute-btn");
  if (isCicho) {
    muteButton.textContent = "Włącz Dźwięk";
    muteButton.classList.add("cisza");
  } else {
    muteButton.textContent = "Wycisz Dźwięk";
    muteButton.classList.remove("cisza");
  }
});

function timer() {
  getElementById("timer-bar");
}

function playSound(src) {
  let audio = new Audio(src);
  if (isCicho) {
    audio.muted = true;
  }
  audio.play();
  grajace.push(audio);
  return audio;
}

function stopSound(audio) {
  if (!audio) return;
  audio.pause();
  audio.currentTime = 0;
  grajace = grajace.filter((a) => a !== audio);
}

function minigame() {
  let miniwrap = document.createElement("div");
  miniwrap.classList.add("minigame-wrap");
  document.body.appendChild(miniwrap);
  let mini = document.createElement("div");
  mini.classList.add("minigame");
  miniwrap.appendChild(mini);
  let complete = document.createElement("button");
  complete.textContent = "Zakończ minigame";
  mini.appendChild(complete);
  complete.addEventListener("click", function () {
    miniwrap.remove();
  });
}
*/