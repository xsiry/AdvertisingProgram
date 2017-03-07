define(function(require) {

  var menus = require('./menu_data');
  var module = require('./index');
  module.init(menus);
});
