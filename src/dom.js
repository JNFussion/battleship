import canvas from "./canvas";
import game from "./game";

(() => {
  const runningGame = game();
  const player1Canvas = canvas(document.getElementById("player-board"));
  const player2Canvas = canvas(document.getElementById("enemy-board"));
  const randomiseButton = document.getElementById("randomise-btn");
  const playButton = document.getElementById("play-btn");

  // EVENTS

  window.addEventListener("load", () => {
    player1Canvas.drawBoard();
    player1Canvas.placeRandom();
    player2Canvas.drawBoard();
  });

  randomiseButton.addEventListener("click", player1Canvas.placeRandom);
  playButton.addEventListener(
    "click",
    () => {
      runningGame.player1.initPlayerBoard(player1Canvas.getShips());
      runningGame.player2.initPlayerBoard(player2Canvas.getShips());

      document.getElementById("overlay").remove();
    },
    { once: true }
  );
})();
