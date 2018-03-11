var othello;
var othelloTaihi;
var turn; //黒と白とどちらの順番か

var cpuLv = 0;
var cpuTurn = "";

var siroImgsrc = "./img/s.png"
var kuroImgsrc = "./img/k.png"
var noneImgsrc = "./img/n.gif"

$(function(){
  resizeBoard();

  //ウィンドウサイズ変更時の処理
  $(window).on('load resize', function(){
    resizeBoard();
  });
  
  init();

  setPopupArea();

  $(".showPopup").colorbox({
    inline : true,
    transition : "fade",
    speed  : 200,
    width  : "60%",
    height : "25%",
    open   : true,
    opacity: 0.75,
    onOpen : function(){
        $("#popupArea div.popupAreaCh").hide();
        $("#popupArea div.popupAreaCh.ch1").show();
    }
  });
});

//画面サイズ調整処理
function resizeBoard(){

  //画面サイズ取得
  var bodyWidth = $(window).width();
  var bodyHeight = $(window).height() - $("#menuArea").outerHeight() - $("#infoArea").outerHeight();

  var masuSize = Math.round(bodyWidth * 0.90 / 8) * 8;

  if(bodyWidth > bodyHeight){
    masuSize = Math.round(bodyHeight * 0.90 / 8) * 8;
  }

  $("#boardArea").css({
    "width" : masuSize,
    "height" : masuSize
  });

  $("#infoArea").css({
    "width" : masuSize,
    "bottom" : masuSize / 36,
  });

}

//初期処理
function init(){
  othello = [];
  othelloTaihi = [];
  turn = "k";

  $("#boardArea").empty();

  //divタグ生成
  for(var i = 0; i < 64; i++){
    var div = $("<div>").attr({
        "id": "div" + i,
        "class": "masu"
    });
    
    $("#boardArea").append(div);

    if(i == 27 | i == 36) othello[i] = "s";
    else if(i == 28 | i == 35) othello[i] = "k";
    else othello[i] = "";
  }
  
  setKoma();

}

function setKoma(){
  var srcImg;

  for(var i = 0; i < 64; i++){
    $("#div" + i).empty();

    if(othello[i] == "s") {
      srcImg = siroImgsrc;
    } else if(othello[i] == "k") {
      srcImg = kuroImgsrc;
    } else {
      srcImg = noneImgsrc;
    }

    var img = $("<img>").attr({
      "id": "img" + i,
      "class": "komaImg",
      "src": srcImg
    });

    if(othello[i] == "") {
      $(img).on("click", put);
    }

    $("#div" + i).append(img);
  }
}

//PopupArea表示処理
function setPopupArea(){

  //CPU対戦時の処理
  $("#oneButton").on("click", function(){

    $("#popupArea div.popupAreaCh").hide();
    $("#popupArea div.popupAreaCh.ch2").show();

    $("#selectLevel").val("0");
  });

  //CPU レベル選択時の処理
  $("#selectLevel").on("change", function(){
  
    cpuLv = $("#selectLevel").val();
    $("#popupArea div.popupAreaCh").hide();
    $("#popupArea div.popupAreaCh.ch3").show();

  });

  //CPU 先攻（黒）選択時の処理
  $("#blackButton").on("click", function(event){
    $.colorbox.close();
    $("#infoArea").css({"visibility": "visible"}); 
    cpuTurn = "s";
    init();
  });

  //CPU 後攻（白）選択時の処理
  $("#whiteButton").on("click", function(){
    $.colorbox.close();
    $("#infoArea").css({"visibility": "visible"}); 
    cpuTurn = "k";
    init();

    //CPUのターン
    if(cpuLv > 0 && cpuTurn == turn){
        setTimeout(function(){
          var idNum = cpuThink(cpuLv);
          var checkPutRes = checkPut(idNum, othello);
          othelloTaihi = checkPutRes[1];
          if(checkPutRes[0] == 1) afterPut(idNum);
        },1000);
    }
  });

  //二人対戦時の処理
  $("#twoButton").on("click", function(){
    cpuLv = 0;
    init();
    $.colorbox.close();
    $("#infoArea").css({"visibility": "visible"}); 
  });

}

function put(event){

    event.preventDefault();

    //クリックした箇所が置けるかどうか確認
    var idNum = Number(event.target.id.substr(3));
    var checkPutRes = checkPut(idNum, othello);
    var putOkFlg = checkPutRes[0];
    othelloTaihi = checkPutRes[1];
    
    //置ける場合、駒をひっくり返す
    if(putOkFlg == 1){
      afterPut(idNum);

      //CPU対戦の場合次のCPUのターン
      if(cpuLv > 0 && cpuTurn == turn){
        setTimeout(function(){
          idNum = cpuThink(cpuLv);
          
          var checkPutRes = checkPut(idNum, othello);
          var putOkFlg = checkPutRes[0];
          othelloTaihi = checkPutRes[1];
          if(putOkFlg == 1) afterPut(idNum);
        },500);        
      }
    }
}

