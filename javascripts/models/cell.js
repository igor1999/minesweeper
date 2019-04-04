model.Cell = function()
{
    this.field = null;

    this.x = null;
    this.y = null;

    this.checked = false;
    this.mined   = false;

    this.numberOfMinedNeighbors = 0;

    this.states = {unchecked: "unchecked", checked: "checked", exploded: "exploded"};


    this.construct = function(field, x, y)
    {
        this.field = field;

        this.x = x;
        this.y = y;

        return this;
    };

    this.getX = function()
    {
        return this.x;
    };

    this.getY = function()
    {
        return this.y;
    };

    this.isChecked = function()
    {
        return this.checked;
    };

    this.setStartState = function()
    {
        this.checked = false;
        this.setMine(false);

        this.field.changeCellState(this.x, this.y, this.getState());

        return this;
    };

    this.isMined = function()
    {
        return this.mined;
    };

    this.setMine = function(value)
    {
        this.mined = !!value;

        return this;
    };

    this.explode = function()
    {
        this.checked=this.checked || this.mined;

        this.field.changeCellState(this.x, this.y, this.getState());

        return this;
    };

    this.open = function()
    {
        var isFreeCellOpened = this.checked === false && !this.mined;

        if (this.checked === false) {
            if (this.mined) {
                this.field.explode();
            }
            else {
                this.checked = true;

                var neighbors = this.field.getNeighbors(this.x, this.y);
                this.numberOfMinedNeighbors = this.getNumberOfMinedNeighbors(neighbors);

                this.field.changeCellState(this.x, this.y, this.getState());

                if ( this.numberOfMinedNeighbors === 0 ) {
                    for (var i = 0; i <= neighbors.length - 1; i ++) {
                        this.field.openCell(neighbors[i].getX(), neighbors[i].getY());
                    }
                }
            }
        }

        return isFreeCellOpened;
    };

    this.getNumberOfMinedNeighbors = function(neighbors)
    {
        var counter = 0;

        for (var i = 0; i <= neighbors.length - 1; i ++) {
            if (neighbors[i].isMined()) {
                counter += 1;
            }
        }

        return counter;
    };

    this.getState = function()
    {
        var state;

        switch (true) {
            case !this.checked:
                state = this.states.unchecked;
            break;
            case !this.mined:
                state = this.states.checked + this.numberOfMinedNeighbors;
            break;
            default:
                state = this.states.exploded;
            break;
        }

        return state;
    };
};