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

test.describe('Visual Regression Tests', () => {
  // Configure viewport for consistent screenshots
  test.use({
    viewport: { width: 1280, height: 720 },
    // Disable animations for consistent screenshots
    reducedMotion: 'reduce',
  });

  test('homepage should match visual baseline', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Take full page screenshot
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('category pages should match visual baseline', async ({ page }) => {
    const categories = ['tech', 'fitness', 'lifehack', 'music'];

    for (const category of categories) {
      await page.goto(`/${category}/`);
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot(`category-${category}.png`, {
        fullPage: true,
        animations: 'disabled',
      });
    }
  });

  // Test a sample of posts from each category for visual regression
  test('sample posts should match visual baseline', async ({ page }) => {
    const samplePosts = [
      // Get first post from each category
      ...posts.filter((post) => post.category === 'tech').slice(0, 2),
      ...posts.filter((post) => post.category === 'fitness').slice(0, 1),
      ...posts.filter((post) => post.category === 'lifehack').slice(0, 1),
      ...posts.filter((post) => post.category === 'music').slice(0, 1),
    ];

    for (const post of samplePosts) {
      await page.goto(post.url);
      await page.waitForLoadState('networkidle');

      // Take screenshot of the main content area (use first match to avoid ambiguity)
      await expect(page.locator('main, article, .content').first()).toHaveScreenshot(
        `post-${post.category}-${post.slug}.png`,
        {
          animations: 'disabled',
        }
      );
    }
  });

  test('responsive design - mobile viewport', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      fullPage: true,
      animations: 'disabled',
    });

    // Test a sample post on mobile
    const samplePost = posts[0];
    await page.goto(samplePost.url);
    await page.waitForLoadState('networkidle');

    await expect(page.locator('main, article, .content').first()).toHaveScreenshot(
      `post-mobile-sample.png`,
      {
        animations: 'disabled',
      }
    );
  });

  test('responsive design - tablet viewport', async ({ page }) => {
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('homepage-tablet.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('dark mode visual comparison', async ({ page }) => {
    // Test if site supports dark mode
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Try to enable dark mode (common patterns)
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

    // If dark mode is available, take a screenshot
    if (darkModeEnabled) {
      await page.waitForTimeout(500); // Wait for theme transition
      await expect(page).toHaveScreenshot('homepage-dark.png', {
        fullPage: true,
        animations: 'disabled',
      });
    }
  });

  test('navigation and header consistency', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Screenshot just the header/navigation area
    const header = page.locator('header, nav, .navbar').first();
    if ((await header.count()) > 0) {
      await expect(header).toHaveScreenshot('navigation-header.png', {
        animations: 'disabled',
      });
    }
  });

  test('footer consistency', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Screenshot just the footer area
    const footer = page.locator('footer').first();
    if ((await footer.count()) > 0) {
      await expect(footer).toHaveScreenshot('footer.png', {
        animations: 'disabled',
      });
    }
  });
});
