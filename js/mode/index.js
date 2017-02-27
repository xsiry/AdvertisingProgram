var gridData = {
	Rows: [{
		"ResourcesID": "123123",
		"ADName": "扑鱼达人",
		"BusinessFirm": "腾讯",
		"BusinessContact": "马化腾",
		"ContactInformation": "18888888888",
		"Added": "陈二狗",
		"AddTime": "2016-12-15 16:07"
	}, {
		"ResourcesID": "323422",
		"ADName": "魔法王座",
		"BusinessFirm": "网易",
		"BusinessContact": "丁磊",
		"ContactInformation": "13999999999",
		"Added": "李小花",
		"AddTime": "2016-12-15 16:07"
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
			{ display: '联系方式', name: 'ContactInformation', editor: { type: 'text' }, minWidth: 140, width: '15%' },
			{ display: '添加人', name: 'Added', minWidth: 60, editor: { type: 'text' }, width: '10%' },
			{ display: '添加时间', name: 'AddTime', tyep: 'date', format: 'yyyy-mm-dd HH:mm:ss', minWidth: 140, width: '15%' },
			{
				display: '操作',
				isSort: false,
				minWidth: 120,
				width: '10%',
				render: function(rowdata, rowindex, value) {
					var h = "";
					if(!rowdata._editing) {
						h += "<button type='button' onclick='beginEdit(" + rowindex + ")' class='btn btn-info btn-xs row-btn'>修改</button> ";
						h += "<button type='button' onclick='deleteRow(" + rowindex + ")' class='btn btn-danger btn-xs row-btn'>上架</button> ";
					} else {
						h += "<button type='button' onclick='endEdit(" + rowindex + ")' class='btn btn-primary btn-xs row-btn'>提交</button> ";
						h += "<button type='button' onclick='cancelEdit(" + rowindex + ")' class='btn btn-info btn-xs row-btn'>取消</button> ";
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
		height: '91%'
	});
}

function beginEdit(rowid) {
	manager.beginEdit(rowid);
}

function cancelEdit(rowid) {
	manager.cancelEdit(rowid);
}

function endEdit(rowid) {
	manager.endEdit(rowid);
}

function deleteRow(rowid) {
	if(confirm('确定删除?')) {
		manager.deleteRow(rowid);
	}
}
var newrowid = 100;

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