var displayPanel, textBox;

window.onload = appInit;

function appInit(){

  displayPanel = document.getElementById("displayPanel");
  textBox = document.getElementById("textBox");

}


function apply(){
  var text = textBox.value;
  displayPanel.textContent = text;
}


function clearApply(){
  displayPanel.textContent = "";
  textBox.value = "";
}
