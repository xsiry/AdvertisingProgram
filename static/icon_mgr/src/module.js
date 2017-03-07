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
      $('div h5.mgr_title').text('图标广告列表');
      $('div button font.mgr_new_btn').text('新建图标广告');
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
      title: '新建banner条链接',
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
        generateCombo();
        initCombo();
        $('ul.form_tabs > li > a').on("click", function(e) {
          var title = $(e.currentTarget).text();
          if (title == "升窗") {
            $('div.upload_pic input').attr('disabled', 'disabled')
          } else {
            $('div.upload_pic input').removeAttr("disabled");
          }
          dialogRef.setTitle("新建" + title + "链接");
        });

        $('.fileToUpload').on('change', function() {
          fileSelected();
        });
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

  /*
   * 游戏编号combo
   */
  function generateCombo() {
    var condition = { fields: [{ name: 'GameName', label: '游戏名称', width: 90, type: 'text' }] };
    $("#gameNumberCombo").ligerComboBox({
      width: 159,
      slide: false,
      selectBoxWidth: 360,
      selectBoxHeight: 240,
      valueField: 'Id',
      textField: 'Id',
      grid: getGridOptions(false),
      condition: condition
    });
  };

  /*
   * 应用分类-游戏编号
   */
  function getGridOptions(checkbox) {
    var options = {
      columns: [
        { display: '游戏Id', name: 'Id', align: 'left', width: 100, minWidth: 50 },
        { display: '游戏名', name: 'GameName', minWidth: 120, width: 100 },
        { display: '游戏分类', name: 'GameCategory', minWidth: 100, width: 100 }
      ],
      switchPageSizeApplyComboBox: false,
      data: $.extend({}, {}),
      //url : 'xxx',
      pageSize: 10,
      checkbox: checkbox
    };
    return options;
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
  /*
   * 图片上传
   */
  function fileSelected() {
    var file = $('.fileToUpload').files[0];
    if (file) {
      var fileSize = 0;
      if (file.size > 1024 * 1024)
        fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
      else
        fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';

      $('.fileName').innerHTML = '名称: ' + file.name;
      $('.fileSize').innerHTML = '大小: ' + fileSize;
      $('.fileType').innerHTML = '类型: ' + file.type;
    }
  }

  function uploadFile() {
    var xhr = new XMLHttpRequest();
    var fd = document.getElementById('newModalForm').getFormData();

    /* event listners */
    xhr.upload.addEventListener("progress", uploadProgress, false);
    xhr.addEventListener("load", uploadComplete, false);
    xhr.addEventListener("error", uploadFailed, false);
    xhr.addEventListener("abort", uploadCanceled, false);
    /* Be sure to change the url below to the url of your upload server side script */
    xhr.open("POST", "upload.php");
    xhr.send(fd);
  }

  function uploadProgress(evt) {
    if (evt.lengthComputable) {
      var percentComplete = Math.round(evt.loaded * 100 / evt.total);
      document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
    } else {
      document.getElementById('progressNumber').innerHTML = 'unable to compute';
    }
  }

  function uploadComplete(evt) {
    /* This event is raised when the server send back a response */
    alert(evt.target.responseText);
  }

  function uploadFailed(evt) {
    alert("There was an error attempting to upload the file.");
  }

  function uploadCanceled(evt) {
    alert("The upload has been canceled by the user or the browser dropped the connection.");
  }
})
