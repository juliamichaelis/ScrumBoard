var remote = require("electron").remote
var electron = require("electron");

function init(){
    var win = remote.getCurrentWindow();
    var ipcrenderer = electron.ipcRenderer;
    ipcrenderer.on('error', (event,args) => {
        document.getElementById("error-txt").innerHTML= args[0];
    })
}

function closeInfo(){
    var window = remote.getCurrentWindow(); 
    window.close();
    window = null;
}