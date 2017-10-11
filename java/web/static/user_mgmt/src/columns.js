define([
  { display: '姓名', name: 'username', width: '20%' },
  { display: '职务', name: 'rolename', width: '20%' },
  { display: '手机', name: 'phone', width: '20%' },
  { display: '状态', name: 'status', width: '20%',
    render: function(rowdata, rowindex, value) {
      return value == 1? '启用': '停用';
    }
  },
  {
    display: '操作',
    isSort: false,
    minWidth: 120,
    width: '20%',
    render: function(rowdata, rowindex, value) {
        var h = "";
            h += "<button type='button' rowindex='" + rowindex + "' class='btn btn-outline btn-info btn-xs row-btn row_btn_edit'>修改</button> ";
            h += "<button type='button' rowindex='" + rowindex + "' class='btn btn-outline btn-danger btn-xs row-btn row_btn_del'>删除</button> ";
        return h;
    }
  }
])
