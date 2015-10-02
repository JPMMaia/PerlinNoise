function AbstractShader()
{
}

AbstractShader.prototype.initialize = function(gl, vertexShader, fragmentShader)
{
    // Load shaders and initialize attribute buffers:
    this.program = initShaders(gl, vertexShader, fragmentShader);
};

AbstractShader.prototype.setShader = function(gl)
{
    // Use the shader program:
    gl.useProgram(this.program);
};

AbstractShader.prototype.setUniformMatrix4 = function(gl, matrix, transpose)
{
    gl.uniformMatrix4x4fv(this.program, matrix, transpose);
};