function VectorUtils()
{
}

VectorUtils.dot = function(v1, v2)
{
    return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
};

VectorUtils.normalize = function(vector)
{
    var length = Math.sqrt(vector[0]*vector[0] + vector[1]*vector[1] + vector[2]*vector[2]);

    return [
        vector[0] / length, vector[1] / length, vector[2] / length
    ];
};

VectorUtils.perpendicular = function(v)
{
    return [
        -v[1],
        v[0],
        v[2]
    ];
};

VectorUtils.add = function(v1, v2)
{
    return [
        v1[0] + v2[0],
        v1[1] + v2[1],
        v1[2] + v2[2]
    ];
};

VectorUtils.subtract = function(v1, v2)
{
    return [
        v1[0] - v2[0],
        v1[1] - v2[1],
        v1[2] - v2[2]
    ];
};