import $ from 'jquery';
import jQueryBridget from 'jquery-bridget';
import imagesLoaded from 'imagesloaded';
import BaseController from './base_controller.js';

jQueryBridget('imagesLoaded', imagesLoaded, $);

class PostController extends BaseController {
  constructor() {
    super();
    this.$contents.hide().imagesLoaded(() => {
      this.show(this.$contents);
    });
  }
}

export default PostController;
