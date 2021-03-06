﻿//*****デバッグ用 配牌*****
//var dummy = [1,2,3,4,5,6,7,11,19,21,29,31,39,1];
//*************************



var bodyWidth, bodyHeight;

var hai = [];       //残り牌
var tehai = [];     //手牌
var sutehai = [];   //捨て牌
var dora = [];      //ドラ牌（オモテ）
var uradora = [];   //ドラ牌（ウラ）

var tsumoOkFlag = 0;

var kanzai;
var kanzumihai = [];

var tsumoAgariFlag = 0;
var agariCheckHai = [];
var agariyakuStr = [];
var agarizumiHai = [];

var yakumanCount = 0;
var yakuCount = 0;

var jihai = [1,2,3,4,5,6,7];
var routou = [11,19,21,29,31,39];
var yaochu = [1,2,3,4,5,6,7,11,19,21,29,31,39];


//初期処理
$(function(){
    //画面サイズ取得
    bodyWidth = $(window).width();
    bodyHeight = $(window).height() - 30;

    //残り牌を初期化
    for(var i = 0; i < 40; i++){
        hai[i] = 4;

        switch (i){
            case 0:
                hai[i] = 0;
                break;
            case 8:
                hai[i] = 0;
                break;
            case 9:
                hai[i] = 0;
                break;
            case 10:
                hai[i] = 0;
                break;
            case 20:
                hai[i] = 0;
                break;
            case 30:
                hai[i] = 0;
                break;
        }
    };

    //王牌
    dora = [99,99,99,99,99,99,99];
    uradora = [99,99,99,99,99,99,99];
    dora[2] = selectHai();
    setWanpai();

    //配牌
 
    for(var i = 0; i < 13; i++){
        tehai[i] = selectHai();
    };

    //*****デバッグ用 配牌*****
    //tehai.length = 0;
    //for(var i = 0; i < 13; i++){
    //tehai.push(dummy[i])
    //}
    //*************************

    setTehai();

    //第一自摸
    setTsumo();

    //打牌後、画面クリックで自摸
    document.body.onclick = tsumo;
    document.getElementById("nakiButtonArea").onclick=function(event){event.cancelBubble = true;};
    document.getElementById("tehaiArea").onclick=function(event){event.cancelBubble = true;};
});


//画面クリック時の自摸処理
function tsumo(){
    if(tsumoOkFlag == 1){
        setTsumo();
        tsumoOkFlag = 0;
    }
}


//残り牌から牌を選択する処理
function selectHai(){
    //残り牌数(sum)を計算
    var sum = 0;
    for(var i=0; i < hai.length; i++){
        sum = sum + hai[i];
    }

    //残り牌からランダムに牌を取得
    var random = 1 + Math.floor( Math.random() * (sum - 1) );
    var num = 0;

    for(var j = 0; j < hai.length; j++){
        num = num + hai[j];
        if(random <= num) break;
    }

    hai[j] = hai[j] - 1;

    //残り牌を返却
    return j;
}


//打牌処理
function dahai(event){

    event.preventDefault();
    
    //捨て牌候補をすべて取得
    var img = document.getElementById("tehaiArea").getElementsByTagName("img");
    
    //選択済みではない場合は牌選択を修正
    //if(event.target.className.indexOf("selected") == -1){
    //    for(var i = 0; i < img.length; i++){
    //        img[i].className = "hai";
    //    };
    //
    //    event.target.className = event.target.className + " selected";
    //    
    //}else if(tsumoOkFlag == 0){
    if (tsumoOkFlag == 0){
        //選択した打牌を捨て牌に配置
        if(event.target.id == "tsumo") {
            var num = tehai.length - 1;
        }else{
            var num = Number(event.target.id.substr(5));
        }
        
        sutehai.push(tehai[num]);
        setSutehai(tehai[num]);

        //打牌を手牌から削除
        tehai.splice(num,1);

        setTehai();

        //牌を捨てた後はカンボタンを非表示に
        var kanButton = document.getElementById("kanButton");
        kanButton.style.visibility = "hidden";

        //牌を捨てた後はツモボタンを非表示に
        tsumoAgariFlag = 0;
        var tsumoButton = document.getElementById("tsumoButton");
        tsumoButton.style.visibility = "hidden";

        tsumoOkFlag = 1;
    }
}


