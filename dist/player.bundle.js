"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["player"],{

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n/* eslint-disable no-param-reassign */\n\n\n\nvar player = function player(turn) {\n  var pc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n  var board = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.gameboard)();\n  var shotsRecord = [];\n\n  var isPc = function isPc() {\n    return pc;\n  };\n\n  var isValidCoords = function isValidCoords(coords) {\n    if (coords[0] < 0 || coords[0] > 9 || coords[1] < 0 || coords[1] > 9) {\n      return false;\n    }\n\n    return !shotsRecord.includes(coords);\n  };\n\n  var initPlayerBoard = function initPlayerBoard(arr) {\n    arr.forEach(function (s) {\n      board.placeShip(s.startCoords, s.direction, (0,_ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(s.size));\n    });\n  };\n\n  var generateAttackCoords = function generateAttackCoords() {\n    var coords = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];\n\n    if (shotsRecord.includes(coords)) {\n      generateAttackCoords();\n    }\n\n    return coords;\n  };\n\n  return {\n    turn: turn,\n    board: board,\n    isPc: isPc,\n    initPlayerBoard: initPlayerBoard,\n    attack: function attack(enemy, coords) {\n      if (isPc()) {\n        coords = generateAttackCoords();\n      }\n\n      if (!isValidCoords(coords)) {\n        return;\n      }\n\n      if (this.turn) {\n        this.turn = false;\n        enemy.turn = true;\n        shotsRecord.push(coords); // eslint-disable-next-line consistent-return\n\n        return enemy.board.receiveAttack(coords);\n      }\n    }\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (player);\n\n//# sourceURL=webpack://battleship/./src/player.js?");

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
/******/ __webpack_require__.O(0, ["gameboard"], () => (__webpack_exec__("./src/player.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);