type ArrayDiff<T> = { added: T[]; removed: T[]; };

type TimelineEventType =
    | "comment"
    | "history"
    | "voteaggregate";

declare const Store: typeof import("@userscripters/storage");

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

    const clear = (node: Element) => [...node.children].forEach((child) => child.remove());

    const isAnchor = (node: ChildNode | Node): node is HTMLAnchorElement => node.nodeName.toUpperCase() === "A";

    const toAnchor = (url: string, label: string): HTMLAnchorElement => {
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.textContent = label;
        anchor.target = "_blank";
        return anchor;
    };

    const toSpan = (text: string) => {
        const span = document.createElement("span");
        span.textContent = text.trim();
        return span;
    };

    const toHref = (anchor: HTMLAnchorElement): string => anchor.href;

    const toList = (nodes: Array<string | ChildNode | Node>, ordered = false): HTMLUListElement => {
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

    const diffArrays = <T>(from: T[], to: T[]): ArrayDiff<T> => {
        const result: ArrayDiff<T> = { added: [], removed: [] };

        const { added, removed } = result;

        from.forEach((item) => to.includes(item) || removed.push(item));
        to.forEach((item) => from.includes(item) || added.push(item));

        return result;
    };

    const pluralise = (num: number, singular: string, suffix = "s") => `${singular}${num === 1 ? "" : suffix}`;

    const processEntry = (entryContainer: Element, type: "revisions" | "timeline") => {
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

        const anchorTitles: Record<string, string> = {};
        commentContainer.querySelectorAll("a").forEach(({ href, textContent }) => {
            anchorTitles[href] = textContent || href;
        });

        const addedLinks = added.map((url) => toAnchor(url, anchorTitles[url]));
        const removedLinks = removed.map((url) => toAnchor(url, anchorTitles[url]));

        clear(entryContainer);

        const { length: numAdded } = addedLinks;
        const { length: numRemoved } = removedLinks;

        if (numAdded) {
            entryContainer.append(
                toSpan(`Added ${numAdded} duplicate ${pluralise(numAdded, "target")}`),
                toList(addedLinks, alwaysUseLists || numAdded > 1)
            );
        }

        if (numRemoved) {
            entryContainer.append(
                toSpan(`Removed ${numRemoved} duplicate ${pluralise(numRemoved, "target")}`),
                toList(removedLinks, alwaysUseLists || numRemoved > 1)
            );
        }
    };

    const scriptName = "dupe-timeline-lists";
    const duplicateListEditAction = "duplicates list edited";
    const fromToSeparatorText = " to ";

    appendStyles();

    const storage = Store.locateStorage();
    const store = new Store.default(scriptName, storage);

    const key = "always-use-lists";
    const alwaysUseLists = await store.load(key, false);
    await store.save(key, alwaysUseLists);

    if (location.pathname.includes("revisions")) {
        const revisionsTable = document.querySelector(".js-revisions");
        if (!revisionsTable) {
            console.debug(`[${scriptName}] missing revisions table`);
            return;
        }

        revisionsTable.querySelectorAll(".js-revision > div").forEach((row) => {
            const [_numCell, commentCell, _authorCell] = row.children;

            // there are no action types in the revisions table
            const comment = commentCell?.textContent?.trim() || "";
            if (!comment.includes("duplicates list edited")) return;

            processEntry(commentCell, "revisions");
        });

        return;
    }

    const timelineTable = document.querySelector<HTMLTableElement>(".post-timeline");
    if (!timelineTable) {
        console.debug(`[${scriptName}] missing timeline table`);
        return;
    }

    timelineTable.querySelectorAll("tr").forEach((row) => {
        const { dataset } = row;

        const { eventtype } = dataset as { eventtype?: TimelineEventType; };
        if (eventtype !== "history") return;

        const { cells } = row;

        const [_dateCell, _typeCell, actionCell, _authorCell, _licenseCell, commentCell] = cells;

        const action = actionCell?.textContent?.trim() || "";
        if (action !== duplicateListEditAction) return;

        processEntry(commentCell, "timeline");
    });

}, { once: true });