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
// @version         1.5.2
// ==/UserScript==

"use strict";window.addEventListener("load",async()=>{const q=e=>"A"===e.nodeName.toUpperCase(),A=(e,t,...i)=>{const n=document.createElement("a");return n.href=e,n.textContent=t,n.target="_blank",n.classList.add(...i),n},N=e=>{const t=document.createElement("span");return t.textContent=e.trim(),t},R=e=>e.href,L=(e,t=!1)=>{const i=document.createElement(t?"ol":"ul");i.classList.add("dupe-timeline-list");t=e.map(e=>{const t=document.createElement("li");return t.append(e),t});return i.append(...t),i},j=(e,t,i="s")=>""+t+(1===e?"":i),I=(e,t,{append:i=[],before:n=[],after:d=[],titles:r})=>{e.append(N(t));t=n.flatMap((e,t)=>{t=d[t];return e===t?A(e,r[e]):[A(e,r[e],"diff-removed"),A(t,r[t],"diff-added")]});e.append(L(t),...i)},M=(e,t,{append:i=[],before:n,after:d,ordered:r,titles:l})=>{e.append(N(t));var[t,r]=r;n&&(n=n.map(e=>A(e,l[e])),e.append(L(n,t))),d&&(n=d.map(e=>A(e,l[e])),e.append(L(n,r))),e.append(...i)},U=(e,t)=>{const i=new RegExp(`\\/${t}\\/`);return e.find(e=>i.test(e))||t},a=async(e,t,i,n=!1)=>{const d=e.querySelector("span");if(d){var r=d["childNodes"];const m=[...r];r=m.findIndex(({textContent:e})=>" to "===e);if(-1===r)console.debug(`[${_}] missing from/to separator text`);else{const v=m.slice(0,r).filter(q).map(R),h=m.slice(r+1).filter(q).map(R);var{added:r,removed:l}=((t,i)=>{var e={added:[],removed:[]};const{added:n,removed:d}=e;return t.forEach(e=>i.includes(e)||d.push(e)),i.forEach(e=>t.includes(e)||n.push(e)),e})(v,h);const g={};d.querySelectorAll("a").forEach(({href:e,textContent:t})=>{g[e]=t||e});var o=r["length"],a=l["length"],s=(()=>{var e=location["pathname"],[,e]=/posts\/(\d+)\/(?:revisions|timeline)/.exec(e)||[];return e})();if(s){var s=`/revisions/${s}/`+i;const b=await fetch(s);if(b.ok){var s=null==(s=e.querySelector(`[href*='${s}']`))?void 0:s.parentElement,s=s?[s]:[],c=([...e.children].forEach(e=>e.remove()),await b.text()),c=$(c).find(`[title='revision ${i}']`).next().contents().get(0);const x=(null==(i=null==c?void 0:c.textContent)?void 0:i.trim())||"",[w,y]=x.split(/\s+-\s+/),E=w.replace(/^from\s+/,"").split(","),C=y.replace(/^to\s+/,"").split(",");c=E.map(e=>U(v,e)),i=C.map(e=>U(h,e));if(!o&&!a||!n){if(o||a)return o&&M(e,`Added ${o} duplicate `+j(o,"target"),{append:s,before:r,ordered:[z||1<o],titles:g}),void(a&&M(e,`Removed ${a} duplicate `+j(a,"target"),{append:s,before:l,ordered:[z||1<a],titles:g}));const S=n?I:M;return S(e,"Reordered duplicate targets",{append:s,before:c,after:i,titles:g,ordered:[!0,!0]})}{var[r,l,{append:n,before:u=[],after:p=[],titles:f}]=[e,`Added ${o}, removed ${a} `+j(a,"target"),{append:s,before:c,after:i,titles:g}];r.append(N(l));const k=u.map(e=>A(e,f[e],...p.includes(e)?[]:["diff-removed"]));p.forEach((e,t,i)=>{if(!u.includes(e)){e=A(e,f[e],"diff-added");const n=i[t+1];n?(i=k.findIndex(e=>e.href===n),k.splice(i,0,e)):k.push(e)}}),r.append(L(k),...n)}}}}}else console.debug(`[${_}] missing duplicate list edit ${t} entry container`)},_="dupe-timeline-lists";var e=Store.locateStorage();const t=new Store.default(_,e);var e="always-use-lists",i="use-diff-view",n="use-color-diffs";const z=await t.load(e,!1),s=await t.load(i,!1);var d=await t.load(n,!1);await t.save(e,z),await t.save(i,s),await t.save(n,d);{e=s,i=d,n=document.createElement("style"),document.head.append(n);const r=n["sheet"];if(r){const l=["ul.dupe-timeline-list { list-style: none; margin-left: 0; }","ol.dupe-timeline-list { margin-left: 1em; }",".dupe-timeline-list:last-child { margin-bottom: 0; }",`.dupe-timeline-list .diff-added,
             .dupe-timeline-list .diff-removed {
                padding-left: 1em;
            }`,`.dupe-timeline-list .diff-added:before,
             .dupe-timeline-list .diff-removed:before {
                display: inline-block;
                margin-left: -2em;
                width: 1em;
                text-align: center;
                color: var(--black-750);
            }`,'.dupe-timeline-list .diff-added:before { content: "+"; }','.dupe-timeline-list .diff-removed:before { content: "-"; }'];e&&i&&l.push(`.dupe-timeline-list a.diff-added,
                 .dupe-timeline-list a.diff-removed {
                    text-decoration: underline var(--theme-link-color);
                }`,`.dupe-timeline-list .diff-added {
                    background: var(--green-100);
                    color: var(--green-800);
                }`,`.dupe-timeline-list .diff-removed {
                    color: var(--red-800);
                    background-color: var(--red-200);
                }`),l.forEach(e=>r.insertRule(e))}else console.debug(`[${_}] missing stylesheet`)}if(location.pathname.includes("revisions")){const o=document.querySelector(".js-revisions");return o?void o.querySelectorAll(".js-revision > div").forEach(e=>{var t,[e,i]=e.children;const n=(null==(t=null==i?void 0:i.textContent)?void 0:t.trim())||"";!n.includes("duplicates list edited")||(e=(null==(t=null==e?void 0:e.textContent)?void 0:t.trim())||"")&&!Number.isNaN(+e)&&a(i,"revisions",e,s)}):void console.debug(`[${_}] missing revisions table`)}d=document.querySelector(".post-timeline");if(!d)return void console.debug(`[${_}] missing timeline table`);const c=new Set(["answered","asked","duplicates list edited","edited","rollback"]),u=[...d.rows];u.forEach((e,t)=>{var i,n,d,r,l,o=e["dataset"],o=o["eventtype"];"history"===o&&(o=e["cells"],[i,n,e,d,r,o]=o,"duplicates list edited"===((null==(e=null==e?void 0:e.textContent)?void 0:e.trim())||"")&&(e=u,l=t,t=e.reduceRight((e,t,i)=>{if(i<l)return e;var[,i,t]=t.cells;if("history"!==((null==(i=null==i?void 0:i.textContent)?void 0:i.trim())||""))return e;t=(null==(i=null==t?void 0:t.textContent)?void 0:i.trim())||"";return c.has(t)?e+1:e},0),a(o,"timeline",t,s)))})},{once:!0});