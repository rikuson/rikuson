---
layout: post
title: Upgrade webpack v3 to v5
image: https://rikson.imgix.net/2024-09-30-upgrade-webpack-v3-to-v5.jpg?w=856
---

I use Webpack to bundle JavaScript and Babel to transpile it for my blog.  
I set the type in `package.json` to `"module"`.

This change broke several packages.

When I started the webpack-dev-server, I encountered the following error:

```shell
Error [ERR_REQUIRE_ESM]: require() of ES Module /Users/rikson/rikuson/webpack.config.js from /Users/rikson/rikuson/node_modules/webpack-cli/bin/utils/convert-argv.js not supported.
Instead change the require of webpack.config.js in /Users/rikson/rikuson/node_modules/webpack-cli/bin/utils/convert-argv.js to a dynamic import() which is available in all CommonJS modules.
    at WEBPACK_OPTIONS (/Users/rikson/rikuson/node_modules/webpack-cli/bin/utils/convert-argv.js:114:13)
    at requireConfig (/Users/rikson/rikuson/node_modules/webpack-cli/bin/utils/convert-argv.js:116:6)
    at /Users/rikson/rikuson/node_modules/webpack-cli/bin/utils/convert-argv.js:123:17
    at Array.forEach (<anonymous>)
    at module.exports (/Users/rikson/rikuson/node_modules/webpack-cli/bin/utils/convert-argv.js:121:15) {
  code: 'ERR_REQUIRE_ESM'
}
```

I was still using Webpack v3, so I decided to update Webpack to v5.

```shell
npm un webpack webpack-cli webpack-dev-server
npm i -D webpack webpack-cli webpack-dev-server
```

I also installed `css-minimizer-webpack-plugin` since the `minimize` option has been removed from `css-loader`.

```shell
npm i -D css-minimizer-webpack-plugin
```

Then, I encountered an error with `babel-loader`:

```shell
npm ERR! While resolving: babel-loader@7.1.5
npm ERR! Found: webpack@5.95.0
npm ERR! node_modules/webpack
npm ERR!   peer webpack@"5.x.x" from @webpack-cli/configtest@2.1.1
npm ERR!   node_modules/@webpack-cli/configtest
npm ERR!     @webpack-cli/configtest@"^2.1.1" from webpack-cli@5.1.4
npm ERR!     node_modules/webpack-cli
npm ERR!       peer webpack-cli@"5.x.x" from @webpack-cli/configtest@2.1.1
npm ERR!       3 more (@webpack-cli/info, @webpack-cli/serve, the root project)
npm ERR!   peer webpack@"5.x.x" from @webpack-cli/info@2.0.2
npm ERR!   node_modules/@webpack-cli/info
npm ERR!     @webpack-cli/info@"^2.0.2" from webpack-cli@5.1.4
npm ERR!   9 more (@webpack-cli/serve, raw-loader, terser-webpack-plugin, ...)
npm ERR! 
npm ERR! Could not resolve dependency:
npm ERR! peer webpack@"2 || 3 || 4" from babel-loader@7.1.5
npm ERR! node_modules/babel-loader
npm ERR!   dev babel-loader@"^7.1.4" from the root project
npm ERR! 
npm ERR! Conflicting peer dependency: webpack@4.47.0
npm ERR! node_modules/webpack
npm ERR!   peer webpack@"2 || 3 || 4" from babel-loader@7.1.5
npm ERR!   node_modules/babel-loader
npm ERR!     dev babel-loader@"^7.1.4" from the root project
npm ERR! 
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
```

Instead of fixing this error, I found an alternative called `esbuild-loader`, which is faster than Babel.

```shell
npm un babel-core babel-loader babel-minify-webpack-plugin babel-plugin-transform-runtime babel-preset-env
npm i -D esbuild esbuild-loader esbuild-jest
```



I also replaced Karma with Jest. I used Karma to run unit tests on real browsers, but now I use Playwright for E2E testing, and it covers everything I need.



You can check what I did in the following pull requests:

- <https://github.com/rikuson/rikuson/pull/108>
- <https://github.com/rikuson/rikuson/pull/114>
