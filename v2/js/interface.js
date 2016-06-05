//Original code from: https://alexatnet.com/articles/model-view-controller-mvc-javascript


/**
 * The Model. Model stores items and notifies
 * observers about changes.
 */
function InterfaceModel(icons) {
    this._characterControllers = [];
    this._icons = icons; //All the posisble icons to select from
    this._selectedIcon = "glyphicon-heart"; //Currently selected icon
    this._currentName = "";
    this._currentHealth = 0;

    //    this.itemAdded = new Event(this);
    //    this.itemRemoved = new Event(this);
    this.selectedIconChanged = new Event(this);
    //this.characterAdded = new Event(this);
}

InterfaceModel.prototype = {
    getIcons: function () {
        return [].concat(this._icons);
    },

    getCharacterControllers: function () {
        return this._characterControllers;
    },

    getSelectedIcon: function () {
        return this._selectedIcon;
    },

    setSelectedIcon: function (index) {
        console.log("New index: " + index);

        this._selectedIcon = index;
        this.selectedIconChanged.notify({
            current: index
        });
    },
    
    setCurrentName: function(n){
     this._currentName = n;   
    },
    
    setCurrentHealth: function(n){
        console.log(n);
     this._currentHealth = n;   
    },
    
    addNewCharacter : function() {
        var r = AddNewEntity({
            icon: this._selectedIcon,
            charname : this._currentName,
            maxhp : this._currentHealth
        });
        if (typeof(r) == EntityController){
         this._characterControllers.push(r);   
        }
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

    this.iconSelected = new Event(this);
    this.addEntityButtonClicked = new Event(this);
    this.nameChanged = new Event(this);
    this.healthChanged = new Event(this);

    var _this = this;

    // attach model listeners

    //    this._model.hpChanged.attach(function () {
    //        _this.rebuildEntity();
    //    });

    //    this._model.itemAdded.attach(function () {
    //        _this.rebuildList();
    //    });
    //    this._model.itemRemoved.attach(function () {
    //        _this.rebuildList();
    //    });


    var list, items, key;
    list = this._elements.list; // The html element holding the list
    list.html('');

    items = this._model.getIcons();

    for (key in items) {
        if (items.hasOwnProperty(key)) {
            list.append('<li><span class="glyphicon ' + items[key] + '"></span></li>');
        }
    }

    //Assign click notifiers to each possible icon
    this._elements.list.find("span").click(function (e) {
        console.log("Clicked: " + e.currentTarget.classList[1]);
        _this.iconSelected.notify({
            index: e.currentTarget.classList[1]
        });
    });
    
    //Asign change notifier to name and health text fields
    
    $("#character-name").change(function(){
     _this.nameChanged.notify({name : $(this).val()});
    });
    
    $("#character-health").change(function(){
     _this.healthChanged.notify({health : $(this).val()});
    });
    
    
    this.iconSelected.attach(function (sender, args){
       _this.updateSelectedIcon(args.index);
    });


    //    this._elements.list.change(function (e) {
    //        _this.iconSelected.notify({
    //            index: e.target.selectedIcon
    //        });
    //    });

    this._elements.addButton.click(function () {
        _this.addEntityButtonClicked.notify();
    });
    //    this._elements.delButton.click(function () {
    //        _this.delButtonClicked.notify();
    //    });
}

InterfaceView.prototype = {
    updateSelectedIcon: function(i) {
           $("#current-glyph").removeClass().addClass("glyphicon "+i);
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

    this._view.addEntityButtonClicked.attach(function () {
        _this._model.addNewCharacter();
    });
    
    this._view.nameChanged.attach(function (sender, args){
     _this._model.setCurrentName(args.name);
    });
    
    this._view.healthChanged.attach(function (sender, args){
     _this._model.setCurrentHealth(args.health);
    });

    this._view.iconSelected.attach(function (sender, args) {
        _this.updateSelected(args.index);
    });
    //
    //    this._view.addButtonClicked.attach(function () {
    //        _this.addItem();
    //    });

    //    this._view.delButtonClicked.attach(function () {
    //        _this.changeHp(-1);
    //    });
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

    //    changeHp: function (value) {
    //        this._model.changeHp(value);
    //    }

    updateSelected: function (index) {
        this._model.setSelectedIcon(index);
    }
};


function addInterface() {
    var model = new InterfaceModel(['glyphicon-heart', 'glyphicon-fire']),
        view = new InterfaceView(model, {
            'list': $('#glyph-list'),
            'addButton': $('#add-char-button')
        }),
        controller = new InterfaceController(model, view);

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
