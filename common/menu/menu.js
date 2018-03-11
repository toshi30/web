$(function (){
  //body開始タグの直下に追記
  $("body").prepend("<div id='menuArea'></div>");
  $("#menuArea").load("../common/menu/menu.html", function () {
    //メニュー部分の処理
    $("#menuArea li ul").hide();
    $("#menuArea li").hover(function (){
      $("ul:not(:animated)", this).slideDown("fast");
    },function (){
      $("ul", this).slideUp("fast");
    });
  },);
});
$(function(){
  $("#menuArea li")
    .bind( 'touchstart', function(){
      $( this ).addClass( 'hover' );
  }).bind( 'touchend', function(){
      $( this ).removeClass( 'hover' );
  }).bind( 'mousedown', function(){
      $( this ).addClass( 'hover' );
  }).bind( 'mouseup', function(){
      $( this ).removeClass( 'hover' );
  });
});
