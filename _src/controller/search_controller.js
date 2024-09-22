import BaseController from './base_controller.js';

class SearchController extends BaseController {
  async init() {
    await super.init();

    const results = this.feed.search(this.query.get('keyword'));

    const $container = this.$posts.find('.row');
    $container.imagesLoaded(() => {
      this.$posts.find('[data-id]').filter(function () {
        return results.every(([_, url]) => $(this).find('a').attr('href') !== url)
      }).remove();
      this.show(this.$posts.find('[data-id]'));
      if (results.length === 0) this.show(this.$message);
      $container.masonry();
    });
  }
}

export default SearchController;
