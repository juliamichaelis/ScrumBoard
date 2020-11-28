var columnV = require('../view/column.js');
var columnM = require('../model/column.js');
var columnCtrl = require('../ctrl/column.js');
var eventDispatcher = require("../../system/EventDispatcher.js");

class ColumnBuilder {
    constructor(name){
        this.model = new columnM.ColumnModel(undefined,name);
        this.view = new columnV.ColumnView();
        this.model.attach(this.view);

        var eventDis = eventDispatcher.EventDispatcher.getInstance();

        eventDis.addEventHandler(new columnCtrl.ColumnListener(this.model,this.view));
        eventDis.addEventHandler(new columnCtrl.ColumnMinListener(this.model,this.view));
        eventDis.addEventHandler(new columnCtrl.ColumnDeleteListener(this.model,this.view));
        eventDis.addEventHandler(new columnCtrl.ColumnAddCardListener(this.model,this.view));
        eventDis.addEventHandler(new columnCtrl.ColumnConfigListener(this.model,this.view));
        eventDis.addEventHandler(new columnCtrl.ColumnDropListener(this.model,this.view));
        eventDis.addEventHandler(new columnCtrl.ColumnLeftListener(this.model,this.view));
        eventDis.addEventHandler(new columnCtrl.ColumnRightListener(this.model,this.view));
    }

    getModel(){
        return this.model;
    }
}

module.exports.ColumnBuilder = ColumnBuilder;