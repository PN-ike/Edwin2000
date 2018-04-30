var edwinTransformationNode;

var edwinX = -10;
var edwinY = 2;
var edwinZ = 0;

//implements edwins layout, called once from init()
function createEdwin(rootNode) {
  //body
  edwinTransformationNode =  new TransformationSceneGraphNode(glm.transform({
      translate: [edwinX, edwinY, edwinZ],
      scale: [1,0.5, 5.0],
      rotateY: 90
            }));
  rootNode.append(edwinTransformationNode);

  edwinTransformationNode.append(new CubeRenderNode());


  var leftBackWingTransformationMatrix = mat4.create();
  mat4.mul(leftBackWingTransformationMatrix, leftBackWingTransformationMatrix,makeYRotationMatrix(convertDegreeToRadians(90)));
  mat4.mul(leftBackWingTransformationMatrix, leftBackWingTransformationMatrix,makeZShearMatrix(0.5, 0))
  mat4.mul(leftBackWingTransformationMatrix, leftBackWingTransformationMatrix,makeYShearMatrix(0, 0.8))
  mat4.mul(leftBackWingTransformationMatrix, leftBackWingTransformationMatrix,makeTranslationMatrix(-0.2, 0, 0.6))
  mat4.mul(leftBackWingTransformationMatrix, leftBackWingTransformationMatrix,makeScaleMatrix(0.5, 0.1, 1))
  var leftBackWingTransformationNode =  new TransformationSceneGraphNode(leftBackWingTransformationMatrix);
  edwinTransformationNode.append(leftBackWingTransformationNode);

  leftBackWingTransformationNode.append(new CubeRenderNode());


  var rightBackWingTransformationMatrix = mat4.create();
  mat4.mul(rightBackWingTransformationMatrix, rightBackWingTransformationMatrix,makeYRotationMatrix(convertDegreeToRadians(90)));
  mat4.mul(rightBackWingTransformationMatrix, rightBackWingTransformationMatrix,makeZShearMatrix(-0.5, 0))
  mat4.mul(rightBackWingTransformationMatrix, rightBackWingTransformationMatrix,makeYShearMatrix(0, 0.8))
  mat4.mul(rightBackWingTransformationMatrix, rightBackWingTransformationMatrix,makeTranslationMatrix(-0.2, 0, -0.6))
  mat4.mul(rightBackWingTransformationMatrix, rightBackWingTransformationMatrix,makeScaleMatrix(0.5, 0.1, 1))
  var rightBackWingTransformationNode =  new TransformationSceneGraphNode(rightBackWingTransformationMatrix);
  edwinTransformationNode.append(rightBackWingTransformationNode);

  rightBackWingTransformationNode.append(new CubeRenderNode());

  // top finn
  var finnTransformationMatrix = mat4.create();
  mat4.mul(finnTransformationMatrix, finnTransformationMatrix,makeYRotationMatrix(convertDegreeToRadians(90)));
  mat4.mul(finnTransformationMatrix, finnTransformationMatrix,makeXRotationMatrix(convertDegreeToRadians(90)));
  mat4.mul(finnTransformationMatrix, finnTransformationMatrix,makeZShearMatrix(-0.5, 0));
  mat4.mul(finnTransformationMatrix, finnTransformationMatrix,makeTranslationMatrix(0, 0, -0.5));
  mat4.mul(finnTransformationMatrix, finnTransformationMatrix,makeScaleMatrix(0.5, 0.1, 1));
  var finnTransformationNode =  new TransformationSceneGraphNode(finnTransformationMatrix);
  edwinTransformationNode.append(finnTransformationNode);

  finnTransformationNode.append(new CubeRenderNode());

}

//implements movement of edwin, called for each frame from render()
//turn of when working on the layout!!!
function animateEdwin () {
  edwinFlyToRoboAndDance();
}

function edwinFlyToRoboAndDance() {

  if (edwinX < roboX) {
    edwinMove();
  } else {
    edwinDance();
  }
}

function edwinMove() {

  edwinX+= 0.05;

  var edwinTransformationMatrix = glm.transform({
    rotateY: 90,
    translate: [edwinX, edwinY, edwinZ],
    scale: [1,0.5, 5.0],});

    edwinTransformationNode.setMatrix(edwinTransformationMatrix);

}

function edwinDance() {

  var edwinTransformationMatrix = glm.transform({
    rotateY: animatedAngle,
    translate: [edwinX, edwinY, edwinZ],
    scale: [1,0.5, 5.0],});

    edwinTransformationNode.setMatrix(edwinTransformationMatrix);

}
