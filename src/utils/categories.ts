import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

// Server-side function to get categories dynamically from directory structure
export async function getCategories(): Promise<string[]> {
  try {
    const contentDir = join(process.cwd(), 'src/content');
    const entries = await readdir(contentDir, { withFileTypes: true });
    const categories = entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();

    return categories;
  } catch (error) {
    console.warn('Failed to read categories from directory, using fallback:', error);
    return ['fitness', 'lifehack', 'music', 'tech'];
  }
}
