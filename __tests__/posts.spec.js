import { test, expect } from "@playwright/test";
import Sitemapper from "sitemapper";

const sitemap = new Sitemapper();

let paths = [];

test.beforeAll(async () => {
  const { sites } = await sitemap.fetch('http://localhost:8080/sitemap.xml');
  paths = sites;
});

test('Posts', async ({ page }) => {
  for (const path of paths) {
    await page.goto(path);
    await page.waitForTimeout(5000);
    await expect(page).toHaveScreenshot({ fullPage: true, mask: await page.locator('img[src$=".gif"]').all() });
  }
});
