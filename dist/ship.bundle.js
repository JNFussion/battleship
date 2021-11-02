"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["ship"],{

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
/******/ var __webpack_exports__ = (__webpack_exec__("./src/ship.js"));
/******/ }
]);