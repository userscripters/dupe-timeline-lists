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

"use strict";window.addEventListener("load",async()=>{const k=e=>"A"===e.nodeName.toUpperCase(),q=(e,t,...i)=>{const n=document.createElement("a");return n.href=e,n.textContent=t,n.target="_blank",n.classList.add(...i),n},A=e=>{const t=document.createElement("span");return t.textContent=e.trim(),t},N=e=>e.href,R=(e,t=!1)=>{const i=document.createElement(t?"ol":"ul");i.classList.add("dupe-timeline-list");t=e.map(e=>{const t=document.createElement("li");return t.append(e),t});return i.append(...t),i},L=(e,t,i="s")=>""+t+(1===e?"":i),j=(e,t,{before:i=[],after:n=[],titles:d})=>{e.append(A(t));t=i.flatMap((e,t)=>{t=n[t];return e===t?q(e,d[e]):[q(e,d[e],"diff-removed"),q(t,d[t],"diff-added")]});e.append(R(t))},I=(e,t,{before:i,after:n,ordered:d,titles:r})=>{e.append(A(t));var[t,d]=d;i&&(i=i.map(e=>q(e,r[e])),e.append(R(i,t))),n&&(i=n.map(e=>q(e,r[e])),e.append(R(i,d)))},l=async(e,t,i,n=!1)=>{const d=e.querySelector("span");if(d){var r=d["childNodes"];const m=[...r];r=m.findIndex(({textContent:e})=>" to "===e);if(-1===r)console.debug(`[${M}] missing from/to separator text`);else{const p=m.slice(0,r).filter(k).map(N),v=m.slice(r+1).filter(k).map(N);var{added:r,removed:l}=((t,i)=>{var e={added:[],removed:[]};const{added:n,removed:d}=e;return t.forEach(e=>i.includes(e)||d.push(e)),i.forEach(e=>t.includes(e)||n.push(e)),e})(p,v);const h={};d.querySelectorAll("a").forEach(({href:e,textContent:t})=>{h[e]=t||e}),[...e.children].forEach(e=>e.remove());var o=r["length"],s=l["length"];if(!o&&!s||!n){var a="Reordered duplicate targets";if(o&&I(e,`Added ${o} duplicate `+L(o,"target"),{before:r,ordered:[U||1<o],titles:h}),s&&I(e,`Removed ${s} duplicate `+L(s,"target"),{before:l,ordered:[U||1<s],titles:h}),!o&&!s&&i){r=(()=>{var e=location["pathname"],[,e]=/posts\/(\d+)\/(?:revisions|timeline)/.exec(e)||[];return e})();if(!r)return;const b=await fetch(`/revisions/${r}/`+i);if(!b.ok)return;var l=await b.text(),r=$(l).find(`[title='revision ${i}']`).next().contents().get(0);const x=(null==(l=null==r?void 0:r.textContent)?void 0:l.trim())||"",[w,y]=x.split(/\s+-\s+/),E=w.replace(/^from\s+/,"").split(","),C=y.replace(/^to\s+/,"").split(","),N=(e,t)=>{const i=new RegExp(`\\/${t}\\/`);return e.find(e=>i.test(e))||t};i=E.map(e=>N(p,e)),r=C.map(e=>N(v,e));const g=n?j:I;return g(e,a,{before:i,after:r,titles:h,ordered:[!0,!0]})}const g=n?j:I;return g(e,a,{before:p,after:v,titles:h,ordered:[!0,!0]})}{var[l,i,{before:c=[],after:u=[],titles:f}]=[e,`Added ${o}, removed ${s} `+L(s,"target"),{before:p,after:v,titles:h}];l.append(A(i));const S=c.map(e=>q(e,f[e],...u.includes(e)?[]:["diff-removed"]));u.forEach((e,t,i)=>{if(!c.includes(e)){const n=i[t+1];i=S.findIndex(e=>e.href===n)+1;S.splice(i,0,q(e,f[e],"diff-added"))}}),l.append(R(S))}}}else console.debug(`[${M}] missing duplicate list edit ${t} entry container`)},M="dupe-timeline-lists";var e=Store.locateStorage();const t=new Store.default(M,e);var e="always-use-lists",i="use-diff-view",n="use-color-diffs";const U=await t.load(e,!1),o=await t.load(i,!1);var d=await t.load(n,!1);await t.save(e,U),await t.save(i,o),await t.save(n,d);{e=o,i=d,n=document.createElement("style"),document.head.append(n);const r=n["sheet"];if(r){const a=["ul.dupe-timeline-list { list-style: none; margin-left: 0; }","ol.dupe-timeline-list { margin-left: 1em; }",".dupe-timeline-list:last-child { margin-bottom: 0; }",`.dupe-timeline-list .diff-added,
             .dupe-timeline-list .diff-removed {
                padding-left: 1em;
            }`,`.dupe-timeline-list .diff-added:before,
             .dupe-timeline-list .diff-removed:before {
                display: inline-block;
                margin-left: -2em;
                width: 1em;
                text-align: center;
                color: var(--black-750);
            }`,'.dupe-timeline-list .diff-added:before { content: "+"; }','.dupe-timeline-list .diff-removed:before { content: "-"; }'];e&&i&&a.push(`.dupe-timeline-list a.diff-added,
                 .dupe-timeline-list a.diff-removed {
                    text-decoration: underline var(--theme-link-color);
                }`,`.dupe-timeline-list .diff-added {
                    background: var(--green-100);
                    color: var(--green-800);
                }`,`.dupe-timeline-list .diff-removed {
                    color: var(--red-800);
                    background-color: var(--red-200);
                }`),a.forEach(e=>r.insertRule(e))}else console.debug(`[${M}] missing stylesheet`)}if(location.pathname.includes("revisions")){const c=document.querySelector(".js-revisions");return c?void c.querySelectorAll(".js-revision > div").forEach(e=>{var t,[e,i]=e.children;const n=(null==(t=null==i?void 0:i.textContent)?void 0:t.trim())||"";!n.includes("duplicates list edited")||(e=(null==(t=null==e?void 0:e.textContent)?void 0:t.trim())||"")&&!Number.isNaN(+e)&&l(i,"revisions",e,o)}):void console.debug(`[${M}] missing revisions table`)}const s=document.querySelector(".post-timeline");if(s){const u=new Set(["answered","asked","duplicates list edited","edited","rollback"]);s.querySelectorAll("tr").forEach(e=>{var t,i,n,d,r=e["dataset"],r=r["eventtype"];"history"===r&&(r=e["cells"],[t,i,e,n,d,r]=r,"duplicates list edited"===((null==(e=null==e?void 0:e.textContent)?void 0:e.trim())||"")&&(e=[...s.rows].reduce((e,t)=>{var[,t,i]=t.cells;if("history"!==((null==(t=null==t?void 0:t.textContent)?void 0:t.trim())||""))return e;i=(null==(t=null==i?void 0:i.textContent)?void 0:t.trim())||"";return u.has(i)?e+1:e},0),l(r,"timeline",e,o)))})}else console.debug(`[${M}] missing timeline table`)},{once:!0});