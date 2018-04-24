//the OpenGL context
var gl = null;
//our shader program
var shaderProgram = null;

var canvasWidth = 800;
var canvasHeight = 800;
var aspectRatio = canvasWidth / canvasHeight;

//camera and projection settings
var animatedAngle = 0;
var fieldOfViewInRadians = convertDegreeToRadians(60);

var modelViewLocation;
var positionLocation;
var colorLocation;
var projectionLocation;
//comment to try pushing
var movementButtonPressend = false;

//links to buffer stored on the GPU
var quadVertexBuffer, quadColorBuffer;
var cubeVertexBuffer, cubeColorBuffer, cubeIndexBuffer;

var quadVertices = new Float32Array([
    -1.0, -1.0,
    1.0, -1.0,
    -1.0, 1.0,
    -1.0, 1.0,
    1.0, -1.0,
    1.0, 1.0]);

var quadColors = new Float32Array([
    1, 0, 0, 1,
    0, 1, 0, 1,
    0, 0, 1, 1,
    0, 0, 1, 1,
    0, 1, 0, 1,
    0, 0, 0, 1]);

var s = 0.3; //size of cube
var cubeVertices = new Float32Array([
   -s,-s,-s, s,-s,-s, s, s,-s, -s, s,-s,
   -s,-s, s, s,-s, s, s, s, s, -s, s, s,
   -s,-s,-s, -s, s,-s, -s, s, s, -s,-s, s,
   s,-s,-s, s, s,-s, s, s, s, s,-s, s,
   -s,-s,-s, -s,-s, s, s,-s, s, s,-s,-s,
   -s, s,-s, -s, s, s, s, s, s, s, s,-s,
]);

var cubeColors = new Float32Array([
   0,1,1, 0,1,1, 0,1,1, 0,1,1,
   1,0,1, 1,0,1, 1,0,1, 1,0,1,
   1,0,0, 1,0,0, 1,0,0, 1,0,0,
   0,0,1, 0,0,1, 0,0,1, 0,0,1,
   1,1,0, 1,1,0, 1,1,0, 1,1,0,
   0,1,0, 0,1,0, 0,1,0, 0,1,0
]);

var cubeIndices =  new Float32Array([
   0,1,2, 0,2,3,
   4,5,6, 4,6,7,
   8,9,10, 8,10,11,
   12,13,14, 12,14,15,
   16,17,18, 16,18,19,
   20,21,22, 20,22,23
]);

var cam;

var previousViewMatrix;

//load the shader resources using a utility function
loadResources({
  vs: 'shader/simple.vs.glsl',
  fs: 'shader/simple.fs.glsl'
}).then(function (resources /*an object containing our keys with the loaded resources*/) {
  init(resources);

  //render one frame
  render();
});

/**
 * initializes OpenGL context, compile shader, and load buffers
 */
function init(resources) {


  //create a GL context
  gl = createContext(canvasWidth, canvasHeight);

  cam = new Camera();
  previousViewMatrix = lookAt(cam.eyex, cam.eyey, cam.eyez, cam.centerx, cam.centery, cam.centerz, cam.upx, cam.upy, cam.upz);

  //in WebGL / OpenGL3 we have to create and use our own shaders for the programmable pipeline
  //create the shader program
  shaderProgram = createProgram(gl, resources.vs, resources.fs);

  modelViewLocation = gl.getUniformLocation(shaderProgram, 'u_modelView');
  projectionLocation = gl.getUniformLocation(shaderProgram, 'u_projection');

  //we are looking up the internal location after compilation of the shader program given the name of the attribute
  positionLocation = gl.getAttribLocation(shaderProgram, "a_position");
  //same for color
  colorLocation = gl.getAttribLocation(shaderProgram, "a_color");

  //set buffers for quad
  initQuadBuffer();
  //set buffers for cubes
  initCubeBuffer();
  initInteraction(gl.canvas);

}

/**
 * render one frame
 */
function render(timeInMilliseconds) {

  //set background color to light gray
  gl.clearColor(0.5, 0.7, 0.9, 1.0);
  //clear the buffer
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  //enable depth test to let objects in front occluse objects further away
  gl.enable(gl.DEPTH_TEST);

  //checkForWindowResize(gl);
  //aspectRatio = gl.canvsWidth / gl.canvasHeight;

  //activate this shader program
  gl.useProgram(shaderProgram);

  var projectionMatrix = makePerspectiveProjectionMatrix(fieldOfViewInRadians, aspectRatio, 1, 20);

  gl.uniformMatrix4fv(projectionLocation, false, projectionMatrix);

  var sceneMatrix = makeIdentityMatrix();
  
  //var viewMatrix = calculateViewMatrix(makeIdentityMatrix());
  var viewMatrix = calculateViewMatrix(previousViewMatrix);
  setUpModelViewMatrix(viewMatrix, sceneMatrix);

  renderQuad(sceneMatrix, viewMatrix);
  renderRobot(sceneMatrix, viewMatrix);
  //myTestCameraRenderFunction(sceneMatrix, viewMatrix);

  //request another render call as soon as possible
  requestAnimationFrame(render);

  animatedAngle = timeInMilliseconds/10;
}

function calculateViewMatrix(viewMatrix) {

  if (cam.moveButton) {
    if (cam.forward) {
      viewMatrix = cam.moveForward(viewMatrix);
    } else if (cam.back) {
      viewMatrix = cam.moveBack(viewMatrix);
    } else if (cam.left) {
      viewMatrix = cam.moveLeft(viewMatrix);
    } else if (cam.right) {
      viewMatrix = cam.moveRight(viewMatrix);
    } else if (cam.up) {
      viewMatrix = cam.moveUp(viewMatrix);
    }else if (cam.down) {
      viewMatrix = cam.moveDown(viewMatrix);
    }
    previousViewMatrix = viewMatrix;
  }
  else if (cam.lookButton) {
    if (cam.right) {
      viewMatrix = cam.lookRight(viewMatrix);
    } else if (cam.left) {
      viewMatrix = cam.lookLeft(viewMatrix);
    } else if (cam.up) {
      viewMatrix = cam.lookUp(viewMatrix);
    } else if (cam.down) {
      viewMatrix = cam.lookDown(viewMatrix);
    }
    previousViewMatrix = viewMatrix;
  } else {
    viewMatrix = previousViewMatrix;
  }

return viewMatrix;
}

function setUpModelViewMatrix(viewMatrix, sceneMatrix) {

  var modelViewMatrix = matrixMultiply(viewMatrix, sceneMatrix );

  gl.uniformMatrix4fv(modelViewLocation, false, modelViewMatrix);
}
