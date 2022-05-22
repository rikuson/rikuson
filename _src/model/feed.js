import $ from 'jquery';

const Feed = Feed || function(xml, lang) {
  let _data;
  let _index;
  let _lang;

  function __construct(xml, lang) {
    _data = formatXmlData(xml);
  }

  function formatXmlData(xml) {
    // get entry data
    const $entries = $(xml).find('entry');
    // jQuery.map()
    // not native Array.map()
    const $data = $entries.map(function(i) {
      const url = $(this).find('link').attr('href');
      return {
        id: url.split('/').reverse().find((dir) => dir),
        title: $(this).find('title').text(),
        excerpt: $(this).find('summary').text(),
        content: $(this).find('content').text(),
        category: $(this).find('category').attr('term'),
        url: url,
        date: $(this).find('published').text(),
      };
    });
    return $.makeArray($data);
  }

  function find(id) {
    return _data.find(function(d) {
      return d.id === id;
    });
  }

  __construct(xml, lang);

  return { find };
}

export default Feed;
