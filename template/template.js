var displayPanel;

// グローバルで使用する変数の宣言などをここに追加

window.onload = appInit;

function appInit(){
    displayPanel = document.getElementById("displayPanel");
    displayPanel.textContent = "テンプレート動作テスト";
}