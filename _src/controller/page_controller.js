import $ from 'jquery';
import jQueryBridget from 'jquery-bridget';
import imagesLoaded from 'imagesloaded';
import BaseController from './base_controller.js';

jQueryBridget('imagesLoaded', imagesLoaded, $);

class PageController extends BaseController {
  constructor() {
    super();
    const $container = this.$contents.find('.container');
    $container.hide().imagesLoaded(() => {
      this.show($container);
    });
  }
}

export default PageController;
