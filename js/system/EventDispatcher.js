/**
 * Singleton für das EventHandling.
 */
class EventDispatcher {

    /**
     * Erzeugt eine neue EventDispatcher Instanz falls noch nicht vorhanden. Wenn
     * bereits eine EventDispatcher Instanz existiert wird diese zurückgegeben.
     * @return {EventDispatcher} ein EventDispatcher-Singleton.
     */
    constructor(){
        if(typeof EventDispatcher.instance === 'object'){
            return EventDispatcher.instance;
        }
        this.handler = [];
        EventDispatcher.instance = this;
    }

    /**
     * Erzeugt eine neue EventDispatcher Instanz falls noch nicht vorhanden. Wenn
     * bereits eine EventDispatcher Instanz existiert wird diese zurückgegeben.
     * @return {EventDispatcher} ein EventDispatcher-Singleton.
     */
    static getInstance(){
        EventDispatcher.instance = new EventDispatcher();
        
        EventDispatcher.getInstance = function(){
            return EventDispatcher.instance;
        }
        return EventDispatcher.instance;
    }

    /**
     * Dispatch an Event
     * @param {Event} event 
     */
    dispatch(event, useCurrent ){
            var target = event.target;
            if(useCurrent != undefined){
                target = event.currentTarget;
            }
            this.handler.forEach(function(element){
                if(element.getId() == target.getAttribute('id')){
                    if(event.type == "click"){
                        if(typeof element["onClick"] === "function"){
                           element.onClick(event);
                          
                        }
                    }
                    if(event.type == "close"){
                        if(typeof element["close"]){
                            element.close(event);
                        }
                    }
                    if(event.type == "dragstart"){
                        if(typeof element["dragStart"] === "function"){
                            element.dragStart(event);
                       
                        }
                    }
                    if(event.type == "dragend"){
                        if(typeof element["dragEnd"] === "function"){
                            element.dragEnd(event);
                         
                        }
                    }
                    if(event.type == "dragover"){
                        if(typeof element["dragOver"] === "function"){
                            element.dragOver(event);
                    
                        }
                    }
                    if(event.type == "drop"){
                        if(typeof element["drop"] === "function"){
                            element.drop(event);
                        }
                    }
                    if(event.type == "keyup"){
                        if(typeof element["onKeyUp"]){
                            element.onKeyUp(event);
                        }
                    }
                }
                
            })
        
                    
    }

    /**
     * Add a EventHandler for an htmlElement with id.
     * @param {function} handler - handler of the id.
     */
    addEventHandler(handler){

        if(handler.getId() == null){
            throw "id can´t be null";
        }

        this.handler.forEach(function(element){
            if(element.getId() == handler.getId()){
                var index = this.handler.indexOf(element);
                this.handler.splice(index,1);
            }
        }.bind(this));
        this.handler.push(handler);
        
    }

    removeEventHandler(prefix){
        this.handler.forEach(function(element){
            if(element.getId().startsWith(prefix)){
                var index = this.handler.indexOf(element);
                this.handler.splice(index,1);
            }
        }.bind(this));
    }
}

module.exports.EventDispatcher = EventDispatcher;