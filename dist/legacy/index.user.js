// ==UserScript==
// @author          Oleg Valter <oleg.a.valter@gmail.com>
// @description     Userscript for properly displaying duplicate lists in post timelines
// @grant           none
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
// @run-at          document-start
// @source          git+https://github.com/userscripters/dupe-timeline-lists.git
// @supportURL      https://github.com/userscripters/dupe-timeline-lists/issues
// @version         1.0.0
// ==/UserScript==

"use strict";
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
window.addEventListener("load", function () {
    var appendStyles = function () {
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
    var clear = function (node) { return __spreadArray([], __read(node.children), false).forEach(function (child) { return child.remove(); }); };
    var isAnchor = function (node) { return node.nodeName.toUpperCase() === "A"; };
    var toAnchor = function (url, label) {
        var anchor = document.createElement("a");
        anchor.href = url;
        anchor.textContent = label;
        anchor.target = "_blank";
        return anchor;
    };
    var toSpan = function (text) {
        var span = document.createElement("span");
        span.textContent = text.trim();
        return span;
    };
    var toHref = function (anchor) { return anchor.href; };
    var toList = function (nodes, ordered) {
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
    var diffArrays = function (from, to) {
        var result = { added: [], removed: [] };
        var added = result.added, removed = result.removed;
        from.forEach(function (item) { return to.includes(item) || removed.push(item); });
        to.forEach(function (item) { return from.includes(item) || added.push(item); });
        return result;
    };
    var pluralise = function (num, singular, suffix) {
        if (suffix === void 0) { suffix = "s"; }
        return "".concat(singular).concat(num === 1 ? "" : suffix);
    };
    var scriptName = "dupe-timeline-lists";
    var duplicateListEditAction = "duplicates list edited";
    var fromToSeparatorText = " to ";
    appendStyles();
    var timelineTable = document.querySelector(".post-timeline");
    if (!timelineTable) {
        console.debug("[".concat(scriptName, "] missing timeline table"));
        return;
    }
    timelineTable.querySelectorAll("tr").forEach(function (row) {
        var _a;
        var dataset = row.dataset;
        var eventtype = dataset.eventtype;
        if (eventtype !== "history")
            return;
        var cells = row.cells;
        var _b = __read(cells, 6), _dateCell = _b[0], _typeCell = _b[1], actionCell = _b[2], _authorCell = _b[3], _licenseCell = _b[4], commentCell = _b[5];
        var action = ((_a = actionCell.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "";
        if (action !== duplicateListEditAction)
            return;
        var commentContainer = commentCell.querySelector("span");
        if (!commentContainer) {
            console.debug("[".concat(scriptName, "] missing duplicate list edit timeline entry container"));
            return;
        }
        var childNodes = commentContainer.childNodes;
        var nodes = __spreadArray([], __read(childNodes), false);
        var fromToSeparator = nodes.findIndex(function (_a) {
            var textContent = _a.textContent;
            return textContent === fromToSeparatorText;
        });
        if (fromToSeparator === -1) {
            console.debug("[".concat(scriptName, "] missing from/to separator text"));
            return;
        }
        var from = nodes.slice(0, fromToSeparator).filter(isAnchor).map(toHref);
        var to = nodes.slice(fromToSeparator + 1).filter(isAnchor).map(toHref);
        var _c = diffArrays(from, to), added = _c.added, removed = _c.removed;
        var anchorTitles = {};
        commentContainer.querySelectorAll("a").forEach(function (_a) {
            var href = _a.href, textContent = _a.textContent;
            anchorTitles[href] = textContent || href;
        });
        var addedLinks = added.map(function (url) { return toAnchor(url, anchorTitles[url]); });
        var removedLinks = removed.map(function (url) { return toAnchor(url, anchorTitles[url]); });
        clear(commentCell);
        var numAdded = addedLinks.length;
        var numRemoved = removedLinks.length;
        if (numAdded) {
            commentCell.append(toSpan("Added ".concat(numAdded, " duplicate ").concat(pluralise(numAdded, "target"))), toList(addedLinks, numAdded > 1));
        }
        if (numRemoved) {
            commentCell.append(toSpan("Removed ".concat(numRemoved, " duplicate ").concat(pluralise(numRemoved, "target"))), toList(removedLinks, numRemoved > 1));
        }
    });
}, { once: true });
