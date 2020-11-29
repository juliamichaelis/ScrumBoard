var boardM = require("../js/ui/model/board.js");
var boardV = require("../js/ui/view/board.js");
var eventDispatcher = require("../js/system/EventDispatcher");
var navbarM = require("../js/ui/model/navbar.js");
var navbarV = require("../js/ui/view/navbar.js");
var navbarC = require("../js/ui/ctrl/navbar.js");
var project = require("../js/system/project.js");
var timer = require("../js/system/timer.js");

var ipc = require("../js/ui/ctrl/ipcListenerRenderer.js");



function init(){
<<<<<<< HEAD
    console.log("init")
=======
>>>>>>> 05a04a12c3f5caae3cfceebd337d45b28d916761
    var EventProxy = require('dom-event-proxy');
    const eventproxy = new EventProxy()
    
    eventproxy.callback = function(event){
        eventDispatcher.EventDispatcher.getInstance().dispatch(event,event.target.getAttribute("useCurrent"));
    }
    var eventDis = eventDispatcher.EventDispatcher.getInstance();

    var navM = new navbarM.NavbarModel();
    var navV = new navbarV.NavbarView();
    navM.attach(navV);

    var newFileM = new navbarM.NavIconModel("<img src='../icons/new.png' style='vertical-align: bottom;height: 20px;' useCurrent='true'/>","Neue Datei anlegen");
    var newFileV = new navbarV.NavIconView();
    newFileM.attach(newFileV);
    eventDis.addEventHandler(new navbarC.NewListener(newFileM,newFileV));
    navM.add(newFileM);

    var saveFileM = new navbarM.NavIconModel("<img src='../icons/save.png' style='vertical-align: bottom;height: 20px;' useCurrent='true'/>","Speichern");
    var saveFileV = new navbarV.NavIconView();
    saveFileM.attach(saveFileV);
    eventDis.addEventHandler(new navbarC.SaveListener(saveFileM,saveFileV));
    navM.add(saveFileM);

    var openFileM = new navbarM.NavIconModel("<img src='../icons/open.png' style='vertical-align: bottom;height: 20px;' useCurrent='true'/>","Öffnen");
    var openFileV = new navbarV.NavIconView();
    openFileM.attach(openFileV);
    eventDis.addEventHandler(new navbarC.LoadListener(openFileM,openFileV));
    navM.add(openFileM);

    var undoM = new navbarM.NavIconModel("<img src='../icons/undo.png' style='vertical-align: bottom;height: 20px;' useCurrent='true'/>","Rückgängig");
    var undoV = new navbarV.NavIconView();
    undoM.attach(undoV);
    eventDis.addEventHandler(new navbarC.UndoListener(undoM,undoV));
    navM.add(undoM);

    var redoM = new navbarM.NavIconModel("<img src='../icons/redo.png' style='vertical-align: bottom;height: 20px;' useCurrent='true'/>","Wiederholen");
    var redoV = new navbarV.NavIconView();
    redoM.attach(redoV);
    eventDis.addEventHandler(new navbarC.RedoListener(redoM,redoV));
    navM.add(redoM);

    var addColumnM = new navbarM.NavIconModel("<img src='../icons/add.png' style='vertical-align: bottom;height: 20px;' useCurrent='true'/>","Spalte hinzufügen");
    var addColumnV = new navbarV.NavIconView();
    addColumnM.attach(addColumnV);
    eventDis.addEventHandler(new navbarC.AddColumnEventListener(addColumnM,addColumnV));
    navM.add(addColumnM);

    var exitM = new navbarM.NavIconModel("<img src='../icons/exit.png' style='vertical-align: bottom;height: 20px;' useCurrent='true'/>","Anwendung beenden");
    var exitV = new navbarV.NavIconView();
    exitM.attach(exitV);
    navM.add(exitM);
    eventDis.addEventHandler(new navbarC.ExitListener(exitM,exitV));
    navM.notify();

    var projectModul = project.Project.getInstance();
    var boardView = new boardV.BoardView();
    var boardModel = new boardM.BoardModel();
    boardModel.attach(boardView);
    projectModul.setBoard(boardModel);
    boardModel.notify();
    timer.enableSaveTimer();
}

