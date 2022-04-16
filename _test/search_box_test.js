import $ from 'jquery';
import SearchBox from '~/model/search_box.js';

let html = '';
html += '<div>';
html += '<input name="keyword" type="text">';
html += '<button class="search-box-btn" type="button">';
html += '<i class="fa fa-search"></i>';
html += '</button>';
html += '</div>';
const $search_box = new SearchBox(html);
// DOMを描画しないとイベントが発生しない
$('body').append($search_box);
QUnit.test('SearchBox Button Click', assert => {
  const $input = $search_box.find('input');
  const $btn = $search_box.find('.search-box-btn');
  $input.trigger('focus');
  $input.val('Foo');
  $btn.trigger('click');
  assert.ok($search_box.find('input').val() == '', 'Input is empty');
});
