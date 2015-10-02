// Based on the python code found in https://en.wikipedia.org/wiki/Mersenne_Twister
function RandomGenerator()
{
    this.SIZE = 624;
}

RandomGenerator.prototype.initialize = function(seed)
{
    this.index = this.SIZE;

    this.mt = [];
    this.mt.length = this.SIZE;
    for(var i = 1; i < this.mt.length; i++)
        this.mt[i] = 0;

    this.mt[0] = seed;
    for(var i = 1; i < this.mt.length; i++)
        this.mt[i] = RandomGenerator.extract32Bits(1812433253 * (this.mt[i - 1] ^ this.mt[i - 1] >> 30) + i);
};

RandomGenerator.prototype.extractNumber = function()
{
    if(this.index >= this.SIZE)
        this.twist();

    var y = this.mt[this.index];

    y = y ^ y >> 11;
    y = y ^ y << 7 & 2636928640;
    y = y ^ y << 15 & 4022730752;
    y = y ^ y >> 18;

    this.index++;

    return RandomGenerator.extract32Bits(y);
};

RandomGenerator.prototype.twist = function()
{
    for(var i = 0; i < this.SIZE; i++)
    {
        var y = RandomGenerator.extract32Bits(
            (this.mt[i] & 0x80000000) +
            (this.mt[(i + 1) % this.SIZE] & 0x7fffffff)
        );

        this.mt[i] = this.mt[(i + 397) % this.SIZE] ^ y >> 1;

        if(y % 2 != 0)
            this.mt[i] = this.mt[i] ^ 0x9908b0df;
    }

    this.index = 0;
};

RandomGenerator.extract32Bits = function(value)
{
    return 0xFFFFFFFF & value;
};