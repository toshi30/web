//和了チェック
function checkAgari(){
    var agarihai = [];

    for(var i=0; i < tehai.length; i++){
        agarihai.push(tehai[i]);
    }

    agarihai.sort(function(a,b){ return a-b; });

    var jantouArray = createJantouArray(agarihai);
    var kotsuArray = createKotsuArray(agarihai);
    var shuntsuArray = createShuntsuArray(agarihai);

    var checkArrayHai = [];
    var agarikamoArray = [];

    for(var i=0; i < jantouArray.length; i++){
        checkArrayHai.length = 0;
        checkArrayHai.push(jantouArray[i]);
        checkArrayHai.push(jantouArray[i]);
        agarikamoArray.push(jantouArray[i]);
        agarikamoArray.push(jantouArray[i]);

        if(kanzumihai.length == 4){

            checkArrayHai.sort(function(a,b){ return a-b; });
            if(agarihai.toString() == checkArrayHai.toString()){
                agarikamoArray.push(kanzumihai[0]);
                agarikamoArray.push(kanzumihai[0]);
                agarikamoArray.push(kanzumihai[0]);
                agarikamoArray.push(kanzumihai[1]);
                agarikamoArray.push(kanzumihai[1]);
                agarikamoArray.push(kanzumihai[1]);
                agarikamoArray.push(kanzumihai[2]);
                agarikamoArray.push(kanzumihai[2]);
                agarikamoArray.push(kanzumihai[2]);
                agarikamoArray.push(kanzumihai[3]);
                agarikamoArray.push(kanzumihai[3]);
                agarikamoArray.push(kanzumihai[3]);
                
                agarizumiHai.push(agarikamoArray);

                tsumoAgariFlag = 1;
            }

        }else if(kanzumihai.length == 3){

            for(var j=0; j < kotsuArray.length; j++){
                checkArrayHai.push(kotsuArray[j]);
                checkArrayHai.push(kotsuArray[j]);
                checkArrayHai.push(kotsuArray[j]);
                
                checkArrayHai.sort(function(a,b){ return a-b; });
                if(agarihai.toString() == checkArrayHai.toString()){
                    tsumoAgariFlag = 1;
                    return tsumoAgariFlag;
                }else{
                    checkArrayHai.length = 0;
                    checkArrayHai.push(jantouArray[i]);
                    checkArrayHai.push(jantouArray[i]);
                    agarikamoArray.push(jantouArray[i]);
                }
            }
            
            for(var j=0; j < shuntsuArray.length; j++){
                checkArrayHai.push(shuntsuArray[j]);
                checkArrayHai.push(shuntsuArray[j]+1);
                checkArrayHai.push(shuntsuArray[j]+2);
                
                checkArrayHai.sort(function(a,b){ return a-b; });
                if(agarihai.toString() == checkArrayHai.toString()){
                    tsumoAgariFlag = 1;
                    return tsumoAgariFlag;
                }else{
                    checkArrayHai.length = 0;
                    checkArrayHai.push(jantouArray[i]);
                    checkArrayHai.push(jantouArray[i]);
                    agarikamoArray.push(jantouArray[i]);
                }
            }
        
        }else if(kanzumihai.length == 2){

            for(var j=0; j < kotsuArray.length; j++){
                for(var k=1; k < kotsuArray.length; k++){
                    checkArrayHai.push(kotsuArray[j]);
                    checkArrayHai.push(kotsuArray[j]);
                    checkArrayHai.push(kotsuArray[j]);
                    checkArrayHai.push(kotsuArray[k]);
                    checkArrayHai.push(kotsuArray[k]);
                    checkArrayHai.push(kotsuArray[k]);
                    
                    checkArrayHai.sort(function(a,b){ return a-b; });
                    if(agarihai.toString() == checkArrayHai.toString()){
                        tsumoAgariFlag = 1;
                        return tsumoAgariFlag;
                    }else{
                        checkArrayHai.length = 0;
                        checkArrayHai.push(jantouArray[i]);
                        checkArrayHai.push(jantouArray[i]);
                        agarikamoArray.push(jantouArray[i]);
                    }
                }

                for(var k=0; k < shuntsuArray.length; k++){
                    checkArrayHai.push(kotsuArray[j]);
                    checkArrayHai.push(kotsuArray[j]);
                    checkArrayHai.push(kotsuArray[j]);
                    checkArrayHai.push(shuntsuArray[k]);
                    checkArrayHai.push(shuntsuArray[k]+1);
                    checkArrayHai.push(shuntsuArray[k]+2);
                    
                    checkArrayHai.sort(function(a,b){ return a-b; });
                    if(agarihai.toString() == checkArrayHai.toString()){
                        tsumoAgariFlag = 1;
                        return tsumoAgariFlag;
                    }else{
                        checkArrayHai.length = 0;
                        checkArrayHai.push(jantouArray[i]);
                        checkArrayHai.push(jantouArray[i]);
                        agarikamoArray.push(jantouArray[i]);
                    }
                }
            }

            for(var j=0; j < shuntsuArray.length; j++){
                for(var k=1; k < shuntsuArray.length; k++){
                    checkArrayHai.push(shuntsuArray[j]);
                    checkArrayHai.push(shuntsuArray[j]+1);
                    checkArrayHai.push(shuntsuArray[j]+2);
                    checkArrayHai.push(shuntsuArray[k]);
                    checkArrayHai.push(shuntsuArray[k]+1);
                    checkArrayHai.push(shuntsuArray[k]+2);
                    
                    checkArrayHai.sort(function(a,b){ return a-b; });
                    if(agarihai.toString() == checkArrayHai.toString()){
                        tsumoAgariFlag = 1;
                        return tsumoAgariFlag;
                    }else{
                        checkArrayHai.length = 0;
                        checkArrayHai.push(jantouArray[i]);
                        checkArrayHai.push(jantouArray[i]);
                        agarikamoArray.push(jantouArray[i]);
                    }
                }
            }
            
        }else if(kanzumihai.length == 1){
            for(var j=0; j < kotsuArray.length; j++){
                for(var k=1; k < kotsuArray.length; k++){
                    for(var m=2; m < kotsuArray.length; m++){
                        checkArrayHai.push(kotsuArray[j]);
                        checkArrayHai.push(kotsuArray[j]);
                        checkArrayHai.push(kotsuArray[j]);
                        checkArrayHai.push(kotsuArray[k]);
                        checkArrayHai.push(kotsuArray[k]);
                        checkArrayHai.push(kotsuArray[k]);
                        checkArrayHai.push(kotsuArray[m]);
                        checkArrayHai.push(kotsuArray[m]);
                        checkArrayHai.push(kotsuArray[m]);

                        checkArrayHai.sort(function(a,b){ return a-b; });
                        if(agarihai.toString() == checkArrayHai.toString()){
                            tsumoAgariFlag = 1;
                            return tsumoAgariFlag;
                        }else{
                            checkArrayHai.length = 0;
                            checkArrayHai.push(jantouArray[i]);
                            checkArrayHai.push(jantouArray[i]);
                            agarikamoArray.push(jantouArray[i]);
                        }
                    }

                    for(var m=0; m < shuntsuArray.length; m++){
                        checkArrayHai.push(kotsuArray[j]);
                        checkArrayHai.push(kotsuArray[j]);
                        checkArrayHai.push(kotsuArray[j]);
                        checkArrayHai.push(kotsuArray[k]);
                        checkArrayHai.push(kotsuArray[k]);
                        checkArrayHai.push(kotsuArray[k]);
                        checkArrayHai.push(shuntsuArray[m]);
                        checkArrayHai.push(shuntsuArray[m]+1);
                        checkArrayHai.push(shuntsuArray[m]+2);

                        checkArrayHai.sort(function(a,b){ return a-b; });
                        if(agarihai.toString() == checkArrayHai.toString()){
                            tsumoAgariFlag = 1;
                            return tsumoAgariFlag;
                        }else{
                            checkArrayHai.length = 0;
                            checkArrayHai.push(jantouArray[i]);
                            checkArrayHai.push(jantouArray[i]);
                            agarikamoArray.push(jantouArray[i]);
                        }
                    }
                }
                
                for(var k=0; k < shuntsuArray.length; k++){
                    for(var m=1; m < shuntsuArray.length; m++){
                        checkArrayHai.push(kotsuArray[j]);
                        checkArrayHai.push(kotsuArray[j]);
                        checkArrayHai.push(kotsuArray[j]);
                        checkArrayHai.push(shuntsuArray[k]);
                        checkArrayHai.push(shuntsuArray[k]+1);
                        checkArrayHai.push(shuntsuArray[k]+2);
                        checkArrayHai.push(shuntsuArray[m]);
                        checkArrayHai.push(shuntsuArray[m]+1);
                        checkArrayHai.push(shuntsuArray[m]+2);

                        checkArrayHai.sort(function(a,b){ return a-b; });
                        if(agarihai.toString() == checkArrayHai.toString()){
                            tsumoAgariFlag = 1;
                            return tsumoAgariFlag;
                        }else{
                            checkArrayHai.length = 0;
                            checkArrayHai.push(jantouArray[i]);
                            checkArrayHai.push(jantouArray[i]);
                            agarikamoArray.push(jantouArray[i]);
                        }
                    }
                }
            }

            for(var j=0; j < kotsuArray.length; j++){
                for(var k=1; k < shuntsuArray.length; k++){
                    for(var m=2; m < shuntsuArray.length; m++){
                        checkArrayHai.push(shuntsuArray[j]);
                        checkArrayHai.push(shuntsuArray[j]+1);
                        checkArrayHai.push(shuntsuArray[j]+2);
                        checkArrayHai.push(shuntsuArray[k]);
                        checkArrayHai.push(shuntsuArray[k]+1);
                        checkArrayHai.push(shuntsuArray[k]+2);
                        checkArrayHai.push(shuntsuArray[m]);
                        checkArrayHai.push(shuntsuArray[m]+1);
                        checkArrayHai.push(shuntsuArray[m]+2);

                        checkArrayHai.sort(function(a,b){ return a-b; });
                        if(agarihai.toString() == checkArrayHai.toString()){
                            tsumoAgariFlag = 1;
                            return tsumoAgariFlag;
                        }else{
                            checkArrayHai.length = 0;
                            checkArrayHai.push(jantouArray[i]);
                            checkArrayHai.push(jantouArray[i]);
                            agarikamoArray.push(jantouArray[i]);
                        }
                    }
                }
            }

        }else{
            for(var j=0; j < kotsuArray.length; j++){
                for(var k=1; k < kotsuArray.length; k++){
                    for(var m=2; m < kotsuArray.length; m++){
                        for(var n=3; n < kotsuArray.length; n++){
                            checkArrayHai.push(kotsuArray[j]);
                            checkArrayHai.push(kotsuArray[j]);
                            checkArrayHai.push(kotsuArray[j]);
                            checkArrayHai.push(kotsuArray[k]);
                            checkArrayHai.push(kotsuArray[k]);
                            checkArrayHai.push(kotsuArray[k]);
                            checkArrayHai.push(kotsuArray[m]);
                            checkArrayHai.push(kotsuArray[m]);
                            checkArrayHai.push(kotsuArray[m]);
                            checkArrayHai.push(kotsuArray[n]);
                            checkArrayHai.push(kotsuArray[n]);
                            checkArrayHai.push(kotsuArray[n]);

                            checkArrayHai.sort(function(a,b){ return a-b; });
                            if(agarihai.toString() == checkArrayHai.toString()){
                                tsumoAgariFlag = 1;
                                return tsumoAgariFlag;
                            }else{
                                checkArrayHai.length = 0;
                                checkArrayHai.push(jantouArray[i]);
                                checkArrayHai.push(jantouArray[i]);
                                agarikamoArray.push(jantouArray[i]);
                            }
                        }

                        for(var n=0; n < shuntsuArray.length; n++){
                            checkArrayHai.push(kotsuArray[j]);
                            checkArrayHai.push(kotsuArray[j]);
                            checkArrayHai.push(kotsuArray[j]);
                            checkArrayHai.push(kotsuArray[k]);
                            checkArrayHai.push(kotsuArray[k]);
                            checkArrayHai.push(kotsuArray[k]);
                            checkArrayHai.push(kotsuArray[m]);
                            checkArrayHai.push(kotsuArray[m]);
                            checkArrayHai.push(kotsuArray[m]);
                            checkArrayHai.push(shuntsuArray[n]);
                            checkArrayHai.push(shuntsuArray[n]+1);
                            checkArrayHai.push(shuntsuArray[n]+2);

                            checkArrayHai.sort(function(a,b){ return a-b; });
                            if(agarihai.toString() == checkArrayHai.toString()){
                                tsumoAgariFlag = 1;
                                return tsumoAgariFlag;
                            }else{
                                checkArrayHai.length = 0;
                                checkArrayHai.push(jantouArray[i]);
                                checkArrayHai.push(jantouArray[i]);
                                agarikamoArray.push(jantouArray[i]);
                            }
                        }
                    }
                    
                    for(var m=0; m < shuntsuArray.length; m++){
                        for(var n=1; n < shuntsuArray.length; n++){
                            checkArrayHai.push(kotsuArray[j]);
                            checkArrayHai.push(kotsuArray[j]);
                            checkArrayHai.push(kotsuArray[j]);
                            checkArrayHai.push(kotsuArray[k]);
                            checkArrayHai.push(kotsuArray[k]);
                            checkArrayHai.push(kotsuArray[k]);
                            checkArrayHai.push(shuntsuArray[m]);
                            checkArrayHai.push(shuntsuArray[m]+1);
                            checkArrayHai.push(shuntsuArray[m]+2);
                            checkArrayHai.push(shuntsuArray[n]);
                            checkArrayHai.push(shuntsuArray[n]+1);
                            checkArrayHai.push(shuntsuArray[n]+2);

                            checkArrayHai.sort(function(a,b){ return a-b; });
                            if(agarihai.toString() == checkArrayHai.toString()){
                                tsumoAgariFlag = 1;
                                return tsumoAgariFlag;
                            }else{
                                checkArrayHai.length = 0;
                                checkArrayHai.push(jantouArray[i]);
                                checkArrayHai.push(jantouArray[i]);
                                agarikamoArray.push(jantouArray[i]);
                            }
                        }
                    }
                }

                for(var k=0; k < shuntsuArray.length; k++){
                    for(var m=1; m < shuntsuArray.length; m++){
                        for(var n=2; n < shuntsuArray.length; n++){
                            checkArrayHai.push(kotsuArray[j]);
                            checkArrayHai.push(kotsuArray[j]);
                            checkArrayHai.push(kotsuArray[j]);
                            checkArrayHai.push(shuntsuArray[k]);
                            checkArrayHai.push(shuntsuArray[k]+1);
                            checkArrayHai.push(shuntsuArray[k]+2);
                            checkArrayHai.push(shuntsuArray[m]);
                            checkArrayHai.push(shuntsuArray[m]+1);
                            checkArrayHai.push(shuntsuArray[m]+2);
                            checkArrayHai.push(shuntsuArray[n]);
                            checkArrayHai.push(shuntsuArray[n]+1);
                            checkArrayHai.push(shuntsuArray[n]+2);

                            checkArrayHai.sort(function(a,b){ return a-b; });
                            if(agarihai.toString() == checkArrayHai.toString()){
                                tsumoAgariFlag = 1;
                                return tsumoAgariFlag;
                            }else{
                                checkArrayHai.length = 0;
                                checkArrayHai.push(jantouArray[i]);
                                checkArrayHai.push(jantouArray[i]);
                                agarikamoArray.push(jantouArray[i]);
                            }
                        }
                    }
                }
            }

            for(var j=0; j < shuntsuArray.length; j++){
                for(var k=1; k < shuntsuArray.length; k++){
                    for(var m=2; m < shuntsuArray.length; m++){
                        for(var n=3; n < shuntsuArray.length; n++){
                            checkArrayHai.push(shuntsuArray[j]);
                            checkArrayHai.push(shuntsuArray[j]+1);
                            checkArrayHai.push(shuntsuArray[j]+2);
                            checkArrayHai.push(shuntsuArray[k]);
                            checkArrayHai.push(shuntsuArray[k]+1);
                            checkArrayHai.push(shuntsuArray[k]+2);
                            checkArrayHai.push(shuntsuArray[m]);
                            checkArrayHai.push(shuntsuArray[m]+1);
                            checkArrayHai.push(shuntsuArray[m]+2);
                            checkArrayHai.push(shuntsuArray[n]);
                            checkArrayHai.push(shuntsuArray[n]+1);
                            checkArrayHai.push(shuntsuArray[n]+2);

                            checkArrayHai.sort(function(a,b){ return a-b; });
                            if(agarihai.toString() == checkArrayHai.toString()){
                                tsumoAgariFlag = 1;
                                return tsumoAgariFlag;
                            }else{
                                checkArrayHai.length = 0;
                                checkArrayHai.push(jantouArray[i]);
                                checkArrayHai.push(jantouArray[i]);
                                agarikamoArray.push(jantouArray[i]);
                            }
                        }
                    }
                }
            }
        }
    }
    
    return tsumoAgariFlag;
}


