var project = require("../system/project.js");
/**
 *  Caretaker zur Verwaltung der UNDO REDO Liste des Boards.
 *  Da das board eine backup und restore Methode anbietet,
 *  muss keine MEMENTO Klasse erstellt werden.
 **/
class Caretaker {
    constructor(){
        this.mementoList = [];
        this.index = -1;
    }

    add(memento){
        var lastMemento = this.mementoList[this.mementoList.length-1];
        if(lastMemento != memento){
            console.log("add");
            this.mementoList.push(memento);
            this.index = this.mementoList.length;
        }
    }

    /**
     * UNDO
     */
    getPerious(){
        var memento = this.mementoList[this.index-1];
        if(memento == undefined){
            throw "Memento not exists";
        }
        var projectSingleton = project.Project.getInstance();
        if(this.index == this.mementoList.length){
            this.add(projectSingleton.getBoard().backup());
        }
        this.index = this.index-1;
        
        return memento;
    }

    /** REDO */
    getNext(){
        var memento = this.mementoList[this.index];
        if(memento == undefined){
            throw "Memento not exists";
        }
        this.index = this.index + 1;
        return memento
    }
    
}

module.exports.Caretaker = Caretaker;