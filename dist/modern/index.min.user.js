// ==UserScript==
// @name           Dupe Timeline Lists
// @author         Oleg Valter <oleg.a.valter@gmail.com>
// @description    Userscript for properly displaying duplicate lists in post timelines
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @homepage       https://github.com/userscripters/dupe-timeline-lists#readme
// @match          https://stackoverflow.com/posts/*/timeline*
// @match          https://stackoverflow.com/posts/*/revisions*
// @match          https://serverfault.com/posts/*/timeline*
// @match          https://serverfault.com/posts/*/revisions*
// @match          https://superuser.com/posts/*/timeline*
// @match          https://superuser.com/posts/*/revisions*
// @match          https://*.stackexchange.com/posts/*/timeline*
// @match          https://*.stackexchange.com/posts/*/revisions*
// @match          https://askubuntu.com/posts/*/timeline*
// @match          https://askubuntu.com/posts/*/revisions*
// @match          https://stackapps.com/posts/*/timeline*
// @match          https://stackapps.com/posts/*/revisions*
// @match          https://mathoverflow.net/posts/*/timeline*
// @match          https://mathoverflow.net/posts/*/revisions*
// @match          https://pt.stackoverflow.com/posts/*/timeline*
// @match          https://pt.stackoverflow.com/posts/*/revisions*
// @match          https://ja.stackoverflow.com/posts/*/timeline*
// @match          https://ja.stackoverflow.com/posts/*/revisions*
// @match          https://ru.stackoverflow.com/posts/*/timeline*
// @match          https://ru.stackoverflow.com/posts/*/revisions*
// @match          https://es.stackoverflow.com/posts/*/timeline*
// @match          https://es.stackoverflow.com/posts/*/revisions*
// @match          https://meta.stackoverflow.com/posts/*/timeline*
// @match          https://meta.stackoverflow.com/posts/*/revisions*
// @match          https://meta.serverfault.com/posts/*/timeline*
// @match          https://meta.serverfault.com/posts/*/revisions*
// @match          https://meta.superuser.com/posts/*/timeline*
// @match          https://meta.superuser.com/posts/*/revisions*
// @match          https://meta.askubuntu.com/posts/*/timeline*
// @match          https://meta.askubuntu.com/posts/*/revisions*
// @match          https://meta.mathoverflow.net/posts/*/timeline*
// @match          https://meta.mathoverflow.net/posts/*/revisions*
// @match          https://pt.meta.stackoverflow.com/posts/*/timeline*
// @match          https://pt.meta.stackoverflow.com/posts/*/revisions*
// @match          https://ja.meta.stackoverflow.com/posts/*/timeline*
// @match          https://ja.meta.stackoverflow.com/posts/*/revisions*
// @match          https://ru.meta.stackoverflow.com/posts/*/timeline*
// @match          https://ru.meta.stackoverflow.com/posts/*/revisions*
// @match          https://es.meta.stackoverflow.com/posts/*/timeline*
// @match          https://es.meta.stackoverflow.com/posts/*/revisions*
// @namespace      userscripters
// @require        https://raw.githubusercontent.com/userscripters/storage/master/dist/browser.js
// @run-at         document-start
// @source         git+https://github.com/userscripters/dupe-timeline-lists.git
// @supportURL     https://github.com/userscripters/dupe-timeline-lists/issues
// @version        3.0.0
// ==/UserScript==

