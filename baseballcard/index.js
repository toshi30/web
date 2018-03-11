Tesseract.recognize("./475286714.2.jpg",{lang:"jpn"}).then(function(result){
    const a = document.querySelector("#test");
    a.innerHTML = result.html;
})
Tesseract.recognize("./7eae256d0bccaadc3e1f9329808c4c6f.jpg",{lang:"jpn"}).then(function(result){
    const a = document.querySelector("#test2");
    a.innerHTML = result.html;
})