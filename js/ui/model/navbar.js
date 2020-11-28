const observerPattern = require("../../pattern/observer.js");
const compositePattern = require("../../pattern/composite.js");
const uuidv1 = require('uuid/v1');

class NavbarModel extends compositePattern.Composite {
    constructor(){
        super("");
        this.id = uuidv1();
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
        this.subject.notify(this.id);
        this.children.forEach(function(element){
            element.notify();
        })
    }
}

class NavIconModel extends compositePattern.Leaf {
    constructor(text,title){
        super("");
        this.id = uuidv1();
        this.text = text;
        this.title = title;
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
        this.subject.notify(this.id,this.text,this.title, this.parent.id);
    }
}

module.exports.NavbarModel = NavbarModel;
module.exports.NavIconModel = NavIconModel;