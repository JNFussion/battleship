import canvas from "./canvas";
import "./main.css";

const playerCanvas = canvas(document.getElementById("player-board"));
const enemyCanvas = canvas(document.getElementById("enemy-board"));

playerCanvas.drawBoard();
enemyCanvas.drawBoard();
playerCanvas.placeRandom();
