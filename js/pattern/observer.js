var exceptions = require('../exceptions/exceptions.js');
/**
 * Repräsentiert ein Veröffentlicher im Observern Patterns.
 */
class Subject {
    /**
     * Erzeugt ein Subject.
     */
    constructor(){
        this.observers = [];
    }

    /**
     * Registriert ein Beobachter beim Veröffentlicher (Subject).
     * @param {Observer} observer - der Beobachter der registriert wird.
     */
    attach(observer){
        this.observers.push(observer);
    }

    /**
     * Entfernt ein Beobachter aus dem Veröffentlicher (Subject).
     * @param {Observer} observer - der Beobachter der aus der Registrierung entfernt wird.
     */
    detach(observer){
        var index = this.observers.indexOf(observer);
        this.observers.splice(index,1);
    }

    /**
     * Informiert alle Beobachter über eine Zustandsänderung.
     * @param {any[]} - params Parmeter der Zustandsänderungen, sollte von der Kindklasse implementiert werden.
     */
    notify(...params){
        this.observers.forEach(function(element){
            element.update(...params);
        });
    }
}

/**
 * Repräsentiert ein Beobachter.
 */
class Observer {

    constructor(){
    }

    /**
     * Wird vom Veröffentlicher aufgerufen um Zustandsänderungen mitzuteilen.
     * Es handelt sich um eine "Abstrakte Methode", die von den Kindklassen implementiert werden muss.
     * @param  {...any} params - die Zustandsänderungen.
     */
    update(...params){
        throw new exceptions.AbstractMethodException('Please create a subclass from Observer and implement the update method.');
    }
}



module.exports.Subject = Subject;
module.exports.Observer = Observer;
module.exports.AbstractMethodException = exceptions.AbstractMethodException;

