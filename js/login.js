// 表单验证
function inputValidator() {
	$('#loginForm').bootstrapValidator({
		message: '该项不能为空',
		fields: {
			inputUsername: {
				message: '账号不能为空',
				validators: {
					notEmpty: {
						message: '账号不能为空'
					},
					regexp: {
						regexp: /^[a-zA-Z0-9_]+$/,
						message: '账号只能由字母、数字和下划线组成'
					}
				}
			},
			inputPassword: {
				validators: {
					notEmpty: {
						message: '密码不能为空'
					}
				}
			}
		}
	})
};
// 异步提交表单
function ajaxSubmit() {
	$("#loginForm").submit(function() {
		if(!$("#loginForm").data('bootstrapValidator').isValid()) {
			return false;
		}
		if( !validateCode()) {
			return false;
		}

		var data = {};
		var arr = $("#loginForm").serializeArray();
		$.each(arr, function() {
			data[this.name] = this.value;
		});

		$.ajax({
			type: 'GET',
			url: 'login.json',
			data: data,
			dataType: 'json',
			success: function(data) {
				if(data.status == "success") {
					saveUserInfo();
					location.href = "index.html";
					$.gritter.add({
						title: '登录成功',
						sticky: false,
						time: 1000,
						speed: 500,
						position: 'bottom-right',
						class_name: 'gritter-success'
					});
				} else {
					$.gritter.add({
						title: '登录失败',
						text: data.msg,
						sticky: false,
						time: 1000,
						speed: 500,
						position: 'bottom-right',
						class_name: 'gritter-error'
					});
					return false;
				}

			},
			error: function() {
				$.gritter.add({
					title: '登录失败',
					text: '未知错误，请稍后再试',
					sticky: false,
					time: 1000,
					speed: 500,
					position: 'bottom-right',
					class_name: 'gritter-error'
				});
				$('#inputUsername').select();
				$('#inputUsername').focus();
			}
		});
	})

};
// 检查Cookie，并设置
function checkCookie() {
	// 记住密码选中时，记住账号则自动选中 反之
	$('#rmbPassWord').click(function() {
		$("#rmbPassWord").is(':checked') == true ? $("#rmbUser").prop("checked", 'true') : $("#rmbUser").prop("checked", false);
	});

	//初始化页面时验证是否记住了帐号
	if($.cookie("rmbUser") == "true") {
		$("#rmbUser").prop("checked", true);
		$("#inputUsername").val($.cookie("userName"));
	};

	//初始化页面时验证是否记住了密码
	if($.cookie("rmbPassWord") == "true") {
		$("#rmbPassWord").prop("checked", true);
		$("#inputPassword").val($.cookie("passWord"));
	};
};

//保存用户信息，存储一个带7天期限的 cookie 或者 清除 cookie
function saveUserInfo() {
	// 保存帐号和密码
	if($("#rmbUser").is(':checked') == true && $("#rmbPassWord").is(':checked') == true) {
		var userName = $("#inputUsername").val();
		var passWord = $("#inputPassword").val();

		$.cookie("rmbUser", "true", { expires: 7 });
		$.cookie("rmbPassWord", "true", { expires: 7 });
		$.cookie("userName", userName, { expires: 7 });
		$.cookie("passWord", passWord, { expires: 7 });

		// 只保存帐号
	} else if($("#rmbUser").is(':checked') == true) {
		var userName = $("#inputUsername").val();

		$.cookie("rmbUser", "true", { expires: 7 });
		$.cookie("userName", userName, { expires: 7 });

		$.cookie("rmbPassWord", "false", { expires: -1 });
		$.cookie("passWord", '', { expires: -1 });
		// 清除用户信息的 cookie
	} else {
		$.cookie("rmbUser", "false", { expires: -1 });
		$.cookie("rmbPassWord", "false", { expires: -1 });
		$.cookie("userName", '', { expires: -1 });
		$.cookie("passWord", '', { expires: -1 });
	}
};