layui.define(["jquery"], function (exports) {
var $ = layui.$;
"use strict";
/**********主代码************/
$.fn.myscroll=function(options){var defaults={speed:30,direction:'vertical'};var opts=$.extend({},defaults,options),intId=[];function marquee(obj,step,direction){if(direction=='horizantal'){obj.find("ul").animate({marginLeft:'-=1'},0,function(){var s=Math.abs(parseInt($(this).css("margin-left")));if(s>=step){$(this).find("li").slice(0,1).appendTo($(this));$(this).css("margin-left",0);}});}else if(direction=='vertical'){obj.find("ul").animate({marginTop:'-=1'},0,function(){var s=Math.abs(parseInt($(this).css("margin-top")));if(s>=step){$(this).find("li").slice(0,1).appendTo($(this));$(this).css("margin-top",0);}});}}
this.each(function(i){var speed=0<100-opts["speed"]&&100-opts["speed"]<=100?100-opts["speed"]:30;var direction=opts["direction"]=='vertical'||opts["direction"]=='horizantal'?opts["direction"]:'vertical';var _this=$(this);intId[i]=setInterval(function(){var sh;if(direction=='horizantal'){sh=_this.find("ul").find("li:first").outerWidth(true);}else{sh=_this.find("ul").find("li:first").outerHeight(true);}
marquee(_this,sh,direction);},speed);_this.hover(function(){clearInterval(intId[i]);},function(){intId[i]=setInterval(function(){var sh;if(direction=='horizantal'){sh=_this.find("ul").find("li:first").outerWidth(true);}else{sh=_this.find("ul").find("li:first").outerHeight(true);}
marquee(_this,sh,direction);},speed);});});}
/***********************/
exports('myscroll', null);
});