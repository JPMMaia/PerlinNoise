function Application()
{
}

Application.prototype.initialize = function(canvas)
{
    // Set canvas:
    this.canvas = canvas;
    this.aspectRatio = this.canvas.width / this.canvas.height;

    // Create graphics object:
    this.graphics = new Graphics();
    this.graphics.initialize(canvas);

    // Create a scene:
    this.scene = new Scene();
    this.scene.initialize(this.graphics.gl, this.graphics.shaderManager, this.aspectRatio);

    // Set camera orthogonal mode:
    this.scene.setOrthogonalMode(this.aspectRatio);

    // Perlin noise texture variables:
    this.seed = 0;
    this.persistence = 1.0;
    this.octaves = 4;
    this.size = 512;
    this.dirty = true;
};

Application.prototype.update = function()
{
    if(this.dirty)
    {
        this.dirty = false;
        this.showGeneratingTextureLabel(true);

        // Create a new thread to generate the perlin noise texture:
        var app = this;
        setTimeout(
            function()
            {
                app.generatePerlinNoiseTexture();
                app.showGeneratingTextureLabel(false);
            },
            0
        );
    }
};

Application.prototype.render = function()
{
    this.graphics.beginScene();
    this.scene.render(this.graphics.gl, this.graphics.shaderManager);
};

Application.prototype.generatePerlinNoiseTexture = function()
{
    this.scene.generatePerlinNoiseTexture(this.graphics.gl, this.seed, this.persistence, this.octaves, this.size);
};
Application.prototype.setSeed = function(value)
{
    this.seed = value;
    this.dirty = true;
};
Application.prototype.setPersistence = function(value)
{
    this.persistence = value;
    this.dirty = true;
};
Application.prototype.setOctaves = function(value)
{
    this.octaves = value;
    this.dirty = true;
};
Application.prototype.setSize = function(value)
{
    // If the value is not a power of 2, ignore:
    if((Math.log(value) / Math.log(2)) % 1 != 0)
        return;


    this.size = value;
    this.dirty = true
};

Application.prototype.resizeCanvas = function(width, height)
{
    this.canvas.width = width;
    this.canvas.height = height;
    this.aspectRatio = width / height;
    this.scene.setOrthogonalMode(this.aspectRatio);
};

Application.prototype.showGeneratingTextureLabel = function(value)
{
    if(value)
        document.getElementById("GeneratingTextureLabel").style.display = "flex";
    else
        document.getElementById("GeneratingTextureLabel").style.display = "none";
};

Application.prototype.saveImage = function()
{
    // Get the perlin noise image:
    var perlinNoiseImage = this.scene.getPerlinNoiseImage();

    // Create an off-screen canvas:
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");

    // Size the canvas to your desired image
    canvas.width = perlinNoiseImage.width;
    canvas.height = perlinNoiseImage.height;

    // Get the imageData and pixel array from the canvas:
    var imageData = context.getImageData(0, 0, perlinNoiseImage.width, perlinNoiseImage.height);
    var data = imageData.data;

    // Manipulate some pixel elements:
    for(var i = 0; i < data.length; i++)
        data[i] = perlinNoiseImage.data[i];

    // Put the modified pixels back on the canvas
    context.putImageData(imageData, 0, 0);

    return canvas.toDataURL();
};