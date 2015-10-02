function PerlinNoise()
{
}

PerlinNoise.generateWhiteNoiseMatrix = function(seed, size)
{
    var noise = Utils.generateMatrix(size, size);

    var randomGenerator = new RandomGenerator();
    randomGenerator.initialize(seed);

    for(var i = 0; i < size; i++)
        for(var j = 0; j < size; j++)
            noise[i][j] = randomGenerator.extractNumber() / 2147483647;

    return noise;
};

PerlinNoise.linearInterpolate = function(x, y, w)
{
    return (1.0 - w) * x + y * w;
};

PerlinNoise.cosineInterpolation = function(x, y, w)
{
    var w2 = (1.0 - Math.cos(w * Math.PI)) / 2.0;
    return (1.0 - w2) * x + y * w2;
};

PerlinNoise.generateSmoothNoiseMatrix = function(noiseMatrix, size, octave)
{
    var smoothNoiseMatrix = Utils.generateMatrix(size, size);

    var samplePeriod = Math.pow(2, octave);

    for(var i = 0; i < size; i++)
    {
        var i0 = Math.floor(i / samplePeriod) * samplePeriod;
        var i1 = (i0 + samplePeriod) % size;
        var verticalBlend = (i - i0) / samplePeriod;

        for(var j = 0; j < size; j++)
        {
            var j0 = Math.floor(j / samplePeriod) * samplePeriod;
            var j1 = (j0 + samplePeriod) % size;
            var horizontalBlend = (j - j0) / samplePeriod;

            var top = PerlinNoise.linearInterpolate(noiseMatrix[i0][j0], noiseMatrix[i0][j1], horizontalBlend);
            var bottom = PerlinNoise.linearInterpolate(noiseMatrix[i1][j0], noiseMatrix[i1][j1], horizontalBlend);

            smoothNoiseMatrix[i][j] = PerlinNoise.linearInterpolate(top, bottom, verticalBlend);
        }
    }

    return smoothNoiseMatrix;
};

PerlinNoise.generateImage = function(seed, persistence, size, octaves)
{
    var image = new Uint8Array(size * size * 4);

    var noiseMatrix = PerlinNoise.generateWhiteNoiseMatrix(seed, size);

    var perlinNoiseMatrix = Utils.generateMatrix(size, size);
    for(var i = 0; i < size; i++)
        for (var j = 0; j < size; j++)
            perlinNoiseMatrix[i][j] = 0.0;

    var amplitude = Math.pow(persistence, octaves - 1);
    var totalAmplitude = 0.0;
    for(var octave = 0; octave < octaves; octave++)
    {
        var smoothNoiseMatrix = PerlinNoise.generateSmoothNoiseMatrix(noiseMatrix, size, octave);

        for(var i = 0; i < size; i++)
            for (var j = 0; j < size; j++)
                perlinNoiseMatrix[i][j] += smoothNoiseMatrix[i][j] * amplitude;

        totalAmplitude += amplitude;
        amplitude /= persistence;
    }

    for(var i = 0; i < size; i++)
        for (var j = 0; j < size; j++)
            perlinNoiseMatrix[i][j] /= totalAmplitude;


    for(var i = 0; i < size; i++)
    {
        for(var j = 0; j < size; j++)
        {
            var imageIndex = (i * size + j) * 4;

            var color = Math.round(perlinNoiseMatrix[i][j] * 255);
            image[imageIndex] = color;
            image[imageIndex + 1] = color;
            image[imageIndex + 2] = color;
            image[imageIndex + 3] = 255;
        }
    }

    return image;
};