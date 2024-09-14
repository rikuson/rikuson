import Feed from "./feed.js";

describe("Feed Search Posts", () => {
  let xml;

  beforeEach(() => {
    xml = `
      <data>
        <entry>
          <title>Title</title>
          <summary>Summary</summary>
          <content>Content</content>
          <category term="Category" />
          <link>Link</link>
          <published>Published</published>
        </entry>
        <entry>
          <title>タイトル</title>
          <summary>要約</summary>
          <content>内容</content>
          <category term="カテゴリ" />
          <link>リンク</link>
          <published>執筆日</published>
        </entry>
        <entry>
          <title>Title タイトル</title>
          <summary>Summary 要約</summary>
          <content>Content 内容</content>
          <category term="Category カテゴリ" />
          <link>Link リンク</link>
          <published>Published 執筆日</published>
        </entry>
      </data>
    `;
  });

  test("should search by title, content, and category in Japanese", () => {
    const feed_ja = new Feed(xml, "ja");
    expect(feed_ja.search("タイトル")).toHaveLength(2);
    expect(feed_ja.search("内容")).toHaveLength(2);
    expect(feed_ja.search("カテゴリ")).toHaveLength(2);
  });

  test("should search by title, content, and category in English", () => {
    const feed_en = new Feed(xml, "en");
    expect(feed_en.search("Title")).toHaveLength(2);
    expect(feed_en.search("Content")).toHaveLength(2);
    expect(feed_en.search("Category")).toHaveLength(2);
  });
});