//王牌をセット
function setWanpai(){
    //王牌削除
    $("#wanpaiUeArea").empty();
    $("#wanpaiShitaArea").empty();    

    //上山の数調整
    if(kanzumihai.length == 2) dora[7] = 99;
    else if(kanzumihai.length == 4) dora[8] = 99;

    //上山配置
    for(var k = 0; k < (dora.length); k++){
        var img = createHaiImg("dora" + k , dora[k]);
        $(img).attr("class" , "hai");

        if(kanzumihai.length == 1 | kanzumihai.length == 2){
            if(k == 0){
                continue;
            }else if(k == 1){
                $(img).css("margin-left" , (bodyWidth / 18) + "px");
            }
        }else if(kanzumihai.length == 3 | kanzumihai.length == 4){
            if(k == 0 | k == 1){
                continue;
            }else if(k == 2){
                $(img).css("margin-left" , (bodyWidth / 9) + "px");
            }
        }

        $("#wanpaiUeArea").append(img);
    }

    //下山の数調整
    if(kanzumihai.length == 1) uradora[7] = 99;
    else if(kanzumihai.length == 3) uradora[8] = 99;

    //王牌 下山配置
    for(var k = 0; k < uradora.length; k++){
        var img = createHaiImg("uradora" + k , 99);
        $(img).attr("class" , "hai");

        if(kanzumihai.length == 2 | kanzumihai.length == 3){
            if(k == 0){
                continue;
            }else if(k == 1){
                $(img).css("margin-left" , (bodyWidth / 18) + "px");
            }
        }else if(kanzumihai.length == 4){
            if(k == 0 | k == 1){
                continue;
            }else if(k == 2){
                $(img).css("margin-left" , (bodyWidth / 9) + "px");                
            }
        }
        
        $("#wanpaiShitaArea").append(img);
    }
}


//手牌をセット
function setTehai(){
    //理牌
    tehai.sort(function(a,b){ return a-b; });

    //手牌削除
    $("#tehaiArea").empty();

    //牌表示
    for(var j = 0; j < tehai.length; j++){
        var img = createHaiImg("tehai" + j , tehai[j]);
        
        $(img).attr("class" , "hai");
        $(img).on("click", dahai);

        $("#tehaiArea").append(img);
    }
}


//自模牌をセット
function setTsumo(){
    //自摸牌を取得
    var tsumohai = selectHai();

//********************
//    var tsumohai = dummy[13];
//********************

    tehai.push(tsumohai);

    //自摸牌表示
    var img = createHaiImg("tsumo" , tsumohai);
        
    $(img).attr("class" , "hai");
    $(img).css("margin-left" , (bodyWidth / 100) + "px");
    $(img).on("click", dahai);

    $("#tehaiArea").append(img);

    //打牌候補の手牌の処理
    $("#tehaiArea .hai").hover(function (){
        //マウスオーバー時
        $(this).stop().animate({marginTop:"-10px"},50);
    },function(){
        //マウスアウト時
        $(this).stop().animate({marginTop:"-0px"},50);
    });

    //九種九牌チェック
    if(sutehai.length == 0){
        if(check9shu9hai() == 1) $("#kyushukyuhaiButton").css("visibility" , "visible");
        else $("#kyushukyuhaiButton").css("visibility" , "hidden");
    }

    //カン鳴きチェック
    if(checkKan() == 1) $("#kanButton").css("visibility" , "visible");
    else $("#kanButton").css("visibility" , "hidden");

    //自摸和了チェック
    if(checkTsumoAgari() == 1) $("#tsumoButton").css("visibility" , "visible");
    else $("#tsumoButton").css("visibility" , "hidden");
}


//捨て牌をセット
function setSutehai(hai){
    var img = createHaiImg("sutehai" + (sutehai.length - 1) , hai);
    $(img).attr("class" , "hai");

    $("#sutehaiArea").append(img);
}


//カン牌さらし処理
function setKan(kanhai){
    var nakihaiArea = document.getElementById("nakihaiArea");
    
    for(var i = 0; i < 4; i++){
        var img = document.createElement("img");
        img.setAttribute("id", "kan" + kanhai + "_" + i);
        
        if(i==1|i==2) showImg(img,kanhai);
        else showImg(img,99);
        
        img.className = "nakihai";
        nakihaiArea.appendChild(img);
    }
}


