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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(htmlElements) {
    this.els = htmlElements;

  }

  html(str) {
    if (str !== undefined) {
      this.els.forEach((el) => {
        el.innerHTML = str;
      });
    } else {
      return this.els[0].innerHTML;
    }
  }

  empty() {
    this.html("");
  }

  append (newElement) {
    if (newElement instanceof DOMNodeCollection) {
      newElement.els.forEach((newEl) => {
        this.els.forEach((el) => {
          el.innerHTML += newEl.outerHTML;
        });
      });
      newElement.remove();
    } else if (typeof(newElement) === "string") {
      this.els.forEach((el) => {
        el.innerHTML += newElement;
      });
    } else if (newElement instanceof HTMLElement) {
      this.els.forEach((el) => {
        el.innerHTML += newElement.outerHTML;
      });
    }
  }

  remove() {
    this.els.forEach( (el)=> {
      el.outerHTML = "";
    });
  }

  attr(attributeName, attributeValue) {
    if (attributeValue === undefined) {
      const el = this.els[0];
      return el[attributeName];
    } else {
      this.els.forEach((el) => {
        el[attributeName] = attributeValue;
      });
    }
  }

  addClass(className) {
    this.els.forEach((el)=>{
      let classes = el.className.split(" ");
      if (!classes.includes(className)) {
        el.className += " " + className;
      }
    });
  }

  removeClass(className) {
    this.els.forEach((el)=>{
      let classes = el.className.split(" ");
      if (classes.includes(className)) {
        let idx = classes.indexOf(className);
        classes.splice(idx,1);
        el.className = classes.join(" ");
      }
    });
  }

  children() {
    let childrenArr = [];
    // if (selector !== undefined){
    //   this.els.forEach(el => {
    //     const tempChildren = el.querySelectorAll(selector);
    //     for (let i = 0; i < tempChildren.length; i++) {
    //       childrenArr.push(tempChildren[i]);
    //     }
    //   });
    // } else {
      this.els.forEach(el => {
        let tempChildren = el.children;
        for (let i = 0; i < tempChildren.length; i++) {
          childrenArr.push(tempChildren[i]);
        }
      });
    // }

    return new DOMNodeCollection(childrenArr);
  }

  parent() {
    const parentArr = [];
    this.els.forEach(el =>{
      parentArr.push(el.parentElement);
    });
    return new DOMNodeCollection(parentArr);
  }

  find(selector) {
    let selected = [];

    this.els.forEach(el=>{
      selected.concat(Array.from(el.querySelectorAll(selector)));
    });

    return new DOMNodeCollection(selected);
  }

  on(action, handler) {
    this.els.forEach(el => {
      if (el[action] === undefined){
        el[action] = [handler];
      } else {
        el[action].push(handler);
      }
      el.addEventListener(action, handler);
    });
  }

  off(action) {
    this.els.forEach(el => {
      el[action].forEach(handler => {
        el.removeEventListener(action, handler);
      });
      el[action] = undefined;
    });
  }

}//class end

module.exports = DOMNodeCollection;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(0);

function $l (selector) {
  let els;
  const array = [];
  const funcs = [];

  if (typeof(selector) === "string") {
    //find all nodes with this selector
    //string selectors are CSS selectors
    els = document.querySelectorAll(selector);
    //returns an array like object
    for (var i = 0; i < els.length; i++) {
    //convert to a real array object
      array.push(els[i]);
    }
    return new DOMNodeCollection(array);

  } else if (selector instanceof HTMLElement) {
    els = [selector];
    return new DOMNodeCollection(els);
  } else if (selector instanceof Function) {
    funcs.push(selector);
  }

  document.addEventListener("DOMContentLoaded", e => {
    funcs.forEach(func => {
      func();
    });
  });
}


window.$l = $l;

window.$l.extend = (...args) => {
  args.slice(1).forEach(obj => {
    Object.keys(obj).forEach(k => {
      args[0][k] = obj[k];
    });
  });
  return args[0];
};

window.$l.ajax = (options) => {
  let defaultOpts = {
    method: 'GET',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {},
    url: "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b",
    success: data => {
      console.log("Retrieved Data");
      console.log(data);
    },
    error: err => {
      console.error("An error occurred.");
    },
  };

  $l.extend(defaultOpts, options);

  const xhr = new XMLHttpRequest();
  xhr.open(defaultOpts.method, defaultOpts.url);
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      defaultOpts.success();
    } else {
      defaultOpts.error();
    }
    // console.log(xhr.status);
    // console.log(xhr.reponseType);
    // console.log(xhr.response);
  };

  xhr.send(defaultOpts.data);
};


/***/ })
/******/ ]);