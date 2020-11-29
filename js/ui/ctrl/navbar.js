var listener = require('../ctrl/listener.js');
var project = require('../../system/project.js');
var timer = require("../../system/timer.js");

var remote = require("electron").remote;
const fs = remote.require("fs");
const electron = require("electron");

function load(e){
    var currentProject = project.Project.getInstance();
    var board = currentProject.getBoard();
    var oldContent = board.backup();
    var oldFilename = currentProject.filename;
    const options = {
        filters: [{name:'MI-Scrum' , extensions: ['mis']}],
        buttonLabel: 'Laden',
        properties: ['openFile']
    }
<<<<<<< HEAD
    try {
        var fileNames = remote.dialog.showOpenDialogSync(remote.getCurrentWindow(),options)
               
                if(fileNames === undefined){
                    return;
                }
                else {
                    var backup = fs.readFileSync(fileNames.filePaths[0],'utf-8');
                    var currentProject = project.Project.getInstance();
            
                var board = currentProject.getBoard();
                board.restore(backup);
                currentProject.setFilename(fileNames[0]);
                currentProject.setDirty(false);
                remote.getCurrentWindow().setTitle('MI-SCRUM ' + fileNames[0]);
            

                var homepath = remote.app.getPath("home");
                var confDir = homepath + "/" + ".mi-scrum";
                var confFile = confDir + "/" + "config.json";
                var configString = fs.readFileSync(confFile);
                configure = JSON.parse(configString);
                configure.lastFile = fileNames[0];

                var configString = JSON.stringify(configure);
                fs.writeFileSync(confFile,configString);
                }
           
        } catch(e){
        console.log(e)
=======
    try{
        var fileNames = remote.dialog.showOpenDialog(remote.getCurrentWindow(),options);
        if(fileNames === undefined){
            return;
        }
        else {
            var backup = fs.readFileSync(fileNames[0],'utf-8');
            var currentProject = project.Project.getInstance();
            
            var board = currentProject.getBoard();
            board.restore(backup);
            currentProject.setFilename(fileNames[0]);
            currentProject.setDirty(false);
            remote.getCurrentWindow().setTitle('MI-SCRUM ' + fileNames[0]);
            

            var homepath = remote.app.getPath("home");
            var confDir = homepath + "/" + ".mi-scrum";
            var confFile = confDir + "/" + "config.json";
            var configString = fs.readFileSync(confFile);
            configure = JSON.parse(configString);
            configure.lastFile = fileNames[0];

            var configString = JSON.stringify(configure);
            fs.writeFileSync(confFile,configString);



        }
    } catch(e){
>>>>>>> 05a04a12c3f5caae3cfceebd337d45b28d916761
        var currentProject = project.Project.getInstance();
        currentProject.setFilename(oldFilename);
        currentProject.getBoard().restore(oldContent);
        var parent = remote.getCurrentWindow();
        let win = new remote.BrowserWindow({
            parent: remote.getCurrentWindow(),
            modal:true,
            darkTheme: true,
            titleBarStyle: "customButtonsOnHover",
            show: false,
            webPreferences: {
<<<<<<< HEAD
                nodeIntegration: true,
                enableRemoteModule: true
=======
                nodeIntegration: true
>>>>>>> 05a04a12c3f5caae3cfceebd337d45b28d916761
            },
        })
        win.setMenuBarVisibility(false);
        win.on('ready-to-show', () => {
            electron.ipcRenderer.sendTo(win.webContents.id, "error",["<center>Das Laden ist fehlgeschlagen.</center> <br/>" + e]);
            win.show();        
        })
        win.loadFile('./html/modal/error.html');
        win.setTitle("Ausnahme");
    }
}

class AddColumnEventListener extends listener.MouseListener {
    constructor(model,view){
        super(model,view);
    }

    onClick(e){
        e.stopPropagation();
        var parent = remote.getCurrentWindow();
        let win = new remote.BrowserWindow({
            parent: remote.getCurrentWindow(),
            modal:true,
            darkTheme: true,
            titleBarStyle: "customButtonsOnHover",
            show: false,
            webPreferences: {
<<<<<<< HEAD
                nodeIntegration: true,
                enableRemoteModule: true
=======
                nodeIntegration: true
>>>>>>> 05a04a12c3f5caae3cfceebd337d45b28d916761
            },
        })
        win.setMenuBarVisibility(false);
        win.on('ready-to-show', () => {
            win.show();
            
        })
        win.loadFile('./html/modal/addnewcolumn.html');
        win.setTitle("Neue Spalte anlegen.");
    }
}

class SaveListener extends listener.MouseListener {
    constructor(model,view){
        super(model,view);
    }

    onClick(e){
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

<<<<<<< HEAD
        const savePath = remote.dialog.showSaveDialogSync(remote.getCurrentWindow(),options);
=======
        const savePath = remote.dialog.showSaveDialog(remote.getCurrentWindow(),options);
>>>>>>> 05a04a12c3f5caae3cfceebd337d45b28d916761
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
<<<<<<< HEAD
                        nodeIntegration: true,
                        enableRemoteModule: true
=======
                        nodeIntegration: true
>>>>>>> 05a04a12c3f5caae3cfceebd337d45b28d916761
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
        timer.enableSaveTimer();
    }
}

class LoadListener extends listener.MouseListener {
    constructor(model,view){
        super(model,view);
    }

    onClick(e){
        timer.disableSaveTimer();
        var currentProject = project.Project.getInstance();
        if(currentProject.isDirty()){
            this.question(e);
        }
        else{
            load(e);
        }
        timer.enableSaveTimer();
    }

    question(e){
        var parent = remote.getCurrentWindow();
        let win = new remote.BrowserWindow({
            parent: remote.getCurrentWindow(),
            modal:true,
            darkTheme: true,
            titleBarStyle: "customButtonsOnHover",
            show: false,
            webPreferences: {
<<<<<<< HEAD
                nodeIntegration: true,
                enableRemoteModule: true
=======
                nodeIntegration: true
>>>>>>> 05a04a12c3f5caae3cfceebd337d45b28d916761
            },
        })
        win.setMenuBarVisibility(false);
        win.on('ready-to-show', () => {
            win.show();
        })
        win.on('closed', () =>{
            load(e);      
        })
        win.loadFile('./html/modal/savechange.html');
        win.setTitle("Änderungen speichern ?");
    }
}

class NewListener extends listener.MouseListener {
    constructor(model,view){
        super(model,view);
    }

    onClick(e){
        timer.disableSaveTimer();
        var currentProject = project.Project.getInstance();
        if(currentProject.isDirty()){
            this.question(e);
        }
        else{
            var currentProject = project.Project.getInstance();
            currentProject.setFilename(undefined);
            var board = currentProject.getBoard();
            board.cleanup();
            remote.getCurrentWindow().setTitle('MI-SCRUM ');
        }
        timer.enableSaveTimer();
    }

    question(e){
        var parent = remote.getCurrentWindow();
        let win = new remote.BrowserWindow({
            parent: remote.getCurrentWindow(),
            modal:true,
            darkTheme: true,
            titleBarStyle: "customButtonsOnHover",
            show: false,
            webPreferences: {
<<<<<<< HEAD
                nodeIntegration: true,
                enableRemoteModule: true
=======
                nodeIntegration: true
>>>>>>> 05a04a12c3f5caae3cfceebd337d45b28d916761
            },
        })
        win.setMenuBarVisibility(false);
        win.on('ready-to-show', () => {
            win.show();
        })
        win.on('closed', () =>{
            var currentProject = project.Project.getInstance();
            currentProject.setFilename(undefined);
            var board = currentProject.getBoard();
            board.cleanup();
            remote.getCurrentWindow().setTitle('MI-SCRUM ');     
        })
        win.loadFile('./html/modal/savechange.html');
        win.setTitle("Änderungen speichern ?");
        win.setMenuBarVisibility(false);
    }
}

class ExitListener extends listener.MouseListener {
    constructor(model,view){
        super(model,view);
    }

    onClick(e){
        var currentProject = project.Project.getInstance();
        if(currentProject.isDirty()){
            this.question(e);
        }
        else{
            remote.app.quit();
        }

    }
    question(e){
        var parent = remote.getCurrentWindow();
        let win = new remote.BrowserWindow({
            parent: remote.getCurrentWindow(),
            modal:true,
            darkTheme: true,
            titleBarStyle: "customButtonsOnHover",
            show: false,
            webPreferences: {
<<<<<<< HEAD
                nodeIntegration: true,
                enableRemoteModule: true
=======
                nodeIntegration: true
>>>>>>> 05a04a12c3f5caae3cfceebd337d45b28d916761
            },
        })
        win.setMenuBarVisibility(false);
        win.on('ready-to-show', () => {
            win.show();
        })
        win.on('closed', () =>{
            remote.app.quit();     
        })
        win.loadFile('./html/modal/savechange.html');
        win.setTitle("Änderungen speichern ?");
        win.setMenuBarVisibility(false);
    }
}

class UndoListener extends listener.MouseListener {
    constructor(model,view){
        super(model,view);
    }

    onClick(e){
        var projectSingleton = project.Project.getInstance();
        var caretaker = projectSingleton.getCaretaker();
        try {
            var lastBoardString = caretaker.getPerious();
            projectSingleton.getBoard().restore(lastBoardString);
            projectSingleton.getBoard().notify();
        }
        catch (err){
            e.stopPropagation();
            var parent = remote.getCurrentWindow();
            let win = new remote.BrowserWindow({
                parent: remote.getCurrentWindow(),
                modal:true,
                darkTheme: true,
                titleBarStyle: "customButtonsOnHover",
                show: false,
                webPreferences: {
<<<<<<< HEAD
                    nodeIntegration: true,
                    enableRemoteModule: true
=======
                    nodeIntegration: true
>>>>>>> 05a04a12c3f5caae3cfceebd337d45b28d916761
                },
            })
            win.setMenuBarVisibility(false);
            win.on('ready-to-show', () => {
                electron.ipcRenderer.sendTo(win.webContents.id, "error",["Rückgängig ist nicht möglich."]);
                win.show();        
            })
            win.loadFile('./html/modal/error.html');
            win.setTitle("Ausnahme");
            win.setMenuBarVisibility(false);
        }
    }
}

class RedoListener extends listener.MouseListener {
    constructor(model,view){
        super(model,view);
    }

    onClick(e){
        var projectSingleton = project.Project.getInstance();
        var caretaker = projectSingleton.getCaretaker();
        try {
            var nextBoardString = caretaker.getNext();
            projectSingleton.getBoard().restore(nextBoardString);
            projectSingleton.getBoard().notify();
        }
        catch (err){
            e.stopPropagation();
            var parent = remote.getCurrentWindow();
            let win = new remote.BrowserWindow({
                parent: remote.getCurrentWindow(),
                modal:true,
                darkTheme: true,
                titleBarStyle: "customButtonsOnHover",
                show: false,
                webPreferences: {
<<<<<<< HEAD
                    nodeIntegration: true,
                    enableRemoteModule: true
=======
                    nodeIntegration: true
>>>>>>> 05a04a12c3f5caae3cfceebd337d45b28d916761
                },
            })
            win.setMenuBarVisibility(false);
            win.on('ready-to-show', () => {
                electron.ipcRenderer.sendTo(win.webContents.id, "error",["Wiederholen ist nicht möglich."]);
                win.show();        
            })
            win.loadFile('./html/modal/error.html');
            win.setTitle("Ausnahme");
            win.setMenuBarVisibility(false);
        }
        
    }
}

module.exports.AddColumnEventListener = AddColumnEventListener;
module.exports.SaveListener = SaveListener;
module.exports.LoadListener = LoadListener;
module.exports.NewListener = NewListener;
module.exports.ExitListener = ExitListener;
module.exports.UndoListener = UndoListener;
module.exports.RedoListener = RedoListener;
