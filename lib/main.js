import DOMNodeCollection from './dom_node_collection.js';
import { createTodoListItem } from './todos.js';
import { handleStyle } from './stylehandler.js';


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

//WINDO TEST
window.$l = $l;

window.document.addEventListener("DOMContentLoaded", e => {
  let  submitTodoButton = $l('#submit-todo');
  let styleHandler = $l("#style-handler");
  submitTodoButton.on('click', (e) => {
    e.preventDefault();

    let titleValue = $l('#todo-input-title').els[0].value;
    let bodyValue = $l('#todo-textarea-body').els[0].value;

    createTodoListItem(titleValue, bodyValue);
    $l('#todo-input-title').els[0].value="";
    $l('#todo-textarea-body').els[0].value="";
  });
  styleHandler.on('change', (e) => {
    e.preventDefault();
    let value = $l('#style-handler').els[0].value;

    handleStyle(value);
  });
});


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
    url: "http://api.giphy.com/v1/gifs/random?api_key=068e61e473a84c9698874654a0a581f3&limit=5&rating=g",
    success: () => {
      console.log("Retrieved Data");
    },
    error: err => {
      console.error("An error occurred.");
    }
  };

  $l.extend(defaultOpts, options);

  const xhr = new XMLHttpRequest();
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
