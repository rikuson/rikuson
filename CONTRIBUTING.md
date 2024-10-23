# How to write blog

## Getting started

Install [tinysearch](./tinysearch) to build search index.

```shell
bundle install
npm install
bundle exec jekyll build
cd tinysearch
cargo run --features=bin ../_site/index.json
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
