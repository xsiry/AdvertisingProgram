define([{
  display: '游戏ID',
  name: 'gameid',
  minWidth: 65,
  width: '10%',
  type: 'int'
}, {
    display: '游戏名称',
    name: 'game_name',
    minWidth: 65,
    width: '10%',
    type: 'int'
}, {
    display: '游戏分类',
    name: 'game_type',
    minWidth: 65,
    width: '10%',
    type: 'int'
}, {
    display: '游戏大小',
    name: 'game_size',
    minWidth: 65,
    width: '10%',
    type: 'int'
}, {
    display: '热门值',
    name: 'host',
    minWidth: 65,
    width: '10%',
    type: 'int'
}, {
    display: '更新时间',
    name: 'uptime',
    minWidth: 65,
    width: '13%',
    type: 'int'
}, {
  display: '启动器模板',
  name: 'module',
  minWidth: 100,
  width: '10%'
}, {
  display: '广告区域',
  name: 'ad_area',
  minWidth: 120,
  width: '10%'

},  {
  display: '操作',
  isSort: false,
  minWidth: 120,
  width: '13%',
  name: 'Apply',
  render: function(rowdata, rowindex, value) {
      var h = "";
      h += "<button type='button' rowindex='" + rowindex + "' class='btn btn-outline btn-info btn-xs row-btn row_btn_edit'>修改</button> ";
      h += "<button type='button' rowindex='" + rowindex + "' class='btn btn-outline btn-danger btn-xs row-btn row_btn_del'>删除</button> ";
      return h;
  }
}])
