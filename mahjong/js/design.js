$(function (){
	//メニュー部分の処理
	$("#menuArea li ul").hide();
	$("#menuArea li").hover(function (){
		$("ul:not(:animated)", this).slideDown("fast");
	},function (){
		$("ul", this).slideUp("fast");
	});

	//打牌候補の手牌の処理
	$("#tehaiArea .hai").hover(function (){
		//マウスオーバー時
		$(this).stop().animate({marginTop:"-10px"},50);
	},function(){
		//マウスアウト時
		$(this).stop().animate({marginTop:"-0px"},50);
	});
});
