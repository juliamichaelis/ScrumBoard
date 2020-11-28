var observerPattern = require('../../pattern/observer.js');

/**
 * Die Anzeige für ein Board
 */
class BoardView extends observerPattern.Observer {
    /** Erzeugt die View */
    constructor(){
        super();
    }

    /**
     * Wird aufgerufen um die View auf die HTML Seite zu zeichnen.
     * @param  {...any} params 
     */
    update(...params){
        document.getElementById('board').innerHTML='';
    }
}

module.exports.BoardView = BoardView;