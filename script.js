"use strict";

let konrad = {
  mist: 0,
  rew: true,
  bal_inba: false,
  inmate_trust: false,
  duch_przew: false,
};

let grajace = [];
let isCicho = false;

document.addEventListener("DOMContentLoaded", startGame);

async function startGame() {
  const okno_gry = document.getElementById("body");
  await wtekst("prolog");
  await title("Oprawa dźwiekowa i graficzna jest nieskończona.");
  await title("WIĘZIENIE W WILNIE");

  okno_gry.classList.add("tlo1");
  let celao = playSound("audio/cela.wav");

  await wtekst("scena1_1");
  let ac = await wybor("scena1_2x");
  console.log(ac);
  okno_gry.classList.remove("tlo1");
  okno_gry.classList.add("tlo2");

  switch (
    ac //pierwszy wybor
  ) {
    case 1:
      await wtekst("scena1_2a");
      konrad.inmate_trust = true;
      break;

    case 2:
      await wtekst("scena1_2b");
      konrad.mist++;
      break;

    case 3:
      await wtekst("scena1_2c");
      konrad.inmate_trust = true;
      break;
  }

  if (konrad.inmate_trust) {
    //ucieczka
    await wtekst("scena1_3");
    let death = await wybor("scena1_4x");

    switch (death) {
      case 1:
        await wtekst("scena1_4a");
        let strzal = playSound("audio/shoot.wav");
        console.log(strzal.currentTime);
        await wtekst("scena1_4a_5");
        return await end();

      case 2:
        await wtekst("scena1_4b");
        let syt = Math.floor(Math.random() * 3) + 1;

        switch (syt) {
          case 1:
            await wtekst("scena1_5");
            let straz = await wybor("scena1_5x");
            switch (straz) {
              case 1:
                await wtekst("scena1_5a");
                break;

              case 2:
                await wtekst("scena1_5b");
                let sus = await wybor("scena1_5bx");
                switch (sus) {
                  case 1:
                    await wtekst("scena1_5ba");
                    break;
                  case 2:
                    await wtekst("scena1_5bb");
                    break;
                }
                break;
            }
            break;

          case 2:
            await wtekst("scena1_6");
            let cor = await wybor("scena1_6x");
            switch (cor) {
              case 1:
                await wtekst("scena1_6a");
                break;
              case 2:
                await wtekst("scena1_6b");
                break;
            }
            break;

          case 3:
            await wtekst("scena1_7");
            let oficer = await wybor("scena1_7x");
            switch (oficer) {
              case 1:
                await wtekst("scena1_7a");
                break;
              case 2:
                await wtekst("scena1_7b");
                break;
            }
            break;
        }
    }
  }
  stopSound(celao);
  celao = null;
  let impro = playSound("audio/pw.wav");

  await wtekst("scena2_1"); // improwizacja
  let imp = await wybor("scena2_2x");
  let late_imp;
  switch (imp) {
    case 1:
      await wtekst("scena2_2a");
      await wtekst("scena2_3");
      late_imp = await wybor("scena2_4x");
      switch (late_imp) {
        case 1:
          await wtekst("scena2_4a");
          break;
        case 2:
          await wtekst("scena2_4b");
          break;
      }
      break;

    case 2:
      await wtekst("scena2_2b");
      break;

    case 3:
      await wtekst("scena2_2c");
      konrad.mist++;
      break;
  }
  stopSound(impro);
  impro = null;

  okno_gry.classList.remove("tlo2");
  await title("SALON WARSZAWSKI");
  okno_gry.classList.add("tlo-salon");
  let salo = playSound("audio/salon.wav");

  await wtekst("scena3_1");
  let join = await wybor("scena3_2x");
  let pow;

  switch (join) {
    case 1:
      await wtekst("scena3_2a");
      pow = await wybor("scena3_2ax");
      switch (pow) {
        case 1:
          await wtekst("scena3_2aa");
          break;
        case 2:
          await wtekst("scena3_2ab");
          break;
      }
      break;

    case 2:
      await wtekst("scena3_2b");
      konrad.mist++;
      break;

    case 3:
      await wtekst("scena3_2c");
      break;
  }

  if (konrad.inmate_trust) {
    await wtekst("scena3_3");
    let temp = await wybor("scena3_4x");
    switch (temp) {
      case 1:
        await wtekst("scena3_4a");
        break;
      case 2:
        await wtekst("scena3_4b");
        break;
    }
  }
  stopSound(salo);
  salo = null;
  okno_gry.classList.remove("tlo-salon");
  await title("WIDZENIE KSIĘDZA PIOTRA");
  okno_gry.classList.add("tlo-widzenie");
  await wtekst("scena4_1");

  let wis = await wybor("scena4_2x");

  switch (wis) {
    case 1:
      await wtekst("scena4_2a");
      konrad.duch_przew = true;
      konrad.rew = false;
      break;

    case 2:
      await wtekst("scena4_2b");
      konrad.rew = true;
      break;

    case 3:
      await wtekst("scena4_2c");
      await wtekst("scena4_3");
      let wis_int = await wybor("scena4_4x");
      switch (wis_int) {
        case 1:
          await wtekst("scena4_4a");
          break;
        case 2:
          await wtekst("scena4_4b");
          break;
      }
      break;
  }

  okno_gry.classList.remove("tlo-widzenie");
  await title("BAL U SENATORA");
  console.log("dziewk");
  let balo = playSound("audio/bal.mov");
  okno_gry.classList.add("tlo-bal");
  await wtekst("scena5_1");

  let bal = await wybor("scena5_2x");

  switch (bal) {
    case 1:
      await wtekst("scena5_2a");
      konrad.bal_inba = true;
      break;
    case 2:
      await wtekst("scena5_2b");
      break;
    case 3:
      await wtekst("scena5_2c");
      konrad.mist++;
      break;
  }

  if (konrad.inmate_trust && !konrad.bal_inba) {
    await wtekst("scena5_3");
    let temp = await wybor("scena5_4x");
    switch (temp) {
      case 1:
        await wtekst("scena5_4a");
        break;
      case 2:
        await wtekst("scena5_4b");
        break;
    }
  }
  stopSound(balo);
  balo = null;
  okno_gry.classList.remove("tlo-bal");
  await title("EPILOG");
  if (konrad.bal_inba) {
    await wtekst("scena6_1");
  } else if (konrad.duch_przew) {
    await wtekst("scena6_2");
  } else if (konrad.mist >= 3) {
    await wtekst("scena6_4");
  } else if (konrad.rew) {
    await wtekst("scena6_3");
  }

  await wtekst("scena6_5");
  await end();
}

async function end() {
  await title("KONIEC");
  await wtekst("scena6_6");
}
