var robotTransformationNode;
var headTransformationNode;
var rightArmTransformationNode;
var leftArmTransformationNode
var roboX = 0;
var roboY = 0;
var roboZ = 0;

//TODO change materials
//TODO spotlight


//implements robos layout, called once from init()

function createRobot(gl, resources) {

  // set robots materials
  var robotBaseNode = new  MaterialSGNode();

  robotBaseNode.ambient = [0.24725, 0.1995, 0.0745, 1];
  robotBaseNode.diffuse = [0.75164, 0.60648, 0.22648, 1];
  robotBaseNode.specular = [0.628281, 0.555802, 0.366065, 1];
  robotBaseNode.shininess = 4;

  // set robots texture
  var cubeTextureNode = new CubeTextureSGNode(robotBodyTexture, 4, new RenderSGNode(makeCube()));

  robotTransformationNode = new TransformationSGNode(mat4.create(), [
              new TransformationSGNode(glm.transform({
                  translate: [roboX, roboY, roboZ]}),  [
              cubeTextureNode
              ])]);

  robotBaseNode.append(robotTransformationNode);

    //create left leg
    var leftLegTransformationNode = new TransformationSGNode(mat4.create(), [
                new TransformationSGNode(glm.transform({
                  translate: [0.16,-0.6,0],
                  scale: [0.2,1,1]}),  [
                cubeTextureNode
                ])]);

    robotTransformationNode.append(leftLegTransformationNode);

    //create right leg
    var rightLegTransformationNode = new TransformationSGNode(mat4.create(), [
                new TransformationSGNode(glm.transform({
                translate: [-0.16,-0.6,0],
                scale: [0.2,1,1]}),  [
                cubeTextureNode
                  ])]);

    robotTransformationNode.append(rightLegTransformationNode);

    //create right arm
    rightArmTransformationNode = new TransformationSGNode(mat4.create(), [
                new TransformationSGNode(glm.transform({
                translate: [-0.4, 0, 0],
                scale: [.8,.3,.3]
              }),  [
                cubeTextureNode
              ])]);

    robotTransformationNode.append(rightArmTransformationNode);

    //create left arm
    leftArmTransformationNode = new TransformationSGNode(mat4.create(), [
                new TransformationSGNode(glm.transform({
                translate: [0.4, 0, 0],
                scale: [.8,.3,.3]
              }),  [
                cubeTextureNode
              ])]);

    robotTransformationNode.append(leftArmTransformationNode);

    //create antenna
    var antennaTransformationNode = new TransformationSGNode(mat4.create(), [
                new TransformationSGNode(glm.transform({
                rotateY: animatedAngle,
                translate: [0.07, 0.5, 0.1],
                scale: [0.1, 0.5, 0.1]}),  [
                cubeTextureNode
              ])]);

  //set different texture for robots head
  cubeTextureNode = new CubeTextureSGNode(robotHeadTexture, 4,
                  new RenderSGNode(makeCube()));

  //create head
  headTransformationNode = new TransformationSGNode(mat4.create(), [
              new TransformationSGNode(glm.transform({
                  translate: [0, 0.4, 0],
                  scale: [0.4,0.33,0.5] }),  [
              cubeTextureNode
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

function roboWalkInACircle() {
  mat4.multiply(robotTransformationNode.matrix, mat4.create(), glm.rotateY(circleCount*2));
  mat4.multiply(robotTransformationNode.matrix, robotTransformationNode.matrix, glm.translate(3, 0,0));
}
