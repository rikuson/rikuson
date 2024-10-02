import $ from 'jquery';
import 'bootstrap';
import wasm from 'tinysearch/tinysearch_engine_bg.wasm';
import '~/stylesheet/common.scss';
import '~/stylesheet/jekyll-monokai-syntax.scss';
import '~/stylesheet/jekyll-linkpreview.css';
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
    this.$loader = $('#loader').fadeIn();
  }

  async init() {
    // open external link as new tab
    $('a[href^="http"]').attr('target', '_blank');

    $('#contents table').addClass('table').wrap('<div class="table-responsive">');

    this.feed = await Feed.init(wasm);
    this.$search_box.val(this.query.get('keyword'));

    document.getElementById('search_modal')
      .addEventListener('show.bs.modal', () =>
        setTimeout(() => this.$search_box.find('input').focus(), 500)
      );

    const $auto_complete = new AutoComplete(this.feed, '#auto_complete');
    // search event
    this.$search_box.on('ready', () => {
      if (this.$search_box.val()) {
        $auto_complete.suggest(this.$search_box.val());
      } else {
        $auto_complete.hide();
      }
    });
  }

  show($elm, duration = 500) {
    $('#loader')
      .animate(
        { top: 0 },
        { queue: false, duration, complete: () => $('#loader').hide() }
      )
    $elm
      .fadeIn(duration)
      .parent()
      .css('top', 20)
      .animate(
        { top: 0 },
        { queue: false, duration }
      );
  }
}

export default BaseController;
