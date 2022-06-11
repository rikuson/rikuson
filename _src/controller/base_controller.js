import $ from 'jquery';
import 'bootstrap';
import '~/stylesheet/common.css';
import '~/stylesheet/jekyll-monokai-syntax.scss';
import '~/stylesheet/loader.scss';
import SearchBox from '~/model/search_box.js';
import Feed from '~/model/feed.js';
import AutoComplete from '~/model/auto_complete.js';

class BaseController {
  constructor() {
    this.$posts = $('#posts');
    this.$message = $('#search_message');
    this.$search_box = new SearchBox('#search_box');
    this.query = this.getQuery();
  }

  async init() {
    // open external link as new tab
    $('a[href^="http"]').attr('target', '_blank');
    const feed_url = $('[type="application/rss+xml"]').attr('href');
    const xml = await $.ajax({ url: feed_url, dataType: 'xml' });
    const lang = $('meta[http-equiv="content-language"]').attr('content');
    this.feed = new Feed(xml, lang);
    this.$search_box.val(this.query.keyword);

    const $auto_complete = new AutoComplete(this.feed, '#auto_complete');
    // search event
    this.$search_box.on('ready', () => {
      if (this.$search_box.val()) {
        $auto_complete.suggest(this.$search_box.val());
      } else {
        $auto_complete.hide();
      }
    });
    this.$search_box.on('blur', () => $auto_complete.stop().hide());
  }

  getQuery() {
    const query = { keyword: '' };
    const param_str = location.search.slice(1);
    param_str.split('&').map(str => {
      const tmp = str.split('=');
      query[tmp[0]] = decodeURI(tmp[1]);
    });
    return query;
  }

  show($elm, duration = 500) {
    $('#loader').fadeOut(duration);
    $elm
      .css('top', 20)
      .fadeIn(duration).animate(
        { top: 0 },
        { queue: false, duration: duration }
      );
  }
}

export default BaseController;

