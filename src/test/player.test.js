import { enumID, enumDirection } from "../enums";
import player from "../player";
import shipFactory from "../ship";

describe("Player Attack", () => {
  describe("Human Attack", () => {
    const humanPlayer = player(enumID.PJ1, true);
    const pcPlayer = player(enumID.PJ2, false, true);
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
      expect(humanPlayer.attack(pcPlayer, [0, 0])).toEqual({
        goodHit: true,
        attackedCoords: [0, 0],
      });
    });

    test("Not player's turn", () => {
      expect(humanPlayer.attack(pcPlayer, [2, 3])).toBeUndefined();
    });

    test("Attack [4,4]", () => {
      humanPlayer.turn = true;
      expect(humanPlayer.attack(pcPlayer, [4, 4])).toEqual({
        goodHit: false,
        attackedCoords: [4, 4],
      });
    });

    test("Unvalid coords", () => {
      expect(humanPlayer.attack(pcPlayer, [10, 52])).toBeUndefined();
    });
  });
});
