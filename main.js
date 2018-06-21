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
var fieldOfViewInRadians = convertDegreeToRadians(60);

var textureVertexShader;
var textureFragmentShader;
var rotateLight2;
var robotHeadTexture;
var robotBodyTexture;
var cloudTexture;
var floorTexture;
var skyTexture;

var root;
var robotTransformationNode;
var bodyTransformationNode

var cameraFlight = true;

var fireTexture;

var nParticles = 200;

var psTextureNode = new Array (nParticles);
var psTransformationNode = new Array(nParticles);

var lifeTime = new Array(nParticles);

var particleX = new Array(nParticles);
var particleY = new Array(nParticles);
var particleZ = new Array(nParticles);

loadResources({
  vs: 'shader/vs.glsl',
  fs: 'shader/fs.glsl',
  vs_single: 'shader/single.vs.glsl',
  fs_single: 'shader/single.fs.glsl',
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
  fireTexture: 'models/fireParticle.png'

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
  fireTexture = initTexture(resources.fireTexture);

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
  root =  new SGNode();
  //TODO remove sun from sky
//TODO check matiarl2 u_mat2?????
    {
      //initialize light
      let light = new LightSGNode(); //use now framework implementation of light node

      light.diffuse = [1, 0, 0, 1];
      light.specular = [1, 0, 0, 1];
      light.position = [0, 0, 0];

      rotateLight = new TransformationSGNode(mat4.create());
       let translateLight = new TransformationSGNode(glm.translate(0,0,0)); //translating the light is the same as setting the light position

      translateLight.append(light);
      translateLight.append(createLightSphere(resources)); //add sphere for debugging: since we use 0,0,0 as our light position the sphere is at the same position as the light source
      root.append(translateLight);
    }


  {
    //TASK 5-1 create red light node at [2, 0.2, 0]
    let light2 = new LightSGNode();
    light2.uniform = 'u_light2';
    light2.ambient = [0.8, 0.8, 0.8, 1];
    light2.diffuse = [1, 1, 1, 1];
    light2.specular = [1, 1, 1, 1];
    light2.position = [2, -0.5, 0];
    light2.append(createLightSphere(resources));
    rotateLight2 = new TransformationSGNode(mat4.create(), [
        light2
    ]);

    root.append(rotateLight2);
  }
  root.append(createSky());
  root.append(createFloor(resources));
  root.append(createRobot(gl, resources));
  root.append(createEdwin(gl, resources));
  root.append(createGlassWall(resources));
  root.append(createClouds(resources));

  var i;
for (i = 0; i < nParticles; i++) {

  lifeTime[i] = Math.random()/2;
  console.log(lifeTime[i]);


  let transparentSGNode = new TransparentSGNode()
  let psBillboardNode = new BillboardSGNode();
  psTextureNode[i] = new TextureSGNode(fireTexture, 2, new RenderSGNode(makeRect(.005, .005)));

  psBillboardNode.append(psTextureNode[i]);

  particleX[i] = 0 + (Math.random() -5)/10
  particleY[i] = 0
  particleZ[i] = 0 + (Math.random()-5)/10

  console.log(particleX[i]);


  psTransformationNode[i] = new TransformationSGNode(mat4.create(), [
              new TransformationSGNode(glm.transform({
                translate: [particleX[i], particleY[i], particleZ[i]]
              }),  [psBillboardNode])]);

  root.append(psTransformationNode[i]);

  }


initInteraction(gl.canvas);
}

function createLightSphere(resources) {
    return new ShaderSGNode(createProgram(gl, resources.vs_single, resources.fs_single), [
      new RenderSGNode(makeSphere(.2,10,10))
    ]);
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

  // particle system
  for (let i = 0; i < nParticles; i++) {
    //psTextureNode[i].texture = fireTexture;

    if (particleY[i] < lifeTime[i]) {
      particleY[i] += 0.003;
    } else {
      particleY[i] = 0;
    }


    psTransformationNode[i].matrix = glm.transform({
      translate: [particleX[i], particleY[i], particleZ[i]]
    });
  }


  mat4.multiply(rotateLight2.matrix, mat4.create(), glm.rotateY(circleCount/2));
  mat4.multiply(rotateLight2.matrix, rotateLight2.matrix, glm.translate(10, 12,0));

  if(!camera.free && cameraFlight) {
    animateCamera(camera, timeInMilliseconds);
  }

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

   var normal = [
     0, 1, 0,
     0, 1, 0,
     0, 1, 0,
     0, 1, 0,

     -1, 0, 0,
     -1, 0, 0,
     -1, 0, 0,
     -1, 0, 0,

     1, 0, 0,
     1, 0, 0,
     1, 0, 0,
     1, 0, 0,

     0, 0, -1,
     0, 0, -1,
     0, 0, -1,
     0, 0, -1,

     0, 0, 1,
     0, 0, 1,
     0, 0, 1,
     0, 0, 1,

     0, -1, 0,
     0, -1, 0,
     0, -1, 0,
     0, -1, 0
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
