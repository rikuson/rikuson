import $ from 'jquery';

const AutoComplete = function(feed, selector) {
  let _feed;

  let _$this;
  let _$links;
  let _$submit;

  function __construct(feed, selector) {
    _feed = feed;
    _$this = $(selector);
    _$links = _$this.find('a');
    _$submit = $('#auto_complete_submit');
  }

  function suggest(keyword) {
    updateLinkQueries(keyword);
    const data = _feed.search(keyword);
    if (data.length === 0) {
      _$this.hide();
      _$submit.hide();
    } else {
      _$this.find('a').hide();
      data.forEach(([_, url]) => _$this.find(`[href^="${location.origin}${url}"]`).show());
      _$this.show();
      _$submit.show();
    }
  }

  function updateLinkQueries(keyword) {
    _$links.each(function() {
      const url = new URL($(this).attr('href'), location.origin);
      url.searchParams.set('keyword', keyword);
      $(this).attr('href', url.toString());
    });
  }

  __construct(feed, selector);

  return $.extend(_$this, { suggest });
};

export default AutoComplete;
