import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { getCategories } from '../utils/categories';

export const prerender = true;

export async function GET(context) {
  // Get all posts from all categories
  const categories = await getCategories();
  const allPosts = [];

  for (const category of categories) {
    const posts = await getCollection(category);
    allPosts.push(...posts.map((post) => ({ ...post, category })));
  }

  // Sort posts by date (newest first)
  const sortedPosts = allPosts.sort((a, b) => {
    const dateA = a.data.date || a.data.pubDate || new Date(0);
    const dateB = b.data.date || b.data.pubDate || new Date(0);
    return dateB.valueOf() - dateA.valueOf();
  });

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: sortedPosts.map((post) => {
      // Extract slug from post.id by removing date prefix (YYYY-MM-DD-)
      const slug = post.id.replace(/^\d{4}-\d{2}-\d{2}-/, '');

      return {
        title: post.data.title,
        pubDate: post.data.date || post.data.pubDate,
        description: post.data.description || post.data.excerpt || '',
        link: `/${slug}/`,
        // Include post content if available
        content: post.body || '',
        author: post.data.author || '',
        categories: [post.category],
      };
    }),
  });
}
