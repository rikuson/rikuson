import $ from 'jquery';
import jQueryBridget from 'jquery-bridget';
import imagesLoaded from 'imagesloaded';
import BaseController from './base_controller.js';

jQueryBridget('imagesLoaded', imagesLoaded, $);

class PageController extends BaseController {
  constructor() {
    super();
    this.$contents.hide().imagesLoaded(() => {
      this.show(this.$contents);
    });
  }
}

export default PageController;
