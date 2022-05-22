import $ from 'jquery';

/**
 * @example
 * let feed = new Feed(lunr);
 * $search_box.on('ready', () => {
 *   var posts = feed.search(val);
 *   $contents_box.setPostData(posts);
 * });
 */
const SearchBox = SearchBox || function(selector) {
  const DELAY_TIME = 500;
  const STANDBY_CLASS_NAME = 'fa-search';
  const READY_CLASS_NAME = 'fa-times';
  const BUSY_CLASS_NAME = 'fa-circle-o-notch';

  let _$this;
  let _$btn;
  let _$icon;
  let _$input;
  let _busy;
  let _val;
  let _inputAt;
  let _ready;

  function __construct(selector) {
    _$this = $(selector);
    _$btn = _$this.find('.search-box-btn');
    _$icon = _$btn.find('.fa');
    _$input = _$this.find('input');
    _ready = true;

    _$btn.on('click', () => {
      if (_$icon.hasClass(READY_CLASS_NAME)) {
        _$input.val('');
        _$input.focus();
      }
    });

    _$input.on('keyup', function() {
      _inputAt = new Date();
      lock();
    });
    _$input.on('focus', release);

    // Replacement of `_$input.on('blur', standby)` which disturbs `_$btn.on('click')`
    $(document).click(e => $(e.target).closest(_$this).length || standby());
  }

  function lock() {
    changeIconClassName(BUSY_CLASS_NAME);
    _$btn.attr('type', 'button');
    if (!_ready) return;
    _ready = false;
    setTimeout(function() {
      _ready = true;
      const actual = new Date();
      const expected = (function(d, ms) {
        d.setMilliseconds(d.getMilliseconds() + ms);
        return d;
      })(new Date(_inputAt.getTime()), DELAY_TIME);
      (actual > expected ? release : lock)();
    }, DELAY_TIME);
  }

  function release() {
    changeIconClassName(READY_CLASS_NAME);
    _$btn.attr('type', 'button');
    _$this.trigger('ready');
  }

  function standby() {
    _$btn.attr('type', 'submit');
    changeIconClassName(STANDBY_CLASS_NAME);
    _$this.trigger('blur');
  }

  function val(keyword) {
    if (typeof keyword === 'undefined') {
      return _$input.val();
    } else {
      _$input.val(keyword);
      return _$this;
    }
  }

  function changeIconClassName(class_name) {
    const all_class_names = [STANDBY_CLASS_NAME, READY_CLASS_NAME, BUSY_CLASS_NAME].join(' ');
    _$icon.removeClass(all_class_names).addClass(class_name);
  }

  __construct(selector);

  return $.extend(_$this, { val });
};

export default SearchBox;
