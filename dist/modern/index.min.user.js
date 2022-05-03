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

"use strict";window.addEventListener("load",async()=>{const A=e=>"A"===e.nodeName.toUpperCase(),N=(e,t,...i)=>{const n=document.createElement("a");return n.href=e,n.textContent=t,n.target="_blank",n.classList.add(...i),n},R=e=>{const t=document.createElement("span");return t.textContent=e.trim(),t},L=e=>e.href,j=(e,t=!1)=>{const i=document.createElement(t?"ol":"ul");i.classList.add("dupe-timeline-list");t=e.map(e=>{const t=document.createElement("li");return t.append(e),t});return i.append(...t),i},I=(e,t,i="s")=>""+t+(1===e?"":i),M=(e,t,{from:i,to:n,titles:r})=>{e.append(R(t));t=i.flatMap((e,t)=>{t=n[t];return e===t?N(e,r[e]):[N(e,r[e],"diff-removed"),N(t,r[t],"diff-added")]});e.append(j(t))},U=(e,t,{before:i,after:n,ordered:r})=>{e.append(R(t));var[t,r]=r;i&&e.append(j(i,t)),n&&e.append(j(n,r))},o=async(e,t,i,n=!1)=>{const r=e.querySelector("span");if(r){var d=r["childNodes"];const p=[...d];var d=p.findIndex(({textContent:e})=>" to "===e);if(-1===d)console.debug(`[${_}] missing from/to separator text`);else{const v=p.slice(0,d).filter(A).map(L),h=p.slice(d+1).filter(A).map(L),{added:g,removed:b}=((t,i)=>{var e={added:[],removed:[]};const{added:n,removed:r}=e;return t.forEach(e=>i.includes(e)||r.push(e)),i.forEach(e=>t.includes(e)||n.push(e)),e})(v,h),x={};r.querySelectorAll("a").forEach(({href:e,textContent:t})=>{x[e]=t||e});var d=g.map(e=>N(e,x[e])),o=b.map(e=>N(e,x[e])),l=([...e.children].forEach(e=>e.remove()),d)["length"],s=o["length"];if((l||s)&&n){var[a,c,{from:m,to:u,titles:f}]=[e,`Added ${l}, removed ${s} `+I(s,"target"),{from:v,to:h,titles:x}];a.append(R(c));const w=m.map(e=>N(e,f[e],...u.includes(e)?[]:["diff-removed"]));u.forEach((e,t,i)=>{if(!m.includes(e)){const n=i[t+1];i=w.findIndex(e=>e.href===n)+1;w.splice(i,0,N(e,f[e],"diff-added"))}}),a.append(j(w))}else{c="Reordered duplicate targets";if(l&&U(e,`Added ${l} duplicate `+I(l,"target"),{before:d,ordered:[z||1<l]}),s&&U(e,`Removed ${s} duplicate `+I(s,"target"),{before:o,ordered:[z||1<s]}),!l&&!s&&i){a=(()=>{var e=location["pathname"],[,e]=/posts\/(\d+)\/(?:revisions|timeline)/.exec(e)||[];return e})();if(!a)return;const y=await fetch(`/revisions/${a}/`+i);if(!y.ok)return;var d=await y.text(),o=$(d).find(`[title='revision ${i}']`).next().contents().get(0);const E=(null==(d=null==o?void 0:o.textContent)?void 0:d.trim())||"",[C,S]=E.split(/\s+-\s+/),k=C.replace(/^from\s+/,"").split(","),q=S.replace(/^to\s+/,"").split(",");i=e=>{const t=new RegExp(`\\/${e}\\/`);var i=v.find(e=>t.test(e));return i?N(i,x[i]):e},o=e=>{const t=new RegExp(`\\/${e}\\/`);return v.find(e=>t.test(e))||e};return n?M(e,c,{from:k.map(o),to:q.map(o),titles:x}):U(e,c,{before:k.map(i),after:q.map(i),ordered:[!0,!0]})}if(!l&&!s&&n)return M(e,c,{from:v,to:h,titles:x});l||s||(d=v.map(e=>N(e,x[e])),o=h.map(e=>N(e,x[e])),U(e,c,{before:d,after:o,ordered:[!0,!0]}))}}}else console.debug(`[${_}] missing duplicate list edit ${t} entry container`)},_="dupe-timeline-lists";{var e=document.createElement("style");document.head.append(e);const n=e["sheet"];n?["ul.dupe-timeline-list { list-style: none; margin-left: 0; }","ol.dupe-timeline-list { margin-left: 1em; }",".dupe-timeline-list:last-child { margin-bottom: 0; }",`.dupe-timeline-list .diff-added,
             .dupe-timeline-list .diff-removed {
                margin-left: 1em;
            }`,`.dupe-timeline-list .diff-added:before,
             .dupe-timeline-list .diff-removed:before {
                display: inline-block;
                margin-left: -2em;
                width: 1em;
                text-align: center;
                color: var(--black-750);
            }`,'.dupe-timeline-list .diff-added:before { content: "+"; }','.dupe-timeline-list .diff-removed:before { content: "-"; }'].forEach(e=>n.insertRule(e)):console.debug(`[${_}] missing stylesheet`)}e=Store.locateStorage();const t=new Store.default(_,e);var e="always-use-lists",i="use-diff-view";const z=await t.load(e,!1),l=await t.load(i,!1);if(await t.save(e,z),await t.save(i,l),location.pathname.includes("revisions")){const r=document.querySelector(".js-revisions");return r?void r.querySelectorAll(".js-revision > div").forEach(e=>{var t,[e,i]=e.children;const n=(null==(t=null==i?void 0:i.textContent)?void 0:t.trim())||"";!n.includes("duplicates list edited")||(e=(null==(t=null==e?void 0:e.textContent)?void 0:t.trim())||"")&&!Number.isNaN(+e)&&o(i,"revisions",e,l)}):void console.debug(`[${_}] missing revisions table`)}const s=document.querySelector(".post-timeline");if(s){const a=new Set(["answered","asked","duplicates list edited","edited","rollback"]);s.querySelectorAll("tr").forEach(e=>{var t,i,n,r,d=e["dataset"],d=d["eventtype"];"history"===d&&(d=e["cells"],[t,i,e,n,r,d]=d,"duplicates list edited"===((null==(e=null==e?void 0:e.textContent)?void 0:e.trim())||"")&&(e=[...s.rows].reduce((e,t)=>{var[,t,i]=t.cells;if("history"!==((null==(t=null==t?void 0:t.textContent)?void 0:t.trim())||""))return e;i=(null==(t=null==i?void 0:i.textContent)?void 0:t.trim())||"";return a.has(i)?e+1:e},0),o(d,"timeline",e,l)))})}else console.debug(`[${_}] missing timeline table`)},{once:!0});