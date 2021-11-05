/* eslint-disable no-param-reassign */
import gameboard from "./gameboard";
import ship from "./ship";

const player = (id, turn, pc = false) => {
  const board = gameboard();
  const shotsRecord = [];
  const isPc = () => pc;
  const isValidCoords = (coords) => {
    if (coords[0] < 0 || coords[0] > 9 || coords[1] < 0 || coords[1] > 9) {
      return false;
    }
    return !shotsRecord.some(
      (shot) => shot[0] === coords[0] && shot[1] === coords[1]
    );
  };

  const initPlayerBoard = (arr) => {
    arr.forEach((s) => {
      board.placeShip(s.startCoords, s.direction, ship(s.size));
    });
  };

  const generateAttackCoords = () => {
    const coords = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];
    if (shotsRecord.includes(coords)) {
      generateAttackCoords();
    }
    return coords;
  };
  return {
    id,
    turn,
    board,
    isPc,
    initPlayerBoard,
    attack(enemy, coords) {
      if (isPc()) {
        coords = generateAttackCoords();
      }
      if (!isValidCoords(coords)) {
        return;
      }

      if (this.turn) {
        this.turn = false;
        enemy.turn = true;
        shotsRecord.push(coords);
        // eslint-disable-next-line consistent-return
        return {
          goodHit: enemy.board.receiveAttack(coords),
          attackedCoords: coords,
        };
      }
    },
  };
};

export default player;