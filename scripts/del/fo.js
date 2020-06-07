
jq(function() {
var sWidth = jq("#focus").width(); 
var len = jq("#focus ul li").length; 
var index = 0;
var picTimer;


var btn = "<div class='btnBg'></div><div class='btn'>";
for(var i=0; i < len; i++) {
btn += "<span></span>";
}
btn += "</div><div class='preNext pre'></div><div class='preNext next'></div>";
jq("#focus").append(btn);
jq("#focus .btnBg").css("opacity",0.5);


jq("#focus .btn span").css("opacity",0.4).mouseenter(function() {
index = jq("#focus .btn span").index(this);
showPics(index);
}).eq(0).trigger("mouseenter");


jq("#focus .preNext").css("opacity",0.1).hover(function() {
jq(this).stop(true,false).animate({"opacity":"0.4"},300);
},function() {
jq(this).stop(true,false).animate({"opacity":"0.1"},300);
});


jq("#focus .pre").click(function() {
index -= 1;
if(index == -1) {index = len - 1;}
showPics(index);
});


jq("#focus .next").click(function() {
index += 1;
if(index == len) {index = 0;}
showPics(index);
});


jq("#focus ul").css("width",sWidth * (len));


jq("#focus").hover(function() {
clearInterval(picTimer);
},function() {
picTimer = setInterval(function() {
showPics(index);
index++;
if(index == len) {index = 0;}
},4000); 
}).trigger("mouseleave");

function showPics(index) { 
var nowLeft = -index*sWidth; 
jq("#focus ul").stop(true,false).animate({"left":nowLeft},300); 
//jq("#focus .btn span").removeClass("on").eq(index).addClass("on"); 
jq("#focus .btn span").stop(true,false).animate({"opacity":"0.4"},300).eq(index).stop(true,false).animate({"opacity":"1"},300); 
}
});
