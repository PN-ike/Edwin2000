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

//var textureVertexShader;
//var textureFragmentShader;
// texture variables
var robotHeadTexture;
var robotBodyTexture;
var cloudTexture;
var floorTexture;
var skyTexture;
var fireTexture;

// variables for animation
var circleCount = 0;
var robotTransformationNode;
var bodyTransformationNode
var rotateLight2;

// variables for the particle effect
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
       let translateLight = new TransformationSGNode(glm.translate(0,-1,0)); //translating the light is the same as setting the light position

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

  let c3po = new MaterialSGNode([new RenderSGNode(resources.c3poModel)]);
//gold
c3po.ambient = [0.24725, 0.1995, 0.0745, 1];
c3po.diffuse = [0.75164, 0.60648, 0.22648, 1];
c3po.specular = [0.628281, 0.555802, 0.366065, 1];
c3po.shininess = 0.4;

let c3poNode = new TransformationSGNode(mat4.create(),
[new TransformationSGNode(glm.translate(10, 1, 0),  [c3po])]);
root.append(c3poNode);

let bonfire = new MaterialSGNode([ new RenderSGNode(resources.bonfireModel) ]);

bonfire.ambient = [1, 1, 1, 1];
bonfire.diffuse = [1, 1, 1, 1];
bonfire.specular = [0.3, 0.2, 0., 1];
bonfire.shininess = 1;

let bonfireNode = new TransformationSGNode(mat4.create(),
  [
    new TransformationSGNode(glm.transform({ translate: [0, 1, 0], scale: 0.5}), [bonfire])
  ]);
root.append(bonfireNode);


    for (let i = 0; i < nParticles; i++) {

      lifeTime[i] = Math.random()*4;
      console.log(lifeTime[i]);

      psTextureNode[i] = new TransparentSGNode(new MaterialSGNode(new BillboardSGNode(new TextureSGNode(fireTexture, 2,
                  new RenderSGNode(makeRect(.05, .05))))));

      particleX[i] = 0 + (Math.random() -5)/10
      particleY[i] = 0 + Math.random()/10;
      particleZ[i] = 0 + (Math.random()-5)/10

      console.log(particleX[i]);


      psTransformationNode[i] = new TransformationSGNode(mat4.create(), [
                  new TransformationSGNode(glm.transform({
                    translate: [particleX[i], particleY[i], particleZ[i]]
                  }),  [psTextureNode[i]])]);

      root.append(psTransformationNode[i]);

      }

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

  animateRobot(timeInMilliseconds);
  animateEdwin(timeInMilliseconds);
  displayText(timeInMilliseconds);

  // particle system
  for (let i = 0; i < nParticles; i++) {
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
  mat4.multiply(rotateLight2.matrix, rotateLight2.matrix, glm.translate(20, 12,0));

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
