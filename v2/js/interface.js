//Original code from: https://alexatnet.com/articles/model-view-controller-mvc-javascript


/**
 * The Model. Model stores items and notifies
 * observers about changes.
 */
function InterfaceModel(icons) {
    this._characterControllers = [];
    this._icons = icons; //All the posisble icons to select from

    //    this.itemAdded = new Event(this);
    //    this.itemRemoved = new Event(this);
    this.selectedIndexChanged = new Event(this);
    this.characterAdded = new Event(this);
}

InterfaceModel.prototype = {
    getIcons: function () {
     return [].concat(this._icons);   
    },
    
    getCharacterControllers: function(){
     return this._characterControllers;   
    }
};

/**
 * The View. View presents the model and provides
 * the UI events. The controller is attached to these
 * events to handle the user interaction.
 */
function InterfaceView(model, elements) {
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

InterfaceView.prototype = {
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
function InterfaceController(model, view) {
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

InterfaceController.prototype = {
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
