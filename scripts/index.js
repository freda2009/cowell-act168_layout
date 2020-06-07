function showTC(id) {
	for (var i = 1; i <= 3; i ++) {
		$('#tc_a'+i).removeClass('current');
		$('#tc_d'+i).hide();
	}
	$('#tc_a'+id).addClass('current');
	$('#tc_d'+id).show();
}
function showPic(id) {
	if (id == 'n') {
		id = $(".thumb-current").attr('rel')
		if (id == $(".thumbs .thumb :last").attr('rel')) {
			return;
		}
		id = id - - 1;
	}
	if (id == 'p') {
		id = $(".thumb-current").attr('rel')
		if (id == $(".thumbs .thumb :first").attr('rel')) {
			return;
		}
		id = id - 1;
	}
	$(".thumbs .thumb").removeClass('thumb-current');
	$("#thumb_"+id).addClass('thumb-current');
	$(".picroll").css("marginLeft", "-"+id*420+'px');
}
function cTab(id) {
	$("#ctabs a").removeClass('current');
	$("#ctab"+id).addClass('current');
	$("#detail .detail_d").hide();
	$("#detail_d"+id).show();
}

function loadUserInfo(style) {
	$.get("/ajax/load_info/style-"+style+"/s-" + Math.random(), function(data) {
		$("#user_info_"+style).html(data);
	})
}

function setBookingComFrame() {
	$("#booking_com_frame").height('1000px');
}
function setCarRentFrame() {
	$("#car_rent_frame").height('600px');
}

function showPricing() {
	var t = $("#pricing_switch").val();
	$(".tr-pricing").hide();
	$(".tr-"+t).show();
	$("#op_start_date").html($("#pricing_switch").find("option:selected").attr("title"));
}

function showPreview(id, img, width) {
	$("#k_img_preview").html('<img src="' + img + '" width="' + width + '" style="margin: 5px;" />');
	$("#k_img_preview").css("display", "block");
	$("#k_thumb_" + id).hover(function(e) {
		var top = (e.pageY - 122);
		var left = (e.pageX - - 22);
		if ((left - - width) > document.documentElement.clientWidth) {
			$("#k_img_preview").css("top",top + "px").css("left",(e.pageX - 12 - width) + "px").fadeIn("fast");      
		} else {
			$("#k_img_preview").css("top",top + "px").css("left",left + "px").fadeIn("fast");      
		}
	});
	$("#k_thumb_" + id).mousemove(function(e) {
		var top = (e.pageY - 122);
		var left = (e.pageX - - 22);
		if ((left - - width) > document.documentElement.clientWidth) {
			$("#k_img_preview").css("top",top + "px").css("left",(e.pageX - 12 - width) + "px").fadeIn("fast");      
		} else {
			$("#k_img_preview").css("top",top + "px").css("left",left + "px").fadeIn("fast");      
		}
	});
}

function hidePreview() {
	$("#k_img_preview").css("display", "none");
	$("#k_img_preview").html('');
}

function loadArticleComment(article_id, page) {
	$("#comments").focus();
	$("#comments").html('<div class="m10 ac"><img src="./images/icon_loading_02.gif" alt="數據加載中" /></div>');
	$.get("/article/get_comments/id-" + article_id + "/page-" + page + "?s=" + Math.random(), function(data) {
		data = trim(data);
		$("#comments").html(data);
	});
}

function addToFavorite(tourcode) {
	$.get("/tour/add_to_favorite/tourcode-"+tourcode+"?s="+Math.random(), function(data) {
		data = trim(data);
		if (data == "NEED_LOGIN") {
			showLogin();
			return;
		}
		alert(data);
	})
}

var compareKey = 1;
var maxCompare = 3;
function addToCompare(tourcode) {
	if ($.cookie('LuluCompare_'+compareKey)) {
		if ($.cookie('LuluCompare_'+compareKey) == tourcode) {
			compareKey = 1;
			return;
		}
		compareKey ++;
		if (compareKey > maxCompare) {
			showCompareTips();
			return;
		}
		addToCompare(tourcode);
		return;
	}
	$.cookie('LuluCompare_'+compareKey, tourcode, {path:'/'});
	showCompare();
}

