function GLIndexBuffer()
{
}

GLIndexBuffer.prototype.initialize = function(gl, indices)
{
    this.bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferId);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    this.indexCount = indices.length;
};

GLIndexBuffer.prototype.shutdown = function(gl)
{
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferId);
    gl.deleteBuffer(this.bufferId);
};

GLIndexBuffer.prototype.draw = function(gl, mode)
{
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferId);
    gl.drawElements(mode, this.indexCount, gl.UNSIGNED_SHORT, 0);
};