//雀頭配列作成
//
//雀頭になり得る牌があれば「１牌のみ」を配列に格納（雀頭の２牌を格納する訳ではない）
//
function createJantouArray(array){
    var jantouArray = [];
    
    for(var i=1; i < array.length; i++){
        if(array[i-1] == array[i]){
            if(jantouArray.length == 0){
                    jantouArray.push(array[i]);
            }else{
                if(jantouArray[jantouArray.length-1] != array[i]){
                    jantouArray.push(array[i]);
                }
            }
        }
    }
    
    return jantouArray;
}


//刻子配列作成
//
//刻子になり得る牌があれば「１牌のみ」を配列に格納（刻子の３牌を格納する訳ではない）
//
function createKotsuArray(array){
    var kotsuArray = [];

    for(var i=2; i < array.length; i++){
        if(array[i-2] == array[i]){
            if(kotsuArray.length == 0){
                kotsuArray.push(array[i]);
            }else if(kotsuArray[kotsuArray.length - 1] != array[i]){
                kotsuArray.push(array[i]);
            }
        }
    }

    return kotsuArray;
}


//順子チェック
//
//順子になり得る牌があれば「先頭の１牌のみ」を配列に格納（４、５、６の順子であれば「４」を格納）
//
function createShuntsuArray(array){
    var shuntsuArray = [];
    
    
    for(var i=0; i < array.length; i++){
        var cntA = 0;
        var cntB = 0;
        
        if(array[i] > 10){
            for(var j=0; j < array.length; j++){
                if(array[i]+1 == array[j]){
                    cntA = cntA + 1;
                }else if(array[i]+2 == array[j]){
                    cntB = cntB + 1;
                }
            }
            
            if(i > 2 && array[i-3] == array[i]){
                if(cntA == 4 && cntB == 4) shuntsuArray.push(array[i]);
            }else if(i > 1 && array[i-2] == array[i]){
                if(cntA >= 3 && cntB >= 3) shuntsuArray.push(array[i]);
            }else if(i > 0 && array[i-1] == array[i]){
                if(cntA >= 2 && cntB >= 2) shuntsuArray.push(array[i]);
            }else{
                if(cntA >= 1 && cntB >= 1) shuntsuArray.push(array[i]);
            }
        }
    }

    return shuntsuArray;
}


