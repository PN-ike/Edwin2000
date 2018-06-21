var robotTransformationNode;
var headTransformationNode;
var rightArmTransformationNode;
var leftArmTransformationNode
var roboX = 0;
var roboY = 0;
var roboZ = 0;

//implements robos layout, called once from init()

function createRobot(gl, resources) {
  //create scenegraph
  var robotBaseNode = new  MaterialSGNode();

  robotBaseNode.ambient = [0.24725, 0.1995, 0.0745, 1];
  robotBaseNode.diffuse = [0.75164, 0.60648, 0.22648, 1];
  robotBaseNode.specular = [0.628281, 0.555802, 0.366065, 1];
  robotBaseNode.shininess = 4;


  var cubeNode = new CubeTextureSGNode(robotBodyTexture, 4, new RenderSGNode(makeCube()));

  robotTransformationNode = new TransformationSGNode(mat4.create(), [
              new TransformationSGNode(glm.transform({
                  translate: [roboX, roboY, roboZ]}),  [
              cubeNode
              ])]);

  robotBaseNode.append(robotTransformationNode);

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

    rightArmTransformationNode = new TransformationSGNode(mat4.create(), [
                new TransformationSGNode(glm.transform({
                translate: [-0.4, 0, 0],
                scale: [.8,.3,.3]
              }),  [
                cubeNode
              ])]);

    robotTransformationNode.append(rightArmTransformationNode);


    leftArmTransformationNode = new TransformationSGNode(mat4.create(), [
                new TransformationSGNode(glm.transform({
                translate: [0.4, 0, 0],
                scale: [.8,.3,.3]
              }),  [
                cubeNode
              ])]);

    robotTransformationNode.append(leftArmTransformationNode);

    var antennaTransformationNode = new TransformationSGNode(mat4.create(), [
                new TransformationSGNode(glm.transform({
                rotateY: animatedAngle,
                translate: [0.07, 0.5, 0.1],
                scale: [0.1, 0.5, 0.1]}),  [
                cubeNode
              ])]);

  cubeNode = new CubeTextureSGNode(robotHeadTexture, 4,
                  new RenderSGNode(makeCube()));

  headTransformationNode = new TransformationSGNode(mat4.create(), [
              new TransformationSGNode(glm.transform({
                  translate: [0, 0.4, 0],
                  scale: [0.4,0.33,0.5] }),  [
              cubeNode
              ])]);

  robotTransformationNode.append(headTransformationNode);

  headTransformationNode.append(antennaTransformationNode);

  return robotBaseNode;
}

function animateRobot() {
  mat4.multiply(headTransformationNode.matrix, mat4.create(), glm.rotateY(++circleCount*2));
  mat4.multiply(leftArmTransformationNode.matrix, mat4.create(), glm.rotateX(circleCount*3));
  mat4.multiply(rightArmTransformationNode.matrix, mat4.create(), glm.rotateX(circleCount*3));

  roboWalkInACircle();
}

function roboDance() {

  robotTransformationNode.matrix = glm.transform({
    rotateY: animatedAngle,
    translate: [roboX, roboY, roboZ],
  });
}

function roboWalkInACircle() {

  mat4.multiply(robotTransformationNode.matrix, mat4.create(), glm.rotateY(circleCount*2));
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