function removeCompare(key) {
	highlightCompare($.cookie('LuluCompare_'+key), false);
	$.removeCookie('LuluCompare_'+key, {path:'/'});
	compareKey = 1;
	showCompare();
}

function highlightCompare(tourcode, flag) {
	var t = $(".cpr_"+tourcode);
	if (flag) {
		if (t.hasClass("label")) {
			t.addClass('label-warning');
		}
		if (t.hasClass("btn")) {
			t.addClass("btn-warning");
		}
	} else {
		if (t.hasClass("label")) {
			t.removeClass('label-warning');
		}
		if (t.hasClass("btn")) {
			t.removeClass("btn-warning");
		}
	}
}

function showCompare() {
	var compare = '';
	var tours = 0;
	for (var i = 1; i <= maxCompare; i ++) {
		if ($.cookie('LuluCompare_'+i)) {
			tours ++;
			highlightCompare($.cookie('LuluCompare_'+i), true);
			compare += '<div><div class="100 fl">團號: '+$.cookie('LuluCompare_'+i)+'</div><div class="compare_remove"><a href="javascript:;" onclick="removeCompare('+i+');">X</a></div><div class="clear"></div></div><div class="bb3 h0 mtb5"></div>';
		}
	}
	if (compare == '') {
		$("#compare_ct").html(compare);
		closeCompare();
	} else {
		if (tours >= 2) {
			compare += '<div class="ac"><a href="javascript:clearCompare();" class="btn btn-small">清空</a><a href="javascript:doCompare();" class="btn btn-small ml10">對比</a></div>';
		}
		$("#compare").show();
		$("#compare_ct").html(compare);
	}
}

function closeCompare() {
	$("#compare").hide();
}

function showCompareTips() {
	alert('您已經選擇了3個旅行團，目前只支持3個旅行團對比');
}

function clearCompare() {
	for (var i = 1; i <= maxCompare; i ++) {
		if ($.cookie('LuluCompare_'+i)) {
			highlightCompare($.cookie('LuluCompare_'+i), false);
			$.removeCookie('LuluCompare_'+i, {path:'/'});
		}
	}
	compareKey = 1;
	showCompare();
}

function doCompare() {
	window.location = '/tour/compare';
}

function checkQna() {
	var f = document.kqna;
	if (f.name.value == "") {
		alert("請填寫您的姓名");
		f.name.focus();
		return false;
	} else if (f.email.value == "") {
		alert("請填寫您的Email");
		f.email.focus();
		return false;
	} else if (f.subject.value == "") {
		alert("請填寫您的提問主題");
		f.subject.focus();
		return false;
	} else if (f.content.value == "") {
		alert("請填寫您的問題內容");
		f.content.focus();
		return false;
	} else {
		f.button.disabled = "disabled";
		return true;
	}
	return false;
}

function checkContactForm() {
	var f = document.kcontact;
	if (f.name.value == "") {
		alert("請填寫您的姓名");
		f.name.focus();
		return false;
	} else if (f.email.value == "") {
		alert("請填寫您的Email");
		f.email.focus();
		return false;
	} else if (f.content.value == "") {
		alert("請填寫您的留言內容");
		f.content.focus();
		return false;
	} else {
		f.button.disabled = "disabled";
		return true;
	}
	return false;
}

function checkPasswordForm() {
	var f = document.kform;
	if (f.old_password.value == "") {
		alert("請輸入您當前的密碼");
		f.old_password.focus();
		return false;
	} else if (f.password.value.length > 16 || f.password.value.length < 6) {
		alert("密碼長度應為6-16個字符");
		f.password.focus();
		return false;
	} else if (f.repassword.value != f.password.value) {
		alert("請確保您兩次輸入的密碼相符");
		f.repassword.focus();
		return false;
	} else {
		f.button.disabled = "disabled";
		return true;
	}
	return false;
}

