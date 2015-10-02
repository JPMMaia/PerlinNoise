function SimpleModel()
{
}

SimpleModel.prototype.initialize = function(gl, simpleShader, vertices, textureCoordinates, indices)
{
    this.vertexBuffer = new GLBuffer();
    this.textureCoordinateBuffer = new GLBuffer();
    this.indexBuffer = new GLIndexBuffer();

    // Calculate number of vertices:
    this.vertexCount = vertices.length / 3;

    // Initialize vertex buffer:
    this.vertexBuffer.initialize(gl, gl.ARRAY_BUFFER, flatten(vertices), this.vertexCount, gl.STATIC_DRAW, gl.FLOAT, 4, 3, simpleShader.position);

    // Initialize texture coordinate buffer:
    this.textureCoordinateBuffer.initialize(gl, gl.ARRAY_BUFFER, flatten(textureCoordinates), this.vertexCount, gl.STATIC_DRAW, gl.FLOAT, 4, 2, simpleShader.textureCoordinates);

    // Initialize index buffer:
    this.indexBuffer.initialize(gl, new Uint16Array(indices));
};
SimpleModel.prototype.shutdown = function(gl)
{
    this.indexBuffer.shutdown(gl);
    this.textureCoordinateBuffer.shutdown(gl);
    this.vertexBuffer.shutdown(gl);
    this.vertexCount = 0;
};

SimpleModel.prototype.render = function(gl)
{
    // Bind data buffers:
    this.vertexBuffer.bind(gl);
    this.textureCoordinateBuffer.bind(gl);

    // Draw with the index buffer:
    this.indexBuffer.draw(gl, gl.TRIANGLES);
};