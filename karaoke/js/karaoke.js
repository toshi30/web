$(function(){    
  var working1 = 0;
  var working2 = 0;

  var roulette1_txt = "";
  var roulette2_txt = "";
  var result_txt = "";
  
  // initialize!
  var option1 = {
    speed : 10,
    duration : 10,
    //slowDownCallback : function() {
    //  console.log("option1");
    //},
    stopCallback : function($stopElm) {
      working1 = 0;
      roulette1_txt = $stopElm.attr('alt');

      //結果文字列表示
      if(roulette1_txt != "" && roulette2_txt != ""){
        result_txt = "「" + roulette1_txt + "」が「" + roulette2_txt + "」から始まる曲";
        $("div.result_container").text(result_txt);
      }
    }
  }
  var option2 = {
    speed : 250,
    duration : 10,
    //slowDownCallback : function() {
    //  console.log("option2");
    //},
    stopCallback : function($stopElm) {
      working2 = 0;
      roulette2_txt = $stopElm.attr('alt');

      //結果文字列表示
      if(roulette1_txt != "" && roulette2_txt != ""){
        result_txt = "「" + roulette1_txt + "」が「" + roulette2_txt + "」から始まる曲";
        $("div.result_container").text(result_txt);
      }
    }
  }
  $('div.roulette1').roulette(option1);
  $('div.roulette2').roulette(option2);

  // START!
  $('.start').click(function(){
    if(working1 == 0 && working2 == 0){
      $("div.result_container").empty();
      roulette1_txt = 0;
      roulette2_txt = 0;
      working1 = 1;
      working2 = 1;
      $('div.roulette1').roulette('start');
      $('div.roulette2').roulette('start');
    }
  });

  // STOP!
  $('.stop').click(function(){
    if(working1 == 1 || working2 == 1){
      $('div.roulette1').roulette('stop');
      $('div.roulette2').roulette('stop');
    }
  });
});

$(function(){
  $('.btn_container_inner .btn')
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
