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
// @version         1.1.0
// ==/UserScript==

"use strict";window.addEventListener("load",async()=>{const m=e=>"A"===e.nodeName.toUpperCase(),u=(e,t)=>{const n=document.createElement("a");return n.href=e,n.textContent=t,n.target="_blank",n},p=e=>{const t=document.createElement("span");return t.textContent=e.trim(),t},f=e=>e.href,h=(e,t=!1)=>{const n=document.createElement(t?"ol":"ul");n.classList.add("dupe-timeline-list");t=e.map(e=>{const t=document.createElement("li");return t.append(e),t});return n.append(...t),n},g=(e,t,n="s")=>""+t+(1===e?"":n),v="dupe-timeline-lists";{var e=document.createElement("style");document.head.append(e);const n=e["sheet"];n?["ul.dupe-timeline-list { list-style: none; margin-left: 0; }","ol.dupe-timeline-list { margin-left: 1em; }",".dupe-timeline-list:last-child { margin-bottom: 0; }"].forEach(e=>n.insertRule(e)):console.debug(`[${v}] missing stylesheet`)}const t=document.querySelector(".post-timeline");if(t){e=Store.locateStorage();const l=new Store.default(v,e);e="always-use-lists";const y=await l.load(e,!1);await l.save(e,y),t.querySelectorAll("tr").forEach(e=>{var t=e["dataset"],t=t["eventtype"];if("history"===t){t=e["cells"];const[,,s,,,o]=t;t=(null==(e=s.textContent)?void 0:e.trim())||"";if("duplicates list edited"===t){const i=o.querySelector("span");if(i){e=i["childNodes"];const a=[...e];t=a.findIndex(({textContent:e})=>" to "===e);if(-1===t)console.debug(`[${v}] missing from/to separator text`);else{const{added:r,removed:d}=((t,n)=>{var e={added:[],removed:[]};const{added:l,removed:s}=e;return t.forEach(e=>n.includes(e)||s.push(e)),n.forEach(e=>t.includes(e)||l.push(e)),e})(a.slice(0,t).filter(m).map(f),a.slice(t+1).filter(m).map(f)),c={};i.querySelectorAll("a").forEach(({href:e,textContent:t})=>{c[e]=t||e});var e=r.map(e=>u(e,c[e])),t=d.map(e=>u(e,c[e])),n=([...o.children].forEach(e=>e.remove()),e)["length"],l=t["length"];n&&o.append(p(`Added ${n} duplicate `+g(n,"target")),h(e,y||1<n)),l&&o.append(p(`Removed ${l} duplicate `+g(l,"target")),h(t,y||1<l))}}else console.debug(`[${v}] missing duplicate list edit timeline entry container`)}}})}else console.debug(`[${v}] missing timeline table`)},{once:!0});