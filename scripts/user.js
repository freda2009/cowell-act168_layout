$(function() {
	$("#reemail").blur(function() {
		if (!$("#email").val()) {
			$("#d_email").html('<img src="./images/icon_error.gif" /><br /><span class="fc03">請填寫您的Email</span>');
			$("#email_check").val(0);
			return;
		}
		if ($("#reemail").val() != $("#email").val()) {
			$("#d_reemail").html('<img src="./images/icon_error.gif" /><div class="fc03">您兩次填寫的Email不符</div>');
			return;
		}
		$("#d_reemail").html('<img src="./images/icon_ok.gif" />');
	});
	$("#screenname").blur(function() {
		checkScreenname();
	});
});

function checkEmail() {
	if (!$("#email").val()) {
		$("#d_email").html('<img src="./images/icon_error.gif" /><div class="fc03">請填寫您的Email</div>');
		$("#email_check").val(0);
		return;
	}
	$.get("/user/check_email?email="+$("#email").val()+"&s="+Math.random(), function(data) {
		data = trim(data);
		if (data == "UEE") {
			$("#d_email").html('<img src="./images/icon_error.gif" /><div class="fc03">您填寫的電子郵件已經被佔用，請重新選擇</div>');
			$("#email_check").val(0);
			return;
		}
		if (data == "UIE") {
			$("#d_email").html('<img src="./images/icon_error.gif" /><div class="fc03">您填寫的電子郵件格式不正確</div>');
			$("#email_check").val(0);
			return;
		}
		$("#d_email").html('<img src="./images/icon_ok.gif" />');
		$("#email_check").val(1);
		return;
	});
}

function checkEmailEdu() {
	if (!$("#email").val()) {
		$("#d_email").html('<img src="./images/icon_error.gif" /><div class="fc03">請填寫您的Email</div>');
		$("#email_check").val(0);
		return;
	}
	$.get("/user/check_email?email="+$("#email").val()+"&edu=0&s="+Math.random(), function(data) {
		data = trim(data);
		if (data == "UEE") {
			$("#d_email").html('<img src="./images/icon_error.gif" /><div class="fc03">您填寫的電子郵件已經被佔用，請重新選擇</div>');
			$("#email_check").val(0);
			return;
		}
		if (data == "UIE") {
			$("#d_email").html('<img src="./images/icon_error.gif" /><div class="fc03">您填寫的電子郵件格式不正確</div>');
			$("#email_check").val(0);
			return;
		}
		if (data == "UUE") {
			$("#d_email").html('<img src="./images/icon_error.gif" /><div class="fc03">您的電子郵件地址不是.edu格式</div>');
			$("#email_check").val(0);
			return;
		}
		$("#d_email").html('<img src="./images/icon_ok.gif" />');
		$("#email_check").val(1);
		return;
	});
}

function checkScreenname() {
	$.get("/user/check_screenname?screenname="+$("#screenname").val()+"&s="+Math.random(), function(data) {
		data = trim(data);
		if (data == "USE") {
			$("#d_screenname").html('<img src="./images/icon_error.gif" /><div class="fc03">您填寫的用戶名已經被佔用，請重新選擇</div>');
			$("#screenname_check").val(0);
			return;
		}
		if (data == "USL") {
			$("#d_screenname").html('<img src="./images/icon_error.gif" /><div class="fc03">暱稱應為2-6個漢字或4-18個字符</div>');
			$("#screenname_check").val(0);
			return;
		}
		$("#d_screenname").html('<img src="./images/icon_ok.gif" />');
		$("#screenname_check").val(1);
		return;
	});
}

function checkRegister() {
	if ($("#email_check").val() == 0) {
		alert("您的Email地址沒有通過檢測，請重試");
		return false;
	} else if ($("#email").val() != $("#reemail").val()) {
		alert("您兩次輸入的Email地址不符");
		return false;
	} else if ($("#screenname_check").val() == 0) {
		alert("您的暱稱沒有通過檢測，請重試");
		return false;
	} else if ($("#password").val().length < 6 || $("#password").val().length > 16) {
		alert("密碼長度應為6-16個字符");
		return false;
	} else if ($("#password").val() != $("#repassword").val()) {
		alert("您兩次輸入的密碼不符");
		return false;
	} else if (!$("#agree").attr("checked")) {
		alert("請閱讀並接受條款");
		return false;
	} else {
		$("#submit_button").attr("disabled", true);
		return true;
	}
}

function checkRegisterEdu() {
	return checkRegister();
}

function checkWeiboLogin() {
	if ($("#email_check").val() == 0) {
		alert("您的Email地址沒有通過檢測，請重試");
		return false;
	} else if ($("#email").val() != $("#reemail").val()) {
		alert("您兩次輸入的Email地址不符");
		return false;
	} else if ($("#screenname_check").val() == 0) {
		alert("您的暱稱沒有通過檢測，請重試");
		return false;
	} else if (!$("#agree").attr("checked")) {
		alert("請閱讀並接受條款");
		return false;
	} else {
		$("#submit_button").attr("disabled", true);
		return true;
	}
}

function checkQqLogin() {
	if ($("#email_check").val() == 0) {
		alert("您的Email地址沒有通過檢測，請重試");
		return false;
	} else if ($("#email").val() != $("#reemail").val()) {
		alert("您兩次輸入的Email地址不符");
		return false;
	} else if ($("#screenname_check").val() == 0) {
		alert("您的暱稱沒有通過檢測，請重試");
		return false;
	} else if (!$("#agree").attr("checked")) {
		alert("請閱讀並接受條款");
		return false;
	} else {
		$("#submit_button").attr("disabled", true);
		return true;
	}
}

function checkLogin() {
	if ($("#email").val() == "") {
		alert('請填寫您的Email地址');
		return false;
	} else if ($("#password").val() == "") {
		alert('請填寫您的密碼');
		return false;
	} else {
		$("#submit_button").attr("disabled", true);
		return true;
	}
}

function checkForgotPassword() {
	if ($("#email").val() == "") {
		alert('請填寫您註冊時的Email地址');
		return false;
	} else {
		$("#submit_button").attr("disabled", true);
		return true;
	}
}

function checkCsource() {
	if ($("#csource").val() == "CSSA") {
		$("#csource_extra").show();
	} else {
		$("#csource_cssa").val("");
		$("#csource_extra").hide();
	}
}

function ajaxLogin() {
	var f = document.klogin;
	if (f.email.value == "") {
		alert("請輸入您的Email");
		f.email.focus();
		return false;
	} else if (f.password.value == "") {
		alert("請輸入您的密碼");
		f.password.focus();
		return false;
	} else {
		f.button.disabled = "disabled";
	}
	$.post("/user/do_login_quick?s=" + Math.random(), { email: f.email.value, password: f.password.value }, function(data) {
		data = trim(data);
		if (data == "OK") {
			alert("登陸成功");
			window.parent.location.reload();
			window.parent.location = window.parent.location;
		} else {
			alert(data);
			f.button.disabled = "";
		}
	});
	return false;
}

function resendActivatedEmail(email) {
	$.get("/user/resend_activate_email?email="+email+"&s=" + Math.random(), function(data) {
		data = trim(data);
		if (data == "OK") {
			alert("驗證郵件已重新發送，請檢查您的郵箱");
		} else {
			alert(data);
		}
	});
}


