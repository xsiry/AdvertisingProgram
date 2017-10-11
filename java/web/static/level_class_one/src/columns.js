define([{
  display: '编号',
  name: 'Id',
  minWidth: 65,
  width: '10%',
  type: 'int'
}, {
  display: '分类名称',
  name: 'Name',
  minWidth: 100,
  width: '15%'
}, {
  display: '图标',
  name: 'Icon',
  minWidth: 120,
  width: '10%'
}, {
  display: '指向',
  name: 'Direction',
  editor: {
    type: 'text'
  },
  minWidth: 60,
  width: '10%'
}, {
  display: '链接',
  name: 'Link',
  editor: {
    type: 'text'
  },
  minWidth: 60,
  width: '20%'
}, {
  display: '最后修改',
  name: 'LatestCommit',
  editor: {
    type: 'text'
  },
  minWidth: 140,
  width: '15%'
}, {
  display: '修改时间',
  name: 'UpdatedAt',
  minWidth: 60,
  editor: {
    type: 'text'
  },
  width: '10%'
}, {
  display: '操作',
  isSort: false,
  minWidth: 120,
  width: '10%',
  name: 'Apply',
  render: function(rowdata, rowindex, value) {
    var h = "";
    if (!rowdata._editing) {
      h += "<button type='button' name='" + rowindex + "' class='btn btn-outline btn-info btn-xs row-btn row_btn_edit'>修改</button> ";
    } else {
      h += "<button type='button' name='" + rowindex + "' class='btn btn-outline btn-primary btn-xs row-btn row_btn_end'>提交</button> ";
      h += "<button type='button' name='" + rowindex + "' class='btn btn-outline btn-info btn-xs row-btn row_btn_cancel'>取消</button> ";
    }
    return h;
  }
}])
