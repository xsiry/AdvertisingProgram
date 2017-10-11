define([
    { display: '菜单', name: 'name', id: 'menus', width: '20%', align: 'left' },
    { display: '操作', name: 'remark', width: '80%',
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
            return rowdata.href != "#" ? h:'';
        }
    }
])