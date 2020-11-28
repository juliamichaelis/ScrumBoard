var cardV = require('../view/card.js');
var cardM = require('../model/card.js');
var cardCtrl = require('../ctrl/card.js');
var eventDispatcher = require("../../system/EventDispatcher.js");
var dialogV = require("../view/dialog.js");
var dialogM = require("../model/dialog.js");
var dialogCtrl = require("../ctrl/dialog.js");

class CardBuilder{
    constructor(backgound,text){
        this.model = new cardM.CardModel(backgound,text);
        this.view = new cardV.CardView();
        this.model.attach(this.view);

        var eventDis = eventDispatcher.EventDispatcher.getInstance();

        eventDis.addEventHandler(new cardCtrl.CardDragListener (this.model,this.view));
        eventDis.addEventHandler(new cardCtrl.CardContentDropListener (this.model,this.view));
        eventDis.addEventHandler(new cardCtrl.CardHeaderDropListener (this.model,this.view));
        eventDis.addEventHandler(new cardCtrl.CardDeleteListener (this.model,this.view));
        eventDis.addEventHandler(new cardCtrl.CardContentKeyListener(this.model,this.view));
        eventDis.addEventHandler(new cardCtrl.CardConfigListener(this.model,this.view));
    }

    getModel(){
        return this.model;
    }
}

class CardConfigDialogBuilder{
    constructor(cardModel){
        this.model = cardModel;
        this.dialogModel = new dialogM.CardConfigDialogModel(this.model);

        var dialogView = new dialogV.CardConfigDialogView();
        this.dialogModel.attach(dialogView);
        var dialogC = new dialogCtrl.AddCommentCtrl(this.dialogModel,dialogView,this.model);
        var closeDialog = new dialogCtrl.CloseCardConfigDialogCtrl(this.dialogModel,dialogView);
        var eventDis = eventDispatcher.EventDispatcher.getInstance();
        eventDis.addEventHandler(dialogC);
        eventDis.addEventHandler(closeDialog);
        var children = this.model.children;
        children.forEach(function(element){
            var cardCommentKeyListener = new cardCtrl.CardCommentKeyListener(element,undefined);
            var cardDeleteListener = new cardCtrl.CardCommentDeleteListener(element,this.dialogModel);
            var eventDis = eventDispatcher.EventDispatcher.getInstance();
            eventDis.addEventHandler(cardCommentKeyListener);
            eventDis.addEventHandler(cardDeleteListener);
        },this);
    }
}

module.exports.CardBuilder=CardBuilder;
module.exports.CardConfigDialogBuilder = CardConfigDialogBuilder;