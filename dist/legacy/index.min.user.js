// ==UserScript==
// @author          Oleg Valter <oleg.a.valter@gmail.com>
// @description     Userscript for properly displaying duplicate lists in post timelines
// @grant           GM_deleteValue
// @grant           GM_getValue
// @grant           GM_setValue
// @homepage        https://github.com/userscripters/dupe-timeline-lists#readme
// @match           https://*.stackexchange.com/posts/*/revisions*
// @match           https://*.stackexchange.com/posts/*/timeline*
// @match           https://askubuntu.com/posts/*/revisions*
// @match           https://askubuntu.com/posts/*/timeline*
// @match           https://es.meta.stackoverflow.com/posts/*/revisions*
// @match           https://es.meta.stackoverflow.com/posts/*/timeline*
// @match           https://es.stackoverflow.com/posts/*/revisions*
// @match           https://es.stackoverflow.com/posts/*/timeline*
// @match           https://ja.meta.stackoverflow.com/posts/*/revisions*
// @match           https://ja.meta.stackoverflow.com/posts/*/timeline*
// @match           https://ja.stackoverflow.com/posts/*/revisions*
// @match           https://ja.stackoverflow.com/posts/*/timeline*
// @match           https://mathoverflow.net/posts/*/revisions*
// @match           https://mathoverflow.net/posts/*/timeline*
// @match           https://meta.askubuntu.com/posts/*/revisions*
// @match           https://meta.askubuntu.com/posts/*/timeline*
// @match           https://meta.mathoverflow.net/posts/*/revisions*
// @match           https://meta.mathoverflow.net/posts/*/timeline*
// @match           https://meta.serverfault.com/posts/*/revisions*
// @match           https://meta.serverfault.com/posts/*/timeline*
// @match           https://meta.stackoverflow.com/posts/*/revisions*
// @match           https://meta.stackoverflow.com/posts/*/timeline*
// @match           https://meta.superuser.com/posts/*/revisions*
// @match           https://meta.superuser.com/posts/*/timeline*
// @match           https://pt.meta.stackoverflow.com/posts/*/revisions*
// @match           https://pt.meta.stackoverflow.com/posts/*/timeline*
// @match           https://pt.stackoverflow.com/posts/*/revisions*
// @match           https://pt.stackoverflow.com/posts/*/timeline*
// @match           https://ru.meta.stackoverflow.com/posts/*/revisions*
// @match           https://ru.meta.stackoverflow.com/posts/*/timeline*
// @match           https://ru.stackoverflow.com/posts/*/revisions*
// @match           https://ru.stackoverflow.com/posts/*/timeline*
// @match           https://serverfault.com/posts/*/revisions*
// @match           https://serverfault.com/posts/*/timeline*
// @match           https://stackapps.com/posts/*/revisions*
// @match           https://stackapps.com/posts/*/timeline*
// @match           https://stackoverflow.com/posts/*/revisions*
// @match           https://stackoverflow.com/posts/*/timeline*
// @match           https://superuser.com/posts/*/revisions*
// @match           https://superuser.com/posts/*/timeline*
// @name            Dupe Timeline Lists
// @namespace       userscripters
// @require         https://github.com/userscripters/storage/raw/master/dist/browser.js
// @run-at          document-start
// @source          git+https://github.com/userscripters/dupe-timeline-lists.git
// @supportURL      https://github.com/userscripters/dupe-timeline-lists/issues
// @version         1.2.0
// ==/UserScript==

