function GLBuffer()
{
}

GLBuffer.prototype.initialize = function(gl, bufferType, bufferData, bufferCapacity, bufferUsage, dataType, bytesPerComponent, componentsPerAttribute, attributeLocation)
{
    this.bufferId = gl.createBuffer();
    gl.bindBuffer(bufferType, this.bufferId);
    gl.bufferData(bufferType, bufferData, bufferUsage);

    this.bufferType = bufferType;
    this.bufferCapacity = bufferCapacity;
    this.bufferUsage = bufferUsage;
    this.dataType = dataType;
    this.bytesPerComponent = bytesPerComponent;
    this.componentsPerAttribute = componentsPerAttribute;
    this.attributeLocation = attributeLocation;
    this.count = 0;
};

GLBuffer.prototype.initializeWithSize = function(gl, bufferType, bufferCapacity, bufferUsage, dataType, bytesPerComponent, componentsPerAttribute, attributeLocation)
{
    this.bufferId = gl.createBuffer();
    gl.bindBuffer(bufferType, this.bufferId);
    gl.bufferData(bufferType, bufferCapacity * bytesPerComponent * componentsPerAttribute, bufferUsage);

    this.bufferType = bufferType;
    this.bufferCapacity = bufferCapacity;
    this.bufferUsage = bufferUsage;
    this.dataType = dataType;
    this.bytesPerComponent = bytesPerComponent;
    this.componentsPerAttribute = componentsPerAttribute;
    this.attributeLocation = attributeLocation;
    this.count = 0;
};

GLBuffer.prototype.shutdown = function(gl)
{
    gl.bindBuffer(this.bufferType, this.bufferId);
    gl.disableVertexAttribArray(this.attributeLocation);
    gl.deleteBuffer(this.bufferId);
};

GLBuffer.prototype.bind = function(gl)
{
    gl.bindBuffer(this.bufferType, this.bufferId);
    gl.enableVertexAttribArray(this.attributeLocation);
    gl.vertexAttribPointer(this.attributeLocation, this.componentsPerAttribute, this.dataType, false, 0, 0);
};

GLBuffer.prototype.add = function(gl, data)
{
    // If buffer is full:
    if(this.count == this.bufferCapacity)
        return false;

    // Add new element:
    this.set(gl, data, this.count);
    this.count++;

    return true;
};

GLBuffer.prototype.set = function(gl, data, index)
{
    gl.bindBuffer(this.bufferType, this.bufferId);
    gl.bufferSubData(this.bufferType, index * this.bytesPerComponent * this.componentsPerAttribute, data);
};