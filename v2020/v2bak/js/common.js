layui.define(['jquery'],function(exports){
	var $ = layui.jquery;
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
	  showfk:function()
	  {
		layer.open({
		  title:"意见反馈",
		  type: 1,
		  skin: 'layui-layer-rim', //加上边框
		  area: ['450px', '410px'], //宽高
		  content: '<div class="fb-body-container"><div class="fb-body left" id="fb_qa_feedback_body"><div class="fb-block fb-content-block"><div class="fb-label"><span class="fb-danger-tips">*</span><span class="fb-content-tips">问题描述：</span></div><div class="fb-control fb-textarea"><textarea maxlength="401" class="fb-des-content"  placeholder="问题描述" name="content" id="fb_des_content" data-exclude="true"></textarea></div></div><div class="fb-block fb-img-block"><div class="fb-label"><span class="fb-danger-tips"></span><span class="fb-label-title">相关图片：</span></div><div class="fb-control"><ul id="preview-image-list"><li id="fb-upload-btn"><label role="button" class="upload-file-btn"><span class="text-wrapper"><span class="upload-icon">+</span></span><input type="file" class="file-content" accept="image/png,image/jpg,image/bmp,image/jpeg"></label></li></ul><div style="float:left;clear:both;margin-top:2px;color: #999;"><span>单张图片大小不超过2M，最多4张</span></div></div></div><div class="fb-block fb-email-block"><div class="fb-label inline"><span class="fb-label-title">联系方式：</span></div><div class="fb-control"><input type="text"  placeholder="请输入邮件、手机号码或QQ号码任意一种联系方式" class="fb-email" maxlength="100" id="feedback_email"></div></div><div class="fb-block fb-submit"><div class="fb-control"><!--a id="fb-myfeedback-btn" href="#" target="_blank" hidefocus="”true”" style="color: rgb(44, 97, 189);">我的反馈历史</a--><div class="fb-btn fb-btn-primary" id="fb_right_canvas_save" style="background-color: rgb(44, 97, 189);">提交反馈</div></div></div></div></div>'
		});
	  },
	  setHomepage:function()
	  {
		  try{
		     document.body.style.behavior='url(#default#homepage)';
		     document.body.setHomePage('http://www.tobaccochina.com/');
		  }catch(e){
		     if(window.netscape){
		      try{
		       netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
		      }catch(e){
		       alert("抱歉，此操作被浏览器拒绝！请尝试Ctrl+D进行添加。\n\n或者在浏览器地址栏输入'about:config'并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
		      };
		     }else{
		      alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将'http://www.tobaccochina.com/'设置为首页。");
		     };
		  };
	  },
	  scroll_top:function(sid, mi){var fw = sid.width(),cw = sid.width(),vi = 0;sid.css({width: cw + "px",left: fw + "px",position: "absolute"});sid.mouseover(function(){scroll(vi);clearInterval(MyTime);});sid.hover(function(){if (MyTime){clearInterval(MyTime);};}, function(){MyTime = setInterval(function(){vi--;if (fw + cw + vi <= 0) {vi = 0;}scroll(vi);}, mi);});var MyTime = setInterval(function(){vi--;if (fw + cw + vi <= 0) {vi = 0;};scroll(vi);}, mi);function scroll(vi){sid.css({left: (vi + fw) + "px"})}}
    };
    exports('common', obj);
});