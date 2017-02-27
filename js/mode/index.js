var gridData = {
	Rows: [{
		"ResourcesID": "123123",
		"ADName": "扑鱼达人",
		"BusinessFirm": "腾讯",
		"BusinessContact": "马化腾",
		"phoneNumber": "18888888888",
		"Added": "陈二狗",
		"AddTime": "2016-12-15 16:07",
		"ApplyStatus": true
	}, {
		"ResourcesID": "323422",
		"ADName": "魔法王座",
		"BusinessFirm": "网易",
		"BusinessContact": "丁磊",
		"phoneNumber": "13999999999",
		"Added": "李小花",
		"AddTime": "2016-12-15 16:07",
		"ApplyStatus": false
	}],
	Total: 2
};

var manager, g;

function f_initGrid() {
	g = manager = $("#maingrid").ligerGrid({
		columns: [
			{ display: '资源ID', name: 'ResourcesID', minWidth: 60, width: '10%', type: 'int' },
			{ display: '广告名称', name: 'ADName', minWidth: 100, width: '15%' },
			{ display: '业务厂商', name: 'BusinessFirm', minWidth: 120, width: '15%' },
			{ display: '业务联系人', name: 'BusinessContact', editor: { type: 'text' }, minWidth: 60, width: '10%' },
			{ display: '联系方式', name: 'phoneNumber', editor: { type: 'text' }, minWidth: 140, width: '15%' },
			{ display: '添加人', name: 'Added', minWidth: 60, editor: { type: 'text' }, width: '10%' },
			{ display: '添加时间', name: 'AddTime', tyep: 'date', format: 'yyyy-mm-dd HH:mm:ss', minWidth: 140, width: '15%' },
			{ name: 'ApplyStatus', tyep: 'int', frozen: true },
			{
				display: '操作',
				isSort: false,
				minWidth: 120,
				width: '10%',
				render: function(rowdata, rowindex, value) {
					var h = "";
					if(!rowdata._editing) {
						h += "<button type='button' onclick='beginEdit(" + rowindex + ")' class='btn btn-outline btn-info btn-xs row-btn'>修改</button> ";
						h += "<button type='button' onclick='" + (rowdata.ApplyStatus ? "noApplyRow" : "applyRow") + "(" + rowindex + ")' class='btn btn-outline btn-danger btn-xs row-btn'>" + (rowdata.ApplyStatus ? "下架" : "上架") + "</button> ";
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
		data: gridData,
		height: '91%',
		width: '100%'
	});
}
/*
 * 搜索广告
 */
function f_search() {
	g.options.data = $.extend(true, {}, gridData);
	g.loadData(f_getWhere());
}

function f_getWhere() {
	if(!g) return null;
	var clause = function(rowdata, rowindex) {
		var key = $("#ADNameSearch").val();
		return rowdata.ADName.indexOf(key) > -1;
	};
	return clause;
}

/*
 * 功能操作
 */
function beginEdit(rowid) {
	manager.beginEdit(rowid);
}

function cancelEdit(rowid) {
	manager.cancelEdit(rowid);
}

function endEdit(rowid) {
	manager.endEdit(rowid);
}

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
}

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
}

function addNewRow() {
	manager.addEditRow();
}

function getSelected() {
	var row = manager.getSelectedRow();
	if(!row) { alert('请选择行'); return; }
	alert(JSON.stringify(row));
}

function getData() {
	var data = manager.getData();
	alert(JSON.stringify(data));
}

function getNowTime() {
	/**
	 * 
	 * 获取当前时间
	 */
	function p(s) {
		return s < 10 ? '0' + s : s;
	}

	var myDate = new Date();
	//获取当前年
	var year = myDate.getFullYear();
	//获取当前月
	var month = myDate.getMonth() + 1;
	//获取当前日
	var date = myDate.getDate();
	var h = myDate.getHours(); //获取当前小时数(0-23)
	var m = myDate.getMinutes(); //获取当前分钟数(0-59)
	var s = myDate.getSeconds();

	var now = year + '-' + p(month) + "-" + p(date) + " " + p(h) + ':' + p(m) + ":" + p(s);
	return now;
}
/*
 * 广告业务添加验证
 */
function addADProgramValidator() {
	$('#addADProgramForm').formValidation({
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
			$.post('login.json', $form.serialize(), function(result) {
				console.log(result);
			}, 'json');
		});
};