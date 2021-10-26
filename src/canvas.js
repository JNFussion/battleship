import Konva from "konva";

const canvas = (canvasDom) => {
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
  });
  const layers = {
    gridLayer: new Konva.Layer(),
    shipsLayer: new Konva.Layer(),
  };
  stage.add(layers.gridLayer);
  stage.add(layers.shipsLayer);

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
    });

    newGroup.add(
      new Konva.Rect({
        x: offset,
        y: offset,
        width: unitX * size - reduceShipBy,
        height: unitY - reduceShipBy,
        fill: "purple",
        stroke: "red",
        strokeWidth: 1,
        name: `body`,
        draggable: true,
      })
    );
    newGroup.add(
      new Konva.Rect({
        x: offset,
        y: offset,
        width: unitX * size - reduceShipBy,
        height: unitY - reduceShipBy,
        fill: "red",
        stroke: "#FAFAFA",
        strokeWidth: 1,
        name: `shadow`,
        visible: false,
      })
    );
    layers.shipsLayer.add(newGroup);
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

  function anyHaveIntersection(layer, { target }) {
    const targetRect = target.getClientRect();
    return !layer.find(".body").some((rect) => {
      if (rect === target) return;
      // eslint-disable-next-line consistent-return
      return haveIntersection(rect.getClientRect(), targetRect);
    });
  }

  // EVENTS

  let oldAttrs;
  let oldAttrsShadow;

  layers.shipsLayer.on("click", (e) => {
    const rect = e.target;
    const shadowRect = getShadow(rect);
    oldAttrs = { ...rect.getAttrs() };
    oldAttrsShadow = { ...shadowRect.getAttrs() };

    if (rect.rotation() === 90) {
      rect.rotate(-90);
      rect.x(oldAttrs.x - rect.height());
      shadowRect.rotate(-90);
      shadowRect.x(oldAttrsShadow.x - shadowRect.height());
    } else {
      rect.rotate(90);
      rect.x(oldAttrs.x + rect.height());
      shadowRect.rotate(90);
      shadowRect.x(oldAttrsShadow.x + shadowRect.height());
    }
    keepInsideBounds(rect);
    keepInsideBounds(shadowRect);

    if (!anyHaveIntersection(layers.shipsLayer, e)) {
      rect.setAttrs(oldAttrs);
      shadowRect.setAttrs(oldAttrsShadow);
    }
  });

  /*
    Snap to grid of rect
    Source: https://medium.com/@pierrebleroux/snap-to-grid-with-konvajs-c41eae97c13f
  */

  layers.shipsLayer.on("dragstart", (e) => {
    const shadowShip = getShadow(e.target);

    shadowShip.show();
    shadowShip.moveToTop();
    e.target.moveToTop();
  });

  layers.shipsLayer.on("dragend", (e) => {
    const shadowShip = getShadow(e.target);
    setPositionOnGrid(e.target, shadowShip);
    stage.batchDraw();
    shadowShip.hide();
  });

  layers.shipsLayer.on("dragmove", (e) => {
    const shadowShip = getShadow(e.target);
    keepInsideBounds(e.target);
    keepInsideBounds(shadowShip);

    if (anyHaveIntersection(layers.shipsLayer, e)) {
      setPositionOnGrid(shadowShip, e.target);
    }
    stage.batchDraw();
  });

  return { element, drawBoard, newRectangle };
};

export default canvas;
