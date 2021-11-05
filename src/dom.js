import canvas from "./canvas";
import { enumID } from "./enums";
import game from "./game";

(() => {
  const player1Canvas = canvas(
    enumID.PJ1,
    document.getElementById("player-board")
  );
  const player2Canvas = canvas(
    enumID.PJ2,
    document.getElementById("enemy-board")
  );
  const randomiseButton = document.getElementById("randomise-btn");
  const playButton = document.getElementById("play-btn");

  // EVENTS

  window.addEventListener("load", () => {
    player1Canvas.drawBoard();
    player1Canvas.placeRandom();
    player2Canvas.drawBoard();
    player2Canvas.placeRandom();
  });

  randomiseButton.addEventListener("click", player1Canvas.placeRandom);
  playButton.addEventListener(
    "click",
    () => {
      player1Canvas.startGame();
      player2Canvas.startGame();
      game.player1.initPlayerBoard(player1Canvas.getShips());
      game.player2.initPlayerBoard(player2Canvas.getShips());
      randomiseButton.removeEventListener("click", player1Canvas.placeRandom);
      document.getElementById("overlay").remove();
    },
    { once: true }
  );
})();
