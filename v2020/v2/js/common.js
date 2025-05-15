layui.define(['jquery','cookie'],function(exports){
	var $ = layui.jquery;
	var flow = layui.flow;
	var sWeek = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
	var dNow = new Date();
	var CalendarData = new Array(100);
	var madd = new Array(12);
	var tgString = "甲乙丙丁戊己庚辛壬癸";
	var dzString = "子丑寅卯辰巳午未申酉戌亥";
	var numString = "一二三四五六七八九十";
	var monString = "正二三四五六七八九十冬腊";
	var weekString = "日一二三四五六";
	var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
	var cYear, cMonth, cDay, TheDate;
	CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
	madd[0] = 0;
	madd[1] = 31;
	madd[2] = 59;
	madd[3] = 90;
	madd[4] = 120;
	madd[5] = 151;
	madd[6] = 181;
	madd[7] = 212;
	madd[8] = 243;
	madd[9] = 273;
	madd[10] = 304;
	madd[11] = 334;
	function GetBit(m, n) {
		return (m >> n) & 1;
	}
	function e2c() {
		TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
		var total, m, n, k;
		var isEnd = false;
		var tmp = TheDate.getFullYear();
		total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;
		if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
			total++;
		}
		for (m = 0;; m++) {
			k = (CalendarData[m] < 0xfff) ? 11 : 12;
			for (n = k; n >= 0; n--) {
				if (total <= 29 + GetBit(CalendarData[m], n)) {
					isEnd = true;
					break;
				}
				total = total - 29 - GetBit(CalendarData[m], n);
			}
			if (isEnd) break;
		}
		cYear = 1921 + m;
		cMonth = k - n + 1;
		cDay = total;
		if (k == 12) {
			if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
				cMonth = 1 - cMonth;
			}
			if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
				cMonth--;
			}
		}
	}
	function GetcDateString() {
		var tmp = "";
		tmp += tgString.charAt((cYear - 4) % 10);
		tmp += dzString.charAt((cYear - 4) % 12);
		tmp += "年 ";
		if (cMonth < 1) {
			tmp += "(闰)";
			tmp += monString.charAt( - cMonth - 1);
		} else {
			tmp += monString.charAt(cMonth - 1);
		}
		tmp += "月";
		tmp += (cDay < 11) ? "初": ((cDay < 20) ? "十": ((cDay < 30) ? "廿": "三十"));
		if (cDay % 10 != 0 || cDay == 10) {
			tmp += numString.charAt((cDay - 1) % 10);
		}
		return tmp;
	}
	function GetLunarDay(solarYear, solarMonth, solarDay) {
		if (solarYear < 1921 || solarYear > 2020) {
			return "";
		} else {
			solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
			e2c(solarYear, solarMonth, solarDay);
			return GetcDateString();
		}
	}
	var D = new Date();
	var yy = D.getFullYear();
	var mm = D.getMonth() + 1;
	var dd = D.getDate();
	var ww = D.getDay();
	var ss = parseInt(D.getTime() / 1000);
	function getFullYear(d) { // 修正firefox下year错误
		yr = d.getYear();
		if (yr < 1000) yr += 1900;
		return yr;
	}
	function currHeight(){
			  var wh=$(window).height(),st=$(window).scrollTop(),dh=$(document).height();
			  if((wh+st)>=(dh-220))
			  $(".show-tj-ico").css({bottom:"220px"})
			  else
			  $(".show-tj-ico").css({bottom:"100px"})
	}
	function currHeight2(){
			  var wh=$(window).height(),st=$(window).scrollTop(),dh=$(document).height();
			  if((wh+st)>=(dh-40))
			  $(".show-tj-ico").css({bottom:"220px"})
			  else
			  $(".show-tj-ico").css({bottom:"100px"})
	}
    var obj = {
      hello: function(str){
        console.log(str);
      },
	  showDate:function()
	  {
		  var sValue = getFullYear(dNow) + "年" + (dNow.getMonth() + 1) + "月" + dNow.getDate() + "日" + " " + sWeek[dNow.getDay()] + " ";
		  sValue += GetLunarDay(yy, mm, dd);
		  return sValue
		  
	  },
	  IEVersion:function(){
		  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
		              var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
		              var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
		              var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
		              if(isIE) {
		                  var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
		                  reIE.test(userAgent);
		                  var fIEVersion = parseFloat(RegExp["$1"]);
		                  if(fIEVersion == 7) {
		                      return 7;
		                  } else if(fIEVersion == 8) {
		                      return 8;
		                  } else if(fIEVersion == 9) {
		                      return 9;
		                  } else if(fIEVersion == 10) {
		                      return 10;
		                  } else {
		                      return 6;//IE版本<=7
		                  }   
		              } else if(isEdge) {
		                  return 'edge';//edge
		              } else if(isIE11) {
		                  return 11; //IE11  
		              }else{
		                  return -1;//不是ie浏览器
		        }
	  },
	  showscroll:function()
	  {
		  //var dh=$(document).height(),wh=$(window).height(),pt=$(".show-tj-ico").position().top;
		  //console.log()
		  if($(window).scrollTop()>50)
		  $("#scrollTop").show();
		  else
		  $("#scrollTop").hide();
		  $(window).scroll(function(){
			  //console.log($(".show-tj-ico").position().top)
			 if($(window).scrollTop()>50)
			 $("#scrollTop").show();
			 else
			 $("#scrollTop").hide();
			 })
		  
	  },

	 
	 _LoadPlayer:function(furl) {
	     var str_screen = "<div style=\"position: relative; width: 83px; margin: 0px auto; right: -553px; top: 140px; height: 1px; padding: 0px;display:none;\" id=\"SmallBar\"><div style=\"position:absolute;top:0px;left:40px;\"><a  style=\"color:#fff;font-size:12px;cursor:pointer\" id=\"vc_hide\" onclick=\"\">关闭 X</></div></div>";
        var str_screen2 = "<div style=\"position:relative;width:100%;margin:0 auto;height:500px; padding:0;display:none;\" id=\"FullScreen\"></div>";
		$(".index-main").prepend(str_screen + str_screen2);
		
	     $("#FullScreen").html('<div style="width:100%;height:368px;margin:0 auto;"><img src="'+furl+'"></div>');
	     
	 },
	 _Show:function(furl) {this._LoadPlayer(furl); $("#FullScreen").slideDown(1000); ttt = setTimeout(function(){$("#FullScreen").slideUp(1000, function () { document.getElementById("FullScreen").innerHTML = "";});}, 14000); },
	
	 
	  videotop: function() {
			var rt = $(".video-right-top").position().top;
			var rl = $(".video-right-top").position().left;
			var rh = $(".video-right-h").height();
			var codeh = $(".fixed-code").height();
			var posl = $(".video-right-h").position().left;
			var mw = $(".video-right-top").width()
			var ww = $(window).width();
			var x = 0;
			if (ww > mw)
				x = (ww - mw) / 2
			if ($(window).scrollTop() > ((rt + rh) - codeh))
				$(".fixed-code").css({
					"position": "fixed",
					"left": (parseInt(x) + parseInt(posl)) + "px"
				})
			else {
				$(".fixed-code").css({
					"position": "inherit"
				})
			}

		},
		showzj: function() {
			var mainclass = $(".show-zj ul"),
				left = $(".show-zj-left"),
				right = $(".show-zj-right"),
				dot = $(".show-zj-dot ul");
			var str = "",
				cur = 0;
			var _size = mainclass.size();
		
			for (var i = 0; i < _size; i++) {
				if (i == 0)
					str += "<li class=\"cur\"></li>\n";
				//dot.append("<li class=\"cur\"></li>");
				else
					str += "<li></li>\n";
			}
			if (str != "")
				dot.append(str);
			left.bind("click", function() {
				if (cur == 0)
					cur = (_size - 1);
				else
					cur -= 1;
				$("li", dot).eq(cur).addClass("cur").siblings().removeClass("cur");
				mainclass.eq(cur).show().siblings().hide();

			})
			right.bind("click", function() {
				if (cur == (_size - 1))
					cur = 0;
				else
					cur += 1;
				$("li", dot).eq(cur).addClass("cur").siblings().removeClass("cur");
				mainclass.eq(cur).show().siblings().hide();
			})

		},
	  showfontsize:function()
	  {
		  var myContent = $(".detail-content"),
				btnFont = $(".font-select a");
			var fSize = parseInt($.cookie("fontSize") ? $.cookie("fontSize") : parseFloat(myContent.css('fontSize'), 16));
			var cDomain = document.location.hostname.match(/[a-z0-9][a-z0-9\-]+\.[a-z\.]{2,6}$/i);
			var options = {
				path: '/',
				domain: cDomain,
				//expires: 365
			};
			if (fSize) {
				myContent.css({
					'font-size': fSize + 'px'
				});
				$.cookie("fontSize", fSize, options);
			}
			btnFont.click(function() {
				$(this).addClass('on').siblings().removeClass('on');
				var cID = $(this).attr("id");
				if (cID == "btn-font-plus") {
					if (fSize >= 32) {
						layer.msg("字体已经最大化，不能再放大");
						return
					};
					fSize += 2;
				} else if (cID == "btn-font-reduce") {
					if (fSize <= 12) {
						layer.msg("字体已经最小化，不能再缩小");
						return
					};
					fSize -= 2;
				};
				myContent.css({
					fontSize: fSize
				});
				$.cookie("fontSize", fSize, options);
			});
	  },
	  scrolltip:function()
	  {
		  currHeight();
		  $(window).scroll(function(){currHeight2();})
		  //console.log($(document).height());
		  
	  },
	  getTimeUD:function()
	  {
		  str="";
		  now = new Date(),hour = now.getHours() 
		  if(hour < 6){str="凌晨好！";} 
		  else if (hour < 9){str="早上好";} 
		  else if (hour < 12){str="上午好";} 
		  else if (hour < 14){str="中午好";} 
		  else if (hour < 17){str="下午好";} 
		  else if (hour < 19){str="傍晚好";} 
		  else if (hour < 22){str="晚上好";} 
		  else {str="夜里好";} 
		  return str;
	  },
	  
	  toTimeLine:function(){
		  /******************会员滚动时间轴**************/
		  if($("#scroll-timeline").length>0)
		  {
		  var t=$("#scroll-timeline").position().top;
		  var slist=$("#scroll-timeline-list ul li"),ssize=slist.length;
		  var scrollMenuStr="";
		  var arr=new Array(new Array());
		  for(var i = 0; i < ssize; i++){
		  	  if(i==0)
		  	  scrollMenuStr+='<li class="active"><span><a href="#link'+i+'">'+slist.find("h1").eq(i).html()+'</a></span>\n<i class="layui-icon layui-timeline-axis">&#xe63f;</i>\n</li>\n';
		  	  else
		  	  scrollMenuStr+='<li><span><a href="#link'+i+'">'+slist.find("h1").eq(i).html()+'</a></span>\n<i class="layui-icon layui-timeline-axis">&#xe63f;</i>\n</li>\n';
		  	  if(slist.find("h1").eq(i).attr("attr")=="title")
		  	  slist.find("h1").eq(i).wrapInner("<a name='link"+i+"'></a>")
		  	  
		  	  arr[i]=[parseInt($("#scroll-timeline-list ul li").eq(i).position().top)-50,parseInt($("#scroll-timeline-list ul li").eq(i).position().top)+parseInt($("#scroll-timeline-list ul li").height())-50]
		  	  //arr[i][1]=parseInt($("#scroll-timeline-list ul li").eq(i).position().top)+parseInt($("#scroll-timeline-list ul li").height())
		  	}
		  	$("#scroll-timeline-menu").html('<ul>'+scrollMenuStr+'</ul>');
		  	$("#scroll-timeline-menu ul li").bind("click",function(){$(this).addClass("active").siblings().removeClass("active")})
		  
		  $(window).scroll(function(){
			  var mh=$("#scroll-timeline-menu").height();
		  	  var st=$(window).scrollTop();
		  	  var dh=$("#scroll-timeline").height();
		  	  var pt=st-t;
		  	  if(pt>0)
		  	  {
				 // console.log(st+"__"+pt+"___"+((t+dh)-mh))
		  		  if(st<((t+dh)-mh))
				  {
		  		    $("#scroll-timeline-menu").stop().animate({top: pt+'px' },500)
					
				  }
		  		  else
		  		  $("#scroll-timeline-menu").stop().animate({top: ((dh)-mh)+'px' },500)
		  	  }
		  	  for(var i = 0; i < ssize; i++){
		  		  if((st-t)>=arr[i][0]&&(st-t)<=arr[i][1])
		  		  $("#scroll-timeline-menu ul li").eq(i).addClass("active").siblings().removeClass("active");
		      }
		  })
		}
		   /******************会员滚动时间轴**************/
	  },
	  showfk:function()
	  {
		layer.open({
		  title:"意见反馈",
		  type: 2,
		  skin: 'layui-layer-rim', //加上边框
		  area: ['650px', '560px'], //宽高
		  scrollbar: false,
		  content: ['/fb/fk/create','no']
		});
	  },
	  showts:function(){
		  layer.open({
			  title:"投诉",
			  type: 2,
			  skin: 'layui-layer-rim', //加上边框
			  area: ['650px', '560px'], //宽高
			  scrollbar: false,
			  content: ['/fb/ts/create','no']
			});
	  },
	  searchdata:function(size)
	  {
	      
	      $("#tsearchlist").html("<div class=\"search-mainbox\"><ul class=\"list-unstyled s-result\"></ul></div>")
	   　 var vh=$(window).height();
	   　 $("#_searchtop .show-search-topbox").animate({"padding-top": '30px'}, "slow");
	      $(".search-mainbox").height(vh-120);
	   　  $(".search-mainbox").niceScroll({cursorcolor: "#ffa000",cursoropacitymax: 0.8,touchbehavior: false,cursorwidth: "5px",cursorborder: "0",cursorborderradius: "5px",autohidemode: false});
	      setTimeout(function(){$(".search-mainbox").getNiceScroll().resize();},500)
	      $(window).resize(function(){
	          vh=$(window).height();$(".search-mainbox").height(vh-120);
	          setTimeout(function(){$(".search-mainbox").getNiceScroll().resize();},500)
	      })
	   　
	      	flow.load({
	      	    elem: '.s-result',
	      	    isAuto:true,
				/*Lazyimg: true,*/
				scrollElem: '.search-mainbox',
				mb:250,
				done: function(page, next) {
				   // console.log("load");
					var lis = [];
					$.get('https://search.tobaccochina.com/search?m=json&sort=publishDate+long+desc&q=' + encodeURI($("#topq").val()) + '&page=' + page + "&size=" + size, function(res) {
							 var sd=JSON.parse(res);
								    
							
							
							
								     
	         var lis = [];
				layui.each(sd.datasort, function(index, da) {
					var nav="";
					layui.each(da.node, function(i,n) {
						nav+="<a href=\""+n.href+"\" class=\"a-hover\">"+n.name+"</a>"
						if(i<da.node.length-1)
						nav+=" &gt;";
					})
					lis.push("<li>\n"+
						"<h3 class=\"sr-title\"><a href=\""+da.url+"\" target=\"_blank\" class=\"sa\">"+da.highlighttitle+"</a></h3>\n"+
						"<div class=\"sr-desc\">"+da.highlighttext+"</div>\n"+
						"<div class=\"sr-footer\">\n"+
							"<span>"+da.date+"</span> &nbsp;\n"+
							"<span>"+nav+"</span> &nbsp;\n"+
							"<!--span style=\"color:#888\">点击："+da.bufferviews+"</span> &nbsp;\n"+
							"<span style=\"color:#888\">评论："+da.buffercomments+"</span-->\n"+
						"</div>\n"+
					"</li>");
				})
				p=parseInt(sd.pages/size)
				if(sd.pages%size>0)
					p=p+1;
	
				 next(lis.join(''), page < p);
				setTimeout(function(){$(".search-mainbox").getNiceScroll().resize();},50)
				
				});
			}
		});
	
	   
	      
	  },
	  setHomepage:function()
	  {
		  try{
		     document.body.style.behavior='url(#default#homepage)';
		     document.body.setHomePage('https://www.tobaccochina.com/');
		  }catch(e){
		     if(window.netscape){
		      try{
		       netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
		      }catch(e){
		       alert("抱歉，此操作被浏览器拒绝！请尝试Ctrl+D进行添加。\n\n或者在浏览器地址栏输入'about:config'并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
		      };
		     }else{
		      alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将'https://www.tobaccochina.com/'设置为首页。");
		     };
		  };
	  },
	  scroll_top:function(sid, mi){var fw = sid.width(),cw = sid.width(),vi = 0;sid.css({width: cw + "px",left: fw + "px",position: "absolute"});sid.mouseover(function(){scroll(vi);clearInterval(MyTime);});sid.hover(function(){if (MyTime){clearInterval(MyTime);};}, function(){MyTime = setInterval(function(){vi--;if (fw + cw + vi <= 0) {vi = 0;}scroll(vi);}, mi);});var MyTime = setInterval(function(){vi--;if (fw + cw + vi <= 0) {vi = 0;};scroll(vi);}, mi);function scroll(vi){sid.css({left: (vi + fw) + "px"})}}
    };
    exports('common', obj);
});