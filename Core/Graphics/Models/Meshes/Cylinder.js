function Cylinder()
{
}

Cylinder.prototype.initialize = function(segments, rings)
{
    this.initializeVertexBuffer(segments, rings);
    this.initializeNormalBuffer(segments, rings);
    this.initializeIndexBuffer(segments, rings);
};

Cylinder.prototype.initializeVertexBuffer = function(segments, rings)
{
    this.vertices = [];
    this.vertices.length = (2 + segments * (1 + rings)) * 3;
    this.vertexCount = 0;
    var deltaTheta = 2 * Math.PI / segments;

    // Create top circle:
    var index = this.vertexCount * 3;
    this.vertices[index] = 0.0;
    this.vertices[index + 1] = 0.0;
    this.vertices[index + 2] = 1.0;
    this.vertexCount++;
    this.createBase(segments, deltaTheta, 1.0);

    var deltaZ = 2.0 / rings;
    for(var i = 1; i < rings; i++)
    {
        var z = 1.0 - deltaZ * i;
        this.createBase(segments, deltaTheta, z);
    }

    // Create bottom circle:
    this.createBase(segments, deltaTheta, -1.0);
    index = this.vertexCount * 3;
    this.vertices[index] = 0.0;
    this.vertices[index + 1] = 0.0;
    this.vertices[index + 2] = -1.0;
    this.vertexCount++;
};

Cylinder.prototype.initializeNormalBuffer = function(segments, rings)
{
    this.normals = [];
    this.normals.length = this.vertexCount * 3;
    var normalIndex = 0;
    var deltaTheta = 2 * Math.PI / segments;

    this.normals[normalIndex++] = 0.0;
    this.normals[normalIndex++] = 0.0;
    this.normals[normalIndex++] = 1.0;

    // Create top base normals:
    for(var i = 0; i < segments; i++)
    {
        var theta = i * deltaTheta;

        var normal = vec3(Math.cos(theta), Math.sin(theta), 1.0);
        normal = normalize(normal);

        this.normals[normalIndex++] = normal[0];
        this.normals[normalIndex++] = normal[1];
        this.normals[normalIndex++] = normal[2];
    }

    // Create middle normals:
    for(var i = 0; i < rings - 1; i++)
    {
        for(var j = 0; j < segments; j++)
        {
            var theta = j * deltaTheta;

            this.normals[normalIndex++] = Math.cos(theta);
            this.normals[normalIndex++] = Math.sin(theta);
            this.normals[normalIndex++] = 0.0;
        }
    }

    // Create bottom base normals:
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

Cylinder.prototype.initializeIndexBuffer = function(gl, segments, rings)
{
    this.indices = [];
    this.indices.length = 6 * segments * (1 + rings);
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

    for(var r = 0; r < rings; r++)
    {
        for(var s = 0; s < segments; s++)
        {
            var offset = r * segments;
            var i1 = s + 1 + offset;
            var i2 = 1 + i1 % segments + offset;
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
        var offset = segments * rings;
        var i1 = this.vertexCount - 1;
        var i2 = i + 1 + offset;
        var i3 = 1 + i2 % segments + offset;

        this.indices[index++] = i1;
        this.indices[index++] = i3;
        this.indices[index++] = i2;
    }
};

Cylinder.prototype.createBase = function(segments, deltaTheta, z)
{
    for(var i = 0; i < segments; i++)
    {
        var theta = i * deltaTheta;
        var index = this.vertexCount * 3;

        this.vertices[index] = Math.cos(theta);
        this.vertices[index + 1] = Math.sin(theta);
        this.vertices[index + 2] = z;
        this.vertexCount++;
    }
};