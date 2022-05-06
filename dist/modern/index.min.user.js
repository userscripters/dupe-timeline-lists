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
// @version         1.5.1
// ==/UserScript==

"use strict";window.addEventListener("load",async()=>{const A=e=>"A"===e.nodeName.toUpperCase(),N=(e,t,...i)=>{const n=document.createElement("a");return n.href=e,n.textContent=t,n.target="_blank",n.classList.add(...i),n},R=e=>{const t=document.createElement("span");return t.textContent=e.trim(),t},L=e=>e.href,j=(e,t=!1)=>{const i=document.createElement(t?"ol":"ul");i.classList.add("dupe-timeline-list");t=e.map(e=>{const t=document.createElement("li");return t.append(e),t});return i.append(...t),i},I=(e,t,i="s")=>""+t+(1===e?"":i),M=(e,t,{before:i=[],after:n=[],titles:d})=>{e.append(R(t));t=i.flatMap((e,t)=>{t=n[t];return e===t?N(e,d[e]):[N(e,d[e],"diff-removed"),N(t,d[t],"diff-added")]});e.append(j(t))},U=(e,t,{before:i,after:n,ordered:d,titles:r})=>{e.append(R(t));var[t,d]=d;i&&(i=i.map(e=>N(e,r[e])),e.append(j(i,t))),n&&(i=n.map(e=>N(e,r[e])),e.append(j(i,d)))},s=async(e,t,i,n=!1)=>{const d=e.querySelector("span");if(d){var r=d["childNodes"];const p=[...r];r=p.findIndex(({textContent:e})=>" to "===e);if(-1===r)console.debug(`[${_}] missing from/to separator text`);else{const v=p.slice(0,r).filter(A).map(L),h=p.slice(r+1).filter(A).map(L);var{added:r,removed:o}=((t,i)=>{var e={added:[],removed:[]};const{added:n,removed:d}=e;return t.forEach(e=>i.includes(e)||d.push(e)),i.forEach(e=>t.includes(e)||n.push(e)),e})(v,h);const g={};d.querySelectorAll("a").forEach(({href:e,textContent:t})=>{g[e]=t||e}),[...e.children].forEach(e=>e.remove());var l=r["length"],s=o["length"],a=(()=>{var e=location["pathname"],[,e]=/posts\/(\d+)\/(?:revisions|timeline)/.exec(e)||[];return e})();if(a){const b=await fetch(`/revisions/${a}/`+i);if(b.ok){a=await b.text(),a=$(a).find(`[title='revision ${i}']`).next().contents().get(0);const x=(null==(i=null==a?void 0:a.textContent)?void 0:i.trim())||"",[w,y]=x.split(/\s+-\s+/),E=w.replace(/^from\s+/,"").split(","),C=y.replace(/^to\s+/,"").split(","),k=(e,t)=>{const i=new RegExp(`\\/${t}\\/`);return e.find(e=>i.test(e))||t};a=E.map(e=>k(v,e)),i=C.map(e=>k(h,e));if(!l&&!s||!n){var c="Reordered duplicate targets";if(l&&U(e,`Added ${l} duplicate `+I(l,"target"),{before:r,ordered:[z||1<l],titles:g}),s&&U(e,`Removed ${s} duplicate `+I(s,"target"),{before:o,ordered:[z||1<s],titles:g}),!l&&!s){const S=n?M:U;return S(e,c,{before:a,after:i,titles:g,ordered:[!0,!0]})}const S=n?M:U;return S(e,c,{before:a,after:i,titles:g,ordered:[!0,!0]})}{var[r,o,{before:u=[],after:f=[],titles:m}]=[e,`Added ${l}, removed ${s} `+I(s,"target"),{before:a,after:i,titles:g}];r.append(R(o));const q=u.map(e=>N(e,m[e],...f.includes(e)?[]:["diff-removed"]));f.forEach((e,t,i)=>{if(!u.includes(e)){e=N(e,m[e],"diff-added");const n=i[t+1];n?(i=q.findIndex(e=>e.href===n),q.splice(i,0,e)):q.push(e)}}),r.append(j(q))}}}}}else console.debug(`[${_}] missing duplicate list edit ${t} entry container`)},_="dupe-timeline-lists";var e=Store.locateStorage();const t=new Store.default(_,e);var e="always-use-lists",i="use-diff-view",n="use-color-diffs";const z=await t.load(e,!1),a=await t.load(i,!1);var d=await t.load(n,!1);await t.save(e,z),await t.save(i,a),await t.save(n,d);{e=a,i=d,n=document.createElement("style"),document.head.append(n);const r=n["sheet"];if(r){const o=["ul.dupe-timeline-list { list-style: none; margin-left: 0; }","ol.dupe-timeline-list { margin-left: 1em; }",".dupe-timeline-list:last-child { margin-bottom: 0; }",`.dupe-timeline-list .diff-added,
             .dupe-timeline-list .diff-removed {
                padding-left: 1em;
            }`,`.dupe-timeline-list .diff-added:before,
             .dupe-timeline-list .diff-removed:before {
                display: inline-block;
                margin-left: -2em;
                width: 1em;
                text-align: center;
                color: var(--black-750);
            }`,'.dupe-timeline-list .diff-added:before { content: "+"; }','.dupe-timeline-list .diff-removed:before { content: "-"; }'];e&&i&&o.push(`.dupe-timeline-list a.diff-added,
                 .dupe-timeline-list a.diff-removed {
                    text-decoration: underline var(--theme-link-color);
                }`,`.dupe-timeline-list .diff-added {
                    background: var(--green-100);
                    color: var(--green-800);
                }`,`.dupe-timeline-list .diff-removed {
                    color: var(--red-800);
                    background-color: var(--red-200);
                }`),o.forEach(e=>r.insertRule(e))}else console.debug(`[${_}] missing stylesheet`)}if(location.pathname.includes("revisions")){const l=document.querySelector(".js-revisions");return l?void l.querySelectorAll(".js-revision > div").forEach(e=>{var t,[e,i]=e.children;const n=(null==(t=null==i?void 0:i.textContent)?void 0:t.trim())||"";!n.includes("duplicates list edited")||(e=(null==(t=null==e?void 0:e.textContent)?void 0:t.trim())||"")&&!Number.isNaN(+e)&&s(i,"revisions",e,a)}):void console.debug(`[${_}] missing revisions table`)}d=document.querySelector(".post-timeline");if(!d)return void console.debug(`[${_}] missing timeline table`);const c=new Set(["answered","asked","duplicates list edited","edited","rollback"]),u=[...d.rows];u.forEach((e,t)=>{var i,n,d,r,o,l=e["dataset"],l=l["eventtype"];"history"===l&&(l=e["cells"],[i,n,e,d,r,l]=l,"duplicates list edited"===((null==(e=null==e?void 0:e.textContent)?void 0:e.trim())||"")&&(e=u,o=t,t=e.reduceRight((e,t,i)=>{if(i<o)return e;var[,i,t]=t.cells;if("history"!==((null==(i=null==i?void 0:i.textContent)?void 0:i.trim())||""))return e;t=(null==(i=null==t?void 0:t.textContent)?void 0:i.trim())||"";return c.has(t)?e+1:e},0),s(l,"timeline",t,a)))})},{once:!0});