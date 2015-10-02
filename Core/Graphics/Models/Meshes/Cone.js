function Cone()
{
}

Cone.prototype.initialize = function(segments, rings)
{
    this.initializeVertexBuffer(segments, rings);
    this.initializeNormalBuffer(segments, rings);
    this.initializeIndexBuffer(segments, rings);
};

Cone.prototype.initializeVertexBuffer = function(segments, rings)
{
    this.vertices = [];
    this.vertices.length = (2 + rings * segments) * 3;
    this.vertexCount = 0;
    var deltaTheta = 2 * Math.PI / segments;

    // Create top vertex:
    var index = this.vertexCount * 3;
    this.vertices[index] = 0.0;
    this.vertices[index + 1] = 0.0;
    this.vertices[index + 2] = 1.0;
    this.vertexCount++;

    var deltaRadius = 1.0 / rings;
    var deltaZ = 2.0 / rings;
    for(var i = 1; i < rings; i++)
    {
        var radius = deltaRadius * i;
        var z = 1.0 - deltaZ * i;
        this.createBase(segments, deltaTheta, radius, z);
    }

    // Create bottom circle:
    this.createBase(segments, deltaTheta, 1.0, -1.0);
    index = this.vertexCount * 3;
    this.vertices[index] = 0.0;
    this.vertices[index + 1] = 0.0;
    this.vertices[index + 2] = -1.0;
    this.vertexCount++;
};

Cone.prototype.initializeNormalBuffer = function(segments, rings)
{
    this.normals = [];
    this.normals.length = this.vertexCount * 3;
    var normalIndex = 0;
    var deltaTheta = 2 * Math.PI / segments;

    // Top vertex normal:
    this.normals[normalIndex++] = 0.0;
    this.normals[normalIndex++] = 0.0;
    this.normals[normalIndex++] = 1.0;

    // Middle normals:
    for(var i = 0; i < rings - 1; i++)
    {
        for(var j = 0; j < segments; j++)
        {
            var theta = j * deltaTheta;

            var normal = vec3(Math.cos(theta), Math.sin(theta), 2.0);
            normal = normalize(normal);

            this.normals[normalIndex++] = normal[0];
            this.normals[normalIndex++] = normal[1];
            this.normals[normalIndex++] = normal[2];
        }
    }

    // Base normals:
    for(var i = 0; i < segments; i++)
    {
        var theta = i * deltaTheta;

        var normal = vec3(Math.cos(theta), Math.sin(theta), -1.0);
        normal = normalize(normal);

        this.normals[normalIndex++] = normal[0];
        this.normals[normalIndex++] = normal[1];
        this.normals[normalIndex++] = normal[2];
    }
    this.normals[normalIndex++] = 0.0;
    this.normals[normalIndex++] = 0.0;
    this.normals[normalIndex++] = -1.0;
};

Cone.prototype.initializeIndexBuffer = function(segments, rings)
{
    this.indices = [];
    this.indices.length = (2 * segments * rings) * 3;
    var index = 0;

    for(var i = 0; i < segments; i++)
    {
        var i1 = 0;
        var i2 = i + 1;
        var i3 = 1 + i2 % segments;

        this.indices[index++] = i1;
        this.indices[index++] = i2;
        this.indices[index++] = i3;
    }

    for(var r = 0; r < rings - 1; r++)
    {
        for(var s = 0; s < segments; s++)
        {
            var offset = 1 + r * segments;
            var i1 = s + offset;
            var i2 = i1 % segments + offset;
            var i3 = i1 + segments;
            var i4 = i2 + segments;

            this.indices[index++] = i1;
            this.indices[index++] = i3;
            this.indices[index++] = i4;

            this.indices[index++] = i1;
            this.indices[index++] = i4;
            this.indices[index++] = i2;
        }
    }

    for(var i = 0; i < segments; i++)
    {
        var offset = (rings - 1) * segments;
        var i1 = this.vertexCount - 1;
        var i2 = i + 1 + offset;
        var i3 = 1 + i2 % segments + offset;

        this.indices[index++] = i1;
        this.indices[index++] = i3;
        this.indices[index++] = i2;
    }
};

Cone.prototype.createBase = function(segments, deltaTheta, radius, z)
{
    for(var i = 0; i < segments; i++)
    {
        var theta = i * deltaTheta;
        var index = this.vertexCount * 3;

        this.vertices[index] = radius * Math.cos(theta);
        this.vertices[index + 1] = radius * Math.sin(theta);
        this.vertices[index + 2] = z;
        this.vertexCount++;
    }
};