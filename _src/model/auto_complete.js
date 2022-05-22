import $ from 'jquery';

const AutoComplete = AutoComplete || function(feed, selector) {
  let _feed;

  let _$this;
  let _$links;

  function __construct(feed, selector) {
    _feed = feed;
    _$this = $(selector);
    _$links = _$this.find('[data-id]');
  }

  function suggest(keyword) {
    updateLinkQueries(keyword);
    $.get('https://api.github.com/search/code', {
      q: `${keyword} path:_posts repo:rikuson/rikuson`,
    }).done(function(data) {
      const items = data.items.map(function(item) {
        const id = item.name
          .replace(/^\d{4}-\d{2}-\d{2}-/, '')
          .slice(0, -3);
        return _feed.find(id);
      });
      console.log(data, items);
      if (items.length === 0) {
        _$this.hide();
      } else {
        _$this.find('[data-id]').hide();
        items.forEach(({ id }) => _$this.find(`[data-id="${id}"]`).show());
        _$this.show();
      }
    }).fail(function(xhr, status, err) {
      console.error(err);
    });
  }

  function updateLinkQueries(keyword) {
    _$links.each(function() {
      const tmp = $(this).attr('href').split('?');
      let query = tmp[1] ? queryStrToObj(tmp[1]) : {};
      query.keyword = keyword;
      $(this).attr('href', `${tmp[0]}?${objToQueryStr(query)}`);
    });
  }

  function objToQueryStr(obj) {
    let params = [];
    for (let key in obj) params.push(`${key}=${obj[key]}`);
    return params.join('&');
  }

  function queryStrToObj(str) {
    let obj = {};
    str.split('&').map(s => {
      const tmp = s.split('=');
      obj[tmp[0]] = tmp[1];
    });
    return obj;
  }

  __construct(feed, selector);

  return $.extend(_$this, { suggest });
};

export default AutoComplete;
