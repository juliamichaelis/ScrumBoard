var observerPattern = require('../../pattern/observer.js');
var exceptions = require("../../exceptions/exceptions.js")
/**
 * Anzeige für einen Fragendialog
 */
class QuestionDialogView extends observerPattern.Observer{
    constructor(){
        super();
    }

    /**
     * Wird aufgerufen um die View auf die HTML Seite zu zeichnen.
     * @param  {...any} params - id, head, text
     */
    update(...params){
        var id = params[0];
        var head = params[1];
        var text = params[2];
    
        var body = document.getElementsByTagName('body')[0];
    
        var dialog = document.createElement("dialog");
        dialog.setAttribute("id",id);
        body.appendChild(dialog);

        var headText = document.createElement("div");
        headText.innerHTML = head;
        headText.setAttribute('class','dialog-header')
        dialog.appendChild(headText);

        var dialogContent = document.createElement("div");
        dialogContent.setAttribute('class','dialog-content');  
        dialogContent.innerHTML=text;
        dialog.appendChild(dialogContent);

        var buttonDiv = document.createElement("div");
        buttonDiv.setAttribute('class','dialog-button-div');
        dialog.appendChild(buttonDiv);

        var noButton = document.createElement("button");
        noButton.setAttribute("class","dialog-button");
        noButton.innerHTML="Nein &#10006;";
        
        noButton.addEventListener("click",function(e){
            dialog.returnValue = "no";
            dialog.close();
        });

        var yesButton = document.createElement("button");
        yesButton.innerHTML="Ja &#10004;"
        yesButton.setAttribute("class","dialog-button");
        yesButton.addEventListener("click",function(e){
            dialog.returnValue = "yes";
            dialog.close();
        });
        buttonDiv.appendChild(yesButton);
        buttonDiv.appendChild(noButton);
        dialog.addEventListener("close",function(e){})
    }
}

/**
 * Anzeige für einen Fragendialog
 */
class PromptDialogView extends observerPattern.Observer{
    constructor(){
        super();
    }

    /**
     * Wird aufgerufen um die View auf die HTML Seite zu zeichnen.
     * @param  {...any} params - id, head, text
     */
    update(...params){
        var id = params[0];
        var head = params[1];
        var text = params[2];
    
        var body = document.getElementsByTagName('body')[0];
    
        var dialog = document.createElement("dialog");
        dialog.setAttribute("id",id);
        body.appendChild(dialog);

        var headText = document.createElement("div");
        headText.innerHTML = head;
        headText.setAttribute('class','dialog-header')
        dialog.appendChild(headText);

        var dialogContent = document.createElement("div");
        var spanText = document.createElement("span");
        spanText.innerHTML = text;
        var spanInput = document.createElement("span");
        dialogContent.appendChild(spanText);
        dialogContent.appendChild(spanInput);
        var input = document.createElement("input");
        input.setAttribute("id" , id + "/input");
        input.setAttribute("class", "dialog-input");
        spanInput.appendChild(input);
        dialogContent.setAttribute('class','dialog-content');  
        dialog.appendChild(dialogContent);

        var buttonDiv = document.createElement("div");
        buttonDiv.setAttribute('class','dialog-button-div');
        dialog.appendChild(buttonDiv);

        var noButton = document.createElement("button");
        noButton.setAttribute("class","dialog-button");
        noButton.innerHTML="Abbrechen &#10006;";
        
        noButton.addEventListener("click",function(e){
            dialog.returnValue = "cancel";
            dialog.close();
        });

        var yesButton = document.createElement("button");
        yesButton.innerHTML="Ok &#10004;"
        yesButton.setAttribute("class","dialog-button");
        yesButton.addEventListener("click",function(e){
            dialog.returnValue = "ok";
            dialog.close();
        });
        buttonDiv.appendChild(yesButton);
        buttonDiv.appendChild(noButton);
        dialog.addEventListener("close",function(e){})
    }
}

class ErrorDialogView extends observerPattern.Observer{
    constructor(){
        super();
    }

    /**
     * Wird aufgerufen um die View auf die HTML Seite zu zeichnen.
     * @param  {...any} params - id, head, text
     */
    update(...params){
        var id = params[0];
        var head = params[1];
        var text = params[2];
    
        var body = document.getElementsByTagName('body')[0];
    
        var dialog = document.createElement("dialog");
        dialog.setAttribute("id",id);
        body.appendChild(dialog);

        var headText = document.createElement("div");
        headText.innerHTML = head;
        headText.setAttribute('class','dialog-header')
        dialog.appendChild(headText);

        var dialogContent = document.createElement("div");
        dialogContent.setAttribute('class','dialog-content');  
        dialogContent.innerHTML=text;
        dialog.appendChild(dialogContent);

        var buttonDiv = document.createElement("div");
        buttonDiv.setAttribute('class','dialog-button-div');
        dialog.appendChild(buttonDiv);

        var yesButton = document.createElement("button");
        yesButton.innerHTML="Ok &#10004;"
        yesButton.setAttribute("class","dialog-button");
        yesButton.addEventListener("click",function(e){
            dialog.close();
        });
        buttonDiv.appendChild(yesButton);
        dialog.addEventListener("close",function(e){})
    }    
}