"use strict";var __awaiter=this&&this.__awaiter||function(e,a,c,l){return new(c=c||Promise)(function(n,t){function r(e){try{i(l.next(e))}catch(e){t(e)}}function o(e){try{i(l.throw(e))}catch(e){t(e)}}function i(e){var t;e.done?n(e.value):((t=e.value)instanceof c?t:new c(function(e){e(t)})).then(r,o)}i((l=l.apply(e,a||[])).next())})},__generator=this&&this.__generator||function(r,o){var i,a,c,l={label:0,sent:function(){if(1&c[0])throw c[1];return c[1]},trys:[],ops:[]},e={next:t(0),throw:t(1),return:t(2)};return"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function t(n){return function(e){var t=[n,e];if(i)throw new TypeError("Generator is already executing.");for(;l;)try{if(i=1,a&&(c=2&t[0]?a.return:t[0]?a.throw||((c=a.return)&&c.call(a),0):a.next)&&!(c=c.call(a,t[1])).done)return c;switch(a=0,(t=c?[2&t[0],c.value]:t)[0]){case 0:case 1:c=t;break;case 4:return l.label++,{value:t[1],done:!1};case 5:l.label++,a=t[1],t=[0];continue;case 7:t=l.ops.pop(),l.trys.pop();continue;default:if(!(c=0<(c=l.trys).length&&c[c.length-1])&&(6===t[0]||2===t[0])){l=0;continue}if(3===t[0]&&(!c||t[1]>c[0]&&t[1]<c[3])){l.label=t[1];break}if(6===t[0]&&l.label<c[1]){l.label=c[1],c=t;break}if(c&&l.label<c[2]){l.label=c[2],l.ops.push(t);break}c[2]&&l.ops.pop(),l.trys.pop();continue}t=o.call(r,l)}catch(e){t=[6,e],a=0}finally{i=c=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}}},__read=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,i=n.call(e),a=[];try{for(;(void 0===t||0<t--)&&!(r=i.next()).done;)a.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return a},__spreadArray=this&&this.__spreadArray||function(e,t,n){if(n||2===arguments.length)for(var r,o=0,i=t.length;o<i;o++)!r&&o in t||((r=r||Array.prototype.slice.call(t,0,o))[o]=t[o]);return e.concat(r||Array.prototype.slice.call(t))};window.addEventListener("load",function(){return __awaiter(void 0,void 0,void 0,function(){var c,l,u,s,d,f,p,h,n,m,r,v,t,o,y,i;return __generator(this,function(e){switch(e.label){case 0:return c=function(e){return __spreadArray([],__read(e.children),!1).forEach(function(e){return e.remove()})},l=function(e){return"A"===e.nodeName.toUpperCase()},u=function(e,t){var n=document.createElement("a");return n.href=e,n.textContent=t,n.target="_blank",n},s=function(e){var t=document.createElement("span");return t.textContent=e.trim(),t},d=function(e){return e.href},f=function(e,t){void 0===t&&(t=!1);t=document.createElement(t?"ol":"ul"),t.classList.add("dupe-timeline-list"),e=e.map(function(e){var t=document.createElement("li");return t.append(e),t});return t.append.apply(t,__spreadArray([],__read(e),!1)),t},p=function(t,n){var e={added:[],removed:[]},r=e.added,o=e.removed;return t.forEach(function(e){return n.includes(e)||o.push(e)}),n.forEach(function(e){return t.includes(e)||r.push(e)}),e},h=function(e,t,n){return void 0===n&&(n="s"),"".concat(t).concat(1===e?"":n)},n=function(e,t){var n,r,o,i,a=e.querySelector("span");a?(i=a.childNodes,-1===(r=(i=__spreadArray([],__read(i),!1)).findIndex(function(e){return e.textContent===v}))?console.debug("[".concat(m,"] missing from/to separator text")):(o=i.slice(0,r).filter(l).map(d),i=i.slice(r+1).filter(l).map(d),o=(r=p(o,i)).added,i=r.removed,n={},a.querySelectorAll("a").forEach(function(e){var t=e.href,e=e.textContent;n[t]=e||t}),r=o.map(function(e){return u(e,n[e])}),a=i.map(function(e){return u(e,n[e])}),c(e),o=r.length,i=a.length,o&&e.append(s("Added ".concat(o," duplicate ").concat(h(o,"target"))),f(r,y||1<o)),i&&e.append(s("Removed ".concat(i," duplicate ").concat(h(i,"target"))),f(a,y||1<i)))):console.debug("[".concat(m,"] missing duplicate list edit ").concat(t," entry container"))},m="dupe-timeline-lists",r="duplicates list edited",v=" to ",function(){var e=document.createElement("style"),t=(document.head.append(e),e.sheet);t?["ul.dupe-timeline-list { list-style: none; margin-left: 0; }","ol.dupe-timeline-list { margin-left: 1em; }",".dupe-timeline-list:last-child { margin-bottom: 0; }"].forEach(function(e){return t.insertRule(e)}):console.debug("[".concat(m,"] missing stylesheet"))}(),t=Store.locateStorage(),t=new Store.default(m,t),o="always-use-lists",[4,t.load(o,!1)];case 1:return y=e.sent(),[4,t.save(o,y)];case 2:return(e.sent(),location.pathname.includes("revisions"))?((i=document.querySelector(".js-revisions"))?i.querySelectorAll(".js-revision > div").forEach(function(e){var e=__read(e.children,3),t=(e[0],e[1]);e[2];((null==(e=null==t?void 0:t.textContent)?void 0:e.trim())||"").includes("duplicates list edited")&&n(t,"revisions")}):console.debug("[".concat(m,"] missing revisions table")),[2]):((i=document.querySelector(".post-timeline"))?i.querySelectorAll("tr").forEach(function(e){var t;"history"===e.dataset.eventtype&&(e=e.cells,(e=__read(e,6))[0],e[1],t=e[2],e[3],e[4],e=e[5],((null==(t=null==t?void 0:t.textContent)?void 0:t.trim())||"")===r&&n(e,"timeline"))}):console.debug("[".concat(m,"] missing timeline table")),[2])}})})},{once:!0});