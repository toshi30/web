function cpuThink(level) {
  //置ける場所を全て配列に格納
  var putableArray = [];   //置ける場所(0～63)を格納する配列
  var changeCntArray = []; //ひっくり返せる数の配列
  var changeCnt;           //ひっくり返せる数

  for(var i = 0; i < 64; i++){
      var checkPutRes = checkPut(i, othello);
      if(checkPutRes[0] == 1) {
        putableArray.push(i);

        changeCnt = 0;

        for(var k = 0; k < 64; k++){
          if(othelloTaihi[k] !="" && othello[k] != othelloTaihi[k]) changeCnt = changeCnt + 1;
        }

        changeCntArray.push(changeCnt);
      }
  }

  if(putableArray.length == 1) return putableArray[0];

  //******************
  //CPU Level 1
  //・配置可能な場所からランダムで配置する
  //******************
  if(level == 1){

    //配列からランダムで置き場所を取得
    var random = Math.floor( Math.random() * putableArray.length );
    return putableArray[random];

  }

  //******************
  //CPU Level 2
  //・角が取れたらとる
  //・四隅取られるところにはおかない
  //・その他は配置可能な場所からランダムで配置する
  //******************
  else if(level == 2){
    var lv2Array = [];
      
    //角が取れたら角をとる
    var cornerCheckNum = cornerCheck(putableArray,changeCntArray);
    if(cornerCheckNum != 99) {
      return cornerCheckNum;
    }

    //四隅取られるところにはおかない
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
  
    return getMaxTurn(putableArray,changeCntArray);
  }

  //******************
  //CPU Level 4
  //一番ひっくり返す数が大きいところに置く
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

    if(tmpPutableArray.length == 0){
      for(var i = 0; i < putableArray.length; i++){
        tmpPutableArray.push(putableArray[i]);
        tmpChangeCntArray.push(changeCntArray[i]);
      }
    } 

    return getMaxTurn(tmpPutableArray,tmpChangeCntArray);

  }

  //******************
  //CPU Level 5
  //一番ひっくり返す数が小さいところに置く
  //ただし即角取られるところには置かない
  //******************
  else if(level == 5){

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

    if(tmpPutableArray.length == 0){
      for(var i = 0; i < putableArray.length; i++){
        tmpPutableArray.push(putableArray[i]);
        tmpChangeCntArray.push(changeCntArray[i]);
      }
    } 

    return getMinTurn(tmpPutableArray,tmpChangeCntArray);

  //******************
  //CPU Level 6
  // ・角は必ず取る
  // ・序盤は数が少ないところ、終盤は数が多いところに置く
  //******************
  } else if(level == 6){
    
    //角が取れたら角をとる
    var cornerCheckNum = cornerCheck(putableArray,changeCntArray);
    if(cornerCheckNum != 99) {
      return cornerCheckNum;
    }

    //序盤と終盤で戦い方を変える
    var restCnt = 0;
    for(var i = 0; i < othello.length; i++){
      if(othello[i] == ""){
        restCnt = restCnt + 1;
      }
    }

    if(restCnt <= 48){
    //序盤
    
    } else if(restCnt <= 28){
    //中盤
    
    } else {
    //終盤
    
    }
    


  } else if(level == 7){
  } else if(level == 8){
  } else if(level == 9){
  } else if(level == 10){
  }

}

//-----------------------------------------------------------
//角を取れるかどうかチェック
//複数とれる場合は枚数の多い場所
//
//引数：
//  putableArray  :おける場所（0～63）を保持した配列
//  changeCntArray:ひっくり返した後増える駒の数を保持した配列
//戻り値：
//  とれる場合  :その場所（0～63）
//  とれない場合:99
//-----------------------------------------------------------
function cornerCheck(putableArray,changeCntArray){
  var tmpNum = 99;
  var tmpNumCnt = 0;

  for(var i = 0; i < putableArray.length; i++){
    var num = putableArray[i];

    if(num == 0 || num == 7 || num == 56 || num == 63){
      if(tmpNumCnt < changeCntArray[i]) {
        tmpNum = num;
        tmpNumCnt = changeCntArray[i];
      }
    }
  }
  
  return tmpNum;

}


//-----------------------------------------------------------
//一番とれる数が多い場所
//複数とれる場合は枚数の多い場所
//
//引数：
//  putableArray  :おける場所（0～63）を保持した配列
//  changeCntArray:ひっくり返した後増える駒の数を保持した配列
//戻り値：
//  一番多い場所（0～63）
//-----------------------------------------------------------
function getMaxTurn(putableArray,changeCntArray){
  var numArray = [];
  numArray.push(putableArray[0]);
  var maxCnt = changeCntArray[0];

  for(var i = 1; i < changeCntArray.length; i++){
    if(maxCnt < changeCntArray[i]){
      numArray = [];
      numArray.push(putableArray[i]);
      maxCnt = changeCntArray[i];
    } else if (maxCnt == changeCntArray[i]){
      numArray.push(putableArray[i]);
    }
  }

  if(numArray.length == 1){
      return numArray[0];  
  } else {
      var random = Math.floor( Math.random() * numArray.length );
      return numArray[random];
  }

}

//-----------------------------------------------------------
//一番とれる数が少ない場所
//複数とれる場合は枚数の少ない場所
//
//引数：
//  putableArray  :おける場所（0～63）を保持した配列
//  changeCntArray:ひっくり返した後増える駒の数を保持した配列
//戻り値：
//  一番多い場所（0～63）
//-----------------------------------------------------------
function getMinTurn(putableArray,changeCntArray){
  var numArray = [];
  numArray.push(putableArray[0]);
  var minCnt = changeCntArray[0];

  for(var i = 1; i < changeCntArray.length; i++){
    if(minCnt > changeCntArray[i]){
      numArray = [];
      numArray.push(putableArray[i]);
      minCnt = changeCntArray[i];
    } else if (minCnt == changeCntArray[i]){
      numArray.push(putableArray[i]);
    }
  }

  if(numArray.length == 1){
      return numArray[0];  
  } else {
      var random = Math.floor( Math.random() * numArray.length );
      return numArray[random];
  }

}


//-----------------------------------------------------------
//次に角がとられる場所を除く
//
//引数：
//  putableArray  :おける場所（0～63）を保持した配列
//  changeCntArray:ひっくり返した後増える駒の数を保持した配列
//戻り値：
//  tmpPutableArray  :次に角がとられる場所を除いたputableArray
//  tmpChangeCntArray:次に角がとられる場所を除いたchangeCntArray
//-----------------------------------------------------------
function removeLostCorner(putableArray,changeCntArray){
  var tmpPutableArray = [];
  var tmpChangeCntArray = [];
  
  for(var i = 0; i < putableArray.length; i++){
    var num = putableArray[i];

    if(num == 1){
    
    } else if(num == 6){
    
    } else if(num == 8){
    
    } else if(num == 9){
    
    } else if(num == 14){
    
    } else if(num == 15){
    
    } else if(num == 48){
    
    } else if(num == 49){
    
    } else if(num == 54){
    
    } else if(num == 55){
    
    } else if(num == 57){
    
    } else if(num == 62){
    
    } else {
      //角前の場所ではない場合
      tmpPutableArray.push(num);
      tmpChangeCntArray.push(changeCntArray[i]);
    }
  }

}
