//the OpenGL context
var gl = null;
//our shader program
var shaderProgram = null;

var canvasWidth = 2000;
var canvasHeight = 1200;
var aspectRatio = canvasWidth / canvasHeight;
//rendering context
var context;
//camera and projection settings
var animatedAngle = 0;
var fieldOfViewInRadians = convertDegreeToRadians(30);
//load the shader resources using a utility function
var simpleVertexShader;
var simpleFragmentShader;
var staticColorVertexShader;
var billboardVertexShader;

loadResources({
  vs: 'shader/simple.vs.glsl',
  fs: 'shader/simple.fs.glsl',
  bvs: 'shader/billboard.vs.glsl',
  staticcolorvs: 'shader/static_color.vs.glsl'
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

  //in WebGL / OpenGL3 we have to create and use our own shaders for the programmable pipeline
  //create the shader program
  shaderProgram = createProgram(gl, resources.vs, resources.fs);
  simpleVertexShader = resources.vs;
  simpleFragmentShader = resources.fs;
  billboardVertexShader = resources.bvs;
  staticColorVertexShader = resources.staticcolorvs;

  camera = new Camera();

  //set buffers for quad
  initQuadBuffer();
  //set buffers for cube
  initCubeBuffer();

  //create scenegraph
  rootNode = new SGNode();

  createFloor(rootNode);
  createRobot(rootNode);
  createEdwin(rootNode);
  createGlassWall(rootNode);

  initInteraction(gl.canvas);

}

/**
 * render one frame
 */
function render(timeInMilliseconds) {

  //set background color to light gray
  gl.clearColor(0.6, 0.9, 0.9, 1.0);
  //clear the buffer
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  //enable depth test to let objects in front occluse objects further away
  gl.enable(gl.DEPTH_TEST);

  gl.enable(gl.BLEND);

  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  //activate this shader program
  gl.useProgram(shaderProgram);

  context = createSceneGraphContext(gl, shaderProgram);

  animateRobot();
  animateEdwin(timeInMilliseconds);
  displayText(timeInMilliseconds);
  //displayText(camera.viewDirection[0]);

  if (camera.free) {
      camera.updateViewDirection();
  }
  rootNode.render(context);

  //request another render call as soon as possible
  requestAnimationFrame(render);

  //animate based on elapsed time
  animatedAngle = timeInMilliseconds/10;
}

function setUpModelViewMatrix(sceneMatrix, viewMatrix) {
  var modelViewMatrix = mat4.multiply(mat4.create(), viewMatrix, sceneMatrix);
  gl.uniformMatrix4fv(gl.getUniformLocation(context.shader, 'u_modelView'), false, modelViewMatrix);
}

function calculateViewMatrix() {


  if (camera.free) {
    viewMatrix = mat4.lookAt(mat4.create(), camera.position, vec3.add(vec3.create(), camera.position, camera.viewDirection), camera.myUp);
  } else {
    //viewMatrix = mat4.lookAt(mat4.create(), camera.position, camera.viewDirection, camera.myUp);
    viewMatrix = mat4.lookAt(mat4.create(), camera.position, vec3.add(vec3.create(), camera.position, camera.viewDirection), camera.myUp);
  }
  return viewMatrix;
}
