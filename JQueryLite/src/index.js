const DOMNodeCollection = require('./dom_node_collection');

// window.wndw = function (arg) {
//   window.$l = arg;
// }

let loaded = false; 

document.addEventListener("DOMContentLoaded", () => {doFunky()})

const doFunc = []; 

function $l (selector){
  if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector])
  } else if (selector instanceof Function) { 
    if(loaded) {
      selector(); 
    } else {
      doFunc.push(selector);
    }
  } else {
    return new DOMNodeCollection(Array.from(document.querySelectorAll(selector)));
  }
}

$l.extend = function (...objs) {
  let base = objs[0];
  for (let i = 1; i < objs.length; i++) {
    let keys = Object.keys(objs[i])
    for (let j = 0; j < keys.length; j++) {
      base[keys[j]] = objs[i][keys[j]]; 
    }
  }

  return base;
}

$l.ajax = function (optObj){
  
}

function doFunky () {
  for(let i = 0; i < doFunc.length; i++ ){
    doFunc[i](); 
  }
  loaded = true; 
}


const objA = { a: "a", b: "a", c: "a" };
const objB = { b: "b", c: "b" };
const objC = { c: "c" };
console.log($l.extend(objA, objB, objC));

window.$l = $l;
// class DOMNode {

// }