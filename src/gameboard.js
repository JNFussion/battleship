/* eslint-disable no-plusplus */
const enumDirection = {
  HORIZONTAL: "horizontal",
  VERTICAL: "vertical",
};
const cell = (startCoords, direction, ship) => ({
  startCoords,
  direction,
  ship,
});
const gameboard = () => {
  const grid = Array(10)
    .fill()
    .map(() => Array(10).fill());
  const cellLists = [];

  // eslint-disable-next-line consistent-return
  const placeShip = (startCoords, direction, ship) => {
    if (!Array.isArray(startCoords)) {
      throw Error("Invalid starCoords value");
    } else if (startCoords[0] < 0 || startCoords[0] > 9) {
      throw Error("Row start coord out of grid");
    } else if (startCoords[1] < 0 || startCoords[1] > 9) {
      throw Error("Column start coord out of grid");
    }
    if (
      direction !== enumDirection.HORIZONTAL &&
      direction !== enumDirection.VERTICAL
    ) {
      throw Error("Invalid direction value");
    }
    if (!ship) {
      throw Error("Missing ship object");
    }
    if (
      direction === enumDirection.HORIZONTAL &&
      startCoords[1] + ship.size > 10
    ) {
      throw Error("Ship overflow grid");
    }
    if (
      direction === enumDirection.VERTICAL &&
      startCoords[0] + ship.size > 10
    ) {
      throw Error("Ship overflow grid");
    }

    const start =
      direction === enumDirection.HORIZONTAL ? startCoords[1] : startCoords[0];
    for (let [i, index] = [0, start]; i < ship.size; i++, index++) {
      const col =
        direction === enumDirection.HORIZONTAL ? index : startCoords[1];
      const row =
        direction === enumDirection.HORIZONTAL ? startCoords[0] : index;
      if (grid[row][col] !== undefined) {
        return -1;
      }

      grid[row][col] = cellLists.length;
    }
    cellLists.push(cell(startCoords, direction, ship));
  };

  const receiveAttack = (coords) => {
    if (grid[coords[0]][coords[1]] !== undefined) {
      const targetCell = cellLists[grid[coords[0]][coords[1]]];
      const pos = Math.sqrt(
        (coords[0] - targetCell.startCoords[0]) ** 2 +
          (coords[1] - targetCell.startCoords[1]) ** 2
      );
      return targetCell.ship.hit(pos);
    }
    if (grid[coords[0]][coords[1]] !== "W") {
      grid[coords[0]][coords[1]] = "W";
    }
    return false;
  };

  const allAreSunk = () => cellLists.every((c) => c.ship.isSunk());

  return { grid, placeShip, receiveAttack, allAreSunk };
};

export { gameboard, enumDirection };
