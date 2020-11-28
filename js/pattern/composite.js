var exceptions = require("../exceptions/exceptions.js");

/**
 * Die Klasse ist eine Abstraktion für alle Komponenten in einem Baum inklusive eines Knoten.
 * Sie definiert die Schnittstelle für alle Klienten. 
 */
class Component {
    /**
     * Erzeut eine Komponente. Der Pfad ist root + id (/{id}) solange die Komponente nicht einem Konten im Baum hinzugefügt wird.
     * @param {string} id - eindeutige id der Komponente innerhalb des Pfades zu der Komponente.
     */
    constructor(id){
        this.id = id;
        this.path = "/" + id;
    }

    /**
     * Gibt den Pfad dieser Komponente zurück. Es handelt sich um die eindeutige id im gesamten Baum dieser Komponente.
     * @return {string} Pfad der Komponente.
     */
    getPath(){
        return this.path;
    }

    /**
     * Gibt die id dieser Komponente zurück. Es handelt sich um die eindeutige id der direkten Kindelement des Elternknotens.
     */
    getId(){
        return this.id;
    }

    /**
     * Sucht eine Comonent ab dem root Knoten und gibt diese zurück.
     * @param {string} compositeId 
     * @return {Component} - die gefundene Komponente oder null.
     */
    findFromRoot(compositeId){
        var erg = undefined;
        if(this.parent != undefined){
            return this.parent.findFromRoot(compositeId);
        }
        else{
            return this.find(compositeId);
        }
    }

    /**
     * Sucht eine Comonent ab dem aktuellen Knoten und gibt diese zurück.
     * @param {string} compositeId 
     * @return {Component} - die gefundene Komponente oder null.
     */
    find(compositeId){
       var erg = undefined;
       if(this.id == compositeId){
           erg = this;
       }
       else{
           if(this.children != undefined){
               for(let i = 0; i < this.children.length; i++){
                    var element = this.children[i];
                    erg = element.find(compositeId)
                    if(erg != undefined){
                        i = this.children.length;
                    }                        
               }
           }
       }
       return erg;
    }

}

/**
 * @classdesc Die Klasse repräsentiert ein Blatt im Kompositionsbaum und implementiert alle gemeinsamen
 * Methoden einer Komponente.
 * @extends {Component}
 */
class Leaf extends Component { 
    /**
     * Erzeugt ein Blatt
     * @param {string} id - eindeutige id der Komponente innerhalb des Pfades zu der Komponente.
     */
    constructor(id){
        super(id);
    }
}
 
/**
 * Die Klasse repräsentiert einen Knoten im Kompositionsbaum.
 */
class Composite extends Component{
    /**
     * Erzeugt einen Knoten
     * @param {string} id - eindeutige id der Komponente innerhalb des Pfades zu der Komponente.
     */
    constructor(id){
        super(id);
        this.children = [];
    }

    /**
     * Fügt ein Kindelement zum Knoten am Ende hinzu.
     * @param {Component} component - der hinzuzufügende Kindknoten/blatt.
     * @throws {AddComponentException} - die Kindkomposition konnte nicht hinzugefügt werden.
     */
    add(component){
        var index = this.children.findIndex(function(element){
            return element.id == component.id;
        });
        if(index != -1){
            throw new exceptions.AddComponentException(component.getId(),component.getPath(),'Component already exists.');
        }
        
        try{
            component.path = super.getPath() + component.getPath();
            this.children.push(component);
            component.parent=this;
        }catch(e){
            throw new exceptions.AddComponentException(component.getId(),component.getPath(),'Unknown Error');    
        }
    }

    /**
     * Fügt ein Kindelement zum Knoten am Anfang hinzu.
     * @param {Component} component - der hinzuzufügende Kindknoten/blatt.
     * @throws {AddComponentException} - die Kindkomposition konnte nicht hinzugefügt werden.
     */
    addToFront(component){
        var index = this.children.findIndex(function(element){
            return element.id == component.id;
        });
        if(index != -1){
            throw new exceptions.AddComponentException(component.getId(),component.getPath(),'Component already exists.');
        }

        try{
            component.path = super.getPath() + component.getPath();
            this.children.unshift(component);
            component.parent=this;
        }catch(e){
            throw new exceptions.AddComponentException(component.getId(),component.getPath(),'Unknown Error');    
        }
    }
    /**
     * Fügt ein Element hinter der angegebenen Komponente als Kind ein.
     * @param {Component} component - Hinter dieser Komponente wird die neue Komponente eingefügt.
     * @param {Component} newComponent - Die neue Komponente. 
     */
    addBefore(component,newComponent){

        var indexBefore = this.children.findIndex(function(element){
            return element.id == component.id;
        })
        if(indexBefore == -1){
            throw new exceptions.AddComponentException(component.getId(),component.getPath(),
            'The component behind which should be inserted does not exist.');
        }

        var index = this.children.findIndex(function(element){
            return element.id == newComponent.id;
        });
        if(index != -1){
            throw new exceptions.AddComponentException(component.getId(),component.getPath(),'Component already exists.');
        }
        this.children.splice(indexBefore,0,newComponent);
        newComponent.parent = this;
    }

    /**
     * Ersetzt ein Kindkomponente durch eine neue Kindkomponente.
     * @param {Component} oldComponent 
     * @param {Component} newComponent 
     */
    changeChildren(oldComponent,newComponent){
        var indexOld = this.children.findIndex(function(element){
            return element.id == oldComponent.id;
        })
        if(indexOld == -1){
            throw new exceptions.AddComponentException(oldComponent.getId(),oldComponent.getPath(),
            'The component which should be switchet does not exist.');
        }

        var index = this.children.findIndex(function(element){
            return element.id == newComponent.id;
        });
        if(index != -1){
            throw new exceptions.AddComponentException(newComponent.getId(),newComponent.getPath(),'Component already exists.');
        }

        this.children.splice(indexOld,1,newComponent);
        newComponent.parent = this;
    }

    /**
     * Entfernt einen Kompositionsknoten.
     * @param {string} compositeId - id des zu entfernen Kindknoten/blatt.
     */
    remove(compositeId){
        var index = this.children.findIndex(function(element){
            return element.id == compositeId;
        });
        
        if(index == -1){
            throw new exceptions.RemoveComponentException(compositeId, this.getPath() + "/" + compositeId, 'Component does not exists.');   
        }
        try{
            this.children.splice(index,1);
        } catch(e){
            throw new exceptions.RemoveComponentException(compositeId, this.getPath() + "/" + compositeId, 'Unknown Error');
        }
    }

    /**
     * Gibt die Kinder des Knoten zurück.
     * @returns {Component[]} Kinder der Komponente.
     */
    getChildren(){
        return this.children;
    }
}



module.exports.AddComponentException = exceptions.AddComponentException;
module.exports.RemoveComponentException = exceptions.RemoveComponentException;
module.exports.Composite = Composite;
module.exports.Leaf = Leaf;
module.exports.Composite = Composite;