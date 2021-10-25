import canvas from "./canvas";
import "./main.css";

const playerCanvas = canvas(document.getElementById("player-board"));
const enemyCanvas = canvas(document.getElementById("enemy-board"));

playerCanvas.drawBoard();
playerCanvas.newRectangle({ x: 0, y: 0 }, 5);
playerCanvas.newRectangle({ x: 0, y: 45.3 }, 4);
playerCanvas.newRectangle({ x: 0, y: 45.3 * 2 }, 4);
playerCanvas.newRectangle({ x: 0, y: 45.3 * 3 }, 3);
playerCanvas.newRectangle({ x: 0, y: 45.3 * 4 }, 3);
playerCanvas.newRectangle({ x: 0, y: 45.3 * 5 }, 3);
playerCanvas.newRectangle({ x: 0, y: 45.3 * 6 }, 2);
playerCanvas.newRectangle({ x: 0, y: 45.3 * 7 }, 2);
playerCanvas.newRectangle({ x: 0, y: 45.3 * 8 }, 2);
playerCanvas.newRectangle({ x: 0, y: 45.3 * 9 }, 2);
enemyCanvas.drawBoard();
