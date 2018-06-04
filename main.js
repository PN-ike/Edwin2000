//the OpenGL context
var gl = null;
//our shader program
var shaderProgram = null;

var canvasWidth = 2000;
var canvasHeight = 1200;
var aspectRatio = canvasWidth / canvasHeight;
var near = 1;
var far = 150;

//rendering context
var context;
var circleCount = 0;
//camera and projection settings
var animatedAngle = 0;
var fieldOfViewInRadians = convertDegreeToRadians(30);

var textureVertexShader;
var textureFragmentShader;

var robotHeadTexture;
var robotBodyTexture;
var cloudTexture;
var floorTexture;
var skyTexture;

var root;
var robotTransformationNode;
var bodyTransformationNode;

loadResources({
  vs: 'shader/vs.glsl',
  fs: 'shader/fs.glsl',
  robotBodyTexture: 'models/robotBodyTexture.png',
  robotFaceTexture: 'models/robotFaceTexture.png',
  cloudTexture: 'models/cloud.png',
  floorTexture: 'models/floor2.jpg',
  windowTexture: 'models/window.png',
  backTexture: 'models/miramar_bk.jpg',
  downTexture: 'models/miramar_dn.jpg',
  frontTexture: 'models/miramar_ft.jpg',
  leftTexture: 'models/miramar_lf.jpg',
  rightTexture: 'models/miramar_rt.jpg',
  upTexture: 'models/miramar_up.jpg'


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

  camera = new Camera();

  cloudTexture = initTexture(resources.cloudTexture);
  floorTexture = initTexture(resources.floorTexture);
  windowTexture = initTexture(resources.windowTexture);

  var textures = [resources.robotBodyTexture,
                  resources.robotBodyTexture,
                  resources.robotBodyTexture,
                  resources.robotBodyTexture,
                  resources.robotBodyTexture,
                  resources.robotFaceTexture];

  robotHeadTexture = initCubeTexture(textures);

  textures[5] = resources.robotBodyTexture;

  robotBodyTexture = initCubeTexture(textures);

  textures = [resources.leftTexture,

                  resources.rightTexture,
                  resources.downTexture,
                  resources.upTexture,
                  resources.frontTexture,
                  resources.backTexture];

  skyTexture = initCubeTexture(textures);

  //create scenegraph
  root = new SGNode();
  root.append(createSky());
  root.append(createFloor(resources));
  root.append(createRobot(gl, resources));
  root.append(createEdwin(gl, resources));
  root.append(createGlassWall(resources));
  root.append(createClouds(resources));


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

  animateRobot(timeInMilliseconds);
  animateEdwin(timeInMilliseconds);
  displayText(timeInMilliseconds);
  //displayText(camera.viewDirection[0]);


  if (camera.free) {
      camera.updateViewDirection();
  }

  root.render(context);

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
//TODO set normals correct for lighting
function makeCube() {

  var s = 0.3;

   var position =
   [-s, s, -s,
		-s, s, s,
		s, s, s,
		s, s, -s,

		// Left
		-s, s, s,
		-s, -s, s,
		-s, -s, -s,
		-s, s, -s,

		// Right
		s, s, s,
		s, -s, s,
		s, -s, -s,
		s, s, -s,

		// Front
		s, s, s,
		s, -s, s,
		-s, -s, s,
		-s, s, s,

		// Back
		s, s, -s,
		s, -s, -s,
		-s, -s, -s,
		-s, s, -s,

		// Bottom
		-s, -s, -s,
		-s, -s, s,
		s, -s, s,
		s, -s, -s];

   var normal = [ //TODO
     0, 0, 1,
     0, 0, 1,
     0, 0, 1,
     0, 0, 1,

     0, 0, 1,
     0, 0, 1,
     0, 0, 1,
     0, 0, 1,

     0, 0, 1,
     0, 0, 1,
     0, 0, 1,
     0, 0, 1,

     0, 0, 1,
     0, 0, 1,
     0, 0, 1,
     0, 0, 1,

     0, 0, 1,
     0, 0, 1,
     0, 0, 1,
     0, 0, 1,

     0, 0, 1,
     0, 0, 1,
     0, 0, 1,
     0, 0, 1
   ];
   var texture = [
     0, 0,
     0, 1,
     1, 1,
     1, 0,

     0, 0,
     1, 0,
     1, 1,
     0, 1,

     1, 1,
     0, 1,
     0, 0,
     1, 0,

     1, 1,
     1, 0,
     0, 0,
     0, 1,

     0, 0,
     0, 1,
     1, 1,
     1, 0,

     1, 1,
     1, 0,
     0, 0,
     0, 1
 ];
   var index = [
		// Top
		0, 1, 2,
		0, 2, 3,

		// Left
		5, 4, 6,
		6, 4, 7,

		// Right
		8, 9, 10,
		8, 10, 11,

		// Front
		13, 12, 14,
		15, 14, 12,

		// Back
		16, 17, 18,
		16, 18, 19,

		// Bottom
		21, 20, 22,
		22, 20, 23
	];
   return {
     position: position,
     normal: normal,
     texture: texture,
     index: index
   };
 }
