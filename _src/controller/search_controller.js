import BaseController from './base_controller.js';

class SearchController extends BaseController {
  async init() {
    await super.init();

    const results = this.feed.search(this.query.get('keyword'));

    const $row = this.$posts.find('.row:not(#loader)');
    $row.imagesLoaded(() => {
      $row.children().filter(function () {
        return results.every(([_, url]) => $(this).find('a').attr('href') !== url)
      }).remove();
      this.show($row.children());
      if (results.length === 0) this.$message.show();
      $row.masonry();
    });
  }
}

export default SearchController;
