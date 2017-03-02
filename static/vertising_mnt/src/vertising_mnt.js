define(function(require, exports, module) {
	$.root_ = $('div.ibox-content');
	var manager, g, vMntData;
	module.exports = {

		init: function(data) {
			vMntData = data;
			f_initGrid();
			manager.loadData($.extend(true, {}, vMntData));
			this._bindUI();
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
			$.root_.on("click", '.v_mnt_new_modal_btn', function(e) {
				vMntNewModal();
			})
			
			// bind grid edit 
			$.root_.on("click", '.row_btn_edit', function(e) {
				beginEdit(e.currentTarget.tabIndex);
			})
			$.root_.on("click", '.row_btn_cancel', function(e) {
				cancelEdit(e.currentTarget.tabIndex);
			})
			$.root_.on("click", '.row_btn_end', function(e) {
				endEdit(e.currentTarget.tabIndex);
			})
			$.root_.on("click", '.row_btn_apply', function(e) {
				var index = e.currentTarget.tabIndex;
				e.currentTarget.textContent == "上架" ? applyRow(index) : noApplyRow(index);
			})
		}
	};

	// Helpers
	/*
	 * 生成广告业务Grid
	 */
	function f_initGrid() {
		g = manager = $("#vMntDiv").ligerGrid({
			columns: [
				{ display: '资源ID', name: 'ResourcesID', minWidth: 65, width: '10%', type: 'int' },
				{ display: '广告名称', name: 'ADName', minWidth: 100, width: '15%' },
				{ display: '业务厂商', name: 'BusinessFirm', minWidth: 120, width: '15%' },
				{ display: '业务联系人', name: 'BusinessContact', editor: { type: 'text' }, minWidth: 60, width: '10%' },
				{ display: '联系方式', name: 'phoneNumber', editor: { type: 'text' }, minWidth: 140, width: '10%' },
				{ display: '添加人', name: 'Added', minWidth: 60, editor: { type: 'text' }, width: '10%' },
				{ display: '添加时间', name: 'AddTime', tyep: 'date', format: 'yyyy-mm-dd HH:mm:ss', minWidth: 140, width: '15%' },
				{
					display: '操作',
					isSort: false,
					minWidth: 120,
					width: '15%',
					name: 'ApplyStatus',
					tyep: 'int',
					render: function(rowdata, rowindex, value) {
						var h = "";
						if(!rowdata._editing) {
							h += "<button type='button' class='btn btn-outline btn-info btn-xs row-btn row_btn_edit'>修改</button> ";
							h += "<button type='button' class='btn btn-outline btn-danger btn-xs row-btn row_btn_apply'>" + (value ? "下架" : "上架") + "</button> ";
						} else {
							h += "<button type='button' class='btn btn-outline btn-primary btn-xs row-btn row_btn_end'>提交</button> ";
							h += "<button type='button' class='btn btn-outline btn-info btn-xs row-btn row_btn_cancel'>取消</button> ";
						}
						return h;
					}
				}
			],
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
		g.options.data = $.extend(true, {}, vMntData);
		g.loadData(f_getWhere());
	};

	function f_getWhere() {
		if(!g) return null;
		var clause = function(rowdata, rowindex) {
			var key = $(".name_search").val();
			return rowdata.ADName.indexOf(key) > -1;
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
			text: '上架后，广告“' + g.getRow(rowid).ADName + '”将可以进行投放',
			type: 'warning',
			showCancelButton: true,
			confirmButtonText: '上架!',
			cancelButtonText: '取消'
		}).then(function() {
			swal(
				'上架成功!',
				'广告“' + g.getRow(rowid).ADName + '”上架成功.',
				'success'
			)
		}, function(dismiss) {
			if(dismiss === 'cancel') {
				swal(
					'已取消',
					'广告“' + g.getRow(rowid).ADName + '”未上架 :)',
					'error'
				)
			}
		})
	};

	function noApplyRow(rowid) {
		swal({
			title: '确定下架?',
			text: '下架后，广告“' + g.getRow(rowid).ADName + '”将无法进行投放',
			type: 'warning',
			showCancelButton: true,
			confirmButtonText: '下架!',
			cancelButtonText: '取消'
		}).then(function() {
			swal(
				'下架成功!',
				'广告“' + g.getRow(rowid).ADName + '”下架成功.',
				'success'
			)
		}, function(dismiss) {
			if(dismiss === 'cancel') {
				swal(
					'已取消',
					'广告“' + g.getRow(rowid).ADName + '”未下架 :)',
					'error'
				)
			}
		})
	};

	function vMntNewModal() {
		var modal = BootstrapDialog.show({
			id: 'vMntNewModal',
			title: '新建广告业务',
			message: $('<div></div>').load('app/vertising_mnt_new_modal.html'),
			cssClass: 'modal inmodal fade',
			buttons: [{
				type: 'submit',
				icon: 'glyphicon glyphicon-check',
				label: '保存',
				cssClass: 'btn btn-primary',
				autospin: false,
				action: function(dialogRef) {
					$('#vMntNewModalForm').submit();
				}
			}, {
				id: 'vMntNewModalClose',
				label: '取消',
				cssClass: 'btn btn-white',
				autospin: false,
				action: function(dialogRef) {
					dialogRef.close();
				}
			}],
			onshown: function(dialogRef) {
				vMntNewModalValidation();
			}
		});
	};

	/*
	 * 广告业务添加验证
	 */
	function vMntNewModalValidation() {
		$('#vMntNewModalForm').formValidation({
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
					ADName: {
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
					phoneNumber: {
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
					if(result.success == true) {
						msg = "广告业务添加成功！";
						toastr.success(msg);
					} else {
						msg = "广告业务添加失败！";
						toastr.error(msg);
					};
					$('#vMntNewModalClose').click();
				}, 'json');
			});
	};
})