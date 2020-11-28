var listener = require("../ctrl/listener.js");
var eventDispatcher = require("../../system/EventDispatcher.js");
var exceptions = require('../../exceptions/exceptions.js');
var cardM = require("../model/card.js");
var cardC = require("../ctrl/card.js");
var dialogV = require("../view/dialog.js");

/** Controller for a QuestionDialog with Yes and No */
class QuestionDialogCtrl extends listener.EventDispatchListener {
    /**
     * Create an abstract Question Controller
     * @param {QuestionModel} model - will be set from builder
     * @param {QuestionView} view  - will be set from builder
     */
    constructor(){
        super("","","");
    }

    /**
     * Will be called if the dialog is closed
     * @param {CloseEvent} e 
     */
    close(e){
        var dialog = document.getElementById(this.model.id);
        if(dialog.returnValue == "yes"){
            this.yes(e);
        }
        if(dialog.returnValue == "no"){
            this.no(e);
        }
        var eventDis = eventDispatcher.EventDispatcher.getInstance();
        eventDis.removeEventHandler(this.model.id);
        document.body.removeChild(dialog);
    }

    /**
     * Will be called if the dialog is closed and the answer was yes.
     * Please implement this method in a subclass.
     * @param {CloseEvent} e 
     */
    yes(e){
        throw new exceptions.AbstractMethodException('Please create a subclass from QuestionDialogCtrl and implement the yes Method');
    }

   /**
     * Will be called if the dialog is closed and the answer was no.
     * Please implement this method in a subclass.
     * @param {CloseEvent} e 
     */
    no(e){
        throw new exceptions.AbstractMethodException('Please create a subclass from QuestionDialogCtrl and implement the no Method');
    }
}

/** Controller for a Prompt with cancel and Ok */
class PromptDialogCtrl extends listener.EventDispatchListener {
    /**
     * Create an abstract Question Controller
     * @param {QuestionModel} model - will be set from builder
     * @param {QuestionView} view  - will be set from builder
     */
    constructor(){
        super("","","");
    }

    /**
     * Will be called if the dialog is closed
     * @param {CloseEvent} e 
     */
    close(e){
        var dialog = document.getElementById(this.model.id);
        var inputText = document.getElementById(this.model.id + "/input");
        if(dialog.returnValue == "cancel"){
            this.cancel(e,inputText.value);
        }
        if(dialog.returnValue == "ok"){
            this.ok(e,inputText.value);
        }
        var eventDis = eventDispatcher.EventDispatcher.getInstance();
        eventDis.removeEventHandler(this.model.id);
        document.body.removeChild(dialog);
    }

    /**
     * Will be called if the dialog is closed and the answer was yes.
     * Please implement this method in a subclass.
     * @param {CloseEvent} e 
     */
    cancel(e, inputText){
        throw new exceptions.AbstractMethodException('Please create a subclass from PromptDialogCtrl and implement the cancel Method');
    }

   /**
     * Will be called if the dialog is closed and the answer was no.
     * Please implement this method in a subclass.
     * @param {CloseEvent} e 
     */
    ok(e, inputText){
        throw new exceptions.AbstractMethodException('Please create a subclass from PromptDialogCtrl and implement the ok Method');
    }
}

/**
 * Controller for an Error dialog.
 */
class ErrorDialogCtrl extends listener.EventDispatchListener {

    /**
     * Create an Error Dialog Controller
     * @param {ErrorDialogModel} model - dialog model
     * @param {ErrorDialogView} view  - dialog view
     */
    constructor(model,view){
        super(model,view,"");
    }

    /**
     * Will be called if the dialog is closed
     * @param {CloseEvent} e 
     */
    close(e){
        var dialog = document.getElementById(this.model.id);
        var eventDis = eventDispatcher.EventDispatcher.getInstance();
        eventDis.removeEventHandler(this.model.id);
        document.body.removeChild(dialog);
    }

}

class AddCommentCtrl extends listener.EventDispatchListener{
    constructor(model,view,card){
        super(model,view,"/addComment");
        this.card = card;
    }

    onClick(e){
        var dialog = document.getElementById(this.model.id);
        var comment = new cardM.CardComment();
        var commentV = new dialogV.CardConfigCommentView();
        comment.attach(commentV);
        this.card.add(comment);
        var cardCommentKeyListener = new cardC.CardCommentKeyListener(comment,commentV);
        var cardDeleteListener = new cardC.CardCommentDeleteListener(comment,this.model);
        var eventDis = eventDispatcher.EventDispatcher.getInstance();
        eventDis.addEventHandler(cardCommentKeyListener);
        eventDis.addEventHandler(cardDeleteListener);
        this.model.notify();
    }
}

class CloseCardConfigDialogCtrl extends listener.EventDispatchListener{
    constructor(model,view){
        super(model,view,"/close");
    }

    onClick(e){
        var dialog = document.getElementById(this.model.id);
        dialog.close();
        var eventDis = eventDispatcher.EventDispatcher.getInstance();
        eventDis.removeEventHandler(this.model.id);
        var children = this.model.card.getChildren();
        children.forEach(function(element){
            eventDis.removeEventHandler(element.id);
        })
        dialog.parentElement.removeChild(dialog);
    }
}

module.exports.QuestionDialogCtrl = QuestionDialogCtrl;
module.exports.PromptDialogCtrl = PromptDialogCtrl;
module.exports.ErrorDialogCtrl = ErrorDialogCtrl;
module.exports.AddCommentCtrl = AddCommentCtrl;
module.exports.CloseCardConfigDialogCtrl = CloseCardConfigDialogCtrl;