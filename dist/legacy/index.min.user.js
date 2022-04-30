// ==UserScript==
// @author          Oleg Valter <oleg.a.valter@gmail.com>
// @description     Userscript for properly displaying duplicate lists in post timelines
// @grant           none
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
// @run-at          document-start
// @source          git+https://github.com/userscripters/dupe-timeline-lists.git
// @supportURL      https://github.com/userscripters/dupe-timeline-lists/issues
// @version         0.1.0
// ==/UserScript==

"use strict";var __read=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,o=n.call(e),i=[];try{for(;(void 0===t||0<t--)&&!(r=o.next()).done;)i.push(r.value)}catch(e){a={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(a)throw a.error}}return i},__spreadArray=this&&this.__spreadArray||function(e,t,n){if(n||2===arguments.length)for(var r,a=0,o=t.length;a<o;a++)!r&&a in t||((r=r||Array.prototype.slice.call(t,0,a))[a]=t[a]);return e.concat(r||Array.prototype.slice.call(t))};window.addEventListener("load",function(){function u(e){return"A"===e.nodeName.toUpperCase()}function s(e,t){var n=document.createElement("a");return n.href=e,n.textContent=t,n.target="_blank",n}function p(e){var t=document.createElement("span");return t.textContent=e.trim(),t}function f(e){return e.href}function m(e){var t=document.createElement("ul"),e=(t.classList.add("dupe-timeline-list"),e.map(function(e){var t=document.createElement("li");return t.append(e),t}));return t.append.apply(t,__spreadArray([],__read(e),!1)),t}function h(e,t,n){return void 0===n&&(n="s"),"".concat(t).concat(1===e?"":n)}var t,y="dupe-timeline-lists",e=(e=document.createElement("style"),document.head.append(e),(t=e.sheet)?[".dupe-timeline-list { list-style: none; margin-left: 0; }",".dupe-timeline-list:last-child { margin-bottom: 0; }"].forEach(function(e){return t.insertRule(e)}):console.debug("[".concat(y,"] missing stylesheet")),document.querySelector(".post-timeline"));e?e.querySelectorAll("tr").forEach(function(e){var t,n,r,a,o,i,c,l,d;"history"===e.dataset.eventtype&&(e=e.cells,(e=__read(e,6))[0],e[1],c=e[2],e[3],e[4],e=e[5],"duplicates list edited"===((null==(c=c.textContent)?void 0:c.trim())||"")&&((c=e.querySelector("span"))?(l=c.childNodes,-1===(d=(l=__spreadArray([],__read(l),!1)).findIndex(function(e){return" to "===e.textContent}))?console.debug("[".concat(y,"] missing from/to separator text")):(i=l.slice(0,d).filter(u).map(f),l=l.slice(d+1).filter(u).map(f),t=i,n=l,r=(d={added:[],removed:[]}).added,a=d.removed,t.forEach(function(e){return n.includes(e)||a.push(e)}),n.forEach(function(e){return t.includes(e)||r.push(e)}),l=(i=d).added,d=i.removed,o={},c.querySelectorAll("a").forEach(function(e){var t=e.href,e=e.textContent;o[t]=e||t}),i=l.map(function(e){return s(e,o[e])}),c=d.map(function(e){return s(e,o[e])}),__spreadArray([],__read(e.children),!1).forEach(function(e){return e.remove()}),l=i.length,d=c.length,l&&e.append(p("Added ".concat(l," duplicate ").concat(h(l,"target"))),m(i)),d&&e.append(p("Removed ".concat(d," duplicate ").concat(h(d,"target"))),m(c)))):console.debug("[".concat(y,"] missing duplicate list edit timeline entry container"))))}):console.debug("[".concat(y,"] missing timeline table"))},{once:!0});