//七対子チェック
function checkChitoi(){
    for(var i = 1; i < agariCheckHai.length; i++){
        if(i==1|i==3|i==5|i==7|i==9|i==11|i==13){
            if(agariCheckHai[i] != agariCheckHai[i-1]){
                break;
            }
        }else{
            if(agariCheckHai[i] == agariCheckHai[i-1]){
                break;
            }
        }
    }

    if(i==14) {
        tsumoAgariFlag = 1;
        agariyakuStr.push("七対子");
        yakuCount = yakuCount + 2;
    }
}


//国士無双十三面
function checkKokushi13men(){
    for(var i = 0; i < yaochu.length; i++){
        if(tehai[i] != yaochu[i]) break;
    }

    if(i==13) {
        for(var j = 0; j < yaochu.length; j++){
            if(tehai[13] == yaochu[j]){
                yakumanCount = 2;
                tsumoAgariFlag = 1;
                agariyakuStr.push("国士無双十三面");
            }
        }
        
    }
}


//国士無双
function checkKokushi(){
    var jantou = 0;
    
    for(var i=0; i < agariCheckHai.length; i++){
        if(jantou == 0){
            if(agariCheckHai[i] != yaochu[i]) jantou = agariCheckHai[i];
        }else{
            if(agariCheckHai[i] != yaochu[i-1]) break;
        }
    }

    for(var j=0; j < yaochu.length; j++){
        if(jantou == yaochu[j]) break;
    }

    if(i==14 && j!=13) {
        yakumanCount = 1;
        tsumoAgariFlag = 1;
        agariyakuStr.push("国士無双");
    }
}


