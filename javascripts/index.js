window.onload = function()
{
    document.getElementsByName("timer")[0].value = "0";

    model.gameField.construct(viewModel, 20, 20, 50);
    view.gameField.construct(viewModel, document.getElementById("gamebox"));
    viewModel.construct(model.gameField, view.gameField);

    model.gameField.build();
};