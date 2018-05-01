var robotTransformationNode;

var roboX = 0;
var roboY = .9;
var roboZ = 0;


//implements robos layout, called once from init()
function createRobot(rootNode) {

  //body
  robotTransformationNode =  new TransformationSceneGraphNode(glm.transform({
      translate: [roboX, roboY, roboZ]}));
  rootNode.append(robotTransformationNode);

  robotTransformationNode.append(new CubeRenderNode());

  //head
  var headTransformationNode = new TransformationSceneGraphNode(glm.transform({
      translate: [0, 0.4, 0],
      scale: [0.4,0.33,0.5] }));
  robotTransformationNode.append(headTransformationNode);

  headTransformationNode.append(new CubeRenderNode());

  // TODO
  //   //antenna
  //   sceneMatrix = originSceneMatrix;
  //   sceneMatrix = matrixMultiply(sceneMatrix, makeYRotationMatrix(convertDegreeToRadians(animatedAngle)));
  //   sceneMatrix = matrixMultiply(sceneMatrix, makeTranslationMatrix(0.07, 0.5, 0.1));
  //   sceneMatrix = matrixMultiply(sceneMatrix, makeScaleMatrix(0.1, 0.5, 0.1));
  //   setUpModelViewMatrix(viewMatrix, sceneMatrix);
  //   renderCube();

  //left leg
  var leftLegTransformationNode = new TransformationSceneGraphNode(glm.transform({
      translate: [0.16,-0.6,0],
      scale: [0.2,1,1] }));
  robotTransformationNode.append(leftLegTransformationNode);

  leftLegTransformationNode.append( new CubeRenderNode());

  //right leg
  var rightLegtTransformationNode = new TransformationSGNode(glm.transform({
    translate: [-0.16,-0.6,0],
    scale: [0.2,1,1]
  }));
  robotTransformationNode.append(rightLegtTransformationNode);

  rightLegtTransformationNode.append(new CubeRenderNode());

  //right upperArm
  var rightUpperArmtTransformationNode = new TransformationSGNode(glm.transform({
    translate: [0.4, 0, 0],
    scale: [0.4,0.33,0.5]
  }));
  robotTransformationNode.append(rightUpperArmtTransformationNode);

  rightUpperArmtTransformationNode.append(new CubeRenderNode());

  //right lowerArm
  var rightLowerArmtTransformationNode = new TransformationSGNode(glm.transform({
    translate: [0.6, 0, 0],
    scale: [0.4,0.33,0.5]
  }));
  robotTransformationNode.append(rightLowerArmtTransformationNode);

  rightLowerArmtTransformationNode.append(new CubeRenderNode());

    //left upperArm
  var leftUpperArmtTransformationNode = new TransformationSGNode(glm.transform({
    translate: [-0.4, 0, 0],
    scale: [0.4,0.33,0.5]
  }));
  robotTransformationNode.append(leftUpperArmtTransformationNode);

  leftUpperArmtTransformationNode.append(new CubeRenderNode());

  //left lowerArm
  var leftLowerArmtTransformationNode = new TransformationSGNode(glm.transform({
    translate: [-0.6, 0, 0],
    scale: [0.4,0.33,0.5]
  }));
  robotTransformationNode.append(leftLowerArmtTransformationNode);

  leftLowerArmtTransformationNode.append(new CubeRenderNode());

}

function roboDance() {

  var robotTransformationMatrix = glm.transform({
    rotateY: animatedAngle,
    translate: [roboX, roboY, roboZ],
  });

   robotTransformationNode.setMatrix(robotTransformationMatrix);

}

//implements movement of robo, called for each frame from render()
//turn of when working on the layout!!!

function roboWalkInACircle() {

  //walks in a circle
  var robotTransformationMatrix = mat4.multiply(mat4.create(), mat4.create(), glm.rotateY(animatedAngle));
    robotTransformationMatrix = mat4.multiply(mat4.create(), robotTransformationMatrix, glm.translate(2,0.9,0));
    robotTransformationNode.setMatrix(robotTransformationMatrix);

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

  var robotTransformationMatrix = glm.transform({
    translate: [roboX, roboY, roboZ],
    rotateY: animatedAngle
  });

   robotTransformationNode.setMatrix(robotTransformationMatrix);
}