function createHaiImg(idName , hainum){
    var imgSrc;

    switch (hainum){
        case 1:
            imgSrc = "./images/ton.png";
            break;
        case 2:
            imgSrc = "./images/nan.png";
            break;
        case 3:
            imgSrc = "./images/sha.png";
            break;
        case 4:
            imgSrc = "./images/pei.png";
            break;
        case 5:
            imgSrc = "./images/haku.png";
            break;
        case 6:
            imgSrc = "./images/hatsu.png";
            break;
        case 7:
            imgSrc = "./images/tyun.png";
            break;
        case 11:
            imgSrc = "./images/1man.png";
            break;
        case 12:
            imgSrc = "./images/2man.png";
            break;
        case 13:
            imgSrc = "./images/3man.png";
            break;
        case 14:
            imgSrc = "./images/4man.png";
            break;
        case 15:
            imgSrc = "./images/5man.png";
            break;
        case 16:
            imgSrc = "./images/6man.png";
            break;
        case 17:
            imgSrc = "./images/7man.png";
            break;
        case 18:
            imgSrc = "./images/8man.png";
            break;
        case 19:
            imgSrc = "./images/9man.png";
            break;
        case 21:
            imgSrc = "./images/1sou.png";
            break;
        case 22:
            imgSrc = "./images/2sou.png";
            break;
        case 23:
            imgSrc = "./images/3sou.png";
            break;
        case 24:
            imgSrc = "./images/4sou.png";
            break;
        case 25:
            imgSrc = "./images/5sou.png";
            break;
        case 26:
            imgSrc = "./images/6sou.png";
            break;
        case 27:
            imgSrc = "./images/7sou.png";
            break;
        case 28:
            imgSrc = "./images/8sou.png";
            break;
        case 29:
            imgSrc = "./images/9sou.png";
            break;
        case 31:
            imgSrc = "./images/1pin.png";
            break;
        case 32:
            imgSrc = "./images/2pin.png";
            break;
        case 33:
            imgSrc = "./images/3pin.png";
            break;
        case 34:
            imgSrc = "./images/4pin.png";
            break;
        case 35:
            imgSrc = "./images/5pin.png";
            break;
        case 36:
            imgSrc = "./images/6pin.png";
            break;
        case 37:
            imgSrc = "./images/7pin.png";
            break;
        case 38:
            imgSrc = "./images/8pin.png";
            break;
        case 39:
            imgSrc = "./images/9pin.png";
            break;
        case 99:
            imgSrc = "./images/fusehai.png";
            break;
    }

    var img = $("<img>").attr({
        "id": idName,
        "width": bodyWidth / 18,
        "height": bodyHeight / 6.67,
        "src": imgSrc 
    });

    return img;
    
}


//牌の画像情報を作成
function showImg(img,hainum){
    img.setAttribute("width", bodyWidth / 18);
    img.setAttribute("height", bodyHeight / 6.67);

    switch (hainum){
        case 1:
            img.setAttribute("src", "./images/ton.png");
            break;
        case 2:
            img.setAttribute("src", "./images/nan.png");
            break;
        case 3:
            img.setAttribute("src", "./images/sha.png");
            break;
        case 4:
            img.setAttribute("src", "./images/pei.png");
            break;
        case 5:
            img.setAttribute("src", "./images/haku.png");
            break;
        case 6:
            img.setAttribute("src", "./images/hatsu.png");
            break;
        case 7:
            img.setAttribute("src", "./images/tyun.png");
            break;
        case 11:
            img.setAttribute("src", "./images/1man.png");
            break;
        case 12:
            img.setAttribute("src", "./images/2man.png");
            break;
        case 13:
            img.setAttribute("src", "./images/3man.png");
            break;
        case 14:
            img.setAttribute("src", "./images/4man.png");
            break;
        case 15:
            img.setAttribute("src", "./images/5man.png");
            break;
        case 16:
            img.setAttribute("src", "./images/6man.png");
            break;
        case 17:
            img.setAttribute("src", "./images/7man.png");
            break;
        case 18:
            img.setAttribute("src", "./images/8man.png");
            break;
        case 19:
            img.setAttribute("src", "./images/9man.png");
            break;
        case 21:
            img.setAttribute("src", "./images/1sou.png");
            break;
        case 22:
            img.setAttribute("src", "./images/2sou.png");
            break;
        case 23:
            img.setAttribute("src", "./images/3sou.png");
            break;
        case 24:
            img.setAttribute("src", "./images/4sou.png");
            break;
        case 25:
            img.setAttribute("src", "./images/5sou.png");
            break;
        case 26:
            img.setAttribute("src", "./images/6sou.png");
            break;
        case 27:
            img.setAttribute("src", "./images/7sou.png");
            break;
        case 28:
            img.setAttribute("src", "./images/8sou.png");
            break;
        case 29:
            img.setAttribute("src", "./images/9sou.png");
            break;
        case 31:
            img.setAttribute("src", "./images/1pin.png");
            break;
        case 32:
            img.setAttribute("src", "./images/2pin.png");
            break;
        case 33:
            img.setAttribute("src", "./images/3pin.png");
            break;
        case 34:
            img.setAttribute("src", "./images/4pin.png");
            break;
        case 35:
            img.setAttribute("src", "./images/5pin.png");
            break;
        case 36:
            img.setAttribute("src", "./images/6pin.png");
            break;
        case 37:
            img.setAttribute("src", "./images/7pin.png");
            break;
        case 38:
            img.setAttribute("src", "./images/8pin.png");
            break;
        case 39:
            img.setAttribute("src", "./images/9pin.png");
            break;
        case 99:
            img.setAttribute("src", "./images/fusehai.png");
            break;
    }
}


