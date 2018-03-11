//-----------------------------------------------------------------
//　スライドショー
//-----------------------------------------------------------------


window.onload = function() {

// スマホ スライド

if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {

$(function(){
$.sublime_slideshow({
src:[
{url:"./img/common/sp_img1.JPG"},
{url:"./img/common/sp_img2.JPG"},
{url:"./img/common/sp_img3.JPG"},
{url:"./img/common/sp_img4.JPG"}
],
duration:   9,
fade:   1.5,
scaling:1.12,
rotating:   false,

});
});


} else {

// IE スライド

var ua = navigator.userAgent.toLowerCase();
var ver = navigator.appVersion.toLowerCase();

// IE(11以外)
var isMSIE = (ua.indexOf('msie') > -1) && (ua.indexOf('opera') == -1);
// IE9
var isIE9 = isMSIE && (ver.indexOf('msie 9.') > -1);
// IE10
var isIE10 = isMSIE && (ver.indexOf('msie 10.') > -1);
// IE11
var isIE11 = (ua.indexOf('trident/7') > -1);
// IE
var isIE = isMSIE || isIE11;

// 適用
if(isIE) {

$(function(){
$.sublime_slideshow({
src:[
{url:"./img/common/img1.JPG"},
{url:"./img/common/img2.JPG"},
{url:"./img/common/img3.JPG"},
{url:"./img/common/img4.JPG"}
],
duration:   9,
fade:   1.5,
scaling:1.00,
rotating:   false,

});
});

} else {

// それ以外 スライド

$(function(){
$.sublime_slideshow({
src:[
{url:"./img/common/img1.JPG"},
{url:"./img/common/img2.JPG"},
{url:"./img/common/img3.JPG"},
{url:"./img/common/img4.JPG"}
],
duration:   9,
fade:   1.5,
scaling:1.08,
rotating:   false,

});
});

}	
}

}

//-----------------------------------------------------------------
//　ローディングここから
//-----------------------------------------------------------------

$(function() {
	Array.prototype.remove = function(element) {
	  for (var i = 0; i < this.length; i++)
	    if (this[i] == element) this.splice(i,1); 
	};
	// プレロード関数
	function preload(images, progress) {
		var total = images.length;
	    $(images).each(function(){
			var src = this;
	        $('<img/>')
				.attr('src', src)
				.load(function() {
					images.remove(src);
					progress(total, total - images.length);
				});
	    });
	}
	
	var now_percent = 0;
	var displaying_percent= 0;

// スマホ ローディング開始読み込み画像
if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
	preload([
		'http://cobukecoffee.com/webcms/wp-content/themes/cobukecoffee/images/top/sp_img1.jpg',
		'http://cobukecoffee.com/webcms/wp-content/themes/cobukecoffee/images/top/sp_img2.jpg'
	], function(total, loaded){
		now_percent = Math.ceil(100 * loaded / total);
	});

// PC ローディング開始読み込み画像
} else {
	preload([
		'http://cobukecoffee.com/webcms/wp-content/themes/cobukecoffee/images/top/img1.jpg',
		'http://cobukecoffee.com/webcms/wp-content/themes/cobukecoffee/images/top/img2.jpg'
	], function(total, loaded){
		now_percent = Math.ceil(100 * loaded / total);
	});

}

	var timer = window.setInterval(function() {
		if (displaying_percent >= 100) {
			window.clearInterval(timer);
				$('#bar').fadeOut('slow');
				
				setTimeout( function() {
				$("#load-text").animate({"marginTop":"-130px","opacity": "0"}, 600);
				}, 400 );
				setTimeout( function() {
					$('<img />')
					$('.home .logo').animate({"opacity": "0.95"}, 1000);
					$('.home .logo_mark img').animate({"opacity": "0.95"}, 1000);
					$('.home_content').animate({"opacity": "0.95"}, 1000);
						setTimeout( function() {
								$('#loader').fadeOut('slow');
								$('#loader').animate({"opacity": "0"}, 2000);
							}, 600 );
					}, 1000 );
		} else {
			if (displaying_percent < now_percent) {
				displaying_percent++;
				$('#load-text').html(displaying_percent);
				$('#bar span').css('width', displaying_percent + '%');
			}
		}
	}, 
	1);	// この数字を変えると調整できる

});