//大三元
function checkDaisangen(){
    var kotsuArray = createKotsuArray(agariCheckHai);
    
    var haku, hatsu, chun;
    
    for(var i=0; i < kotsuArray.length; i++){
        if(kotsuArray[i] == 5) haku = 1;
        else if(kotsuArray[i] == 6) hatsu = 1;
        else if(kotsuArray[i] == 7) chun = 1;
    }

    for(var i=0; i < kanzumihai.length; i++){
        if(kanzumihai[i] == 5) haku = 1;
        else if(kanzumihai[i] == 6) hatsu = 1;
        else if(kanzumihai[i] == 7) chun = 1;
    }
    
    if( haku==1 && hatsu==1 && chun==1 ) {
        yakumanCount = yakumanCount + 1;
        tsumoAgariFlag = 1;
        agariyakuStr.push("大三元");
    }
}


//大四喜＆小四喜
function checkSushi(){
    var kotsuArray = createKotsuArray(agariCheckHai);
    var jantouArray = createJantouArray(agariCheckHai);
    var ton, nan, sha, pei;
    
    for(var i=0; i < kotsuArray.length; i++){
        if(kotsuArray[i] == 1) ton = 1;
        else if(kotsuArray[i] == 2) nan = 2;
        else if(kotsuArray[i] == 3) sha = 4;
        else if(kotsuArray[i] == 4) pei = 8;
    }

    for(var i=0; i < kanzumihai.length; i++){
        if(kotsuArray[i] == 1) ton = 1;
        else if(kotsuArray[i] == 2) nan = 2;
        else if(kotsuArray[i] == 3) sha = 4;
        else if(kotsuArray[i] == 4) pei = 8;
    }
    
    var sum = ton + nan + sha + pei;
    
    if(sum == 15) {
        yakumanCount = yakumanCount + 2;
        tsumoAgariFlag = 1;
        agariyakuStr.push("大四喜");
    }else if( (sum == 7 && jantouArray.indexOf(4) != -1)
             |(sum == 11 && jantouArray.indexOf(3) != -1)
             |(sum == 13 && jantouArray.indexOf(2) != -1)
             |(sum == 14 && jantouArray.indexOf(1) != -1)
            ){
        yakumanCount = yakumanCount + 1;
        tsumoAgariFlag = 1;
        agariyakuStr.push("小四喜");
    }
}


