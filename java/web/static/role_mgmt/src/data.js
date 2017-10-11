define({
    Rows: [
        { name: "广告业务管理", remark: "研发部" },
        { name: "图片链接管理", remark: "产品部" },
        { name: "图标广告管理", remark: "产品部" },
        { name: "插件广告管理", remark: "产品部" }, {
            name: "菜单分类广告",
            remark: "菜单分类广告",
            children: [{
                name: "一级分类",
                remark: "一级分类",
                children: [{
                    name: "一级分类",
                    remark: "一级分类",
                    children: [{
                        name: "一级分类",
                        remark: "一级分类"
                    }, {
                        name: "二级分类",
                        remark: "二级分类"
                    }, {
                        name: "三级分类",
                        remark: "三级分类"
                    }]
                }, {
                    name: "二级分类",
                    remark: "二级分类"
                }, {
                    name: "三级分类",
                    remark: "三级分类"
                }]
            }, {
                name: "二级分类",
                remark: "二级分类"
            }, {
                name: "三级分类",
                remark: "三级分类"
            }]
        }, {
            name: "广告模板",
            remark: "广告模板",
            children: [{
                name: "广告模板管理",
                remark: "一级分类"
            }, {
                name: "网吧列表管理",
                remark: "二级分类"
            }, {
                name: "发布历史",
                remark: "三级分类"
            }]
        }, {
            name: "数据统计",
            remark: "数据统计",
            children: [{
                name: "按模板统计",
                remark: "一级分类"
            }, {
                name: "按广告名称统计",
                remark: "二级分类"
            }, {
                name: "按广告位统计",
                remark: "三级分类"
            }, {
                name: "按网吧统计",
                remark: "三级分类"
            }, {
                name: "按广告业务统计",
                remark: "三级分类"
            }, {
                name: "按广告周期统计",
                remark: "三级分类"
            }, {
                name: "插件统计",
                remark: "三级分类"
            }]
        }, {
            name: "高级管理",
            remark: "广告模板",
            children: [{
                name: "用户列表管理",
                remark: "一级分类"
            }, {
                name: "权限管理",
                remark: "二级分类"
            }]
        }
    ]
})