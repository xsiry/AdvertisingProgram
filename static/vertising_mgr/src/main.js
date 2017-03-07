define(function(require) {

  var data = require('./vertising_mgr_data');
  var vertising_mnt = require('./vertising_mgr');
  vertising_mnt.init(data);

  // 清理 缓存
  var url = require.resolve('./main')
  delete seajs.cache[url]
  delete seajs.data.fetchedList[url]

  var url = require.resolve('./vertising_mgr')
  delete seajs.cache[url]
  delete seajs.data.fetchedList[url]
});
