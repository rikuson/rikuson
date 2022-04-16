import $ from 'jquery';
import lunr from 'lunr';
// patch of lunr for Japanese
require('lunr-languages/lunr.stemmer.support')(lunr);
require('lunr-languages/tinyseg')(lunr);
require('lunr-languages/lunr.jp')(lunr);
require('lunr-languages/lunr.multi')(lunr);

/**
 * @example
 * var feed = new Feed();
 * $search_box.on('ready', function() {
 *   var data = feed.search($search_box.getVal());
 *   $post_list.setData(data).render();
 * })
 */
const Feed = Feed || function(xml, lang) {
  let _data;
  let _index;
  let _lang;

  function __construct(xml, lang) {
    _data = formatXmlData(xml);
    _index = lunr(function() {
      // FIXME: "multiLanguage" method doesn't work with Japanese
      // lunr.multiLanguage('en', 'jp');
      if (lang == 'ja') this.use(lunr.jp);
      this.field('title');
      this.field('category');
      this.field('content');
      _data.map(d => this.add(d));
    });
  }

  function formatXmlData(xml) {
    // get entry data
    const $entries = $(xml).find('entry');
    // jQuery.map()
    // not native Array.map()
    const $data = $entries.map(function(i) {
      return {
        id: $entries.index(this),
        title: $(this).find('title').text(),
        excerpt: $(this).find('summary').text(),
        content: $(this).find('content').text(),
        category: $(this).find('category').attr('term'),
        url: $(this).find('link').attr('href'),
        date: $(this).find('published').text(),
      };
    });
    return $.makeArray($data);
  }

  function search(keyword) {
    return _index.search(keyword).map(val => Number(val.ref) + 1);
  }

  __construct(xml, lang);

  return { search };
}

export default Feed;
