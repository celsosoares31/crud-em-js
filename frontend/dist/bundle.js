/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controller/tasksController.js":
/*!*******************************************!*\
  !*** ./src/controller/tasksController.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"fetchData\": () => (/* binding */ fetchData),\n/* harmony export */   \"sendData\": () => (/* binding */ sendData)\n/* harmony export */ });\nconst fetchData = async () => {\n  const data = await fetch(\"http://localhost:5000/tasks\");\n  const resp = await data.json();\n  return resp;\n};\n\nconst sendData = async (title) => {\n  await fetch(\"http://localhost:5000/save\", {\n    method: \"POST\",\n    headers: { \"content-type\": \"application/json\" },\n    body: JSON.stringify({\n      title,\n    }),\n  });\n};\n\nconst updateTask = async (task, id) => {\n  const { title, status } = task;\n\n  await fetch(`http://localhost:5000/update/${id}`, {\n    method: \"PUT\",\n    headers: { \"content-type\": \"application/json\" },\n    body: JSON.stringify({\n      title,\n      status,\n    }),\n  });\n};\n\n\n\n//# sourceURL=webpack://frontend/./src/controller/tasksController.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controller_tasksController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller/tasksController */ \"./src/controller/tasksController.js\");\n\n\nconst tasks = document.querySelector(\"#tasks\");\nconst inputTask = document.querySelector(\".add-task\");\nconst form = document.querySelector(\"form\");\n\nconst tasksUpdate = async (e) => {\n  console.log(e.target.value);\n};\n\nconst loadTasks = async () => {\n  tasks.innerHTML = \"\";\n  const data = await (0,_controller_tasksController__WEBPACK_IMPORTED_MODULE_0__.fetchData)();\n  data.forEach((task) => {\n    taskRender(task);\n  });\n  const select = document.querySelector(\"select\");\n  select.addEventListener(\"change\", tasksUpdate);\n  form.addEventListener(\"submit\", addTask);\n};\n\nconst addTask = async (e) => {\n  e.preventDefault();\n  const title = inputTask.value;\n\n  if (title !== undefined) {\n    await (0,_controller_tasksController__WEBPACK_IMPORTED_MODULE_0__.sendData)(title);\n    inputTask.value = \"\";\n\n    loadTasks();\n  }\n};\n\nconst taskRender = (task) => {\n  const tr = document.createElement(\"tr\");\n  const statusArr = [\"em andamento\", \"pendente\", \"concluido\"];\n  const { id, title, created_at, status } = task;\n\n  tr.innerHTML = `\n  <tr>\n    <td>${title}</td>\n    <td>${created_at}</td>\n    <td>\n    <select id=\"${id}\">\n      ${statusArr.map((item) => {\n        if (item !== status) {\n          return `<option value=\"${item}\">${item}</option>`;\n        }\n        return `<option selected value=\"${item}\">${item}</option>`;\n      })}\n    </select>\n    </td>\n    <td>\n      <button><span class=\"material-symbols-outlined\"> edit </span></button>\n      <button><span class=\"material-symbols-outlined\"> delete </span></button>\n    </td>\n  </tr>\n  `;\n  tasks.appendChild(tr);\n};\n\nloadTasks();\n\n\n//# sourceURL=webpack://frontend/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;