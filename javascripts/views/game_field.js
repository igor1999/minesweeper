view.gameField = new function()
{
    var me = this;

    this.viewModel = null;

    this.cover          = null;
    this.cellsContainer = null;
    this.timerTextBox   = null;
    this.startButton    = null;

    this.cells = [];
    this.timer = null;

    this.states = {on: "on", exploded: "exploded", win: "win"};


    this.construct = function(viewModel, gamebox)
    {
        this.viewModel = viewModel;

        this.cover = gamebox.querySelector("div[name=cover]");
        this.cellsContainer = gamebox.querySelector("div[name=field]");
        this.timerTextBox = gamebox.querySelector("input[name=timer]");
        this.startButton = gamebox.querySelector("input[name=startButton]");

        this.startButton.onclick=function()
        {
            me.clickOnStartButton();
        };

        return this;
    };

    this.build = function(width, height)
    {
        var table = document.createElement("table");

        this.cellsContainer.appendChild(table);

        for (var y = 1; y <= height; y ++) {
            var row = table.insertRow(0);

            for (var x = 1; x <= width; x ++) {
                 row.insertCell(0);
            }
        }

        for (y = 0; y <= height - 1; y ++) {
            for (x = 0; x <= width - 1; x ++) {
                if (y === 0) {
                    this.cells[x]=[];
                }

                this.cells[x][y] = new view.Cell().construct(this, table.rows[y].cells[x], x, y);
            }
        }

        return this;
    };

    this.changeCellState = function(x, y, state)
    {
        this.cells[x][y].changeState(state);

        return this;
    };

    this.changeTimerState = function(counter)
    {
        this.timerTextBox.value = counter;

        return this;
    };

    this.changeGameState = function(state)
    {
        switch (state) {
            case this.states.on:
                this.cover.style.display = "none";
            break;
            case this.states.exploded:
                alert("You exploded! Game over.");
            break;
            case this.states.win:
                alert("Congratulations! You win!");
            break;
        }

        return this;
    };

    this.clickOnCell = function(x, y)
    {
        this.viewModel.executeModelMethod("clickOnCell", [x, y]);

        return this;
    };

    this.clickOnStartButton = function()
    {
        this.viewModel.executeModelMethod("clickOnStartButton", []);

        return this;
    };
};