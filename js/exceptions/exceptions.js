/*** Allgemeine Exceptions */
/**
 * Repräsentiert die Ausnahme, dass eine "Abstrakte Methode" aufgerufen wurde.
 */
class AbstractMethodException extends Error {
    /**
     * Erstellt die Ausnahme AbstractMethodException
     * @param {string} message - Optional. Für Menschen lesbare Beschreibung der Ausnahme.
     **/
    constructor(message){
        super(message);
        if(Error.captureStackTrace){
            Error.captureStackTrace(this, AbstractMethodException);
        }
    }
}

/*** Exceptions für das Composite Pattern */
/**
 * Repräsentiert den Fehler, dass ein Componente nicht entfernt werden kann.
 */
class RemoveComponentException extends Error {
    /**
     * Erstellt eine RemoveComponentException.
     * @param {string} id - id der Komponente.
     * @param {string} fullpath - Pfad der Komponente.
     * @param  {...any} params - sonstige Parameter.
     */
    constructor(id, path,...params){
        super(...params);
        if(Error.captureStackTrace){
            Error.captureStackTrace(this, RemoveComponentException);
        }
        this.id = id;
        this.path = path;
    }
}

/**
 * Repräsentiert den Fehler, dass ein Komponente nicht zu einem Konten hinzugefügt werden kann.
 */
class AddComponentException extends Error {
    /**
     * Erstellt eine AddFileException.
     * @param {string} id - id der Komponente.
     * @param {string} path - Pfad der Komponente.
     * @param  {...any} params - sonstige Parameter.
     */
    constructor(id, path,...params){
        super(...params);
        if(Error.captureStackTrace){
            Error.captureStackTrace(this, AddComponentException);
        }
        this.id = id;
        this.path = path;
    }
}

module.exports.AbstractMethodException = AbstractMethodException;
module.exports.RemoveComponentException = RemoveComponentException;
module.exports.AddComponentException = AddComponentException;
