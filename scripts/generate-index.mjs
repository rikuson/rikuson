#!/usr/bin/env node

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

// Simple function to get categories by reading content directories
async function getCategories() {
  const contentDir = path.join(rootDir, 'src/content');
  const entries = await fs.readdir(contentDir, { withFileTypes: true });
  return entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);
}

// Simple function to get collection posts by reading markdown files
async function getCollection(category) {
  const categoryDir = path.join(rootDir, 'src/content', category);
  
  try {
    const files = await fs.readdir(categoryDir);
    const posts = [];
    
    for (const file of files) {
      if (file.endsWith('.md') || file.endsWith('.mdx')) {
        const filePath = path.join(categoryDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        
        // Extract frontmatter and body
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
        
        if (frontmatterMatch) {
          const [, frontmatter, body] = frontmatterMatch;
          
          // Parse basic frontmatter (title and date)
          const title = frontmatter.match(/title:\s*(.+)/)?.[1]?.replace(/['"]/g, '') || 'Untitled';
          const dateMatch = frontmatter.match(/date:\s*(.+)/)?.[1];
          const pubDateMatch = frontmatter.match(/pubDate:\s*(.+)/)?.[1];
          
          const date = dateMatch || pubDateMatch || new Date(0).toISOString();
          
          posts.push({
            id: path.basename(file, path.extname(file)),
            data: {
              title,
              date: new Date(date)
            },
            body: body.trim()
          });
        }
      }
    }
    
    return posts;
  } catch (error) {
    console.warn(`Could not read category ${category}:`, error.message);
    return [];
  }
}

async function generateIndex() {
  console.log('Generating index.json...');
  
  try {
    // Get all posts from all categories
    const categories = await getCategories();
    const allPosts = [];

    for (const category of categories) {
      const posts = await getCollection(category);
      allPosts.push(...posts.map((post) => ({ ...post, category })));
    }

    // Sort posts by date (newest first)
    const sortedPosts = allPosts.sort((a, b) => {
      const dateA = a.data.date || new Date(0);
      const dateB = b.data.date || new Date(0);
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

    // Ensure tinysearch directory exists
    const tinysearchDir = path.join(rootDir, 'tinysearch');
    await fs.mkdir(tinysearchDir, { recursive: true });

    // Write index.json
    const indexPath = path.join(tinysearchDir, 'index.json');
    await fs.writeFile(indexPath, JSON.stringify(posts, null, 2));
    
    console.log(`Generated ${indexPath} with ${posts.length} posts`);
    
  } catch (error) {
    console.error('Error generating index.json:', error);
    process.exit(1);
  }
}

generateIndex();