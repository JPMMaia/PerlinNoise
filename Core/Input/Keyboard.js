function Keyboard()
{
}

Keyboard.prototype.initialize = function()
{
    this.keys = [];
    this.keys.length = 256;
    for(var i = 0; i < this.keys.length; i++)
        this.keys[i] = false;
};

Keyboard.prototype.onKeyDown = function(keyIndex)
{
    this.keys[keyIndex] = true;
};
Keyboard.prototype.onKeyUp = function(keyIndex)
{
    this.keys[keyIndex] = false;
};

Keyboard.prototype.isKeyDown = function(keyIndex)
{
    return this.keys[keyIndex];
};