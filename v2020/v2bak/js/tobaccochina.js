layui.config({
  base: 'static/v2020/v2/js/' //存放拓展模块的根目录
}).extend({ //设定模块别名
   debug: true,
  common: 'common',
  navbarscroll: 'navbarscroll',//滚动导航
  myscroll: 'myscroll'//无间隙滚动
});
layui.use(['jquery','carousel','element', 'common', 'navbarscroll', 'myscroll'], function(){
  var common = layui.common;
  var element = layui.element;
  var carousel = layui.carousel;
  var myscroll = layui.myscroll;
  var $=layui.jquery;
  var ie=common.IEVersion();
  if(ie>0&&ie<8){document.writeln("您的浏览器版本过低，IE8及以下版本不支持新样式，请更新浏览器")}
  carousel.render({
      elem: '#layid',
      width: '845px',
	  height:'532px',
      arrow: 'hover',
	  interval:'6000'
    });
	$(".carousel-text-list div").eq(0).show();
	carousel.on('change(layid)', function(obj){
		$(".carousel-text-list div").eq(obj.index).show().siblings().hide();
	});
	
	$("#_showfk").bind("click",function(){
		common.showfk();
		
	})
	
	common.showscroll();
  var navbarscroll=layui.navbarscroll;
  $('.scroll').myscroll({speed:70});
  $('.wrapper').navbarscroll();
 /* element.on('hover(menu)', function(elem){
      layer.msg(elem.text());
    });*/ 
	$(".dt").html(new Date().getFullYear())
  $('.nav1').navbarscroll({"btnPrev":"#ileft","btnNext":"#iright",endClickScroll:function(obj){$(".index-nav-content .index-nav-list").eq(obj.index()).show().siblings().hide();/*console.log(obj.text())*/}});//滚动导航
  $('.nav2').navbarscroll({"btnPrev":"#ileft2","btnNext":"#iright2",endClickScroll:function(obj){$(".change-box .index-video-box").eq(obj.index()).show().siblings().hide();/*console.log(obj.text())*/}});//滚动导航
  $(".setHomepage").bind("click",function(){common.setHomepage()})//设为首页
  if($(".top-roll-tip").length>0)
 common.scroll_top($(".top-roll-tip"),20);//顶部滚动字体
 if($(".sdate").length>0)$(".sdate").html(common.showDate());//顶部显示日期
   $(".top-weixin-list,.wxjz").hover(function(){$(".wxjz h1").css({"top":"0px"});$(".top-weixin-list").stop().animate({top:40, opacity: 'show'}, 300);},function(){$(".top-weixin-list").stop().animate({top:-120, opacity: 'hide'},300,function(){$(".wxjz h1").css({"top":"-20px"});});})
});