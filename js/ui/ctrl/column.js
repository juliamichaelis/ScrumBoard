var electron = require("electron");
var remote = require("electron").remote;
var listener = require('../ctrl/listener.js');
var cardDragModel = require("../model/card.js");
var cardDragView = require("../view/card.js");
var project = require("../../system/project.js");

class ColumnListener extends listener.MouseListener {
    constructor(model,view){
        super(model,view);
    }

    onClick(e){
        var currentProject = project.Project.getInstance();
        currentProject.getCaretaker().add(currentProject.getBoard().backup());
        if(!this.model.open){
            this.model.open = true;
        }
        this.model.parent.notify();
    }
}

class ColumnMinListener extends listener.MouseListener {
    constructor(model,view){
        super(model,view,"/min");
    }

    onClick(e){
        var currentProject = project.Project.getInstance();
        currentProject.getCaretaker().add(currentProject.getBoard().backup());
        if(this.model.open){
            this.model.open = false;
        }
        this.model.parent.notify();
    }
}

class ColumnDeleteListener extends listener.MouseListener {
    constructor(model,view){
        super(model,view,"/delete");
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

                nodeIntegration: true,
                enableRemoteModule: true

            },
        })
        win.setMenuBarVisibility(false);
        win.on('ready-to-show', () => {
            console.log("sendTo");
            electron.ipcRenderer.sendTo(win.webContents.id, "deletecolumn",[this.model.id]);
            console.log("endsendTo");
            win.show();
       
        })
        win.loadFile('./html/modal/deletecolumn.html');
        win.setTitle("Spalte löschen");
    }
}

class ColumnAddCardListener extends listener.MouseListener {
    constructor(model,view){
        super(model,view,"/add-card");
    }

    onClick(e){
        e.stopPropagation();
        var screens = require("electron").screen;

        console.log(remote.getCurrentWindow().getSize().width)
    
        let win = new remote.BrowserWindow({
            parent: remote.getCurrentWindow(),
            modal:true,
            darkTheme: true,
            titleBarStyle: "customButtonsOnHover",
            show: false,
            width: remote.getCurrentWindow().getBounds().width,
            height: remote.getCurrentWindow().getBounds().height,
            x: remote.getCurrentWindow().getBounds().x,
            y: remote.getCurrentWindow().getBounds().y,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true
            },
        })
        win.setMenuBarVisibility(true);
        win.on('ready-to-show', () => {
            console.log("sendTo");
            electron.ipcRenderer.sendTo(win.webContents.id, "newcard",[this.model.id]);
            console.log("endsendTo");
            win.show();
        })
        win.loadFile('./html/modal/newcard.html');
        win.setTitle("Karte erstellen");
        
    }    
}

class ColumnConfigListener extends listener.MouseListener {
    constructor(model,view){
        super(model,view,"/config");
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
                nodeIntegration: true,
                enableRemoteModule: true
            },
        })
        win.setMenuBarVisibility(false);
        win.on('ready-to-show', () => {
            console.log("show");
            electron.ipcRenderer.sendTo(win.webContents.id, "setname",[this.model.name,this.model.id]);
            win.show();
            
        })
        win.loadFile('./html/modal/editcolumn.html');
        win.setTitle("Spalte bearbeiten");
        // var ctrl = new ColumnConfigDialogListener(this.model, this.view);
        // var columnConfigDialog = new dialogBuilder.ColumnConfigDialogBuilder(this.model,ctrl);
        // columnConfigDialog.showModal();
    }    
}

class ColumnLeftListener extends listener.MouseListener{
    constructor(model,view){
        super(model,view,"/left");
    }

    onClick(e){
        e.stopPropagation();
        var board = this.model.parent;
        var index = board.children.indexOf(this.model);
        if(index != 0){
            var currentProject = project.Project.getInstance();
            currentProject.getCaretaker().add(currentProject.getBoard().backup());
            var changeModel = board.children[index-1];
            board.children[index-1] = this.model;
            board.children[index] = changeModel;
            board.notify();
        }
    }
}

class ColumnRightListener extends listener.MouseListener{
    constructor(model,view){
        super(model,view,"/right");
    }

    onClick(e){
        e.stopPropagation();
        var board = this.model.parent;
        var index = board.children.indexOf(this.model);
        if(index != board.children.length -1){
            var currentProject = project.Project.getInstance();
            currentProject.getCaretaker().add(currentProject.getBoard().backup());
            var changeModel = board.children[index+1];
            board.children[index+1] = this.model;
            board.children[index] = changeModel;
            board.notify();
        }
    }
}

class ColumnDropListener extends listener.DropListener {
    constructor(model,view){
        super(model,view,"/content");
        this.dragModel = undefined;
    }

    dragOver(e){
        e.preventDefault();
        e.stopPropagation();

        e.dataTransfer.dropEffect = 'move'; 

        this.dragModel = this.model.findFromRoot("dragcard");
        if(this.dragModel != undefined){
            var parent = this.dragModel.parent;
            this.dragModel.parent.remove(this.dragModel.id);
            this.dragModel = undefined;
            parent.notify();
            
        }

        if(this.dragModel == undefined){
            var dragView = new cardDragView.DragCardView();
            this.dragModel = new cardDragModel.DragCardModel();
            this.dragModel.attach(dragView);
            this.model.add(this.dragModel);
        }
        this.model.notify();
    }
}

module.exports.ColumnListener = ColumnListener;
module.exports.ColumnMinListener = ColumnMinListener;
module.exports.ColumnDeleteListener = ColumnDeleteListener;
module.exports.ColumnAddCardListener = ColumnAddCardListener;
module.exports.ColumnConfigListener = ColumnConfigListener;
module.exports.ColumnDropListener = ColumnDropListener;
module.exports.ColumnLeftListener = ColumnLeftListener;
module.exports.ColumnRightListener = ColumnRightListener;