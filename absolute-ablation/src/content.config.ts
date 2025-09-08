import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

const postSchema = ({ image }: { image: any }) =>
	z.object({
		title: z.string(),
		description: z.string().optional(),
		// Transform string to Date object
		pubDate: z.coerce.date().optional(),
		date: z.coerce.date().optional(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
		image: z.string().optional(),
		tags: z.array(z.string()).optional(),
		category: z.string().optional(),
	});

// Dynamically discover content directories
const contentDir = './src/content';
let categoryDirs: string[] = [];

try {
	categoryDirs = readdirSync(contentDir, { withFileTypes: true })
		.filter(entry => entry.isDirectory())
		.map(entry => entry.name)
		.sort();
} catch (error) {
	console.warn('Failed to read content directories, using fallback:', error);
	categoryDirs = ['tech', 'fitness', 'lifehack', 'music'];
}

// Create collections dynamically
const collections: Record<string, any> = {};

for (const category of categoryDirs) {
	collections[category] = defineCollection({
		loader: glob({ base: `./src/content/${category}`, pattern: '**/*.{md,mdx}' }),
		schema: postSchema,
	});
}

export { collections };
