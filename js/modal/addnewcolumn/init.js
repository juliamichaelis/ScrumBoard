var remote = require("electron").remote;
var electron = require("electron");

function init(){
}

function cancel(){
    var window = remote.getCurrentWindow(); 
<<<<<<< HEAD
    alert("window" + window)
=======
>>>>>>> 05a04a12c3f5caae3cfceebd337d45b28d916761
    window.close();
    window = null;
}

function save(){
    var parent = remote.getCurrentWindow().getParentWindow();
    var name = document.getElementById("columnname").value;
    var ipcrenderer = electron.ipcRenderer;
    ipcrenderer.sendTo(parent.webContents.id, "addcolumn", [name]);
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