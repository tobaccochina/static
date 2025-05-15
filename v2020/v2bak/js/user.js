layui.config({
  base: '../static/v2020/v2/js/' //存放拓展模块的根目录
}).extend({ //设定模块别名
   debug: true,
  common: 'common',
  liMarquee: 'liMarquee'
});
layui.use(['jquery','common','liMarquee'], function(){
	
  var common = layui.common;
  var element = layui.element;
  var ie=common.IEVersion();
  var carousel = layui.carousel;
  var $ = layui.jquery;
  if(ie>0&&ie<8){document.writeln("您的浏览器版本过低，IE8及以下版本不支持新样式，请更新浏览器")}
  carousel.render({
  	elem: '#loginid',
  	width: '100%', //设置容器宽度
  	height: '100%',
  	interval: 5000,
  	indicator: "none"
  });
  $('.upscroll').liMarquee({scrollamount: 20});
	  
  $(".dt").html(new Date().getFullYear());
  $(".user-type-col a").bind("click",function(i){var tt=$(this);tt.addClass("cur").siblings().removeClass("cur");$(".login-form-box .login-type").eq(tt.index()==0?0:1).show().siblings().hide()})
  setTop($);
  $(window).resize(function(){setTop($)})
});
function setTop($)
{
	var h=$(".loginbox").height()+51;
	$(".loginbox").css({"top":-(h/2)+"px"})
}