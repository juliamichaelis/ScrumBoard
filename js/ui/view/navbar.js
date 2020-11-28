var observerPattern = require('../../pattern/observer.js');

class NavbarView extends observerPattern.Observer{

    constructor(){
        super();
    }

    update(...params){
        var id = params[0];
        var navbar = document.getElementById(id);
        if(navbar != undefined){
            navbar.innerHTML ="";
        }
        else{
            navbar = document.createElement("nav");
            navbar.setAttribute("id", id);
            navbar.setAttribute("class","navbar");
        }
        document.body.appendChild(navbar);
    }
}

class NavIconView extends observerPattern.Observer{
    constructor(){
        super();
    }

    update(...params){
        var id = params[0];
        var text = params[1];
        var title = params[2];
        var parentId = params[3];
        var span = document.createElement("span");
        span.setAttribute("id",id);
        span.setAttribute("title",title);
        span.addEventListener("click",function(e){});
        span.innerHTML = text;
        var navbar = document.getElementById(parentId);
        navbar.appendChild(span);
    }
}
module.exports.NavbarView = NavbarView;
module.exports.NavIconView = NavIconView;