# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Build for production**: `npm run build` - Creates production bundle with Webpack
- **Start development server**: `npm start` - Starts Webpack dev server on port 8080
- **Run tests**: `npm test` - Runs Jest test suite

Note: Production build requires `NODE_OPTIONS='--openssl-legacy-provider'` for compatibility.

## Architecture

This is a Jekyll-based blog with a JavaScript frontend using an MVC pattern:

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