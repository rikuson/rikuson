import { default as initTinySearch, search } from 'tinysearch';

export type SearchResult = [string, string];

/**
 * @example
 * const feed = await Feed.init();
 * const data = feed.search('search word');
 */
class Feed {
  static async init(): Promise<Feed> {
    await initTinySearch();
    return new Feed();
  }

  tokenize(text: string): string {
    const normalizedText = text.toLowerCase();
    const segmenter = new Intl.Segmenter('en', { granularity: 'word' });
    const iterator = segmenter.segment(normalizedText);
    const words: string[] = [];
    for (const segment of iterator) {
      words.push(segment.segment);
    }
    return words.join(' ');
  }

  search(keyword: string): SearchResult[] {
    return search(this.tokenize(keyword), 5);
  }
}

export default Feed;
