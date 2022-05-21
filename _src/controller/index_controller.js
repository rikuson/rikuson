import $ from 'jquery';
import Masonry from 'masonry-layout';
import jQueryBridget from 'jquery-bridget';
import imagesLoaded from 'imagesloaded';
import BaseController from './base_controller.js';

jQueryBridget('masonry', Masonry, $);
jQueryBridget('imagesLoaded', imagesLoaded, $ );

class IndexController extends BaseController {
  constructor() {
    super();
    const duration = 500;
    const $container = this.$posts.find('.row');
    $container.imagesLoaded(() => {
      this.show(this.$posts.find('[data-id]'), duration);
      $container.masonry();
    });
  }
}

export default IndexController;
