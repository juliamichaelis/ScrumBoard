var remote = require("electron").remote
var electron = require("electron");

function init(){
    var ipcrenderer = electron.ipcRenderer;
    ipcrenderer.on('saveend', (event,args) => {
        console.log("saveend");
        var window = remote.getCurrentWindow();
        window.close();
        window = null;    
    })
}

function cancel(){
    var window = remote.getCurrentWindow(); 
    window.close();
    window = null;
}

function save(){
    var parent = remote.getCurrentWindow().getParentWindow();
    var ipcrenderer = electron.ipcRenderer;
    ipcrenderer.sendTo(parent.webContents.id, "save", [remote.getCurrentWindow().webContents.id]);
}