function checkProfileForm() {
	var f = document.kform;
	if (f.name.value == "") {
		alert("請輸入您的姓名");
		f.name.focus();
		return false;
	} else if (f.country.value == "") {
		alert("請選擇您所屬的國家");
		f.country.focus();
		return false;
	} else if (f.phone1.value == "") {
		alert("請輸入您的電話");
		f.phone1.focus();
		return false;
	} else if (f.csource.value == "") {
		alert("請選擇您瞭解本站的來源");
		f.csource.focus();
		return false;
	} else {
		f.button.disabled = "disabled";
		return true;
	}
	return false;
}

function checkComment() {
	var f = document.kcomment;
	if (f.content.value == "") {
		alert("請填寫您的評論內容");
		f.content.focus();
		return false;
	} else {
		f.button.disabled = "disabled";
		return true;
	}
	return false;
}

function getWeather(city, theme) {
	$.get("/ajax/get_weather?city="+city+"&theme="+theme+"&s="+Math.random(), function(data) {
		data = trim(data);
		$("#weather").html(data);
	});
}

function extendTours(tab, region) {
	//$(".tc_d"+tab+"_a").addClass("tc_extend");
	//$("#tc_d"+tab+" .tc_ds").show();
	$("#tc_d"+tab+"_a"+region).toggleClass("tc_extend");
	$("#tc_d"+tab+"_a"+region+" .tc_ds").toggleClass("tc_ds-minus");
	//$("#tc_d"+tab+"_a"+region+" .tc_ds").hide();
}

function showSd(index) {
	$("#sd_tabs a").removeClass("active");
	$("#sd_t"+index).addClass("active");
	$(".sd_ctt").hide();
	$("#sd_c"+index).show();
}

function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

function showLogin() {
	$.colorbox({href:"/user/login_quick",iframe:true,width:730,height:390});
}

function showColorBox(url) {
	$.colorbox({href:url+'?s='+Math.random()});
}

function setLang(lang) {
	if (lang == "EN") {
		window.location = 'http://en.lulutrip.com';
		return;
	}
	$.get("/ajax/set_lang/lang-"+lang+"?s="+Math.random(), function(data) {
		data = trim(data);
		if (data == "OK") {
			window.location.reload();
		} else {
			alert(data);
		}
	});
}

function setCurrency(currency) {
	$.get("/ajax/set_currency/currency-"+currency+"?s="+Math.random(), function(data) {
		data = trim(data);
		if (data == "OK") {
			window.location.reload();
		} else {
			alert(data);
		}
	});
}

function removeFilter(col, id) {
	$("#filter_"+col+"_"+id).attr("checked", false);
	document.kfilter.submit();
}

function showWeixin() {
	$.colorbox({href:"/images/weixin_code.jpg"});
}

function show_submenu_list(obj_id) {
	$(".submenu_list").hide();
	$(".submenu_item").removeClass("current");
	if (obj_id != null) {
		$("#submenu_"+obj_id+"_list").show();
		$("#switch_submenu_"+obj_id+"_list").addClass("current");
	};
	return false;
}
var sl_flag = false;
var tl_flag = false;
var vl_flag = false;
function showSceneList() {
	if (!sl_flag) {
		sl_flag = true;
		$("#top_scene_list").show();
		$("#switch_scene_list").addClass("current");
		tl_flag = true;
		showTourList();
		vl_flag = true;
		showVisaList();
	} else {
		sl_flag = false;
		$("#top_scene_list").hide();
		$("#switch_scene_list").removeClass("current");
	}
}
function showTourList() {
	if (!tl_flag) {
		tl_flag = true;
		$("#top_tour_list").show();
		$("#switch_tour_list").addClass("current");
		sl_flag = true;
		showSceneList();
		vl_flag = true;
		showVisaList();
	} else {
		tl_flag = false;
		$("#top_tour_list").hide();
		$("#switch_tour_list").removeClass("current");
	}
}
function showVisaList() {
	if (!vl_flag) {
		vl_flag = true;
		$("#top_visa_list").show();
		$("#switch_visa_list").addClass("current");
		sl_flag = true;
		showSceneList();
		tl_flag = true;
		showTourList();
	} else {
		vl_flag = false;
		$("#top_visa_list").hide();
		$("#switch_visa_list").removeClass("current");
	}
}
function showToplTab(act) {
	$(".topl_frms_frm").hide();
	$("#topl_"+act).show();
	$(".topl_tabs_tab").removeClass('current');
	$("#top_tab_"+act).addClass("current");
}

