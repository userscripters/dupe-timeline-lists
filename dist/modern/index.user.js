// ==UserScript==
// @author          Oleg Valter <oleg.a.valter@gmail.com>
// @description     Userscript for properly displaying duplicate lists in post timelines
// @grant           GM_deleteValue
// @grant           GM_getValue
// @grant           GM_setValue
// @homepage        https://github.com/userscripters/dupe-timeline-lists#readme
// @match           https://*.stackexchange.com/posts/*/timeline*
// @match           https://askubuntu.com/posts/*/timeline*
// @match           https://es.meta.stackoverflow.com/posts/*/timeline*
// @match           https://es.stackoverflow.com/posts/*/timeline*
// @match           https://ja.meta.stackoverflow.com/posts/*/timeline*
// @match           https://ja.stackoverflow.com/posts/*/timeline*
// @match           https://mathoverflow.net/posts/*/timeline*
// @match           https://meta.askubuntu.com/posts/*/timeline*
// @match           https://meta.mathoverflow.net/posts/*/timeline*
// @match           https://meta.serverfault.com/posts/*/timeline*
// @match           https://meta.stackoverflow.com/posts/*/timeline*
// @match           https://meta.superuser.com/posts/*/timeline*
// @match           https://pt.meta.stackoverflow.com/posts/*/timeline*
// @match           https://pt.stackoverflow.com/posts/*/timeline*
// @match           https://ru.meta.stackoverflow.com/posts/*/timeline*
// @match           https://ru.stackoverflow.com/posts/*/timeline*
// @match           https://serverfault.com/posts/*/timeline*
// @match           https://stackapps.com/posts/*/timeline*
// @match           https://stackoverflow.com/posts/*/timeline*
// @match           https://superuser.com/posts/*/timeline*
// @name            Dupe Timeline Lists
// @namespace       userscripters
// @require         https://github.com/userscripters/storage/raw/master/dist/browser.js
// @run-at          document-start
// @source          git+https://github.com/userscripters/dupe-timeline-lists.git
// @supportURL      https://github.com/userscripters/dupe-timeline-lists/issues
// @version         1.1.0
// ==/UserScript==

"use strict";
window.addEventListener("load", async () => {
    const appendStyles = () => {
        const style = document.createElement("style");
        document.head.append(style);
        const { sheet } = style;
        if (!sheet) {
            console.debug(`[${scriptName}] missing stylesheet`);
            return;
        }
        [
            "ul.dupe-timeline-list { list-style: none; margin-left: 0; }",
            "ol.dupe-timeline-list { margin-left: 1em; }",
            ".dupe-timeline-list:last-child { margin-bottom: 0; }"
        ].forEach((r) => sheet.insertRule(r));
    };
    const clear = (node) => [...node.children].forEach((child) => child.remove());
    const isAnchor = (node) => node.nodeName.toUpperCase() === "A";
    const toAnchor = (url, label) => {
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.textContent = label;
        anchor.target = "_blank";
        return anchor;
    };
    const toSpan = (text) => {
        const span = document.createElement("span");
        span.textContent = text.trim();
        return span;
    };
    const toHref = (anchor) => anchor.href;
    const toList = (nodes, ordered = false) => {
        const ul = document.createElement(ordered ? "ol" : "ul");
        ul.classList.add("dupe-timeline-list");
        const items = nodes.map((node) => {
            const li = document.createElement("li");
            li.append(node);
            return li;
        });
        ul.append(...items);
        return ul;
    };
    const diffArrays = (from, to) => {
        const result = { added: [], removed: [] };
        const { added, removed } = result;
        from.forEach((item) => to.includes(item) || removed.push(item));
        to.forEach((item) => from.includes(item) || added.push(item));
        return result;
    };
    const pluralise = (num, singular, suffix = "s") => `${singular}${num === 1 ? "" : suffix}`;
    const scriptName = "dupe-timeline-lists";
    const duplicateListEditAction = "duplicates list edited";
    const fromToSeparatorText = " to ";
    appendStyles();
    const timelineTable = document.querySelector(".post-timeline");
    if (!timelineTable) {
        console.debug(`[${scriptName}] missing timeline table`);
        return;
    }
    const storage = Store.locateStorage();
    const store = new Store.default(scriptName, storage);
    const key = "always-use-lists";
    const alwaysUseLists = await store.load(key, false);
    await store.save(key, alwaysUseLists);
    timelineTable.querySelectorAll("tr").forEach((row) => {
        var _a;
        const { dataset } = row;
        const { eventtype } = dataset;
        if (eventtype !== "history")
            return;
        const { cells } = row;
        const [_dateCell, _typeCell, actionCell, _authorCell, _licenseCell, commentCell] = cells;
        const action = ((_a = actionCell.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "";
        if (action !== duplicateListEditAction)
            return;
        const commentContainer = commentCell.querySelector("span");
        if (!commentContainer) {
            console.debug(`[${scriptName}] missing duplicate list edit timeline entry container`);
            return;
        }
        const { childNodes } = commentContainer;
        const nodes = [...childNodes];
        const fromToSeparator = nodes.findIndex(({ textContent }) => textContent === fromToSeparatorText);
        if (fromToSeparator === -1) {
            console.debug(`[${scriptName}] missing from/to separator text`);
            return;
        }
        const from = nodes.slice(0, fromToSeparator).filter(isAnchor).map(toHref);
        const to = nodes.slice(fromToSeparator + 1).filter(isAnchor).map(toHref);
        const { added, removed } = diffArrays(from, to);
        const anchorTitles = {};
        commentContainer.querySelectorAll("a").forEach(({ href, textContent }) => {
            anchorTitles[href] = textContent || href;
        });
        const addedLinks = added.map((url) => toAnchor(url, anchorTitles[url]));
        const removedLinks = removed.map((url) => toAnchor(url, anchorTitles[url]));
        clear(commentCell);
        const { length: numAdded } = addedLinks;
        const { length: numRemoved } = removedLinks;
        if (numAdded) {
            commentCell.append(toSpan(`Added ${numAdded} duplicate ${pluralise(numAdded, "target")}`), toList(addedLinks, alwaysUseLists || numAdded > 1));
        }
        if (numRemoved) {
            commentCell.append(toSpan(`Removed ${numRemoved} duplicate ${pluralise(numRemoved, "target")}`), toList(removedLinks, alwaysUseLists || numRemoved > 1));
        }
    });
}, { once: true });
