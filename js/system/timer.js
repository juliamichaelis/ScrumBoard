var fs = require("fs");
var project = require("./project.js");

var saveTimer = undefined;

function automaticSave(){
    console.log("automaticSave");
    var currentProject = project.Project.getInstance();
    var filename = currentProject.getFilename();
    if(fs.existsSync(filename)){
        console.log("real save");
        const content = currentProject.getBoard().backup();
        fs.writeFileSync(filename,content, 'utf-8');
        currentProject.setDirty(false);
    }
}

function enableSaveTimer(){
    if(saveTimer == undefined){
        saveTimer = setInterval(automaticSave,60*1000);
    }
}

function disableSaveTimer(){
    if(saveTimer != undefined){
        clearInterval(saveTimer);
        saveTimer = undefined;
    }
}

module.exports.enableSaveTimer=enableSaveTimer;
module.exports.disableSaveTimer=disableSaveTimer;