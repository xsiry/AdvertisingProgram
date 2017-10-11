define([
  { display: '角色名称', name: 'rolename', width: '20%' },
  { display: '创建人', name: 'cruser', width: '10%' },
  { display: '创建时间', name: 'crtimes', width: '20%' },
  { display: '修改人', name: 'etuser', width: '10%'  },
  { display: '修改时间', name: 'ettimes', width: '20%' },
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
