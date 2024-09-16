import Feed from "./feed.js";

describe("Feed Search Posts", () => {
  test("should search by title and content", async () => {
    const title = "Title";
    const url = "http://entry.html";
    const body = "Content";
    const feed = await Feed.init("");
    expect(feed.search(title)).toEqual([[title, url, body]]);
    expect(feed.search(body)).toEqual([[title, url, body]]);
  });
});
