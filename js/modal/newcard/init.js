var remote = require("electron").remote
var electron = require("electron");
const uuidv1 = require('uuid/v1');
var modelId;
var commentsIds = [];

function init(){
    var win = remote.getCurrentWindow();
    var ipcrenderer = electron.ipcRenderer;
    ipcrenderer.on('newcard', (event,args) => {
        modelId = args[0];
    })
}

function cancel(){
    var window = remote.getCurrentWindow(); 
    window.close();
    window = null;
}

function save(){
    
    var parent = remote.getCurrentWindow().getParentWindow();
    var abstract = document.getElementById("abstract").value;
    var ipcrenderer = electron.ipcRenderer;
    var comments = [];
    commentsIds.forEach(function(element){
        var commentTextArea = document.getElementById(element + "/textarea");
        comments.push(commentTextArea.value);
    })
    ipcrenderer.sendTo(parent.webContents.id, "newcard", [abstract,modelId,comments]);
    var window = remote.getCurrentWindow();
    window.close();
    window = null;
}

function insertComment(){
    var uuid = uuidv1();
    console.log(uuid);
    var comment_div = document.createElement("div");
    comment_div.setAttribute("class","comment-div");
    comment_div.setAttribute("id", uuid + "/comment-div");

    var textarea_label_span = document.createElement("span");
    textarea_label_span.setAttribute("class","text-span");
    textarea_label_span.innerHTML="Kommentar";

    var img_span = document.createElement("span");
    img_span.setAttribute("class","img-span");
    img_span.addEventListener("click",function(){console.log(uuid);deleteComment(uuid)}.bind(uuid),false);

    var img_span_img = document.createElement("img");
    img_span_img.setAttribute("class","commentDelete");
    img_span_img.setAttribute("src","../../icons/delete.png");
    img_span_img.addEventListener("click",function(){console.log(uuid);deleteComment(uuid)}.bind(uuid),false);

    img_span.appendChild(img_span_img);

    comment_div.appendChild(textarea_label_span);
    comment_div.appendChild(img_span);

    var textarea = document.createElement("textarea");
    textarea.setAttribute("class","comment");
    textarea.setAttribute("id", uuid + "/textarea");

    var texts = document.getElementById("textarea");
    texts.appendChild(comment_div);
    texts.appendChild(textarea);
    commentsIds.push(uuid);
}

function deleteComment(uuid){
    console.log("delete uuid:" + uuid);
    var texts = document.getElementById("textarea");
    var comment_div = document.getElementById(uuid + "/comment-div");
    console.log(comment_div);
    var textarea = document.getElementById(uuid + "/textarea");
    console.log(textarea);
    texts.removeChild(comment_div);
    texts.removeChild(textarea);
    commentsIds = commentsIds.filter(function(value,index,arr){
        return value != uuid;
    })
}

function enter(){
    console.log(event);
    console.log("enter");
    if(event.keyCode==13){
        save();
    }
}