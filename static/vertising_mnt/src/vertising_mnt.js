define(function(require, exports, module) {
	var manager, g;
	module.exports = {

		init: function(data) {
			f_initGrid();
			manager.loadData($.extend(true, {}, data));

			$('#nameSearch').keypress(function(e) {
				if(e.which == "13") {
					f_search();
				}
			});

			$('#nameSearchBtn').on('click', function() {
				f_search();
			});

			$("#vMntNewModalBtn").on('click', function() {
				vMntNewModal();
			});
		},
		beginEdit: function(rowid) {
			manager.beginEdit(rowid);
		},

		cancelEdit: function(rowid) {
			manager.cancelEdit(rowid);
		},

		endEdit: function(rowid) {
			manager.endEdit(rowid);
		},

		applyRow: function(rowid) {
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
		},

		noApplyRow: function(rowid) {
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
							h += "<button type='button' onclick='beginEdit(" + rowindex + ")' class='btn btn-outline btn-info btn-xs row-btn'>修改</button> ";
							h += "<button type='button' onclick='" + (value ? "noApplyRow" : "applyRow") + "(" + rowindex + ")' class='btn btn-outline btn-danger btn-xs row-btn'>" + (value ? "下架" : "上架") + "</button> ";
						} else {
							h += "<button type='button' onclick='endEdit(" + rowindex + ")' class='btn btn-outline btn-primary btn-xs row-btn'>提交</button> ";
							h += "<button type='button' onclick='cancelEdit(" + rowindex + ")' class='btn btn-outline btn-info btn-xs row-btn'>取消</button> ";
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
		g.options.data = $.extend(true, {}, vertisingMntData);
		g.loadData(f_getWhere());
	};

	function f_getWhere() {
		if(!g) return null;
		var clause = function(rowdata, rowindex) {
			var key = $("#nameSearch").val();
			return rowdata.ADName.indexOf(key) > -1;
		};
		return clause;
	};

	/*
	 * 功能操作
	 */

	function addNewRow() {
		manager.addEditRow();
	};

	function getSelected() {
		var row = manager.getSelectedRow();
		if(!row) { alert('请选择行'); return; }
		alert(JSON.stringify(row));
	};

	function getData() {
		var data = manager.getData();
		alert(JSON.stringify(data));
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