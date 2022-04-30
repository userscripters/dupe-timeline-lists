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

"use strict";var __read=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,a=n.call(e),i=[];try{for(;(void 0===t||0<t--)&&!(r=a.next()).done;)i.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(n=a.return)&&n.call(a)}finally{if(o)throw o.error}}return i},__spreadArray=this&&this.__spreadArray||function(e,t,n){if(n||2===arguments.length)for(var r,o=0,a=t.length;o<a;o++)!r&&o in t||((r=r||Array.prototype.slice.call(t,0,o))[o]=t[o]);return e.concat(r||Array.prototype.slice.call(t))};window.addEventListener("load",function(){function u(e){return"A"===e.nodeName.toUpperCase()}function s(e,t){var n=document.createElement("a");return n.href=e,n.textContent=t,n.target="_blank",n}function p(e){var t=document.createElement("span");return t.textContent=e.trim(),t}function m(e){return e.href}function f(e,t){return void 0===t&&(t=!1),(t=document.createElement(t?"ol":"ul")).classList.add("dupe-timeline-list"),e=e.map(function(e){var t=document.createElement("li");return t.append(e),t}),t.append.apply(t,__spreadArray([],__read(e),!1)),t}function h(e,t,n){return void 0===n&&(n="s"),"".concat(t).concat(1===e?"":n)}var t,y="dupe-timeline-lists",e=(e=document.createElement("style"),document.head.append(e),(t=e.sheet)?["ul.dupe-timeline-list { list-style: none; margin-left: 0; }","ol.dupe-timeline-list { margin-left: 1em; }",".dupe-timeline-list:last-child { margin-bottom: 0; }"].forEach(function(e){return t.insertRule(e)}):console.debug("[".concat(y,"] missing stylesheet")),document.querySelector(".post-timeline"));e?e.querySelectorAll("tr").forEach(function(e){var t,n,r,o,a,i,c,l,d;"history"===e.dataset.eventtype&&(e=e.cells,(e=__read(e,6))[0],e[1],c=e[2],e[3],e[4],e=e[5],"duplicates list edited"===((null==(c=c.textContent)?void 0:c.trim())||"")&&((c=e.querySelector("span"))?(l=c.childNodes,-1===(d=(l=__spreadArray([],__read(l),!1)).findIndex(function(e){return" to "===e.textContent}))?console.debug("[".concat(y,"] missing from/to separator text")):(i=l.slice(0,d).filter(u).map(m),l=l.slice(d+1).filter(u).map(m),t=i,n=l,r=(d={added:[],removed:[]}).added,o=d.removed,t.forEach(function(e){return n.includes(e)||o.push(e)}),n.forEach(function(e){return t.includes(e)||r.push(e)}),l=(i=d).added,d=i.removed,a={},c.querySelectorAll("a").forEach(function(e){var t=e.href,e=e.textContent;a[t]=e||t}),i=l.map(function(e){return s(e,a[e])}),c=d.map(function(e){return s(e,a[e])}),__spreadArray([],__read(e.children),!1).forEach(function(e){return e.remove()}),l=i.length,d=c.length,l&&e.append(p("Added ".concat(l," duplicate ").concat(h(l,"target"))),f(i,1<l)),d&&e.append(p("Removed ".concat(d," duplicate ").concat(h(d,"target"))),f(c,1<d)))):console.debug("[".concat(y,"] missing duplicate list edit timeline entry container"))))}):console.debug("[".concat(y,"] missing timeline table"))},{once:!0});