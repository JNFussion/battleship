import gameboard from "../gameboard";
import shipFactory from "../ship";
import { enumDirection } from "../enums";

describe("Place ship", () => {
  let board;
  let gridResult;
  beforeAll(() => {
    board = gameboard();
    gridResult = Array(10)
      .fill()
      .map(() => Array(10).fill());
  });
  describe("1. Invalid startCoords", () => {
    test("Not array", () => {
      expect(() => {
        board.placeShip(1, enumDirection.HORIZONTAL, shipFactory(3));
      }).toThrow("Invalid starCoords value");
      expect(() => {
        board.placeShip("1", enumDirection.HORIZONTAL, shipFactory(3));
      }).toThrow("Invalid starCoords value");
      expect(() => {
        board.placeShip({}, enumDirection.HORIZONTAL, shipFactory(3));
      }).toThrow("Invalid starCoords value");
    });
    test("Row bigger than 10", () => {
      expect(() => {
        board.placeShip([20, 0], enumDirection.HORIZONTAL, shipFactory(3));
      }).toThrow("Row start coord out of grid");
    });
    test("Negative row", () => {
      expect(() => {
        board.placeShip([-5, 0], enumDirection.HORIZONTAL, shipFactory(3));
      }).toThrow("Row start coord out of grid");
    });
    test("Column bigger than 10", () => {
      expect(() => {
        board.placeShip([5, 15], enumDirection.HORIZONTAL, shipFactory(3));
      }).toThrow("Column start coord out of grid");
    });
    test("Negative column", () => {
      expect(() => {
        board.placeShip([5, -5], enumDirection.HORIZONTAL, shipFactory(3));
      }).toThrow("Column start coord out of grid");
    });
  });
  describe("2. Invalid direction", () => {
    test("Not string", () => {
      expect(() => {
        board.placeShip([0, 0], 1234, shipFactory(3));
      }).toThrow("Invalid direction value");
    });
    test("Invalid string", () => {
      expect(() => {
        board.placeShip([0, 0], "1234", shipFactory(3));
      }).toThrow("Invalid direction value");
    });
  });
  describe("3. Missing ship", () => {
    test("Missing ship", () => {
      expect(() => board.placeShip([0, 0], enumDirection.HORIZONTAL)).toThrow(
        "Missing ship object"
      );
    });
  });
  describe("4. Ship overflow board", () => {
    test("Horizontal overflow", () => {
      expect(() =>
        board.placeShip([0, 7], enumDirection.HORIZONTAL, shipFactory(5))
      ).toThrow("Ship overflow grid");
      expect(() =>
        board.placeShip([4, 9], enumDirection.HORIZONTAL, shipFactory(2))
      ).toThrow("Ship overflow grid");
      expect(() =>
        board.placeShip([9, 8], enumDirection.HORIZONTAL, shipFactory(3))
      ).toThrow("Ship overflow grid");
    });
    test("Vertical overflow", () => {
      expect(() =>
        board.placeShip([9, 0], enumDirection.VERTICAL, shipFactory(5))
      ).toThrow("Ship overflow grid");
      expect(() =>
        board.placeShip([9, 4], enumDirection.VERTICAL, shipFactory(2))
      ).toThrow("Ship overflow grid");
      expect(() =>
        board.placeShip([8, 9], enumDirection.VERTICAL, shipFactory(3))
      ).toThrow("Ship overflow grid");
    });
  });
  describe("5. Happy paths", () => {
    test("Place at [0,0] horizontal", () => {
      gridResult[0][0] = 0;
      gridResult[0][1] = 0;
      board.placeShip([0, 0], enumDirection.HORIZONTAL, shipFactory(2));
      expect(board.grid).toEqual(gridResult);
    });
    test("Place at [0,3] vertical", () => {
      gridResult[0][3] = 1;
      gridResult[1][3] = 1;
      gridResult[2][3] = 1;
      board.placeShip([0, 3], enumDirection.VERTICAL, shipFactory(3));
      expect(board.grid).toEqual(gridResult);
    });
    test("Place at [0,6] horizontal", () => {
      gridResult[0][6] = 2;
      gridResult[0][7] = 2;
      gridResult[0][8] = 2;
      gridResult[0][9] = 2;
      board.placeShip([0, 6], enumDirection.HORIZONTAL, shipFactory(4));
      expect(board.grid).toEqual(gridResult);
    });
    test("Place at [5,5] vertical", () => {
      gridResult[5][5] = 3;
      gridResult[6][5] = 3;
      board.placeShip([5, 5], enumDirection.VERTICAL, shipFactory(2));
      expect(board.grid).toEqual(gridResult);
    });
    test("Place at [9,4] horizontal", () => {
      gridResult[9][4] = 4;
      gridResult[9][5] = 4;
      gridResult[9][6] = 4;
      gridResult[9][7] = 4;
      gridResult[9][8] = 4;
      board.placeShip([9, 4], enumDirection.HORIZONTAL, shipFactory(5));
      expect(board.grid).toEqual(gridResult);
    });
  });
  describe("6. No overwrite ship", () => {
    test("Place at [0,0] horizontal", () => {
      expect(
        board.placeShip([0, 0], enumDirection.HORIZONTAL, shipFactory(2))
      ).toBe(-1);
    });
    test("Place at [0,3] vertical", () => {
      expect(
        board.placeShip([0, 3], enumDirection.VERTICAL, shipFactory(3))
      ).toBe(-1);
    });
    test("Place at [0,6] horizontal", () => {
      expect(
        board.placeShip([0, 6], enumDirection.HORIZONTAL, shipFactory(4))
      ).toBe(-1);
    });
    test("Place at [5,5] vertical", () => {
      expect(
        board.placeShip([5, 5], enumDirection.VERTICAL, shipFactory(2))
      ).toBe(-1);
    });
    test("Place at [9,4] horizontal", () => {
      expect(
        board.placeShip([9, 4], enumDirection.HORIZONTAL, shipFactory(5))
      ).toBe(-1);
    });
  });
});

