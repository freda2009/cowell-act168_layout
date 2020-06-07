function showMyVideos(data) {
    function _showData($a) {
        var $youtube = $('#communityFeatures .youtube_');
        $youtube.children('.text').text($a.attr('title'));
        $youtube.children('.no').text('觀看次數：' + $a.data('viewcount'));
    }

    var feed = data.feed;
    var entries = feed.entry || [];
    var html = ['<ul>'];
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var title = entry.title.$t;
        var href = entry.link[0].href;
        var src = entry.media$group.media$thumbnail[0].url;
        var vCnt = (entry.yt$statistics && entry.yt$statistics.viewCount ? entry.yt$statistics.viewCount : 0 );
        html.push("<li><span><a href='" + href + "' title='" + title + "' target='_blank' data-viewcount='" + vCnt + "'><img src='" + src + "'></a></span></li>");
    }
    html.push('</ul>');
    $('#communityFeatures .lightboxImg').html(html.join('')).find('li:gt(0)').hide();

    var firstVideo = $('#communityFeatures .lightboxImg li:visible:first a');
    _showData(firstVideo);

    $('#communityFeatures .lightbox .on,#communityFeatures .lightbox .next').click(function () {
        var lis = $(this).siblings('.lightboxImg').find('li');
        var idx = lis.filter('li:visible').hide().index();
        if ($(this).hasClass('on')) idx--; else idx++;
        if (idx >= lis.length) idx = 0; else if (idx < 0) idx = lis.length - 1;
        var showLi = lis.eq(idx).show().find('a');
        _showData(showLi);
    });
}




function ePaperFunExecAction(sExecAction, $email, $sCode) {
    $.post("/WebCS/ajax/FunWebCSem80.ashx", { "ExecAction": sExecAction, "Email": $email.val(), "Code": $sCode.val() },
                    function (Msg) { if (Msg != "") { $email.val(''); alert(Msg.replace(/\\n/g, "\n")); } },'json');
}

$(function () {
  
    $('#communityFeatures .colCenter > div').hide().eq(0).show();
    $('#communityFeatures .h4TitleIcon a').click(function () {
        var $this = $(this);
        var idx = $this.data('no');
        $this.closest('span.h4TitleIcon').attr('class', 'h4TitleIcon').addClass('no' + idx);
        $('#communityFeatures .colCenter > div').hide().eq(idx - 1).show();

        if (idx == 2 && $this.data("loaded") != 'true') {
          $this.data("loaded", 'true');
          $('head').append("<script type='text/javascript' src='//gdata.youtube.com/feeds/api/users/tsengcha/uploads?v=2&max-results=3&format=5&alt=json-in-script&callback=showMyVideos' ><//script>");
        }
    });
    $('#sEmail').watermark("ex:news@actwg.com.tw");

    $('#ePaperOrder').click(function () { ePaperFunExecAction('B', $('#sEmail'), $('#sCode')); });
    $('#ePaperCancel').click(function () { ePaperFunExecAction('C', $('#sEmail'), $('#sCode')); });

});