$(function() {
	// checkMessage();
	// Confirm
	$(".confirm").click(function() {
		$('#confirmModal').modal();
		$("#modalMessage").html($(this).attr('rel'));
		$("#modalSave").attr('href',$(this).attr('href'));
		return false;
	});
	$(".officer").mouseover(function() {
		var id = $(this).attr("id");
		$("#"+id+" .photo img").attr('src','/images/team/'+id+'_2.png').css('z-index','6');
		$("#d_"+id).css("z-index",'5').show();
	});
	$(".officer").mouseout(function() {
		var id = $(this).attr("id");
		$("#"+id+" .photo img").attr('src','/images/team/'+id+'_1.png').css('z-index','2');
		$("#d_"+id).css("z-index",'1').hide();
	});
	$(".scene_thumbs .scene_thumb").click(function() {
		showScenePhoto($(this));
	});
	showScenePhoto($(".scene_thumbs .scene_thumb:first"));
});
function showScenePhoto(obj) {
	$(".scene_thumbs img").removeClass("active");
	obj.addClass("active");
	$(".scene_photo img").hide();
	$("#SPI_"+obj.attr("data-rel")).show();
}

var from_gened = false;
var to_gened = false;
function genFromLocation() {
	if (!$("#kls_to").val()) { return; }
	if (from_gened) { return; }
	to_gened = true;
	$("#kls_from").html('');
	$("#kls_from").select2();
	$.get("/ajax/gen_from/id-"+$("#kls_to").val()+"?s="+Math.random(), function(data) {
		$("#kls_from").html(data);
		$("#kls_from").select2();
	});
}

function genToLocation() {
	if (!$("#kls_from").val()) { return; }
	if (to_gened) { return; }
	from_gened = true;
	$("#kls_to").html('');
	$("#kls_to").select2();
	$.get("/ajax/gen_to/city-"+$("#kls_from").val()+"?s="+Math.random(), function(data) {
		$("#kls_to").html(data);
		$("#kls_to").select2();
	});
}

var currentindex = 1;
var maxindex;
$(function() {
	$("#flashBg").css("background-color",$("#flash1").attr("name"));
	maxindex = $("#flash_total").val();
	startAm();
	$(".home_theme").click(function() {
		$(".home_theme_ctt").hide();
		$("#home_theme_"+$(this).attr("rel")).show("fast");
	});
	$(".home_tab").hover(function() {
		$(".home_tab").removeClass("current");
		$(this).addClass("current");
		$(".home_tab_ctt").hide();
		$("#home_tab_"+$(this).attr("rel")).show();
	});
	$(".tab_tour_link").hover(function() {
		$(".tab_tour_cover_"+$(this).attr("data-key")).hide();
		$("#ht_"+$(this).attr("data-key")+"_"+$(this).attr("data-tourcode")).show();
	});
	$(".fc_tour_link").hover(function() {
		$(".fc_tour_cover_"+$(this).attr("data-key")).hide();
		$("#fc_"+$(this).attr("data-key")+"_"+$(this).attr("data-tourcode")).show();
	});
	$(".rec_tour_link").hover(function() {
		$(".rec_tour_cover_"+$(this).attr("data-key")).hide();
		$("#rec_"+$(this).attr("data-key")+"_"+$(this).attr("data-tourcode")).show();
	});
});
function changeflash(i) {
	currentindex = i;

	for (j = 1; j <= maxindex; j++) {
		if (j == i) { 
			$("#flash"+j).fadeIn("normal");
			$("#flash"+j).show();
			$("#f"+j).removeClass();
			$("#f"+j).addClass("dq");
			$("#flashBg").css("background-color",$("#flash"+j).attr("name"));
		} else {
			$("#flash"+j).hide();
			$("#f"+j).removeClass();
			$("#f"+j).addClass("no");
		}
	}
}
function startAm(){
	timerID = setInterval("timer_tick()",8000);
}
function stopAm(){
	clearInterval(timerID);
}
function timer_tick() {
    currentindex = currentindex >= maxindex ? 1 : currentindex + 1;
	changeflash(currentindex);
}

function checkMessage() {
	$.get("/ajax/check_message?s="+Math.random(), function(data) {
		data = trim(data);
		if (data > 0) {
			$("#user_navi_message").html(' ('+data+')');
			$("#top_message").html('<span class="divider">|</span> <a href="/my/inbox"><img src="./images/icon_message_01.gif" alt="站內信" /> <span class="fc03">('+data+')</span></a>');
		}
	});
}


/**
 * big_banner init
 */
$(function() {
	// make banner list and structure
	$banner_view = $(".view-home-page-big-banner");
	// make banner bar
	$banner_bar = $('<div class="banner_bar flash_bar"></div>')
	$(".view-content", $banner_view).append($banner_bar);
	// loop structure
	$(".banner-item", $banner_view).each(function(index, Element){
		// set item data-value
		$(Element).attr("data-value", index);
		$(Element).addClass("banner_item_"+index);
	});
	// make behavior
	$banner_view.on("fire", function (event, item_id) {
		clearInterval($banner_view.attr("timerID"));
    // find current
    $current = $(".banner-item.current", $(this));
    if ($current.size() == 0 && $(".banner-item").size() > 0) { 
    	$current = $(".banner-item").last(); 
    	$current.addClass("current");
    };
    // find next
    $next = $current.next(".banner-item");
    if (item_id) { $next = $(".banner_item_"+item_id, $(this)); };
    if ($next.size() == 0) { $next = $(".banner-item", $(this)).first(); };
    // show slide, default sec: 6
    $current.removeClass('current').fadeOut({
    	done: function () {
    		if ($next.attr("data-value") == null) {
    			clearInterval($banner_view.attr("timerID"));
    			$banner_view.trigger("fire");
    			return false;
    		};
    		$('.banner_bar > div').attr("class", "no");
    		$('#banner_bar_item_'+$next.attr("data-value")).attr("class", "dq");
    		$next.addClass("current");
    		$next.fadeIn();
    		$sec = $banner_view.attr('data-sec');
    		$sec = ($sec==null) ? 10 : parseInt($sec, 10);
    		$banner_view.attr("timerID", setTimeout(function(){ $banner_view.trigger("fire"); }, $sec * 1000));
    	}
    });
  });
	// animation start
	$banner_view.trigger("fire");
});

/**
 * nav_message News slideUpDown start....
 */
$(function() {
  $("#nav_message").on("slideUpDown", function(event){
    // find current
    $current = $(".slideUpDown.current", $(this));
    if ($current.size() == 0 && $(".slideUpDown").size() > 0) { 
      $current = $(".slideUpDown").last(); 
      $current.addClass("current");
    };
    // find next
    $next = $current.next(".slideUpDown");
    if ($next.size() == 0) { $next = $(".slideUpDown", $(this)).first(); };
    // show slide, default sec: 6
    $current.removeClass('current').slideUp({
      complete: function () {
        $next.addClass("current");
        $next.slideDown();
        $sec = $("#nav_message").attr('data-sec');
        $sec = ($sec==null) ? 6 : parseInt($sec, 10);
        setTimeout(function(){ $("#nav_message").trigger("slideUpDown"); }, $sec * 1000);
      }
    });
  });
  $("#nav_message").trigger("slideUpDown");
});

// 加入最愛
function addBookmarkForBrowser(sTitle, sUrl)
{

	var title = sTitle;
	var url = sUrl;
	var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

	if (is_chrome) {
		alert('Press ' + (navigator.userAgent.toLowerCase().indexOf('mac') != - 1 ? 'Command/Cmd' : 'CTRL') + ' + D to bookmark this page.');
	}
	else if(window.sidebar){
		/* Mozilla Firefox Bookmark */
		// window.sidebar.addPanel(title, url, "");
	}else if(window.external){
		/* IE Favorite */
		window.external.AddFavorite(url, title);
	}else if(window.opera && window.print) {
		/* Opera Hotlist */
		alert("Press Control + D to bookmark");
		return true;
	}else{
		/* Other */
		alert("Press Control + D to bookmark");
	}
}