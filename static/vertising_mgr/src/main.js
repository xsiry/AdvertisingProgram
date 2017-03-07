define(function(require) {

  var data = require('./vertising_mgr_data');
  var module = require('./vertising_mgr');
  module.init(data);

  // 清理 缓存
  var url = require.resolve('./main')
  delete seajs.cache[url]
  delete seajs.data.fetchedList[url]

  var url = require.resolve('./vertising_mgr')
  delete seajs.cache[url]
  delete seajs.data.fetchedList[url]
});
