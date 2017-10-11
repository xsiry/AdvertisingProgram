

define(function (require, exports, module) {
    $.bar_mgmt_ = $('div.bar_mgmt');
    var manager, g;
    module.exports = {

        init: function () {
            f_initGrid();
            this._configText();
            this._bindUI();
        },
        _configText() {
            $.bar_mgmt_.find('div h5.mgmt_title').text('系统管理>>网吧列表');
            $.bar_mgmt_.find('div button font.mgmt_new_btn').text('移动到分组');
            $.bar_mgmt_.find('div button font.mgmt_new_btn').text('移动到分组');
            $.bar_mgmt_.find('div input.name_search').prop('placeholder', '请输入关键字搜索');
            $.bar_mgmt_.find('div button.name_search_btn').text('搜索');
        },
        _bindUI: function () {
            // bind .name_search_btn
            $.bar_mgmt_.on("click", '.name_search_btn', function (e) {
                f_search();
            })
            // bind .name_search
            $.bar_mgmt_.on("keypress", '.name_search', function (e) {
                if (e.which == "13") f_search();
            })
            // bind .name_search val.length is 0
            $.bar_mgmt_.on('input propertychange', '.name_search', function (e) {
                if ($('.name_search').val().length == 0) f_search();
            })
            // bind .v_mnt_new_modal_btn
            $.bar_mgmt_.on("click", '.new_modal_btn', function (e) {
                var fun = function (dialogRef) {
                    newModalValidation();
                    initCombo();
                    initCombo1();
                }
                newModal('新增分组', fun);
            })

            $.bar_mgmt_.on("click", '.row_btn_edit', function (e) {
                var index = $(e.currentTarget).attr('rowindex');
                editRow(index);
            })

            $.bar_mgmt_.on("click", '.row_btn_del', function (e) {
                var index = $(e.currentTarget).attr('rowindex');
                delRow(index);
            })

            $('body').on('input propertychange', 'input[name="groupname"]', function (e) {
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

        g = manager = $.bar_mgmt_.find("div.listDiv").ligerGrid({
            columns: c,
            onSelectRow: function (rowdata, rowindex) {
                $.bar_mgmt_.find("#txtrowindex").val(rowindex);
            },
            parms: {
                source: "sys_group",
                qhstr: JSON.stringify({
                    qjson: [{groupname: $.bar_mgmt_.find('.name_search').val()}],
                    qjsonkeytype: [{groupname: "LIKE_ALL"}]
                })
            },
            method: "get",
            dataAction: 'server',
            pageSize: 30,
            usePager: true,
            pageSizeOptions: [30, 50, 100],
            sortName: 'groupid',
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
     * 搜索分组
     */
    function f_search() {
        var gridparms = {
            source: "sys_group",
            qhstr: JSON.stringify({
                qjson: [{groupname: $.bar_mgmt_.find('.name_search').val()}],
                qjsonkeytype: [{groupname: "LIKE_ALL"}]
            }),
            page: 1,
            pagesize: g.options.pageSize,
            sortname: 'groupid',
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
            source: 'sys_group',
            sourceid: rowobj.groupid
        };

        $.get('/user/query', params, function (result) {
            if (result) {
                var fun = function () {
                    var area = null;
                    var city_name = null;

                    var status = parseInt(result.status);
                    $('input#type' + status).click();
                    $.each(result, function (key, val) {
                        if (key != "status") $('#newModalForm input[name="' + key + '"]').val(val);
                        if (key == "area") area = val;
                        if (key == "city_name") city_name = val;

                    })

                    newModalValidation();
                    initCombo(area);
                    initCombo1(city_name);
                }
                newModal('修改分组', fun);
            }
        }, 'json')
    }

    // 删除
    function delRow(rowindex) {
        var rowobj = g.getRow(rowindex);
        swal({
            title: '确定删除?',
            text: '删除后，分组“' + rowobj.groupname + '”将无法恢复！',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: '删除',
            cancelButtonText: '取消'
        }).then(function () {

            $.ajax({
                type: 'POST',
                url: '/user/del',
                data: {
                    tid: rowobj.groupid,
                    tname: 'sys_group'
                },
                dataType: 'json',
                success: function (data) {
                    g.reload();
                    swal(
                        '删除成功!',
                        '分组“' + rowobj.groupname + '”已被删除:)',
                        'success'

                    )
                },
                error: function (e) {
                    swal(
                        '删除失败!',
                        '分组“' + rowobj.groupname + '”未被删除-)',
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
            message: $('<div></div>').load('app/bar_mgmt_modal.html'),
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
                groupname: {
                    validators: {
                        notEmpty: {
                            message: '分组名不能为空'
                        }
                    }
                },

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

            var postParams = {actionname: 'sys_group', datajson: JSON.stringify(formVals)};

            // Use Ajax to submit form data
            $.post('/user/save', postParams, function (result) {
                var msg;

                toastr.options = {
                    closeButton: true,
                    progressBar: true,
                    showMethod: 'slideDown',
                    timeOut: 1000
                };
                if (result.success) {
                    msg = "分组添加成功！";
                    toastr.success(msg);
                } else {
                    msg = "分组添加失败！";
                    toastr.error(msg);
                }
                ;
                g.reload();
                $('#newModalClose').click();
            }, 'json');
        });
    };

    /*
     * 选择地区
     */
    function initCombo(area) {
        var parames = {
            source: 'dict_area',
            qtype: 'select',
            qhstr: JSON.stringify({qjson: [{"types":"3@1"}] })
    };
        $.get('/user/query', parames, function (result) {
            if (result.length > 0) {
                $('select.area-select').empty();
                $.each(result, function (i, o) {

                    $('select.area-select').append('<option value="' + o.areaid + '" ' + (area == o.area ? 'selected="selected"' : '') + '>' + o.area + '</option>');
                })
                $('select.area-select').chosen({});
            }
        }, 'json');
    };

    function initCombo1(cityid,city_name) {
        var parames = {
            source: 'dict_city',
            qtype: 'select',
            qhstr: JSON.stringify({qjson: [{"city_parentid":cityid}] })
        };
        $.get('/user/query', parames, function (result) {
            if (result.length > 0) {
                $('select.city-select').empty();
                $.each(result, function (i, o) {
                    $('select.city-select').append('<option value="' + o.cityid + '" ' + (city_name == o.city_name ? 'selected="selected"' : '') + '>' + o.city_name + '</option>');
                })
                $('select.city-select').chosen({});
            }
        }, 'json');
    };
})