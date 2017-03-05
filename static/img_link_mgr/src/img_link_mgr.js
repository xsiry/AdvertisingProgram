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
      $('div h5.mgr_title').text('图片链接列表');
      $('div button font.mgr_new_btn').text('新建图片链接');
      $('div input.name_search').prop('placeholder', '输入广告名称');
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
        // bind .v_mnt_new_modal_btn
      $.root_.on("click", '.new_modal_btn', function(e) {
        newModal();
      })

      // bind grid edit
      $.root_.on("click", '.row_btn_edit', function(e) {
        var index = $(e.currentTarget).attr('name');
        beginEdit(index);
      })
      $.root_.on("click", '.row_btn_cancel', function(e) {
        var index = $(e.currentTarget).attr('name');
        cancelEdit(index);
      })
      $.root_.on("click", '.row_btn_end', function(e) {
        var index = $(e.currentTarget).attr('name');
        endEdit(index);
      })
      $.root_.on("click", '.row_btn_apply', function(e) {
        var index = $(e.currentTarget).attr('name');
        e.currentTarget.textContent == "上架" ? applyRow(index) : noApplyRow(index);
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
   * 搜索广告
   */
  function f_search() {
    g.options.data = $.extend(true, {}, gridData);
    g.loadData(f_getWhere());
  };

  function f_getWhere() {
    if (!g) return null;
    var clause = function(rowdata, rowindex) {
      var key = $(".name_search").val();
      return rowdata.Name.indexOf(key) > -1;
    };
    return clause;
  };

  /*
   * 功能操作
   */
  function beginEdit(rowid) {
    manager.beginEdit(rowid);
  };

  function cancelEdit(rowid) {
    manager.cancelEdit(rowid);
  };

  function endEdit(rowid) {
    manager.endEdit(rowid);
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

  function newModal() {
    var modal = BootstrapDialog.show({
      id: 'newModal',
      title: '新建banner链接',
      message: $('<div></div>').load('app/img_link_mgr_modal.html'),
      cssClass: 'modal inmodal fade',
      buttons: [{
        type: 'submit',
        icon: 'glyphicon glyphicon-check',
        label: '提交',
        cssClass: 'btn btn-primary',
        autospin: false,
        action: function(dialogRef) {
          $('#newModalForm').submit();
        }
      }, {
        id: 'newModalClose',
        label: '取消',
        cssClass: 'btn btn-white',
        autospin: false,
        action: function(dialogRef) {
          dialogRef.close();
        }
      }],
      onshown: function(dialogRef) {
        newModalValidation();
      }
    });
  };

  /*
   * 添加验证
   */
  function newModalValidation() {
    $('#newModalForm').formValidation({
        autoFocus: true,
        locale: 'zh_CN',
        message: '该值无效，请重新输入',
        err: {
          container: 'tooltip'
        },
        icon: {
          valid: 'glyphicon glyphicon-ok',
          invalid: 'glyphicon glyphicon-remove',
          validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
          Name: {
            validators: {
              notEmpty: {}
            }
          }
        }
      })
      .on('success.form.fv', function(e) {
        // Prevent form submission
        e.preventDefault();

        // Get the form instance
        var $form = $(e.target);

        // Get the FormValidation instance
        var bv = $form.data('formValidation');

        // Use Ajax to submit form data
        $.get('login.json', $form.serialize(), function(result) {
          var msg;

          toastr.options = {
            closeButton: true,
            progressBar: true,
            showMethod: 'slideDown',
            timeOut: 4000
          };
          if (result.success == true) {
            msg = "广告业务添加成功！";
            toastr.success(msg);
          } else {
            msg = "广告业务添加失败！";
            toastr.error(msg);
          };
          $('#newModalClose').click();
        }, 'json');
      });
  };
})
