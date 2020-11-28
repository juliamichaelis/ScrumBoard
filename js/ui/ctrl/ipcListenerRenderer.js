const electron = require("electron").remote;
const fs = electron.require("fs");
const ipc = require('electron').ipcRenderer;
var project = require('../../system/project.js');
var columnBuilder = require('../builder/column.js');
var cardBuilder = require("../builder/card.js");
var remote = require("electron").remote;
var cardsModels = require("../model/card.js");


ipc.on("load", (event,args) =>{
    if(fs.existsSync(args)){
        var backup = fs.readFileSync(args,'utf-8');
        var currentProject = project.Project.getInstance();
        var board = currentProject.getBoard();
        board.restore(backup);
        currentProject.setFilename(args);
        currentProject.setDirty(false);
        electron.getCurrentWindow().setTitle('MI-SCRUM '+args);
    }
});

ipc.on("setcolumnname",(event,args) => {
    var newName = args[0];
    var modelId = args[1];
    var currentProject = project.Project.getInstance();
    var board = currentProject.getBoard();
    var element = board.findFromRoot(modelId);
    element.name = newName;
    currentProject.setDirty(true);
    element.notify();
    currentProject.getCaretaker().add(currentProject.getBoard().backup());
})

ipc.on("addcolumn",(event,args) => {
    var inputText = args[0];
    var currentProject = project.Project.getInstance();
    var currentBoard = currentProject.getBoard();
    currentProject.getCaretaker().add(currentProject.getBoard().backup());
    currentProject.setDirty(true);
    var column = new columnBuilder.ColumnBuilder(inputText);
    currentBoard.add(column.model);
    currentBoard.notify();    
})

ipc.on("deletecolumn", (event,args) => {
    var columnId = args[0];
    var currentProject = project.Project.getInstance();
    currentProject.getCaretaker().add(currentProject.getBoard().backup());
    var eventDis = eventDispatcher.EventDispatcher.getInstance();
    var board = currentProject.getBoard();
    var element = board.findFromRoot(columnId);
    var parent = element.parent;
    parent.remove(columnId);
    eventDis.removeEventHandler(columnId);
    currentProject.setDirty(true);  
    parent.notify();
})

ipc.on("deletecard", (event,args) => {
    var columnId = args[1];
    var cardId = args[0];
    console.log("columnId " + columnId);
    console.log("cardId " + cardId);
    var currentProject = project.Project.getInstance();
    currentProject.getCaretaker().add(currentProject.getBoard().backup());
    var eventDis = eventDispatcher.EventDispatcher.getInstance();
    var board = currentProject.getBoard();
    var card = board.findFromRoot(cardId);
    var parent = card.parent;
    parent.remove(cardId);
    eventDis.removeEventHandler(cardId);
    currentProject.setDirty(true);  
    parent.notify();      
})

ipc.on("editcard", (event, args) => {
   
    var modelId = args[1];
    var abstract = args[0];
    var currentProject = project.Project.getInstance();
    var board = currentProject.getBoard();
    var model = board.findFromRoot(modelId);
    model.text = abstract;
    var comments = args[2];
    model.children = [];
    comments.forEach(function(element){
        var cardCommentModel = new cardsModels.CardComment();
        cardCommentModel.commentText = element;
        model.add(cardCommentModel);
    })
    currentProject.setDirty(true);
    model.notify();
    currentProject.getCaretaker().add(currentProject.getBoard().backup());
})

ipc.on("newcard", (event,args) => {
    var columnId = args[1];
    console.log(columnId);
    var abstract = args[0];
    var comments = args[2];

    var currentProject = project.Project.getInstance();
    var column = currentProject.getBoard().findFromRoot(columnId);

    currentProject.getCaretaker().add(currentProject.getBoard().backup());
    var card = new cardBuilder.CardBuilder(undefined,abstract);
    comments.forEach(function(element){
        var cardCommentModel = new cardsModels.CardComment();
        cardCommentModel.commentText = element;
        card.model.add(cardCommentModel);
    })

    column.addToFront(card.model);
    currentProject.setDirty(true);
    column.notify();
})

ipc.on("save", (event, args) => {
    var senderId = args[0];
    timer.disableSaveTimer();
        var currentProject = project.Project.getInstance();
        var filename = currentProject.getFilename();
        console.log("filename:" + filename);
        if(filename == "undefined"){
            filename = remote.app.getPath('home');
        }
        
        const options = {
            filters: [{name:"MI-SCRUM", extension: ['mis']}],
            buttonLabel: "Speichern",
            defaultPath: filename
        }

        const savePath = remote.dialog.showSaveDialog(remote.getCurrentWindow(),options);
        const content = currentProject.getBoard().backup();
        if(savePath != '' && savePath != undefined){
            try{
              fs.writeFileSync(savePath,content, 'utf-8');
              remote.getCurrentWindow().setTitle('MI-SCRUM '+savePath);
              if(!savePath.endsWith(".mis"))
                savePath = savePath + ".mis";
                currentProject.setFilename(savePath);
                currentProject.setDirty(false);

                var homepath = remote.app.getPath("home");
                var confDir = homepath + "/" + ".mi-scrum";
                var confFile = confDir + "/" + "config.json";
                var configString = fs.readFileSync(confFile);
                var configure = JSON.parse(configString);
                configure.lastFile = savePath;
  
                var configString = JSON.stringify(configure);
                fs.writeFileSync(confFile,configString);
  
            }catch(e){
                
                var parent = remote.getCurrentWindow();
                let win = new remote.BrowserWindow({
                    parent: remote.getCurrentWindow(),
                    modal:true,
                    darkTheme: true,
                    titleBarStyle: "customButtonsOnHover",
                    show: false,
                    webPreferences: {
                        nodeIntegration: true
                    },
                })
                win.setMenuBarVisibility(false);
                win.on('ready-to-show', () => {
                    electron.ipcRenderer.sendTo(win.webContents.id, "error",["<center>Das Speichern ist nicht möglich.</center><br/> " + e]);
                    win.show();        
                })
                win.loadFile('./html/modal/error.html');
                win.setTitle("Ausnahme");
            }
        }
        ipc.sendTo(senderId,"saveend");
        timer.enableSaveTimer();
})

ipc.on("closeWindow", (event,args) => {
    var currentProject = project.Project.getInstance();
    if(currentProject.isDirty()){
    console.log("closeWindow");
        var parent = remote.getCurrentWindow();
        let win = new remote.BrowserWindow({
            parent: remote.getCurrentWindow(),
            modal:true,
            darkTheme: true,
            titleBarStyle: "customButtonsOnHover",
            show: false,
            webPreferences: {
                nodeIntegration: true
            },
        })
        win.setMenuBarVisibility(false);
        win.on('closed', (e,args) => {
            remote.getCurrentWindow().destroy();
        })

        win.on('ready-to-show', () => {
            win.show();        
        })
        win.loadFile('./html/modal/savechange.html');
        win.setTitle("Änderung speichern ?");
    }
    else{
        remote.getCurrentWindow().destroy();
    }
})
