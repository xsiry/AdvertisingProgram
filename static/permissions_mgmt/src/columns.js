define([
  { display: '菜单名称', name: 'name', id: 'menus', width: '20%', align: 'left' },
  { display: '查看', name: 'remark', width: '10%',
    render: function(rowdata, rowindex, value) {
      var checked = value ? ' checked ' : '';
      var h = "";
      h += '<div class="switch"><div class="onoffswitch">';
      h += '<input type="checkbox"' + checked;
      h += 'class="onoffswitch-checkbox" id="switch'+ rowindex +'">';
      h += '<label class="onoffswitch-label" for="switch'+ rowindex +'">';
      h += '<span class="onoffswitch-inner"></span>';
      h += '<span class="onoffswitch-switch"></span>';
      h += '</label></div></div>';
      return h;
    }
  },
  { display: '新增', name: 'remark', width: '10%',
    render: function(rowdata, rowindex, value) {
      var checked = value ? ' checked ' : '';
      var h = "";
      h += '<div class="switch"><div class="onoffswitch">';
      h += '<input type="checkbox"' + checked;
      h += 'class="onoffswitch-checkbox" id="switch'+ rowindex +'">';
      h += '<label class="onoffswitch-label" for="switch'+ rowindex +'">';
      h += '<span class="onoffswitch-inner"></span>';
      h += '<span class="onoffswitch-switch"></span>';
      h += '</label></div></div>';
      return h;
    }},
  { display: '修改', name: 'remark', width: '10%',
    render: function(rowdata, rowindex, value) {
      var checked = value ? ' checked ' : '';
      var h = "";
      h += '<div class="switch"><div class="onoffswitch">';
      h += '<input type="checkbox"' + checked;
      h += 'class="onoffswitch-checkbox" id="switch'+ rowindex +'">';
      h += '<label class="onoffswitch-label" for="switch'+ rowindex +'">';
      h += '<span class="onoffswitch-inner"></span>';
      h += '<span class="onoffswitch-switch"></span>';
      h += '</label></div></div>';
      return h;
    }},
  { display: '删除', name: 'remark', width: '10%',
    render: function(rowdata, rowindex, value) {
      var checked = value ? ' checked ' : '';
      var h = "";
      h += '<div class="switch"><div class="onoffswitch">';
      h += '<input type="checkbox"' + checked;
      h += 'class="onoffswitch-checkbox" id="switch'+ rowindex +'">';
      h += '<label class="onoffswitch-label" for="switch'+ rowindex +'">';
      h += '<span class="onoffswitch-inner"></span>';
      h += '<span class="onoffswitch-switch"></span>';
      h += '</label></div></div>';
      return h;
    }},
  { display: '上架', name: 'remark', width: '10%',
    render: function(rowdata, rowindex, value) {
      var checked = value ? ' checked ' : '';
      var h = "";
      h += '<div class="switch"><div class="onoffswitch">';
      h += '<input type="checkbox"' + checked;
      h += 'class="onoffswitch-checkbox" id="switch'+ rowindex +'">';
      h += '<label class="onoffswitch-label" for="switch'+ rowindex +'">';
      h += '<span class="onoffswitch-inner"></span>';
      h += '<span class="onoffswitch-switch"></span>';
      h += '</label></div></div>';
      return h;
    }},
  { display: '下架', name: 'remark', width: '10%',
    render: function(rowdata, rowindex, value) {
      var checked = value ? ' checked ' : '';
      var h = "";
      h += '<div class="switch"><div class="onoffswitch">';
      h += '<input type="checkbox"' + checked;
      h += 'class="onoffswitch-checkbox" id="switch'+ rowindex +'">';
      h += '<label class="onoffswitch-label" for="switch'+ rowindex +'">';
      h += '<span class="onoffswitch-inner"></span>';
      h += '<span class="onoffswitch-switch"></span>';
      h += '</label></div></div>';
      return h;
    }},
  { display: '发布', name: 'remark', width: '10%',
    render: function(rowdata, rowindex, value) {
      var checked = value ? ' checked ' : '';
      var h = "";
      h += '<div class="switch"><div class="onoffswitch">';
      h += '<input type="checkbox"' + checked;
      h += 'class="onoffswitch-checkbox" id="switch'+ rowindex +'">';
      h += '<label class="onoffswitch-label" for="switch'+ rowindex +'">';
      h += '<span class="onoffswitch-inner"></span>';
      h += '<span class="onoffswitch-switch"></span>';
      h += '</label></div></div>';
      return h;
    }},
  { display: '配置', name: 'remark', width: '10%',
    render: function(rowdata, rowindex, value) {
      var checked = value ? ' checked ' : '';
      var h = "";
      h += '<div class="switch"><div class="onoffswitch">';
      h += '<input type="checkbox"' + checked;
      h += 'class="onoffswitch-checkbox" id="switch'+ rowindex +'">';
      h += '<label class="onoffswitch-label" for="switch'+ rowindex +'">';
      h += '<span class="onoffswitch-inner"></span>';
      h += '<span class="onoffswitch-switch"></span>';
      h += '</label></div></div>';
      return h;
    }}
])
