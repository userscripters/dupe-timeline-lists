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
// @version         1.3.0
// ==/UserScript==

"use strict";var __awaiter=this&&this.__awaiter||function(e,a,c,l){return new(c=c||Promise)(function(n,t){function r(e){try{i(l.next(e))}catch(e){t(e)}}function o(e){try{i(l.throw(e))}catch(e){t(e)}}function i(e){var t;e.done?n(e.value):((t=e.value)instanceof c?t:new c(function(e){e(t)})).then(r,o)}i((l=l.apply(e,a||[])).next())})},__generator=this&&this.__generator||function(r,o){var i,a,c,l={label:0,sent:function(){if(1&c[0])throw c[1];return c[1]},trys:[],ops:[]},e={next:t(0),throw:t(1),return:t(2)};return"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function t(n){return function(e){var t=[n,e];if(i)throw new TypeError("Generator is already executing.");for(;l;)try{if(i=1,a&&(c=2&t[0]?a.return:t[0]?a.throw||((c=a.return)&&c.call(a),0):a.next)&&!(c=c.call(a,t[1])).done)return c;switch(a=0,(t=c?[2&t[0],c.value]:t)[0]){case 0:case 1:c=t;break;case 4:return l.label++,{value:t[1],done:!1};case 5:l.label++,a=t[1],t=[0];continue;case 7:t=l.ops.pop(),l.trys.pop();continue;default:if(!(c=0<(c=l.trys).length&&c[c.length-1])&&(6===t[0]||2===t[0])){l=0;continue}if(3===t[0]&&(!c||t[1]>c[0]&&t[1]<c[3])){l.label=t[1];break}if(6===t[0]&&l.label<c[1]){l.label=c[1],c=t;break}if(c&&l.label<c[2]){l.label=c[2],l.ops.push(t);break}c[2]&&l.ops.pop(),l.trys.pop();continue}t=o.call(r,l)}catch(e){t=[6,e],a=0}finally{i=c=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}}},__read=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,i=n.call(e),a=[];try{for(;(void 0===t||0<t--)&&!(r=i.next()).done;)a.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return a},__spreadArray=this&&this.__spreadArray||function(e,t,n){if(n||2===arguments.length)for(var r,o=0,i=t.length;o<i;o++)!r&&o in t||((r=r||Array.prototype.slice.call(t,0,o))[o]=t[o]);return e.concat(r||Array.prototype.slice.call(t))};window.addEventListener("load",function(){return __awaiter(void 0,void 0,void 0,function(){var m,h,_,i,y,a,b,g,w,x,r,E,n,S,t,o,A,c,l,u;return __generator(this,function(e){switch(e.label){case 0:return m=function(e){return __spreadArray([],__read(e.children),!1).forEach(function(e){return e.remove()})},h=function(e){return"A"===e.nodeName.toUpperCase()},_=function(e,t){var n=document.createElement("a");return n.href=e,n.textContent=t,n.target="_blank",n},i=function(e){var t=document.createElement("span");return t.textContent=e.trim(),t},y=function(e){return e.href},a=function(e,t){void 0===t&&(t=!1);t=document.createElement(t?"ol":"ul"),t.classList.add("dupe-timeline-list"),e=e.map(function(e){var t=document.createElement("li");return t.append(e),t});return t.append.apply(t,__spreadArray([],__read(e),!1)),t},b=function(t,n){var e={added:[],removed:[]},r=e.added,o=e.removed;return t.forEach(function(e){return n.includes(e)||o.push(e)}),n.forEach(function(e){return t.includes(e)||r.push(e)}),e},g=function(e,t,n){return void 0===n&&(n="s"),"".concat(t).concat(1===e?"":n)},w=function(){var e=location.pathname;return __read(/posts\/(\d+)\/(?:revisions|timeline)/.exec(e)||[],2)[1]},x=function(e,t,n){var r=n.before,o=n.after,n=n.ordered,t=(e.append(i(t)),__read(n,2)),n=t[0],t=t[1];r&&e.append(a(r,n)),o&&e.append(a(o,t))},r=function(f,p,v){return __awaiter(void 0,void 0,void 0,function(){var r,t,o,n,i,a,c,l,u,s,d;return __generator(this,function(e){switch(e.label){case 0:return(a=f.querySelector("span"))?(l=a.childNodes,l=__spreadArray([],__read(l),!1),-1===(c=l.findIndex(function(e){return e.textContent===S}))?(console.debug("[".concat(E,"] missing from/to separator text")),[2]):(r=l.slice(0,c).filter(h).map(y),t=l.slice(c+1).filter(h).map(y),l=b(r,t),c=l.added,l=l.removed,o={},a.querySelectorAll("a").forEach(function(e){var t=e.href,e=e.textContent;o[t]=e||t}),a=c.map(function(e){return _(e,o[e])}),c=l.map(function(e){return _(e,o[e])}),m(f),n=a.length,i=c.length,n&&x(f,"Added ".concat(n," duplicate ").concat(g(n,"target")),{before:a,ordered:[A||1<n]}),i&&x(f,"Removed ".concat(i," duplicate ").concat(g(i,"target")),{before:c,ordered:[A||1<i]}),n||i||!v?[3,3]:(l=w())?[4,fetch("/revisions/".concat(l,"/").concat(v))]:[2])):(console.debug("[".concat(E,"] missing duplicate list edit ").concat(p," entry container")),[2]);case 1:return(a=e.sent()).ok?[4,a.text()]:[2];case 2:return c=e.sent(),l=$(c).find("[title='revision ".concat(v,"']")).next().contents().get(0),d=(null==(d=null==l?void 0:l.textContent)?void 0:d.trim())||"",d=__read(d.split(/\s+-\s+/),2),s=d[0],d=d[1],s=s.replace(/^from\s+/,"").split(","),d=d.replace(/^to\s+/,"").split(","),u=function(e){var t=new RegExp("\\/".concat(e,"\\/")),n=r.find(function(e){return t.test(e)});return n?_(n,o[n]):e},s=s.map(u),d=d.map(u),x(f,"Reodered duplicate targets",{before:s,after:d,ordered:[!0,!0]}),[2];case 3:return n||i||(u=r.map(function(e){return _(e,o[e])}),s=t.map(function(e){return _(e,o[e])}),x(f,"Reodered duplicate targets",{before:u,after:s,ordered:[!0,!0]})),[2]}})})},E="dupe-timeline-lists",n="duplicates list edited",S=" to ",function(){var e=document.createElement("style"),t=(document.head.append(e),e.sheet);t?["ul.dupe-timeline-list { list-style: none; margin-left: 0; }","ol.dupe-timeline-list { margin-left: 1em; }",".dupe-timeline-list:last-child { margin-bottom: 0; }"].forEach(function(e){return t.insertRule(e)}):console.debug("[".concat(E,"] missing stylesheet"))}(),t=Store.locateStorage(),t=new Store.default(E,t),o="always-use-lists",[4,t.load(o,!1)];case 1:return A=e.sent(),[4,t.save(o,A)];case 2:return(e.sent(),location.pathname.includes("revisions"))?((c=document.querySelector(".js-revisions"))?c.querySelectorAll(".js-revision > div").forEach(function(e){var e=__read(e.children,3),t=e[0],n=e[1];e[2];!((null==(e=null==n?void 0:n.textContent)?void 0:e.trim())||"").includes("duplicates list edited")||(t=(null==(e=null==t?void 0:t.textContent)?void 0:e.trim())||"")&&!Number.isNaN(+t)&&r(n,"revisions",t)}):console.debug("[".concat(E,"] missing revisions table")),[2]):((l=document.querySelector(".post-timeline"))?(u=new Set(["answered","asked","duplicates list edited","edited","rollback"]),l.querySelectorAll("tr").forEach(function(e){var t;"history"===e.dataset.eventtype&&(e=e.cells,(e=__read(e,6))[0],e[1],t=e[2],e[3],e[4],e=e[5],((null==(t=null==t?void 0:t.textContent)?void 0:t.trim())||"")===n&&(t=__spreadArray([],__read(l.rows),!1).reduce(function(e,t){var t=__read(t.cells,3),n=(t[0],t[1]),t=t[2];if("history"!==((null==(n=null==n?void 0:n.textContent)?void 0:n.trim())||""))return e;t=(null==(n=null==t?void 0:t.textContent)?void 0:n.trim())||"";return u.has(t)?e+1:e},0),r(e,"timeline",t)))})):console.debug("[".concat(E,"] missing timeline table")),[2])}})})},{once:!0});