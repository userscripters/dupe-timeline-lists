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

"use strict";window.addEventListener("load",async()=>{const E=e=>"A"===e.nodeName.toUpperCase(),w=(e,t)=>{const n=document.createElement("a");return n.href=e,n.textContent=t,n.target="_blank",n},b=e=>{const t=document.createElement("span");return t.textContent=e.trim(),t},C=e=>e.href,S=(e,t=!1)=>{const n=document.createElement(t?"ol":"ul");n.classList.add("dupe-timeline-list");t=e.map(e=>{const t=document.createElement("li");return t.append(e),t});return n.append(...t),n},q=(e,t,n="s")=>""+t+(1===e?"":n),o=async(e,t,n)=>{const i=e.querySelector("span");if(i){var l=i["childNodes"];const a=[...l];l=a.findIndex(({textContent:e})=>" to "===e);if(-1===l)console.debug(`[${A}] missing from/to separator text`);else{const d=a.slice(0,l).filter(E).map(C),c=a.slice(l+1).filter(E).map(C),{added:u,removed:m}=((t,n)=>{var e={added:[],removed:[]};const{added:i,removed:l}=e;return t.forEach(e=>n.includes(e)||l.push(e)),n.forEach(e=>t.includes(e)||i.push(e)),e})(d,c),p={};i.querySelectorAll("a").forEach(({href:e,textContent:t})=>{p[e]=t||e});var l=u.map(e=>w(e,p[e])),s=m.map(e=>w(e,p[e])),o=([...e.children].forEach(e=>e.remove()),l)["length"],r=s["length"];if(o&&e.append(b(`Added ${o} duplicate `+q(o,"target")),S(l,N||1<o)),r&&e.append(b(`Removed ${r} duplicate `+q(r,"target")),S(s,N||1<r)),o||r||!n)o||r||(l=d.map(e=>w(e,p[e])),s=c.map(e=>w(e,p[e])),e.append(b("Reodered duplicate targets"),S(l,!0),S(s,!0)));else{o=(()=>{var e=location["pathname"],[,e]=/posts\/(\d+)\/(?:revisions|timeline)/.exec(e)||[];return e})();if(!o)return;const v=await fetch(`/revisions/${o}/`+n);if(!v.ok)return;r=await v.text(),l=$(r).find(`[title='revision ${n}']`).next().contents().get(0);const f=(null==(s=null==l?void 0:l.textContent)?void 0:s.trim())||"",[h,g]=f.split(/\s+-\s+/),x=h.replace(/^from\s+/,"").split(","),y=g.replace(/^to\s+/,"").split(",");o=e=>{const t=new RegExp(`\\/${e}\\/`);var n=d.find(e=>t.test(e));return n?w(n,p[n]):e},r=x.map(o),n=y.map(o);void e.append(b("Reodered duplicate targets"),S(r,!0),S(n,!0))}}}else console.debug(`[${A}] missing duplicate list edit ${t} entry container`)},A="dupe-timeline-lists";{var e=document.createElement("style");document.head.append(e);const n=e["sheet"];n?["ul.dupe-timeline-list { list-style: none; margin-left: 0; }","ol.dupe-timeline-list { margin-left: 1em; }",".dupe-timeline-list:last-child { margin-bottom: 0; }"].forEach(e=>n.insertRule(e)):console.debug(`[${A}] missing stylesheet`)}e=Store.locateStorage();const t=new Store.default(A,e);e="always-use-lists";const N=await t.load(e,!1);if(await t.save(e,N),location.pathname.includes("revisions")){const i=document.querySelector(".js-revisions");return i?void i.querySelectorAll(".js-revision > div").forEach(e=>{var t,[e,n]=e.children;const i=(null==(t=null==n?void 0:n.textContent)?void 0:t.trim())||"";!i.includes("duplicates list edited")||(e=(null==(t=null==e?void 0:e.textContent)?void 0:t.trim())||"")&&!Number.isNaN(+e)&&o(n,"revisions",e)}):void console.debug(`[${A}] missing revisions table`)}const r=document.querySelector(".post-timeline");if(r){const a=new Set(["answered","asked","duplicates list edited","edited","rollback"]);r.querySelectorAll("tr").forEach(e=>{var t,n,i,l,s=e["dataset"],s=s["eventtype"];"history"===s&&(s=e["cells"],[t,n,e,i,l,s]=s,"duplicates list edited"===((null==(e=null==e?void 0:e.textContent)?void 0:e.trim())||"")&&(e=[...r.rows].reduce((e,t)=>{var[,t,n]=t.cells;if("history"!==((null==(t=null==t?void 0:t.textContent)?void 0:t.trim())||""))return e;n=(null==(t=null==n?void 0:n.textContent)?void 0:t.trim())||"";return a.has(n)?e+1:e},0),o(s,"timeline",e)))})}else console.debug(`[${A}] missing timeline table`)},{once:!0});