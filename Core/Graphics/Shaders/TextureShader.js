function TextureShader()
{
    this.super = new AbstractShader();
}

TextureShader.prototype.initialize = function(gl)
{
    this.super.initialize(gl, "TextureVertexShader", "TextureFragmentShader");

    // Get matrix buffer location:
    this.modelMatrix = gl.getUniformLocation(this.super.program, "uMatrixBuffer.modelMatrix");
    this.viewMatrix = gl.getUniformLocation(this.super.program, "uMatrixBuffer.viewMatrix");
    this.projectionMatrix = gl.getUniformLocation(this.super.program, "uMatrixBuffer.projectionMatrix");
    this.texture = gl.getUniformLocation(this.super.program, "uTexture");

    // Get attributes locations:
    this.position = gl.getAttribLocation(this.super.program, "vPosition");
    this.textureCoordinates = gl.getAttribLocation(this.super.program, "vTextureCoordinates");
};

TextureShader.prototype.setShader = function(gl)
{
    this.super.setShader(gl);
};

TextureShader.prototype.setModelMatrix = function(gl, value)
{
    gl.uniformMatrix4fv(this.modelMatrix, false, value);
};

TextureShader.prototype.setViewMatrix = function(gl, value)
{
    gl.uniformMatrix4fv(this.viewMatrix, false, value);
};

TextureShader.prototype.setProjectionMatrix = function(gl, value)
{
    gl.uniformMatrix4fv(this.projectionMatrix, false, value);
};

TextureShader.prototype.setTexture = function(gl, texture)
{
    texture.bind(gl, this.texture, 0);
};