//四暗刻
function checkSuanko(){
    var kotsuArray = createKotsuArray(agariCheckHai);
    var shaboFlag = 0;
    
    if( (kotsuArray.length + kanzumihai.length) == 4) {
        for(var i=0; i < kotsuArray.length; i++){
            if(kotsuArray[i] == tehai[tehai.length - 1]) shaboFlag = 1;
        }

        for(var i=0; i < kanzumihai.length; i++){
            if(kanzumihai[i] == tehai[tehai.length - 1]) shaboFlag = 1;
        }
        
        
        if(shaboFlag == 1){
            yakumanCount = yakumanCount + 1;
            tsumoAgariFlag = 1;
            agariyakuStr.push("四暗刻");
        }else{
            yakumanCount = yakumanCount + 2;
            tsumoAgariFlag = 1;
            agariyakuStr.push("四暗刻単騎");
        }
    }
}


//清老頭
function checkChinroutou(){
    var notChinrouFlag = 0;
    
    for(var i=0; i < agariCheckHai.length; i++){
        if(routou.indexOf(agariCheckHai[i]) == -1) {
            notChinrouFlag = 1;
            break;
        }
    }

    for(var j=0; j < kanzumihai.length; j++){
        if(routou.indexOf(kanzumihai[j]) == -1) {
            notChinrouFlag = 1;
            break;
        }
    }

    if(notChinrouFlag == 0) {
        yakumanCount = yakumanCount + 1;
        tsumoAgariFlag = 1;
        agariyakuStr.push("清老頭");
    }
}


