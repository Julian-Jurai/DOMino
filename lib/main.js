const DOMNodeCollection = require('./dom_node_collection.js');

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
