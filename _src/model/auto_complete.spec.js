import $ from "jquery";
import AutoComplete from "./auto_complete.js";
import Feed from "./feed.js";

describe("AutoComplete Suggest Post Links", () => {
  test("should generate URL and make elements visible", () => {
    const keyword = "foo";
    const feed = new Feed("");
    const searchStub = jest.spyOn(feed, "search").mockReturnValue([1]);

    const post_url = "http://entry.html";
    const $link = $(
      `<a data-id="1" href="${post_url}">article link</a>`,
    ).hide();
    const $div = $("<div />").append($link).hide();

    const $auto_complete = new AutoComplete(feed, $div);
    $auto_complete.suggest(keyword);

    expect($link.attr("href")).toBe(`${post_url}?keyword=${keyword}`);
    expect($link.css("display")).not.toBe("none");
    expect($auto_complete.css("display")).not.toBe("none");

    searchStub.mockRestore();
  });
});
