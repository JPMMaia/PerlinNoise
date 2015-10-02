function Triangle()
{
}

Triangle.prototype.initialize = function()
{
    var radius = 0.5;
    var angle1 = Math.PI / 2.0;
    var angle2 = 7.0 * Math.PI / 6.0;
    var angle3 = 11.0 * Math.PI / 6.0;

    // Create vertices:
    this.vertices =
        [
            radius * Math.cos(angle1), radius * Math.sin(angle1), 0.0,
            radius * Math.cos(angle2), radius * Math.sin(angle2), 0.0,
            radius * Math.cos(angle3), radius * Math.sin(angle3), 0.0
        ];

    // Create normals:
    this.normals =
        [
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0
        ];

    // Create texture coordinates:
    this.textureCoordinates = [
        0.5, 1.0,
        0.0, 0.0,
        1.0, 0.0
    ];

    // Create indices:
    this.indices =
        [
            0, 1, 2
        ];
};