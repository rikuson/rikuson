# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` - Starts Astro dev server on port 4321
- **Build for production**: `npm run build` - Creates production build with Astro
- **Preview production build**: `npm run preview` - Preview production build
- **Format code**: `npm run format` - Format code with Biome
- **Check formatting**: `npm run format:check` - Check if code is formatted
- **Lint code**: `npm run lint` - Lint code with Biome
- **Fix linting issues**: `npm run lint:fix` - Auto-fix linting issues
- **Full check**: `npm run check` - Format and lint in one command
- **Full check and fix**: `npm run check:fix` - Format and fix linting issues

## Code Quality

- **Biome**: Used for code formatting and linting
- **Pre-commit hooks**: Automatically format code before commits using Husky and lint-staged

## Architecture

This is an Astro-based blog with Preact components:

### Frontend Architecture
- **Entry point**: `_src/app.js` - Main application entry
- **Router**: `_src/model/router.js` - Routes to controllers based on data-controller attribute
- **Controllers**: `_src/controller/` - Page-specific logic (base, index, post, search, category, page)
- **Models**: `_src/model/` - Business logic (feed, search_box, auto_complete)

### Key Components
- **Search functionality**: Uses TinySearch (Rust-based WASM) for fast client-side search
- **Build system**: Webpack with esbuild-loader for fast transpilation
- **Styling**: SCSS with Bootstrap integration
- **Content structure**: Jekyll posts in categorized directories (tech/, fitness/, lifehack/, music/)

### File Structure
- `_src/` - JavaScript source code
- `_layouts/` - Jekyll layout templates  
- `_includes/` - Jekyll include partials
- `assets/` - Generated bundle output
- `[category]/_posts/` - Markdown blog posts by category

### Testing
- Uses Jest with jsdom environment
- Tests located alongside source files (*.spec.js)
- Module alias `~` maps to `_src/` directory
- CSS/SCSS files mocked in tests

### Content Management
- Posts written in Markdown with Jekyll front matter
- Categories: tech, fitness, lifehack, music
- Automatic image detection via jekyll-auto-image plugin
- Search index generated for client-side search