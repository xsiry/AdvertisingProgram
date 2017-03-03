define(function(require) {

  var menus = require('./menu_data');
  var index = require('./index');
  index.init(menus);
});
