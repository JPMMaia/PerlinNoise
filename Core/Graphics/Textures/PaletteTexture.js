function PaletteTexture()
{
}

PaletteTexture.generateImage = function()
{
    // x^3 = numColors
    // iterationIncrement = numColors / floor(x - 1)

    var numColors = 512;

    var image = new Uint8Array(numColors * 4);
    var index = 0;
    for(var red = 0; red < 256; red += 32)
    {
        for(var green = 0; green < 256; green += 32)
        {
            for(var blue = 0; blue < 256; blue += 32)
            {
                image[index] = red;
                image[index + 1] = green;
                image[index + 2] = blue;
                image[index + 3] = 255;
                index += 4;
            }
        }
    }

    return image;
};

PaletteTexture.generateImage2 = function()
{
    // x^3 = numColors
    // iterationIncrement = numColors / floor(x - 1)

    var numColors = 16;

    var image = new Uint8Array(numColors * 4);
    image.set(
        [
            66, 30, 15, 255,
            25, 7, 26, 255,
            9, 1, 47, 255,
            4, 4, 73, 255,
            0, 7, 100, 255,
            12, 44, 138, 255,
            24, 82, 177, 255,
            57, 125, 209, 255,
            134, 181, 229, 255,
            211, 236, 248, 255,
            241, 233, 191, 255,
            248, 201, 95, 255,
            255, 170, 0, 255,
            204, 128, 0, 255,
            153, 87, 0, 255,
            106, 52, 3, 255
        ]
    );

    return image;
};