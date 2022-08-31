type ArrayDiff<T> = { added: T[]; removed: T[]; };

type TimelineEventType =
    | "comment"
    | "history"
    | "voteaggregate";

interface ViewConfig {
    append: Element[];
    before?: string[];
    after?: string[];
    titles: Record<string, string>;
}

interface DiffViewConfig extends ViewConfig { }

interface ListViewConfig extends ViewConfig {
    ordered: [before?: boolean, after?: boolean];
};

interface ScriptConfig {
    useColoredDiffs: boolean,
    alwaysUseLists: boolean,
    useDiffView: boolean;
}

window.addEventListener("load", async () => {

    const appendStyles = (useDiffView: boolean, useColorDiffs: boolean) => {
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

    const clear = (node: Element) => [...node.children].forEach((child) => child.remove());

    const isAnchor = (node: ChildNode | Node): node is HTMLAnchorElement => node.nodeName.toUpperCase() === "A";

    const toAnchor = (url: string, label: string, ...classes: string[]): HTMLAnchorElement => {
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.textContent = label;
        anchor.target = "_blank";
        anchor.classList.add(...classes);
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

    const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

    const pluralise = (num: number, singular: string, suffix = "s") => `${singular}${num === 1 ? "" : suffix}`;

    const getPostId = (): string | undefined => {
        const { pathname } = location;
        // https://regex101.com/r/3OD4V9/1
        const [, postId] = /posts\/(\d+)\/(?:revisions|timeline)/.exec(pathname) || [];
        return postId;
    };

    const makeReorderDiffView = (
        container: Element,
        title: string,
        { append = [], before = [], after = [], titles }: DiffViewConfig
    ) => {
        container.append(toSpan(title));

        const diff = before.flatMap((url, idx) => {
            const newUrl = after[idx];

            if (url === newUrl) return toAnchor(url, titles[url]);

            return [
                toAnchor(url, titles[url], "diff-removed"),
                toAnchor(newUrl, titles[newUrl], "diff-added")
            ];
        });

        container.append(toList(diff), ...append);
    };

    const makeDiffView = (
        container: Element,
        title: string,
        { append = [], before = [], after = [], titles }: DiffViewConfig
    ) => {
        container.append(toSpan(title));

        const diff = before.map((url) => toAnchor(url, titles[url], ...(after.includes(url) ? [] : ["diff-removed"])));

        after.forEach((url, idx, self) => {
            if (before.includes(url)) return;

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

    const makeListView = (
        container: Element,
        title: string,
        { append = [], before, after, ordered, titles }: ListViewConfig) => {
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

    /**
     * @summary gets revision number of the current row
     * @param revisionActions actions that count as a revision
     * @param rows timeline event rows in DESC order
     * @param rowIndex index of the target row
     */
    const getRevisionNumber = (
        revisionActions: Set<string>,
        rows: HTMLTableRowElement[],
        rowIndex: number
    ) => {
        return rows.reduceRight((a, c, ci) => {
            if (ci < rowIndex) return a;

            const [_dc, tc, ac] = c.cells;

            const type = tc?.textContent?.trim() || "";
            if (type !== "history") return a;

            const action = ac?.textContent?.trim() || "";
            if (!revisionActions.has(action)) return a;

            return a + 1;
        }, 0);
    };

    /**
     * @summary formats a url from a list of links and id
     * @param links list of links to lookup the id in
     * @param id id to lookup
     */
    const hrefFromId = (links: string[], id: string) => {
        const expr = new RegExp(`\\/${id}\\/`);
        const url = links.find((url) => expr.test(url));
        return url || id;
    };

    const processEntry = async (
        entryContainer: Element,
        type: "revisions" | "timeline",
        revisionNum?: string | number,
        alwaysUseLists = false,
        useDiffView = false
    ) => {
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

        const titles: Record<string, string> = {};
        commentContainer.querySelectorAll("a").forEach(({ href, textContent }) => {
            titles[href] = textContent || href;
        });

        const { length: numAdded } = added;
        const { length: numRemoved } = removed;

        const postId = getPostId();

        if (!postId) return;

        const revLink = `/revisions/${postId}/${revisionNum}`;

        const res = await fetch(revLink);
        if (!res.ok) return;

        const revAnchorWrapper = entryContainer
            .querySelector(`[href*='${revLink}']`)
            ?.parentElement;

        const append = revAnchorWrapper ? [revAnchorWrapper] : [];

        clear(entryContainer);

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

        const before = fromIds.map((id) => hrefFromId(from, id));
        const after = toIds.map((id) => hrefFromId(to, id));

        if ((numAdded || numRemoved) && useDiffView) {
            return makeDiffView(
                entryContainer,
                `Added ${numAdded}, removed ${numRemoved} ${pluralise(numRemoved, "target")}`,
                { append, before, after, titles: titles }
            );
        }

        const reorderingTitle = "Reordered duplicate targets";

        if (numAdded || numRemoved) {
            if (numAdded) {
                makeListView(
                    entryContainer,
                    `Added ${numAdded} duplicate ${pluralise(numAdded, "target")}`,
                    {
                        append,
                        before: added,
                        ordered: [alwaysUseLists || numAdded > 1],
                        titles
                    }
                );
            }

            if (numRemoved) {
                makeListView(
                    entryContainer,
                    `Removed ${numRemoved} duplicate ${pluralise(numRemoved, "target")}`,
                    {
                        append,
                        before: removed,
                        ordered: [alwaysUseLists || numRemoved > 1],
                        titles
                    }
                );
            }

            return;
        }

        const handler = useDiffView ? makeReorderDiffView : makeListView;

        return handler(
            entryContainer,
            reorderingTitle,
            { append, before, after, titles, ordered: [true, true] }
        );
    };

    const scriptName = "dupe-timeline-lists";
    const duplicateListEditAction = "duplicates list edited";
    const fromToSeparatorText = " to ";

    const listTypeKey = "list-type";
    const viewKey = "view-type";
    const useColorDiffsKey = "use-color-diffs";

    const configuration = new Promise<ScriptConfig>((resolve) => {
        const defaultConfig: ScriptConfig = {
            useColoredDiffs: true,
            alwaysUseLists: true,
            useDiffView: false
        };

        // if we failed to load within 3 seconds, assume the configurer is missing
        const handle = setTimeout(() => resolve(defaultConfig), 3e3);

        unsafeWindow.addEventListener("userscript-configurer-load", async () => {
            // configurer reported readiness, no need to time limit now
            clearTimeout(handle);

            const configurer = unsafeWindow.UserScripters?.Userscripts?.Configurer;
            if (!configurer) {
                console.debug(`[${scriptName}] missing script configurer`);
                resolve(defaultConfig);
                return;
            }

            const script = configurer.register(scriptName, window.Store?.locateStorage());

            script.options({
                [viewKey]: {
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
                [listTypeKey]: {
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
                    disabledWhen: {
                        [viewKey]: "diff",
                    },
                    title: "List type (list view-only)",
                    desc: "",
                    type: "select",
                },
                [useColorDiffsKey]: {
                    def: false,
                    desc: "",
                    disabledWhen: {
                        [viewKey]: "list",
                    },
                    title: "Colored diffs (diff view-only)",
                    type: "toggle"
                }
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

    const {
        alwaysUseLists,
        useColoredDiffs,
        useDiffView,
    } = await configuration;

    appendStyles(useDiffView, useColoredDiffs);

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

            processEntry(commentCell, "revisions", revisionNum, alwaysUseLists, useDiffView);
        });

        return;
    }

    const timelineTable = document.querySelector<HTMLTableElement>(".post-timeline");
    if (!timelineTable) {
        console.debug(`[${scriptName}] missing timeline table`);
        return;
    }

    const revisionActions = new Set(["answered", "asked", "suggested", "duplicates list edited", "edited", "rollback"]);

    const timelineRows = [...timelineTable.rows];

    let ri = -1;
    for (const row of timelineRows) {
        ri += 1;

        // avoid hammering the /revisions/<num> page
        if (!(ri || ri % 10)) {
            await delay(500);
        }

        const { dataset } = row;

        const { eventtype } = dataset as { eventtype?: TimelineEventType; };
        if (eventtype !== "history") continue;

        const { cells } = row;

        const [_dateCell, _typeCell, actionCell, _authorCell, _licenseCell, commentCell] = cells;

        const action = actionCell?.textContent?.trim() || "";
        if (action !== duplicateListEditAction) continue;

        const revisionNum = getRevisionNumber(revisionActions, timelineRows, ri);

        processEntry(commentCell, "timeline", revisionNum, alwaysUseLists, useDiffView);
    }

}, { once: true });