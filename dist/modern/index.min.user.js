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
// @version         1.4.0
// ==/UserScript==

"use strict";window.addEventListener("load",async()=>{const k=e=>"A"===e.nodeName.toUpperCase(),q=(e,t,...i)=>{const n=document.createElement("a");return n.href=e,n.textContent=t,n.target="_blank",n.classList.add(...i),n},A=e=>{const t=document.createElement("span");return t.textContent=e.trim(),t},N=e=>e.href,R=(e,t=!1)=>{const i=document.createElement(t?"ol":"ul");i.classList.add("dupe-timeline-list");t=e.map(e=>{const t=document.createElement("li");return t.append(e),t});return i.append(...t),i},L=(e,t,i="s")=>""+t+(1===e?"":i),j=(e,t,{before:i=[],after:n=[],titles:r})=>{e.append(A(t));t=i.flatMap((e,t)=>{t=n[t];return e===t?q(e,r[e]):[q(e,r[e],"diff-removed"),q(t,r[t],"diff-added")]});e.append(R(t))},I=(e,t,{before:i,after:n,ordered:r,titles:d})=>{e.append(A(t));var[t,r]=r;i&&(i=i.map(e=>q(e,d[e])),e.append(R(i,t))),n&&(i=n.map(e=>q(e,d[e])),e.append(R(i,r)))},l=async(e,t,i,n=!1)=>{const r=e.querySelector("span");if(r){var d=r["childNodes"];const m=[...d];d=m.findIndex(({textContent:e})=>" to "===e);if(-1===d)console.debug(`[${M}] missing from/to separator text`);else{const p=m.slice(0,d).filter(k).map(N),v=m.slice(d+1).filter(k).map(N);var{added:d,removed:l}=((t,i)=>{var e={added:[],removed:[]};const{added:n,removed:r}=e;return t.forEach(e=>i.includes(e)||r.push(e)),i.forEach(e=>t.includes(e)||n.push(e)),e})(p,v);const h={};r.querySelectorAll("a").forEach(({href:e,textContent:t})=>{h[e]=t||e}),[...e.children].forEach(e=>e.remove());var o=d["length"],s=l["length"];if(!o&&!s||!n){var a="Reordered duplicate targets";if(o&&I(e,`Added ${o} duplicate `+L(o,"target"),{before:d,ordered:[U||1<o],titles:h}),s&&I(e,`Removed ${s} duplicate `+L(s,"target"),{before:l,ordered:[U||1<s],titles:h}),!o&&!s&&i){d=(()=>{var e=location["pathname"],[,e]=/posts\/(\d+)\/(?:revisions|timeline)/.exec(e)||[];return e})();if(!d)return;const b=await fetch(`/revisions/${d}/`+i);if(!b.ok)return;var l=await b.text(),d=$(l).find(`[title='revision ${i}']`).next().contents().get(0);const x=(null==(l=null==d?void 0:d.textContent)?void 0:l.trim())||"",[y,w]=x.split(/\s+-\s+/),E=y.replace(/^from\s+/,"").split(","),C=w.replace(/^to\s+/,"").split(","),N=(e,t)=>{const i=new RegExp(`\\/${t}\\/`);return e.find(e=>i.test(e))||t};i=E.map(e=>N(p,e)),d=C.map(e=>N(v,e));const g=n?j:I;return g(e,a,{before:i,after:d,titles:h,ordered:[!0,!0]})}const g=n?j:I;return g(e,a,{before:p,after:v,titles:h,ordered:[!0,!0]})}{var[l,i,{before:c=[],after:u=[],titles:f}]=[e,`Added ${o}, removed ${s} `+L(s,"target"),{before:p,after:v,titles:h}];l.append(A(i));const S=c.map(e=>q(e,f[e],...u.includes(e)?[]:["diff-removed"]));u.forEach((e,t,i)=>{if(!c.includes(e)){const n=i[t+1];i=S.findIndex(e=>e.href===n)+1;S.splice(i,0,q(e,f[e],"diff-added"))}}),l.append(R(S))}}}else console.debug(`[${M}] missing duplicate list edit ${t} entry container`)},M="dupe-timeline-lists";{var e=document.createElement("style");document.head.append(e);const n=e["sheet"];n?["ul.dupe-timeline-list { list-style: none; margin-left: 0; }","ol.dupe-timeline-list { margin-left: 1em; }",".dupe-timeline-list:last-child { margin-bottom: 0; }",`.dupe-timeline-list .diff-added,
             .dupe-timeline-list .diff-removed {
                margin-left: 1em;
            }`,`.dupe-timeline-list .diff-added:before,
             .dupe-timeline-list .diff-removed:before {
                display: inline-block;
                margin-left: -2em;
                width: 1em;
                text-align: center;
                color: var(--black-750);
            }`,'.dupe-timeline-list .diff-added:before { content: "+"; }','.dupe-timeline-list .diff-removed:before { content: "-"; }'].forEach(e=>n.insertRule(e)):console.debug(`[${M}] missing stylesheet`)}e=Store.locateStorage();const t=new Store.default(M,e);var e="always-use-lists",i="use-diff-view";const U=await t.load(e,!1),o=await t.load(i,!1);if(await t.save(e,U),await t.save(i,o),location.pathname.includes("revisions")){const r=document.querySelector(".js-revisions");return r?void r.querySelectorAll(".js-revision > div").forEach(e=>{var t,[e,i]=e.children;const n=(null==(t=null==i?void 0:i.textContent)?void 0:t.trim())||"";!n.includes("duplicates list edited")||(e=(null==(t=null==e?void 0:e.textContent)?void 0:t.trim())||"")&&!Number.isNaN(+e)&&l(i,"revisions",e,o)}):void console.debug(`[${M}] missing revisions table`)}const s=document.querySelector(".post-timeline");if(s){const a=new Set(["answered","asked","duplicates list edited","edited","rollback"]);s.querySelectorAll("tr").forEach(e=>{var t,i,n,r,d=e["dataset"],d=d["eventtype"];"history"===d&&(d=e["cells"],[t,i,e,n,r,d]=d,"duplicates list edited"===((null==(e=null==e?void 0:e.textContent)?void 0:e.trim())||"")&&(e=[...s.rows].reduce((e,t)=>{var[,t,i]=t.cells;if("history"!==((null==(t=null==t?void 0:t.textContent)?void 0:t.trim())||""))return e;i=(null==(t=null==i?void 0:i.textContent)?void 0:t.trim())||"";return a.has(i)?e+1:e},0),l(d,"timeline",e,o)))})}else console.debug(`[${M}] missing timeline table`)},{once:!0});