import PubSub from "pubsub-js";
import player from "./player";
import { enumID } from "./enums";

const game = (() => {
  const player1 = player(enumID.PJ1, true);
  const player2 = player(enumID.PJ2, false, true);

  function round(playerAttacking, enemy, coords) {
    const result = playerAttacking.attack(enemy, coords);
    if (result.goodHit) {
      PubSub.publish("newIcon", {
        iconType: "hit",
        coords: { x: result.attackedCoords[1], y: result.attackedCoords[0] },
        playerID: enemy.id,
      });
    } else {
      PubSub.publish("newIcon", {
        iconType: "water",
        coords: { x: result.attackedCoords[1], y: result.attackedCoords[0] },
        playerID: enemy.id,
      });
    }

    if (enemy.isPc()) {
      setTimeout(round(enemy, playerAttacking), 500);
    }
  }

  function playRound({ id, coords }) {
    const inTurn = player1.turn ? player1 : player2;
    const outTurn = inTurn === player1 ? player2 : player1;
    if (inTurn.id !== id) {
      round(inTurn, outTurn, coords);
    }
  }

  const methods = { playRound, round };

  function subcriptionHandler(msg, data) {
    methods[msg](data);
  }

  PubSub.subscribe("playRound", subcriptionHandler);

  return { player1, player2, subcriptionHandler };
})();

export default game;
