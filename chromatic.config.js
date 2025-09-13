export default {
  // Chromatic project token (should be set as environment variable)
  projectToken: process.env.CHROMATIC_PROJECT_TOKEN,

  // Playwright integration configuration
  playwright: true,

  // Build configuration
  buildScriptName: 'build-storybook',

  // Only capture changes (for faster builds)
  onlyChanged: true,

  // Auto-accept approved changes
  autoAcceptChanges: 'main',

  // Skip if no changes detected
  skip: 'dependabot/**',

  // Ignore files that don't affect visual output
  externals: ['package-lock.json', '**/*.md', '.github/**', 'scripts/**'],

  // Upload source maps for better debugging
  uploadSourceMaps: true,

  // Debug mode for troubleshooting
  debug: process.env.NODE_ENV === 'development',

  // Configure Playwright test discovery
  playwrightTestFiles: ['tests/chromatic.spec.js', 'tests/visual.spec.js'],
};
