import BaseController from './base_controller.js';

class CategoryController extends BaseController {
  constructor() {
    super();
    const $row = this.$posts.find('.row:not(#loader)');
    $row.imagesLoaded(() => {
      this.show($row.children());
      $row.masonry()
    });
  }
}

export default CategoryController;
