var loader = new function()
{
    var me = this;
    
    this.scripts = [
        "/javascripts/models/model.js",
        "/javascripts/models/game_field.js",
        "/javascripts/models/cell.js",
        "/javascripts/models/timer.js",

        "/javascripts/views/view.js",
        "/javascripts/views/game_field.js",
        "/javascripts/views/cell.js",

        "/javascripts/view_model/view_model.js",

        "/javascripts/index.js"
    ];
    
    this.counter = 0;
	
    
    this.load = function()
    {
        if (this.counter <= this.scripts.length - 1) {
            var script = document.createElement("script");
            script.src = location.protocol + "//" + location.host + this.scripts[this.counter];
            script.onload = function()
            {
                me.load();
            };

            this.counter += 1;

            document.getElementsByTagName("head")[0].appendChild(script);
        }
        
        return this;
    };
};

loader.load();