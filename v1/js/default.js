function Entity(name, type, maxhealth) {
    this.name = name;
    this.type = type;
    this.maxHealth = maxhealth;
    
//    this.element = '<div class="entity '+this.type+'"><span class="glyphicon glyphicon-heart" aria-hidden="true"></span>'+this.name+'<div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="'+this.maxHealth+'" aria-valuemin="0" aria-valuemax="'+this.maxHealth+'" style="width: 100%;"></div></div></div>';
    
    
    this.leftcol = '<div class="left-column"><span class="glyphicon glyphicon-heart" aria-hidden="true"></span></div>'
    this.rightcol = '<div class="right-column"><div class="name">'+this.name+'</div><div class="progress">'+
        '<div class="progress-bar" role="progressbar" aria-valuenow="'+this.maxHealth+
        '" aria-valuemin="0" aria-valuemax="'+this.maxHealth+'" style="width: 100%;">'+this.maxHealth+"/"+this.maxHealth+'</div>'+
        '</div><span class="glyphicon glyphicon-plus" aria-hidden="true"></span>'+
        '<span class="glyphicon glyphicon-minus" aria-hidden="true"></span></div>';
    
    this.element = '<div class="entity '+this.type+'">'+this.leftcol+this.rightcol+'</div>';
    
    $("#main-container").append(this.element);
    
    
    
    
    
    
//    this.element.classList.add("entity");
//    this.element.classList.add(this.type);
//
//    this.glyph = document.createElement("span");
//    this.glyph.classList.add("glyphicon", "glyphicon-heart");
//
//    this.healthBar = document.createElement("div");
//    this.healthBar.classList.add("progress");
//    this.healthBar.appendChild(document.createElement("div"));
//    this.healthBar.childNodes[0].classList.add("progress-bar");
//    this.healthBar.children[0].setAttribute("role", "progressbar");
//    this.healthBar.children[0].setAttribute("aria-valuenow", "100");
//    this.healthBar.children[0].setAttribute("aria-valuemin", "0");
//    this.healthBar.children[0].setAttribute("aria-valuemax", "100");
//    this.healthBar.children[0].setAttribute("style", "width: 60%");
//
//    this.element.appendChild(this.glyph);
//    this.element.innerHTML += this.name; //Security vulnerability! 
//    this.element.appendChild(this.healthBar);
}


Entity.prototype.showHealthBar = function () {
    Element.select(".health").show();
}

Entity.prototype.hideHealthBar = function () {
    Element.select(".health").hide();
}