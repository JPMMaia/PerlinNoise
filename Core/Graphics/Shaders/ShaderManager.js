function ShaderManager()
{
}

ShaderManager.prototype.initialize = function(gl)
{
    // Initialize texture shader:
    this.textureShader = new TextureShader();
    this.textureShader.initialize(gl);
};

ShaderManager.prototype.getTextureShader = function()
{
    return this.textureShader;
};