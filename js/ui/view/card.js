var observerPattern = require('../../pattern/observer.js');
var dialog = require("../view/dialog.js");

/**
 * Die HTML Anzeige einer Karte auf einer Spalte.
 */
class CardView extends observerPattern.Observer {
    /**
     * Erzeugt eine View
     */
    constructor(){
        super();
    }

    /**
     * Wird aufgerufen um die View auf die HTML Seite zu zeichnen.
     * @param  {...any} params - background, text, id, parentId
     */
    update(...params){
        console.log(params);
        var background = [0];
        var text = params[1];
        var id = params[2];
        var commentCount = params[4];
        var card = document.getElementById(id);
        var addToColumn = false;
        if(card == undefined){
            card = document.createElement('div');
            card.setAttribute('class','card');
            card.setAttribute('draggable','true')
            card.setAttribute('id', id);
            addToColumn=true;
        }
        else{
            card.innerHTML = "";
        }

        if(addToColumn){
            document.getElementById(params[3]).appendChild(card);   
            card.addEventListener("dragstart",function(e){});
            card.addEventListener("dragend",function(e){});
            card.addEventListener("dragover",function(e){event.stopPropagation()},false);
        }
        var cardHeader = document.createElement("div");
        cardHeader.setAttribute("class","card-header");
        cardHeader.setAttribute("id" , id + "/header");
        
       
        var cardContentDiv = document.createElement("div");
        cardContentDiv.setAttribute("style","height:100%; background-color:red;");
        var cardContent = document.createElement("textarea");
        cardContent.readOnly = true;
        cardContent.setAttribute("class","card-content");
        cardContent.setAttribute("placeholder", "Kurzbeschreibung");
        cardContent.setAttribute("rows","4");
        cardContent.setAttribute("id", id + "/content");
        cardContent.addEventListener("dragover",function(e){});
        cardContent.innerHTML = text;
        cardContent.addEventListener("keyup",function(e){});
        cardContentDiv.appendChild(cardContent);
        card.appendChild(cardHeader);
        card.appendChild(cardContentDiv);

        var cardconfig = document.createElement("span");
        cardconfig.setAttribute("class","card-config");
        cardconfig.setAttribute("id",id + "/config");
        cardconfig.innerHTML = "<img src='../icons/edit.png' style='vertical-align: bottom; height:20px' useCurrent='true'/>";
        cardconfig.addEventListener("click",function(e){});

        var cardDelete = document.createElement("span");
        cardDelete.setAttribute("class","card-delete");
        cardDelete.setAttribute("id",id + "/delete");
        cardDelete.innerHTML = "<img src='../icons/delete.png' style='vertical-align: bottom; height:20px' useCurrent='true'/>"
        cardDelete.addEventListener("click",function(e){});

        var cardcommentcount = document.createElement("span");
        cardcommentcount.setAttribute("class","comment-count");
        cardcommentcount.setAttribute("title","Anzahl der Kommentare");
        cardcommentcount.innerHTML = commentCount;

        cardHeader.appendChild(cardconfig);
        cardHeader.appendChild(cardDelete);
        if(commentCount != undefined){
            cardHeader.appendChild(cardcommentcount);
        }
        cardHeader.addEventListener("dragover",function(e){event.stopPropagation()},false);
    }
}

/**
 * Die HTML Anzeige eines Drag einer Karte auf einer Spalte.
 */
class DragCardView extends observerPattern.Observer {
    /**
     * Erzeugt eine View
     */
    constructor(){
        super();
    }

    /**
     * Wird aufgerufen um die View auf die HTML Seite zu zeichnen.
     * @param  {...any} params - 
     */
    update(...params){

        var id = params[0];

        var parent = params[1];
        var card = document.getElementById(id);
        if(card == undefined){
            card = document.createElement('div');
            card.setAttribute('class','dragCard');
            card.setAttribute('id', id);
        }
        document.getElementById(parent).appendChild(card);
    }
}


module.exports.CardView = CardView;
module.exports.DragCardView = DragCardView;
