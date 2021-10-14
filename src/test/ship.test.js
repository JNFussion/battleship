import shipFactory from "../ship";

describe("Size", () => {
  describe("1.Valid Size", () => {
    let i = 2;
    let ship;
    beforeEach(() => {
      ship = shipFactory(i);
      i += 1;
    });
    test("1.1 Size of ship: valid sizes [2, 3 ,4, 5]", () => {
      expect(ship.size).toBe(2);
      ship = shipFactory(3);
      expect(ship.size).toBe(3);
      ship = shipFactory(4);
      expect(ship.size).toBe(4);
      ship = shipFactory(5);
      expect(ship.size).toBe(5);
    });
  });
  describe("2.Invalid Size", () => {
    test("2.1 Size of ship: invalid sizes", () => {
      expect(() => shipFactory(1)).toThrow("Invalid Size");
      expect(() => shipFactory(6)).toThrow("Invalid Size");
      expect(() => shipFactory(50)).toThrow("Invalid Size");
    });

    test("2.2 Size of ship: invalid sizes (negative values)", () => {
      expect(() => shipFactory(-10)).toThrow("Invalid Size");
    });

    test("2.3 Size of ship: invalid sizes (undefined)", () => {
      expect(() => shipFactory()).toThrow("Invalid Size");
    });
  });
});

describe("Hit", () => {
  const ship = shipFactory(3);

  test("When ship is hit return true", () => {
    expect(ship.hit(2)).toBe(true);
  });
  test("When position has been already hit", () => {
    expect(ship.hit(2)).toBe(false);
  });
  test("When position is bigger than size", () => {
    expect(ship.hit(100)).toBe(false);
  });
  test("When position is negative", () => {
    expect(ship.hit(-5)).toBe(false);
  });
  test("if position is undefined, default is index 0", () => {
    expect(ship.hit()).toBe(true);
    expect(ship.hit()).toBe(false);
  });
});

describe("Sunk", () => {
  const ship = shipFactory(2);

  test("Not sunk", () => {
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });
  test("It's sunk", () => {
    ship.hit(1);
    expect(ship.isSunk()).toBe(true);
  });
});
