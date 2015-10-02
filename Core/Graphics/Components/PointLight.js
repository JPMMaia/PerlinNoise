function PointLight()
{
}

PointLight.prototype.initialize = function(index, position, diffuseColor, specularColor, ambientColor)
{
    this.index = index;
    this.position = position;
    this.diffuseColor = diffuseColor;
    this.specularColor = specularColor;
    this.ambientColor = ambientColor;
    this.active = true;
};

PointLight.prototype.shutdown = function(gl, shaderManager)
{
    shaderManager.setLightActive(gl, this.index, false);
    this.active = false;
};

PointLight.prototype.render = function(gl, shaderManager)
{
    shaderManager.setLightActive(gl, this.index, this.active);
    shaderManager.setLightPosition(gl, this.index, this.position);
    shaderManager.setLightDiffuseColor(gl, this.index, this.diffuseColor);
    shaderManager.setLightSpecularColor(gl, this.index, this.specularColor);
    shaderManager.setLightAmbientColor(gl, this.index, this.ambientColor);
};

PointLight.prototype.setActive = function(value)
{
    this.active = value;
};

PointLight.prototype.isActive = function()
{
    return this.active;
};

PointLight.prototype.getPosition = function()
{
    return this.position;
};
PointLight.prototype.getDiffuseColor = function()
{
    return this.diffuseColor;
};
PointLight.prototype.getSpecularColor = function()
{
    return this.specularColor;
};
PointLight.prototype.getAmbientColor = function()
{
    return this.ambientColor;
};

PointLight.prototype.setParameters = function(position, diffuseColor, specularColor, ambientColor)
{
    this.position = flatten(position);
    this.diffuseColor = flatten(diffuseColor);
    this.specularColor = flatten(specularColor);
    this.ambientColor = flatten(ambientColor);
};
PointLight.prototype.setPosition = function(value)
{
    this.position = flatten(value);
};
PointLight.prototype.setDiffuseColor = function(value)
{
    this.diffuseColor = flatten(value);
};
PointLight.prototype.setSpecularColor = function(value)
{
    this.specularColor = flatten(value);
};
PointLight.prototype.setAmbientColor = function(value)
{
    this.ambientColor = flatten(value);
};

PointLight.createTransform = function(position)
{
    return mat4(
        0.05, 0.0, 0.0, position[0],
        0.0, 0.05, 0.0, position[1],
        0.0, 0.0, 0.05, position[2],
        0.0, 0.0, 0.0, 1.0
    );
};