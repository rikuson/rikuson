import Router from "./router.js";

describe("Router", () => {
  test("should use BaseController as the default controller", () => {
    const router = new Router();
    const routerControllerName = router.controller.constructor.name;
    expect(routerControllerName).toBe("BaseController");
  });

  test('should use IndexController when "index" is passed', () => {
    const router = new Router("index");
    const routerControllerName = router.controller.constructor.name;
    expect(routerControllerName).toBe("IndexController");
  });
});
