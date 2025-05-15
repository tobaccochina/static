layui.config({
  base: '/static/v2020/v2/js/', //存放拓展模块的根目录
  version:true
}).extend({ //设定模块别名
   debug: true,
  common: 'common',
  liMarquee: 'liMarquee',
  emoji: 'emoji',
  nicescroll:'jquery.nicescroll',
});
layui.use(['jquery','common','liMarquee','emoji','nicescroll'], function(){
	
  var common = layui.common;
  var element = layui.element;
  var ie=common.IEVersion();
  var carousel = layui.carousel;
  var laydate = layui.laydate;
  var emoji=layui.emoji;
  var $ = layui.jquery;
  if(ie>0&&ie<8){document.writeln("您的浏览器版本过低，IE8及以下版本不支持新样式，请更新浏览器")}
  carousel.render({
  	elem: '#loginid',
  	width: '100%', //设置容器宽度
  	height: '100%',
  	interval: 5000,
  	indicator: "none"
  });
  if($(".str_origin").width()>$(".upscroll").width())
  $('.upscroll').liMarquee({scrollamount: 20});
	  
	element.on('nav(user-menu)', function(elem){
      //layer.msg(elem.text());
     //禁用菜单的折叠
     $(".layui-nav-tree").find(".layui-nav-child").css("display","contents");
     
 });
 /**********去掉自动填充***********/
     $('input').focus(function () {
        $('input').attr("autocomplete","off")
    })
 
   $(".user-a-detail-content").niceScroll({
  			    cursorcolor: "#ffa000", //#CC0071 光标颜色
  			    cursoropacitymax: 0.8, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
  			    touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
  			    cursorwidth: "5px", //像素光标的宽度
  			    cursorborder: "0", // 	游标边框css定义
  			    cursorborderradius: "5px", //以像素为光标边界半径
  			    autohidemode: false //是否隐藏滚动条
     });
  $(".dt").html(new Date().getFullYear());
  $(".user-type-col a").bind("click",function(i){var tt=$(this);tt.addClass("cur").siblings().removeClass("cur");$(".login-form-box .login-type").eq(tt.index()==0?0:1).show().siblings().hide()})
  setTop($);
  $(window).resize(function(){setTop($)})
 
   common.toTimeLine();
   $(".UDTime").html(common.getTimeUD);
   $("#col-user-info-title li").bind("click",function(){
	   $(this).addClass("cur").siblings().removeClass("cur");
	   $(".col-user-info-select").eq($(this).index()).show().siblings().hide();
   })
   
   
   emoji.Init();
   $(".user-hd-report .close").bind("click",function(){$(".user-hd-report").hide()})
   $(".report-bnt").bind("click",function(){$(".user-hd-report").show()})
   
   if($(".hide-block ul li").length>0)
   {
	   if($(".hide-block ul").height()>60)
	   {
		   $(".hide-block .t-show").show();
	   }
	   $(".hide-block .t-show").bind("click",function(){
		   var t=$(this);
		   if(t.hasClass("active"))
		   {
			   t.removeClass("active");
			   $(".hide-block").stop().animate({height:32}, 500);
			   t.find("font").html("展开");
		   }else{
			   t.addClass("active");
			   $(".hide-block").stop().animate({height:91}, 500);
			   t.find("font").html("收起");
		   }
		  
		  
	   })
	   if($("ul.hd-show-menu").length>0)
	   {
		   $("ul.hd-show-menu li").bind("click",function(){
			   $(this).addClass("cur").siblings().removeClass("cur");
			   $(".hd-content").eq($(this).index()).show().siblings().hide();
		   })
	   }
	   $(".hide-block ul li").bind("click",function(){$(".user-hd-inlist-content").eq($(this).index()).show().siblings().hide();$(this).addClass("active").siblings().removeClass("active")})
	  
   }
   $(".ui-tip").bind("click",function(){
	   var t=$(this);
	   layer.tips(t.attr("text"), t, {
	     tips: [1, '#ed8927'],
	     time: 4000
	   });
	   
   })
     $(".ui-tip").hover(function(){
		 var t=$(this);
		 layer.tips(t.attr("text"), t, {
		   tips: [1, '#ed8927'],
		   time: 4000
		 });
	 },function(){})
     
     //收益日期选择
     laydate.render({
       elem: '#date-begin'
     });
	 laydate.render({
	   elem: '#date-end'
	 });
  
    if($(".w182.fl.box-border").length>0&&$(".user-main.fr").length>0)
    {
        if($(".w182").height()<$(".user-main").height())
        $(".w182").height($(".user-main").height());
    }
  /*
  
  $("#scroll-timeline-menu ul li").bind("click",function(){
	  //layer.msg($(this).index())
	  console.log($(this).index())
  })*/
  
  
  
  
  
  
});
function setTop($)
{
	var h=$(".loginbox").height()+51;
	$(".loginbox").css({"top":-(h/2)+"px"})
}