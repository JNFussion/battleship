import PubSub from "pubsub-js";
import Canvg from "canvg";
import Konva from "konva";
import { enumDirection, enumID } from "./enums";
import waterIcon from "./icons/water-solid.svg";
import fireIcon from "./icons/fire-solid.svg";

const canvas = (id, canvasDom) => {
  const element = canvasDom;
  const width = element.clientWidth;
  const height = element.clientHeight;
  const unitX = width / 10;
  const unitY = height / 10;
  const offset = 2.5;
  const reduceShipBy = 5;
  const stage = new Konva.Stage({
    container: element.id,
    width,
    height,
    id,
  });
  const layers = {
    gridLayer: new Konva.Layer(),
    shipsLayer: new Konva.Layer(),
    attacksLayer: new Konva.Layer(),
  };

  const icons = {
    water: document.createElement("canvas"),
    hit: document.createElement("canvas"),
  };

  layers.gridLayer.listening(false);
  layers.attacksLayer.listening(false);

  stage.add(layers.gridLayer);
  stage.add(layers.shipsLayer);
  stage.add(layers.attacksLayer);

  function getShips() {
    const ships = [];

    layers.shipsLayer.find(".body").forEach((s) => {
      const pos = s.getAbsolutePosition();
      const obj = {};
      obj.startCoords = [Math.floor(pos.y / unitY), Math.floor(pos.x / unitX)];
      obj.direction = s.rotation()
        ? enumDirection.VERTICAL
        : enumDirection.HORIZONTAL;
      obj.size = Math.round(s.width() / unitX);
      ships.push(obj);
    });

    return ships;
  }

  function drawBoard() {
    for (let x = unitX; x < width; x += unitX) {
      layers.gridLayer.add(
        new Konva.Line({
          points: [x, 0, x, height],
          stroke: "white",
          strokeWidth: 1,
          dash: [10, 5],
        })
      );
    }
    for (let y = unitY; y < height; y += unitY) {
      layers.gridLayer.add(
        new Konva.Line({
          points: [0, y, width, y],
          stroke: "white",
          strokeWidth: 1,
          dash: [10, 5],
        })
      );
    }
  }

  function newRectangle({ x, y }, size) {
    const newGroup = new Konva.Group({
      x,
      y,
      width: unitX * size,
      height: unitY,
      id: `ship-${size}-${x}-${y}`,
      visible: stage.id() === enumID.PJ1,
    });

    newGroup.add(
      new Konva.Rect({
        x: offset,
        y: offset,
        width: unitX * size - reduceShipBy,
        height: unitY - reduceShipBy,
        fill: "#007F5F",
        stroke: "#D4D700",
        strokeWidth: 1,
        name: `body`,
        draggable: stage.id() === enumID.PJ1,
      })
    );
    newGroup.add(
      new Konva.Rect({
        x: offset,
        y: offset,
        width: unitX * size - reduceShipBy,
        height: unitY - reduceShipBy,
        fill: "#80004A",
        stroke: "#FFE6E4",
        strokeWidth: 1,
        name: `shadow`,
        visible: false,
      })
    );

    layers.shipsLayer.add(newGroup);
    return newGroup;
  }

  function isInsideBounds(ship) {
    const shipPos = ship.getAbsolutePosition();
    return (
      shipPos.x + ship.width() < stage.width() &&
      shipPos.x > 0 &&
      shipPos.y + ship.height() < stage.height() &&
      shipPos.y > 0
    );
  }

  function newIcon({ iconType, coords, playerID }) {
    if (stage.id() !== playerID) return;
    const img = new Konva.Image({
      image: icons[iconType],
      x: coords.x * unitX,
      y: coords.y * unitY,
      width: unitX,
      height: unitY,
      strokeWidth: 1,
      scale: { x: 0.8, y: 0.8 },
      opacity: 0.2,
    });
    const imgClient = img.getClientRect();
    img.position({
      x: imgClient.x + (img.width() - imgClient.width) / 2,
      y: imgClient.y + (img.height() - imgClient.height) / 2,
    });
    layers.attacksLayer.add(img);

    img.to({
      duration: 0.5,
      opacity: 1,
    });
  }

  /*
  Keep ships inside canvas
  Source: https://jsbin.com/gakelemuru/edit?js,output
*/

  function keepInsideBounds(shape) {
    const box = shape.getClientRect();
    const absPos = shape.getAbsolutePosition();
    const offsetX = box.x - absPos.x;
    const offsetY = box.y - absPos.y;

    const newAbsPos = { ...absPos };
    if (box.x < 0) {
      newAbsPos.x = -offsetX;
    }
    if (box.y < 0) {
      newAbsPos.y = -offsetY;
    }
    if (box.x + box.width > stage.width()) {
      newAbsPos.x = stage.width() - box.width - offsetX;
    }
    if (box.y + box.height > stage.height()) {
      newAbsPos.y = stage.height() - box.height - offsetY;
    }
    shape.setAbsolutePosition(newAbsPos);
  }

  function getShadow(rect) {
    return rect.getParent().find(".shadow")[0];
  }

  function setPositionOnGrid(rectToMove, rectMoveTo) {
    if (rectToMove.rotation() === 90) {
      rectToMove.position({
        x: Math.round(rectMoveTo.x() / unitX) * unitX - offset,
        y: Math.round(rectMoveTo.y() / unitY) * unitY + offset,
      });
    } else {
      rectToMove.position({
        x: Math.round(rectMoveTo.x() / unitX) * unitX + offset,
        y: Math.round(rectMoveTo.y() / unitY) * unitY + offset,
      });
    }
  }

  function haveIntersection(r1, r2) {
    return !(
      r2.x > r1.x + r1.width + unitX ||
      r2.x + r2.width + unitX < r1.x ||
      r2.y > r1.y + r1.height + unitY ||
      r2.y + r2.height + unitY < r1.y
    );
  }

  function isAnyOverlapping(layer, target) {
    const targetRect = target.getClientRect();
    return layer.find(".body").some((rect) => {
      if (rect === target) return;
      // eslint-disable-next-line consistent-return
      return haveIntersection(rect.getClientRect(), targetRect);
    });
  }

  function shipRotation(ship) {
    const shadowShip = getShadow(ship);
    const oldAttrs = { ...ship.getAttrs() };
    const oldAttrsShadow = { ...shadowShip.getAttrs() };
    const oldRotation = ship.rotation();
    const oldRotationShadow = shadowShip.rotation();
    if (ship.rotation() === 90) {
      ship.rotate(-90);
      ship.x(oldAttrs.x - ship.height());
      shadowShip.rotate(-90);
      shadowShip.x(oldAttrsShadow.x - shadowShip.height());
    } else {
      ship.rotate(90);
      ship.x(oldAttrs.x + ship.height());
      shadowShip.rotate(90);
      shadowShip.x(oldAttrsShadow.x + shadowShip.height());
    }
    keepInsideBounds(ship);
    keepInsideBounds(shadowShip);
    if (isAnyOverlapping(layers.shipsLayer, ship)) {
      ship.rotation(oldRotation);
      ship.setAttrs(oldAttrs);
      shadowShip.rotation(oldRotation);
      shadowShip.setAttrs(oldRotationShadow);
    }
  }

  function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  }

  function initBoardPlaces() {
    const arr = [];

    for (let i = 0; i < 9; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        arr.push({ x: unitX * i, y: unitY * j });
      }
    }
    return arr;
  }

  function randomiseShips() {
    const availablePos = initBoardPlaces();
    for (let size = 2; size <= 5; size += 1) {
      for (let j = size; j <= 5; j += 1) {
        let randomPos = availablePos[getRandomInt(0, availablePos.length - 1)];
        const group = newRectangle(randomPos, size);
        const ship = group.children[0];
        let validPlacement = false;
        const auxAvailablePos = [...availablePos];
        do {
          if (
            !isAnyOverlapping(layers.shipsLayer, ship) &&
            isInsideBounds(ship)
          ) {
            validPlacement = true;
            availablePos.splice(availablePos.indexOf(randomPos), 1);
            break;
          }
          const rotation = ship.rotation();
          shipRotation(ship);
          if (rotation !== ship.rotation()) {
            validPlacement = true;
            availablePos.splice(availablePos.indexOf(randomPos), 1);
            break;
          }
          auxAvailablePos.splice(auxAvailablePos.indexOf(randomPos), 1);
          if (auxAvailablePos.length === 0) return -1;

          randomPos =
            auxAvailablePos[getRandomInt(0, auxAvailablePos.length - 1)];
          group.position(randomPos);
        } while (!validPlacement);
        const tempID = group.id();
        const newID = tempID.replace(
          /((\d{1,3}(\.?\d{1,14})?)-(\d{1,3}(\.?\d{1,14})?))$/,
          `${randomPos.x}-${randomPos.y}`
        );

        group.id(newID);
      }
    }
    return layers.shipsLayer;
  }

  function placeRandom() {
    if (randomiseShips() === -1) {
      layers.shipsLayer.removeChildren();
      placeRandom();
    }
  }

  function startGame() {
    layers.shipsLayer.listening(false);
    stage.on("click", () => {
      const pointerPos = stage.getPointerPosition();
      PubSub.publishSync("playRound", {
        id: stage.id(),
        coords: [
          Math.floor(pointerPos.y / unitY),
          Math.floor(pointerPos.x / unitX),
        ],
      });
    });
  }

  function showSunkenShip({ playerID, size, coords }) {
    if (playerID !== id) return;
    const group = layers.shipsLayer.findOne(
      `#ship-${size}-${coords[1] * unitX}-${coords[0] * unitY}`
    );

    group.setAttrs({ visible: true });
    group.opacity(0.25);
  }

  const subMethods = { newIcon, showSunkenShip };

  function subcriptionHandler(msg, data) {
    subMethods[msg](data);
  }

  // EVENTS

  window.addEventListener("load", () => {
    Canvg.from(icons.water.getContext("2d"), waterIcon).then((v) => {
      v.resize(unitX, unitY, "xMidYMid meet");
      v.render();
    });
    Canvg.from(icons.hit.getContext("2d"), fireIcon).then((v) => {
      v.resize(unitX, unitY, "xMidYMid meet");
      v.render();
    });
  });

  layers.shipsLayer.on("click", (e) => {
    shipRotation(e.target);
  });

  /*
    Snap to grid of rect
    Source: https://medium.com/@pierrebleroux/snap-to-grid-with-konvajs-c41eae97c13f
  */

  layers.shipsLayer.on("dragstart", (e) => {
    stage.container().style.cursor = "grabbing";
    const shadowShip = getShadow(e.target);

    shadowShip.show();
    shadowShip.moveToTop();
    e.target.moveToTop();
  });

  layers.shipsLayer.on("dragend", (e) => {
    stage.container().style.cursor = "grab";
    const shadowShip = getShadow(e.target);
    setPositionOnGrid(e.target, shadowShip);
    stage.batchDraw();
    shadowShip.hide();
  });

  layers.shipsLayer.on("dragmove", (e) => {
    const shadowShip = getShadow(e.target);
    keepInsideBounds(e.target);
    keepInsideBounds(shadowShip);

    if (!isAnyOverlapping(layers.shipsLayer, e.target)) {
      setPositionOnGrid(shadowShip, e.target);
    }
    stage.batchDraw();
  });

  layers.shipsLayer.on("mouseenter", () => {
    stage.container().style.cursor = "grab";
  });

  layers.shipsLayer.on("mouseleave", () => {
    stage.container().style.cursor = "default";
  });

  PubSub.subscribe("newIcon", subcriptionHandler);
  PubSub.subscribe("showSunkenShip", subcriptionHandler);
  return {
    id,
    element,
    getShips,
    drawBoard,
    newRectangle,
    placeRandom,
    startGame,
    subcriptionHandler,
  };
};

export default canvas;
