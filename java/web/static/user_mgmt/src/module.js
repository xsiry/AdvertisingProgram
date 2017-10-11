/**
 * Created by IntelliJ IDEA.
 * User: xsiry
 * Date: 2017/9/29
 * Time: 10:39
 */

define(function (require, exports, module) {
    $.user_mgmt_ = $('div.user_mgmt');
    var manager, g;
    module.exports = {

        init: function () {
            f_initGrid();
            this._configText();
            this._bindUI();
        },
        _configText() {
            $.user_mgmt_.find('div h5.mgmt_title').text('用户列表');
            $.user_mgmt_.find('div button span.mgmt_new_btn').text('新增用户');
            $.user_mgmt_.find('div input.name_search').prop('placeholder', '输入关键字搜索');
            $.user_mgmt_.find('div button.name_search_btn').text('搜索');
        },
        _bindUI: function () {
            // bind .name_search_btn
            $.user_mgmt_.on("click", '.name_search_btn', function (e) {
                f_search();
            })
            // bind .name_search
            $.user_mgmt_.on("keypress", '.name_search', function (e) {
                if (e.which == "13") f_search();
            })
            // bind .name_search val.length is 0
            $.user_mgmt_.on('input propertychange', '.name_search', function (e) {
                if ($('.name_search').val().length == 0) f_search();
            })
            // bind .v_mnt_new_modal_btn
            $.user_mgmt_.on("click", '.new_modal_btn', function (e) {
                var fun = function (dialogRef) {
                    newModalValidation();
                    initCombo();
                }
                newModal('新增用户', fun);
            })

            $.user_mgmt_.on("click", '.row_btn_edit', function (e) {
                var index = $(e.currentTarget).attr('rowindex');
                editRow(index);
            })

            $.user_mgmt_.on("click", '.row_btn_del', function (e) {
                var index = $(e.currentTarget).attr('rowindex');
                delRow(index);
            })

            $('body').on('input propertychange', 'input[name="username"]', function (e) {
                $('input[name="account"]').val($(e.currentTarget).val());
            })
        }
    };

    // Helpers
    /*
     * 生成Grid
     */
    function f_initGrid() {
        var c = require('./columns');

        g = manager = $.user_mgmt_.find("div.listDiv").ligerGrid({
            columns: c,
            onSelectRow: function (rowdata, rowindex) {
                $.user_mgmt_.find("#txtrowindex").val(rowindex);
            },
            parms: {
                source: "sys_user",
                qhstr: JSON.stringify({
                    qjson: [{username: $.user_mgmt_.find('.name_search').val()}],
                    qjsonkeytype: [{username: "LIKE_ALL"}]
                })
            },
            method: "get",
            dataAction: 'server',
            pageSize: 30,
            usePager: true,
            pageSizeOptions: [30, 50, 100],
            sortName: 'username',
            sortOrder: 'ASC',
            enabledSort: true,
            url: '/user/query',
            alternatingRow: false,
            enabledEdit: false,
            clickToEdit: false,
            width: '100%',
            height: '91%'
        });
    };

    /*
     * 搜索广告
     */
    function f_search() {
        var gridparms = {
            source: "sys_user",
            qhstr: JSON.stringify({
                qjson: [{username: $.user_mgmt_.find('.name_search').val()}],
                qjsonkeytype: [{username: "LIKE_ALL"}]
            }),
            page: 1,
            pagesize: g.options.pageSize,
            sortname: 'username',
            sortorder: 'ASC'
        };
        g.loadServerData(gridparms);
    };

    /*
     * 功能操作
     */

    // 修改
    function editRow(rowindex) {
        var rowobj = g.getRow(rowindex);
        var params = {
            source: 'sys_user',
            sourceid: rowobj.uid
        };

        $.get('/user/query', params, function (result) {
            if (result) {
                var fun = function () {
                    var rolename = null;
                    var status = parseInt(result.status);
                    $('input#type' + status).click();
                    $.each(result, function (key, val) {
                        if (key != "status") $('#newModalForm input[name="' + key + '"]').val(val);
                        if (key == "rolename") rolename = val;
                    })

                    newModalValidation();
                    initCombo(rolename);
                }
                newModal('修改用户', fun);
            }
        }, 'json')
    }

    // 删除
    function delRow(rowindex) {
        var rowobj = g.getRow(rowindex);
        swal({
            title: '确定删除?',
            text: '删除后，用户“' + rowobj.username + '”将无法恢复！',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: '删除',
            cancelButtonText: '取消'
        }).then(function () {

            $.ajax({
                type: 'POST',
                url: '/user/del',
                data: {
                    tid: rowobj.uid,
                    tname: 'sys_user'
                },
                dataType: 'json',
                success: function (data) {
                    g.reload();
                    swal(
                        '删除成功!',
                        '用户“' + rowobj.username + '”已被删除:)',
                        'success'
                    )
                },
                error: function (e) {
                    swal(
                        '删除失败!',
                        '用户“' + rowobj.username + '”未被删除-)',
                        'error'
                    )
                    console.log(e)
                }
            });
        }, function (dismiss) {
            if (dismiss === 'cancel') {
            }
        })
    };

    function newModal(title, showFun) {
        var modal = BootstrapDialog.show({
            id: 'newModal',
            title: title,
            message: $('<div></div>').load('app/user_mgmt_modal.html'),
            cssClass: 'modal inmodal fade',
            buttons: [{
                type: 'submit',
                icon: 'glyphicon glyphicon-check',
                label: '提交',
                cssClass: 'btn btn-primary',
                autospin: false,
                action: function (dialogRef) {
                    $('#newModalForm').submit();
                }
            }, {
                id: 'newModalClose',
                label: '取消',
                cssClass: 'btn btn-white',
                autospin: false,
                action: function (dialogRef) {
                    dialogRef.close();
                }
            }],
            onshown: showFun
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
                username: {
                    validators: {
                        notEmpty: {
                            message: '姓名不能为空'
                        }
                    }
                },
                pwd: {
                    validators: {
                        notEmpty: {
                            message: '密码不能为空'
                        },
                        stringLength: {
                            min: 3,
                            max: 20,
                            message: '密码长度必须在3~20之间'
                        },
                        regexp: {
                            regexp: /^[a-zA-Z0-9_]+$/,
                            message: '密码只能有大小写字母和数字组成'
                        }
                    }
                }
            }
        }).on('success.form.fv', function (e) {
            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the FormValidation instance
            var bv = $form.data('formValidation');

            var formVals = {};

            $.each($form.serializeArray(), function (i, o) {
                formVals[o.name] = o.value;
            });

            var postParams = {actionname: 'sys_user', datajson: JSON.stringify(formVals)};

            // Use Ajax to submit form data
            $.post('/user/save', postParams, function (result) {
                var msg;

                toastr.options = {
                    closeButton: true,
                    progressBar: true,
                    showMethod: 'slideDown',
                    timeOut: 4000
                };
                if (result.success) {
                    msg = "用户添加成功！";
                    toastr.success(msg);
                } else {
                    msg = "用户添加失败！";
                    toastr.error(msg);
                }
                ;
                g.reload();
                $('#newModalClose').click();
            }, 'json');
        });
    };

    /*
     * 初始化Combo
     */
    function initCombo(rolename) {
        var parames = {
            source: 'sys_role',
            qtype: 'select'
        };
        $.get('/user/query', parames, function (result) {
            if (result.length > 0) {
                $('select.role-select').empty();
                $.each(result, function (i, o) {
                    $('select.role-select').append('<option value="' + o.rid + '" ' + (rolename == o.rolename ? 'selected="selected"' : '') + '>' + o.rolename + '</option>');
                })
                $('select.role-select').chosen({});
            }
        }, 'json');
    };
})