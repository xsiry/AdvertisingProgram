define(function(require) {

  var data = require('./data');
  var module = require('./module');
  module.init(data);

  // 清理 缓存
  var url = require.resolve('./main')
  delete seajs.cache[url]
  delete seajs.data.fetchedList[url]

  var url = require.resolve('./module')
  delete seajs.cache[url]
  delete seajs.data.fetchedList[url]
});
