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

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
;
window.addEventListener("load", function () { return __awaiter(void 0, void 0, void 0, function () {
    var appendStyles, clear, isAnchor, toAnchor, toSpan, toHref, toList, diffArrays, delay, pluralise, getPostId, makeReorderDiffView, makeDiffView, makeListView, getRevisionNumber, hrefFromId, processEntry, scriptName, duplicateListEditAction, fromToSeparatorText, listTypeKey, viewKey, useColorDiffsKey, configuration, _a, alwaysUseLists, useColoredDiffs, useDiffView, revisionsTable, timelineTable, revisionActions, timelineRows, ri, timelineRows_1, timelineRows_1_1, row, dataset, eventtype, cells, _b, _dateCell, _typeCell, actionCell, _authorCell, _licenseCell, commentCell, action, revisionNum, e_1_1;
    var e_1, _c;
    var _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                appendStyles = function (useDiffView, useColorDiffs) {
                    var style = document.createElement("style");
                    document.head.append(style);
                    var sheet = style.sheet;
                    if (!sheet) {
                        console.debug("[".concat(scriptName, "] missing stylesheet"));
                        return;
                    }
                    var rules = [
                        "ul.dupe-timeline-list { list-style: none; margin-left: 0; }",
                        "ol.dupe-timeline-list { margin-left: 1em; }",
                        ".dupe-timeline-list:last-child { margin-bottom: 0; }",
                        ".dupe-timeline-list .diff-added,\n             .dupe-timeline-list .diff-removed {\n                padding-left: 1em;\n            }",
                        ".dupe-timeline-list .diff-added:before,\n             .dupe-timeline-list .diff-removed:before {\n                display: inline-block;\n                margin-left: -2em;\n                width: 1em;\n                text-align: center;\n                color: var(--black-750);\n            }",
                        ".dupe-timeline-list .diff-added:before { content: \"+\"; }",
                        ".dupe-timeline-list .diff-removed:before { content: \"-\"; }"
                    ];
                    if (useDiffView && useColorDiffs) {
                        rules.push.apply(rules, [
                            ".dupe-timeline-list a.diff-added,\n                 .dupe-timeline-list a.diff-removed {\n                    text-decoration: underline var(--theme-link-color);\n                }",
                            ".dupe-timeline-list .diff-added {\n                    background: var(--green-100);\n                    color: var(--green-800);\n                }",
                            ".dupe-timeline-list .diff-removed {\n                    color: var(--red-800);\n                    background-color: var(--red-200);\n                }"
                        ]);
                    }
                    rules.forEach(function (r) { return sheet.insertRule(r); });
                };
                clear = function (node) { return __spreadArray([], __read(node.children), false).forEach(function (child) { return child.remove(); }); };
                isAnchor = function (node) { return node.nodeName.toUpperCase() === "A"; };
                toAnchor = function (url, label) {
                    var _a;
                    var classes = [];
                    for (var _i = 2; _i < arguments.length; _i++) {
                        classes[_i - 2] = arguments[_i];
                    }
                    var anchor = document.createElement("a");
                    anchor.href = url;
                    anchor.textContent = label;
                    anchor.target = "_blank";
                    (_a = anchor.classList).add.apply(_a, __spreadArray([], __read(classes), false));
                    return anchor;
                };
                toSpan = function (text) {
                    var span = document.createElement("span");
                    span.textContent = text.trim();
                    return span;
                };
                toHref = function (anchor) { return anchor.href; };
                toList = function (nodes, ordered) {
                    if (ordered === void 0) { ordered = false; }
                    var ul = document.createElement(ordered ? "ol" : "ul");
                    ul.classList.add("dupe-timeline-list");
                    var items = nodes.map(function (node) {
                        var li = document.createElement("li");
                        li.append(node);
                        return li;
                    });
                    ul.append.apply(ul, __spreadArray([], __read(items), false));
                    return ul;
                };
                diffArrays = function (from, to) {
                    var result = { added: [], removed: [] };
                    var added = result.added, removed = result.removed;
                    from.forEach(function (item) { return to.includes(item) || removed.push(item); });
                    to.forEach(function (item) { return from.includes(item) || added.push(item); });
                    return result;
                };
                delay = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
                pluralise = function (num, singular, suffix) {
                    if (suffix === void 0) { suffix = "s"; }
                    return "".concat(singular).concat(num === 1 ? "" : suffix);
                };
                getPostId = function () {
                    var pathname = location.pathname;
                    var _a = __read(/posts\/(\d+)\/(?:revisions|timeline)/.exec(pathname) || [], 2), postId = _a[1];
                    return postId;
                };
                makeReorderDiffView = function (container, title, _a) {
                    var _b = _a.append, append = _b === void 0 ? [] : _b, _c = _a.before, before = _c === void 0 ? [] : _c, _d = _a.after, after = _d === void 0 ? [] : _d, titles = _a.titles;
                    container.append(toSpan(title));
                    var diff = before.flatMap(function (url, idx) {
                        var newUrl = after[idx];
                        if (url === newUrl)
                            return toAnchor(url, titles[url]);
                        return [
                            toAnchor(url, titles[url], "diff-removed"),
                            toAnchor(newUrl, titles[newUrl], "diff-added")
                        ];
                    });
                    container.append.apply(container, __spreadArray([toList(diff)], __read(append), false));
                };
                makeDiffView = function (container, title, _a) {
                    var _b = _a.append, append = _b === void 0 ? [] : _b, _c = _a.before, before = _c === void 0 ? [] : _c, _d = _a.after, after = _d === void 0 ? [] : _d, titles = _a.titles;
                    container.append(toSpan(title));
                    var diff = before.map(function (url) { return toAnchor.apply(void 0, __spreadArray([url, titles[url]], __read((after.includes(url) ? [] : ["diff-removed"])), false)); });
                    after.forEach(function (url, idx, self) {
                        if (before.includes(url))
                            return;
                        var added = toAnchor(url, titles[url], "diff-added");
                        var nextUrl = self[idx + 1];
                        if (!nextUrl) {
                            diff.push(added);
                            return;
                        }
                        var insertAtIndex = diff.findIndex(function (a) { return a.href === nextUrl; });
                        diff.splice(insertAtIndex, 0, added);
                    });
                    container.append.apply(container, __spreadArray([toList(diff)], __read(append), false));
                };
                makeListView = function (container, title, _a) {
                    var _b = _a.append, append = _b === void 0 ? [] : _b, before = _a.before, after = _a.after, ordered = _a.ordered, titles = _a.titles;
                    container.append(toSpan(title));
                    var _c = __read(ordered, 2), beforeOrdered = _c[0], afterOrdered = _c[1];
                    if (before) {
                        var from = before.map(function (url) { return toAnchor(url, titles[url]); });
                        container.append(toList(from, beforeOrdered));
                    }
                    if (after) {
                        var to = after.map(function (url) { return toAnchor(url, titles[url]); });
                        container.append(toList(to, afterOrdered));
                    }
                    container.append.apply(container, __spreadArray([], __read(append), false));
                };
                getRevisionNumber = function (revisionActions, rows, rowIndex) {
                    return rows.reduceRight(function (a, c, ci) {
                        var _a, _b;
                        if (ci < rowIndex)
                            return a;
                        var _c = __read(c.cells, 3), _dc = _c[0], tc = _c[1], ac = _c[2];
                        var type = ((_a = tc === null || tc === void 0 ? void 0 : tc.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "";
                        if (type !== "history")
                            return a;
                        var action = ((_b = ac === null || ac === void 0 ? void 0 : ac.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || "";
                        if (!revisionActions.has(action))
                            return a;
                        return a + 1;
                    }, 0);
                };
                hrefFromId = function (links, id) {
                    var expr = new RegExp("\\/".concat(id, "\\/"));
                    var url = links.find(function (url) { return expr.test(url); });
                    return url || id;
                };
                processEntry = function (entryContainer, type, revisionNum, alwaysUseLists, useDiffView) {
                    if (alwaysUseLists === void 0) { alwaysUseLists = false; }
                    if (useDiffView === void 0) { useDiffView = false; }
                    return __awaiter(void 0, void 0, void 0, function () {
                        var commentContainer, childNodes, nodes, fromToSeparator, from, to, _a, added, removed, titles, numAdded, numRemoved, postId, revLink, res, revAnchorWrapper, append, page, diffNode, diffString, _b, fromStr, toStr, fromIds, toIds, before, after, reorderingTitle, handler;
                        var _c, _d;
                        return __generator(this, function (_e) {
                            switch (_e.label) {
                                case 0:
                                    commentContainer = entryContainer.querySelector("span");
                                    if (!commentContainer) {
                                        console.debug("[".concat(scriptName, "] missing duplicate list edit ").concat(type, " entry container"));
                                        return [2];
                                    }
                                    childNodes = commentContainer.childNodes;
                                    nodes = __spreadArray([], __read(childNodes), false);
                                    fromToSeparator = nodes.findIndex(function (_a) {
                                        var textContent = _a.textContent;
                                        return textContent === fromToSeparatorText;
                                    });
                                    if (fromToSeparator === -1) {
                                        console.debug("[".concat(scriptName, "] missing from/to separator text"));
                                        return [2];
                                    }
                                    from = nodes.slice(0, fromToSeparator).filter(isAnchor).map(toHref);
                                    to = nodes.slice(fromToSeparator + 1).filter(isAnchor).map(toHref);
                                    _a = diffArrays(from, to), added = _a.added, removed = _a.removed;
                                    titles = {};
                                    commentContainer.querySelectorAll("a").forEach(function (_a) {
                                        var href = _a.href, textContent = _a.textContent;
                                        titles[href] = textContent || href;
                                    });
                                    numAdded = added.length;
                                    numRemoved = removed.length;
                                    postId = getPostId();
                                    if (!postId)
                                        return [2];
                                    revLink = "/revisions/".concat(postId, "/").concat(revisionNum);
                                    return [4, fetch(revLink)];
                                case 1:
                                    res = _e.sent();
                                    if (!res.ok)
                                        return [2];
                                    revAnchorWrapper = (_c = entryContainer
                                        .querySelector("[href*='".concat(revLink, "']"))) === null || _c === void 0 ? void 0 : _c.parentElement;
                                    append = revAnchorWrapper ? [revAnchorWrapper] : [];
                                    clear(entryContainer);
                                    return [4, res.text()];
                                case 2:
                                    page = _e.sent();
                                    diffNode = $(page)
                                        .find("[title='revision ".concat(revisionNum, "']"))
                                        .next()
                                        .contents()
                                        .get(0);
                                    diffString = ((_d = diffNode === null || diffNode === void 0 ? void 0 : diffNode.textContent) === null || _d === void 0 ? void 0 : _d.trim()) || "";
                                    _b = __read(diffString.split(/\s+-\s+/), 2), fromStr = _b[0], toStr = _b[1];
                                    fromIds = fromStr.replace(/^from\s+/, "").split(",");
                                    toIds = toStr.replace(/^to\s+/, "").split(",");
                                    before = fromIds.map(function (id) { return hrefFromId(from, id); });
                                    after = toIds.map(function (id) { return hrefFromId(to, id); });
                                    if ((numAdded || numRemoved) && useDiffView) {
                                        return [2, makeDiffView(entryContainer, "Added ".concat(numAdded, ", removed ").concat(numRemoved, " ").concat(pluralise(numRemoved, "target")), { append: append, before: before, after: after, titles: titles })];
                                    }
                                    reorderingTitle = "Reordered duplicate targets";
                                    if (numAdded || numRemoved) {
                                        if (numAdded) {
                                            makeListView(entryContainer, "Added ".concat(numAdded, " duplicate ").concat(pluralise(numAdded, "target")), {
                                                append: append,
                                                before: added,
                                                ordered: [alwaysUseLists || numAdded > 1],
                                                titles: titles
                                            });
                                        }
                                        if (numRemoved) {
                                            makeListView(entryContainer, "Removed ".concat(numRemoved, " duplicate ").concat(pluralise(numRemoved, "target")), {
                                                append: append,
                                                before: removed,
                                                ordered: [alwaysUseLists || numRemoved > 1],
                                                titles: titles
                                            });
                                        }
                                        return [2];
                                    }
                                    handler = useDiffView ? makeReorderDiffView : makeListView;
                                    return [2, handler(entryContainer, reorderingTitle, { append: append, before: before, after: after, titles: titles, ordered: [true, true] })];
                            }
                        });
                    });
                };
                scriptName = "dupe-timeline-lists";
                duplicateListEditAction = "duplicates list edited";
                fromToSeparatorText = " to ";
                listTypeKey = "list-type";
                viewKey = "view-type";
                useColorDiffsKey = "use-color-diffs";
                configuration = new Promise(function (resolve) {
                    var defaultConfig = {
                        useColoredDiffs: true,
                        alwaysUseLists: true,
                        useDiffView: false
                    };
                    var handle = setTimeout(function () { return resolve(defaultConfig); }, 3e3);
                    unsafeWindow.addEventListener("userscript-configurer-load", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var configurer, script, useColoredDiffs, order, view, alwaysUseLists, useDiffView;
                        var _a, _b, _c;
                        var _d, _e, _f;
                        return __generator(this, function (_g) {
                            switch (_g.label) {
                                case 0:
                                    clearTimeout(handle);
                                    configurer = (_e = (_d = unsafeWindow.UserScripters) === null || _d === void 0 ? void 0 : _d.Userscripts) === null || _e === void 0 ? void 0 : _e.Configurer;
                                    if (!configurer) {
                                        console.debug("[".concat(scriptName, "] missing script configurer"));
                                        resolve(defaultConfig);
                                        return [2];
                                    }
                                    script = configurer.register(scriptName, (_f = window.Store) === null || _f === void 0 ? void 0 : _f.locateStorage());
                                    script.options((_a = {},
                                        _a[viewKey] = {
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
                                        },
                                        _a[listTypeKey] = {
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
                                            disabledWhen: (_b = {},
                                                _b[viewKey] = "diff",
                                                _b),
                                            title: "List type (list view-only)",
                                            desc: "",
                                            type: "select",
                                        },
                                        _a[useColorDiffsKey] = {
                                            def: false,
                                            desc: "",
                                            disabledWhen: (_c = {},
                                                _c[viewKey] = "list",
                                                _c),
                                            title: "Colored diffs (diff view-only)",
                                            type: "toggle"
                                        },
                                        _a));
                                    return [4, script.load(useColorDiffsKey, true)];
                                case 1:
                                    useColoredDiffs = _g.sent();
                                    return [4, script.load(listTypeKey, "only-multiple")];
                                case 2:
                                    order = _g.sent();
                                    return [4, script.load(viewKey, "list")];
                                case 3:
                                    view = _g.sent();
                                    alwaysUseLists = order === "always-ordered";
                                    useDiffView = view === "diff";
                                    resolve({
                                        useColoredDiffs: useColoredDiffs,
                                        alwaysUseLists: alwaysUseLists,
                                        useDiffView: useDiffView
                                    });
                                    return [2];
                            }
                        });
                    }); }, { once: true });
                });
                return [4, configuration];
            case 1:
                _a = _e.sent(), alwaysUseLists = _a.alwaysUseLists, useColoredDiffs = _a.useColoredDiffs, useDiffView = _a.useDiffView;
                appendStyles(useDiffView, useColoredDiffs);
                if (location.pathname.includes("revisions")) {
                    revisionsTable = document.querySelector(".js-revisions");
                    if (!revisionsTable) {
                        console.debug("[".concat(scriptName, "] missing revisions table"));
                        return [2];
                    }
                    revisionsTable.querySelectorAll(".js-revision > div").forEach(function (row) {
                        var _a, _b;
                        var _c = __read(row.children, 3), numCell = _c[0], commentCell = _c[1], _authorCell = _c[2];
                        var comment = ((_a = commentCell === null || commentCell === void 0 ? void 0 : commentCell.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "";
                        if (!comment.includes("duplicates list edited"))
                            return;
                        var revisionNum = ((_b = numCell === null || numCell === void 0 ? void 0 : numCell.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || "";
                        if (!revisionNum || Number.isNaN(+revisionNum))
                            return;
                        processEntry(commentCell, "revisions", revisionNum, alwaysUseLists, useDiffView);
                    });
                    return [2];
                }
                timelineTable = document.querySelector(".post-timeline");
                if (!timelineTable) {
                    console.debug("[".concat(scriptName, "] missing timeline table"));
                    return [2];
                }
                revisionActions = new Set(["answered", "asked", "suggested", "duplicates list edited", "edited", "rollback"]);
                timelineRows = __spreadArray([], __read(timelineTable.rows), false);
                ri = -1;
                _e.label = 2;
            case 2:
                _e.trys.push([2, 8, 9, 10]);
                timelineRows_1 = __values(timelineRows), timelineRows_1_1 = timelineRows_1.next();
                _e.label = 3;
            case 3:
                if (!!timelineRows_1_1.done) return [3, 7];
                row = timelineRows_1_1.value;
                ri += 1;
                if (!!(ri || ri % 10)) return [3, 5];
                return [4, delay(500)];
            case 4:
                _e.sent();
                _e.label = 5;
            case 5:
                dataset = row.dataset;
                eventtype = dataset.eventtype;
                if (eventtype !== "history")
                    return [3, 6];
                cells = row.cells;
                _b = __read(cells, 6), _dateCell = _b[0], _typeCell = _b[1], actionCell = _b[2], _authorCell = _b[3], _licenseCell = _b[4], commentCell = _b[5];
                action = ((_d = actionCell === null || actionCell === void 0 ? void 0 : actionCell.textContent) === null || _d === void 0 ? void 0 : _d.trim()) || "";
                if (action !== duplicateListEditAction)
                    return [3, 6];
                revisionNum = getRevisionNumber(revisionActions, timelineRows, ri);
                processEntry(commentCell, "timeline", revisionNum, alwaysUseLists, useDiffView);
                _e.label = 6;
            case 6:
                timelineRows_1_1 = timelineRows_1.next();
                return [3, 3];
            case 7: return [3, 10];
            case 8:
                e_1_1 = _e.sent();
                e_1 = { error: e_1_1 };
                return [3, 10];
            case 9:
                try {
                    if (timelineRows_1_1 && !timelineRows_1_1.done && (_c = timelineRows_1.return)) _c.call(timelineRows_1);
                }
                finally { if (e_1) throw e_1.error; }
                return [7];
            case 10: return [2];
        }
    });
}); }, { once: true });