//字一色
function checkTsuiso(){
    var notTsuisoFlag = 0;
    
    for(var i=0; i < agariCheckHai.length; i++){
        if(jihai.indexOf(agariCheckHai[i]) == -1) {
            notTsuisoFlag = 1;
            break;
        }
    }

    for(var j=0; j < kanzumihai.length; j++){
        if(jihai.indexOf(kanzumihai[j]) == -1) {
            notTsuisoFlag = 1;
            break;
        }
    }

    if(notTsuisoFlag == 0) {
        yakumanCount = yakumanCount + 1;
        tsumoAgariFlag = 1;
        agariyakuStr.push("字一色");
    }
}


//緑一色
function checkRyuiso(){
    var notRyuisoFlag = 0;
    var ryuisoHai = [6,22,23,24,26,28];
    
    for(var i=0; i < agariCheckHai.length; i++){
        if(ryuisoHai.indexOf(agariCheckHai[i]) == -1) {
            notRyuisoFlag = 1;
            break;
        }
    }

    for(var j=0; j < kanzumihai.length; j++){
        if(ryuisoHai.indexOf(kanzumihai[j]) == -1) {
            notRyuisoFlag = 1;
            break;
        }
    }

    if(notRyuisoFlag == 0) {
        yakumanCount = yakumanCount + 1;
        tsumoAgariFlag = 1;
        agariyakuStr.push("緑一色");
    }
}


