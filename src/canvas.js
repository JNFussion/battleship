const canvas = (canvasDom) => {
  const canvasElement = canvasDom;
  const context = canvasElement.getContext("2d");

  function drawBoard() {
    context.setLineDash([5, 5]);
    const unit = canvasElement.width / 10;
    for (let x = unit; x <= canvasElement.width; x += unit) {
      context.moveTo(x, 0);
      context.lineTo(x, canvasElement.height);
    }

    for (let x = unit; x < canvasElement.height; x += unit) {
      context.moveTo(0, x);
      context.lineTo(canvasElement.width, x);
    }

    context.strokeStyle = "#FFF";
    context.stroke();
  }

  const init = () => {
    canvasElement.width = canvasElement.clientWidth;
    canvasElement.height = canvasElement.clientHeight;
    drawBoard();
  };

  function getMousePos(evt) {
    const rect = canvasElement.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  }

  function getCoords(evt) {
    const mousePos = getMousePos(evt);
    return [
      Math.floor(Math.floor(mousePos.y) / (canvasElement.height / 10)),
      Math.floor(Math.floor(mousePos.x) / (canvasElement.width / 10)),
    ];
  }

  return { canvasElement, init, getCoords };
};

export default canvas;
