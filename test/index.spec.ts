import { expect } from "chai";
import { readFileSync } from "fs";
import { JSDOM } from "jsdom";
import { normalize } from "path";

describe("Post Timeline", () => {
    const html = readFileSync("test/mocks/timeline.html", { encoding: "utf-8" });

    it("should correctly restructure duplicate lists", () => {
        const { window: { document } } = new JSDOM(html, {
            runScripts: "dangerously"
        });

        const stag = document.createElement("script");
        stag.src = `file://${normalize(process.cwd())}${normalize("/dist/modern/index.user.js")}`;
        document.body.append(stag);

        const eventLists = document.querySelectorAll(".dupe-timeline-list");

        expect(eventLists.length).to.equal(5);

        const [, , , , multiple] = eventLists;

        expect(multiple.children.length).to.equal(2);
    });
});