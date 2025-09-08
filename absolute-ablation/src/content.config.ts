import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: postSchema,
});

const tech = defineCollection({
	loader: glob({ base: './src/content/tech', pattern: '**/*.{md,mdx}' }),
	schema: postSchema,
});

const fitness = defineCollection({
	loader: glob({ base: './src/content/fitness', pattern: '**/*.{md,mdx}' }),
	schema: postSchema,
});

const lifehack = defineCollection({
	loader: glob({ base: './src/content/lifehack', pattern: '**/*.{md,mdx}' }),
	schema: postSchema,
});

const music = defineCollection({
	loader: glob({ base: './src/content/music', pattern: '**/*.{md,mdx}' }),
	schema: postSchema,
});

export const collections = { blog, tech, fitness, lifehack, music };
