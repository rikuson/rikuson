// @ts-check

import mdx from '@astrojs/mdx';
import netlify from '@astrojs/netlify';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://rikson.net',
	output: 'server',
	adapter: netlify(),
	integrations: [mdx(), sitemap(), preact({ compat: true })],
});
