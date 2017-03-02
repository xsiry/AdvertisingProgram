define(function(require, exports, module) {
	$.root_ = $('body');

	module.exports = {
		menus: [],
		init: function(data) {
			this.menus = data.map(function(menu) {
				return menuGenerate(menu.href, menu.title);
			});

			this.welcomeMsg();
			this.menusGenerate();
			require('menusAction');
			var user = require('./user_data');
			this.setProfile(user)
			this._bindUI();
		},
		_bindUI: function() {
			$.root_.on('click', 'a.login_out', function() {
				// clean cache
				window.location = 'app/login.html';
			})
		},
		menusGenerate: function() {
			var lis = this.menus.join('');
			$('#side-menu').append(lis);
			$('#side-menu >li:has(a[href="' + window.location.hash + '"])').addClass('active');
		},
		welcomeMsg: function() {
			setTimeout(function() {
				toastr.options = {
					closeButton: true,
					progressBar: true,
					showMethod: 'slideDown',
					timeOut: 4000
				};
				toastr.success('当前时间：' + getNowTime(), '欢迎进入 方格子●广告发布系统');

			}, 1300);
		},
		setProfile: function(user) {
			$('ul#side-menu .profile_img').attr('src', user.img);
			$('ul#side-menu .profile_name').text(user.name);
			$('ul#side-menu .profile_role').text(user.role);
		}
	};

	// Helpers
	/*
	 * 生成菜单
	 */
	function menuGenerate(href, title) {
		return "<li><a href=" + href + " title=" + title + "><i class='fa fa-th-large'></i> <span class='nav-label'>" + title + "</span></a></li>";
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

		var now = year + '-' + p(month) + "-" + p(date) + " " + p(h) + ':' + p(m) + ":" + p(s);
		return now;
	}
})