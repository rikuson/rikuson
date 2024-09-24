import $ from "jquery";
import AutoComplete from "./auto_complete.js";
import Feed from "./feed.js";

describe("AutoComplete Suggest Post Links", () => {
  test("should generate URL and make elements visible", async () => {
    const keyword = "entry";
    const title = "Entry";
    const url = "http://entry.html";
    const feed = await Feed.init("");
    const searchStub = jest.spyOn(feed, "search").mockReturnValue([[title, url]]);

    const $link = $(`<a href="${url}">${title}</a>`).hide();
    const $div = $("<div />").append($link).hide();

    const $auto_complete = new AutoComplete(feed, $div);
    $auto_complete.suggest(keyword);

    expect($link.attr("href")).toBe(`${url}/?keyword=${keyword}`);
    expect($auto_complete.css("display")).not.toBe("none");

    searchStub.mockRestore();
  });
});
