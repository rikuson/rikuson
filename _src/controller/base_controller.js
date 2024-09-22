import $ from 'jquery';
import 'bootstrap';
import wasm from 'tinysearch/tinysearch_engine_bg.wasm';
import '~/stylesheet/common.css';
import '~/stylesheet/jekyll-monokai-syntax.scss';
import '~/stylesheet/jekyll-linkpreview.css';
import '~/stylesheet/loader.scss';
import SearchBox from '~/model/search_box.js';
import Feed from '~/model/feed.js';
import AutoComplete from '~/model/auto_complete.js';

class BaseController {
  constructor() {
    this.$posts = $('#posts');
    this.$message = $('#search_message');
    this.$search_box = new SearchBox('#search_box');
    this.query = new URL(document.location).searchParams;
    this.$contents = $('#contents');
  }

  async init() {
    // open external link as new tab
    $('a[href^="http"]').attr('target', '_blank');
    this.feed = await Feed.init(wasm);
    this.$search_box.val(this.query.get('keyword'));

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

  show($elm, duration = 500) {
    $('#loader').fadeOut(duration);
    this.$posts
      .css('top', 20)
      .animate(
        { top: 0 },
        { queue: false, duration }
      );
    $elm.fadeIn(duration);
  }
}

export default BaseController;
