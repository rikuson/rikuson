import $ from 'jquery';
import Feed from '~/model/feed.js';

QUnit.test('Search Posts', assert => {
  let xml = '';
  xml += '<data>';
  xml += '<entry>';
  xml += '<title>Title</title>';
  xml += '<summary>Summary</summary>';
  xml += '<content>Content</content>';
  xml += '<category term="Category" />';
  xml += '<link>Link</link>';
  xml += '<published>Published</published>';
  xml += '</entry>';
  xml += '<entry>';
  xml += '<title>タイトル</title>';
  xml += '<summary>要約</summary>';
  xml += '<content>内容</content>';
  xml += '<category term="カテゴリ" />';
  xml += '<link>リンク</link>';
  xml += '<published>執筆日</published>';
  xml += '</entry>';
  xml += '<entry>';
  xml += '<title>Title タイトル</title>';
  xml += '<summary>Summary 要約</summary>';
  xml += '<content>Content 内容</content>';
  xml += '<category term="Category カテゴリ" />';
  xml += '<link>Link リンク</link>';
  xml += '<published>Published 執筆日</published>';
  xml += '</entry>';
  xml += '</data>';
  const feed_ja = new Feed(xml, 'ja');
  assert.strictEqual(feed_ja.search('タイトル').length, 2, 'Search by title in Japanese');
  assert.strictEqual(feed_ja.search('内容').length, 2, 'Search by conten in Japaneset');
  assert.strictEqual(feed_ja.search('カテゴリ').length, 2, 'Search by categor in Japanesey');
  /* Doesn't work
   * ISSUE: https://github.com/MihaiValentin/lunr-languages/issues/45
  assert.strictEqual(feed.search('Title').length, 2, 'Search by title');
  assert.strictEqual(feed.search('Content').length, 2, 'Search by content');
  assert.strictEqual(feed.search('Category').length, 2, 'Search by category');
  */
  const feed_en = new Feed(xml, 'en');
  assert.strictEqual(feed_en.search('Title').length, 2, 'Search by title in English');
  assert.strictEqual(feed_en.search('Content').length, 2, 'Search by content in English');
  assert.strictEqual(feed_en.search('Category').length, 2, 'Search by category in English');
});
