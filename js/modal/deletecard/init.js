var remote = require("electron").remote
var electron = require("electron");

var modelId;
var columnId;

function init(){
    var ipcrenderer = electron.ipcRenderer;
    var win = remote.getCurrentWindow();
    var ipcrenderer = electron.ipcRenderer;
    ipcrenderer.on('deletecard', (event,args) => {
        
        modelId = args[0];
        columnId = args[1];
        console.log(modelId);
    })
}

function cancel(){
    var window = remote.getCurrentWindow(); 
    window.close();
    window = null;
}

function deleteCard(){
    var ipcrenderer = electron.ipcRenderer;
    var parent = remote.getCurrentWindow().getParentWindow();
    ipcrenderer.sendTo(parent.webContents.id, "deletecard", [modelId, columnId]);
    var window = remote.getCurrentWindow();
    window.close();
    window = null;
}

function enter(){
    console.log(event);
    console.log("enter");
    if(event.keyCode==13){
        save();
    }
}