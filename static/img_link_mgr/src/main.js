define(function(require) {

  var data = require('./img_link_mgr_data');
  var img_link_mgr = require('./img_link_mgr');
  img_link_mgr.init(data);

    // 清理 缓存
  var url = require.resolve('./main')
  delete seajs.cache[url]
  delete seajs.data.fetchedList[url]

  var url = require.resolve('./img_link_mgr')
  delete seajs.cache[url]
  delete seajs.data.fetchedList[url]
});
