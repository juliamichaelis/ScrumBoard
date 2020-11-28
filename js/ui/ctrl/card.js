var listener = require("../ctrl/listener.js");
var cardDragModel = require("../model/card.js");
var cardDragView = require("../view/card.js");
var dialogBuilder = require("../builder/dialog.js");
var dialogCtrl = require("../ctrl/dialog.js");
var project = require('../../system/project.js');
var eventDispatcher = require("../../system/EventDispatcher.js");
var cardBuilder = require("../builder/card.js");

var electron = require("electron");
var remote = require("electron").remote;
var project = require("../../system/project.js");

class CardDragListener extends listener.DragListener{
    constructor(model,view,command){
        super(model,view,command);
    }

    /**
     * Wird aufgerufen wenn, der Drag Vorgang gestartet wird.
     * @param {*} e 
     */
    dragStart(e){

    }

    /** 
     * Wird aufgerufen wenn, der Drag Vorgang beendet ist.
     */
    dragEnd(e){
        var currentProject = project.Project.getInstance();
        var dragCard = this.model.findFromRoot("dragcard");
        e.stopPropagation();  
        if(dragCard != undefined){
            currentProject.getCaretaker().add(currentProject.getBoard().backup());
            var moveCardParent = this.model.parent;
            moveCardParent.remove(this.model.id);
            moveCardParent.notify();
            var parent = dragCard.parent;
            parent.changeChildren(dragCard,this.model);
            currentProject.setDirty(true);
            parent.notify();
        }
        document.getElementById(this.model.id).style.opacity="1";
    }
}

class CardContentDropListener extends listener.DropListener {
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
            this.model.parent.addBefore(this.model,this.dragModel);
        }
        this.model.parent.notify();
    }
}

class CardHeaderDropListener extends listener.DropListener {
    constructor(model,view){
        super(model,view,"/header");
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
            this.model.parent.addBefore(this.model,this.dragModel);
        }
        this.model.parent.notify();
    }
}

/**
 * Listener for the Card Deletion
 */
class CardDeleteListener extends listener.MouseListener {
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
                nodeIntegration: true
            },
        })
        win.setMenuBarVisibility(false);
        win.on('ready-to-show', () => {
            console.log("sendTo");
            electron.ipcRenderer.sendTo(win.webContents.id, "deletecard",[this.model.id, this.model.parent.id]);
            console.log("endsendTo");
            win.show();
            
        })
        win.loadFile('./html/modal/deletecard.html');
        win.setTitle("Karte löschen");
    }
}


class CardContentKeyListener extends listener.KeyListener{
    constructor(model,view){
        super(model,view,"/content");
    }

    onKeyUp(e){
        var currentProject = project.Project.getInstance();
        console.log("onKeyDown");
        var textarea = document.getElementById(this.getId());
        this.model.text = textarea.value;
        currentProject.setDirty(true);
    }
}

class CardConfigListener extends listener.MouseListener {
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
            width: remote.getCurrentWindow().getBounds().width,
            height: remote.getCurrentWindow().getBounds().height,
            x: remote.getCurrentWindow().x,
            y: remote.getCurrentWindow().y,
            webPreferences: {
                nodeIntegration: true
            },
        })
        win.setMenuBarVisibility(false);
        win.on('ready-to-show', () => {
            console.log("sendTo");
            var comments = [];
            this.model.children.forEach(function(element){
                comments.push(element.commentText);
            })

            electron.ipcRenderer.sendTo(win.webContents.id, "editcard",[this.model.text, this.model.id, comments]);
            console.log("endsendTo");
            win.show();
            
        })
        win.loadFile('./html/modal/editcard.html');
        win.setTitle("Karte bearbeiten");    
    }
}

class CardCommentKeyListener extends listener.KeyListener{
    constructor(model,view){
        super(model,view,"/input");
    }

    onKeyUp(e){
        var currentProject = project.Project.getInstance();
        console.log("onKeyDown");
        var textarea = document.getElementById(this.getId());
        this.model.commentText = textarea.value;
        currentProject.setDirty(true);
    }
}

class CardCommentDeleteListener extends listener.MouseListener{
    constructor(model,dialogmodel){
        super(model,undefined,"/delete");
        this.dialogmodel = dialogmodel;
    }

    onClick(e){
        console.log("click delete card");
        var supermodel = this.model.parent;
        var eventDis = eventDispatcher.EventDispatcher.getInstance();
        eventDis.removeEventHandler(this.model.id);
        supermodel.remove(this.model.id);
        this.dialogmodel.notify();
    }
}



module.exports.CardDragListener = CardDragListener;
module.exports.CardContentDropListener = CardContentDropListener;
module.exports.CardHeaderDropListener = CardHeaderDropListener;
module.exports.CardDeleteListener = CardDeleteListener;
module.exports.CardContentKeyListener = CardContentKeyListener;
module.exports.CardConfigListener = CardConfigListener;
module.exports.CardCommentKeyListener = CardCommentKeyListener;
module.exports.CardCommentDeleteListener = CardCommentDeleteListener;