//四槓子
function checkSukantsu(){
    if(kanzumihai.length == 4) {
        yakumanCount = yakumanCount + 1;
        tsumoAgariFlag = 1;
        agariyakuStr.push("四槓子");
    }
}


//天和
function checkTenho(){
    if(sutehai.length == 0) {
        yakumanCount = yakumanCount + 1;
        tsumoAgariFlag = 1;
        agariyakuStr.push("天和");
    }
}


//九蓮宝燈
function checkChuren(){
    var Churen = [11,11,11,12,13,14,15,16,17,18,19,19,19];
    var ChurenA = [11,11,11,11,12,13,14,15,16,17,18,19,19,19];
    var ChurenB = [11,11,11,12,12,13,14,15,16,17,18,19,19,19];
    var ChurenC = [11,11,11,12,13,13,14,15,16,17,18,19,19,19];
    var ChurenD = [11,11,11,12,13,14,14,15,16,17,18,19,19,19];
    var ChurenE = [11,11,11,12,13,14,15,15,16,17,18,19,19,19];
    var ChurenF = [11,11,11,12,13,14,15,16,16,17,18,19,19,19];
    var ChurenG = [11,11,11,12,13,14,15,16,17,17,18,19,19,19];
    var ChurenH = [11,11,11,12,13,14,15,16,17,18,18,19,19,19];
    var ChurenI = [11,11,11,12,13,14,15,16,17,18,19,19,19,19];
    
    var tsumoNashiHai = [];
    var tsumoAriHai = [];
    
    for(var i=0; i < tehai.length - 1; i++){
        if(tehai[0] == 11){
            tsumoNashiHai.push(tehai[i]);
            tsumoAriHai.push(tehai[i]);
        }else if(tehai[0] == 21){
            tsumoNashiHai.push(tehai[i]-10);
            tsumoAriHai.push(tehai[i]-10);
        }else if(tehai[0] == 31){
            tsumoNashiHai.push(tehai[i]-20);
            tsumoAriHai.push(tehai[i]-20);
        }else{
            return;
        }
    }
    
    if(tehai[0] == 11) tsumoAriHai.push(tehai[tehai.length-1]);
    else if(tehai[0] == 21) tsumoAriHai.push(tehai[tehai.length-1]-10);
    else if(tehai[0] == 31) tsumoAriHai.push(tehai[tehai.length-1]-20);
    
    if(Churen.toString() == tsumoNashiHai.toString()){
        yakumanCount = yakumanCount + 2;
        tsumoAgariFlag = 1;
        agariyakuStr.push("純正九蓮宝燈");
    }else if( tsumoAriHai.toString() == ChurenA.toString()
             |tsumoAriHai.toString() == ChurenB.toString()
             |tsumoAriHai.toString() == ChurenC.toString()
             |tsumoAriHai.toString() == ChurenD.toString()
             |tsumoAriHai.toString() == ChurenE.toString()
             |tsumoAriHai.toString() == ChurenF.toString()
             |tsumoAriHai.toString() == ChurenG.toString()
             |tsumoAriHai.toString() == ChurenH.toString()
             |tsumoAriHai.toString() == ChurenI.toString()
            ){
        yakumanCount = yakumanCount + 1;
        tsumoAgariFlag = 1;
        agariyakuStr.push("九蓮宝燈");
    }
}

