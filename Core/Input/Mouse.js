function Mouse()
{
}

Mouse.prototype.initialize = function()
{
    this.buttons = [ false, false, false ];
    this.newPositionX = 0;
    this.newPositionY = 0;
    this.oldPositionX = 0;
    this.oldPositionY = 0;
    this.velocityX = 0;
    this.velocityY = 0;
};

Mouse.prototype.update = function(deltaMilliseconds)
{
    this.velocityX = 1000 * (this.newPositionX - this.oldPositionX) / deltaMilliseconds;
    this.velocityY = -1000 * (this.newPositionY - this.oldPositionY) / deltaMilliseconds;

    this.oldPositionX = this.newPositionX;
    this.oldPositionY = this.newPositionY;
};

Mouse.prototype.move = function(positionX, positionY)
{
    this.newPositionX = positionX;
    this.newPositionY = positionY;
};

Mouse.prototype.onButtonDown = function(index)
{
    this.buttons[index] = true;
};

Mouse.prototype.onButtonUp = function(index)
{
    this.buttons[index] = false;
};

Mouse.prototype.isButtonDown = function(index)
{
    return this.buttons[index];
};