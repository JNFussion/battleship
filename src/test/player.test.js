import { enumDirection } from "../gameboard";
import player from "../player";
import shipFactory from "../ship";

describe("Player Attack", () => {
  describe("Human Attack", () => {
    const humanPlayer = player(true);
    const pcPlayer = player(false, true);
    beforeAll(() => {
      pcPlayer.board.placeShip(
        [0, 0],
        enumDirection.HORIZONTAL,
        shipFactory(2)
      );
      pcPlayer.board.placeShip([0, 3], enumDirection.VERTICAL, shipFactory(3));
      pcPlayer.board.placeShip(
        [0, 6],
        enumDirection.HORIZONTAL,
        shipFactory(4)
      );
      pcPlayer.board.placeShip([5, 5], enumDirection.VERTICAL, shipFactory(2));
      pcPlayer.board.placeShip(
        [9, 4],
        enumDirection.HORIZONTAL,
        shipFactory(5)
      );
    });
    test("Attack [0,0]", () => {
      expect(humanPlayer.attack(pcPlayer, [0, 0])).toBe(true);
    });

    test("Not player's turn", () => {
      expect(humanPlayer.attack(pcPlayer, [2, 3])).toBeUndefined();
    });

    test("Attack [4,4]", () => {
      humanPlayer.turn = true;
      expect(humanPlayer.attack(pcPlayer, [4, 4])).toBe(false);
    });

    test("Unvalid coords", () => {
      expect(humanPlayer.attack(pcPlayer, [10, 52])).toBeUndefined();
    });
  });
});
