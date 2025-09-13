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

test.describe('Blog Posts - Functional Tests', () => {
  test('should have at least one post', () => {
    expect(posts.length).toBeGreaterThan(0);
  });

  // Test a sample of posts to avoid excessive test runs
  const samplePosts = posts.slice(0, 5); // Test first 5 posts for speed

  for (const post of samplePosts) {
    test(`${post.category}/${post.slug} should load successfully`, async ({ page }) => {
      await page.goto(post.url);

      // Check that the page loads (no 404)
      expect(page.url()).toContain(post.url);

      // Check for basic page structure
      await expect(page.locator('title')).not.toBeEmpty();

      // Check that there's some content on the page
      await expect(page.locator('body')).not.toBeEmpty();
    });

    test(`${post.category}/${post.slug} should have proper meta tags`, async ({ page }) => {
      await page.goto(post.url);

      // Check for title tag
      const title = await page.locator('title').textContent();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(0);

      // Check for meta description (if exists)
      const metaDescription = page.locator('meta[name="description"]');
      if ((await metaDescription.count()) > 0) {
        const description = await metaDescription.getAttribute('content');
        // Allow empty descriptions but not null
        expect(description).not.toBeNull();
      }
    });

    test(`${post.category}/${post.slug} should be accessible`, async ({ page }) => {
      await page.goto(post.url);

      // Check for proper heading structure (should have at least one heading)
      const headings = page.locator('h1, h2, h3, h4, h5, h6');
      await expect(headings.first()).toBeVisible();

      // Check that images have alt attributes (if any images exist)
      const images = page.locator('img');
      const imageCount = await images.count();

      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        // Alt can be empty string but should not be null
        expect(alt).not.toBeNull();
      }
    });
  }

  test('post URLs should follow consistent pattern', () => {
    posts.forEach((post) => {
      // Check URL pattern: /{category}/{slug}/
      expect(post.url).toMatch(new RegExp(`^/${post.category}/${post.slug}/$`));

      // Check slug format (should be date-prefixed)
      expect(post.slug).toMatch(/^\d{4}-\d{2}-\d{2}-.+/);
    });
  });

  test('should have posts in all expected categories', () => {
    const expectedCategories = ['tech', 'fitness', 'lifehack', 'music'];
    const actualCategories = [...new Set(posts.map((post) => post.category))];

    expectedCategories.forEach((category) => {
      expect(actualCategories).toContain(category);
    });
  });
});
