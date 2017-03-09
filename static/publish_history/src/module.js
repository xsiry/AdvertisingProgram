define(function(require, exports, module) {
  $.root_ = $('div.ibox-content');
  var manager, g, gridData;
  module.exports = {

    init: function(data) {
      gridData = data;
      f_initGrid();
      manager.loadData($.extend(true, {}, gridData));
      this._configText();
      this._bindUI();
    },
    _configText() {
      $('div h5.mgmt_title').text('发布历史列表');
      $('div input.name_search').prop('placeholder', '输入配置名称关键字..');
      $('div button.name_search_btn').text('搜索');
    },
    _bindUI: function() {
      // bind .name_search_btn
      $.root_.on("click", '.name_search_btn', function(e) {
          f_search();
        })
        // bind .name_search
      $.root_.on("keypress", '.name_search', function(e) {
          if (e.which == "13") f_search();
        })
        // bind .name_search val.length is 0
      $.root_.on('input propertychange', '.name_search', function(e) {
          if ($('.name_search').val().length == 0) f_search();
        })
    }
  };

  // Helpers
  /*
   * 生成Grid
   */
  function f_initGrid() {
    var c = require('./columns');
    g = manager = $("div.listDiv").ligerGrid({
      columns: c,
      onSelectRow: function(rowdata, rowindex) {
        $("#txtrowindex").val(rowindex);
      },
      enabledEdit: false,
      clickToEdit: false,
      width: '100%',
      height: '91%'
    });
  };

  /*
   * 搜索
   */
  function f_search(options) {
    g.options.data = $.extend(true, {}, gridData);
    g.loadData(f_getWhere(options));
  };

  function f_getWhere(options) {
    if (!g) return null;

    var clause = function(rowdata, rowindex) {
      var key = $(".name_search").val();
      return rowdata.Name.indexOf(key) > -1;
    };
    return clause;
  };
})
