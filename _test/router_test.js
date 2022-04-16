import $ from 'jquery';
import Router from '~/model/router.js';

QUnit.test('Route', assert => {
  const router = new Router();
  const router_controller_name = router.controller.constructor.name;
  assert.ok(router_controller_name == 'BaseController', 'Check default controller');
});

QUnit.test('Route', assert => {
  const router = new Router('index');
  const router_controller_name = router.controller.constructor.name;
  assert.ok(router_controller_name == 'IndexController', 'Check index controller');
});
