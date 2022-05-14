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
// @version         2.0.0
// ==/UserScript==

"use strict";window.addEventListener("load",async()=>{const D=e=>"A"===e.nodeName.toUpperCase(),q=(e,t,...i)=>{const n=document.createElement("a");return n.href=e,n.textContent=t,n.target="_blank",n.classList.add(...i),n},A=e=>{const t=document.createElement("span");return t.textContent=e.trim(),t},U=e=>e.href,N=(e,t=!1)=>{const i=document.createElement(t?"ol":"ul");i.classList.add("dupe-timeline-list");t=e.map(e=>{const t=document.createElement("li");return t.append(e),t});return i.append(...t),i};const R=(e,t,i="s")=>""+t+(1===e?"":i),V=(e,t,{append:i=[],before:n=[],after:d=[],titles:l})=>{e.append(A(t));t=n.flatMap((e,t)=>{t=d[t];return e===t?q(e,l[e]):[q(e,l[e],"diff-removed"),q(t,l[t],"diff-added")]});e.append(N(t),...i)},T=(e,t,{append:i=[],before:n,after:d,ordered:l,titles:s})=>{e.append(A(t));var[t,l]=l;n&&(n=n.map(e=>q(e,s[e])),e.append(N(n,t))),d&&(n=d.map(e=>q(e,s[e])),e.append(N(n,l))),e.append(...i)};const j=(e,t)=>{const i=new RegExp(`\\/${t}\\/`);return e.find(e=>i.test(e))||t},d=async(e,t,i,n=!1,d=!1)=>{const l=e.querySelector("span");if(l){var s=l["childNodes"];const v=[...s];s=v.findIndex(({textContent:e})=>" to "===e);if(-1===s)console.debug(`[${I}] missing from/to separator text`);else{const g=v.slice(0,s).filter(D).map(U),y=v.slice(s+1).filter(D).map(U);var{added:s,removed:r}=((t,i)=>{var e={added:[],removed:[]};const{added:n,removed:d}=e;return t.forEach(e=>i.includes(e)||d.push(e)),i.forEach(e=>t.includes(e)||n.push(e)),e})(g,y);const h={};l.querySelectorAll("a").forEach(({href:e,textContent:t})=>{h[e]=t||e});var o=s["length"],a=r["length"],c=(()=>{var e=location["pathname"],[,e]=/posts\/(\d+)\/(?:revisions|timeline)/.exec(e)||[];return e})();if(c){var c=`/revisions/${c}/`+i;const w=await fetch(c);if(w.ok){var c=null==(c=e.querySelector(`[href*='${c}']`))?void 0:c.parentElement,c=c?[c]:[],f=([...e.children].forEach(e=>e.remove()),await w.text()),f=$(f).find(`[title='revision ${i}']`).next().contents().get(0);const b=(null==(i=null==f?void 0:f.textContent)?void 0:i.trim())||"",[x,C]=b.split(/\s+-\s+/),E=x.replace(/^from\s+/,"").split(","),k=C.replace(/^to\s+/,"").split(",");f=E.map(e=>j(g,e)),i=k.map(e=>j(y,e));if(!o&&!a||!d){if(o||a)return o&&T(e,`Added ${o} duplicate `+R(o,"target"),{append:c,before:s,ordered:[n||1<o],titles:h}),void(a&&T(e,`Removed ${a} duplicate `+R(a,"target"),{append:c,before:r,ordered:[n||1<a],titles:h}));const L=d?V:T;return L(e,"Reordered duplicate targets",{append:c,before:f,after:i,titles:h,ordered:[!0,!0]})}{var[s,r,{append:n,before:u=[],after:p=[],titles:m}]=[e,`Added ${o}, removed ${a} `+R(a,"target"),{append:c,before:f,after:i,titles:h}];s.append(A(r));const S=u.map(e=>q(e,m[e],...p.includes(e)?[]:["diff-removed"]));p.forEach((e,t,i)=>{if(!u.includes(e)){e=q(e,m[e],"diff-added");const n=i[t+1];n?(i=S.findIndex(e=>e.href===n),S.splice(i,0,e)):S.push(e)}}),s.append(N(S),...n)}}}}}else console.debug(`[${I}] missing duplicate list edit ${t} entry container`)},I="dupe-timeline-lists";const o="list-type",a="view-type",c="use-color-diffs",{alwaysUseLists:l,useColoredDiffs:e,useDiffView:s}=await new Promise(l=>{const s={useColoredDiffs:!0,alwaysUseLists:!0,useDiffView:!1},r=setTimeout(()=>l(s),3e3);unsafeWindow.addEventListener("userscript-configurer-load",async()=>{clearTimeout(r);const e=null==(i=null==(i=unsafeWindow.UserScripters)?void 0:i.Userscripts)?void 0:i.Configurer;if(!e)return console.debug(`[${I}] missing script configurer`),void l(s);const t=e.register(I);t.option(o,{items:[{label:"Always ordered",value:"always-ordered"},{label:"Only multiple",value:"only-multiple"}],def:"always-ordered",title:"List type (list view-only)",desc:"",type:"select"}),t.option(a,{items:[{label:"List view",value:"list"},{label:"Diff view",value:"diff"}],def:"list",title:"View preference",desc:"",type:"select"}),t.option(c,{def:!1,desc:"",title:"Colored diffs (diff view-only)",type:"toggle"});var i=await t.load(c,!0),n=await t.load(o,"only-multiple"),d=await t.load(a,"list");l({useColoredDiffs:i,alwaysUseLists:"always-ordered"===n,useDiffView:"diff"===d})},{once:!0})});{var t=s,i=e,n=document.createElement("style");document.head.append(n);const h=n["sheet"];if(h){const w=["ul.dupe-timeline-list { list-style: none; margin-left: 0; }","ol.dupe-timeline-list { margin-left: 1em; }",".dupe-timeline-list:last-child { margin-bottom: 0; }",`.dupe-timeline-list .diff-added,
             .dupe-timeline-list .diff-removed {
                padding-left: 1em;
            }`,`.dupe-timeline-list .diff-added:before,
             .dupe-timeline-list .diff-removed:before {
                display: inline-block;
                margin-left: -2em;
                width: 1em;
                text-align: center;
                color: var(--black-750);
            }`,'.dupe-timeline-list .diff-added:before { content: "+"; }','.dupe-timeline-list .diff-removed:before { content: "-"; }'];t&&i&&w.push(`.dupe-timeline-list a.diff-added,
                 .dupe-timeline-list a.diff-removed {
                    text-decoration: underline var(--theme-link-color);
                }`,`.dupe-timeline-list .diff-added {
                    background: var(--green-100);
                    color: var(--green-800);
                }`,`.dupe-timeline-list .diff-removed {
                    color: var(--red-800);
                    background-color: var(--red-200);
                }`),w.forEach(e=>h.insertRule(e))}else console.debug(`[${I}] missing stylesheet`)}if(location.pathname.includes("revisions")){const b=document.querySelector(".js-revisions");return b?void b.querySelectorAll(".js-revision > div").forEach(e=>{var t,[e,i]=e.children;const n=(null==(t=null==i?void 0:i.textContent)?void 0:t.trim())||"";!n.includes("duplicates list edited")||(e=(null==(t=null==e?void 0:e.textContent)?void 0:t.trim())||"")&&!Number.isNaN(+e)&&d(i,"revisions",e,l,s)}):void console.debug(`[${I}] missing revisions table`)}n=document.querySelector(".post-timeline");if(n){var r=new Set(["answered","asked","suggested","duplicates list edited","edited","rollback"]),f=[...n.rows];let e=-1;for(const x of f){(e+=1)||e%10||await(t=>new Promise(e=>setTimeout(e,t)))(500);var u,p,m,v,g,y=x["dataset"],y=y["eventtype"];"history"===y&&(y=x["cells"],[u,p,y,m,v,g]=y,"duplicates list edited"===((null==(y=null==y?void 0:y.textContent)?void 0:y.trim())||"")&&(y=((n,e,d)=>e.reduceRight((e,t,i)=>{if(i<d)return e;var[,i,t]=t.cells;if("history"!==((null==(i=null==i?void 0:i.textContent)?void 0:i.trim())||""))return e;t=(null==(i=null==t?void 0:t.textContent)?void 0:i.trim())||"";return n.has(t)?e+1:e},0))(r,f,e),d(g,"timeline",y,l,s)))}}else console.debug(`[${I}] missing timeline table`)},{once:!0});