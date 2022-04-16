import $ from 'jquery';
import Masonry from 'masonry-layout';
import jQueryBridget from 'jquery-bridget';
import imagesLoaded from 'imagesloaded';
import BaseController from './base_controller.js';

class CategoryController extends BaseController {
  constructor() {
    super();
    this.show(this.$posts.find('[data-id]'));
    const $container = this.$posts.find('.row');
    $container.imagesLoaded(() => $container.masonry());
  }
}

export default CategoryController;
