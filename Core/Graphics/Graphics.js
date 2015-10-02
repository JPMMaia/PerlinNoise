function Graphics()
{
}

Graphics.prototype.initialize = function(canvas)
{
    // Get canvas element:
    this.canvas = canvas;

    // Initialize WebGL:
    this.gl = WebGLUtils.setupWebGL(canvas);
    if(!this.gl)
        alert("WebGL isn't available");

    // Initialize shader manager:
    this.shaderManager = new ShaderManager();
    this.shaderManager.initialize(this.gl);

    // Setup blending:
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.cullFace(this.gl.BACK);
};

Graphics.prototype.beginScene = function()
{
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

    // Clear screen:
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
};