view.Cell = function()
{
    var me = this;

    this.field = null;

    this.htmlElement = null;

    this.x = null;
    this.y = null;

    this.checked = false;
    this.mined   = false;

    this.classes = {
        unchecked: "unchecked",
        checked0: "checked",
            checked1: "checkedWithMine mine1", checked2: "checkedWithMine mine2", checked3: "checkedWithMine mine3",
            checked4: "checkedWithMine mine4", checked5: "checkedWithMine mine5", checked6: "checkedWithMine mine6",
            checked7: "checkedWithMine mine7", checked8: "checkedWithMine mine8",
        exploded: "checkedWithMine exploded"
    };


    this.construct = function(field, htmlElement, x, y)
    {
        this.field = field;

        this.htmlElement = htmlElement;

        this.x = x;
        this.y = y;

        this.htmlElement.onclick = function()
        {
            me.click();
        };

        return this;
    };

    this.click = function()
    {
        this.field.clickOnCell(this.x, this.y);

        return this;
    };

    this.changeState = function(state)
    {
        this.htmlElement.className = this.classes[state];

        return this;
    };
};