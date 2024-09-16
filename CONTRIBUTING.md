# How to write blog

## Getting started

Install [tinysearch](./tinysearch) to build search index.

```shell
bundle install
npm install
bundle exec jekyll build
cd tinysearch
yq -oj ../_site/feed.xml \
     | jq '.feed.entry | map({title: .title."+content", url: .link."+@href", body: .content."+content"})' \
     | sed -e 's/<[^>]*>//g' | sed -e 's/\\n//g' \
     | cargo run --features=bin /dev/stdin
```

## Start jekyll server

Open http://localhost:4000.

```shell
bundle exec jekyll serve --watch --verbose --trace
```

## Build jekyll

```shell
bundle exec jekyll build
```

## Watch front-end source

Open http://localhost:8080

```shell
npm start
```
