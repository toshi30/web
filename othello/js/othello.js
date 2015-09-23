var othello = [];
var othelloTaihi = [];
var changeCnt= 0;
var turn = "k";
var finishFlg = 0;

var shiro = 0;
var kuro = 0;
var winner;

var cpuLv = 0;
var cpuTurn = "";

$(function(){
    //画面サイズ取得
    var bodyWidth = $(window).width();
    var bodyHeight = $(window).height() - 60;

    var masuSize = Math.round(bodyWidth * 0.90 / 8) * 8;

    if(bodyWidth > bodyHeight){
    	masuSize = Math.round(bodyHeight  * 0.90 / 8) * 8;
    }

    $("#boardArea").css({
    	"width" : masuSize,
    	"height" : masuSize
    });

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

    $("#boardArea > div > img").unbind("click");
    $("#oneButton").bind("click", function(){
    	$("#popupArea").html("<select id='selectLevel'>\
									<option>Select CPU Level</option>\
									<option value='1'>Level 1</option>\
									<option value='2'>Level 2</option>\
									<option value='3'>Level 3</option>\
									<option value='4'>Level 4</option>\
									<option value='5'>Level 5</option>\
									<option value='6'>Level 6</option>\
									<option value='7'>Level 7</option>\
									<option value='8'>Level 8</option>\
									<option value='9'>Level 9</option>\
									<option value='10'>Level 10</option>\
								</select>");

    	$("#selectLevel").bind("change", function(){
    		cpuLv = $("#selectLevel").val();
	    	$("#popupArea").html("<button id='blackButton' class='popupButton'><img src='./img/k.png'>：先手</button>\
	    						  <button id='whiteButton' class='popupButton'><img src='./img/s.png'>：後手</button>");

	    	$("#blackButton").bind("click", function(){
		    	$("#popupArea").css({"visibility": "hidden"}); 
			  	$("#infoArea").css({"visibility": "visible"}); 
				$("#popupArea").bind("click",popupClick);
				$("#boardArea > div > img").bind("click", put);
				cpuTurn = "s";
	    	});

	    	$("#whiteButton").bind("click", function(){
		    	$("#popupArea").css({"visibility": "hidden"}); 
			  	$("#infoArea").css({"visibility": "visible"}); 
				$("#popupArea").bind("click",popupClick);
				$("#boardArea > div > img").bind("click", put);
				cpuTurn = "k";

				//CPUのターン
		    	if(cpuLv > 0 && cpuTurn == turn){
					setTimeout(function(){
						afterPut(cpuThink(cpuLv));
					},1000);
				}
	    	});
    	});


    });

    $("#twoButton").bind("click", function(){
    	$("#popupArea").css({"visibility": "hidden"}); 
    	$("#infoArea").css({"visibility": "visible"}); 
   		$("#popupArea").bind("click",popupClick);
   		$("#boardArea > div > img").bind("click", put);
    });
    
});

function setKoma(){
	var srcImg;

	for(var i = 0; i < 64; i++){
		$("#div" + i).empty();

		if(othello[i] == "s") srcImg = "./img/s.png"
		else if(othello[i] == "k") srcImg = "./img/k.png"
		else srcImg = "./img/n.gif"

		var img = $("<img>").attr({
			"id": "img" + i,
			"class": "komaImg",
			"src": srcImg
		});

        $(img).on("click", put);

		$("#div" + i).append(img);
	}
}

function put(event){

    event.preventDefault();

    //クリックした箇所が置けるかどうか確認
    var idNum = Number(event.target.id.substr(3));
    var putOkFlg = checkPut(idNum);
    
    //置ける場合、駒をひっくり返す
    if(putOkFlg == 1){
    	afterPut(idNum);

    	//CPU対戦の場合次のCPUのターン
    	if(cpuLv > 0 && cpuTurn == turn){
			setTimeout(function(){
				afterPut(cpuThink(cpuLv));
			},500);    		
    	}
    }
}

function checkPut(idNum){

    var putOkFlg = 0;

    for(var i = 0; i < 64; i++){
	    othelloTaihi[i] = "";
    }

    if(othello[idNum] == "" ){

    	//斜め左上方向
    	if(idNum >= 18 && idNum % 8 >= 2 && othello[idNum - 9] != "" && othello[idNum - 9] != turn){
    		for(var i = idNum-18; i >= 0; i = i-9){
    			if(othello[i] == "" ){
    				break;
    			}else if(othello[i] == turn){
    				for(var k = i; k <= idNum; k = k+9){
    					othelloTaihi[k] = turn;
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
    					othelloTaihi[k] = turn;
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
    					othelloTaihi[k] = turn;
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
    					othelloTaihi[k] = turn;
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
    					othelloTaihi[k] = turn;
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
    					othelloTaihi[k] = turn;
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
    					othelloTaihi[k] = turn;
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
    					othelloTaihi[k] = turn;
    				}

    				putOkFlg = 1;
    				break;
    			}

    			if(i % 8 == 7) break;
    		}
    	}

    }

    return putOkFlg;
}

