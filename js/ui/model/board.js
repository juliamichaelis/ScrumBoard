const observerPattern = require("../../pattern/observer.js");
const compositePattern = require("../../pattern/composite.js");
const columnBuilder = require("../builder/column.js")
const cardBuilder = require("../builder/card.js");
const cardModel = require("../model/card.js");
const cardView = require("../view/dialog.js");
/**
 * Die Klasse repräsentiert das Model eines Boards.
 */
class BoardModel extends compositePattern.Composite{
    constructor(){
        super('board');
        this.subject = new observerPattern.Subject();
    }

    /**
     * Registriert ein Beobachter beim Veröffentlicher (Subject).
     * @param {Observer} observer - der Beobachter der registriert wird.
     */
    attach(observer){
        this.subject.attach(observer);
    }

    /**
     * Entfernt ein Beobachter aus dem Veröffentlicher (Subject).
     * @param {Observer} observer - der Beobachter der aus der Registrierung entfernt wird.
     */
    detach(observer){
        this.subject.detach(observer);
    }

    cleanup(){
        console.log("cleanup");
       
        for(var i = 0; i < this.children.length; i++){
            console.log("Cleanup:" + this.children[i].name);
            this.children[i].cleanup();
        }
        this.children = [];
        this.notify();
    }

    restore(backup){
        this.cleanup();
        var backup = JSON.parse(backup);
        if(backup.type != "Board"){
            throw "Es handelt sich nicht um eine MI-SCRUM Datei";
        }
        var columns = backup.children;
        for(var i = 0; i < columns.length; i++){
            if(columns[i].type != "Column"){
                throw "Die MI-SCRUM Datei ist fehlerhaft";
            }
            var column = new columnBuilder.ColumnBuilder(columns[i].name);
            column.model.open = columns[i].open;
            this.add(column.model);
            var cards = columns[i].children;
            for(var j = 0; j < cards.length; j++){
                if(cards[j].type != "card"){    
                    throw "Die MI-SCRUM Datei ist fehlerhaft";
                }
                var card = new cardBuilder.CardBuilder(undefined,cards[j].text);
                column.model.add(card.model);
                var cardComments = cards[j].children;
                if(cardComments != undefined){
                    for(var k = 0; k < cardComments.length; k++){
                        if(cardComments[k].type != "cardcomment"){
                            throw "Die MI-SCRUM Datei ist fehlerhaft";
                        }
                        var cardComment = new cardModel.CardComment();
                        var cardCommentV = new cardView.CardConfigCommentView();
                        cardComment.attach(cardCommentV);
                        card.model.add(cardComment);
                        cardComment.commentText = cardComments[k].commentText;
                        
                    }
                }
            }  
        }
        this.notify();
    }

    backup(){
        var backup = {
            type: 'Board',
            children : []
        }    
        for(var i = 0; i < this.children.length; i++){
            var childrenbackup = this.children[i].backup();
            if(childrenbackup != null){
                backup.children.push(childrenbackup);
            }
        }
        return JSON.stringify(backup);
    }

    /**
     * Informiert alle Beobachter über eine Zustandsänderungen.
     */
    notify(){
        this.subject.notify();
        this.children.forEach(function(element){
            if(!element.open)
                element.notify();
        })
        this.children.forEach(function(element){
            if(element.open)
                element.notify();
        })
    }
}

module.exports.BoardModel = BoardModel;