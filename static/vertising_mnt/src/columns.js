define([{
	display: '资源ID',
	name: 'Id',
	minWidth: 65,
	width: '10%',
	type: 'int'
}, {
	display: '广告名称',
	name: 'Name',
	minWidth: 100,
	width: '15%'
}, {
	display: '业务厂商',
	name: 'BusinessFirm',
	minWidth: 120,
	width: '15%'
}, {
	display: '业务联系人',
	name: 'BusinessContact',
	editor: {
		type: 'text'
	},
	minWidth: 60,
	width: '10%'
}, {
	display: '联系方式',
	name: 'PhoneNumber',
	editor: {
		type: 'text'
	},
	minWidth: 140,
	width: '10%'
}, {
	display: '添加人',
	name: 'Added',
	minWidth: 60,
	editor: {
		type: 'text'
	},
	width: '10%'
}, {
	display: '添加时间',
	name: 'AddedAt',
	tyep: 'date',
	format: 'yyyy-mm-dd HH:mm:ss',
	minWidth: 140,
	width: '15%'
}, {
	display: '操作',
	isSort: false,
	minWidth: 120,
	width: '15%',
	name: 'Apply',
	render: function(rowdata, rowindex, value) {
		var h = "";
		if (!rowdata._editing) {
			h += "<button type='button' class='btn btn-outline btn-info btn-xs row-btn row_btn_edit'>修改</button> ";
			h += "<button type='button' class='btn btn-outline btn-danger btn-xs row-btn row_btn_apply'>" + (value ? "下架" : "上架") + "</button> ";
		} else {
			h += "<button type='button' class='btn btn-outline btn-primary btn-xs row-btn row_btn_end'>提交</button> ";
			h += "<button type='button' class='btn btn-outline btn-info btn-xs row-btn row_btn_cancel'>取消</button> ";
		}
		return h;
	}
}])