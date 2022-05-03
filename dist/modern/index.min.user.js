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

"use strict";window.addEventListener("load",async()=>{const y=e=>"A"===e.nodeName.toUpperCase(),E=(e,t)=>{const n=document.createElement("a");return n.href=e,n.textContent=t,n.target="_blank",n},r=e=>{const t=document.createElement("span");return t.textContent=e.trim(),t},w=e=>e.href,l=(e,t=!1)=>{const n=document.createElement(t?"ol":"ul");n.classList.add("dupe-timeline-list");t=e.map(e=>{const t=document.createElement("li");return t.append(e),t});return n.append(...t),n},C=(e,t,n="s")=>""+t+(1===e?"":n),S=(e,t,{before:n,after:i,ordered:o})=>{e.append(r(t));var[t,o]=o;n&&e.append(l(n,t)),i&&e.append(l(i,o))},s=async(e,t,n)=>{const i=e.querySelector("span");if(i){var o=i["childNodes"];const d=[...o];o=d.findIndex(({textContent:e})=>" to "===e);if(-1===o)console.debug(`[${q}] missing from/to separator text`);else{const a=d.slice(0,o).filter(y).map(w),c=d.slice(o+1).filter(y).map(w),{added:u,removed:m}=((t,n)=>{var e={added:[],removed:[]};const{added:i,removed:o}=e;return t.forEach(e=>n.includes(e)||o.push(e)),n.forEach(e=>t.includes(e)||i.push(e)),e})(a,c),p={};i.querySelectorAll("a").forEach(({href:e,textContent:t})=>{p[e]=t||e});var o=u.map(e=>E(e,p[e])),r=m.map(e=>E(e,p[e])),l=([...e.children].forEach(e=>e.remove()),o)["length"],s=r["length"];if(l&&S(e,`Added ${l} duplicate `+C(l,"target"),{before:o,ordered:[A||1<l]}),s&&S(e,`Removed ${s} duplicate `+C(s,"target"),{before:r,ordered:[A||1<s]}),l||s||!n)l||s||(o=a.map(e=>E(e,p[e])),r=c.map(e=>E(e,p[e])),S(e,"Reodered duplicate targets",{before:o,after:r,ordered:[!0,!0]}));else{l=(()=>{var e=location["pathname"],[,e]=/posts\/(\d+)\/(?:revisions|timeline)/.exec(e)||[];return e})();if(!l)return;const v=await fetch(`/revisions/${l}/`+n);if(!v.ok)return;s=await v.text(),o=$(s).find(`[title='revision ${n}']`).next().contents().get(0);const f=(null==(r=null==o?void 0:o.textContent)?void 0:r.trim())||"",[h,g]=f.split(/\s+-\s+/),b=h.replace(/^from\s+/,"").split(","),x=g.replace(/^to\s+/,"").split(",");l=e=>{const t=new RegExp(`\\/${e}\\/`);var n=a.find(e=>t.test(e));return n?E(n,p[n]):e},s=b.map(l),n=x.map(l);void S(e,"Reodered duplicate targets",{before:s,after:n,ordered:[!0,!0]})}}}else console.debug(`[${q}] missing duplicate list edit ${t} entry container`)},q="dupe-timeline-lists";{var e=document.createElement("style");document.head.append(e);const n=e["sheet"];n?["ul.dupe-timeline-list { list-style: none; margin-left: 0; }","ol.dupe-timeline-list { margin-left: 1em; }",".dupe-timeline-list:last-child { margin-bottom: 0; }"].forEach(e=>n.insertRule(e)):console.debug(`[${q}] missing stylesheet`)}e=Store.locateStorage();const t=new Store.default(q,e);e="always-use-lists";const A=await t.load(e,!1);if(await t.save(e,A),location.pathname.includes("revisions")){const i=document.querySelector(".js-revisions");return i?void i.querySelectorAll(".js-revision > div").forEach(e=>{var t,[e,n]=e.children;const i=(null==(t=null==n?void 0:n.textContent)?void 0:t.trim())||"";!i.includes("duplicates list edited")||(e=(null==(t=null==e?void 0:e.textContent)?void 0:t.trim())||"")&&!Number.isNaN(+e)&&s(n,"revisions",e)}):void console.debug(`[${q}] missing revisions table`)}const d=document.querySelector(".post-timeline");if(d){const a=new Set(["answered","asked","duplicates list edited","edited","rollback"]);d.querySelectorAll("tr").forEach(e=>{var t,n,i,o,r=e["dataset"],r=r["eventtype"];"history"===r&&(r=e["cells"],[t,n,e,i,o,r]=r,"duplicates list edited"===((null==(e=null==e?void 0:e.textContent)?void 0:e.trim())||"")&&(e=[...d.rows].reduce((e,t)=>{var[,t,n]=t.cells;if("history"!==((null==(t=null==t?void 0:t.textContent)?void 0:t.trim())||""))return e;n=(null==(t=null==n?void 0:n.textContent)?void 0:t.trim())||"";return a.has(n)?e+1:e},0),s(r,"timeline",e)))})}else console.debug(`[${q}] missing timeline table`)},{once:!0});