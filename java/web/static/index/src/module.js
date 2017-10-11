define(function (require, exports, module) {
    $.root_ = $('body');

    module.exports = {
        menus: [],
        init: function (data) {

            this.welcomeMsg();
            this.menusAjax(this, data);

            var user = require('./user_data');
            this.setProfile(user)
            this._bindUI();
        },
        _bindUI: function () {
            $.root_.on('click', 'a.login_out', function () {
                // clean cache
                window.location = 'app/login.html';
            })
        },
        menusAjax: function (me, data) {
            $.get('/menu/userMenus', {}, function (result) {
                var menusA = menuMap(result.Rows);

                // 测试方法，后期需删除
                var menusB = data.map(function (menu) {
                    return menuGenerate(menu);
                });
                me.menus = menusA.concat(menusB);
                menusA = null;
                menusB = null;

                me.menusGenerate();

                require('menusAction');

                // MetsiMenu
                $('#side-menu').metisMenu();
            }, 'json')
        },
        menusGenerate: function () {
            var lis = this.menus.join('');
            $('#side-menu').append(lis);
            $('#side-menu >li:has(a[href="' + window.location.hash + '"])').addClass('active');
        },
        welcomeMsg: function () {
            setTimeout(function () {
                toastr.options = {
                    closeButton: true,
                    progressBar: true,
                    showMethod: 'slideDown',
                    timeOut: 4000
                };
                toastr.success('当前时间：' + getNowTime(), '欢迎进入 方格子●广告发布系统');

            }, 1300);
        },
        setProfile: function (user) {
            $('ul#side-menu .profile_img').attr('src', user.img);
            $('ul#side-menu .profile_name').text(user.name);
            $('ul#side-menu .profile_role').text(user.role);
        }
    };

    // Helpers
    /*
     * 生成菜单
     */
    var level = 0;

    function menuMap(data) {
        return data.map(function (menu) {
            return rootMenu(menu);
        });
    }

    function rootMenu(menu) {
        var m = "<li>";
        m += "<a href=" + menu.href + " title=" + menu.name + ">";
        m += menu.level == 1 ? ("<i class='" + menu.icon + "'></i><span class='nav-label'>" + menu.name + "</span>") : menu.name;

        if (menu.children.length > 0) {
            m += childMenu(menu);
        } else {
            m += "</a></li>";
        }

        return m;
    }

    function childMenu(rootMenu) {
        var childMenuCssLevel = {1: 'second', 2: 'third', 3: 'four', 4: 'five'}; //配置子菜单样式
        var child = "<span class='fa arrow'></span></a><ul class='nav nav-" + childMenuCssLevel[rootMenu.level] + "-level'>";
        rootMenu.children.map(function (menu) {
            child += "<li><a href=" + menu.href + " title='" + menu.name + "'>" + menu.name;
            if (menu.children.length > 0) {
                child += childMenu(menu);
            } else {
                child += "</a></li>";
            }
        })
        child += "</ul></li>";
        return child;
    }

    // 测试方法，后期需删除
    function menuGenerate(menu) {
        var m = "<li>";
        m += "<a href=" + menu.href + " title=" + menu.title +
            "><i class='" + menu.icon + "'></i><span class='nav-label'>" + menu.title +
            "</span>";

        if (menu.childrens && menu.childrens.length > 0) {
            m += "<span class='fa arrow'></span></a><ul class='nav nav-second-level'>";
            menu.childrens.map(function (c) {
                m += "<li><a href=" + c.href + " title='" + c.title + "'>" + c.title
                if (c.childrens && c.childrens.length > 0) {
                    m += "<span class='fa arrow'></span></a><ul class='nav nav-third-level'>";
                    c.childrens.map(function (d) {
                        m += "<li><a href=" + d.href + " title='" + d.title + "'>" + d.title
                        if (d.childrens && d.childrens.length > 0) {
                            m += "<span class='fa arrow'></span></a><ul class='nav nav-four-level'>";
                            d.childrens.map(function (f) {
                                m += "<li><a href=" + f.href + " title='" + f.title + "'>" + f.title
                                m += "</a></li>";
                            });
                            m += "</ul></li>";
                        } else {
                            m += "</a></li>";
                        }
                        m += "</a></li>";
                    });
                    m += "</ul></li>";
                } else {
                    m += "</a></li>";
                }
                m += "</a></li>";
            });
            m += "</ul></li>";
        } else {
            m += "</a></li>";
        }

        return m;
    }

    /**
     * 获取当前时间
     */
    function getNowTime() {

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

        var now = [year, p(month), p(date)].join('-') + " " + [p(h), p(m), p(s)].join(':');
        return now;
    }
})
