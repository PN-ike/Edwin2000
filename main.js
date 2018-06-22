var gl = null;
var shaderProgram = null;
var canvasWidth = 2000;
var canvasHeight = 1200;
var aspectRatio = canvasWidth / canvasHeight;
var near = 1;
var far = 150;
var context;

//camera and projection settings
var animatedAngle = 0;
var fieldOfViewInRadians = convertDegreeToRadians(60);
var cameraFlight = true;

// root of the scenegraph
var root;

// texture variables
var robotHeadTexture;
var robotBodyTexture;
var cloudTexture;
var floorTexture;
var skyTexture;
var fireTexture;
var endCloudTexture;
var metalTexture;

// variables for animation
var circleCount = 0;
var robotTransformationNode;
var bodyTransformationNode
var rotateLight2;

loadResources({
  vs: 'shader/vs.glsl',
  fs: 'shader/fs.glsl',
  vs_single: 'shader/single.vs.glsl', // TODO
  fs_single: 'shader/single.fs.glsl',// TODO
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
  upTexture: 'models/miramar_up.jpg',
  fireTexture: 'models/fireParticle2.png',
  endCloudTexture: 'models/cloudTheEnd.png',
  metalTexture: 'models/metal.jpg',

  bonfireModel: 'models/bonfire.obj',
  c3poModel: 'models/C-3PO.obj'

}).then(function (resources /*an object containing our keys with the loaded resources*/) {
  init(resources);

  //render one frame
  render();
});

function init(resources) {

  //create a GL context
  gl = createContext(canvasWidth, canvasHeight);

  //create the shader program
  shaderProgram = createProgram(gl, resources.vs, resources.fs);

  //create our camera
  camera = new Camera();

  // initialize our textures
  cloudTexture = initTexture(resources.cloudTexture);
  floorTexture = initTexture(resources.floorTexture);
  windowTexture = initTexture(resources.windowTexture);
  fireTexture = initTexture(resources.fireTexture);
  endCloudTexture = initTexture(resources.endCloudTexture);

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


  textures = [resources.metalTexture,
                  resources.metalTexture,
                  resources.metalTexture,
                  resources.metalTexture,
                  resources.metalTexture,
                  resources.metalTexture];

  metalTexture = initCubeTexture(textures);

  //create scenegraph
  root =  new SGNode();

  root.append(createSky());
  root.append(createFloor(resources));
  root.append(createRobot(gl, resources));
  root.append(createEdwin(gl, resources));
  root.append(createGlassWall(resources));
  root.append(createClouds(resources));
  root.append(createC3P0(resources));
  root.append(createBonfire(resources));
  root.append(createSun(resources));
  root.append(createFireLight(resources));
  createParticleEffect(root);

initInteraction(gl.canvas);
}

function createLightSphere(resources) {
    return new ShaderSGNode(createProgram(gl, resources.vs_single, resources.fs_single), [ //TODO
      new RenderSGNode(makeSphere(.2,10,10))
    ]);
  }
/**
 * render one frame
 */
function render(timeInMilliseconds) {

  //set background color
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

  animateParticleEffect();
  animateRobot(timeInMilliseconds);
  animateEdwin(timeInMilliseconds);
  displayText(timeInMilliseconds);
  animateSun();

  if(!camera.free && cameraFlight) { //TODO
    animateCamera(camera, timeInMilliseconds);
  }

  camera.updateViewDirection();

  root.render(context);

  //request another render call as soon as possible
  requestAnimationFrame(render);

  //animate based on elapsed time
  animatedAngle = timeInMilliseconds/10;
}

// compute the modelViewMatrix and pass it to the shaders
function setUpModelViewMatrix(sceneMatrix, viewMatrix) {
  var modelViewMatrix = mat4.multiply(mat4.create(), viewMatrix, sceneMatrix);
  gl.uniformMatrix4fv(gl.getUniformLocation(context.shader, 'u_modelView'), false, modelViewMatrix);
}

function calculateViewMatrix() {
    viewMatrix = mat4.lookAt(mat4.create(), camera.position, vec3.add(vec3.create(), camera.position, camera.viewDirection), camera.myUp);
  return viewMatrix;
}
