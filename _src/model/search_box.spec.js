import $ from "jquery";
import SearchBox from "./search_box.js";

describe("SearchBox", () => {
  let $search_box;

  beforeEach(() => {
    let html = "";
    html += "<div>";
    html += '<input name="keyword" type="text">';
    html += '<button class="search-box-btn" type="button">';
    html += '<i class="fa fa-search"></i>';
    html += "</button>";
    html += "</div>";
    $search_box = new SearchBox(html);
    // DOMを描画しないとイベントが発生しない
    $("body").append($search_box);
  });

  afterEach(() => {
    $search_box.remove();
  });

  test("should clear input after button click", () => {
    const $input = $search_box.find("input");
    const $btn = $search_box.find(".search-box-btn");

    $input.trigger("focus");
    $input.val("Foo");
    $btn.trigger("click");

    expect($search_box.find("input").val()).toBe("");
  });
});
