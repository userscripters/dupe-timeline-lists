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
// @version         1.2.0
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
window.addEventListener("load", function () { return __awaiter(void 0, void 0, void 0, function () {
    var appendStyles, clear, isAnchor, toAnchor, toSpan, toHref, toList, diffArrays, pluralise, getPostId, processEntry, scriptName, duplicateListEditAction, fromToSeparatorText, storage, store, key, alwaysUseLists, revisionsTable, timelineTable, revisionActions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                appendStyles = function () {
                    var style = document.createElement("style");
                    document.head.append(style);
                    var sheet = style.sheet;
                    if (!sheet) {
                        console.debug("[".concat(scriptName, "] missing stylesheet"));
                        return;
                    }
                    [
                        "ul.dupe-timeline-list { list-style: none; margin-left: 0; }",
                        "ol.dupe-timeline-list { margin-left: 1em; }",
                        ".dupe-timeline-list:last-child { margin-bottom: 0; }"
                    ].forEach(function (r) { return sheet.insertRule(r); });
                };
                clear = function (node) { return __spreadArray([], __read(node.children), false).forEach(function (child) { return child.remove(); }); };
                isAnchor = function (node) { return node.nodeName.toUpperCase() === "A"; };
                toAnchor = function (url, label) {
                    var anchor = document.createElement("a");
                    anchor.href = url;
                    anchor.textContent = label;
                    anchor.target = "_blank";
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
                pluralise = function (num, singular, suffix) {
                    if (suffix === void 0) { suffix = "s"; }
                    return "".concat(singular).concat(num === 1 ? "" : suffix);
                };
                getPostId = function () {
                    var pathname = location.pathname;
                    var _a = __read(/posts\/(\d+)\/(?:revisions|timeline)/.exec(pathname) || [], 2), postId = _a[1];
                    return postId;
                };
                processEntry = function (entryContainer, type, revisionNum) { return __awaiter(void 0, void 0, void 0, function () {
                    var commentContainer, childNodes, nodes, fromToSeparator, from, to, _a, added, removed, anchorTitles, addedLinks, removedLinks, numAdded, numRemoved, postId, res, page, diffNode, diffString, _b, fromStr, toStr, fromIds, toIds, idToAnchor, before_1, after_1, before_2, after_2;
                    var _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
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
                                anchorTitles = {};
                                commentContainer.querySelectorAll("a").forEach(function (_a) {
                                    var href = _a.href, textContent = _a.textContent;
                                    anchorTitles[href] = textContent || href;
                                });
                                addedLinks = added.map(function (url) { return toAnchor(url, anchorTitles[url]); });
                                removedLinks = removed.map(function (url) { return toAnchor(url, anchorTitles[url]); });
                                clear(entryContainer);
                                numAdded = addedLinks.length;
                                numRemoved = removedLinks.length;
                                if (numAdded) {
                                    entryContainer.append(toSpan("Added ".concat(numAdded, " duplicate ").concat(pluralise(numAdded, "target"))), toList(addedLinks, alwaysUseLists || numAdded > 1));
                                }
                                if (numRemoved) {
                                    entryContainer.append(toSpan("Removed ".concat(numRemoved, " duplicate ").concat(pluralise(numRemoved, "target"))), toList(removedLinks, alwaysUseLists || numRemoved > 1));
                                }
                                if (!(!numAdded && !numRemoved && revisionNum)) return [3, 3];
                                postId = getPostId();
                                if (!postId)
                                    return [2];
                                return [4, fetch("/revisions/".concat(postId, "/").concat(revisionNum))];
                            case 1:
                                res = _d.sent();
                                if (!res.ok)
                                    return [2];
                                return [4, res.text()];
                            case 2:
                                page = _d.sent();
                                diffNode = $(page)
                                    .find("[title='revision ".concat(revisionNum, "']"))
                                    .next()
                                    .contents()
                                    .get(0);
                                diffString = ((_c = diffNode === null || diffNode === void 0 ? void 0 : diffNode.textContent) === null || _c === void 0 ? void 0 : _c.trim()) || "";
                                _b = __read(diffString.split(/\s+-\s+/), 2), fromStr = _b[0], toStr = _b[1];
                                fromIds = fromStr.replace(/^from\s+/, "").split(",");
                                toIds = toStr.replace(/^to\s+/, "").split(",");
                                idToAnchor = function (id) {
                                    var expr = new RegExp("\\/".concat(id, "\\/"));
                                    var url = from.find(function (url) { return expr.test(url); });
                                    return url ? toAnchor(url, anchorTitles[url]) : id;
                                };
                                before_1 = fromIds.map(idToAnchor);
                                after_1 = toIds.map(idToAnchor);
                                entryContainer.append(toSpan("Reodered duplicate targets"), toList(before_1, true), toList(after_1, true));
                                return [2];
                            case 3:
                                if (!numAdded && !numRemoved) {
                                    before_2 = from.map(function (url) { return toAnchor(url, anchorTitles[url]); });
                                    after_2 = to.map(function (url) { return toAnchor(url, anchorTitles[url]); });
                                    entryContainer.append(toSpan("Reodered duplicate targets"), toList(before_2, true), toList(after_2, true));
                                }
                                return [2];
                        }
                    });
                }); };
                scriptName = "dupe-timeline-lists";
                duplicateListEditAction = "duplicates list edited";
                fromToSeparatorText = " to ";
                appendStyles();
                storage = Store.locateStorage();
                store = new Store.default(scriptName, storage);
                key = "always-use-lists";
                return [4, store.load(key, false)];
            case 1:
                alwaysUseLists = _a.sent();
                return [4, store.save(key, alwaysUseLists)];
            case 2:
                _a.sent();
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
                        processEntry(commentCell, "revisions", revisionNum);
                    });
                    return [2];
                }
                timelineTable = document.querySelector(".post-timeline");
                if (!timelineTable) {
                    console.debug("[".concat(scriptName, "] missing timeline table"));
                    return [2];
                }
                revisionActions = new Set(["answered", "asked", "duplicates list edited", "edited", "rollback"]);
                timelineTable.querySelectorAll("tr").forEach(function (row) {
                    var _a;
                    var dataset = row.dataset;
                    var eventtype = dataset.eventtype;
                    if (eventtype !== "history")
                        return;
                    var cells = row.cells;
                    var _b = __read(cells, 6), _dateCell = _b[0], _typeCell = _b[1], actionCell = _b[2], _authorCell = _b[3], _licenseCell = _b[4], commentCell = _b[5];
                    var action = ((_a = actionCell === null || actionCell === void 0 ? void 0 : actionCell.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "";
                    if (action !== duplicateListEditAction)
                        return;
                    var revisionNum = __spreadArray([], __read(timelineTable.rows), false).reduce(function (a, c) {
                        var _a, _b;
                        var _c = __read(c.cells, 3), _dc = _c[0], tc = _c[1], ac = _c[2];
                        var type = ((_a = tc === null || tc === void 0 ? void 0 : tc.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "";
                        if (type !== "history")
                            return a;
                        var action = ((_b = ac === null || ac === void 0 ? void 0 : ac.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || "";
                        if (!revisionActions.has(action))
                            return a;
                        return a + 1;
                    }, 0);
                    processEntry(commentCell, "timeline", revisionNum);
                });
                return [2];
        }
    });
}); }, { once: true });
