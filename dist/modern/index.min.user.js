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

"use strict";window.addEventListener("load",()=>{const m=e=>"A"===e.nodeName.toUpperCase(),u=(e,t)=>{const n=document.createElement("a");return n.href=e,n.textContent=t,n.target="_blank",n},p=e=>{const t=document.createElement("span");return t.textContent=e.trim(),t},h=e=>e.href,f=e=>{const t=document.createElement("ul");t.classList.add("dupe-timeline-list");e=e.map(e=>{const t=document.createElement("li");return t.append(e),t});return t.append(...e),t},g=(e,t,n="s")=>""+t+(1===e?"":n),v="dupe-timeline-lists";{var e=document.createElement("style");document.head.append(e);const n=e["sheet"];n?[".dupe-timeline-list { list-style: none; margin-left: 0; }",".dupe-timeline-list:last-child { margin-bottom: 0; }"].forEach(e=>n.insertRule(e)):console.debug(`[${v}] missing stylesheet`)}const t=document.querySelector(".post-timeline");t?t.querySelectorAll("tr").forEach(e=>{var t=e["dataset"],t=t["eventtype"];if("history"===t){t=e["cells"];const[,,o,,,s]=t;t=(null==(e=o.textContent)?void 0:e.trim())||"";if("duplicates list edited"===t){const i=s.querySelector("span");if(i){e=i["childNodes"];const d=[...e];t=d.findIndex(({textContent:e})=>" to "===e);if(-1===t)console.debug(`[${v}] missing from/to separator text`);else{const{added:r,removed:a}=((t,n)=>{var e={added:[],removed:[]};const{added:l,removed:o}=e;return t.forEach(e=>n.includes(e)||o.push(e)),n.forEach(e=>t.includes(e)||l.push(e)),e})(d.slice(0,t).filter(m).map(h),d.slice(t+1).filter(m).map(h)),c={};i.querySelectorAll("a").forEach(({href:e,textContent:t})=>{c[e]=t||e});var e=r.map(e=>u(e,c[e])),t=a.map(e=>u(e,c[e])),n=([...s.children].forEach(e=>e.remove()),e)["length"],l=t["length"];n&&s.append(p(`Added ${n} duplicate `+g(n,"target")),f(e)),l&&s.append(p(`Removed ${l} duplicate `+g(l,"target")),f(t))}}else console.debug(`[${v}] missing duplicate list edit timeline entry container`)}}}):console.debug(`[${v}] missing timeline table`)},{once:!0});