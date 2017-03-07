define(function(require) {

  var data = require('./icon_mgr_data');
  var module = require('./icon_mgr');
  module.init(data);

    // 清理 缓存
  var url = require.resolve('./main')
  delete seajs.cache[url]
  delete seajs.data.fetchedList[url]

  var url = require.resolve('./icon_mgr')
  delete seajs.cache[url]
  delete seajs.data.fetchedList[url]
});
