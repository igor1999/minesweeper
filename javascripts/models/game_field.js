model.gameField = new function()
{
    this.viewModel = null;

    this.width         = null;
    this.height        = null;
    this.numberOfMines = null;

    this.bounds = {
        width: {min: 10, max: 20},
        height: {min: 10, max: 20},
        percentOfMines: {min: 0.1, max: 0.2}
    };

    this.cells = [];
    this.timer = null;

    this.inGame = false;
    this.numberOfFreeCells = 0;

    this.states = {on: "on", exploded: "exploded", win: "win"};


    this.construct = function(viewModel, width, height, numberOfMines)
    {
        this.viewModel = viewModel;

        this.width  = this.prepareSize(width, this.bounds.width.min, this.bounds.width.max);
        this.height = this.prepareSize(height, this.bounds.height.min, this.bounds.height.max);

        var minimumOfMines = Math.round(this.width*this.height*this.bounds.percentOfMines.min);
        var maximumOfMines = Math.round(this.width*this.height*this.bounds.percentOfMines.max);

        this.numberOfMines = this.prepareSize(numberOfMines, minimumOfMines, maximumOfMines);

        this.timer = new model.Timer().construct(this);

        return this;
    };

    this.prepareSize = function(size, lowerBound, upperBound)
    {
        size = Math.round(parseInt(size));

        switch (true) {
            case size < lowerBound:
                size = lowerBound;
            break;
            case size > upperBound:
                size = upperBound;
            break;
        }

        return size;
    };

    this.build = function()
    {
        for (var x = 0; x <= this.width - 1; x ++) {
            this.cells[x] = [];

            for (var y = 0; y <= this.height - 1; y ++) {
                this.cells[x][y] = new model.Cell().construct(this, x, y);
            }
        }

        this.viewModel.executeViewMethod("build", [this.width, this.height]);

        return this;
    };

    this.isInGame = function()
    {
        return this.inGame;
    };

    this.startGame = function()
    {
        this.inGame = true;

        this.initCells().createMines();

        this.numberOfFreeCells = this.width*this.height-this.numberOfMines;

        this.timer.start();

        this.changeGameState(null);

        return this;
    };

    this.initCells = function()
    {
        for (var x = 0; x <= this.width - 1; x ++) {
            for (var y = 0; y <= this.height - 1; y ++) {
                this.cells[x][y].setStartState();
            }
        }

        return this;
    };

    this.createMines = function()
    {
        var cellsPull = [];

        for (var x = 0; x <= this.width - 1; x ++) {
            for (var y = 0; y <= this.height-1; y ++) {
                cellsPull.push(this.cells[x][y]);
            }
        }

        for (var m = 1; m <= this.numberOfMines; m ++) {
            var index = Math.floor(Math.random()*cellsPull.length);

            cellsPull[index].setMine(true);
            cellsPull.splice(index, 1);
        }

        return this;
    };

    this.openCell = function(x, y)
    {
        if (this.inGame && this.cells[x][y].open()) {
            this.numberOfFreeCells -= 1;

            if (this.numberOfFreeCells === 0) {
                this.winGame();
            }
        }

        return this;
    };

    this.getNeighbors = function(x, y)
    {
        var neighbors = [];

        for (var i = x - 1; i <= x + 1; i ++) {
            for (var j = y - 1; j <= y + 1; j ++) {
                if (i >= 0 && i <= this.width - 1 && j >= 0 && j <= this.height - 1 && (i !== x || j !== y)) {
                    neighbors.push(this.cells[i][j]);
                }
            }
        }

        return neighbors;
    };

    this.explode = function()
    {
        if (this.inGame) {
            for (var x = 0; x <= this.width - 1; x ++) {
                for (var y = 0; y <= this.height - 1; y ++) {
                    this.cells[x][y].explode();
                }
            }
        }

        this.inGame = false;

        this.changeGameState(false);

        return this;
    };

    this.winGame = function()
    {
        this.inGame = false;

        this.changeGameState(true);

        return this;
    };

    this.changeCellState = function(x, y, state)
    {
        this.viewModel.executeViewMethod("changeCellState", [x, y, state]);

        return this;
    };

    this.changeTimerState = function(counter)
    {
        this.viewModel.executeViewMethod("changeTimerState", [counter]);

        return this;
    };

    this.changeGameState = function(winOrLose)
    {
        this.viewModel.executeViewMethod("changeGameState", [this.getGameState(winOrLose)]);

        return this;
    };

    this.getGameState=function(winOrLose)
    {
        var state;

        switch (true) {
            case this.inGame:
                state = this.states.on;
            break;
            case winOrLose:
                state = this.states.win;
            break;
            default:
                state = this.states.exploded;
            break;
        }

        return state;
    };
};