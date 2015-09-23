function cpuThink(level) {

	//置ける場所を全て配列に格納
	var putableArray = [];
	var changeCntArray = [];

	for(var i = 0; i < 64; i++){
	    if(checkPut(i) == 1) {
	    	putableArray.push(i);
	    	changeCntArray.push(changeCnt);
	    }
	}

	if(putableArray.length == 1) return putableArray[0];

	//******************
	//CPU Level 1
	//配置可能な場所からランダムで配置する
	//******************
	if(level == 1){

	    //配列からランダムで置き場所を取得
	    var random = Math.floor( Math.random() * putableArray.length );

	    return putableArray[random];		
	}

	//******************
	//CPU Level 2
	//四隅取られるところには置かない
	//その他は配置可能な場所からランダムで配置する
	//******************
	else if(level == 2){

		var lv2Array = [];

		for(var i = 0; i < putableArray.length; i++){
			var num = putableArray[i];

		    if(num != 1 && num != 6 && num != 8 && num != 9 && num != 14 && num != 15
		    	 && num != 48 && num != 49 && num != 54 && num != 55 && num != 57 && num != 62){

		    	lv2Array.push(num);

		    }
		}

		if(lv2Array.length == 0){
		    var random = Math.floor( Math.random() * putableArray.length );
		    return putableArray[random];	
		} else {
		    var random = Math.floor( Math.random() * lv2Array.length );
		    return lv2Array[random];
		}
	}

	//******************
	//CPU Level 3
	//一番ひっくり返す数が大きいところに置く
	//******************
	else if(level == 3){

		var lv3Array = [];

		lv3Array.push(putableArray[0]);
		var maxCnt = changeCntArray[0];

		for(var i = 1; i < changeCntArray.length; i++){
			if(maxCnt < changeCntArray[i]){
				lv3Array = [];
				lv3Array.push(putableArray[i]);
				maxCnt = changeCntArray[i];
			} else if (maxCnt == changeCntArray[i]){
				lv3Array.push(putableArray[i]);
			}
		}

		if(lv3Array.length == 1){
		    return lv3Array[0];	
		} else {
		    var random = Math.floor( Math.random() * lv3Array.length );
		    return lv3Array[random];
		}
	}

	//******************
	//CPU Level 4
	//一番ひっくり返す数が小さいところに置く
	//ただし即角取られるところには置かない
	//******************
	else if(level == 4){

		var tmpPutableArray = [];
		var tmpChangeCntArray = [];

		for(var i = 0; i < putableArray.length; i++){
			var num = putableArray[i];

		    if(num != 1 && num != 6 && num != 8 && num != 9 && num != 14 && num != 15
		    	 && num != 48 && num != 49 && num != 54 && num != 55 && num != 57 && num != 62){

		    	tmpPutableArray.push(num);
		    	tmpChangeCntArray.push(changeCntArray[i]);
		    }
		}

		if(tmpPutableArray.lenght == 0){
			for(var i = 0; i < putableArray.length; i++){
				tmpPutableArray.push(putableArray[i]);
				tmpChangeCntArray.push(changeCntArray[i]);
			}
		} 

		var lv4Array = [];

		lv4Array.push(tmpPutableArray[0]);
		var maxCnt = tmpChangeCntArray[0];

		for(var i = 1; i < tmpChangeCntArray.length; i++){
			if(maxCnt < tmpChangeCntArray[i]){
				lv4Array = [];
				lv4Array.push(tmpPutableArray[i]);
				maxCnt = tmpChangeCntArray[i];
			} else if (maxCnt == tmpChangeCntArray[i]){
				lv4Array.push(tmpPutableArray[i]);
			}
		}

		if(lv4Array.length == 1){
		    return lv4Array[0];	
		} else {
		    var random = Math.floor( Math.random() * lv4Array.length );
		    return lv4Array[random];
		}

	}
}