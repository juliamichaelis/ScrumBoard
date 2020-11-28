const observerPattern = require("../../pattern/observer.js");
const compositePattern = require("../../pattern/composite.js");
const uuidv1 = require('uuid/v1');

/**
 * Model einer Karte auf dem Board
 */
class CardModel extends compositePattern.Composite {
    /**
     * Erstellt eine Karte auf einer Spalte
     * @param {string} background 
     * @param {string} text 
     */
    constructor(background,text){
        super("");
        super.id = uuidv1();
        this.background = background;
        this.text = text;
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
        var eventDis = eventDispatcher.EventDispatcher.getInstance();
        eventDis.removeEventHandler(this.id);
    }

    backup(){
        var backup = {
            type: "card",
            text: this.text,
            children : []
        }
        for(var i = 0; i < this.children.length; i++){
            var childrenbackup = this.children[i].backup();
            if(childrenbackup != null){
                backup.children.push(childrenbackup);
            }
        }
        return backup;
    }

    /**
     * Informiert alle Beobachter über Änderungen.
     */
    notify(){
        var commentCount = undefined;
        if(this.children != undefined){
            if(this.children.length != 0){
                commentCount = this.children.length;
            }
        }
        console.log(commentCount);
        this.subject.notify(this.background,this.text,this.id, this.parent.id + "/content",commentCount);
    }
}

class DragCardModel extends compositePattern.Composite {
    constructor(){
        super("");
        super.id = "dragcard";
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

    /**
     * Informiert alle Beobachter über Änderungen.
     */
    notify(){
        
        this.subject.notify(this.id, this.parent.id + "/content");
    }
}

class CardComment extends compositePattern.Leaf {
    constructor(){
        super("");
        super.id = uuidv1();
        this.commentText = "";
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

    notify(dialogId){
        this.subject.notify(this.id,this.commentText,dialogId+"/content");
    }

    backup(){
        var backup = {
            type: "cardcomment",
            commentText: this.commentText
        }
        return backup;
    }
}

module.exports.CardModel = CardModel;
module.exports.DragCardModel = DragCardModel;
module.exports.CardComment = CardComment;