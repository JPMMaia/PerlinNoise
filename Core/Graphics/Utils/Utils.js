function Utils()
{
}

Utils.generateMatrix = function(numLines, numColumns)
{
    var matrix = [];
    matrix.length = numLines;
    for(var i = 0; i < numLines; i++)
    {
        matrix[i] = [];
        matrix[i].length = numColumns;
    }

    return matrix;
};