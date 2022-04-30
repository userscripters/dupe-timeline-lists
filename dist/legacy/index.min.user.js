// ==UserScript==
// @author          Oleg Valter <oleg.a.valter@gmail.com>
// @description     Userscript for properly displaying duplicate lists in post timelines
// @grant           GM_deleteValue
// @grant           GM_getValue
// @grant           GM_setValue
// @homepage        https://github.com/userscripters/dupe-timeline-lists#readme
// @match           https://*.stackexchange.com/posts/*/timeline*
// @match           https://askubuntu.com/posts/*/timeline*
// @match           https://es.meta.stackoverflow.com/posts/*/timeline*
// @match           https://es.stackoverflow.com/posts/*/timeline*
// @match           https://ja.meta.stackoverflow.com/posts/*/timeline*
// @match           https://ja.stackoverflow.com/posts/*/timeline*
// @match           https://mathoverflow.net/posts/*/timeline*
// @match           https://meta.askubuntu.com/posts/*/timeline*
// @match           https://meta.mathoverflow.net/posts/*/timeline*
// @match           https://meta.serverfault.com/posts/*/timeline*
// @match           https://meta.stackoverflow.com/posts/*/timeline*
// @match           https://meta.superuser.com/posts/*/timeline*
// @match           https://pt.meta.stackoverflow.com/posts/*/timeline*
// @match           https://pt.stackoverflow.com/posts/*/timeline*
// @match           https://ru.meta.stackoverflow.com/posts/*/timeline*
// @match           https://ru.stackoverflow.com/posts/*/timeline*
// @match           https://serverfault.com/posts/*/timeline*
// @match           https://stackapps.com/posts/*/timeline*
// @match           https://stackoverflow.com/posts/*/timeline*
// @match           https://superuser.com/posts/*/timeline*
// @name            Dupe Timeline Lists
// @namespace       userscripters
// @require         https://github.com/userscripters/storage/raw/master/dist/browser.js
// @run-at          document-start
// @source          git+https://github.com/userscripters/dupe-timeline-lists.git
// @supportURL      https://github.com/userscripters/dupe-timeline-lists/issues
// @version         1.0.0
// ==/UserScript==