//-----------------------------------------------------------
//次に角がとられる場所を除く
//
//引数：
//  idNum  :チェックする場所（0～63）
//  othello:今の状態の配列
//戻り値：
//  putOkFlg        :引数idNumがおけるならば1、おけなければ0を返却
//  othelloTurnStone:othelloTaihi
//-----------------------------------------------------------
function checkPut(idNum, othello){
  var putOkFlg = 0;
  var othelloTurnStone = [];

  if( othello[idNum] == "" ){
    for(var i = 0; i < 64; i++){
      othelloTurnStone[i] = "";
    }

    //斜め左上方向
    if(idNum >= 18 && idNum % 8 >= 2 && othello[idNum - 9] != "" && othello[idNum - 9] != turn){
      for(var i = idNum-18; i >= 0; i = i-9){
        if(othello[i] == "" ){
          break;
        }else if(othello[i] == turn){
          for(var k = i; k <= idNum; k = k+9){
            othelloTurnStone[k] = turn;
          }
          putOkFlg = 1;
          break;
        }

        if(i % 8 == 0) break;
      }
    }

    //斜め右上方向
    if(idNum >= 16 && idNum % 8 <= 5 && othello[idNum - 7] != "" && othello[idNum - 7] != turn){
      for(var i = idNum-14; i >= 0; i = i-7){
        if(othello[i] == "" ){
          break;
        }else if(othello[i] == turn){
          for(var k = i; k <= idNum; k = k+7){
            othelloTurnStone[k] = turn;
          }
          putOkFlg = 1;
          break;
        }

        if(i % 8 == 7) break;
      }
    }

    //斜め左下方向
    if(idNum <= 47 && idNum % 8 >= 2 && othello[idNum + 7] != "" && othello[idNum + 7] != turn){
      for(var i = idNum+14; i <= 63; i = i+7){
        if(othello[i] == "" ){
          break;
        }else if(othello[i] == turn){
          for(var k = i; k >= idNum; k = k-7){
            othelloTurnStone[k] = turn;
          }
          putOkFlg = 1;
          break;
        }

        if(i % 8 == 0) break;
      }
    }

    //斜め右下方向
    if(idNum <= 45 && idNum % 8 <= 5 && othello[idNum + 9] != "" && othello[idNum + 9] != turn){
      for(var i = idNum+18; i <= 63; i = i+9){
        if(othello[i] == "" ){
          break;
        }else if(othello[i] == turn){
          for(var k = i; k >= idNum; k = k-9){
            othelloTurnStone[k] = turn;
          }

          putOkFlg = 1;
          break;
        }

        if(i % 8 == 7) break;
      }
    }

    //上方向
    if(idNum >= 16 && othello[idNum - 8] != "" && othello[idNum - 8] != turn){
      for(var i = idNum-16; i >= 0; i = i-8){
        if(othello[i] == "" ){
          break;
        }else if(othello[i] == turn){
          for(var k = i; k <= idNum; k = k+8){
            othelloTurnStone[k] = turn;
          }

          putOkFlg = 1;
          break;
        }

        if(i <= 7) break;
      }
    }

    //下方向
    if(idNum <= 47 && othello[idNum + 8] != "" && othello[idNum + 8] != turn){
      for(var i = idNum + 16; i <= 63; i = i+8){
        if(othello[i] == "" ){
          break;
        }else if(othello[i] == turn){
          for(var k = i; k >= idNum; k = k-8){
            othelloTurnStone[k] = turn;
          }

          putOkFlg = 1;
          break;
        }

        if(i >= 56) break;
      }
    }

    //左方向
    if(idNum % 8 >= 2 && othello[idNum - 1] != "" && othello[idNum - 1] != turn){
      for(var i = idNum-2; i >= 0; i--){
        if(othello[i] == "" ){
          break;
        }else if(othello[i] == turn){
          for(var k = i; k <= idNum; k = k+1){
            othelloTurnStone[k] = turn;
          }

          putOkFlg = 1;
          break;
        }

        if(i % 8 == 0) break;
      }
    }

    //右方向
    if(idNum % 8 <= 5 && othello[idNum + 1] != "" && othello[idNum + 1] != turn){
      for(var i = idNum+2; i <= 63; i++){
        if(othello[i] == "" ){
          break;
        }else if(othello[i] == turn){
          for(var k = i; k >= idNum; k = k-1){
            othelloTurnStone[k] = turn;
          }

          putOkFlg = 1;
          break;
        }

        if(i % 8 == 7) break;
      }
    }

  }

  return [putOkFlg,othelloTurnStone];
}

