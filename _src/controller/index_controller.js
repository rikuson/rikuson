import $ from 'jquery';
import Masonry from 'masonry-layout';
import jQueryBridget from 'jquery-bridget';
import imagesLoaded from 'imagesloaded';
import BaseController from './base_controller.js';

jQueryBridget('masonry', Masonry, $);
jQueryBridget('imagesLoaded', imagesLoaded, $);

class IndexController extends BaseController {
  constructor() {
    super();
    const $row = this.$posts.find('.row');
    $row.imagesLoaded(() => {
      this.show($row.children());
      $row.masonry();
    });
  }
}

export default IndexController;
