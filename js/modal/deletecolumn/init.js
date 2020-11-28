var remote = require("electron").remote
var electron = require("electron");

var modelId;

function init(){
    var ipcrenderer = electron.ipcRenderer;
    var win = remote.getCurrentWindow();
    var ipcrenderer = electron.ipcRenderer;
    ipcrenderer.on('deletecolumn', (event,args) => {
        console.log("get");
        modelId = args[0];
        console.log(modelId);
    })
}

function cancel(){
    var window = remote.getCurrentWindow(); 
    window.close();
    window = null;
}

function deleteColumn(){
    var ipcrenderer = electron.ipcRenderer;
    var parent = remote.getCurrentWindow().getParentWindow();
    ipcrenderer.sendTo(parent.webContents.id, "deletecolumn", [modelId]);
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