"use strict";var __awaiter=this&&this.__awaiter||function(e,i,c,l){return new(c=c||Promise)(function(n,t){function r(e){try{o(l.next(e))}catch(e){t(e)}}function a(e){try{o(l.throw(e))}catch(e){t(e)}}function o(e){var t;e.done?n(e.value):((t=e.value)instanceof c?t:new c(function(e){e(t)})).then(r,a)}o((l=l.apply(e,i||[])).next())})},__generator=this&&this.__generator||function(r,a){var o,i,c,l={label:0,sent:function(){if(1&c[0])throw c[1];return c[1]},trys:[],ops:[]},e={next:t(0),throw:t(1),return:t(2)};return"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function t(n){return function(e){var t=[n,e];if(o)throw new TypeError("Generator is already executing.");for(;l;)try{if(o=1,i&&(c=2&t[0]?i.return:t[0]?i.throw||((c=i.return)&&c.call(i),0):i.next)&&!(c=c.call(i,t[1])).done)return c;switch(i=0,(t=c?[2&t[0],c.value]:t)[0]){case 0:case 1:c=t;break;case 4:return l.label++,{value:t[1],done:!1};case 5:l.label++,i=t[1],t=[0];continue;case 7:t=l.ops.pop(),l.trys.pop();continue;default:if(!(c=0<(c=l.trys).length&&c[c.length-1])&&(6===t[0]||2===t[0])){l=0;continue}if(3===t[0]&&(!c||t[1]>c[0]&&t[1]<c[3])){l.label=t[1];break}if(6===t[0]&&l.label<c[1]){l.label=c[1],c=t;break}if(c&&l.label<c[2]){l.label=c[2],l.ops.push(t);break}c[2]&&l.ops.pop(),l.trys.pop();continue}t=a.call(r,l)}catch(e){t=[6,e],i=0}finally{o=c=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}}},__read=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,o=n.call(e),i=[];try{for(;(void 0===t||0<t--)&&!(r=o.next()).done;)i.push(r.value)}catch(e){a={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(a)throw a.error}}return i},__spreadArray=this&&this.__spreadArray||function(e,t,n){if(n||2===arguments.length)for(var r,a=0,o=t.length;a<o;a++)!r&&a in t||((r=r||Array.prototype.slice.call(t,0,a))[a]=t[a]);return e.concat(r||Array.prototype.slice.call(t))};window.addEventListener("load",function(){return __awaiter(void 0,void 0,void 0,function(){var i,c,l,u,s,d,f,p,h,m,y,t,n,r,v;return __generator(this,function(e){switch(e.label){case 0:return(i=function(e){return __spreadArray([],__read(e.children),!1).forEach(function(e){return e.remove()})},c=function(e){return"A"===e.nodeName.toUpperCase()},l=function(e,t){var n=document.createElement("a");return n.href=e,n.textContent=t,n.target="_blank",n},u=function(e){var t=document.createElement("span");return t.textContent=e.trim(),t},s=function(e){return e.href},d=function(e,t){void 0===t&&(t=!1);t=document.createElement(t?"ol":"ul"),t.classList.add("dupe-timeline-list"),e=e.map(function(e){var t=document.createElement("li");return t.append(e),t});return t.append.apply(t,__spreadArray([],__read(e),!1)),t},f=function(t,n){var e={added:[],removed:[]},r=e.added,a=e.removed;return t.forEach(function(e){return n.includes(e)||a.push(e)}),n.forEach(function(e){return t.includes(e)||r.push(e)}),e},p=function(e,t,n){return void 0===n&&(n="s"),"".concat(t).concat(1===e?"":n)},h="dupe-timeline-lists",m="duplicates list edited",y=" to ",function(){var e=document.createElement("style"),t=(document.head.append(e),e.sheet);t?["ul.dupe-timeline-list { list-style: none; margin-left: 0; }","ol.dupe-timeline-list { margin-left: 1em; }",".dupe-timeline-list:last-child { margin-bottom: 0; }"].forEach(function(e){return t.insertRule(e)}):console.debug("[".concat(h,"] missing stylesheet"))}(),t=document.querySelector(".post-timeline"))?(n=Store.locateStorage(),n=new Store.default(h,n),r="always-use-lists",[4,n.load(r,!1)]):(console.debug("[".concat(h,"] missing timeline table")),[2]);case 1:return v=e.sent(),[4,n.save(r,v)];case 2:return e.sent(),t.querySelectorAll("tr").forEach(function(e){var n,t,r,a,o;"history"===e.dataset.eventtype&&(e=e.cells,(e=__read(e,6))[0],e[1],r=e[2],e[3],e[4],e=e[5],((null==(r=r.textContent)?void 0:r.trim())||"")===m&&((r=e.querySelector("span"))?(o=r.childNodes,-1===(t=(o=__spreadArray([],__read(o),!1)).findIndex(function(e){return e.textContent===y}))?console.debug("[".concat(h,"] missing from/to separator text")):(a=o.slice(0,t).filter(c).map(s),o=o.slice(t+1).filter(c).map(s),a=(t=f(a,o)).added,o=t.removed,n={},r.querySelectorAll("a").forEach(function(e){var t=e.href,e=e.textContent;n[t]=e||t}),t=a.map(function(e){return l(e,n[e])}),r=o.map(function(e){return l(e,n[e])}),i(e),a=t.length,o=r.length,a&&e.append(u("Added ".concat(a," duplicate ").concat(p(a,"target"))),d(t,v||1<a)),o&&e.append(u("Removed ".concat(o," duplicate ").concat(p(o,"target"))),d(r,v||1<o)))):console.debug("[".concat(h,"] missing duplicate list edit timeline entry container"))))}),[2]}})})},{once:!0});