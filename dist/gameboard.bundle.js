"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["gameboard"],{

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"gameboard\": () => (/* binding */ gameboard),\n/* harmony export */   \"enumDirection\": () => (/* binding */ enumDirection)\n/* harmony export */ });\n/* eslint-disable no-plusplus */\nvar enumDirection = {\n  HORIZONTAL: \"horizontal\",\n  VERTICAL: \"vertical\"\n};\n\nvar cell = function cell(startCoords, direction, ship) {\n  return {\n    startCoords: startCoords,\n    direction: direction,\n    ship: ship\n  };\n};\n\nvar gameboard = function gameboard() {\n  var grid = Array(10).fill().map(function () {\n    return Array(10).fill();\n  });\n  var cellLists = []; // eslint-disable-next-line consistent-return\n\n  var placeShip = function placeShip(startCoords, direction, ship) {\n    if (!Array.isArray(startCoords)) {\n      throw Error(\"Invalid starCoords value\");\n    } else if (startCoords[0] < 0 || startCoords[0] > 9) {\n      throw Error(\"Row start coord out of grid\");\n    } else if (startCoords[1] < 0 || startCoords[1] > 9) {\n      throw Error(\"Column start coord out of grid\");\n    }\n\n    if (direction !== enumDirection.HORIZONTAL && direction !== enumDirection.VERTICAL) {\n      throw Error(\"Invalid direction value\");\n    }\n\n    if (!ship) {\n      throw Error(\"Missing ship object\");\n    }\n\n    if (direction === enumDirection.HORIZONTAL && startCoords[1] + ship.size > 10) {\n      throw Error(\"Ship overflow grid\");\n    }\n\n    if (direction === enumDirection.VERTICAL && startCoords[0] + ship.size > 10) {\n      throw Error(\"Ship overflow grid\");\n    }\n\n    var start = direction === enumDirection.HORIZONTAL ? startCoords[1] : startCoords[0];\n\n    for (var i = 0, index = start; i < ship.size; i++, index++) {\n      var col = direction === enumDirection.HORIZONTAL ? index : startCoords[1];\n      var row = direction === enumDirection.HORIZONTAL ? startCoords[0] : index;\n\n      if (grid[row][col] !== undefined) {\n        return -1;\n      }\n\n      grid[row][col] = cellLists.length;\n    }\n\n    cellLists.push(cell(startCoords, direction, ship));\n  };\n\n  var receiveAttack = function receiveAttack(coords) {\n    if (grid[coords[0]][coords[1]] !== undefined) {\n      var targetCell = cellLists[grid[coords[0]][coords[1]]];\n      var pos = Math.sqrt(Math.pow(coords[0] - targetCell.startCoords[0], 2) + Math.pow(coords[1] - targetCell.startCoords[1], 2));\n      return targetCell.ship.hit(pos);\n    }\n\n    if (grid[coords[0]][coords[1]] !== \"W\") {\n      grid[coords[0]][coords[1]] = \"W\";\n    }\n\n    return false;\n  };\n\n  var allAreSunk = function allAreSunk() {\n    return cellLists.every(function (c) {\n      return c.ship.isSunk();\n    });\n  };\n\n  return {\n    grid: grid,\n    placeShip: placeShip,\n    receiveAttack: receiveAttack,\n    allAreSunk: allAreSunk\n  };\n};\n\n\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/gameboard.js"));
/******/ }
]);