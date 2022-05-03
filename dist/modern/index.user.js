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
// @version         1.5.0
// ==/UserScript==

"use strict";
;
window.addEventListener("load", async () => {
    const appendStyles = (useDiffView, useColorDiffs) => {
        const style = document.createElement("style");
        document.head.append(style);
        const { sheet } = style;
        if (!sheet) {
            console.debug(`[${scriptName}] missing stylesheet`);
            return;
        }
        const rules = [
            "ul.dupe-timeline-list { list-style: none; margin-left: 0; }",
            "ol.dupe-timeline-list { margin-left: 1em; }",
            ".dupe-timeline-list:last-child { margin-bottom: 0; }",
            `.dupe-timeline-list .diff-added,
             .dupe-timeline-list .diff-removed {
                padding-left: 1em;
            }`,
            `.dupe-timeline-list .diff-added:before,
             .dupe-timeline-list .diff-removed:before {
                display: inline-block;
                margin-left: -2em;
                width: 1em;
                text-align: center;
                color: var(--black-750);
            }`,
            ".dupe-timeline-list .diff-added:before { content: \"+\"; }",
            ".dupe-timeline-list .diff-removed:before { content: \"-\"; }"
        ];
        if (useDiffView && useColorDiffs) {
            rules.push(...[
                `.dupe-timeline-list a.diff-added,
                 .dupe-timeline-list a.diff-removed {
                    text-decoration: underline var(--theme-link-color);
                }`,
                `.dupe-timeline-list .diff-added {
                    background: var(--green-100);
                    color: var(--green-800);
                }`,
                `.dupe-timeline-list .diff-removed {
                    color: var(--red-800);
                    background-color: var(--red-200);
                }`
            ]);
        }
        rules.forEach((r) => sheet.insertRule(r));
    };
    const clear = (node) => [...node.children].forEach((child) => child.remove());
    const isAnchor = (node) => node.nodeName.toUpperCase() === "A";
    const toAnchor = (url, label, ...classes) => {
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.textContent = label;
        anchor.target = "_blank";
        anchor.classList.add(...classes);
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
    const getPostId = () => {
        const { pathname } = location;
        const [, postId] = /posts\/(\d+)\/(?:revisions|timeline)/.exec(pathname) || [];
        return postId;
    };
    const makeReorderDiffView = (container, title, { before = [], after = [], titles }) => {
        container.append(toSpan(title));
        const diff = before.flatMap((url, idx) => {
            const newUrl = after[idx];
            if (url === newUrl)
                return toAnchor(url, titles[url]);
            return [
                toAnchor(url, titles[url], "diff-removed"),
                toAnchor(newUrl, titles[newUrl], "diff-added")
            ];
        });
        container.append(toList(diff));
    };
    const makeDiffView = (container, title, { before = [], after = [], titles }) => {
        container.append(toSpan(title));
        const diff = before.map((url) => toAnchor(url, titles[url], ...(after.includes(url) ? [] : ["diff-removed"])));
        after.forEach((url, idx, self) => {
            if (before.includes(url))
                return;
            const nextUrl = self[idx + 1];
            const insertAtIndex = diff.findIndex((a) => a.href === nextUrl) + 1;
            diff.splice(insertAtIndex, 0, toAnchor(url, titles[url], "diff-added"));
        });
        container.append(toList(diff));
    };
    const makeListView = (container, title, { before, after, ordered, titles }) => {
        container.append(toSpan(title));
        const [beforeOrdered, afterOrdered] = ordered;
        if (before) {
            const from = before.map((url) => toAnchor(url, titles[url]));
            container.append(toList(from, beforeOrdered));
        }
        if (after) {
            const to = after.map((url) => toAnchor(url, titles[url]));
            container.append(toList(to, afterOrdered));
        }
    };
    const processEntry = async (entryContainer, type, revisionNum, useDiffView = false) => {
        var _a;
        const commentContainer = entryContainer.querySelector("span");
        if (!commentContainer) {
            console.debug(`[${scriptName}] missing duplicate list edit ${type} entry container`);
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
        const titles = {};
        commentContainer.querySelectorAll("a").forEach(({ href, textContent }) => {
            titles[href] = textContent || href;
        });
        clear(entryContainer);
        const { length: numAdded } = added;
        const { length: numRemoved } = removed;
        if ((numAdded || numRemoved) && useDiffView) {
            return makeDiffView(entryContainer, `Added ${numAdded}, removed ${numRemoved} ${pluralise(numRemoved, "target")}`, { before: from, after: to, titles: titles });
        }
        const reorderingTitle = "Reordered duplicate targets";
        if (numAdded) {
            makeListView(entryContainer, `Added ${numAdded} duplicate ${pluralise(numAdded, "target")}`, {
                before: added,
                ordered: [alwaysUseLists || numAdded > 1],
                titles
            });
        }
        if (numRemoved) {
            makeListView(entryContainer, `Removed ${numRemoved} duplicate ${pluralise(numRemoved, "target")}`, {
                before: removed,
                ordered: [alwaysUseLists || numRemoved > 1],
                titles
            });
        }
        if (!numAdded && !numRemoved && revisionNum) {
            const postId = getPostId();
            if (!postId)
                return;
            const res = await fetch(`/revisions/${postId}/${revisionNum}`);
            if (!res.ok)
                return;
            const page = await res.text();
            const diffNode = $(page)
                .find(`[title='revision ${revisionNum}']`)
                .next()
                .contents()
                .get(0);
            const diffString = ((_a = diffNode === null || diffNode === void 0 ? void 0 : diffNode.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "";
            const [fromStr, toStr] = diffString.split(/\s+-\s+/);
            const fromIds = fromStr.replace(/^from\s+/, "").split(",");
            const toIds = toStr.replace(/^to\s+/, "").split(",");
            const toHref = (links, id) => {
                const expr = new RegExp(`\\/${id}\\/`);
                const url = links.find((url) => expr.test(url));
                return url || id;
            };
            const before = fromIds.map((id) => toHref(from, id));
            const after = toIds.map((id) => toHref(to, id));
            const handler = useDiffView ? makeReorderDiffView : makeListView;
            return handler(entryContainer, reorderingTitle, { before, after, titles, ordered: [true, true] });
        }
        const handler = useDiffView ? makeReorderDiffView : makeListView;
        return handler(entryContainer, reorderingTitle, { before: from, after: to, titles, ordered: [true, true] });
    };
    const scriptName = "dupe-timeline-lists";
    const duplicateListEditAction = "duplicates list edited";
    const fromToSeparatorText = " to ";
    const storage = Store.locateStorage();
    const store = new Store.default(scriptName, storage);
    const useListsKey = "always-use-lists";
    const useDiffKey = "use-diff-view";
    const useColorDiffsKey = "use-color-diffs";
    const alwaysUseLists = await store.load(useListsKey, false);
    const useDiffView = await store.load(useDiffKey, false);
    const useColorDiffs = await store.load(useColorDiffsKey, false);
    await store.save(useListsKey, alwaysUseLists);
    await store.save(useDiffKey, useDiffView);
    await store.save(useColorDiffsKey, useColorDiffs);
    appendStyles(useDiffView, useColorDiffs);
    if (location.pathname.includes("revisions")) {
        const revisionsTable = document.querySelector(".js-revisions");
        if (!revisionsTable) {
            console.debug(`[${scriptName}] missing revisions table`);
            return;
        }
        revisionsTable.querySelectorAll(".js-revision > div").forEach((row) => {
            var _a, _b;
            const [numCell, commentCell, _authorCell] = row.children;
            const comment = ((_a = commentCell === null || commentCell === void 0 ? void 0 : commentCell.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "";
            if (!comment.includes("duplicates list edited"))
                return;
            const revisionNum = ((_b = numCell === null || numCell === void 0 ? void 0 : numCell.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || "";
            if (!revisionNum || Number.isNaN(+revisionNum))
                return;
            processEntry(commentCell, "revisions", revisionNum, useDiffView);
        });
        return;
    }
    const timelineTable = document.querySelector(".post-timeline");
    if (!timelineTable) {
        console.debug(`[${scriptName}] missing timeline table`);
        return;
    }
    const revisionActions = new Set(["answered", "asked", "duplicates list edited", "edited", "rollback"]);
    timelineTable.querySelectorAll("tr").forEach((row) => {
        var _a;
        const { dataset } = row;
        const { eventtype } = dataset;
        if (eventtype !== "history")
            return;
        const { cells } = row;
        const [_dateCell, _typeCell, actionCell, _authorCell, _licenseCell, commentCell] = cells;
        const action = ((_a = actionCell === null || actionCell === void 0 ? void 0 : actionCell.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "";
        if (action !== duplicateListEditAction)
            return;
        const revisionNum = [...timelineTable.rows].reduce((a, c) => {
            var _a, _b;
            const [_dc, tc, ac] = c.cells;
            const type = ((_a = tc === null || tc === void 0 ? void 0 : tc.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "";
            if (type !== "history")
                return a;
            const action = ((_b = ac === null || ac === void 0 ? void 0 : ac.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || "";
            if (!revisionActions.has(action))
                return a;
            return a + 1;
        }, 0);
        processEntry(commentCell, "timeline", revisionNum, useDiffView);
    });
}, { once: true });
