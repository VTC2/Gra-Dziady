let gameState = { currentScene: null };
let a = 0;

async function startGame() {
  console.log("start");
  await dodajRozdzial("prolog",'Prolog',false);
  console.log("dodano prolog");

  await dodajRozdzial("scena1_1", 'więzienie w Wilnie');
  let ac = await wybor("scena1_2x");

  $("#flipbook").turn("addPage", element);
  $("#flipbook").turn("addPage", wybory);

  switch (
    ac //pierwszy wybor
  ) {
    case 1:
      nastepna();

      await wtekst("scena1_2a");
      konrad.inmate_trust = true;
      break;

    case 2:
      nastepna();

      await wtekst("scena1_2b");
      konrad.mist++;
      break;

    case 3:
      await wtekst("scena1_2c");
      konrad.inmate_trust = true;
      break;
  }
}
function nastepna() {
  console.log("Next page");
  $("#flipbook").turn("disable", false);
  $("#flipbook").turn("next");
  setTimeout(function () {
    console.log("minelo 5s");
  }, 5000);
  
  $("#flipbook").turn("disable", true);
}

async function dodajRozdzial(scene, rozdzal, wyborscene = false) {
  // tu przeniose logike tworzrenia stron bo wczesniejsza inplmentacja nie potrzevbnie bazuje na poprzedniej wersji aplikacja z jednym oknem co komplikuje kod
  let lewa = $("<div>", {
    id: `tekst${scene}`,
  });
  let title = $("<h2>", {
    class: "tytul",
    text:  rozdzal,
  });
  lewa.append(title);
   if (false ){let dalej = $("<button>", {
    id: `dalej${scene}`,
    text: "Dalej tekst",
  });
  lewa.append(dalej);
}
  let wybory = $("<div>", {
    id: `wybory${scene}`,
    text: `wybor : ${$("#flipbook").turn("page")}`,
  });
  if (!wyborscene) {
    let defultDalej = $("<button>", {
     id: `dalej${scene}`,
    text: "Dalej wybory",
    });
     wybory.append(defultDalej);
  }
  

  $("#flipbook").turn("addPage", lewa);

  $("#flipbook").turn("addPage", wybory);
  nastepna()
  console.log("elemnts created");
  await wtekst(scene);
}
async function wtekst(scene) {
  const okno_tekstu = document.getElementById(`tekst${scene}`);

  // const okno_wyboru = document.getElementById("choices");
  // okno_wyboru.innerHTML = "";

  // let but = document.createElement("button");
  // but.id = `test`;
  // but.innerText = "dalej";
  gameState.currentScene = scene;
  // okno_wyboru.appendChild(but);

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
  await czekajNaKlikniecie(`wybory${scene}`);
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