function countStone(){
	shiro = 0;
	kuro = 0;

	for(var i = 0; i < 64; i++){
		if(othello[i] == "s") shiro = shiro + 1;
		else if(othello[i] == "k") kuro = kuro + 1;
	}

	if(shiro > kuro) winner = "白";
	else if(kuro > shiro) winner = "黒";
	else winner = "引き分け";
}

function popupClick(event){
	if(finishFlg == 1){
		location.reload(true);
	} else {
		$("#turnArea").css({"display": "inline"});
		$("#popupArea").css({"visibility": "hidden"});
		$("#boardArea > div > img").bind("click", put);
	}
}

function afterPut(idNum) {

	//自分のものになった駒をめくる
	checkPut(idNum);

    for(var i = 0; i < 64; i++){
		if(othelloTaihi[i] != "") othello[i] = othelloTaihi[i];
	}
    othello[idNum] = turn;

    //ターンをチェンジ
	if(turn == "k") {
		turn = "s";
		$("#kuroTurn").css({"display": "none"});
		$("#shiroTurn").css({"display": "inline"});
	} else {
		turn = "k";
		$("#kuroTurn").css({"display": "inline"});
		$("#shiroTurn").css({"display": "none"});
	}

	//画面上の石を置き直す
    setKoma();

    //ゲームが終了したかチェック
    var finishChk = "";

    //全てのマスに駒が置かれているかチェック
    for(var i = 0; i < 64; i++){
    	finishChk = finishChk + othello[i];
    }

    if(finishChk.length == 64) {
    	finishFlg = 1;
    } else {
    	//どのマスにも置けない
	    for(var i = 0; i < 64; i++){
	    	if(checkPut(i) == 1) break;
	    }

    	if(i == 64) {
    		//ターンをチェンジして置けるマスがあるかチェック
	    	if(turn == "k") {
	    		turn = "s";
	    		$("#kuroTurn").css({"display": "none"});
	    		$("#shiroTurn").css({"display": "inline"});
	    	} else {
	    		turn = "k";
	    		$("#kuroTurn").css({"display": "inline"});
	    		$("#shiroTurn").css({"display": "none"});
	    	}

		    for(var i = 0; i < 64; i++){
		    	if(checkPut(i) == 1) break;
		    }

	    	if(i == 64) {
	    		//どちらのターンでも置けるますがないので終了
		    	finishFlg = 1;
	    	} else {
	    		//片方が置けなかっただけなのでパス
	    		if(turn == "s"){
		    		$("#popupArea").html("<p><img class='popupKoma' src='./img/k.png'><span>はパスです</span></p>");
	    		} else {
		    		$("#popupArea").html("<p><img class='popupKoma' src='./img/s.png'><span>はパスです</span></p>");
	    		}

				$("#boardArea > div > img").unbind("click");
	    		$("#turnArea").css({"display": "none"});
	    		$("#popupArea").css({"visibility": "visible"});

	    		setTimeout(function(){
		    		$("#turnArea").css({"display": "inline"});
		    		$("#popupArea").css({"visibility": "hidden"});
	   				$("#boardArea > div > img").bind("click", put);
	    		},2500);
	    	}
    	}
    }

    //現在の石を数えて更新
	countStone();
	$(".kuroCnt").text(kuro);
	$(".shiroCnt").text(shiro);

    if(finishFlg == 1){
    	$("#infoArea").css({"display": "none"});

    	if(winner == "白") {
    		$("#popupArea").html("<div><img class='popupKoma' src='./img/s.png'><span>WIN!</span></div><div><span>(<img class='popupKoma' src='./img/k.png'>黒:<span class='kuroCnt'></span>&nbsp;<img class='popupKoma' src='./img/s.png'>白:<span class='shiroCnt'></span>)</span></div>");
		} else if(winner == "黒") {
    		$("#popupArea").html("<div><img class='popupKoma' src='./img/k.png'><span>WIN!</span></div><div><span>(<img class='popupKoma' src='./img/k.png'>黒:<span class='kuroCnt'></span>&nbsp;<img class='popupKoma' src='./img/s.png'>白:<span class='shiroCnt'></span>)</span></div>");
    	} else if(winner == "引き分け") {
    		$("#popupArea").html("<div><span>DRAW!</span></div><div><span>(<img class='popupKoma' src='./img/k.png'>黒:<span class='kuroCnt'></span>&nbsp;<img class='popupKoma' src='./img/s.png'>白:<span class='shiroCnt'></span>)</span></div>");
    	}

    	$(".kuroCnt").text(kuro);
		$(".shiroCnt").text(shiro);
    	$("#popupArea").css({"visibility": "visible"});
    }
}
