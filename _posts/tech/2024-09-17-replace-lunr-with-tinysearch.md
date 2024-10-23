---
layout: post
title: Replace Lunr with tinysearch
category: tech
image: https://rikson.imgix.net/2024-09-17-replace-lunr-with-tinysearch.jpg
tags:
---

Recently, I’ve been exploring WebAssembly (WASM) and Rust. However, as a web engineer, I often wonder how to utilize WASM effectively.

One day, while riding my bike to the convenience store, I had an idea: why not use WASM as a front-end full-text search engine?

My blog is built as a JAMstack site, hosted for free on Netlify. Since I don't want to pay for server instances, I needed a search engine that works entirely on the frontend.

Previously, I was using Lunr.js for this purpose. However, Lunr.js has known issues with Japanese, as mentioned in the following link: <https://github.com/MihaiValentin/lunr-languages/issues/45>

(Note: [^1]There appears to be a workaround now.)

[^1]: Thereって一般動詞と接続されるんだぁ。

So, I decided to replace Lunr with a WASM-based search engine. [^2]That’s when I [^3]came across [tinysearch](https://github.com/tinysearch/tinysearch), which is written in Rust.

[^2]: That's when: その時。That's whyはよく使うけど、それ以外使ってなかったなぁ。
[^3]: came across: 遭遇する, 偶然見つける

Unfortunately, Tinysearch has the same issue as Lunr. It tokenizes words based on spaces, which works for languages like English, but Japanese sentences aren’t separated by spaces.

I found a solution here: <https://qiita.com/tamurahey/items/8db20ae0b1931c96d54a>

Since the patch I found was based on an older version of tinysearch, I forked the project and created a ["japanese" branch](https://github.com/rikuson/tinysearch/tree/japanese) with [^4]the modifications.

[^4]: theって複数形にも付けれるんだっけか。

I initially tried building the project in Docker, but ran into the following warning when attempting to generate the index:

```
<jemalloc>: MADV_DONTNEED does not work (memset will be used instead)
<jemalloc>: (This is the expected behaviour if you are running under QEMU)
```

This could be related to the CPU architecture since I’m using an M1 Mac. In the end, I gave up on Docker and used Tinysearch as a Git submodule instead.

I also encounterd this error.

```
error: failed to run custom build command for `rust_icu_sys v5.0.0`
```

I resolved it by setting the environment variable like this:

```
export PkG_CONFIG_PATH=/opt/homebrew/opt/icu4u/lib/pkgconfig
```

Next, I created a workflow that generates the index file from the RSS feed before deploying it to Netlify using GitHub Actions.

```yaml
...
      - name: Build wasm
        run: |
          yq -oj ../_site/feed.xml \
            | jq '.feed.entry | map({title: .title."+content", url: .link."+@href", body: .content."+content"})' \
            | sed -e 's/<[^>]*>//g' \
            | sed -e 's/\\n//g' \
            | cargo run --features=bin /dev/stdin
        working-directory: tinysearch
...
```

This workflow generates the index file in the `wasm_output` directory. The `package.json` file [^5]then loads the index like this:

[^5]: そういえばthenを文頭・文末以外で使ってないなぁ

```json
...
  "dependencies": {
    "jquery": "^3.4.1",
    "tinysearch": "./tinysearch/wasm_output",
...
```

You can check out the full implementation in my pull request on GitHub. Since my blog is open-source:

<https://github.com/rikuson/rikuson/pull/119>
