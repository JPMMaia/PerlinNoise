function Sphere()
{
    this.TEXTURE_MAPPING_MODE = "TextureMappingMode";
    this.TEXTURE_MAPPING_MODE_PLANAR = "Planar";
    this.TEXTURE_MAPPING_MODE_SPHERICAL = "Spherical";
}

Sphere.prototype.initialize = function(segments, rings, options)
{
    var textureMappingMode;
    if(!options[this.TEXTURE_MAPPING_MODE])
        textureMappingMode = this.TEXTURE_MAPPING_MODE_SPHERICAL;
    else
        textureMappingMode = options[this.TEXTURE_MAPPING_MODE];

    this.initializeVertexBuffer(segments, rings);
    this.initializeNormalBuffer();
    this.initializeTextureCoordinateBuffer(segments, rings, textureMappingMode);
    this.initializeIndexBuffer(segments, rings);
};

Sphere.prototype.initializeVertexBuffer = function(segments, rings)
{
    var maxVertexCount = 4 * rings;
    this.vertices = [];
    this.vertices.length = maxVertexCount * 3;
    this.vertexCount = 0;
    var radius = 1.0;

    // Create rings:
    var deltaTheta = Math.PI / rings;
    for(var i = 0; i <= rings; i++)
    {
        var theta = deltaTheta * i;

        this.createRing(this.vertices, radius, theta, segments);
    }
};

Sphere.prototype.initializeNormalBuffer = function()
{
    this.normals = [];
    this.normals.length = this.vertexCount * 3;

    for(var i = 0; i < this.normals.length; i++)
        this.normals[i] = this.vertices[i];
};

Sphere.prototype.initializeTextureCoordinateBuffer = function(segments, rings, mode)
{
    this.textureCoordinates = [];
    this.textureCoordinates.length = this.vertexCount * 2;

    if(mode === "Spherical")
    {
        // Create rings texture coordinates:
        var index = 0;
        var deltaTheta = Math.PI / rings;
        for(var i = 0; i <= rings; i++)
        {
            var theta = deltaTheta * i;

            this.createRingTextureCoordinates(this.textureCoordinates, theta, segments, index);
            index += (segments + 1) * 2;
        }
    }
    else if(mode === "Planar")
    {
        for (var i = 0; i < this.vertexCount; i++)
        {
            var vIndex = i * 3;
            var x = this.vertices[vIndex];
            var y = this.vertices[vIndex + 1];
            var z = this.vertices[vIndex + 2];

            var tIndex = i * 2;
            this.textureCoordinates[tIndex] = (x + 1.0) / 2.0;
            this.textureCoordinates[tIndex + 1] = (z + 1.0) / 2.0;
        }
    }
};

Sphere.prototype.initializeIndexBuffer = function(segments, rings)
{
    var triangleCount = 2 * segments * (rings - 1);

    this.indices = [];
    this.indices.length = triangleCount * 3;

    var index = 0;
    for(var r = 0; r < rings; r++)
    {
        for(var s = 0; s < segments; s++)
        {
            var offset = r * (segments + 1);
            var i1 = offset + s;
            var i2 = i1 + 1;
            var i3 = i1 + segments + 1;
            var i4 = i2 + segments + 1;

            this.indices[index++] = i1;
            this.indices[index++] = i3;
            this.indices[index++] = i4;

            this.indices[index++] = i1;
            this.indices[index++] = i4;
            this.indices[index++] = i2;
        }
    }
};

Sphere.prototype.createRing = function(vertices, radius, theta, segments)
{
    var deltaPhi = 2.0 * Math.PI / segments;

    var index = this.vertexCount * 3;
    for(var i = 0; i < segments + 1; i++)
    {
        var phi = i * deltaPhi;

        vertices[index++] = radius * Math.sin(theta) * Math.cos(phi);
        vertices[index++] = radius * Math.sin(theta) * Math.sin(phi);
        vertices[index++] = radius * Math.cos(theta);
        this.vertexCount++;
    }
};

Sphere.prototype.createRingTextureCoordinates = function(textureCoordinates, theta, segments, index)
{
    var deltaPhi = 2.0 * Math.PI / segments;

    for(var i = 0; i <= segments; i++)
    {
        var phi = i * deltaPhi;

        textureCoordinates[index++] = phi / (2.0 * Math.PI);
        textureCoordinates[index++] = 1.0 - theta / Math.PI;
    }
};