describe("Receive attack", () => {
  let board;
  beforeAll(() => {
    board = gameboard();
    board.placeShip([0, 0], enumDirection.HORIZONTAL, shipFactory(2));
    board.placeShip([0, 3], enumDirection.VERTICAL, shipFactory(3));
    board.placeShip([0, 6], enumDirection.HORIZONTAL, shipFactory(4));
    board.placeShip([5, 5], enumDirection.VERTICAL, shipFactory(2));
    board.placeShip([9, 4], enumDirection.HORIZONTAL, shipFactory(5));
  });

  test("Attack ship at [0,0]", () => {
    expect(board.receiveAttack([0, 0])).toBe(true);
  });
  test("Attack ship at [0,9]", () => {
    expect(board.receiveAttack([0, 9])).toBe(true);
  });
  test("Attack ship at [6,5]", () => {
    expect(board.receiveAttack([6, 5])).toBe(true);
  });
  test("Attack ship at [9,6]", () => {
    expect(board.receiveAttack([9, 6])).toBe(true);
  });
  test("Hit watter at [2,2]", () => {
    expect(board.receiveAttack([2, 2])).toBe(false);
  });
  test("Hit watter at [3,7]", () => {
    expect(board.receiveAttack([3, 7])).toBe(false);
  });
  test("Hit watter at [7,0]", () => {
    expect(board.receiveAttack([7, 0])).toBe(false);
  });
  test("Hit watter at [9,3]", () => {
    expect(board.receiveAttack([9, 3])).toBe(false);
  });

  test("Ship already hit at [0,0]", () => {
    expect(board.receiveAttack([0, 0])).toBe(false);
  });
  test("Ship already hit at [0,9]", () => {
    expect(board.receiveAttack([0, 9])).toBe(false);
  });
  test("Ship already hit at [6,5]", () => {
    expect(board.receiveAttack([6, 5])).toBe(false);
  });
  test("Ship already hit at [9,6]", () => {
    expect(board.receiveAttack([9, 6])).toBe(false);
  });
});
