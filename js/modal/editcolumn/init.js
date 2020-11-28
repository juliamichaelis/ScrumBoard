var remote = require("electron").remote
var electron = require("electron");
var modelId;

function init(){
    var win = remote.getCurrentWindow();
    var ipcrenderer = electron.ipcRenderer;
    ipcrenderer.on('setname', (event,args) => {
        document.getElementById("columnname").value= args[0];
        modelId = args[1];
        console.log(modelId);
    })
}

function cancel(){
    var window = remote.getCurrentWindow(); 
    window.close();
    window = null;
}

function save(){
    var parent = remote.getCurrentWindow().getParentWindow();
    var name = document.getElementById("columnname").value;
    var ipcrenderer = electron.ipcRenderer;
    ipcrenderer.sendTo(parent.webContents.id, "setcolumnname", [name,modelId]);
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