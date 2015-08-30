var displayPanel, controlPanel, textBox;

window.onload = appInit;

function appInit(){

  displayPanel = document.getElementById("displayPanel");
  controlPanel = document.getElementById("controlPanel");
  textBox = document.getElementById("textBox");

  var applyButton = document.getElementById("applyButton");
  var clearButton = document.getElementById("clearButton");

  applyButton.addEventListener("click", applyButtonClick, false);
  clearButton.addEventListener("click", clearText, false);

  window.onresize = setPosition;
  
  document.body.onclick = switchPanel;
  controlPanel.onclick = function(event){event.cancelBubble = true;};
  
  loadText();
}


function applyButtonClick(event){
  var text = textBox.value;
  setText(text);
  saveText(text);
}


function clearText(event){
  displayPanel.textContent = "";
  textBox.value = "";
}

function setPosition(){
  var bodyHeight = document.body.clientHeight;
  var divHeight = displayPanel.clientHeight;
  displayPanel.style.top = (bodyHeight - divHeight) / 2 + "px";
}

function switchPanel(event){
    if(controlPanel.style.visibility == "hidden")
        controlPanel.style.visibility = "visible";
    else
        controlPanel.style.visibility = "hidden";
}

function saveText(text){
    var storage = localStorage;
    if(typeof storage == "undefined") return;
    storage.setItem("text", text);
}

function setText(text){
  displayPanel.textContent = text;
  
  if(text.length < 6) displayPanel.style.fontsize = "72px";
  else if(text.length < 11) displayPanel.style.fontsize = "48px";
  else displayPanel.style.fontsize = "36px";
  setPosition();
  switchPanel();
}

function loadText(){
  var storage = localStorage;
  if(typeof storage == "undefined") return;

  var text = storage.getItem("text");
  if(text) setText(text);
}