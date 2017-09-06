class DOMNodeCollection {
  constructor(htmlElements) {
    this.els = htmlElements;

  }

  //grabs the first element
  //if an argument is given that argument replaces all children of the parent
  //if no argument is given it returns all children (innerHtml)
  html(str) {
    if (str !== undefined) {
      this.els.forEach((el) => {
        //children fo the element exluding the element itself
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

  removeAllClasses() {
    this.els.forEach((el)=>{
      el.className = "";
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

  on(eventName, callback) {
    this.els.forEach(node => {
      node.addEventListener(eventName, callback);
      const eventKey = `DOMinoEvents-${eventName}`;
      if (typeof node[eventKey] === "undefined") {
        node[eventKey] = [];
      }

      node[eventKey].push(callback);
    });
  }

  off(eventName) {
    this.els.forEach(node => {
      const eventKey = `DOMinoEvents-${eventName}`;
      if (node[eventKey]) {
        node[eventKey].forEach(callback => {
          node.removeEventListener(eventName, callback);
        });
      }
      node[eventKey] = [];
    });
  }

}//class end
export default DOMNodeCollection;
// module.exports = DOMNodeCollection;
