var displayPanel;

// グローバルで使用する変数の宣言などをここに追加

window.onload = appInit;

function appInit(){

    displayPanel = document.getElementById("displayPanel");

    tick();
}

function tick(){
    var date = new Date();
    displayPanel.textContent = date.toLocaleTimeString();
    
    setTimeout(tick, 1000 - date.getMilliseconds());
}