class CardConfigDialogView extends observerPattern.Observer{
    constructor(){
        super();
    }

    /**
     * Wird aufgerufen um die View auf die HTML Seite zu zeichnen.
     * @param  {...any} params - id, card
     */
    update(...params){
        var id = params[0];
        var card = params[1];
        console.log(id);
        var oldDialog = document.getElementById(id);
        if(oldDialog != undefined){
            oldDialog.parentNode.removeChild(oldDialog);
            
        }
        
        var body = document.getElementsByTagName('body')[0];
    
        var dialog = document.createElement("dialog");
        dialog.setAttribute("id",id);
        body.appendChild(dialog);

        var headText = document.createElement("div");
        var headSpan = document.createElement("span");
        var headClose = document.createElement("span");
        headClose.setAttribute("class","dialog-close");
        headClose.setAttribute("title","Dialog schiessen");
        headClose.innerHTML = "&#10006;"
        headClose.setAttribute("id", id + "/close");
        headClose.addEventListener("click",function(e){});

        headSpan.innerHTML = "Bearbeiten der Karte";
        headSpan.setAttribute("class","dialog-name");
        headText.appendChild(headSpan);
        headText.appendChild(headClose);
        headText.setAttribute('class','dialog-header')
        dialog.appendChild(headText);
        this.addContent(dialog,card,id);


        dialog.showModal();
    }

    addContent(dialog,card,id){
        var dialogContent = document.createElement("div");
        dialogContent.setAttribute("id" , id + "/content");
        var spanText = document.createElement("div");
        spanText.innerHTML = "Kartentext:";
        var spanInput = document.createElement("div");
        dialogContent.appendChild(spanText);
        dialogContent.appendChild(spanInput);
        var input = document.createElement("textarea");
        input.disabled = true;
        input.value = card.text;
        input.setAttribute("id" , id + "/input");
        input.setAttribute("class", "dialog-input");
        spanInput.appendChild(input);
        dialogContent.setAttribute('class','dialog-content');  
       
        dialog.appendChild(dialogContent);
        var addDialog = document.createElement("div");
        addDialog.setAttribute("style","text-align:-webkit-center;");
        var addSpan = document.createElement("span");
        
        addSpan.innerHTML = "&#8853;";
        addSpan.setAttribute("title","Kommentar hinzufügen");
        addSpan.setAttribute("class","comment-add");
        addSpan.setAttribute("id",id + "/addComment");
        addSpan.addEventListener("click",function(e){
            dialog.returnValue = "newComment";
        });

        addDialog.appendChild(addSpan);
        dialogContent.appendChild(addDialog);
    
         
        
    }
}

class CardConfigCommentView extends observerPattern.Observer{
    constructor(){
        super();
    }

    /**
     * Wird aufgerufen um ein Kommentar auf die HTML Seite zu zeichnen.
     * @param  {...any} params - id, text, dialogContentId
     */
    update(...params){
        var id = params[0];
        var text = params[1];
        var dialogContentId = params[2];
        console.log("dialogContentId: " + dialogContentId);
        var dialogContent = document.getElementById(dialogContentId);
        var commentText = document.createElement("div");
        var commentHeading = document.createElement("div");
        commentHeading.setAttribute("class","dialog-header");
        
        var commentHeadingName = document.createElement("span");
        commentHeadingName.innerHTML = "Kommentar";
        commentHeadingName.setAttribute("class","dialog-name");
        commentHeading.appendChild(commentHeadingName);

        var commentHeadingDelete = document.createElement("span");
        commentHeadingDelete.setAttribute('id',id + "/delete");
        commentHeadingDelete.setAttribute("title","Kommentar löschen");
        commentHeadingDelete.setAttribute('class',"column-delete");
        commentHeadingDelete.innerHTML = "&#x274C";
        commentHeading.appendChild(commentHeadingDelete);
        commentHeadingDelete.addEventListener("click",function(e){});

        var commentInput = document.createElement("div");
        commentText.appendChild(commentHeading);
        commentText.appendChild(commentInput);
        var input = document.createElement("textarea");
        input.value = text;
        input.setAttribute("id" , id + "/input");
        input.setAttribute("class", "dialog-input");
        commentInput.appendChild(input);
        commentText.setAttribute('class','dialog-content');  
        dialogContent.appendChild(commentText);
        dialogContent.addEventListener("keyup",function(e){console.log(e.key)});    
    }
}
module.exports.QuestionDialogView = QuestionDialogView;
module.exports.PromptDialogView = PromptDialogView;
module.exports.ErrorDialogView = ErrorDialogView;
module.exports.CardConfigDialogView = CardConfigDialogView;
module.exports.CardConfigCommentView = CardConfigCommentView;
