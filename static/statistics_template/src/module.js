define(function(require, exports, module) {
  $.root_ = $('div.ibox-content');
  var manager, g, gridData;
  module.exports = {

    init: function(data) {
      gridData = data;
      f_initGrid();
      manager.loadData($.extend(true, {}, gridData));
      this._searchTools();
      this._configText();
      this._bindUI();
    },
    _configText() {
      $('div h5.mgmt_title').text('模板统计列表');
      $('div button.name_search_btn').text('查询');
    },
    _searchTools() {
      datepicker();
    },
    _bindUI: function() {
      // bind .name_search_btn
      $.root_.on("click", '.name_search_btn', function(e) {
        f_search();
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
      enabledEdit: true,
      clickToEdit: false,
      width: '100%',
      height: '91%'
    });
  };

  /*
   * 搜索
   */
  function f_search() {
    g.options.data = $.extend(true, {}, gridData);
    g.loadData(f_getWhere());
  };

  function f_getWhere() {
    if (!g) return null;
    var clause = function(rowdata, rowindex) {
      var startedAtM = getMillisecond($('.started_at').datepicker('getDate'));
      var endedAtM = getMillisecond($('.ended_at').datepicker('getDate'));
      var rowDateM = getMillisecond(new Date(rowdata.Date));
      return (rowDateM >= startedAtM && rowDateM <= endedAtM);
    };
    return clause;
  };
  /*
   * 查询控件
   */
  function datepicker() {
    $('div.input-daterange').datepicker({
      keyboardNavigation: false,
      forceParse: false,
      format: "yyyy-mm-dd",
      autoclose: true, //选中之后自动隐藏日期选择框
      clearBtn: true, //清除按钮
      todayBtn: true //今日按钮
    });
    $('.started_at').datepicker('update', new Date());
    $('.ended_at').datepicker('update', new Date());
  }

  function getMillisecond(d) {

    function p(s) {
      return s < 10 ? '0' + s : s;
    }

    //获取当前年
    var year = d.getFullYear();
    //获取当前月
    var month = d.getMonth() + 1;
    //获取当前日
    var date = d.getDate();

    var millisecond = new Date([year, p(month), p(date)].join('-')).getTime();

    return millisecond;
  }
})
