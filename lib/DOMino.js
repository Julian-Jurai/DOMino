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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _dom_node_collection = __webpack_require__(1);

var _dom_node_collection2 = _interopRequireDefault(_dom_node_collection);

var _todos = __webpack_require__(2);

var _stylehandler = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function $l(selector) {
  var els = void 0;
  var array = [];
  var funcs = [];

  if (typeof selector === "string") {
    //find all nodes with this selector
    //string selectors are CSS selectors
    els = document.querySelectorAll(selector);
    //returns an array like object
    for (var i = 0; i < els.length; i++) {
      //convert to a real array object
      array.push(els[i]);
    }
    return new _dom_node_collection2.default(array);
  } else if (selector instanceof HTMLElement) {
    els = [selector];
    return new _dom_node_collection2.default(els);
  } else if (selector instanceof Function) {
    funcs.push(selector);
  }

  document.addEventListener("DOMContentLoaded", function (e) {
    funcs.forEach(function (func) {
      func();
    });
  });
}

//WINDO TEST
window.$l = $l;

window.document.addEventListener("DOMContentLoaded", function (e) {
  var fetchGifButton = $l("#fetch-gif-button");
  var submitTodoButton = $l('#submit-todo');
  var styleHandler = $l("#style-handler");

  var fetchGif = function fetchGif() {

    window.$l.ajax({
      success: function success(res) {
        var imageUrl = res.data.image_url;
        $l("#gif-container").append('<img src="' + imageUrl + '"/>');
      }
    });
  };
  //test
  window.fetchGif = fetchGif;
  //test


  // document.getElementById("fetch-gif-button").addEventListener('click',()=> fetchGif());

  // fetchGifButton.on('click', (e) => {
  //   e.preventDefault();
  //   fetchGif();
  // });

  submitTodoButton.on('click', function (e) {
    e.preventDefault();

    var titleValue = $l('#todo-input-title').els[0].value;
    var bodyValue = $l('#todo-textarea-body').els[0].value;

    (0, _todos.createTodoListItem)(titleValue, bodyValue);
    $l('#todo-input-title').els[0].value = "";
    $l('#todo-textarea-body').els[0].value = "";
  });

  styleHandler.on('change', function (e) {
    e.preventDefault();
    var value = $l('#style-handler').els[0].value;
    (0, _stylehandler.handleStyle)(value);
  });
});

window.$l.extend = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  args.slice(1).forEach(function (obj) {
    Object.keys(obj).forEach(function (k) {
      args[0][k] = obj[k];
    });
  });
  return args[0];
};

