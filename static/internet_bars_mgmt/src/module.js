define(function(require, exports, module) {
  $.root_ = $('div.ibox-content');
  var manager, g, gridData;
  module.exports = {

    init: function(data) {
      gridData = data;
      f_initGrid();
      initCombo();
      manager.loadData($.extend(true, {}, gridData));
      this._configText();
      this._bindUI();
    },
    _configText() {
      $('div h5.mgmt_title').text('网吧列表');
      $('div button font.mgmt_new_btn').text('新建图标广告');
      $('div input.name_search').prop('placeholder', '输入网吧名称关键字..');
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
        // bind
      $("select.select_config").chosen().change(function(e, o, v) {
        var configTemplate = o.selected;
        f_search({ 'configTemplate': configTemplate });
      });
    }
  };

  // Helpers
  /*
   * 生成Grid
   */
  function f_initGrid() {
    var c = require('./columns');
    g = manager = $("div.listDiv").ligerGrid({
      checkbox: true,
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
   * 搜索广告
   */
  function f_search(options) {
    g.options.data = $.extend(true, {}, gridData);
    g.loadData(f_getWhere(options));
  };

  function f_getWhere(options) {
    if (!g) return null;

    var clause = function(rowdata, rowindex) {
      var key = $(".name_search").val();
      var name = rowdata.Name.indexOf(key) > -1;
      // var
      return name;
    };
    return clause;
  };

  function applyRow(rowid) {
    swal({
      title: '确定上架?',
      text: '上架后，广告“' + g.getRow(rowid).Name + '”将可以进行投放',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: '上架!',
      cancelButtonText: '取消'
    }).then(function() {
      swal(
        '上架成功!',
        '广告“' + g.getRow(rowid).Name + '”上架成功.',
        'success'
      )
    }, function(dismiss) {
      if (dismiss === 'cancel') {
        swal(
          '已取消',
          '广告“' + g.getRow(rowid).Name + '”未上架 :)',
          'error'
        )
      }
    })
  };

  function noApplyRow(rowid) {
    swal({
      title: '确定下架?',
      text: '下架后，广告“' + g.getRow(rowid).Name + '”将无法进行投放',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: '下架!',
      cancelButtonText: '取消'
    }).then(function() {
      swal(
        '下架成功!',
        '广告“' + g.getRow(rowid).Name + '”下架成功.',
        'success'
      )
    }, function(dismiss) {
      if (dismiss === 'cancel') {
        swal(
          '已取消',
          '广告“' + g.getRow(rowid).Name + '”未下架 :)',
          'error'
        )
      }
    })
  };
  /*
   * 初始化Combo
   */
  function initCombo() {
    var config = {
      '.chosen-select': {},
      '.chosen-select-deselect': {
        allow_single_deselect: true
      },
      '.chosen-select-no-single': {
        disable_search_threshold: 10
      },
      '.chosen-select-no-results': {
        no_results_text: 'Oops, nothing found!'
      },
      '.chosen-select-width': {
        width: "95%"
      }
    }
    for (var selector in config) {
      $(selector).chosen(config[selector]);
    }
  };
})