//カンをチェック
function checkKan(){
    //初期化
    kanzai = [];
    var kanFlag = 0;
    
    //カンチェック用に理牌
    var checkKanTehai = [];
    for(var i=0; i < tehai.length; i++){
        checkKanTehai[i] = tehai[i];
    }
    checkKanTehai.sort(function(a,b){ return a-b; });

    //カン材をチェック
    var kanNum = 1;
    
    for(var i=1; i < checkKanTehai.length; i++){
        if(checkKanTehai[i-1] == checkKanTehai[i]) kanNum = kanNum +1;
        else kanNum = 1;

        if(kanNum == 4) {
            kanFlag = 1;
            kanzai.push(checkKanTehai[i]);
        }
    }
    
    return kanFlag;
}


//カン処理
function kan(kanhai){
    //カンボタンを非表示
    var kanButton = document.getElementById("kanButton");
    kanButton.style.visibility = "hidden";

    //カン牌をさらす
    setKan(kanhai);

    //カン牌を削除し手牌を表示
    for(var i = tehai.length - 1; i >= 0; i--){
        if(tehai[i] == kanhai){
            tehai.splice(i,1);
        }
    }
    
    kanzumihai.push(kanhai);
    setTehai();

    //新ドラ表示
    for(var i = 3; 0 < dora.length; i++){
        if(dora[i] == 99){
            dora[i] = selectHai();
            break;
        }
    }
    
    setWanpai();

    //ツモ可能に
    tsumoOkFlag = 1;
}


//カン可能牌を表示
function showKanhai(){
    //カンボタンを非表示
    var kanButton = document.getElementById("kanButton");
    kanButton.style.visibility = "hidden";

    //カン可能牌を表示
    for(var i=0; i < kanzai.length; i++){
        for(var j=0; j < tehai.length; j++){
            if(j == (tehai.length - 1)){
                var tehaiImg = document.getElementById("tsumo");
            }else{
                var tehaiImg = document.getElementById("tehai" + j);
            }
            
            tehaiImg.removeEventListener("click", dahai, false);
            
            if(kanzai[i] == tehai[j]){
                tehaiImg.className = tehaiImg.className + " kan";
                tehaiImg.addEventListener("click", selectKan, false);
            }
        }
    }
}

//カン可能牌からカンを選択
function selectKan(event){
    event.preventDefault();

    if(event.target.id == "tsumo") {
        var num = tehai.length - 1;
    }else{
        var num = Number(event.target.id.substr(5));
    }
    
    kan(tehai[num]);
}


function checkTsumoAgari(){
    //手牌を計算用に理牌
    for(var i = 0; i < tehai.length; i++){
        agariCheckHai[i] = tehai[i];
    }
    
    agariCheckHai.sort(function(a,b){ return a-b; });

    //和了チェック
    checkChitoi();
    if(tsumoAgariFlag == 0) checkKokushi13men();
    if(tsumoAgariFlag == 0) checkKokushi();
    if(tsumoAgariFlag == 0) checkAgari();

    if(tsumoAgariFlag == 1){
        checkDaisangen();
        checkSushi();
        checkChinroutou();
        checkTsuiso();
        checkRyuiso();
        checkSukantsu();
        //************
        //checkSuanko();
        //checkTenho();
        //************
        checkChuren();
        
        if(yakumanCount == 0){
            checkChinitsu();
            checkShousangen();
            checkHonroutou();
            checkJunchan();
        }
    }

    return tsumoAgariFlag;
}


//カンボタンを押下時の処理
function nakiKan(){
    if(kanzai.length == 1){
        kan(kanzai[0]);
    }else{
        showKanhai();
    }
}


//ツモボタンを押下時の処理
function nakiTsumo(){
    if(yakumanCount == 0){
        alert(agariyakuStr + " " + yakuCount + "翻");
    }else{
        alert(agariyakuStr + " " + yakumanCount + "役満");
    }
}


//流すボタンを押下時の処理
function nakiKyushu(){
    alert("九種九牌");
    location.reload();
}


//九種九牌チェック
function check9shu9hai(){
    var flag = 0;
    var count = 0;
    
    for(var i=0; i < yaochu.length; i++){
        for(var j=0; j < tehai.length; j++){
            if(yaochu[i] == tehai[j]){
                count = count + 1;
                break;
            }
        }
    }
    
    if(count >= 9) flag = 1;
    
    return flag;
}