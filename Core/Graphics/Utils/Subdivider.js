function Subdivider()
{
    this.points = [];
}

Subdivider.prototype.subdivideModel = function(vertices, count, removeCenter)
{
    for(var i = 0; i < vertices.length;)
    {
        var p1 = [ vertices[i++], vertices[i++], vertices[i++] ];
        var p2 = [ vertices[i++], vertices[i++], vertices[i++] ];
        var p3 = [ vertices[i++], vertices[i++], vertices[i++] ];

        this.subdivideTriangle(p1, p2, p3, count, removeCenter);
    }
};

Subdivider.prototype.subdivideTriangle = function(p1, p2, p3, count, removeCenter)
{
    // If the triangle doesn't need to subdivideTriangle more:
    if(count == 0)
    {
        // Add triangle points to the list:
        this.points.push(p1[0], p1[1], p1[2]);
        this.points.push(p2[0], p2[1], p2[2]);
        this.points.push(p3[0], p3[1], p3[2]);

        return;
    }

    // Calculate edges' middle points
    var p12 = mix(p1, p2, 0.5);
    var p23 = mix(p2, p3, 0.5);
    var p31 = mix(p3, p1, 0.5);

    // Decrement count:
    count--;

    // Subdivide smaller triangles:
    if(!removeCenter)
        this.subdivideTriangle(p12, p23, p31, count, removeCenter);
    this.subdivideTriangle(p1, p12, p31, count, removeCenter);
    this.subdivideTriangle(p2, p23, p12, count, removeCenter);
    this.subdivideTriangle(p3, p31, p23, count, removeCenter);
};