var exceptions = require('../../exceptions/exceptions.js');

class EventDispatchListener{
	constructor(model,view,command){
		this.model = model;
        this.view = view;
        if(command == undefined){
            command = "";
        }
        this.command = command;	
	}

	getId(){
		return this.model.id + this.command;
	}
}

class KeyListener{
	constructor(model,view,command){
		this.model = model;
        this.view = view;
        if(command == undefined){
            command = "";
        }
        this.command = command;	
	}

	getId(){
		return this.model.id + this.command;
	}
}

/**
 * Klasse repräsentiert MouseListenern für HTMLElemente.
 */
class MouseListener extends EventDispatchListener{

    constructor(model,view,command){
		super(model,view,command);
    }

    /**
     * Methode wird bei einem Mouseclick aufgerufen.
     * Es handelt sich um eine "Abstrakte Methode", die von den Kindklassen implementiert werden muss.
     * @param {MouseEvent} e - das MouseEvent 
     */
    onClick(e){
        throw new exceptions.AbstractMethodException('Please create a subclass from MouseListener and implement the onClick Method');
    }

    crossBrowserElementPos(e) {
		e = e || window.event;
		var obj = e.target || e.srcElement;
		var x = 0, y = 0;
		while(obj.offsetParent) {
			x += obj.offsetLeft;
			y += obj.offsetTop;
			obj = obj.offsetParent;
		}
		return { 'x': x, 'y': y };
	}
	
	crossBrowserMousePos(e) {
		e = e || window.event;
		return {
			'x': e.pageX || e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
			'y': e.pageY || e.clientY + document.body.scrollTop + document.documentElement.scrollTop,
		};
	}
	
	crossBrowserRelativeMousePos(e) {
		var element = this.crossBrowserElementPos(e);
		var mouse = this.crossBrowserMousePos(e);
		return {
			'x': mouse.x - element.x,
			'y': mouse.y - element.y
		};
	}
}

/**
 * Listener für den Drag Vorgang.
 */
class DragListener extends EventDispatchListener {
    constructor(model,view,command){
        super(model,view,command);
    }

    /**
     * Wird aufgerufen wenn, der Drag Vorgang gestartet wird.
     * @param {*} e 
     */
    dragStart(e){
        throw new exceptions.AbstractMethodException('Please create a subclass from DragListener and implement the dragStart Method');
    }

    /** 
     * Wird aufgerufen wenn, der Drag Vorgang beendet ist.
     */
    dragEnd(e){
        throw new exceptions.AbstractMethodException('Please create a subclass from DragListener and implement the dragEnd Method');
    }
}

class DropListener extends EventDispatchListener {
	constructor(model,view,command){
		super(model,view,command);
	}

	dragEnter(e){
		throw new exceptions.AbstractMethodException('Please create a subclass from DragListener and implement the dragStart Method');	
	}

	dragLeave(e){
		throw new exceptions.AbstractMethodException('Please create a subclass from DragListener and implement the dragEnd Method');
	}

}

module.exports.MouseListener = MouseListener;
module.exports.DragListener = DragListener;
module.exports.DropListener = DropListener;
module.exports.KeyListener = KeyListener;
module.exports.EventDispatchListener = EventDispatchListener;