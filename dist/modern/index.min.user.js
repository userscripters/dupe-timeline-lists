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
// @run-at          document-start
// @source          git+https://github.com/userscripters/dupe-timeline-lists.git
// @supportURL      https://github.com/userscripters/dupe-timeline-lists/issues
// @version         1.5.4
// ==/UserScript==

"use strict";window.addEventListener("load",()=>{const A=e=>"A"===e.nodeName.toUpperCase(),L=(e,t,...i)=>{const n=document.createElement("a");return n.href=e,n.textContent=t,n.target="_blank",n.classList.add(...i),n},N=e=>{const t=document.createElement("span");return t.textContent=e.trim(),t},R=e=>e.href,U=(e,t=!1)=>{const i=document.createElement(t?"ol":"ul");i.classList.add("dupe-timeline-list");t=e.map(e=>{const t=document.createElement("li");return t.append(e),t});return i.append(...t),i},j=(e,t,i="s")=>""+t+(1===e?"":i),I=(e,t,{append:i=[],before:n=[],after:d=[],titles:l})=>{e.append(N(t));t=n.flatMap((e,t)=>{t=d[t];return e===t?L(e,l[e]):[L(e,l[e],"diff-removed"),L(t,l[t],"diff-added")]});e.append(U(t),...i)},W=(e,t,{append:i=[],before:n,after:d,ordered:l,titles:r})=>{e.append(N(t));var[t,l]=l;n&&(n=n.map(e=>L(e,r[e])),e.append(U(n,t))),d&&(n=d.map(e=>L(e,r[e])),e.append(U(n,l))),e.append(...i)},D=(e,t)=>{const i=new RegExp(`\\/${t}\\/`);return e.find(e=>i.test(e))||t},y=async(e,t,i,n=!1,d=!1)=>{const l=e.querySelector("span");if(l){var r=l["childNodes"];const v=[...r];r=v.findIndex(({textContent:e})=>" to "===e);if(-1===r)console.debug(`[${M}] missing from/to separator text`);else{const g=v.slice(0,r).filter(A).map(R),h=v.slice(r+1).filter(A).map(R);var{added:r,removed:o}=((t,i)=>{var e={added:[],removed:[]};const{added:n,removed:d}=e;return t.forEach(e=>i.includes(e)||d.push(e)),i.forEach(e=>t.includes(e)||n.push(e)),e})(g,h);const b={};l.querySelectorAll("a").forEach(({href:e,textContent:t})=>{b[e]=t||e});var s=r["length"],a=o["length"],c=(()=>{var e=location["pathname"],[,e]=/posts\/(\d+)\/(?:revisions|timeline)/.exec(e)||[];return e})();if(c){var c=`/revisions/${c}/`+i;const y=await fetch(c);if(y.ok){var c=null==(c=e.querySelector(`[href*='${c}']`))?void 0:c.parentElement,c=c?[c]:[],p=([...e.children].forEach(e=>e.remove()),await y.text()),p=$(p).find(`[title='revision ${i}']`).next().contents().get(0);const w=(null==(i=null==p?void 0:p.textContent)?void 0:i.trim())||"",[x,E]=w.split(/\s+-\s+/),C=x.replace(/^from\s+/,"").split(","),k=E.replace(/^to\s+/,"").split(",");p=C.map(e=>D(g,e)),i=k.map(e=>D(h,e));if(!s&&!a||!d){if(s||a)return s&&W(e,`Added ${s} duplicate `+j(s,"target"),{append:c,before:r,ordered:[n||1<s],titles:b}),void(a&&W(e,`Removed ${a} duplicate `+j(a,"target"),{append:c,before:o,ordered:[n||1<a],titles:b}));const S=d?I:W;return S(e,"Reordered duplicate targets",{append:c,before:p,after:i,titles:b,ordered:[!0,!0]})}{var[r,o,{append:n,before:f=[],after:u=[],titles:m}]=[e,`Added ${s}, removed ${a} `+j(a,"target"),{append:c,before:p,after:i,titles:b}];r.append(N(o));const q=f.map(e=>L(e,m[e],...u.includes(e)?[]:["diff-removed"]));u.forEach((e,t,i)=>{if(!f.includes(e)){e=L(e,m[e],"diff-added");const n=i[t+1];n?(i=q.findIndex(e=>e.href===n),q.splice(i,0,e)):q.push(e)}}),r.append(U(q),...n)}}}}}else console.debug(`[${M}] missing duplicate list edit ${t} entry container`)},M="dupe-timeline-lists",w="list-type",x="view-type",E="use-color-diffs";unsafeWindow.addEventListener("userscript-configurer-load",async()=>{const e=null==(t=null==(t=unsafeWindow.UserScripters)?void 0:t.Userscripts)?void 0:t.Configurer;if(e){const f=e.register(M);f.option(w,{items:[{label:"Always ordered",value:"always-ordered"},{label:"Only multiple",value:"only-multiple"}],def:"always-ordered",title:"List type (list view-only)",desc:"",type:"select"}),f.option(x,{items:[{label:"List view",value:"list"},{label:"Diff view",value:"diff"}],def:"list",title:"View preference",desc:"",type:"select"}),f.option(E,{def:!1,desc:"",title:"Colored diffs (diff view-only)",type:"toggle"});var t=await f.load(E,!0),i=await f.load(w,"only-multiple"),n=await f.load(x,"list");const u="always-ordered"===i,m="diff"===n;{i=m;n=t;t=document.createElement("style");document.head.append(t);const v=t["sheet"];if(v){const g=["ul.dupe-timeline-list { list-style: none; margin-left: 0; }","ol.dupe-timeline-list { margin-left: 1em; }",".dupe-timeline-list:last-child { margin-bottom: 0; }",`.dupe-timeline-list .diff-added,
             .dupe-timeline-list .diff-removed {
                padding-left: 1em;
            }`,`.dupe-timeline-list .diff-added:before,
             .dupe-timeline-list .diff-removed:before {
                display: inline-block;
                margin-left: -2em;
                width: 1em;
                text-align: center;
                color: var(--black-750);
            }`,'.dupe-timeline-list .diff-added:before { content: "+"; }','.dupe-timeline-list .diff-removed:before { content: "-"; }'];i&&n&&g.push(`.dupe-timeline-list a.diff-added,
                 .dupe-timeline-list a.diff-removed {
                    text-decoration: underline var(--theme-link-color);
                }`,`.dupe-timeline-list .diff-added {
                    background: var(--green-100);
                    color: var(--green-800);
                }`,`.dupe-timeline-list .diff-removed {
                    color: var(--red-800);
                    background-color: var(--red-200);
                }`),g.forEach(e=>v.insertRule(e))}else console.debug(`[${M}] missing stylesheet`)}if(location.pathname.includes("revisions")){const h=document.querySelector(".js-revisions");return h?void h.querySelectorAll(".js-revision > div").forEach(e=>{var t,[e,i]=e.children;const n=(null==(t=null==i?void 0:i.textContent)?void 0:t.trim())||"";!n.includes("duplicates list edited")||(e=(null==(t=null==e?void 0:e.textContent)?void 0:t.trim())||"")&&!Number.isNaN(+e)&&y(i,"revisions",e,u,m)}):void console.debug(`[${M}] missing revisions table`)}t=document.querySelector(".post-timeline");if(t){var d=new Set(["answered","asked","duplicates list edited","edited","rollback"]),l=[...t.rows];let e=-1;for(const b of l){(e+=1)||e%10||await(t=>new Promise(e=>setTimeout(e,t)))(500);var r,o,s,a,c,p=b["dataset"],p=p["eventtype"];"history"===p&&(p=b["cells"],[r,o,p,s,a,c]=p,"duplicates list edited"===((null==(p=null==p?void 0:p.textContent)?void 0:p.trim())||"")&&(p=((n,e,d)=>e.reduceRight((e,t,i)=>{if(i<d)return e;var[,i,t]=t.cells;if("history"!==((null==(i=null==i?void 0:i.textContent)?void 0:i.trim())||""))return e;t=(null==(i=null==t?void 0:t.textContent)?void 0:i.trim())||"";return n.has(t)?e+1:e},0))(d,l,e),y(c,"timeline",p,u,m)))}}else console.debug(`[${M}] missing timeline table`)}else console.debug(`[${M}] missing script configurer`)},{once:!0})},{once:!0});