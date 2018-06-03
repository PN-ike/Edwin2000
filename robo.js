var robotTransformationNode;

var roboX = 0;
var roboY = 0;
var roboZ = 0;

//implements robos layout, called once from init()

function createRobot(gl, resources) {
  //create scenegraph
  var robotBaseNode = new ShaderSGNode(createProgram(gl, resources.vs, resources.fs));

  var cubeNode = new CubeTextureSGNode(robotBodyTexture, 4, new RenderSGNode(makeCube()));

  robotTransformationNode = new TransformationSGNode(mat4.create(), [
              new TransformationSGNode(glm.transform({
                  translate: [roboX, roboY, roboZ]}),  [
              cubeNode
              ])]);

  robotBaseNode.append(robotTransformationNode);

  var antennaTransformationNode = new TransformationSGNode(mat4.create(), [
              new TransformationSGNode(glm.transform({
                rotateY: animatedAngle,
                translate: [0.07, 0.5, 0.1],
                scale: [0.1, 0.5, 0.1]}),  [
              cubeNode
              ])]);

  robotTransformationNode.append(antennaTransformationNode);


    //left leg
    var leftLegTransformationNode = new TransformationSGNode(mat4.create(), [
                new TransformationSGNode(glm.transform({
                  translate: [0.16,-0.6,0],
                  scale: [0.2,1,1]}),  [
                cubeNode
                ])]);

    robotTransformationNode.append(leftLegTransformationNode);

    //right leg
    var rightLegTransformationNode = new TransformationSGNode(mat4.create(), [
                new TransformationSGNode(glm.transform({
                translate: [-0.16,-0.6,0],
                scale: [0.2,1,1]}),  [
                cubeNode
                  ])]);

        robotTransformationNode.append(rightLegTransformationNode);

  cubeNode = new CubeTextureSGNode(robotHeadTexture, 4,
                  new RenderSGNode(makeCube()));

  headTransformationNode = new TransformationSGNode(mat4.create(), [
              new TransformationSGNode(glm.transform({
                  translate: [0, 0.4, 0],
                  scale: [0.4,0.33,0.5] }),  [
              cubeNode
              ])]);

  robotTransformationNode.append(headTransformationNode);

  return robotBaseNode;
}

function animateRobot() {
  roboWalkInACircle();
}

function roboDance() {

  robotTransformationNode.matrix = glm.transform({
    rotateY: animatedAngle,
    translate: [roboX, roboY, roboZ],
  });
}

//implements movement of robo, called for each frame from render()
//turn of when working on the layout!!!
//TODO implement circle walk with glm.tranform();

function roboWalkInACircle() {
  mat4.multiply(robotTransformationNode.matrix, mat4.create(), glm.rotateY(++circleCount));
  mat4.multiply(robotTransformationNode.matrix, robotTransformationNode.matrix, glm.translate(3, 0,0));
}

function roboFly() {

  //update transformation of robot for rotation animation

  if (roboY < 3) {
    roboY += 0.01;
  }
  if (roboX < 0.5) {
    roboX += 0.01;
  } else {
    roboX -= 0.01;
  }

  robotTransformationNode.matrix = glm.transform({
    translate: [roboX, roboY, roboZ],
    rotateY: animatedAngle
  });
}
