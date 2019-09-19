class DOMNodeCollection {
  constructor (ele) {
    this.ele = ele;
    this.events = {};
  }
 
  html (str) {
    if (typeof str === "undefined") {
      return str = this.ele[0].innerHTML; 
    } else {
      this.ele.forEach(el => {
        el.innerHTML = str;
      });
    }
  }

  empty() {
    this.ele.forEach(el => el.innerHTML = "")
  }

  append(arg) {
    if (typeof arg !== "string" && arg.ele.length) {
      let mini = [];
      for (let i = 0; i < arg.ele.length; i++) {
        mini.push(arg.ele[i].outerHTML);
      }
      arg = mini.join(" ");
    } else if(typeof arg !== "string") {
      arg = arg.outerHTML; 
    }

    this.ele.forEach(el => el.innerHTML += arg);
  }

  attr(arg, val) {
    if (typeof val === "undefined") {
      for (let i = 0; i < this.ele.length; i++) {
        // iterate through this for arg
        if (this.ele[i].getAttribute(arg)) return this.ele[i].getAttribute(arg);
      }
    } else {
      for (let i = 0; i < this.ele.length; i++) {
        this.ele[i].setAttribute(arg, val);
      }
    }
  }

  addClass(className, val) {
    this.attr(className, val);
  }

  removeClass(className){
    this.attr(className, "");
  }

  children() {
    let arr = [];
    for (let i = 0; i < this.ele.length; i++) {
      arr.push(this.ele[i].children);
    }
    return new DOMNodeCollection(arr);
  }

  parent() {
    let arr = [];
    for (let i = 0; i < this.ele.length; i++) {
      arr.push(this.ele[i].parentElement);
    }
    return new DOMNodeCollection(arr);
  }

  find(selector) {
    const eleArr = []; 
    for(let i = 0; i < this.ele.length; i++){
      eleArr.push(this.ele[i].querySelectorAll(selector));
    }
    return new DOMNodeCollection(eleArr);
  }

  remove() {
    // this.empty(); THIS IS DONE IN REMOVE (CHILDREN ARE DISCONNECTED AS WELL)
    for(let i = 0; i < this.ele.length; i++){
      // this.parent().find(typeof this.ele[i]).empty(); 
      this.ele[i].remove(); 
    }
  }

  on (event, callback){
    for(let i = 0; i < this.ele.length; i++){
      this.ele[i].addEventListener(event, callback);
    }
    this.events[event] = callback; 
  }

  off (event){
    const callback = this.events[event]; 
    for (let i = 0; i < this.ele.length; i++) {
      this.ele[i].removeEventListener(event, callback);  
    }
    this.events[event] = null; 
  }
}

module.exports = DOMNodeCollection;
