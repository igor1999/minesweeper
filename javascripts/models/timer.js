model.Timer = function() 
{
    var me = this;

    this.field = null;

    this.counter = 0;

    this.gameNumber = 0;


    this.construct = function(field) 
    {
        this.field = field;

        return this;
    };

    this.start = function() 
    {
        this.counter = 0;
        this.gameNumber += 1;

        this.field.changeTimerState(this.counter);

        this.setTimeout(this.gameNumber);

        return this;
    };

    this.tick = function(gameNumber) 
    {
        if (this.field.isInGame() && gameNumber === this.gameNumber) {
            this.counter += 1;

            this.field.changeTimerState(this.counter);

            this.setTimeout(gameNumber);
        }

        return this;
    };

    this.setTimeout = function(gameNumber) 
    {
        window.setTimeout(
            function() {
                me.tick(gameNumber);
            },
            1000
        );

        return this;
    };
};