parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"clu1":[function(require,module,exports) {

},{}],"VyiV":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.refs=void 0;const e={form:document.querySelector(".form"),btn:document.querySelector("button"),container:document.querySelector(".container"),list:document.querySelector(".toDoList")};exports.refs=e;
},{}],"Focm":[function(require,module,exports) {
"use strict";require("./sass/main.scss");var e=require("./js/refs");function t(e){e.preventDefault()}function n(t){const n=e.refs.form.input.value;n&&(s(r(n)),e.refs.form.reset(),e.refs.list.addEventListener("click",o))}function o(e){"DIV"===e.target.nodeName&&e.target.parentElement.remove()}function s(t){e.refs.list.insertAdjacentHTML("beforeend",t)}function r(e){return`<li class="boxToDo">\n    <input type="checkbox" id="todo" name="todo" value="todo" />\n    <label for="todo" data-content="${e}">${e}</label>\n    <div class="close"></div>\n  </li> `}e.refs.form.addEventListener("submit",t),e.refs.btn.addEventListener("click",n),fetch("https://62927bdf9d159855f08b4a6f.mockapi.io/todo").then(e=>(console.log(e),e.json())).catch(e=>console.log(e));
},{"./sass/main.scss":"clu1","./js/refs":"VyiV"}]},{},["Focm"], null)
//# sourceMappingURL=/todo-list/src.0525c79e.js.map