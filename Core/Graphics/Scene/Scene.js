function Scene()
{
}

Scene.prototype.initialize = function(gl, shaderManager, aspectRatio)
{
    // Set clear color:
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // Create the main camera:
    this.currentCamera = new CameraComponent();
    this.currentCamera.initialize();

    this.initializeObjects(gl, shaderManager);
};
Scene.prototype.shutdown = function(gl)
{
    this.shutdownObjects(gl);
};

Scene.prototype.render = function(gl, shaderManager)
{
    var textureShader = shaderManager.getTextureShader();
    textureShader.setShader(gl);

    // Set projection matrix:
    textureShader.setProjectionMatrix(gl, flatten(this.currentCamera.getProjectionMatrix()));

    // Set view matrix:
    textureShader.setViewMatrix(gl, flatten(this.currentCamera.getViewMatrix()));

    // Set model matrix:
    textureShader.setModelMatrix(gl, this.squareModelMatrix);

    // Set the perlin noise texture:
    textureShader.setTexture(gl, this.perlinNoiseTexture);

    this.squareModel.render(gl);
};

Scene.prototype.setOrthogonalMode = function(aspectRatio)
{
    this.currentCamera.setOrthogonal(-1.0 * aspectRatio, 1.0 * aspectRatio, -1.0, 1.0, -1.0, 1.0);
};
Scene.prototype.setPerspectiveMode = function(fieldOfViewY, aspectRatio)
{
    this.currentCamera.setPerspective(fieldOfViewY, aspectRatio, 0.1, 20.0);
};

Scene.prototype.initializeObjects = function(gl, shaderManager)
{
    // Create a square mesh:
    var squareMesh = new Square();
    squareMesh.initialize();

    // Create a square model, where we will display the mandelbrot set:
    this.squareModel = new SimpleModel();
    this.squareModel.initialize(gl, shaderManager.getTextureShader(), squareMesh.vertices, squareMesh.textureCoordinates, squareMesh.indices);

    this.squareModelMatrix = flatten(
        mat4(
            1.5, 0.0, 0.0, 0.0,
            0.0, 1.5, 0.0, 0.0,
            0.0, 0.0, 1.5, 0.0,
            0.0, 0.0, 0.0, 1.0
        )
    );

    // Create the perlin noise texture:
    this.perlinNoiseTexture = new Texture();
};
Scene.prototype.shutdownObjects = function(gl)
{
    this.squareModel.shutdown(gl);
};

Scene.prototype.generatePerlinNoiseTexture = function(gl, seed, persistence, octaves, size)
{
    this.perlinNoiseImage = PerlinNoise.generateImage(seed, persistence, size, octaves);

    this.perlinNoiseTexture.shutdown(gl);
    this.perlinNoiseTexture.initialize(gl, this.perlinNoiseImage, gl.RGBA, size, size);
};

Scene.prototype.getPerlinNoiseImage = function()
{
    return {
        data: this.perlinNoiseImage,
        width: this.perlinNoiseTexture.width,
        height: this.perlinNoiseTexture.height
    };
};