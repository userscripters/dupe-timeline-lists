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

"use strict";
;
window.addEventListener("load", async () => {
    var _a;
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
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const pluralise = (num, singular, suffix = "s") => `${singular}${num === 1 ? "" : suffix}`;
    const getPostId = () => {
        const { pathname } = location;
        const [, postId] = /posts\/(\d+)\/(?:revisions|timeline)/.exec(pathname) || [];
        return postId;
    };
    const makeReorderDiffView = (container, title, { append = [], before = [], after = [], titles }) => {
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
        container.append(toList(diff), ...append);
    };
    const makeDiffView = (container, title, { append = [], before = [], after = [], titles }) => {
        container.append(toSpan(title));
        const diff = before.map((url) => toAnchor(url, titles[url], ...(after.includes(url) ? [] : ["diff-removed"])));
        after.forEach((url, idx, self) => {
            if (before.includes(url))
                return;
            const added = toAnchor(url, titles[url], "diff-added");
            const nextUrl = self[idx + 1];
            if (!nextUrl) {
                diff.push(added);
                return;
            }
            const insertAtIndex = diff.findIndex((a) => a.href === nextUrl);
            diff.splice(insertAtIndex, 0, added);
        });
        container.append(toList(diff), ...append);
    };
    const makeListView = (container, title, { append = [], before, after, ordered, titles }) => {
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
        container.append(...append);
    };
    const getRevisionNumber = (revisionActions, rows, rowIndex) => {
        return rows.reduceRight((a, c, ci) => {
            var _a, _b;
            if (ci < rowIndex)
                return a;
            const [_dc, tc, ac] = c.cells;
            const type = ((_a = tc === null || tc === void 0 ? void 0 : tc.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "";
            if (type !== "history")
                return a;
            const action = ((_b = ac === null || ac === void 0 ? void 0 : ac.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || "";
            if (!revisionActions.has(action))
                return a;
            return a + 1;
        }, 0);
    };
    const hrefFromId = (links, id) => {
        const expr = new RegExp(`\\/${id}\\/`);
        const url = links.find((url) => expr.test(url));
        return url || id;
    };
    const processEntry = async (entryContainer, type, revisionNum, alwaysUseLists = false, useDiffView = false) => {
        var _a, _b;
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
        const { length: numAdded } = added;
        const { length: numRemoved } = removed;
        const postId = getPostId();
        if (!postId)
            return;
        const revLink = `/revisions/${postId}/${revisionNum}`;
        const res = await fetch(revLink);
        if (!res.ok)
            return;
        const revAnchorWrapper = (_a = entryContainer
            .querySelector(`[href*='${revLink}']`)) === null || _a === void 0 ? void 0 : _a.parentElement;
        const append = revAnchorWrapper ? [revAnchorWrapper] : [];
        clear(entryContainer);
        const page = await res.text();
        const diffNode = $(page)
            .find(`[title='revision ${revisionNum}']`)
            .next()
            .contents()
            .get(0);
        const diffString = ((_b = diffNode === null || diffNode === void 0 ? void 0 : diffNode.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || "";
        const [fromStr, toStr] = diffString.split(/\s+-\s+/);
        const fromIds = fromStr.replace(/^from\s+/, "").split(",");
        const toIds = toStr.replace(/^to\s+/, "").split(",");
        const before = fromIds.map((id) => hrefFromId(from, id));
        const after = toIds.map((id) => hrefFromId(to, id));
        if ((numAdded || numRemoved) && useDiffView) {
            return makeDiffView(entryContainer, `Added ${numAdded}, removed ${numRemoved} ${pluralise(numRemoved, "target")}`, { append, before, after, titles: titles });
        }
        const reorderingTitle = "Reordered duplicate targets";
        if (numAdded || numRemoved) {
            if (numAdded) {
                makeListView(entryContainer, `Added ${numAdded} duplicate ${pluralise(numAdded, "target")}`, {
                    append,
                    before: added,
                    ordered: [alwaysUseLists || numAdded > 1],
                    titles
                });
            }
            if (numRemoved) {
                makeListView(entryContainer, `Removed ${numRemoved} duplicate ${pluralise(numRemoved, "target")}`, {
                    append,
                    before: removed,
                    ordered: [alwaysUseLists || numRemoved > 1],
                    titles
                });
            }
            return;
        }
        const handler = useDiffView ? makeReorderDiffView : makeListView;
        return handler(entryContainer, reorderingTitle, { append, before, after, titles, ordered: [true, true] });
    };
    const scriptName = "dupe-timeline-lists";
    const duplicateListEditAction = "duplicates list edited";
    const fromToSeparatorText = " to ";
    const listTypeKey = "list-type";
    const viewKey = "view-type";
    const useColorDiffsKey = "use-color-diffs";
    const configuration = new Promise((resolve) => {
        const defaultConfig = {
            useColoredDiffs: true,
            alwaysUseLists: true,
            useDiffView: false
        };
        const handle = setTimeout(() => resolve(defaultConfig), 3e3);
        unsafeWindow.addEventListener("userscript-configurer-load", async () => {
            var _a, _b;
            clearTimeout(handle);
            const configurer = (_b = (_a = unsafeWindow.UserScripters) === null || _a === void 0 ? void 0 : _a.Userscripts) === null || _b === void 0 ? void 0 : _b.Configurer;
            if (!configurer) {
                console.debug(`[${scriptName}] missing script configurer`);
                resolve(defaultConfig);
                return;
            }
            const script = configurer.register(scriptName);
            script.option(listTypeKey, {
                items: [
                    {
                        label: "Always ordered",
                        value: "always-ordered"
                    },
                    {
                        label: "Only multiple",
                        value: "only-multiple"
                    }
                ],
                def: "always-ordered",
                title: "List type (list view-only)",
                desc: "",
                type: "select",
            });
            script.option(viewKey, {
                items: [
                    {
                        label: "List view",
                        value: "list"
                    },
                    {
                        label: "Diff view",
                        value: "diff"
                    }
                ],
                def: "list",
                title: "View preference",
                desc: "",
                type: "select"
            });
            script.option(useColorDiffsKey, {
                def: false,
                desc: "",
                title: "Colored diffs (diff view-only)",
                type: "toggle"
            });
            const useColoredDiffs = await script.load(useColorDiffsKey, true);
            const order = await script.load(listTypeKey, "only-multiple");
            const view = await script.load(viewKey, "list");
            const alwaysUseLists = order === "always-ordered";
            const useDiffView = view === "diff";
            resolve({
                useColoredDiffs,
                alwaysUseLists,
                useDiffView
            });
        }, { once: true });
    });
    const { alwaysUseLists, useColoredDiffs, useDiffView, } = await configuration;
    appendStyles(useDiffView, useColoredDiffs);
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
            processEntry(commentCell, "revisions", revisionNum, alwaysUseLists, useDiffView);
        });
        return;
    }
    const timelineTable = document.querySelector(".post-timeline");
    if (!timelineTable) {
        console.debug(`[${scriptName}] missing timeline table`);
        return;
    }
    const revisionActions = new Set(["answered", "asked", "suggested", "duplicates list edited", "edited", "rollback"]);
    const timelineRows = [...timelineTable.rows];
    let ri = -1;
    for (const row of timelineRows) {
        ri += 1;
        if (!(ri || ri % 10)) {
            await delay(500);
        }
        const { dataset } = row;
        const { eventtype } = dataset;
        if (eventtype !== "history")
            continue;
        const { cells } = row;
        const [_dateCell, _typeCell, actionCell, _authorCell, _licenseCell, commentCell] = cells;
        const action = ((_a = actionCell === null || actionCell === void 0 ? void 0 : actionCell.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "";
        if (action !== duplicateListEditAction)
            continue;
        const revisionNum = getRevisionNumber(revisionActions, timelineRows, ri);
        processEntry(commentCell, "timeline", revisionNum, alwaysUseLists, useDiffView);
    }
}, { once: true });
