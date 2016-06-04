//Original code from: https://alexatnet.com/articles/model-view-controller-mvc-javascript

//List of Models??

function Event(sender) {
    this._sender = sender;
    this._listeners = [];
}

Event.prototype = {
    attach: function (listener) {
        this._listeners.push(listener);
    },
    notify: function (args) {
        var index;

        for (index = 0; index < this._listeners.length; index += 1) {
            this._listeners[index](this._sender, args);
        }
    }
};

/**
 * The Model. Model stores items and notifies
 * observers about changes.
 */
function EntityModel(items) {
    this._charname = items.charname;
    this._id = items.id;
    this._maxHp = items.maxhp;
    this._currentHp = items.maxhp;

    this.hpChanged = new Event(this);

    //    this.itemAdded = new Event(this);
    //    this.itemRemoved = new Event(this);
    //    this.selectedIndexChanged = new Event(this);
}

EntityModel.prototype = {
    getId: function () {
        return this._id;
    },

    getCharname: function () {
        return this._charname;
    },

    getMaxHp: function () {
        return this._maxHp;
    },

    getCurrentHp: function () {
        return this._currentHp;
    },

    changeHp: function (value) {
        this._currentHp += value;
        if (this._currentHp > this._maxHp) {
            this._currentHp = this._maxHp;
        }
        this.hpChanged.notify({
            currentHp: this._currentHp,
            maxHp: this._maxHp
        });
    }
};

/**
 * The View. View presents the model and provides
 * the UI events. The controller is attached to these
 * events to handle the user interraction.
 */
function EntityView(model, elements) {
    this._model = model;
    this._elements = elements;

    this.addButtonClicked = new Event(this);
    this.delButtonClicked = new Event(this);

    var _this = this;

    // attach model listeners

    this._model.hpChanged.attach(function () {
        _this.rebuildEntity();
    });

    //    this._model.itemAdded.attach(function () {
    //        _this.rebuildList();
    //    });
    //    this._model.itemRemoved.attach(function () {
    //        _this.rebuildList();
    //    });

    // attach listeners to HTML controls
    //    this._elements.id.change(function (e) {
    //        _this.listModified.notify({
    //            index: e.target.selectedIndex
    //        });
    //    });
    this._elements.addButton.click(function () {
        _this.addButtonClicked.notify();
    });
    this._elements.delButton.click(function () {
        _this.delButtonClicked.notify();
    });
}

EntityView.prototype = {
    show: function () {
        this.rebuildEntity();
    },

    rebuildEntity: function () {
        var list, items, key;

        var source = $("#entity-progress-template").html();
        var template = Handlebars.compile(source);
        var context = {
            currenthp: this._model.getCurrentHp(),
            maxhp: this._model.getMaxHp()
        };
        var html = template(context);
        $(this._elements.id.selector).find(".progress").html(html);
    }
};

/**
 * The Controller. Controller responds to user actions and
 * invokes changes on the model.
 */
function EntityController(model, view) {
    this._model = model;
    this._view = view;

    var _this = this;

    this._view.addButtonClicked.attach(function () {
        _this.changeHp(1);
    });

    //    this._view.listModified.attach(function (sender, args) {
    //        _this.updateSelected(args.index);
    //    });
    //
    //    this._view.addButtonClicked.attach(function () {
    //        _this.addItem();
    //    });

    this._view.delButtonClicked.attach(function () {
        _this.changeHp(-1);
    });
}

EntityController.prototype = {
    //    addItem: function () {
    //        var item = window.prompt('Add item:', '');
    //        if (item) {
    //            this._model.addItem(item);
    //        }
    //    },
    //
    //    delItem: function () {
    //        var index;
    //
    //        index = this._model.getSelectedIndex();
    //        if (index !== -1) {
    //            this._model.removeItemAt(this._model.getSelectedIndex());
    //        }
    //    },

    changeHp: function (value) {
        this._model.changeHp(value);
    }

    //    updateSelected: function (index) {
    //        this._model.setSelectedIndex(index);
    //    }
};


//Overkill function to generate a random id. Could just have a global variable which counts up. This is more fun though. Function from: http://stackoverflow.com/a/105074
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

var characterControllers = [];

function AddNewEntity() {
    var newId = 1;

    var data = {
        charname: "Travis",
        id: newId,
        maxhp: 50
    };

    $("body").append("<div id=" + newId + "></div>");

    var source = $("#entity-template").html();
    var template = Handlebars.compile(source);
    var context = {
        id: newId,
        charname: data.charname,
        currenthp: data.maxhp,
        maxhp: data.maxhp
    };
    var html = template(context);
    $('#' + newId).html(html);

    var model = new EntityModel(data),
        view = new EntityView(model, {
            'id': $('#' + newId),
            'addButton': $('body').find('.glyphicon-plus'), //Need to figure out how to set these BEFORE it's drawn
            'delButton': $('body').find('.glyphicon-minus')
//            'addButton': $('#' + newId).find('.glyphicon-plus'), //Need to figure out how to set these BEFORE it's drawn
//            'delButton': $('#' + newId).find('.glyphicon-minus')
        }),
        controller = new EntityController(model, view);

    view.show();

    characterControllers.push(controller);
    
    //$(".entity").draggable();
}

/*
$(function () {
    var model = new EntityModel(['PHP', 'JavaScript']),
        view = new ListView(model, {
            'list': $('#list'),
            'addButton': $('#plusBtn'),
            'delButton': $('#minusBtn')
        }),
        controller = new ListController(model, view);

    view.show();
});
*/