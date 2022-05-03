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
// @version         1.3.1
// ==/UserScript==

"use strict";window.addEventListener("load",async()=>{const q=e=>"A"===e.nodeName.toUpperCase(),A=(e,t,...i)=>{const n=document.createElement("a");return n.href=e,n.textContent=t,n.target="_blank",n.classList.add(...i),n},N=e=>{const t=document.createElement("span");return t.textContent=e.trim(),t},R=e=>e.href,L=(e,t=!1)=>{const i=document.createElement(t?"ol":"ul");i.classList.add("dupe-timeline-list");t=e.map(e=>{const t=document.createElement("li");return t.append(e),t});return i.append(...t),i},j=(e,t,i="s")=>""+t+(1===e?"":i),I=(e,t,{before:i,after:n,ordered:d})=>{e.append(N(t));var[t,d]=d;i&&e.append(L(i,t)),n&&e.append(L(n,d))},r=async(e,t,i,n=!1)=>{const d=e.querySelector("span");if(d){var o=d["childNodes"];const f=[...o];o=f.findIndex(({textContent:e})=>" to "===e);if(-1===o)console.debug(`[${U}] missing from/to separator text`);else{const p=f.slice(0,o).filter(q).map(R),v=f.slice(o+1).filter(q).map(R),{added:h,removed:g}=((t,i)=>{var e={added:[],removed:[]};const{added:n,removed:d}=e;return t.forEach(e=>i.includes(e)||d.push(e)),i.forEach(e=>t.includes(e)||n.push(e)),e})(p,v),b={};d.querySelectorAll("a").forEach(({href:e,textContent:t})=>{b[e]=t||e});var o=h.map(e=>A(e,b[e])),r=g.map(e=>A(e,b[e])),l=([...e.children].forEach(e=>e.remove()),o)["length"],s=r["length"];if(l||s&&n){var[n,a,{from:c,to:u,titles:m}]=[e,`Added ${l}, removed ${s} `+j(s,"target"),{from:p,to:v,titles:b}];n.append(N(a));const x=c.map(e=>A(e,m[e],...u.includes(e)?[]:["diff-removed"]));u.forEach((e,t,i)=>{if(!c.includes(e)){const n=i[t+1];i=x.findIndex(e=>e.href===n)+1;x.splice(i,0,A(e,m[e],"diff-added"))}}),n.append(L(x))}else if(l&&I(e,`Added ${l} duplicate `+j(l,"target"),{before:o,ordered:[_||1<l]}),s&&I(e,`Removed ${s} duplicate `+j(s,"target"),{before:r,ordered:[_||1<s]}),l||s||!i)l||s||(a=p.map(e=>A(e,b[e])),n=v.map(e=>A(e,b[e])),I(e,"Reodered duplicate targets",{before:a,after:n,ordered:[!0,!0]}));else{o=(()=>{var e=location["pathname"],[,e]=/posts\/(\d+)\/(?:revisions|timeline)/.exec(e)||[];return e})();if(!o)return;const y=await fetch(`/revisions/${o}/`+i);if(!y.ok)return;r=await y.text(),l=$(r).find(`[title='revision ${i}']`).next().contents().get(0);const w=(null==(s=null==l?void 0:l.textContent)?void 0:s.trim())||"",[E,C]=w.split(/\s+-\s+/),S=E.replace(/^from\s+/,"").split(","),k=C.replace(/^to\s+/,"").split(",");n=e=>{const t=new RegExp(`\\/${e}\\/`);var i=p.find(e=>t.test(e));return i?A(i,b[i]):e},o=S.map(n),r=k.map(n);void I(e,"Reodered duplicate targets",{before:o,after:r,ordered:[!0,!0]})}}}else console.debug(`[${U}] missing duplicate list edit ${t} entry container`)},U="dupe-timeline-lists";{var e=document.createElement("style");document.head.append(e);const n=e["sheet"];n?["ul.dupe-timeline-list { list-style: none; margin-left: 0; }","ol.dupe-timeline-list { margin-left: 1em; }",".dupe-timeline-list:last-child { margin-bottom: 0; }",`.dupe-timeline-list .diff-added,
             .dupe-timeline-list .diff-removed {
                margin-left: 1em;
            }`,`.dupe-timeline-list .diff-added:before,
             .dupe-timeline-list .diff-removed:before {
                display: inline-block;
                margin-left: -2em;
                width: 1em;
                text-align: center;
                color: var(--black-750);
            }`,'.dupe-timeline-list .diff-added:before { content: "+"; }','.dupe-timeline-list .diff-removed:before { content: "-"; }'].forEach(e=>n.insertRule(e)):console.debug(`[${U}] missing stylesheet`)}e=Store.locateStorage();const t=new Store.default(U,e);var e="always-use-lists",i="use-diff-view";const _=await t.load(e,!1),l=await t.load(i,!1);if(await t.save(e,_),await t.save(i,l),location.pathname.includes("revisions")){const d=document.querySelector(".js-revisions");return d?void d.querySelectorAll(".js-revision > div").forEach(e=>{var t,[e,i]=e.children;const n=(null==(t=null==i?void 0:i.textContent)?void 0:t.trim())||"";!n.includes("duplicates list edited")||(e=(null==(t=null==e?void 0:e.textContent)?void 0:t.trim())||"")&&!Number.isNaN(+e)&&r(i,"revisions",e,l)}):void console.debug(`[${U}] missing revisions table`)}const s=document.querySelector(".post-timeline");if(s){const a=new Set(["answered","asked","duplicates list edited","edited","rollback"]);s.querySelectorAll("tr").forEach(e=>{var t,i,n,d,o=e["dataset"],o=o["eventtype"];"history"===o&&(o=e["cells"],[t,i,e,n,d,o]=o,"duplicates list edited"===((null==(e=null==e?void 0:e.textContent)?void 0:e.trim())||"")&&(e=[...s.rows].reduce((e,t)=>{var[,t,i]=t.cells;if("history"!==((null==(t=null==t?void 0:t.textContent)?void 0:t.trim())||""))return e;i=(null==(t=null==i?void 0:i.textContent)?void 0:t.trim())||"";return a.has(i)?e+1:e},0),r(o,"timeline",e,l)))})}else console.debug(`[${U}] missing timeline table`)},{once:!0});