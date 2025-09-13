import { takeSnapshot } from '@chromatic-com/playwright';
import { expect, test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Get all blog posts
function getAllPosts() {
  const contentDir = path.join(process.cwd(), 'src/content');
  const posts = [];

  const categories = ['tech', 'fitness', 'lifehack', 'music'];

  categories.forEach((category) => {
    const categoryPath = path.join(contentDir, category);
    if (fs.existsSync(categoryPath)) {
      const files = fs.readdirSync(categoryPath).filter((file) => file.endsWith('.md'));
      files.forEach((file) => {
        const slug = file.replace('.md', '');
        posts.push({
          category,
          slug,
          filename: file,
          url: `/${category}/${slug}/`,
        });
      });
    }
  });

  return posts;
}

const posts = getAllPosts();

test.describe('Chromatic Visual Tests', () => {
  // Configure viewport for consistent screenshots
  test.use({
    viewport: { width: 1280, height: 720 },
    // Disable animations for consistent screenshots
    reducedMotion: 'reduce',
  });

  test('homepage visual regression with Chromatic', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Take Chromatic snapshot with metadata
    await takeSnapshot(page, 'homepage', {
      delay: 500, // Wait for any animations to settle
      diffThreshold: 0.2,
    });
  });

  test('category pages visual regression with Chromatic', async ({ page }) => {
    const categories = ['tech', 'fitness', 'lifehack', 'music'];

    for (const category of categories) {
      await page.goto(`/${category}/`);
      await page.waitForLoadState('networkidle');

      await takeSnapshot(page, `category-${category}`, {
        delay: 500,
        diffThreshold: 0.2,
        fullPage: true,
      });
    }
  });

  test('sample blog posts visual regression with Chromatic', async ({ page }) => {
    // Test representative posts from each category
    const samplePosts = [
      ...posts.filter((post) => post.category === 'tech').slice(0, 2),
      ...posts.filter((post) => post.category === 'fitness').slice(0, 1),
      ...posts.filter((post) => post.category === 'lifehack').slice(0, 1),
      ...posts.filter((post) => post.category === 'music').slice(0, 1),
    ];

    for (const post of samplePosts) {
      await page.goto(post.url);
      await page.waitForLoadState('networkidle');

      // Take snapshot of the main content area
      await takeSnapshot(page, `post-${post.category}-${post.slug}`, {
        delay: 500,
        diffThreshold: 0.2,
      });
    }
  });

  test('responsive design with Chromatic modes', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Test desktop viewport
    await takeSnapshot(page, 'homepage-responsive-desktop', {
      delay: 500,
      diffThreshold: 0.2,
    });

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await takeSnapshot(page, 'homepage-responsive-tablet', {
      delay: 500,
      diffThreshold: 0.2,
    });

    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await takeSnapshot(page, 'homepage-responsive-mobile', {
      delay: 500,
      diffThreshold: 0.2,
    });
  });

  test('component-level visual testing with Chromatic', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Test header component
    const header = page.locator('header, nav, .navbar').first();
    if ((await header.count()) > 0) {
      await takeSnapshot(page, 'header-component', {
        delay: 200,
        diffThreshold: 0.1,
      });
    }

    // Test footer component
    const footer = page.locator('footer').first();
    if ((await footer.count()) > 0) {
      await takeSnapshot(page, 'footer-component', {
        delay: 200,
        diffThreshold: 0.1,
      });
    }
  });

  test('dark mode visual testing with Chromatic', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Try to detect and enable dark mode
    const darkModeSelectors = [
      '[data-theme="dark"]',
      '.dark-mode-toggle',
      '[aria-label*="dark"]',
      '[aria-label*="theme"]',
    ];

    let darkModeEnabled = false;
    for (const selector of darkModeSelectors) {
      const element = page.locator(selector);
      if ((await element.count()) > 0) {
        await element.click();
        darkModeEnabled = true;
        break;
      }
    }

    if (darkModeEnabled) {
      await page.waitForTimeout(500); // Wait for theme transition

      await takeSnapshot(page, 'homepage-dark-mode', {
        delay: 500,
        diffThreshold: 0.2,
        fullPage: true,
      });
    }
  });

  test('cross-browser visual consistency with Chromatic', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Use browser name in the screenshot name for comparison
    const browserName = testInfo.project.name;

    await takeSnapshot(page, `homepage-${browserName}`, {
      delay: 500,
      diffThreshold: 0.2,
      fullPage: true,
    });
  });
});
