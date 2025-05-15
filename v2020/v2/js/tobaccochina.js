layui.config({
	base: '/static/v2020/v2/js/', //存放拓展模块的根目录
	version: true
}).extend({ //设定模块别名
	debug: true,
	common: 'common',
	navbarscroll: 'navbarscroll', //滚动导航
	myscroll: 'myscroll', //无间隙滚动
	cookie: 'cookie', //jquery.cookie
	qrcode: 'qrcode',
	nicescroll: 'jquery.nicescroll'
});
layui.use(['jquery', 'carousel', 'element', 'common', 'navbarscroll', 'myscroll', 'cookie', 'nicescroll','qrcode'], function() {
	var common = layui.common;
	var element = layui.element;
	var carousel = layui.carousel;
	var myscroll = layui.myscroll;
	var $ = layui.jquery;
	var flow = layui.flow;
	var ie = common.IEVersion();
	if (ie > 0 && ie < 8) {
		document.writeln("您的浏览器版本过低，IE8及以下版本不支持新样式，请更新浏览器")
	}
	carousel.render({
		elem: '#layid',
		width: '845px',
		height: '532px',
		arrow: 'hover',
		interval: '3000'
	});
    flow.lazyimg(); 
	/*******视频播放分享*******/
	$("#video-share").hover(function() {
		$("#video-share-show").show()
	}, function() {
		$("#video-share-show").hide()
	})
	
	/*$("#mobile-code").bind("click",function(){
	    $("body").append("<div class=\"show-mobile-bg\"></div><div class=\"show-mobile-box\"><a href=\"javascript:\">x</a><img src=\"/static/v2020/v2/images/mobile-code.png\"></div>");
	    $(document).on('click', '.show-mobile-box a', function () {
             $(".show-mobile-bg").detach();
	         $(".show-mobile-box").detach();
	    })
	})*/
	
	/**********图片小于等于202312的图片隐藏***********/
	if($(".detail-content").length>0)
	{
	    $(".detail-content img").each(function() {
        // 获取图片的 src 属性
        var src = $(this).attr('src');

        // 检查 src 中是否包含小于202312的日期
        if (src && /(\d{6})/.test(src)) {
            // 匹配到的日期部分
            var dateInSrc = src.match(/(\d{6})/)[0];
    
            // 比较日期
            if (parseInt(dateInSrc) <= 202312) {
                // 如果日期小于202312，则隐藏图片
                $(this).hide();
            }
        }
    });
	    
	}
	if($(".imgbox").length>0)
	{
	    $(".imgbox").each(function() {
        // 获取图片的 src 属性
        var src = $(this).find("img").attr('src');

        // 检查 src 中是否包含小于202312的日期
        if (src && /(\d{6})/.test(src)) {
            // 匹配到的日期部分
            var dateInSrc = src.match(/(\d{6})/)[0];
    
            // 比较日期
            if (parseInt(dateInSrc) <= 202312) {
                // 如果日期小于202312，则隐藏图片
                $(this).detach();
            }
        }
    });
	    
	}
	
	$(".index-img-left.h167").each(function() {
	     // 获取图片的 src 属性
        var src = $(this).find("img").attr('src');
 
        // 检查 src 中是否包含小于202312的日期
        if (src && /(\d{6})/.test(src)) {
            // 匹配到的日期部分
            var dateInSrc = src.match(/(\d{6})/)[0];
    
            // 比较日期
            if (parseInt(dateInSrc) <= 202312) {
                // 如果日期小于202312，则隐藏图片
                $(this).hide();
            }
        }
	    
	})
	
	
	
	/****内容页面分享****/
	$(".share-tbox").bind("click",function(){
	    var vi=$(this).index();
	    var url=window.location.href;
	    var title=$(this).attr("title");
	    var pic=window.location.protocol+"//"+window.location.host+$(this).attr("pic");
	    var iWidth=750;
	    var iHeight=550;
	    var iTop = (window.screen.height-30-iHeight)/2;       //获得窗口的垂直位置;
        var iLeft = (window.screen.width-10-iWidth)/2;        //获得窗口的水平位置;
	    if(vi==0)
	    {
	     if($(".code-wrap").html()=="")
	     $('.code-wrap').qrcode({render:"table",text:url,width:205,height: 205});
	     $(".qrcode-box").show();
	    }
	    if(vi==1)
	    {
	        window.open('http://connect.qq.com/widget/shareqq/index.html?url='+url+'&title='+title+'&source=&desc=&pics='+pic+'','newwindow','height='+iHeight+',width='+iWidth+',top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=no,resizable=no,status=no')
	    }
	    if(vi==2)
	    {
	        window.open('http://service.weibo.com/share/share.php?url='+url+'&title='+title+'&pic='+pic+'&appkey={{WEIBOKEY}}','newwindow','height='+iHeight+',width='+iWidth+',top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=no,resizable=no,status=no')
	    }
	    if(vi==3)
	    {
	        
	        window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+url+'&title='+title+'&desc=&summary=&site=','newwindow','height='+iHeight+',width='+iWidth+',top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=no,resizable=no,status=no')
	    }
	})
	
	
	/**********去掉自动填充***********/

     $('input').focus(function () {
        $('input').attr("autocomplete","off")
    })
	
	//观察页面轮播
	carousel.render({
		elem: '#gc-play-id',
		width: '665', //设置容器宽度
		height: '380',
		interval: 3000,
		arrow: 'hover' //始终显示箭头
		//,anim: 'updown' //切换动画方式
	});
	/*if($("#gc-play-id").length>0)
	{
	    var ww=665,hh=380;
	    var u=$("#gc-play-id img").size();
	    for(var i=0;i<u;i++)
	    {
	        var w=$("#gc-play-id img").eq(i).width();
	        var h=$("#gc-play-id img").eq(i).height();
	        console.log(i+":"+hh/ww+","+h/w)
	        if(hh/ww>=h/w)
            {
                $("#gc-play-id img").eq(i).css({"height":hh+"px"})
            
            }
            else
            {
                $("#gc-play-id img").eq(i).css({"width":ww+"px"})
            
            }
	    }
	}*/
	
	
	$(".gc-top-play-text ul li").eq(0).show();
	carousel.on('change(gc-play-id)', function(obj) {
		$(".gc-top-play-text ul li").eq(obj.index).show().siblings().hide();
		
	});
	//观察页面轮播
	//策划轮播.
	carousel.render({
		elem: '#chid',
		width: '100%', //设置容器宽度
		height: '100%',
		interval: 3000,
		arrow: 'hover'
	});
	$(".carousel-text-list div").eq(0).show();
	carousel.on('change(layid)', function(obj) {
		$(".carousel-text-list div").eq(obj.index).show().siblings().hide();
	});
	$("#_showfk").bind("click", function() {
		common.showfk();
	});
	$(".taos a").bind("click", function() {
		common.showts();
	})
	/*******视频播放窗口操作********/
	if ($(".video-play-con-v").length > 0) {
	   // $(window).load(function(){
	       
	 $(".video-play-box,.video-bg,.video-play-con").height($(".video-play-con-v").parent().height()) 
	   // })
		
	}
	
	if($("#sczyzl-ul").length>0)
	   $("#sczyzl-ul").load("/html/gypd/shzr/index.shtml #sczylist ul")
	/*****视频顶赞****/
   if($(".vdiggs").length>0)
   {
       $.post("/info_digg",{id:$(".vdiggs").attr("attr-id")},function(data){
    	if(data=="0"){$(".vdiggs").addClass("diggs-icon-curr");}
	    	});
      $(".vdiggs").bind("click",function(){
         var t=$(this);
         $.post("/info_digg",{id:t.attr("attr-id")},function(data){
    	if(data!="0"){$("#diggs").text("点赞("+data+"})");$(".vdiggs").addClass("diggs-icon-curr")}else{layer.msg("你已经顶过一次！")}
	    	});
      })
   }
	
	var furl=$("body").attr("fullscreen-url");
	if(furl!=""&&furl!=undefined)
	{
	    //var i=Math.floor(Math.random()*2+1)
	   // if(i==1)
	    //furl="/uploads/1/image/public/202212/20221230142843_r61v1io3bt.jpg";
	    //else
	    //furl="/uploads/1/image/public/202212/20221230142911_hme728csfr.jpg";
	    common._Show(furl)
	}
	

	
	if ($("#video-hover").length > 0) {
	    $("#video-hover video").css({"opacity":"0"})
	     $(document).on('mouseover', 'video', function() { 
	         $(this).css({"opacity":"100"}).siblings().find("video").css({"opacity":"0"})
      $(this).get(0).play(); 
      $(this).parent().find("img").hide();
     }); 

     //pause video on mouse leave 
     $(document).on('mouseleave', 'video', function() { 
      $(this).get(0).pause(); 
      $(this).parent().find("img").show();
      $("#video-hover video").css({"opacity":"0"})
     });
		/*var ot;
		$("#video-hover ul li .imgbox").hover(function() {
		      $(this).find("img").hide();
		      $(this).find("video").show();
		      $(this).find("video")[0].load();
		      
		      let playPromise =$(this).find("video")[0].play();
		      if (playPromise !== undefined) {
    playPromise.then(() => {
        audio.play()
    }).catch(()=> {
       
    })
}
		

		}, function() {
		    $(this).find("img").show();
		      $(this).find("video").hide();
			 $(this).find("video")[0].pause();

		})*/
	}
	if ($(".vpage-link").length > 0) {
		$(".vpage-link a").each(function() {
			$(this).attr("href", $(this).attr("href") + "#link")
		})
	}
	if($("#detail-you-like").length>0)
	{
	    var q=$("#detail-you-like").attr("att-title");
	    var id=$("#detail-you-like").attr("att-id");
	    
	    
	    $.ajax({
            type: 'GET',
            url: "/app?template=like_keyword",
            data: {"d":new Date()*1,"id":id,"q": q},
            
            xhrFields: { withCredentials: true },
            success: function(data, textStatus, request){
            	$("#detail-you-like").html(data);
                var str="<li><a href=\"https://www.tobaccochina.com/html/gypd/yjfl/567923.shtml\" target=\"\">践行安全理念　实现自我超越</a></li>"
                str+="<li><a href=\"https://www.tobaccochina.com/html/gypd/439741.shtml  \" target=\"\">向国际超一流安全企业迈进</a></li>"
                str+="<li><a href=\"https://www.tobaccochina.com/html/gypd/436265.shtml  \" target=\"\">“烟丝掺纸”事件一周年</a></li>"
                str+="<li><a href=\"https://www.tobaccochina.com/html/zxsd/yituliu/558107.shtml  \" target=\"\">揭开再造烟叶的神秘面纱</a></li>"
                str+="<li><a href=\"https://www.tobaccochina.com/html/gypd/439967.shtml  \" target=\"\">功能型再造烟叶助力中式卷烟品类构建</a></li>"
                var url=location.href ;
                if(url.indexOf("xxyc/605775.shtml")>=0||url.indexOf("xxyc/605743.shtml")>=0||url.indexOf("xxyc/605803.shtml")>=0||url.indexOf("xxyc/607374.shtml")>=0||url.indexOf("xxyc/607357.shtml")>=0||url.indexOf("xxyc/637664.shtml")>=0||url.indexOf("xxyc/637605.shtml")>=0||url.indexOf("xxyc/637475.shtml")>=0||url.indexOf("xxyc/636555.shtml")>=0||url.indexOf("xxyc/636170.shtml")>=0)
                {
                    $("#detail-you-like .list-ul ul li").eq(0).css({"display":"none"})
                    $("#detail-you-like .list-ul ul li").eq(1).css({"display":"none"})
                    $("#detail-you-like .list-ul ul li").eq(2).css({"display":"none"})
                    $("#detail-you-like .list-ul ul li").eq(3).css({"display":"none"})
                    $("#detail-you-like .list-ul ul li").eq(4).css({"display":"none"})
                    $("#detail-you-like .list-ul ul").prepend(str);
                }
            }
        });
	    /*
	    $.get("/app?template=like_keyword&q="+q+"&id="+id, function(data){
             $("#detail-you-like").html(data);
             var str="<li><a href=\"https://www.tobaccochina.com/html/gypd/yjfl/567923.shtml\" target=\"\">践行安全理念　实现自我超越</a></li>"
             str+="<li><a href=\"https://www.tobaccochina.com/html/gypd/439741.shtml  \" target=\"\">向国际超一流安全企业迈进</a></li>"
             str+="<li><a href=\"https://www.tobaccochina.com/html/gypd/436265.shtml  \" target=\"\">“烟丝掺纸”事件一周年</a></li>"
             str+="<li><a href=\"https://www.tobaccochina.com/html/zxsd/yituliu/558107.shtml  \" target=\"\">揭开再造烟叶的神秘面纱</a></li>"
             str+="<li><a href=\"https://www.tobaccochina.com/html/gypd/439967.shtml  \" target=\"\">功能型再造烟叶助力中式卷烟品类构建</a></li>"
             var url=location.href ;
             if(url.indexOf("xxyc/605775.shtml")>=0||url.indexOf("xxyc/605743.shtml")>=0||url.indexOf("xxyc/605803.shtml")>=0||url.indexOf("xxyc/607374.shtml")>=0||url.indexOf("xxyc/607357.shtml")>=0)
             {
                 $("#detail-you-like .list-ul ul li").eq(0).css({"display":"none"})
                 $("#detail-you-like .list-ul ul li").eq(1).css({"display":"none"})
                 $("#detail-you-like .list-ul ul li").eq(2).css({"display":"none"})
                 $("#detail-you-like .list-ul ul li").eq(3).css({"display":"none"})
                 $("#detail-you-like .list-ul ul li").eq(4).css({"display":"none"})
                 $("#detail-you-like .list-ul ul").prepend(str);
             }
	        
	    });
	    */
	    
	}
	if($(".fixed-code").length>0)
	{
	   //$(".fixed-code").position().left
	   //console.log($(".fixed-code").position().top)
	   common.videotop();
	   $(window).scroll(function(){
		  common.videotop();
	   })
	   
	   //console.log(rt);
	}
	
	$(".video-share-hover").hover(function(){
	    //console.log(url+pic+title)
	    var t=$(this)
	    desc=t.attr("desc");
	    url=t.attr("url");
	    title=t.attr("title");
	    pic=t.attr("pic");
	    t.find(".video-share-show").fadeIn();
	},function(){
	    var t=$(this)
	    t.find(".video-share-show").fadeOut();
	})
	
	/*********搜索begin**********/
	$(".topshow-search").bind("click", function() {
		$("body").append("<div id='_searchtop'>\n" +
			"<div class='show-search-box' style='display:none;'>\n" +
			"<div class='show-search-w1000 rel'>\n" +
			"<div class='show-search-close' id='sclose'>\n" +
			"<div class='layui-icon' id='searchClose' onclick=''>&#x1006;</div>\n" +
			"</div>\n" +
			"<div class='show-search-topbox'>\n" +
			"<div class='search-oh'>\n" +
			"<input type='text' id='topq' name='q' value='' class='left search-input' placeholder='请输入您寻找内容的关键词' autocomplete='off'>\n" +
			"<button type='submit' class='left search-sub-bnt' id=\"topsearchsub\"><i class='layui-icon'>&#xe615;</i>搜索</button>\n" +
			"</div>\n" +
			"<div class='show-search-mainbox' id='tsearchlist'>\n" +
			"<div class='show-search-hotkey'>\n" +
			"<h1>热搜词</h1>\n" +
			"<div class='hotlink'>\n" +
			"<a href='javascript:' attr-date=\"扶贫\">扶贫</a>\n" +
			"<a href='javascript:' attr-date=\"零售终端\">零售终端</a>\n" +
			"<a href='javascript:' attr-date=\"雪茄\">雪茄</a>\n" +
			"<a href='javascript:' attr-date=\"新型烟草\">新型烟草</a>\n" +
			"<a href='javascript:' attr-date=\"理性控烟\">理性控烟</a>\n" +
			"<a href='javascript:' attr-date=\"科技创新\">科技创新</a>\n" +
			"<a href='javascript:' attr-date=\"烟草消费\" >烟草消费</a>\n" +
			"<a href='javascript:' attr-date=\"防疫\">防疫</a>\n" +
			"<a href='javascript:' attr-date=\"理性控烟\">理性控烟</a>\n" +
			"<a href='javascript:' attr-date=\"科技创新\">科技创新</a>\n" +
			"<a href='javascript:' attr-date=\"烟草消费\">烟草消费</a>\n" +
			"</div>\n" +
			"</div>\n" +
			"</div>\n" +
			"</div>\n" +
			"</div>\n" +
			"</div>\n" +
			"</div>\n").addClass("ofy");
		$(".show-search-box").show();
		document.getElementById("topq").focus();
		$("#topq").css({"border":"solid 1px #fd7400"})
		$(".hotlink a").bind("click",function(){
		    $("#topq").val($(this).attr("attr-date"));
		    common.searchdata(size);
		})
		$("#searchClose").bind("click", function() {
		    $("body").removeClass("ofy")
			$("#_searchtop").fadeOut().detach();
		})
		var size = 20;//第页显示的条数
		$("#topq").keyup(function(event) {
		
			var keyword = $(this).val();
			if (event.keyCode == 13) {
				if ($(this).val() == "") {
					layer.msg('请输入关键词');
				} else {
						common.searchdata(size)
				}

			}
		});
		$("#topsearchsub").bind("click", function() {
			if ($("#topq").val() == "") {
				layer.msg('请输入关键词');
			} else {
			    
				common.searchdata(size)
			}
		})
		$("#topq").focus(function(){$(this).css({"border":"solid 1px #fd7400"})})
		$("#topq").blur(function(){$(this).css({"border":"solid 1px #dcdcdc"})})
	})
	/*********搜索end**********/
	/*********文章收藏***********/
	$("#favorite-a").click(function() {
		var url;
		if($("#favorite-icon").hasClass("favorite-icon-curr")) {
			url = "/info_unfavorite";
		} else {
			url = "/info_favorite";
		}
		$.ajax({
            type: 'GET',
            url: url,
            data: {"d":new Date()*1,"id":$("#favorite-a").attr("attr-data")},
            crossDomain: true,
            xhrFields: { withCredentials: true },
            success: function(data, textStatus, request){
                //console.log(data);
                if(data=="-1") {
    				//alert("请先登录");
    				layer.msg('请先登录');
    			} else {
    				$("#info_favorites").text("("+data+")");
    				if($("#favorite-icon").hasClass("favorite-icon-curr")){
    					$("#favorite-icon").removeClass("favorite-icon-curr");
    				} else {
    					$("#favorite-icon").addClass("favorite-icon-curr");
    				}
    			}
            }
        });
        /*    
		$.get(url,{"d":new Date()*1,"id":$("#favorite-a").attr("attr-data")},function(data) {
			if(data=="-1") {
				//alert("请先登录");
				layer.msg('请先登录');
			} else {
				$("#info_favorites").text("("+data+")");
				if($("#favorite-icon").hasClass("favorite-icon-curr")){
					$("#favorite-icon").removeClass("favorite-icon-curr");
				} else {
					$("#favorite-icon").addClass("favorite-icon-curr");
				}
			}
		});
		*/
	})

	common.showfontsize();
	common.scrolltip();
	common.showscroll();
	//专栏作者手动轮显
	common.showzj();
	var navbarscroll = layui.navbarscroll;
	$('.scroll').myscroll({
		speed: 70
	});
	$('.wrapper').navbarscroll();
	/* element.on('hover(menu)', function(elem){
	     layer.msg(elem.text());
	   });*/
	$(".dt").html(new Date().getFullYear())
	$('.nav1').navbarscroll({
		"btnPrev": "#ileft",
		"btnNext": "#iright",
		endClickScroll: function(obj) {
			$(".index-nav-content .index-nav-list").eq(obj.index()).show().siblings().hide(); /*console.log(obj.text())*/
			
			
		$(".index-nav-content .index-nav-list").eq(obj.index()).find("img").each(function(){
		     if(typeof($(this).attr("lay-click-src"))!="undefined")
			    {
			        $(this).attr("src",$(this).attr("lay-click-src"))
			          $(this).removeAttr("lay-click-src");
			    }
		})
			
		}
	}); //滚动导航

   $(".zt-scroll-id").niceScroll({cursorcolor: "#ffa000",cursoropacitymax: 0.8,touchbehavior: false,cursorwidth: "5px",cursorborder: "0",cursorborderradius: "5px",autohidemode: false});
   
   /*var imgs = document.querySelectorAll('img');
   Array.from(imgs).forEach(function(el){
                //if(isIn(el)){
                //    loadImg(el);
                //}
                console.log(el);
            })*/
            
	$('.nav2').navbarscroll({
		"btnPrev": "#ileft2",
		"btnNext": "#iright2",
		endClickScroll: function(obj) {
			$(".change-box .index-video-box").eq(obj.index()).show().siblings().hide(); /*console.log(obj.text())*/
			$(".change-box .index-video-box").eq(obj.index()).find("img").each(function(){
			    
		     if(typeof($(this).attr("lay-click-src"))!="undefined")
			    {
			        $(this).attr("src",$(this).attr("lay-click-src"))
			        $(this).removeAttr("lay-click-src");
			    }
		    })
		}
	}); //滚动导航
	$(".setHomepage").bind("click", function() {
		common.setHomepage()
	}) //设为首页
	if ($(".top-roll-tip").length > 0)
		common.scroll_top($(".top-roll-tip"), 20); //顶部滚动字体
	if ($(".sdate").length > 0) $(".sdate").html(common.showDate()); //顶部显示日期
	$(".top-weixin-list,.wxjz").hover(function() {
		$(".wxjz h1").css({
			"top": "0px"
		});
		$(".top-weixin-list").stop().animate({
			top: 40,
			opacity: 'show'
		}, 300);
	}, function() {
		$(".top-weixin-list").stop().animate({
			top: -120,
			opacity: 'hide'
		}, 300, function() {
			$(".wxjz h1").css({
				"top": "-20px"
			});
		});
	})
	
	$(".utop-weixin-list,#mobile-code").hover(function() {
	
		$(".utop-weixin-list").stop().animate({
			top: 40,
			opacity: 'show'
		}, 300);
	}, function() {
		$(".utop-weixin-list").stop().animate({
			top: -120,
			opacity: 'hide'
		}, 300, function() {});
	})
	
	
	
	
	
	
});
	
