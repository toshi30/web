window.onload = function () {
  // ローカルストレージ対応判定
  if(!localStorage) {
    alert('お使いのブラウザでは利用できません');
  }
}

$(function(){
  //画面サイズ取得
  bodyWidth = $(window).width();
  bodyHeight = $(window).height() - 27;

  //地域を設定
  //{"code":[地域のコード], "name": [地域の名前], "color":[地域につける色], "hoverColor":[地域をマウスでホバーしたときの色], "prefectures":[地域に含まれる都道府県のコード]}
  var areas = [
    {"code": 1 , "name":"北海道地方", "color":"#ca93ea", "hoverColor":"#e0b1fb", "prefectures":[1]},
    {"code": 2 , "name":"東北地方",   "color":"#a7a5ea", "hoverColor":"#d6d4fd", "prefectures":[2,3,4,5,6,7]},
    {"code": 3 , "name":"関東地方",   "color":"#84b0f6", "hoverColor":"#c1d8fd", "prefectures":[8,9,10,11,12,13,14]},
    {"code": 4 , "name":"北陸・甲信越地方",   "color":"#52d49c", "hoverColor":"#93ecc5", "prefectures":[15,16,17,18,19,20]},
    {"code": 4 , "name":"東海地方",   "color":"#77e18e", "hoverColor":"#aff9bf", "prefectures":[21,22,23,24]},
    {"code": 6 , "name":"近畿地方",   "color":"#f2db7b", "hoverColor":"#f6e8ac", "prefectures":[25,26,27,28,29,30]},
    {"code": 7 , "name":"中国地方",   "color":"#f9ca6c", "hoverColor":"#ffe5b0", "prefectures":[31,32,33,34,35]},
    {"code": 8 , "name":"四国地方",   "color":"#fbad8b", "hoverColor":"#ffd7c5", "prefectures":[36,37,38,39]},
    {"code": 9 , "name":"九州地方",   "color":"#f7a6a6", "hoverColor":"#ffcece", "prefectures":[40,41,42,43,44,45,46]},
    {"code":10 , "name":"沖縄地方",   "color":"#ea89c4", "hoverColor":"#fdcae9", "prefectures":[47]}
  ];
 
  $("#map").japanMap(
    {
      areas  : areas, //上で設定したエリアの情報
      selection : "prefecture", //選ぶことができる範囲(県→prefecture、エリア→area)
      borderLineWidth: 0.25, //線の幅
      drawsBoxLine : false, //canvasを線で囲む場合はtrue
      movesIslands : true, //南西諸島を左上に移動させるときはtrue、移動させないときはfalse
      showsAreaName : true, //エリア名を表示しない場合はfalse
      width: bodyWidth, //canvasのwidth。別途heightも指定可。
      height: bodyHeight, //canvasのwidth。別途heightも指定可。
      backgroundColor: "#DDFFFF", //canvasの背景色
      font : "メイリオ", //地図に表示する文字のフォント
      fontSize : 12, //地図に表示する文字のサイズ
      fontColor : "areaColor", //地図に表示する文字の色。"areaColor"でエリアの色に合わせる
      fontShadowColor : "black", //地図に表示する文字の影の色
      onSelect : function(data){
        
        $("#prefectureCode").val(data.code);
        $("#prefectureName").text(data.name);

        //Selectボックス作成
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth() + 1;

        for (var i = year; i >= 1985; i--) {
          $("#yearFrom").append('<option value="' + i + '">' + i + '年</option>');
          $("#yearTo").append('<option value="' + i + '">' + i + '年</option>');
        }

        for (var j = 1; j <= 12; j++) {
          if(j == month){
            $("#monthFrom").append('<option value="' + j + '" selected>' + j + '月</option>');
            $("#monthTo").append('<option value="' + j + '"selected>' + j + '月</option>');
          } else {
            $("#monthFrom").append('<option value="' + j + '">' + j + '月</option>');
            $("#monthTo").append('<option value="' + j + '">' + j + '月</option>');      
          }
        }

        //json取得
        var jsonData = localStorage.getItem(data.code);

        if(jsonData != null){
          for(var i in jsonData){
            alert("aaa");

            //history作成
            var str = jsonData[i].yearFrom + "/" + jsonData[i].monthFrom;
            if(jsonData[i].term == "1") str = str + "～"　+ jsonData[i].yearTo + "/" + jsonData[i].monthTo;
            str = str + " : " + jsonData[i].title;

            if(i == 0) {
              $("#history").html("<dt>履歴</dt><dd class='histRow'>" + str + "</dd>");
            } else {
              $("#history").append("<dt></dt><dd class='histRow'>" + str + "</dd>");
            }
          }

        }

        $("#tripLayer").css({
          "display" : "block"
        });        
      },
      onHover : function(data,x,y){
        $("#hoverPop").text(data.name);
        $(".pop").css({
          "display" : "block" ,
          "top"   : y-37,
          "left"  : x-27
        });

        setTimeout(function(){
          $(".pop").css("display" , "none");
        },3000);
      }
    }
  );

});

function tripLayerClose () {
  $("#tripLayer").css("display" , "none");
}

function appearTo (ischecked) {
  if( ischecked == true ) {
    $("#toYearMonth").css("display" , "inline");  
  } else {
    $("#toYearMonth").css("display" , "none");  
  }
}

function regHistory() {
  var title = $("#title").val();
  var detail = $("#detail").val();

  if(title == "" || detail == "") {
    alert("未入力項目があります");
  }else{
    var code = $("#prefectureCode").val();
    var yearFrom = $("#yearFrom").val();
    var monthFrom = $("#monthFrom").val();
    var yearTo = $("#yearTo").val();
    var monthTo = $("#monthTo").val();
    var termChk = $("#termChk:checked").val();
    if(typeof(termChk) == "undefined"){
      termChk = null;
    }
    if(termChk != "1"){
      yearTo = null;
      monthTo = null;
    }

    //data
    var array = [];
    
    if(localStorage.getItem(code) != null){
      array.push(localStorage.getItem(code));
    }

    var obj = {"yearFrom":yearFrom,"monthFrom":monthFrom,"yearTo":yearTo,"monthTo":monthTo,"termChk":termChk,"title":title,"detail":detail};
    array.push(JSON.stringify(obj));

    localStorage.setItem(code, array);

  }
}
