var dialogM = require("../model/dialog.js");
var dialogV = require("../view/dialog.js");
var dialogC = require("../ctrl/dialog.js");

var eventDispatcher = require("../../system/EventDispatcher.js");

/**
 * Erzeugt einen Builder für ein QuestionDialog
 */
class QuestionDialogBuilder{
    constructor(head,text,ctrl){
        this.model = new dialogM.QuestionDialogModel(head,text);
        this.view = new dialogV.QuestionDialogView();
        this.model.attach(this.view);
        this.model.notify();
        
        var eventDis = eventDispatcher.EventDispatcher.getInstance();
        ctrl.model = this.model;
        ctrl.view = this.view;
        eventDis.addEventHandler(ctrl);
    }

    showModal(){
        document.getElementById(this.model.id).showModal();
    }
}

/**
 * Erzeugt einen Builder für einen Prompt
 */
class PromptDialogBuilder {
    constructor(head,text,ctrl){
        this.model = new dialogM.PromptDialogModel(head,text);
        this.view = new dialogV.PromptDialogView();
        this.model.attach(this.view);
        this.model.notify();
    
        var eventDis = eventDispatcher.EventDispatcher.getInstance();
        ctrl.model = this.model;
        ctrl.view = this.view;
        eventDis.addEventHandler(ctrl);
    }

    showModal(){
        document.getElementById(this.model.id).showModal();
    }
}

class ErrorDialog {
    constructor(head,text){
        this.model = new dialogM.ErrorDialog(head,text);
        this.view = new dialogV.ErrorDialogView();
        this.model.attach(this.view);
        this.model.notify();
        var eventDis = eventDispatcher.EventDispatcher.getInstance();
        eventDis.addEventHandler(new dialogC.ErrorDialogCtrl(this.model,this.view));
    }

    showModal(){
        document.getElementById(this.model.id).showModal();
    }
}

class ColumnConfigDialogBuilder {
    constructor(column,ctrl){
        this.model = new dialogM.ColumnConfigDialogModel(column);
        this.view = new dialogV.PromptDialogView();
        this.model.attach(this.view);
        this.model.notify();
        var eventDis = eventDispatcher.EventDispatcher.getInstance();
        ctrl.model = this.model;
        ctrl.view = this.view;
        eventDis.addEventHandler(ctrl);
    }

    showModal(){
        document.getElementById(this.model.id).showModal();
    }
}
module.exports.QuestionDialogBuilder = QuestionDialogBuilder;
module.exports.PromptDialogBuilder = PromptDialogBuilder;
module.exports.ErrorDialog = ErrorDialog;
module.exports.ColumnConfigDialogBuilder = ColumnConfigDialogBuilder;