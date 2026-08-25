function createShader(gl, type, source){
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if(success){
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader); // Failsafe + memory management
}

//Now we need to link the 2 shaders in 1 program
function createProgram(gl, vertexShader, fragmentShader){
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if(success){
        return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

//For resizing the gl Canvas to the Display Size
function resizeCanvasToDisplaySize(canvas){

    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    //Check if resize is necessary
    const needResize = displayWidth !== canvas.width || displayHeight !== canvas.height;


    //Resize by setting canvas size to the display
    if(needResize){
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }

    return needResize
}


function main() {

    const startTime = performance.now();

    const canvas = document.querySelector("#c");
    canvas.width = 400;
    canvas.height = 300;

    var gl = canvas.getContext("webgl");
    if (!gl) {
        console.log("No webgl for you!");
    }

//Get the GLSL code from script in html
    var vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
    var fragmentShaderSource = document.querySelector("#fragment-shader-2d").text;

//Create the 2 shaders
    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

//Create program
    var program = createProgram(gl, vertexShader, fragmentShader)

//We get the position that we sent
    var positionAttributeLocation = gl.getAttribLocation(program, "a_position");

    var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");

    var timeUniformLocation = gl.getUniformLocation(program, "u_time");

    var positionBuffer = gl.createBuffer();


//We need to bind the buffer with bind points (ArrayBuffer) (They basically act as global variables in WebGL)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

// //Then we can draw with this
// // three 2d points
//     var positions = [
//         0, 0,
//         0, 0.5,
//         0.7, 0,
//     ];
//
// //32BitArrays
// //Float32Array gets the array and puts it in the Array_buffer which is binded to positionBuffer
// //gl.STATIC_DRAW tells WebGL how to use the data (in this case, it's drawing)
//     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);




    //Above this is initialization
    //NEXT: Rendering

    //Resize gl.canvas to display size:
    resizeCanvasToDisplaySize(gl.canvas);


    //To convert clip space values, we need to set them in pixels and we call gl.viewport to set the -1 to 1 of clip space to the canvas size
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    //Clearing up gl colors (to not have conflicts with previous (we make it transparent)

    //Selects color to clear (black/everything)
    gl.clearColor(0.0,0.0,0.0,0.0);
    //Clears it
    gl.clear(gl.COLOR_BUFFER_BIT);

    //Specify program to use
    gl.useProgram(program)

    //We need to enable this position Attribute to indicate where the shader must put info into for render
    gl.enableVertexAttribArray(positionAttributeLocation);

    //Bind to position buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    //Attributes of the triangle:
    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2;          // 2 components per iteration (read 2 values at a time (for x, y))
    var type = gl.FLOAT;   // the data is 32bit floats (It mentions that the data being sent are floats
    var normalize = false; // don't normalize the data (Mostly useful when your buffer contains integer data such as gl.UNSIGNED_BYTE.) -> (Converts into 0 to 1 (from the 8 bit size (color like RGB up to 256)
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position (in this case 2* 4 bytes (for float) = 8 -> close to 0 so 0 works
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset) // Here it binds Array_Buffer info (position to position AttributeLocation VERY IMPORTANT!!!

    gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);

    // vec4 is a 4 float value. In JavaScript you could think of it something like a_position = {x: 0, y: 0, z: 0, w: 0}. Above we set size = 2. Attributes default to 0, 0, 0, 1 so this attribute will get its first 2 values (x and y) from our buffer. The z, and w will be the default 0 and 1 respectively.
    function render(){

        //Clearing up gl colors (to not have conflicts with previous (we make it transparent)




        setRectangle(gl, 0, 0, canvas.width, canvas.height);
        gl.uniform1f(timeUniformLocation, (performance.now() - startTime)/1000);

        console.log("position:", positionAttributeLocation);
        console.log("time:", timeUniformLocation);

        //Execution
        var primitiveType = gl.TRIANGLES; // Will draw a triangle every 3 times
        var offset = 0;  //Start at 0
        var count = 6; //Analyze 4 points only (3 iterations (to execute the 3 points))

        //Clears it
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(primitiveType, offset, count);

        requestAnimationFrame(render);
    }

    render();
}

function setRectangle(gl, x, y, width, height){
    const x1 = x;
    const x2 = x + width;
    const y1 = y;
    const y2 = y + height;

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([x1, y1, x2, y2, x2, y1, x1, y1, x1, y2, x2, y2]), gl.STATIC_DRAW)
}

function setTriangle(gl, x1, y1, x2, y2, x3, y3){
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([x1, y1, x2, y2, x3, y3]), gl.STATIC_DRAW);
}


// Safely execute once HTML elements are fully parsed
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
} else {
    main();
}