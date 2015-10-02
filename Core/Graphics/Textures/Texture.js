function Texture()
{
    this.initialized = false;
}

Texture.prototype.initialize = function(gl, image, format, width, height)
{
    this.initializeHelper(gl);

    // Upload the image into the texture:
    gl.texImage2D(gl.TEXTURE_2D, 0, format, width, height, 0, format, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);

    gl.bindTexture(gl.TEXTURE_2D, null);

    this.width = width;
    this.height = height;
    this.initialized = true;
};
Texture.prototype.initializeWithFile = function(gl, image, format)
{
    this.initializeHelper(gl);

    // Upload the image into the texture:
    gl.texImage2D(gl.TEXTURE_2D, 0, format, format, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);

    gl.bindTexture(gl.TEXTURE_2D, null);
};
Texture.prototype.shutdown = function(gl)
{
    if(!this.initialized)
        return;

    this.initialized = false;

    gl.deleteTexture(this.id);
};

Texture.prototype.bind = function(gl, shaderLocation, shaderIndex)
{
    gl.activeTexture(gl.TEXTURE0 + shaderIndex);
    gl.bindTexture(gl.TEXTURE_2D, this.id);
    gl.uniform1i(shaderLocation, shaderIndex);
};

Texture.prototype.initializeHelper = function(gl)
{
    // Create a texture object that will contain the image:
    this.id = gl.createTexture();

    // Bind texture the target TEXTURE_2D:
    gl.bindTexture(gl.TEXTURE_2D, this.id);

    // Flip the image's Y axis to match the WebGL texture coordinate space:
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    // Set the texture parameters:
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
};

Texture.generateCheckerboardImage = function(gl, textureSize)
{
    var image = new Uint8Array(textureSize * textureSize * 4);

    var tileSize = 32;

    for(var i = 0; i < textureSize; i++)
    {
        for(var j = 0; j < textureSize; j++)
        {
            var patchX = Math.floor(i / tileSize);
            var patchY = Math.floor(j / tileSize);

            // Calculate color:
            var color = patchX%2 ^ patchY%2 ? 255 : 0;

            var offset = 4 * i * textureSize + 4 * j;
            image[offset] = color;
            image[offset + 1] = color;
            image[offset + 2] = color;
            image[offset + 3] = 255;
        }
    }

    return image;
};