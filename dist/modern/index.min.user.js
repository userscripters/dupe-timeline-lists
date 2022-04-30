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

"use strict";window.addEventListener("load",async()=>{const u=e=>"A"===e.nodeName.toUpperCase(),m=(e,t)=>{const n=document.createElement("a");return n.href=e,n.textContent=t,n.target="_blank",n},p=e=>{const t=document.createElement("span");return t.textContent=e.trim(),t},v=e=>e.href,h=(e,t=!1)=>{const n=document.createElement(t?"ol":"ul");n.classList.add("dupe-timeline-list");t=e.map(e=>{const t=document.createElement("li");return t.append(e),t});return n.append(...t),n},f=(e,t,n="s")=>""+t+(1===e?"":n),s=(e,t)=>{const n=e.querySelector("span");if(n){var i=n["childNodes"];const r=[...i];i=r.findIndex(({textContent:e})=>" to "===e);if(-1===i)console.debug(`[${g}] missing from/to separator text`);else{const{added:d,removed:a}=((t,n)=>{var e={added:[],removed:[]};const{added:i,removed:l}=e;return t.forEach(e=>n.includes(e)||l.push(e)),n.forEach(e=>t.includes(e)||i.push(e)),e})(r.slice(0,i).filter(u).map(v),r.slice(i+1).filter(u).map(v)),c={};n.querySelectorAll("a").forEach(({href:e,textContent:t})=>{c[e]=t||e});var i=d.map(e=>m(e,c[e])),l=a.map(e=>m(e,c[e])),o=([...e.children].forEach(e=>e.remove()),i)["length"],s=l["length"];o&&e.append(p(`Added ${o} duplicate `+f(o,"target")),h(i,y||1<o)),s&&e.append(p(`Removed ${s} duplicate `+f(s,"target")),h(l,y||1<s))}}else console.debug(`[${g}] missing duplicate list edit ${t} entry container`)},g="dupe-timeline-lists";{var e=document.createElement("style");document.head.append(e);const i=e["sheet"];i?["ul.dupe-timeline-list { list-style: none; margin-left: 0; }","ol.dupe-timeline-list { margin-left: 1em; }",".dupe-timeline-list:last-child { margin-bottom: 0; }"].forEach(e=>i.insertRule(e)):console.debug(`[${g}] missing stylesheet`)}e=Store.locateStorage();const t=new Store.default(g,e);e="always-use-lists";const y=await t.load(e,!1);if(await t.save(e,y),location.pathname.includes("revisions")){const l=document.querySelector(".js-revisions");return l?void l.querySelectorAll(".js-revision > div").forEach(e=>{var t,[,e]=e.children;const n=(null==(t=null==e?void 0:e.textContent)?void 0:t.trim())||"";n.includes("duplicates list edited")&&s(e,"revisions")}):void console.debug(`[${g}] missing revisions table`)}const n=document.querySelector(".post-timeline");n?n.querySelectorAll("tr").forEach(e=>{var t,n,i,l,o=e["dataset"],o=o["eventtype"];"history"===o&&(o=e["cells"],[t,n,e,i,l,o]=o,"duplicates list edited"===((null==(e=null==e?void 0:e.textContent)?void 0:e.trim())||"")&&s(o,"timeline"))}):console.debug(`[${g}] missing timeline table`)},{once:!0});