"use strict";window.addEventListener("load",async()=>{const U=e=>"A"===e.nodeName.toUpperCase(),N=(e,t,...i)=>{const d=document.createElement("a");return d.href=e,d.textContent=t,d.target="_blank",d.classList.add(...i),d},R=e=>{const t=document.createElement("span");return t.textContent=e.trim(),t},V=e=>e.href,W=(e,t=!1)=>{const i=document.createElement(t?"ol":"ul");i.classList.add("dupe-timeline-list");t=e.map(e=>{const t=document.createElement("li");return t.append(e),t});return i.append(...t),i};const T=(e,t,i="s")=>""+t+(1===e?"":i),j=(e,t,{append:i=[],before:d=[],after:l=[],titles:n})=>{e.append(R(t));t=d.flatMap((e,t)=>{t=l[t];return e===t?N(e,n[e]):[N(e,n[e],"diff-removed"),N(t,n[t],"diff-added")]});e.append(W(t),...i)},I=(e,t,{append:i=[],before:d,after:l,ordered:n,titles:s})=>{e.append(R(t));var[t,n]=n;d&&(d=d.map(e=>N(e,s[e])),e.append(W(d,t))),l&&(d=l.map(e=>N(e,s[e])),e.append(W(d,n))),e.append(...i)};const P=(e,t)=>{const i=new RegExp(`\\/${t}\\/`);return e.find(e=>i.test(e))||t},l=async(e,t,i,d=!1,l=!1)=>{const n=e.querySelector("span");if(n){var s=n["childNodes"];const y=[...s];s=y.findIndex(({textContent:e})=>" to "===e);if(-1===s)console.debug(`[${M}] missing from/to separator text`);else{const h=y.slice(0,s).filter(U).map(V),b=y.slice(s+1).filter(U).map(V);var{added:s,removed:o}=((t,i)=>{var e={added:[],removed:[]};const{added:d,removed:l}=e;return t.forEach(e=>i.includes(e)||l.push(e)),i.forEach(e=>t.includes(e)||d.push(e)),e})(h,b);const x={};n.querySelectorAll("a").forEach(({href:e,textContent:t})=>{x[e]=t||e});var r=s["length"],a=o["length"],c=(()=>{var e=location["pathname"],[,e]=/posts\/(\d+)\/(?:revisions|timeline)/.exec(e)||[];return e})();if(c){var c=`/revisions/${c}/`+i;const C=await fetch(c);if(C.ok){var c=null==(c=e.querySelector(`[href*='${c}']`))?void 0:c.parentElement,c=c?[c]:[],f=([...e.children].forEach(e=>e.remove()),await C.text()),f=$(f).find(`[title='revision ${i}']`).next().contents().get(0);const E=(null==(i=null==f?void 0:f.textContent)?void 0:i.trim())||"",[S,k]=E.split(/\s+-\s+/),L=S.replace(/^from\s+/,"").split(","),D=k.replace(/^to\s+/,"").split(",");f=L.map(e=>P(h,e)),i=D.map(e=>P(b,e));if((r||a)&&l){var[u,p,{append:m,before:v=[],after:g=[],titles:w}]=[e,`Added ${r}, removed ${a} `+T(a,"target"),{append:c,before:f,after:i,titles:x}];u.append(R(p));const q=v.map(e=>N(e,w[e],...g.includes(e)?[]:["diff-removed"]));g.forEach((e,t,i)=>{if(!v.includes(e)){e=N(e,w[e],"diff-added");const d=i[t+1];d?(i=q.findIndex(e=>e.href===d),q.splice(i,0,e)):q.push(e)}}),u.append(W(q),...m)}else{if(!r&&!a){const A=l?j:I;return A(e,"Reordered duplicate targets",{append:c,before:f,after:i,titles:x,ordered:[!0,!0]})}r&&I(e,`Added ${r} duplicate `+T(r,"target"),{append:c,before:s,ordered:[d||1<r],titles:x}),a&&I(e,`Removed ${a} duplicate `+T(a,"target"),{append:c,before:o,ordered:[d||1<a],titles:x})}}}}}else console.debug(`[${M}] missing duplicate list edit ${t} entry container`)},M="dupe-timeline-lists";const r="list-type",a="view-type",c="use-color-diffs",{alwaysUseLists:n,useColoredDiffs:e,useDiffView:s}=await new Promise(n=>{const s={useColoredDiffs:!0,alwaysUseLists:!0,useDiffView:!1},o=setTimeout(()=>n(s),3e3);unsafeWindow.addEventListener("userscript-configurer-load",async()=>{clearTimeout(o);const e=null==(t=null==(t=unsafeWindow.UserScripters)?void 0:t.Userscripts)?void 0:t.Configurer;if(e){const l=e.register(M,null==(t=window.Store)?void 0:t.locateStorage());l.options({"view-type":{items:[{label:"List view",value:"list"},{label:"Diff view",value:"diff"}],def:"list",title:"View preference",desc:"",type:"select"},"list-type":{items:[{label:"Always ordered",value:"always-ordered"},{label:"Only multiple",value:"only-multiple"}],def:"always-ordered",disabledWhen:{"view-type":"diff"},title:"List type (list view-only)",desc:"",type:"select"},"use-color-diffs":{def:!1,desc:"",disabledWhen:{"view-type":"list"},title:"Colored diffs (diff view-only)",type:"toggle"}});var t=await l.load(c,!0),i=await l.load(r,"only-multiple"),d=await l.load(a,"list");n({useColoredDiffs:t,alwaysUseLists:"always-ordered"===i,useDiffView:"diff"===d})}else console.debug(`[${M}] missing script configurer`),n(s)},{once:!0})});{var t=s,i=e,d=document.createElement("style");document.head.append(d);const y=d["sheet"];if(y){const h=["ul.dupe-timeline-list { list-style: none; margin-left: 0; }","ol.dupe-timeline-list { margin-left: 1em; }",".dupe-timeline-list:last-child { margin-bottom: 0; }",`.dupe-timeline-list .diff-added,
             .dupe-timeline-list .diff-removed {
                padding-left: 1em;
            }`,`.dupe-timeline-list .diff-added:before,
             .dupe-timeline-list .diff-removed:before {
                display: inline-block;
                margin-left: -2em;
                width: 1em;
                text-align: center;
                color: var(--black-750);
            }`,'.dupe-timeline-list .diff-added:before { content: "+"; }','.dupe-timeline-list .diff-removed:before { content: "-"; }'];t&&i&&h.push(`.dupe-timeline-list a.diff-added,
                 .dupe-timeline-list a.diff-removed {
                    text-decoration: underline var(--theme-link-color);
                }`,`.dupe-timeline-list .diff-added {
                    background: var(--green-100);
                    color: var(--green-800);
                }`,`.dupe-timeline-list .diff-removed {
                    color: var(--red-800);
                    background-color: var(--red-200);
                }`),h.forEach(e=>y.insertRule(e))}else console.debug(`[${M}] missing stylesheet`)}if(location.pathname.includes("revisions")){const b=document.querySelector(".js-revisions");return b?void b.querySelectorAll(".js-revision > div").forEach(e=>{var t,[e,i]=e.children;const d=(null==(t=null==i?void 0:i.textContent)?void 0:t.trim())||"";!d.includes("duplicates list edited")||(e=(null==(t=null==e?void 0:e.textContent)?void 0:t.trim())||"")&&!Number.isNaN(+e)&&l(i,"revisions",e,n,s)}):void console.debug(`[${M}] missing revisions table`)}d=document.querySelector(".post-timeline");if(d){var o=new Set(["answered","asked","suggested","duplicates list edited","edited","rollback"]),f=[...d.rows];let e=-1;for(const x of f){(e+=1)||e%10||await(t=>new Promise(e=>setTimeout(e,t)))(500);var u,p,m,v,g,w=x["dataset"],w=w["eventtype"];"history"===w&&(w=x["cells"],[u,p,w,m,v,g]=w,"duplicates list edited"===((null==(w=null==w?void 0:w.textContent)?void 0:w.trim())||"")&&(w=((l,e,n)=>e.reduceRight((e,t,i)=>{var d;return!(i<n)&&([d,i,t]=t.cells,"history"===((null==(i=null==i?void 0:i.textContent)?void 0:i.trim())||"")&&(t=(null==(i=null==t?void 0:t.textContent)?void 0:i.trim())||"",l.has(t)))?e+1:e},0))(o,f,e),l(g,"timeline",w,n,s)))}}else console.debug(`[${M}] missing timeline table`)},{once:!0});