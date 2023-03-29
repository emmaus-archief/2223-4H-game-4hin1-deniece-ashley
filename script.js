/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/*
 * instellingen om foutcontrole van je code beter te maken 
 */
///<reference path="p5.global-mode.d.ts" />
"use strict"

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = SPELEN;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_SPACE = 32;

var spelerX = 200; // x-positie van speler
var spelerY = 600; // y-positie van speler
var vijandX = 600; // x-positie van vijand
var vijandY = 500; // y-positie van vijand

var spelerSpringt = false;
var springSnelheid = 0;
var springSnelheidStart = 5;
var zwaartekracht = 0.4 ;

var img; //plaatje


/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function() {
  // speler
  if (keyIsDown(KEY_LEFT)) {
   spelerX = spelerX -1;
  }
  
  if (keyIsDown(KEY_RIGHT)) {
    spelerX = spelerX +1;
  }
  
  if(spelerSpringt === false && 
     keyIsDown(KEY_SPACE)) { //start sprong
    spelerSpringt = true;
    springSnelheid = springSnelheidStart;
  }
  if (spelerSpringt === true) { //sprong bezig
   spelerY = spelerY - springSnelheid;
   springSnelheid = springSnelheid - 0.2;
  }
  if (spelerY > 610) { //sprong klaar
    spelerSpringt = false;
  }
  // vijand

  // kogel
};

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {
  // botsing speler tegen vijand

  // botsing kogel tegen vijand

  // update punten en health

};

/**
 * Tekent spelscherm
 */
var tekenAlles = function() {
  // achtergrond
  fill("rgb(135, 206, 235)");
  rect(0,0,1280,720);
  
  // vijand
 image(img, vijandX - 25 , vijandY - 25, 125, 125);


  // kogel

  // speler
  fill("white");
  rect(spelerX - 25, spelerY - 5, 50, 60);
  fill("black");
  ellipse(spelerX, spelerY + 50, 10, 10);

  // punten en health
};

/**
 * return true als het gameover is
 * anders return false
 */
var checkGameOver = function() {
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
  img = loadImage('Fireball.png');
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
  background('rgb(135, 206, 235)');
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
    if (checkGameOver()) {
      spelStatus = GAMEOVER;
    }
  }
  if (spelStatus === GAMEOVER) {
    // teken game-over scherm

  }
}
