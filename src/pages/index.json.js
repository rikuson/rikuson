import { getCollection } from 'astro:content';
import { getCategories } from '../utils/categories';

export const prerender = true;

export async function GET() {
  // Get all posts from all categories dynamically
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

  // Convert to the expected JSON format
  const posts = sortedPosts.map((post) => {
    // Extract slug from post.id by removing date prefix (YYYY-MM-DD-)
    const slug = post.id.replace(/^\d{4}-\d{2}-\d{2}-/, '');

    return {
      title: post.data.title,
      url: `/${slug}/`,
      body: post.body,
    };
  });

  return new Response(JSON.stringify(posts, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