//清一色
function checkChinitsu(){
    var chinitsuCheckArray = [agariCheckHai[0], agariCheckHai[agariCheckHai.lenght-1] ];

    for(var i=0; i < kanzumihai.length; i++){
        chinitsuCheckArray.push(kanzumihai[i]);
    }

    for(var i=1; i < chinitsuCheckArray.length; i++){
        if(chinitsuCheckArray[0] >= 11 && chinitsuCheckArray[0] <= 19){
            if(chinitsuCheckArray[i] < 10 | chinitsuCheckArray[i] > 20) return;
        }else if(chinitsuCheckArray[0] >= 21 && chinitsuCheckArray[0] <= 29){
            if(chinitsuCheckArray[i] < 20 | chinitsuCheckArray[i] > 30) return;
        }else if(chinitsuCheckArray[0] >= 31 && chinitsuCheckArray[0] <= 39){
            if(chinitsuCheckArray[i] < 30) return;
        }else{
            return;
        }
    }

    agariyakuStr.push("清一色");
    yakuCount = yakuCount + 6;
}


//小三元
function checkShousangen(){
    var jantouArray = createJantouArray(agariCheckHai);
    var kotsuArray = createKotsuArray(agariCheckHai);
    
    var haku = 0;
    var hatsu = 0;
    var chun = 0;
    var sumAtama = 0;
    
    for(var i=0; i < kotsuArray.length; i++){
        if(kotsuArray[i] == 5) haku = 1;
        else if(kotsuArray[i] == 6) hatsu = 1;
        else if(kotsuArray[i] == 7) chun = 1;
    }

    for(var i=0; i < kanzumihai.length; i++){
        if(kanzumihai[i] == 5) {
            haku = 1;
            sumAtama = sumAtama + 1;
        }else if(kanzumihai[i] == 6) {
            hatsu = 1;
            sumAtama = sumAtama + 1;
        }else if(kanzumihai[i] == 7) {
            chun = 1;
            sumAtama = sumAtama + 1;
        }
    }
    
    for(var i=0; i < jantouArray.length; i++){
        if(jantouArray[i] == 5) sumAtama = sumAtama +1;
        else if(jantouArray[i] == 6) sumAtama = sumAtama +1;
        else if(jantouArray[i] == 7) sumAtama = sumAtama +1;
    }
    
    var sum = haku + hatsu + chun;
    
    if( sum==2 && sumAtama==3 ) {
        agariyakuStr.push("小三元");
        yakuCount = yakuCount + 2;
    }
}


//混老頭
function checkHonroutou(){

    for(var i=0; i < agariCheckHai.length; i++){
        if(yaochu.indexOf(agariCheckHai[i]) == -1){
            return;
        }
    }

    for(var i=0; i < kanzumihai.length; i++){
        if(yaochu.indexOf(kanzumihai[i]) == -1){
            return;
        }
    }

    agariyakuStr.push("混老頭");
    yakuCount = yakuCount + 2;
}


//純全帯公
function checkJunchan(){
    var jantouArray = createJantouArray(agariCheckHai);
    var kotsuArray = createKotsuArray(agariCheckHai);
    var shuntsuArray = createShuntsuArray(agariCheckHai);
    
    for(var i=0; i < agariCheckHai.length; i++){
        if(yaochu.indexOf(agariCheckHai[i]) == -1){
            return;
        }
    }

    for(var i=0; i < kanzumihai.length; i++){
        if(yaochu.indexOf(kanzumihai[i]) == -1){
            return;
        }
    }    
    
}
