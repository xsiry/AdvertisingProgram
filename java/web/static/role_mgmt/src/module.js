/**
 * Created by IntelliJ IDEA.
 * User: xsiry
 * Date: 2017/9/29
 * Time: 16:39
 */

define(function (require, exports, module) {
    $.role_mgmt_ = $('div.role_mgmt');
    var manager, g, a_manager, ag;
    module.exports = {

        init: function () {
            f_initGrid();
            this._configText();
            this._bindUI();
        },
        _configText() {
            $.role_mgmt_.find('div h5.mgmt_title').text('角色列表');
            $.role_mgmt_.find('div button span.mgmt_new_btn').text('新增角色');
            $.role_mgmt_.find('div input.name_search').prop('placeholder', '输入关键字搜索');
            $.role_mgmt_.find('div button.name_search_btn').text('搜索');
        },
        _bindUI: function () {
            // bind .name_search_btn
            $.role_mgmt_.on("click", '.name_search_btn', function (e) {
                f_search();
            })
            // bind .name_search
            $.role_mgmt_.on("keypress", '.name_search', function (e) {
                if (e.which == "13") f_search();
            })
            // bind .name_search val.length is 0
            $.role_mgmt_.on('input propertychange', '.name_search', function (e) {
                if ($('.name_search').val().length == 0) f_search();
            })
            // bind .v_mnt_new_modal_btn
            $.role_mgmt_.on("click", '.new_modal_btn', function (e) {
                var fun = function (dialogRef) {
                    newModalValidation();
                    initCombo();
                    accessGrid();
                }
                newModal('新增角色', fun);
            })

            $.role_mgmt_.on("click", '.row_btn_edit', function (e) {
                var index = $(e.currentTarget).attr('rowindex');
                editRow(index);
            })

            $.role_mgmt_.on("click", '.row_btn_del', function (e) {
                var index = $(e.currentTarget).attr('rowindex');
                delRow(index);
            })
        }
    };

    // Helpers
    /*
     * 生成Grid
     */
    function f_initGrid() {
        var c = require('./columns');

        g = manager = $.role_mgmt_.find("div.listDiv").ligerGrid({
            columns: c,
            onSelectRow: function (rowdata, rowindex) {
                $.role_mgmt_.find("#txtrowindex").val(rowindex);
            },
            parms: {
                source: "sys_role",
                qhstr: JSON.stringify({
                    qjson: [{rolename: $.role_mgmt_.find('.name_search').val()}],
                    qjsonkeytype: [{rolename: "LIKE_ALL"}]
                })
            },
            method: "get",
            dataAction: 'server',
            pageSize: 30,
            usePager: true,
            pageSizeOptions: [30, 50, 100],
            sortName: 'rolename',
            sortOrder: 'ASC',
            enabledSort: true,
            url: '/role/query',
            alternatingRow: false,
            enabledEdit: false,
            clickToEdit: false,
            width: '100%',
            height: '91%'
        });
    };

    /*
     * 权限管理grid
     */
    function accessGrid() {
        var c = require('./access_columns');
        var gridData = require('./data');
        console.log(gridData)
        //TreeDeptData.Rows[0].isextend = false;

        ag = a_manager = $("body div.access_grid").ligerGrid({
            checkbox: true,
            columns: c,
            onSelectRow: function (rowdata, rowindex) {
                $("#txtrowindex").val(rowindex);
            },
            alternatingRow: false,
            tree: {columnId: 'menus'},
            enabledEdit: true,
            clickToEdit: false,
            usePager: false,
            width: '100%',
            height: '91%'
        });

        $.get('/menu/accessMenus', {}, function (result) {
            console.log(result)
            var gridData2 = result;
            console.log(gridData2)
            a_manager.loadData($.extend(true, {}, gridData2));
        }, 'json');
    }

    /*
     * 搜索广告
     */
    function f_search() {
        var gridparms = {
            source: "sys_role",
            qhstr: JSON.stringify({
                qjson: [{rolename: $.role_mgmt_.find('.name_search').val()}],
                qjsonkeytype: [{rolename: "LIKE_ALL"}]
            }),
            page: 1,
            pagesize: g.options.pageSize,
            sortname: 'rolename',
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
            source: 'sys_role',
            sourceid: rowobj.rid
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
                newModal('修改角色', fun);
            }
        }, 'json')
    }

    // 删除
    function delRow(rowindex) {
        var rowobj = g.getRow(rowindex);
        swal({
            title: '确定删除?',
            text: '删除后，角色“' + rowobj.rolename + '”将无法恢复！',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: '删除',
            cancelButtonText: '取消'
        }).then(function () {

            $.ajax({
                type: 'POST',
                url: '/role/del',
                data: {
                    tid: rowobj.uid,
                    tname: 'sys_user'
                },
                dataType: 'json',
                success: function (data) {
                    g.reload();
                    swal(
                        '删除成功!',
                        '角色“' + rowobj.rolename + '”已被删除:)',
                        'success'
                    )
                },
                error: function (e) {
                    swal(
                        '删除失败!',
                        '角色“' + rowobj.rolename + '”未被删除-)',
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
            size: 'size-wide',
            message: $('<div></div>').load('app/role_mgmt_modal.html'),
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
                rolename: {
                    validators: {
                        notEmpty: {
                            message: '角色名称不能为空'
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

            var postParams = {actionname: 'sys_role', datajson: JSON.stringify(formVals)};

            // Use Ajax to submit form data
            $.post('/role/save', postParams, function (result) {
                var msg;

                toastr.options = {
                    closeButton: true,
                    progressBar: true,
                    showMethod: 'slideDown',
                    timeOut: 4000
                };
                if (result.success) {
                    msg = "角色添加成功！";
                    toastr.success(msg);
                } else {
                    msg = "角色添加失败！";
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
        $.get('/role/query', parames, function (result) {
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