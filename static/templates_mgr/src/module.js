define(function(require, exports, module) {
  $.root_ = $('div.ibox-content');
  var manager, g, gridData, modal;
  module.exports = {

    init: function(data) {
      gridData = data;
      f_initGrid();
      manager.loadData($.extend(true, {}, gridData));
      this._configText();
      this._bindUI();
    },
    _configText() {
      $('div h5.mgr_title').text('广告模板列表');
      $('div button font.mgr_new_btn').text('新建广告模板');
      $('div input.name_search').prop('placeholder', '输入模板名称');
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

      // 配置
      $.root_.on("click", '.row_btn_config', function(e) {
        var rowid = $(e.currentTarget).attr('name');
        configModal(rowid);
      })
      // 修改
      $.root_.on("click", '.row_btn_edit', function(e) {
        var rowid = $(e.currentTarget).attr('name');
        editModal(rowid);
      })
      // 发布
      $.root_.on("click", '.row_btn_publish', function(e) {
        var rowid = $(e.currentTarget).attr('name');
        publishModal(rowid);
      })
      // 删除
      $.root_.on("click", '.row_btn_delete', function(e) {
        var rowid = $(e.currentTarget).attr('name');
        deleteModal(rowid);
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

  // 新建窗口
  function newModal() {
    modal = BootstrapDialog.show({
      title: '新建广告模板',
      message: $('<div></div>').load('app/templates_mgr_modal_new.html'),
      cssClass: 'modal inmodal fade',
      buttons: [{
        type: 'submit',
        icon: 'glyphicon glyphicon-check',
        label: '保存',
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
        initCombo();
      }
    });
  };

  // 配置窗口
  function configModal(rowid) {
    modal = BootstrapDialog.show({
      title: '配置模板',
      message: $('<div></div>').load('app/templates_mgr_modal_config.html'),
      cssClass: 'modal inmodal fade',
      buttons: [{
        type: 'submit',
        icon: 'glyphicon glyphicon-check',
        label: '保存',
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
        initCombo();
        $('form .modal_template_name').val(g.getRow(rowid).Name)
      }
    });
  };

  // 修改窗口
  function editModal(rowid) {
    modal = BootstrapDialog.show({
      title: '修改广告模板',
      message: $('<div></div>').load('app/templates_mgr_modal_new.html'),
      cssClass: 'modal inmodal fade',
      buttons: [{
        type: 'submit',
        icon: 'glyphicon glyphicon-check',
        label: '保存',
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
        initCombo();
      }
    });
  };

  // 发布窗口
  function publishModal(rowid) {
    modal = BootstrapDialog.show({
      title: '发布广告模板',
      message: $('<div></div>').load('app/templates_mgr_modal_publish.html'),
      cssClass: 'modal inmodal fade',
      buttons: [{
        type: 'submit',
        icon: 'glyphicon glyphicon-check',
        label: '保存',
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
        initCombo();
        dateTimePicker();
      }
    });
  };
  // 删除窗口
  function deleteModal(rowid) {
    swal({
      title: '确定删除广告模板?',
      text: '广告模板“' + g.getRow(rowid).Name + '”删除后将无法恢复！',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: '删除!',
      cancelButtonText: '取消'
    }).then(function() {
      swal(
        '删除成功!',
        '广告模板“' + g.getRow(rowid).Name + '”已删除！',
        'success'
      )
    }, function(dismiss) {
      if (dismiss === 'cancel') {
        swal(
          '已取消',
          '广告模板“' + g.getRow(rowid).Name + '”未被删除 :)',
          'error'
        )
      }
    })
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
          },
          BusinessFirm: {
            validators: {
              notEmpty: {}
            }
          },
          BusinessContact: {
            validators: {
              notEmpty: {}
            }
          },
          PhoneNumber: {
            validators: {
              notEmpty: {},
              digits: {},
              phone: {
                country: 'CN'
              }
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

  function dateTimePicker() {
     $('input.publish_modal_datetimepicker').datetimepicker({
      viewMode: 'years',
      format: 'YYYY-MM-DD HH:mm:ss',
      locale: 'zh_cn'
     });
  }
})