window.$l.ajax = function (options) {
  var defaultOpts = {
    method: 'GET',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {},
    url: "https://api.giphy.com/v1/gifs/random?api_key=068e61e473a84c9698874654a0a581f3&limit=5&rating=g",
    success: function success() {
      console.log("Retrieved Data");
    },
    error: function error(err) {
      console.error("An error occurred.");
    }
  };

  $l.extend(defaultOpts, options);

  var xhr = new XMLHttpRequest();
  xhr.open(defaultOpts.method, defaultOpts.url);
  xhr.onload = function (res) {
    if (xhr.status >= 200 && xhr.status < 300) {
      defaultOpts.success(JSON.parse(xhr.response));
    } else {
      defaultOpts.error();
    }
    // console.log(xhr.status);
    // console.log(xhr.reponseType);
    // console.log(xhr.response);
  };

  xhr.send(defaultOpts.data);
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DOMNodeCollection = function () {
  function DOMNodeCollection(htmlElements) {
    _classCallCheck(this, DOMNodeCollection);

    this.els = htmlElements;
  }

  _createClass(DOMNodeCollection, [{
    key: "html",
    value: function html(str) {
      if (str !== undefined) {
        this.els.forEach(function (el) {
          //children fo the element exluding the element itself
          el.innerHTML = str;
        });
      } else {
        return this.els[0].innerHTML;
      }
    }
  }, {
    key: "empty",
    value: function empty() {
      this.html("");
    }
  }, {
    key: "append",
    value: function append(newElement) {
      var _this = this;

      if (newElement instanceof DOMNodeCollection) {
        newElement.els.forEach(function (newEl) {
          _this.els.forEach(function (el) {

            el.innerHTML += newEl.outerHTML;
          });
        });
        newElement.remove();
      } else if (typeof newElement === "string") {

        this.els.forEach(function (el) {

          el.innerHTML += newElement;
        });
      } else if (newElement instanceof HTMLElement) {
        this.els.forEach(function (el) {

          el.innerHTML += newElement.outerHTML;
        });
      }
    }
  }, {
    key: "remove",
    value: function remove() {
      this.els.forEach(function (el) {
        el.outerHTML = "";
      });
    }
  }, {
    key: "attr",
    value: function attr(attributeName, attributeValue) {
      if (attributeValue === undefined) {
        var el = this.els[0];
        return el[attributeName];
      } else {
        this.els.forEach(function (el) {
          el[attributeName] = attributeValue;
        });
      }
    }
  }, {
    key: "addClass",
    value: function addClass(className) {
      this.els.forEach(function (el) {
        var classes = el.className.split(" ");
        if (!classes.includes(className)) {
          el.className += " " + className;
        }
      });
    }
  }, {
    key: "removeClass",
    value: function removeClass(className) {
      this.els.forEach(function (el) {
        var classes = el.className.split(" ");
        if (classes.includes(className)) {
          var idx = classes.indexOf(className);
          classes.splice(idx, 1);
          el.className = classes.join(" ");
        }
      });
    }
  }, {
    key: "removeAllClasses",
    value: function removeAllClasses() {
      this.els.forEach(function (el) {
        el.className = "";
      });
    }
  }, {
    key: "children",
    value: function children() {
      var childrenArr = [];
      // if (selector !== undefined){
      //   this.els.forEach(el => {
      //     const tempChildren = el.querySelectorAll(selector);
      //     for (let i = 0; i < tempChildren.length; i++) {
      //       childrenArr.push(tempChildren[i]);
      //     }
      //   });
      // } else {
      this.els.forEach(function (el) {
        var tempChildren = el.children;
        for (var i = 0; i < tempChildren.length; i++) {
          childrenArr.push(tempChildren[i]);
        }
      });
      // }

      return new DOMNodeCollection(childrenArr);
    }
  }, {
    key: "parent",
    value: function parent() {
      var parentArr = [];
      this.els.forEach(function (el) {
        parentArr.push(el.parentElement);
      });
      return new DOMNodeCollection(parentArr);
    }
  }, {
    key: "find",
    value: function find(selector) {
      var selected = [];
      this.els.forEach(function (el) {
        selected.concat(Array.from(el.querySelectorAll(selector)));
      });
      return new DOMNodeCollection(selected);
    }
  }, {
    key: "on",
    value: function on(eventName, callback) {
      this.els.forEach(function (node) {
        node.addEventListener(eventName, callback);
        var eventKey = "DOMinoEvents-" + eventName;
        if (typeof node[eventKey] === "undefined") {
          node[eventKey] = [];
        }
        node[eventKey].push(callback);
      });
    }
  }, {
    key: "off",
    value: function off(eventName) {
      this.els.forEach(function (node) {
        var eventKey = "DOMinoEvents-" + eventName;
        if (node[eventKey]) {
          node[eventKey].forEach(function (callback) {
            node.removeEventListener(eventName, callback);
          });
        }
        node[eventKey] = [];
      });
    }
  }]);

  return DOMNodeCollection;
}(); //class end


exports.default = DOMNodeCollection;
// module.exports = DOMNodeCollection;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var createTodoListItem = exports.createTodoListItem = function createTodoListItem(titleValue, bodyValue) {
  $l('#todo-list').append('<li>\n    <h2>' + titleValue + '</h2>\n    <p>' + bodyValue + '</p>\n    </li>');
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var handleStyle = exports.handleStyle = function handleStyle(value) {

  function clearClassName() {
    $l("#todo-input-title").removeAllClasses();
    $l("#todo-textarea-body").removeAllClasses();
    $l("#submit-todo").removeAllClasses();
    $l("#form-container").removeAllClasses();
    $l("#main-container").removeAllClasses();
    $l("#todo-list").removeAllClasses();
    $l("body").removeAllClasses("background");
    $l("#slider-container").removeAllClasses("slider");
    $l("#gif-container").removeAllClasses("gif-container");
  }

  if (value === "0") {
    clearClassName();
  }
  if (value === "1") {
    clearClassName();
    $l("#todo-input-title").addClass("text-input-style-1");
    $l("#todo-input-body").addClass("text-input-style-1");
  }
  if (value === "2") {
    clearClassName();
    $l("#todo-input-title").addClass("text-input-style-1");
    $l("#todo-textarea-body").addClass("textarea-style");
    $l("#submit-todo").addClass("submit-button");
  }
  if (value === "3") {
    clearClassName();
    $l("#form-container ").addClass("form-container");
    $l("#todo-textarea-body").addClass("textarea-style");
    $l("#todo-input-title").addClass("text-input-style-1");
    $l("#submit-todo").addClass("submit-button");
  }
  if (value === "4") {
    clearClassName();
    $l("#form-container ").addClass("form-container");
    $l("#todo-textarea-body").addClass("textarea-style");
    $l("#todo-input-title").addClass("text-input-style-1");
    $l("#submit-todo").addClass("submit-button");
    $l("#todo-list").addClass("list-style");
    $l("#main-container").addClass("main-container");
    $l("#gif-container").addClass("gif-container");
  }
  if (value === "5") {
    clearClassName();
    $l("#form-container ").addClass("form-container");
    $l("#todo-textarea-body").addClass("textarea-style");
    $l("#todo-input-title").addClass("text-input-style-1");
    $l("#submit-todo").addClass("submit-button");
    $l("#todo-list").addClass("list-style");
    $l("#main-container").addClass("main-container");
    $l("body").addClass("background");
    $l("#slider-container").addClass("slider");
    $l("#gif-container").addClass("gif-container");
  }
};

/***/ })
/******/ ]);
//# sourceMappingURL=DOMino.js.map