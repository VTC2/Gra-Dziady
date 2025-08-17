let gameState = { currentScene: null };
let a = 0;

async function startGame() {
  console.log("Starting game");
  let element = $("<div>", {
    id: "main-game",
    text:"",  
  });
  $("#flipbook").turn("addPage", element);
let dalej = $("<button>", {
    id: "dalej",
    text: "Dalej",
  }).on("click",nastepna);
  element.append(dalej);
  let wybory = $("<div>", {
    id: "wybory",
    text: `stasdasdrona : ${$("#flipbook").turn("page")}`,
  });
  $("#flipbook").turn("addPage", wybory);
  console.log("elemnts created");



  nastepna();
  
await wtekst("prolog");
element.find("p").remove();
await wtekst("scena1_1");
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
  setTimeout(() => {
    console.log("Waited for 5 seconds");
}, 5000);
  $("#flipbook").turn("disable", true);
}

async function dodajRozdzial(scene){
  // tu przeniose logike tworzrenia stron bo wczesniejsza inplmentacja nie potrzevbnie bazuje na poprzedniej wersji aplikacja z jednym oknem co komplikuje kod
}
async function wtekst(scene) {
    
  const okno_tekstu = document.getElementById("main-game");
    

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
  await czekajNaKlikniecie("dalej");
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
  // document.addEventListener("DOMContentLoaded", startGame);
// $('#flipbook').on('turning',
// 	function(event, page, obj){

//     document.querySelector(`div[page="${page}"]`).innerText = page;
//   });
// async function startGame() {
// console.log("Starting game");
// let element = $("<div>", {
//     class: "main-game",
//     text: `asdsada`
// });  $("#flipbook").turn("addPage", element);
//     element = $("<div> ewffdsdfs </div>", { class: "main-game" });
//   await title("Prolog");
//   await wtekst("prolog");
//   $("#flipbook").turn("disable", true);
//   await title("WIĘZIENIE W WILNIE");
//   console.log("Game started");
// }
