import Controllers from '~/controller';

class Router {
  constructor(controller_name) {
    this.controller = new Controllers[controller_name || 'base'];
  }
}

export default Router;

