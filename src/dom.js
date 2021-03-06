import PubSub from "pubsub-js";
import canvas from "./canvas";
import { enumID } from "./enums";
import game from "./game";

(() => {
  const messages = {
    win: {
      title: "Your enemy is now sleeping with the fishes.",
      subtitle: "Keep ploughing through the Sea.",
    },
    defeat: {
      title: "You have been tossed into Davy Jones's Locker.",
      subtitle: "Emerge among the dead and seek revenge.",
    },
  };

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

  const renderEndGame = (msg, player) => {
    const overlay = document.getElementById("end-game-overlay");
    const title = document.getElementById("end-game-title");
    const subtitle = document.getElementById("end-game-subtitle");
    const newGameBtn = document.getElementById("new-game");

    const result = player === player1Canvas.id ? "win" : "defeat";

    title.textContent = messages[result].title;
    subtitle.textContent = messages[result].subtitle;

    newGameBtn.addEventListener("click", () => {
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    });

    overlay.classList.toggle("hidden");
  };

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

  PubSub.subscribe("endGame", renderEndGame);
})();
