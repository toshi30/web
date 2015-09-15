var othello = [];
var othelloTaihi = [];
var turn = "k";
var finishFlg = 0;

var shiro = 0;
var kuro = 0;
var winner;

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

});

function setKoma(){
	var srcImg;

	for(var i = 0; i < 64; i++){
		$("#div" + i).empty();

		if(othello[i] == "s") srcImg = "./img/s.gif"
		else if(othello[i] == "k") srcImg = "./img/k.gif"
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

    var idNum = Number(event.target.id.substr(3));

    var putOkFlg = checkPut(idNum);
    
    if(putOkFlg == 1){
    	for(var i = 0; i < 64; i++){
    		if(othelloTaihi[i] != "") othello[i] = othelloTaihi[i];
    	}
	    othello[idNum] = turn;

    	if(turn == "k") {
    		turn = "s";
    		$("#kuroTurn").css({"display": "none"});
    		$("#shiroTurn").css({"display": "inline"});
    	} else {
    		turn = "k";
    		$("#kuroTurn").css({"display": "inline"});
    		$("#shiroTurn").css({"display": "none"});
    	}

	    setKoma();

	    //ゲームが終了したかチェック
	    var finishChk = "";

	    for(var i = 0; i < 64; i++){
	    	finishChk = finishChk + othello[i];
	    }

	    if(finishChk.length == 64) {
	    	finishFlg = 1;
	    } else {
		    for(var i = 0; i < 64; i++){
		    	if(checkPut(i) == 1) break;
		    }

	    	if(i == 64) {
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
			    	finishFlg = 1;
		    	} else {
				    alert("パスです");
		    	}
	    	}
	    }

    	countStone();
    	$("#kuroCnt").text(kuro);
    	$("#shiroCnt").text(shiro);

	    if(finishFlg == 1){
	    	$("#turnArea").css({"display": "none"});
	    	$("#resultArea").css({"display": "inline"});

	    	if(winner == "白") $("#shiroResult").css({"display": "inline"});
	    	else if(winner == "黒") $("#kuroResult").css({"display": "inline"});
	    	else if(winner == "引き分け") $("#drawResult").css({"display": "inline"});
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