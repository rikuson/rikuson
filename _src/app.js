import Router from '~/model/router.js';

$(async () => {
  const controller_name = $('[data-controller]').data('controller');
  const router = new Router(controller_name);
  await router.controller.init();
});
