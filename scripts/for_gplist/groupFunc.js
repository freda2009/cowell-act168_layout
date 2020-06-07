$(document).ready(function() {

    //是否為測試環境，是為 1、否為 0
    var istest = (location.href.indexOf("localhost") > -1) ? 1 : 0;
    var ip = (istest == 1) ? "/" : "http://ticket.ftstour.com.tw/FTS_Group_Index/";

    // 判斷是否有預設值
    var defaultValue = false;
    if (0 < $.trim($('#DefaultAirportOption').val()).length) {
        $DefaultAirportOption = $('#DefaultAirportOption').val().split(',');
        defaultValue = true;
    }

    // 設定預設選項
    var carr_cd = null;
    var city = null;
    if (defaultValue) {
        $('#ITN_AREA').selectOptions($DefaultAirportOption[0]);  //地區
        carr_cd = $DefaultAirportOption[3];
        city = $DefaultAirportOption[2];
    }

    // 觸發第一階(地區)下拉式選單，連動第二階(國家)
    $('#ITN_AREA').change(function() {
        $.ajax({  //jQuery 跨網域Ajax (jsonp)
            type: "GET",
            url: ip + "GetCityData.ashx",
            data:
            {
                AREA_CD: $("#ITN_AREA").val(),
                level: "2"
            },
            dataType: "jsonp",
            cache: false,
            success: function(data) {
                data = $.parseJSON(data);

                // 透過ajax方式取得資料，更新第二階(國家)下拉式選單內容
                $("#ITN_NATN").removeOption(/.?/).addOption(data, false);
                $("#ITN_CITY").removeOption(/.?/).addOption("", "請選擇");

                // 設定預設選項
                if (defaultValue) {
                    $('#ITN_NATN').selectOptions($DefaultAirportOption[1]).trigger('change');
                }
            }
        });
    }).trigger('change');

    // 觸發第二階(國家)，連動第三階(城市)下拉式選單
    $('#ITN_NATN').change(function() {
        $.ajax({  //jQuery 跨網域Ajax (jsonp)
            type: "GET",
            url: ip + "GetCityData.ashx",
            data:
            {
                NATN_CD: $("#ITN_NATN").val(),
                level: "3"
            },
            dataType: "jsonp",
            cache: false,
            success: function(data) {
                data = $.parseJSON(data);

                // 透過ajax方式取得資料，更新第三階(城市)下拉式選單內容
                $("#ITN_CITY").removeOption(/.?/).addOption(data, false);

                // 設定預設選項
                if (defaultValue) {
                    $('#ITN_CITY').selectOptions($DefaultAirportOption[2]).trigger('change');
                }

                //如果為優先選項時改變文字顏色
                var arr = defaultCity.split(' ');
                for (var i = 0; i < arr.length; i++) {
                    $("select[name='ITN_CITY'] option:contains('" + arr[i] + "')").each(function(i, data) {
                        $(data).addClass("highlight");
                    });
                }
            }
        });
    });
});