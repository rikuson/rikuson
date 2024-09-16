import $ from 'jquery';
import Masonry from 'masonry-layout';
import jQueryBridget from 'jquery-bridget';
import imagesLoaded from 'imagesloaded';
import BaseController from './base_controller.js';

class SearchController extends BaseController {
  constructor() {
    super();
    const $container = this.$posts.find('.row');
    $container.imagesLoaded(() => $container.masonry());
  }

  async init() {
    await super.init();
    const results = this.feed.search(this.query.keyword);
    results.map(([_, url]) => this.show(this.$posts.find(`[href^="${url}"]`).parents('.card')));
    if (results.length === 0) this.show(this.$message);
  }
}

export default SearchController;
