/*! app 0.1.0 | 2014-03-26 | (c) 2014 DBPOO | MIT License */ 
define("js/main",["./backtop","jquery"],function(a){var b=a("./backtop");b.init({scrollName:"scrollUp",scrollDistance:200,zIndex:"1080"})}),define("js/backtop",["jquery"],function(a,b,c){var d=a("jquery");c.exports={init:function(a){var b;b=d("<a/>",{id:a.scrollName,href:"#top"}),b.appendTo("body"),b.css({display:"none",position:"fixed",zIndex:a.zIndex});var c,e,f,g,h;c="show",e="hide",f=10,g=a.scrollDistance,h=!1,d(window).scroll(function(){d(window).scrollTop()>g?h||(b[c](f),h=!0):h&&(b[e](f),h=!1)}),b.click(function(a){a.preventDefault(),d("html, body").animate({scrollTop:0},300,"linear")})}}});