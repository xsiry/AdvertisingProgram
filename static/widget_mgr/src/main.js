define(function(require) {

  var data = require('./widget_mgr_data');
  var module = require('./widget_mgr');
  module.init(data);

  // 清理 缓存
  var url = require.resolve('./main')
  delete seajs.cache[url]
  delete seajs.data.fetchedList[url]

  var url = require.resolve('./widget_mgr')
  delete seajs.cache[url]
  delete seajs.data.fetchedList[url]
});