function countKome(){
  var kuro   = 0;
  var shiro  = 0;
  var result = [];

  for(var i = 0; i < 64; i++){
    if(othello[i] == "k") kuro = kuro + 1;
    else if(othello[i] == "s") shiro = shiro + 1;
  }

  result = [kuro,shiro];

  return result;
}

function checkFinish(){

}

function afterPut(idNum) {
  var finishFlg = 0;

  //自分のものになった石をめくる
  for(var i = 0; i < 64; i++){
    if(othelloTaihi[i] != "") othello[i] = othelloTaihi[i];
  }
  
  //自分で置いた石
  othello[idNum] = turn;

  //画面上の石を置き直す
  setKoma();

  //ターンをチェンジ
  if(turn == "k") {
    turn = "s";
    $("#kuroTurn").hide();
    $("#shiroTurn").show();
  } else {
    turn = "k";
    $("#kuroTurn").show();
    $("#shiroTurn").hide();
  }


  //ゲームが終了したかチェック
  for(var i = 0; i < 64; i++){
    var checkPutRes = checkPut(i, othello);
    if(checkPutRes[0] == 1) break;
  }

  //どのマスにも置けない
  if(i == 64) {
    //ターンをチェンジして置けるマスがあるかチェック
    if(turn == "k") {
      turn = "s";
      $("#kuroTurn").hide();
      $("#shiroTurn").show();
    } else {
      turn = "k";
      $("#kuroTurn").show();
      $("#shiroTurn").hide();
    }

    for(var i = 0; i < 64; i++){
      var checkPutRes = checkPut(i, othello);
      if(checkPutRes[0] == 1) break;
    }

    if(i == 64) {
      //どちらのターンでも置けるますがないので終了
      finishFlg = 1;
    } else {
      //片方が置けなかっただけなのでパス
      var passTurn = "";
      if(turn == "s"){
        passTurn = ".popupKoma.kuro";
      } else {
        passTurn = ".popupKoma.shiro";
      }
      
      var timerId;
      $(".passPopup").colorbox({
        inline : true,
        transition : "none",
        width  : "60%",
        height : "15%",
        open   : true,
        opacity: 0.75,
        onOpen : function(){
            $("#popupArea div.popupAreaCh").hide();
            $("#popupArea div.popupAreaCh.passArea").show();
            $("#popupArea div.popupAreaCh.passArea .popupKoma").hide();
            $("#popupArea div.popupAreaCh.passArea " + passTurn ).show();
        },
        onComplete: function() {
          clearTimeout(timerId);
          timerId = setTimeout($.colorbox.close, 1500);
        }
      });

    }
  }

  //現在の石を数えて更新
  var komaResult = countKome();
  $("#infoArea .kuroCnt").text(":" + komaResult[0]);
  $("#infoArea .shiroCnt").text(":" + komaResult[1]);

  //ゲーム終了
  if(finishFlg == 1){
    $(".resultPopup").colorbox({
      inline : true,
      transition : "none",
      width  : "60%",
      height : "15%",
      open   : true,
      opacity: 0.75,
      onOpen : function(){
        $("#popupArea div.popupAreaCh").hide();
        $("#popupArea div.popupAreaCh.resultArea").show();
        
        if(komaResult[0] > komaResult[1]) {
          //黒の勝利
          $("#popupArea div.popupAreaCh.resultArea .winner").show();
          $("#popupArea div.popupAreaCh.resultArea .popupKoma.kuro").show();
          $("#popupArea div.popupAreaCh.resultArea .popupKoma.shiro").hide();
        } else if(komaResult[1] > komaResult[0]) {
          //白の勝利
          $("#popupArea div.popupAreaCh.resultArea .winner").show();
          $("#popupArea div.popupAreaCh.resultArea .popupKoma.kuro").hide();
          $("#popupArea div.popupAreaCh.resultArea .popupKoma.shiro").show();
        } else if(komaResult[0] == komaResult[1]) {
          //引き分け
          $("#popupArea div.popupAreaCh.resultArea .popupKoma.kuro").show();
          $("#popupArea div.popupAreaCh.resultArea .popupKoma.shiro").show();
          $("#popupArea div.popupAreaCh.resultArea .draw").show();
        }

        $(".resultStone .kuroCnt").text(":" + komaResult[0]);
        $(".resultStone .shiroCnt").text(":" + komaResult[1]);
      },
    });
  }

}

