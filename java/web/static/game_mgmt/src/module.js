

define(function (require, exports, module) {
    $.game_mgmt_ = $('div.game_mgmt');
    var manager, g;
    module.exports = {

        init: function () {
            f_initGrid();
            this._configText();
            this._bindUI();
        },
        _configText() {
            $.game_mgmt_.find('div h5.mgmt_title').text('系统管理>>游戏列表');
            $.game_mgmt_.find('div button font.mgmt_new_btn').text('按分组显示');
            $.game_mgmt_.find('div input.name_search').prop('placeholder', '请输入关键字搜索');
            $.game_mgmt_.find('div button.name_search_btn').text('搜索');
        },
        _bindUI: function () {
            // bind .name_search_btn
            $.game_mgmt_.on("click", '.name_search_btn', function (e) {
                f_search();
            })
            // bind .name_search
            $.game_mgmt_.on("keypress", '.name_search', function (e) {
                if (e.which == "13") f_search();
            })
            // bind .name_search val.length is 0
            $.game_mgmt_.on('input propertychange', '.name_search', function (e) {
                if ($('.name_search').val().length == 0) f_search();
            })
            // bind .v_mnt_new_modal_btn
            $.game_mgmt_.on("click", '.new_modal_btn', function (e) {
                var fun = function (dialogRef) {
                    newModalValidation();
                    initCombo();
                    initCombo1();
                }
                newModal('新增游戏列表', fun);
            })

            $.game_mgmt_.on("click", '.row_btn_edit', function (e) {
                var index = $(e.currentTarget).attr('rowindex');
                editRow(index);
            })

            $.game_mgmt_.on("click", '.row_btn_del', function (e) {
                var index = $(e.currentTarget).attr('rowindex');
                delRow(index);
            })

            $('body').on('input propertychange', 'input[name="groupname"]', function (e) {
                $('input[name="account"]').val($(e.currentTarget).val());
            })

            $('body').on('change', '#area', function (e) {
                var cityid = $(e.currentTarget).val();
                initCombo1(cityid);
            })
        }
    };

    // Helpers
    /*
     * 生成Grid
     */
    function f_initGrid() {
        var c = require('./columns');

        g = manager = $.game_mgmt_.find("div.listDiv").ligerGrid({
            columns: c,
            onSelectRow: function (rowdata, rowindex) {
                $.game_mgmt_.find("#txtrowindex").val(rowindex);
            },
            parms: {
                source: "list_game",
                qhstr: JSON.stringify({
                    qjson: [{game_name: $.game_mgmt_.find('.name_search').val()}],
                    qjsonkeytype: [{game_name: "LIKE_ALL"}]
                })
            },
            method: "get",
            dataAction: 'server',
            pageSize: 30,
            usePager: true,
            pageSizeOptions: [30, 50, 100],
            sortName: 'gameid',
            sortOrder: 'ASC',
            enabledSort: true,
            url: '/group/query',
            alternatingRow: false,
            enabledEdit: false,
            clickToEdit: false,
            width: '100%',
            height: '91%'
        });
    };

    /*
     * 搜索游戏
     */
    function f_search() {
        var gridparms = {
            source: "list_game",
            qhstr: JSON.stringify({
                qjson: [{game_name: $.game_mgmt_.find('.name_search').val()}],
                qjsonkeytype: [{game_name: "LIKE_ALL"}]
            }),
            page: 1,
            pagesize: g.options.pageSize,
            sortname: 'gameid',
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
            source: 'list_game',
            sourceid: rowobj.gameid
        };

        $.get('/group/query', params, function (result) {
            if (result) {
                var fun = function () {
                    var game_type = null;

                    $.each(result, function (key, val) {

                        if (key == "game_type") game_type = val;

                    })
                    newModalValidation();
                    initCombo(game_type);
                }
                newModal('修改游戏列表', fun);
            }
        }, 'json')
    }

    // 删除
    function delRow(rowindex) {
        var rowobj = g.getRow(rowindex);
        swal({
            title: '确定删除?',
            text: '删除后，游戏“' + rowobj.game_name + '”将无法恢复！',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: '删除',
            cancelButtonText: '取消'
        }).then(function () {

            $.ajax({
                type: 'POST',
                url: '/user/del',
                data: {
                    tid: rowobj.gameid,
                    tname: 'list_game'
                },
                dataType: 'json',
                success: function (data) {
                    g.reload();
                    swal(
                        '删除成功!',
                        '游戏“' + rowobj.game_name + '”已被删除:)',
                        'success'

                    )
                },
                error: function (e) {
                    swal(
                        '删除失败!',
                        '游戏“' + rowobj.game_name + '”未被删除-)',
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
            message: $('<div></div>').load('app/game_mgmt_modal.html'),
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
                game_name: {
                    validators: {
                        notEmpty: {
                            message: '游戏名不能为空'
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

            var postParams = {actionname: 'list_game', datajson: JSON.stringify(formVals)};

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
                    msg = "游戏添加成功！";
                    toastr.success(msg);
                } else {
                    msg = "游戏添加失败！";
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
    function initCombo(game_type) {
        var parames = {
            source: 'list_game',
            qtype: 'select',
            //qhstr: JSON.stringify({qjson: [{"types":"3@1"}] })
    };
        $.get('/user/query', parames, function (result) {
            if (result.length > 0) {
                $('select.type-select').empty();
                $.each(result, function (i, o) {
                    $('select.type-select').append('<option value="' + o.gameid + '" ' + (game_type == o.game_type ? 'selected="selected"' : '') + '>' + o.game_type + '</option>');

                })
               // $('select.area-select').chosen({});
            }
        }, 'json');
    };


})