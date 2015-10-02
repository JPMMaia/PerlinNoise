function TransformComponent()
{
}

TransformComponent.prototype.initialize = function(transform)
{
    this.transform = transform;
};
TransformComponent.prototype.shutdown = function()
{
    this.transform = null;
};

TransformComponent.prototype.render = function(gl, shaderManager)
{
    // Set model matrix in the shader:
    shaderManager.setModelMatrix(gl, flatten(this.transform));
};

TransformComponent.prototype.getTransform = function()
{
    return this.transform;
};

TransformComponent.prototype.setTransform = function(value)
{
    this.transform = value;
};