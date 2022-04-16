import $ from 'jquery';
import AutoComplete from '~/model/auto_complete.js';
import Feed from '~/model/feed.js';

QUnit.test('Suggest Post Links', assert => {
  const keyword = 'foo';
  const feed = new Feed('');
  const stub = sinon.stub(feed, 'search');
  stub.withArgs(keyword).returns([1]);

  const post_url = 'http://entry.html';
  const $link = $(`<a data-id="1" href="${post_url}">article link</a>`).hide();
  const $div = $(`<div />`).append($link).hide();

  const $auto_complete = new AutoComplete(feed, $div);
  $auto_complete.suggest(keyword);

  assert.ok($link.attr('href') == `${post_url}?keyword=${keyword}`, 'Url is generated');
  assert.ok($link.css('display') != 'none', 'Link is visible');
  assert.ok($auto_complete.css('display') != 'none', 'AutoComplete is visible');
});

