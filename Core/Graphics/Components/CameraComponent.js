function CameraComponent()
{
}

CameraComponent.prototype.initialize = function(id)
{
    this.viewMatrix = mat4(1);
    this.projectionMatrix = mat4(1);
};

CameraComponent.prototype.translate = function(x, y, z)
{
    this.viewMatrix = mult(translate(-x, -y, -z), this.viewMatrix);
};

CameraComponent.prototype.setOrthogonal = function(left, right, bottom, top, near, far)
{
    this.projectionMatrix = ortho(left, right, bottom, top, near, far);
};

CameraComponent.prototype.setPerspective = function(fieldOfViewY, aspectRatio, near, far)
{
    this.projectionMatrix = perspective(fieldOfViewY, aspectRatio, near, far);
};

CameraComponent.prototype.getViewMatrix = function()
{
    return this.viewMatrix;
};

CameraComponent.prototype.setViewMatrix = function(value)
{
    this.viewMatrix = value;
};

CameraComponent.prototype.getProjectionMatrix = function()
{
    return this.projectionMatrix;
};

CameraComponent.prototype.setProjectionMatrix = function(value)
{
    this.projectionMatrix = value;
};

CameraComponent.prototype.getPosition = function()
{
    return [
        -this.viewMatrix[0][3], -this.viewMatrix[1][3], -this.viewMatrix[2][3]
    ];
};