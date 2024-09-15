import $ from "jquery";
import { search, default as init } from 'tinysearch';
import wasm from 'tinysearch/tinysearch_engine_bg.wasm';

/**
 * @example
 * const feed = await Feed.init();
 * $search_box.on('ready', function() {
 *   const data = feed.search($search_box.getVal());
 *   $post_list.setData(data).render();
 * })
 */
class Feed {
  static init() {
    return init(wasm).then(() => new Feed());
  }

  tokenize(text) {
    text = text.toLowerCase();
    let segmenter = new Intl.Segmenter("en", { granularity: "word" });
    let iterator = segmenter.segment(text);
    let words = [];
    for (let segment of iterator) {
      words.push(segment.segment);
    }
    return words.join(" ");
  }

  search(keyword) {
    return search(this.tokenize(keyword), 5);
  }
}

export default Feed;
