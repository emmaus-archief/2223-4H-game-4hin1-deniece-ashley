
/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/*
 */
///<reference path="p5.global-mode.d.ts" />
"use strict"

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
const SPELEN = 1;
const GAMEOVER = 2;
const GEWONNEN = 3;
const VERLOREN = 4;
const UITLEG = 8;
var spelStatus = UITLEG;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_SPACE = 32;

var spelerX = 600; // x-positie van speler
var spelerY = 670; // y-positie van speler

var vijandX = 200; // x-positie van vijand
var vijandY = 300; // y-positie van vijand

var blokX = 0; // x-positie van blok
var blokY = 670; // y-positie van blok

var vlagX = 1150; // x-positie van vlag
var vlagY = 550; // y-positie van vlag

var obstakelX = 900; // x-positie van obstakel
var obstakelY = 400; // y-positie van obstakel

var zonX = 100;
var zonY = 100;

var spelerSpringt = false;
var springSnelheid = 1;
var springSnelheidStart = 5;
var zwaartekracht = 0.4;

var imgMario; // mario
var img; //plaatje fireball
var imgvlag; //plaatje mario vlag
var imgBack; // plaatje achtergrond

var tijd = 180; //tijd
var tijdX = 900;
var tijdY = 100;



/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function() {
  // speler
  if (keyIsDown(KEY_LEFT)) {
    spelerX = spelerX - 2;
  }

  if (keyIsDown(KEY_RIGHT)) {
    spelerX = spelerX + 2;
  }

  if (spelerSpringt === false &&
    keyIsDown(KEY_SPACE)) { //start sprong
    spelerSpringt = true;
    springSnelheid = springSnelheidStart;
  }
  if (spelerSpringt === true) { //sprong bezig
    spelerY = spelerY - springSnelheid;
    springSnelheid = springSnelheid - 0.2;
  }
  if (spelerY > 710) { //sprong klaar
    spelerSpringt = false;
    spelerY = 710;
  }
  // vijand
  vijandY = vijandY + 2;
  vijandX = vijandX + 2;

  if (vijandY > 700) {
    vijandY = 0
  }


  if (vijandX > 900) {
    vijandX = 0
  }
  //tijd
  tijd = tijd - 0.02;
  if(tijd <= 0){
    spelStatus = VERLOREN
  }

  // kogel
};

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {
  // botsing speler tegen blok

  // botsing kogel tegen vijand

  // update punten en health

};

/**
 * Tekent spelscherm
 */
var tekenAlles = function() {
  // achtergrond
  background(imgBack);
  
  // vijand
  image(img, vijandX - 75, vijandY - 60, 125, 125);
  fill("purple");
 

  // vlag
  image(imgvlag, vlagX, vlagY , 50, 90);
  fill("white")
  

  // zon
  fill("rgb(255,234,0)");
  ellipse(zonX, zonY, 175, 175);

  //tijd
  fill('cyan');
  textSize(100);
  text(floor(tijd), tijdX + 100, tijdY - 50, 100, 100);

  //Blok
  {
    fill("rgb(34, 139, 34)"); //gras
    rect(obstakelX, obstakelY, 150, 50);
    rect(obstakelX - 100, obstakelY - 100, 150, 50);
    rect(obstakelX - 200, obstakelY - 200, 150, 50);
    rect(obstakelX + 100, obstakelY + 100, 150, 50);
  };


  // speler
  image(imgMario, spelerX - 50, spelerY - 150, 100, 100);
  fill("purple");


  // punten en health
};

/**
 * return true als het gameover is
 * anders return false
 */
var checkVerloren = function() {
  if (spelerX - vijandX < 50 &&
    spelerX - vijandX > -50 &&
    spelerY - vijandY < 150 &&
    spelerY - vijandY > 50) {
    console.log("Botsing");

    console.log("spelerY:" + spelerY + " - " + "vijandY:" + vijandY);
    return true;
  }
  return false;
}

var checkGewonnen = function() {
  if (spelerX - vlagX < 50 &&
    spelerX - vlagX > -50 &&
    spelerY - vlagY < 150 &&
    spelerY - vlagY > 50) {
    console.log("Botsing");

    console.log("spelerY:" + spelerY + " - " + "vlagY:" + vlagY);
    return true;
  }


  // check of HP 0 is , of tijd op is, of ...
  return false;
};


/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

/**
 * preload
 * de code in deze functie wordt één keer uitgevoerd door
 * we laden hier de plaatjes
 */



function preload() {
  img = loadImage('Fireball.png'); // vuurbal
  imgMario = loadImage('Mario.png'); //mario
  imgvlag = loadImage('vlag.png'); //vlag
  imgBack = loadImage('achtergrond.jpg');//achtergrond
}

/** 
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
 background(imgBack);
  
}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  if (spelStatus === SPELEN) {
    beweegAlles();
    verwerkBotsing();
    tekenAlles();
    if (checkGewonnen()) {
      spelStatus = GEWONNEN;
    }
    if (checkVerloren()) {
      spelStatus = VERLOREN;
    }
    console.log("spelen");
  }
  if (spelStatus === GEWONNEN){
    // teken game-over scherm
    console.log("gewonnen");
    textSize(50);
    fill("white");
    if (tijd > 0) {
      text("Je hebt gewonnen! Punten!!!", 100, 100);
    }
    if (keyIsDown(32)) { //spatie
      spelStatus = UITLEG;
    }
  }
  if (spelStatus === VERLOREN) {
    // teken game-over scherm
    
    console.log("verloren");
    textSize(50);
    fill("white");
    text("Game over, druk spatie voor start", 100, 100);
    if (keyIsDown(32)) { //spatie
      spelStatus = UITLEG;
    }
  }
  if (spelStatus === UITLEG) {
    // teken uitleg scherm
    console.log("uitleg");
    textSize(50);
    fill('rgb(100, 149, 237)');
    rect(0, 0, 12800, 720);
    fill("white");
    text("Druk op enter om te beginnen", 100, 100);
    if (keyIsDown(13)) { //enter
      spelerX = 400;
      vijandY = 200;
      vijandX = 400;
      tijd = 180;
      spelStatus = SPELEN;
    }
  }

}