var application;

window.onload = function initialize()
{
    // Get canvas element:
    var canvas = document.getElementById("gl-canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    setupEvents(canvas);

    // Initialize application:
    application = new Application();
    application.initialize(canvas);

    run();
};

function run()
{
    application.update();
    application.render();

    setTimeout(
        function()
        {
            requestAnimFrame(run);
        },
        30
    );
}

function setupEvents(canvas)
{
    window.onresize = function()
    {
        application.resizeCanvas(window.innerWidth, window.innerHeight);
    };

    document.getElementById("RandomSeedInput").oninput = function()
    {
        var value = document.getElementById("RandomSeedInput").value;
        if(value == "")
            return;

        application.setSeed(parseInt(value));
    };
    document.getElementById("PersistenceInput").oninput = function()
    {
        var value = document.getElementById("PersistenceInput").value;
        if(value == "")
            return;

        application.setPersistence(parseFloat(value));
    };
    document.getElementById("OctavesInput").oninput = function()
    {
        var value = document.getElementById("OctavesInput").value;
        if(value == "")
            return;

        application.setOctaves(parseInt(value));
    };
    document.getElementById("SizeInput").oninput = function()
    {
        var value = document.getElementById("SizeInput").value;
        if(value == "")
            return;

        application.setSize(parseInt(value));
    };
    document.getElementById("SaveImageButton").onclick = function()
    {
        window.location = application.saveImage();
    };
}