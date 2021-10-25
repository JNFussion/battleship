import canvas from "./canvas";
import "./main.css";

const playerCanvas = canvas(document.getElementById("player-board"));
const enemyCanvas = canvas(document.getElementById("enemy-board"));
playerCanvas.drawBoard();
playerCanvas.newRectangle({ x: 0, y: 0 }, 2);
playerCanvas.newRectangle({ x: 0, y: 45.3 }, 5);
enemyCanvas.drawBoard();
