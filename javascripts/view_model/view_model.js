var viewModel = new function()
{
    this.model = null;
    this.view  = null;

    this.methodsMappings = {
        modelToView: {
            build: "build",
            changeCellState: "changeCellState",
            changeTimerState: "changeTimerState",
            changeGameState: "changeGameState"
        },

        viewToModel: {
            clickOnCell: "openCell",
            clickOnStartButton: "startGame"
        }
    };


    this.construct = function(model, view)
    {
        this.model = model;
        this.view  = view;

        return this;
    };

    this.executeViewMethod = function(modelMethod, args)
    {
        this.executeMethod(modelMethod, args, this.methodsMappings.modelToView, this.view);

        return this;
    };

    this.executeModelMethod = function(viewMethod, args)
    {
        this.executeMethod(viewMethod, args, this.methodsMappings.viewToModel, this.model);

        return this;
    };


    this.executeMethod = function(callerMethod, args, mapping, targetObject)
    {
        if (typeof(mapping[callerMethod]) !== "undefined") {
            var method = mapping[callerMethod];

            targetObject[method].apply(targetObject, args);
        }

        return this;
    };

};