var observerPattern = require("../../pattern/observer.js")
const uuidv1 = require('uuid/v1');
/**
 * Dialogmodel für eine Frage, die mit Ja und Nein beantwortet werden kann.
 */
class QuestionDialogModel extends observerPattern.Subject{
    /**
     * Erzeugt das QuestionDialogModel
     * @param {string} head - Titelzeile
     * @param {string} text - text der Zeile
     */
    constructor(head,text){
        super("");
        this.head = head;
        this.text = text;
        this.id = uuidv1();
    }
    
    notify(){
        super.notify(this.id,this.head,this.text);    
    }
}

/**
 * Dialogmodel für eine einfach Eingabe, die Eingabe kann mit Übernehmen Übernommen werden und mit Abbrechen verworfen werden.
 */
class PromptDialogModel extends observerPattern.Subject{

    /**
     * Erzeugt das Dialogmodel für eine einfache Eingabe
     * @param {string} head - Titlezeile
     * @param {string} text - text vor der Eingabe
     */
    constructor(head,text){
        super("");
        this.head = head;
        this.text = text;
        this.id = uuidv1();
    }

    notify(){
        super.notify(this.id,this.head,this.text);
    }
}

class ErrorDialogModel extends observerPattern.Subject{
    constructor(head,text){
        super("");
        this.head = head;
        this.text = text;
        this.id = uuidv1();
    }

    notify(){
        super.notify(this.id,this.head,this.text);
    }
}

/**
 * Model für einen Konfigurationsdialog einer Spalte
 */
class ColumnConfigDialogModel extends observerPattern.Subject {
    constructor(column){
        super("");
        this.column = column;
        this.id = uuidv1();
    }

    notify(){
        super.notify(this.id, "Spalte " + this.column.name + " ändern", "Neuer Spaltenname:");
    }
}

/** 
 * Model für einen Konfigurationsdialog einer Karte 
 */

class CardConfigDialogModel extends observerPattern.Subject {
    constructor(card){
        super("");
        this.card = card;
        this.id = uuidv1();
    }

    notify(){
        super.notify(this.id, this.card);
        var children = this.card.children;
        children.forEach(function(element){
            element.notify(this.id);
        }.bind(this));
    }
}

module.exports.QuestionDialogModel = QuestionDialogModel;
module.exports.PromptDialogModel = PromptDialogModel;
module.exports.ErrorDialog = ErrorDialogModel;
module.exports.ColumnConfigDialogModel = ColumnConfigDialogModel;
module.exports.CardConfigDialogModel = CardConfigDialogModel;