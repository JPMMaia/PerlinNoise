function Square()
{
}

Square.prototype.initialize = function()
{
    // Create vertices:
    this.vertices =
        [
            -0.5, -0.5, 0.0,
            -0.5, 0.5, 0.0,
            0.5, -0.5, 0.0,
            0.5, 0.5, 0.0
        ];

    // Create normals:
    this.normals =
        [
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0
        ];

    // Create texture coordinates:
    this.textureCoordinates = [
        0.0, 0.0,
        0.0, 1.0,
        1.0, 0.0,
        1.0, 1.0
    ];

    // Create indices:
    this.indices =
        [
            0, 2, 1,
            1, 2, 3
        ];
};