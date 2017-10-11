define([{
  display: '分组ID',
  name: 'groupid',
  minWidth: 65,
  width: '10%',
  type: 'int'
}, {
  display: '分组名称',
  name: 'groupname',
  minWidth: 100,
  width: '20%'
}, {
  display: '应用省份',
  name: 'area',
  minWidth: 120,
  width: '15%'

}, {
    display: '应用城市',
    name: 'city_name',
    minWidth: 120,
    width: '15%'

},{
  display: '备注',
  name: 'remarks',
  editor: {
    type: 'text'
  },
  minWidth: 60,
  width: '20%'
}, {
  display: '操作',
  isSort: false,
  minWidth: 120,
  width: '20%',
  name: 'Apply',
  render: function(rowdata, rowindex, value) {
      var h = "";
      h += "<button type='button' rowindex='" + rowindex + "' class='btn btn-outline btn-info btn-xs row-btn row_btn_edit'>修改</button> ";
      h += "<button type='button' rowindex='" + rowindex + "' class='btn btn-outline btn-danger btn-xs row-btn row_btn_del'>删除</button> ";
      return h;
  }
}])
