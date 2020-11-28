var observerPattern = require('../../pattern/observer.js');

/**
 * Die Anzeige für eine Spalte auf dem Board.
 */
class ColumnView extends observerPattern.Observer {
    /** Erzeugt die View */
    constructor(){
        super();
    }

    /**
     * Wird aufgerufen um die View auf die HTML Seite zu zeichnen.
     * @param  {...any} params - open, background, name, id
     */
    update(...params){
        var open = params[0];
        var background = params[1];
        var name = params[2];
        var id = params[3];
        var board = document.getElementById('board');

        var column = document.getElementById(id);
        var addToBoard = false;
        if(column != undefined){
            column.innerHTML='';
        }
        else{
            addToBoard = true;
            var column = document.createElement("div");
        }

        if(!open){
            var span = document.createElement("span");
            column.setAttribute('id',id);
            column.setAttribute('class','closed-column');
            span.setAttribute('class','closed-column-name');
            span.innerHTML=name;
            column.appendChild(span);
            if(addToBoard){
                board.appendChild(column);
                column.addEventListener("click", function(e){});
                span.addEventListener("click", function(e){
                    column.click();
                }.bind(column))
                
            }
        }
        else{
            column.setAttribute('id',id);
            column.setAttribute('class',"column");


            var columnHeader = document.createElement('div');
            columnHeader.setAttribute('class',"column-header");


            var columnContent = document.createElement('div');
            columnContent.setAttribute('class','column-content')
            columnContent.setAttribute('id',id + "/content");
            columnContent.addEventListener("dragover", function(e){event.stopPropagation()},false);
            
            
            
            column.appendChild(columnHeader);
            column.appendChild(columnContent);

            var columnHeaderMin = document.createElement('span');
            columnHeaderMin.setAttribute('id',id + "/min");
            columnHeaderMin.setAttribute('title', 'Spalte minimieren');
            columnHeaderMin.setAttribute('class',"column-min");
            columnHeaderMin.innerHTML = "<img src='../icons/min.png' style='vertical-align: bottom; height:20px' useCurrent='true'/>";
            columnHeaderMin.addEventListener("click",function(e){e.stopPropagation()});

            var columnLeft = document.createElement('span');
            columnLeft.setAttribute('id', id + "/left");
            columnLeft.setAttribute('title', 'Spalte nach links verschieben');
            columnLeft.setAttribute('class','column-left');
            columnLeft.innerHTML = "<img src='../icons/left.png' style='vertical-align: bottom; height:20px' useCurrent='true'/>";
            columnLeft.addEventListener("click",function(e){});

            var columnRight = document.createElement('span');
            columnRight.setAttribute('id', id + "/right");
            columnRight.setAttribute('title', 'Spalte nach rechts verschieben');
            columnRight.setAttribute('class','column-right');
            columnRight.innerHTML = "<img src='../icons/right.png' style='vertical-align: bottom; height:20px' useCurrent='true'/>";
            columnRight.addEventListener("click",function(e){});
            
            var columnHeaderName = document.createElement('span');;
            columnHeaderName.setAttribute('id',id + "/name");
            columnHeaderName.setAttribute('class',"column-name");
            columnHeaderName.innerHTML = name;

            var columnHeaderDelete = document.createElement('span');
            columnHeaderDelete.setAttribute('id',id + "/delete");
            columnHeaderDelete.setAttribute("title","Spalte löschen");
            columnHeaderDelete.setAttribute('class',"column-delete");
            columnHeaderDelete.innerHTML = "<img src='../icons/delete.png' style='vertical-align: bottom; height:20px' useCurrent='true'/>";
            columnHeaderDelete.addEventListener("click",function(e){});

            var columnHeaderConfig = document.createElement('span');
            columnHeaderConfig.setAttribute('id',id + "/config");
            columnHeaderConfig.setAttribute('class',"column-config");
            columnHeaderConfig.setAttribute('title', "Spalte ändern");
            columnHeaderConfig.innerHTML = "<img src='../icons/edit.png' style='vertical-align: bottom; height:20px' useCurrent='true'/>";
            columnHeaderConfig.addEventListener("click",function(e){});

            var columnHeaderAddCard = document.createElement('span');
            columnHeaderAddCard.setAttribute('id',id + "/add-card");
            columnHeaderAddCard.setAttribute('class',"column-add-card");
            columnHeaderAddCard.setAttribute('title',"Neue Karte erstellen");
            columnHeaderAddCard.innerHTML = "<img src='../icons/add.png' style='vertical-align: bottom; height:20px' useCurrent='true'/>";
            columnHeaderAddCard.addEventListener("click",function(e){});

            columnHeader.appendChild(columnHeaderMin);
            columnHeader.appendChild(columnLeft);
            columnHeader.appendChild(columnRight);
            columnHeader.appendChild(columnHeaderName);
            columnHeader.appendChild(columnHeaderDelete);
            columnHeader.appendChild(columnHeaderConfig);
            columnHeader.appendChild(columnHeaderAddCard);
            
            if(addToBoard){
                column.addEventListener("click", function(e){});
                board.appendChild(column);
            }
        }
    }
}

module.exports.ColumnView = ColumnView;