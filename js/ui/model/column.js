const observerPattern = require("../../pattern/observer.js");
const compositePattern = require("../../pattern/composite.js");
const uuidv1 = require('uuid/v1');
var eventDispatcher = require("../../system/EventDispatcher.js");

/**
 * Model einer Spalte des Boards.
 */
class ColumnModel extends compositePattern.Composite {
    /**
     * Erstellt eine Spalte im Board
     * @param {string} name 
     * @param {string} background 
     */
    constructor(background,name){
        super("");
        super.id = uuidv1();
        this.background = background;
        this.name = name
        this.subject = new observerPattern.Subject();
        this.open = true;
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
        for(var i = 0; i < this.children.length; i++){
            this.children[i].cleanup();
            
        }
        this.children = [];
        var eventDis = eventDispatcher.EventDispatcher.getInstance();
        eventDis.removeEventHandler(this.id);
    }

    backup(){
        var backup = {
            type: 'Column',
            name: this.name,
            open: this.open,
            children: []
        }
        for(var i = 0; i < this.children.length; i++){
            if(this.children[i].backup != undefined){
                var childrenbackup = this.children[i].backup();
                if(childrenbackup != null){
                    backup.children.push(childrenbackup);
                }
            }
        }
        return backup;
    }
    /**
     * Informiert alle Beobachter über Änderungen.
     */
    notify(){
        this.subject.notify(this.open,this.background,this.name,this.id);
        if(this.open){
            this.children.forEach(function(element){
                element.notify();
            })
        }
    }
    
}

module.exports.ColumnModel = ColumnModel;