"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["dom"],{

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas */ \"./src/canvas.js\");\n/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enums */ \"./src/enums.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\n\n\n(function () {\n  var player1Canvas = (0,_canvas__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_enums__WEBPACK_IMPORTED_MODULE_1__.enumID.PJ1, document.getElementById(\"player-board\"));\n  var player2Canvas = (0,_canvas__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_enums__WEBPACK_IMPORTED_MODULE_1__.enumID.PJ2, document.getElementById(\"enemy-board\"));\n  var randomiseButton = document.getElementById(\"randomise-btn\");\n  var playButton = document.getElementById(\"play-btn\"); // EVENTS\n\n  window.addEventListener(\"load\", function () {\n    player1Canvas.drawBoard();\n    player1Canvas.placeRandom();\n    player2Canvas.drawBoard();\n    player2Canvas.placeRandom();\n  });\n  randomiseButton.addEventListener(\"click\", player1Canvas.placeRandom);\n  playButton.addEventListener(\"click\", function () {\n    player1Canvas.startGame();\n    player2Canvas.startGame();\n    _game__WEBPACK_IMPORTED_MODULE_2__[\"default\"].player1.initPlayerBoard(player1Canvas.getShips());\n    _game__WEBPACK_IMPORTED_MODULE_2__[\"default\"].player2.initPlayerBoard(player2Canvas.getShips());\n    randomiseButton.removeEventListener(\"click\", player1Canvas.placeRandom);\n    document.getElementById(\"overlay\").remove();\n  }, {\n    once: true\n  });\n})();\n\n//# sourceURL=webpack://battleship/./src/dom.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var pubsub_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pubsub-js */ \"./node_modules/pubsub-js/src/pubsub.js\");\n/* harmony import */ var pubsub_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pubsub_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./enums */ \"./src/enums.js\");\n\n\n\n\nvar game = function () {\n  var player1 = (0,_player__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_enums__WEBPACK_IMPORTED_MODULE_2__.enumID.PJ1, true);\n  var player2 = (0,_player__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_enums__WEBPACK_IMPORTED_MODULE_2__.enumID.PJ2, false, true);\n\n  function round(playerAttacking, enemy, coords) {\n    var result = playerAttacking.attack(enemy, coords);\n\n    if (result.goodHit) {\n      pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().publish(\"newIcon\", {\n        iconType: \"hit\",\n        coords: {\n          x: result.attackedCoords[1],\n          y: result.attackedCoords[0]\n        },\n        playerID: enemy.id\n      });\n    } else {\n      pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().publish(\"newIcon\", {\n        iconType: \"water\",\n        coords: {\n          x: result.attackedCoords[1],\n          y: result.attackedCoords[0]\n        },\n        playerID: enemy.id\n      });\n    }\n\n    if (enemy.isPc()) {\n      setTimeout(round(enemy, playerAttacking), 500);\n    }\n  }\n\n  function playRound(_ref) {\n    var id = _ref.id,\n        coords = _ref.coords;\n    var inTurn = player1.turn ? player1 : player2;\n    var outTurn = inTurn === player1 ? player2 : player1;\n\n    if (inTurn.id !== id) {\n      round(inTurn, outTurn, coords);\n    }\n  }\n\n  var methods = {\n    playRound: playRound,\n    round: round\n  };\n\n  function subcriptionHandler(msg, data) {\n    methods[msg](data);\n  }\n\n  pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().subscribe(\"playRound\", subcriptionHandler);\n  return {\n    player1: player1,\n    player2: player2,\n    subcriptionHandler: subcriptionHandler\n  };\n}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (game);\n\n//# sourceURL=webpack://battleship/./src/game.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums */ \"./src/enums.js\");\n\n\nvar cell = function cell(startCoords, direction, ship) {\n  return {\n    startCoords: startCoords,\n    direction: direction,\n    ship: ship\n  };\n};\n\nvar gameboard = function gameboard() {\n  var grid = Array(10).fill().map(function () {\n    return Array(10).fill();\n  });\n  var cellLists = []; // eslint-disable-next-line consistent-return\n\n  var placeShip = function placeShip(startCoords, direction, ship) {\n    if (!Array.isArray(startCoords)) {\n      throw Error(\"Invalid starCoords value\");\n    } else if (startCoords[0] < 0 || startCoords[0] > 9) {\n      throw Error(\"Row start coord out of grid\");\n    } else if (startCoords[1] < 0 || startCoords[1] > 9) {\n      throw Error(\"Column start coord out of grid\");\n    }\n\n    if (direction !== _enums__WEBPACK_IMPORTED_MODULE_0__.enumDirection.HORIZONTAL && direction !== _enums__WEBPACK_IMPORTED_MODULE_0__.enumDirection.VERTICAL) {\n      throw Error(\"Invalid direction value\");\n    }\n\n    if (!ship) {\n      throw Error(\"Missing ship object\");\n    }\n\n    if (direction === _enums__WEBPACK_IMPORTED_MODULE_0__.enumDirection.HORIZONTAL && startCoords[1] + ship.size > 10) {\n      throw Error(\"Ship overflow grid\");\n    }\n\n    if (direction === _enums__WEBPACK_IMPORTED_MODULE_0__.enumDirection.VERTICAL && startCoords[0] + ship.size > 10) {\n      throw Error(\"Ship overflow grid\");\n    }\n\n    var start = direction === _enums__WEBPACK_IMPORTED_MODULE_0__.enumDirection.HORIZONTAL ? startCoords[1] : startCoords[0];\n\n    for (var i = 0, index = start; i < ship.size; i += 1, index += 1) {\n      var col = direction === _enums__WEBPACK_IMPORTED_MODULE_0__.enumDirection.HORIZONTAL ? index : startCoords[1];\n      var row = direction === _enums__WEBPACK_IMPORTED_MODULE_0__.enumDirection.HORIZONTAL ? startCoords[0] : index;\n\n      if (grid[row][col] !== undefined) {\n        return -1;\n      }\n\n      grid[row][col] = cellLists.length;\n    }\n\n    cellLists.push(cell(startCoords, direction, ship));\n  };\n\n  var receiveAttack = function receiveAttack(coords) {\n    if (grid[coords[0]][coords[1]] === undefined) {\n      grid[coords[0]][coords[1]] = \"W\";\n      return false;\n    }\n\n    if (grid[coords[0]][coords[1]] === \"W\") {\n      return false;\n    }\n\n    var targetCell = cellLists[grid[coords[0]][coords[1]]];\n    var pos = Math.sqrt(Math.pow(coords[0] - targetCell.startCoords[0], 2) + Math.pow(coords[1] - targetCell.startCoords[1], 2));\n    return targetCell.ship.hit(pos);\n  };\n\n  var allAreSunk = function allAreSunk() {\n    return cellLists.every(function (c) {\n      return c.ship.isSunk();\n    });\n  };\n\n  return {\n    grid: grid,\n    placeShip: placeShip,\n    receiveAttack: receiveAttack,\n    allAreSunk: allAreSunk\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameboard);\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n/* eslint-disable no-param-reassign */\n\n\n\nvar player = function player(id, turn) {\n  var pc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n  var board = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  var shotsRecord = [];\n\n  var isPc = function isPc() {\n    return pc;\n  };\n\n  var isValidCoords = function isValidCoords(coords) {\n    if (coords[0] < 0 || coords[0] > 9 || coords[1] < 0 || coords[1] > 9) {\n      return false;\n    }\n\n    return !shotsRecord.some(function (shot) {\n      return shot[0] === coords[0] && shot[1] === coords[1];\n    });\n  };\n\n  var initPlayerBoard = function initPlayerBoard(arr) {\n    arr.forEach(function (s) {\n      board.placeShip(s.startCoords, s.direction, (0,_ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(s.size));\n    });\n  };\n\n  var generateAttackCoords = function generateAttackCoords() {\n    var coords = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];\n\n    if (shotsRecord.includes(coords)) {\n      generateAttackCoords();\n    }\n\n    return coords;\n  };\n\n  return {\n    id: id,\n    turn: turn,\n    board: board,\n    isPc: isPc,\n    initPlayerBoard: initPlayerBoard,\n    attack: function attack(enemy, coords) {\n      if (isPc()) {\n        coords = generateAttackCoords();\n      }\n\n      if (!isValidCoords(coords)) {\n        return;\n      }\n\n      if (this.turn) {\n        this.turn = false;\n        enemy.turn = true;\n        shotsRecord.push(coords); // eslint-disable-next-line consistent-return\n\n        return {\n          goodHit: enemy.board.receiveAttack(coords),\n          attackedCoords: coords\n        };\n      }\n    }\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (player);\n\n//# sourceURL=webpack://battleship/./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar shipFactory = function shipFactory(size) {\n  if (![2, 3, 4, 5].includes(size)) {\n    throw RangeError(\"Invalid Size\");\n  }\n\n  var body = Array(size).fill(false);\n\n  var hit = function hit() {\n    var pos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;\n\n    if (pos < 0 || pos >= body.length) {\n      return false;\n    }\n\n    if (body[pos] === true) {\n      return false;\n    }\n\n    body[pos] = true;\n    return body[pos];\n  };\n\n  var isSunk = function isSunk() {\n    return body.every(function (val) {\n      return val;\n    });\n  };\n\n  return {\n    size: size,\n    hit: hit,\n    isSunk: isSunk\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (shipFactory);\n\n//# sourceURL=webpack://battleship/./src/ship.js?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["canvas"], () => (__webpack_exec__("./src/dom.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);