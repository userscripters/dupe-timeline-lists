type ArrayDiff<T> = { added: T[]; removed: T[]; };

type TimelineEventType =
    | "comment"
    | "history"
    | "voteaggregate";

interface ListViewConfig {
    before?: Array<string | HTMLAnchorElement>,
    after?: Array<string | HTMLAnchorElement>;
    ordered: [
        before?: boolean,
        after?: boolean
    ];
};

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

    const getPostId = (): string | undefined => {
        const { pathname } = location;
        // https://regex101.com/r/3OD4V9/1
        const [, postId] = /posts\/(\d+)\/(?:revisions|timeline)/.exec(pathname) || [];
        return postId;
    };

    const makeListView = (
        container: Element,
        title: string,
        { before, after, ordered }: ListViewConfig) => {
        container.append(toSpan(title));

        const [beforeOrdered, afterOrdered] = ordered;
        if (before) container.append(toList(before, beforeOrdered));
        if (after) container.append(toList(after, afterOrdered));
    };

    const processEntry = async (entryContainer: Element, type: "revisions" | "timeline", revisionNum?: string | number) => {
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
            makeListView(
                entryContainer,
                `Added ${numAdded} duplicate ${pluralise(numAdded, "target")}`,
                {
                    before: addedLinks,
                    ordered: [alwaysUseLists || numAdded > 1]
                }
            );
        }

        if (numRemoved) {
            makeListView(
                entryContainer,
                `Removed ${numRemoved} duplicate ${pluralise(numRemoved, "target")}`,
                {
                    before: removedLinks,
                    ordered: [alwaysUseLists || numRemoved > 1]
                }
            );
        }

        if (!numAdded && !numRemoved && revisionNum) {
            const postId = getPostId();

            if (!postId) return;

            const res = await fetch(`/revisions/${postId}/${revisionNum}`);
            if (!res.ok) return;

            const page = await res.text();

            const diffNode = $(page)
                .find(`[title='revision ${revisionNum}']`)
                .next()
                .contents()
                .get(0);

            const diffString = diffNode?.textContent?.trim() || "";
            const [fromStr, toStr] = diffString.split(/\s+-\s+/);

            const fromIds = fromStr.replace(/^from\s+/, "").split(",");
            const toIds = toStr.replace(/^to\s+/, "").split(",");

            const idToAnchor = (id: string) => {
                const expr = new RegExp(`\\/${id}\\/`);
                const url = from.find((url) => expr.test(url));
                return url ? toAnchor(url, anchorTitles[url]) : id;
            };

            const before = fromIds.map(idToAnchor);
            const after = toIds.map(idToAnchor);

            makeListView(
                entryContainer,
                "Reodered duplicate targets",
                { before, after, ordered: [true, true] }
            );
            return;
        }

        if (!numAdded && !numRemoved) {
            const before = from.map((url) => toAnchor(url, anchorTitles[url]));
            const after = to.map((url) => toAnchor(url, anchorTitles[url]));

            makeListView(
                entryContainer,
                "Reodered duplicate targets",
                { before, after, ordered: [true, true] }
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
            const [numCell, commentCell, _authorCell] = row.children;

            // there are no action types in the revisions table
            const comment = commentCell?.textContent?.trim() || "";
            if (!comment.includes("duplicates list edited")) return;

            const revisionNum = numCell?.textContent?.trim() || "";
            if (!revisionNum || Number.isNaN(+revisionNum)) return;

            processEntry(commentCell, "revisions", revisionNum);
        });

        return;
    }

    const timelineTable = document.querySelector<HTMLTableElement>(".post-timeline");
    if (!timelineTable) {
        console.debug(`[${scriptName}] missing timeline table`);
        return;
    }

    const revisionActions = new Set(["answered", "asked", "duplicates list edited", "edited", "rollback"]);

    timelineTable.querySelectorAll("tr").forEach((row) => {
        const { dataset } = row;

        const { eventtype } = dataset as { eventtype?: TimelineEventType; };
        if (eventtype !== "history") return;

        const { cells } = row;

        const [_dateCell, _typeCell, actionCell, _authorCell, _licenseCell, commentCell] = cells;

        const action = actionCell?.textContent?.trim() || "";
        if (action !== duplicateListEditAction) return;

        const revisionNum = [...timelineTable.rows].reduce((a, c) => {
            const [_dc, tc, ac] = c.cells;

            const type = tc?.textContent?.trim() || "";
            if (type !== "history") return a;

            const action = ac?.textContent?.trim() || "";
            if (!revisionActions.has(action)) return a;

            return a + 1;
        }, 0);

        processEntry(commentCell, "timeline", revisionNum);
    });

}, { once: true });