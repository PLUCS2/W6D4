/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\n  constructor (ele) {\n    this.ele = ele;\n    this.events = {};\n  }\n \n  html (str) {\n    if (typeof str === \"undefined\") {\n      return str = this.ele[0].innerHTML; \n    } else {\n      this.ele.forEach(el => {\n        el.innerHTML = str;\n      });\n    }\n  }\n\n  empty() {\n    this.ele.forEach(el => el.innerHTML = \"\")\n  }\n\n  append(arg) {\n    if (typeof arg !== \"string\" && arg.ele.length) {\n      let mini = [];\n      for (let i = 0; i < arg.ele.length; i++) {\n        mini.push(arg.ele[i].outerHTML);\n      }\n      arg = mini.join(\" \");\n    } else if(typeof arg !== \"string\") {\n      arg = arg.outerHTML; \n    }\n\n    this.ele.forEach(el => el.innerHTML += arg);\n  }\n\n  attr(arg, val) {\n    if (typeof val === \"undefined\") {\n      for (let i = 0; i < this.ele.length; i++) {\n        // iterate through this for arg\n        if (this.ele[i].getAttribute(arg)) return this.ele[i].getAttribute(arg);\n      }\n    } else {\n      for (let i = 0; i < this.ele.length; i++) {\n        this.ele[i].setAttribute(arg, val);\n      }\n    }\n  }\n\n  addClass(className, val) {\n    this.attr(className, val);\n  }\n\n  removeClass(className){\n    this.attr(className, \"\");\n  }\n\n  children() {\n    let arr = [];\n    for (let i = 0; i < this.ele.length; i++) {\n      arr.push(this.ele[i].children);\n    }\n    return new DOMNodeCollection(arr);\n  }\n\n  parent() {\n    let arr = [];\n    for (let i = 0; i < this.ele.length; i++) {\n      arr.push(this.ele[i].parentElement);\n    }\n    return new DOMNodeCollection(arr);\n  }\n\n  find(selector) {\n    const eleArr = []; \n    for(let i = 0; i < this.ele.length; i++){\n      eleArr.push(this.ele[i].querySelectorAll(selector));\n    }\n    return new DOMNodeCollection(eleArr);\n  }\n\n  remove() {\n    // this.empty(); THIS IS DONE IN REMOVE (CHILDREN ARE DISCONNECTED AS WELL)\n    for(let i = 0; i < this.ele.length; i++){\n      // this.parent().find(typeof this.ele[i]).empty(); \n      this.ele[i].remove(); \n    }\n  }\n\n  on (event, callback){\n    for(let i = 0; i < this.ele.length; i++){\n      this.ele[i].addEventListener(event, callback);\n    }\n    this.events[event] = callback; \n  }\n\n  off (event){\n    const callback = this.events[event]; \n    for (let i = 0; i < this.ele.length; i++) {\n      this.ele[i].removeEventListener(event, callback);  \n    }\n    this.events[event] = null; \n  }\n}\n\nmodule.exports = DOMNodeCollection;\n\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection */ \"./src/dom_node_collection.js\");\n\n// window.wndw = function (arg) {\n//   window.$l = arg;\n// }\n\nlet loaded = false; \n\ndocument.addEventListener(\"DOMContentLoaded\", () => {doFunky()})\n\nconst doFunc = []; \n\nfunction $l (selector){\n  if (selector instanceof HTMLElement) {\n    return new DOMNodeCollection([selector])\n  } else if (selector instanceof Function) { \n    if(loaded) {\n      selector(); \n    } else {\n      doFunc.push(selector);\n    }\n  } else {\n    return new DOMNodeCollection(Array.from(document.querySelectorAll(selector)));\n  }\n}\n\n$l.extend = function (...objs) {\n  let base = objs[0];\n  for (let i = 1; i < objs.length; i++) {\n    let keys = Object.keys(objs[i])\n    for (let j = 0; j < keys.length; j++) {\n      base[keys[j]] = objs[i][keys[j]]; \n    }\n  }\n\n  return base;\n}\n\n$l.ajax = function (optObj){\n  \n}\n\nfunction doFunky () {\n  for(let i = 0; i < doFunc.length; i++ ){\n    doFunc[i](); \n  }\n  loaded = true; \n}\n\n\nconst objA = { a: \"a\", b: \"a\", c: \"a\" };\nconst objB = { b: \"b\", c: \"b\" };\nconst objC = { c: \"c\" };\nconsole.log($l.extend(objA, objB, objC));\n\nwindow.$l = $l;\n// class DOMNode {\n\n// }\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });