/*JS資料來源:http://abgne.tw/jquery/apply-jquery/youtube-movie-playlist.html
原本ul.playlist
修改為ul.youtobe_playlist
 */
$(function(){
	var thumbSize = 'large',		// 設定要取得的縮圖是大圖還是小圖
						// 大圖寬高為 480X360；小圖寬高為 120X90
		swfWidth = '240',		// 限制圖片的寬及 YouTube 影片的寬
		swfHeight = '180',		// 限制圖片的高及 YouTube 影片的高
		autoPlay = '&autoplay=1',	// 是否載入 YouTube 影片後自動播放；若不要自動播放則設成 0
		fullScreen = '&fs=1';		// 是否允許播放 YouTube 影片時能全螢幕播放
 
	$('ul.youtobe_playlist>li>a').each(function(){
		// 取得要連結轉換的網址及訊息內容
		var _this =  $(this),
			_url = _this.attr('href'),
			_info = _this.text(),
			_type = (thumbSize == 'large') ? 0 : 2;
 
		// 取得 vid
		var vid = _url.match('[\\?&]v=([^&#]*)')[1];
 
		// 取得縮圖
		var thumbUrl = "http://img.youtube.com/vi/"+vid+"/" + _type + ".jpg";
 
		// 把目前超連結的內容轉換成圖片並加入 click 事件
		_this.html('<img src="'+thumbUrl+'" alt="'+_info+'" title="'+_info+'" width="'+swfWidth+'" height="'+swfHeight+'" />').click(function(){
			return false;
		}).focus(function(){
			this.blur();
		}).children('img').click(function(){
			// 當點擊到圖片時就轉換成 YouTube 影片
			var swf  = '<object height="'+swfHeight+'" width="'+swfWidth+'">';
			swf += '<param name="movie" value="http://www.youtube.com/v/'+vid+autoPlay+fullScreen+'"></param>';
			swf += '<param name="wmode" value="transparent"></param>';
			swf += (fullScreen == '&fs=1') ? '<param name="allowfullscreen" value="true"></param>' : '';
 
			swf += '<embed type="application/x-shockwave-flash" src="http://www.youtube.com/v/'+vid+autoPlay+fullScreen+'" ';
			swf += (fullScreen == '&fs=1') ? 'allowfullscreen="true" ' : '';
			swf += 'wmode="transparent" height="'+swfHeight+'" width="'+swfWidth+'"></embed>';
 
			swf += '</object/>';
 
			$(this).parent('a').html(swf);
 
			return false;
		});
	});
});