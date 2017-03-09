define([{
  display: '模板ID',
  name: 'Id',
  minWidth: 65,
  width: '10%',
  type: 'int'
}, {
  display: '模板名称',
  name: 'Name',
  minWidth: 100,
  width: '20%'
}, {
  display: '应用条件',
  name: 'ApplyConditions',
  minWidth: 120,
  width: '20%'
}, {
  display: '最后修改',
  name: 'LatestCommit',
  minWidth: 60,
  width: '10%'
}, {
  display: '修改时间',
  name: 'UpdatedAt',
  tyep: 'date',
  format: 'yyyy-mm-dd HH:mm:ss',
  minWidth: 140,
  width: '15%'
}, {
  display: '操作',
  isSort: false,
  minWidth: 120,
  width: '25%',
  render: function(rowdata, rowindex, value) {
    var h = "";
    h += "<button type='button' name='" + rowindex + "' class='btn btn-outline btn-warning btn-xs row-btn row_btn_config'>配置</button> ";
    h += "<button type='button' name='" + rowindex + "' class='btn btn-outline btn-info btn-xs row-btn row_btn_edit'>修改</button> ";
    h += "<button type='button' name='" + rowindex + "' class='btn btn-outline btn-success btn-xs row-btn row_btn_publish'>发布</button> ";

    h += rowindex == 0 ? "" : "<button type='button' name='" + rowindex + "' class='btn btn-outline btn-danger btn-xs row-btn row_btn_delete'>删除</button> ";
    return h;
  }
}])
