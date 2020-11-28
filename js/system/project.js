var memento = require("../pattern/memento")
/**
 * Singleton für den Projektstatus und des Caretakers für das UNDO REDO.
 */
 class Project {
    /**
     * Erzeugt eine neue Project Instanz falls noch nicht vorhanden. Wenn
     * bereits eine Project Instanz existiert wird diese zurückgegeben.
     * @return {Project} ein Project-Singleton.
     */
    constructor(){
        if(typeof Project.instance === 'object'){
            return Project.instance;
        }
        Project.instance = this;
        this.dirty=false;
        this.filename = "undefined";
        this.caretaker = new memento.Caretaker();
    }

    /**
     * Erzeugt eine neue Project Instanz falls noch nicht vorhanden. Wenn
     * bereits eine Project Instanz existiert wird diese zurückgegeben.
     * @return {Project} ein Project-Singleton.
     */
    static getInstance(){
        Project.instance = new Project();
        
        Project.getInstance = function(){
            return Project.instance;
        }
        return Project.instance;
    }

    /**
     * Gibt zurück ob das Projekt gespeichert werden muss.
     */
    isDirty(){
        return this.dirty;
    }

    /**
     * Setzt den dirty Status des Projekts.
     * @param {boolean} dirty 
     */
    setDirty(dirty){
        this.dirty = dirty;
    }

    /**
     * Gibt das aktuelle Board zurück.
     */
    getBoard(){
        return this.board;
    }

    /** Setzt das aktuelle Board */
    setBoard(board){
        this.board = board;
    }

    getFilename(){
        return this.filename;
    }

    setFilename(filename){
        this.filename = filename;
    }

    /** 
     * Returns Caretaker for UNDO and REDO.
     */
    getCaretaker(){
        return this.caretaker;
    }

    setCaretaker(caretaker){
        this.caretaker = caretaker;
    }
 }

 module.exports.Project = Project;