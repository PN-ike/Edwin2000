var edwinTransformationNode;

var edwinX = -10;
var edwinY = 4;
var edwinZ = 0;

//implements edwins layout, called once from init()
function createEdwin(rootNode) {


  edwinTransformationNode = new TransformationSceneGraphNode(glm.transform({
      translate: [edwinX, edwinY, edwinZ]}));
  rootNode.append(edwinTransformationNode);


  //body
  var bodyTransformationNode =  new TransformationSceneGraphNode(glm.transform({
      scale: [1,0.8, 5.0],
            }));
  edwinTransformationNode.append(bodyTransformationNode);

  bodyTransformationNode.append(new CubeRenderNode());


  var leftBackWingTransformationMatrix = mat4.create();
  mat4.mul(leftBackWingTransformationMatrix, leftBackWingTransformationMatrix,makeYRotationMatrix(convertDegreeToRadians(90)));
  mat4.mul(leftBackWingTransformationMatrix, leftBackWingTransformationMatrix,makeZShearMatrix(0.5, 0))
  mat4.mul(leftBackWingTransformationMatrix, leftBackWingTransformationMatrix,makeYShearMatrix(0, 0.8))
  mat4.mul(leftBackWingTransformationMatrix, leftBackWingTransformationMatrix,makeTranslationMatrix(1, 0, 0.5))
  mat4.mul(leftBackWingTransformationMatrix, leftBackWingTransformationMatrix,makeScaleMatrix(1, 0.1, 2))
  var leftBackWingTransformationNode =  new TransformationSceneGraphNode(leftBackWingTransformationMatrix);
  edwinTransformationNode.append(leftBackWingTransformationNode);

  leftBackWingTransformationNode.append(new CubeRenderNode());


  var rightBackWingTransformationMatrix = mat4.create();
  mat4.mul(rightBackWingTransformationMatrix, rightBackWingTransformationMatrix,makeYRotationMatrix(convertDegreeToRadians(90)));
  mat4.mul(rightBackWingTransformationMatrix, rightBackWingTransformationMatrix,makeZShearMatrix(-0.5, 0))
  mat4.mul(rightBackWingTransformationMatrix, rightBackWingTransformationMatrix,makeYShearMatrix(0, -0.8))
  mat4.mul(rightBackWingTransformationMatrix, rightBackWingTransformationMatrix,makeTranslationMatrix(1, 0, -0.5))
  mat4.mul(rightBackWingTransformationMatrix, rightBackWingTransformationMatrix,makeScaleMatrix(1, 0.1, 2))
  var rightBackWingTransformationNode =  new TransformationSceneGraphNode(rightBackWingTransformationMatrix);
  edwinTransformationNode.append(rightBackWingTransformationNode);

  rightBackWingTransformationNode.append(new CubeRenderNode());

  // top finn
  var finnTransformationMatrix = mat4.create();
  mat4.mul(finnTransformationMatrix, finnTransformationMatrix,makeYRotationMatrix(convertDegreeToRadians(90)));
  mat4.mul(finnTransformationMatrix, finnTransformationMatrix,makeXRotationMatrix(convertDegreeToRadians(90)));
  mat4.mul(finnTransformationMatrix, finnTransformationMatrix,makeZShearMatrix(-0.5, 0));
  mat4.mul(finnTransformationMatrix, finnTransformationMatrix,makeTranslationMatrix(1, 0, -0.5));
  mat4.mul(finnTransformationMatrix, finnTransformationMatrix,makeScaleMatrix(1, 0.1, 2));
  var finnTransformationNode =  new TransformationSceneGraphNode(finnTransformationMatrix);
  edwinTransformationNode.append(finnTransformationNode);

  finnTransformationNode.append(new CubeRenderNode());

  var leftWingTransformationMatrix = mat4.create();
  mat4.mul(leftWingTransformationMatrix, leftWingTransformationMatrix, makeYRotationMatrix(convertDegreeToRadians(90)));
  mat4.mul(leftWingTransformationMatrix, leftWingTransformationMatrix, makeZShearMatrix(0.5, 0));
  mat4.mul(leftWingTransformationMatrix, leftWingTransformationMatrix, makeYShearMatrix(0, 0.8));
  mat4.mul(leftWingTransformationMatrix, leftWingTransformationMatrix, makeTranslationMatrix(-0.5, 0, 1.5));
  mat4.mul(leftWingTransformationMatrix, leftWingTransformationMatrix, makeScaleMatrix(1.5, 0.1, 5));
  var finnTransformationNode =  new TransformationSceneGraphNode(leftWingTransformationMatrix);
  edwinTransformationNode.append(finnTransformationNode);

  finnTransformationNode.append(new CubeRenderNode());

  var rightWingTransformationMatrix = mat4.create();
  mat4.mul(rightWingTransformationMatrix, rightWingTransformationMatrix, makeYRotationMatrix(convertDegreeToRadians(90)));
  mat4.mul(rightWingTransformationMatrix, rightWingTransformationMatrix, makeZShearMatrix(-0.5, 0));
  mat4.mul(rightWingTransformationMatrix, rightWingTransformationMatrix, makeYShearMatrix(0, -0.8));
  mat4.mul(rightWingTransformationMatrix, rightWingTransformationMatrix, makeTranslationMatrix(-0.5, 0, -1.5));
  mat4.mul(rightWingTransformationMatrix, rightWingTransformationMatrix, makeScaleMatrix(1.5, 0.1, 5));
  var finnTransformationNode =  new TransformationSceneGraphNode(rightWingTransformationMatrix);
  edwinTransformationNode.append(finnTransformationNode);

  finnTransformationNode.append(new CubeRenderNode());


}

//implements movement of edwin, called for each frame from render()
//turn of when working on the layout!!!
function animateEdwin () {
  //edwinFlyToRoboAndDance();
  edwinFlyInACircle()
}

function edwinFlyToRoboAndDance() {

  if (edwinX < roboX) {
    edwinMove();
  } else {
    edwinDance();
  }
}

function edwinFlyInACircle() {
  //scale: [1,0.5, 5.0],
    //
    // console.log(animatedAngle)
    // var flyInACircleMatrix = glm.transform({
    //   rotateY: animatedAngle,
    //   translate: [edwinX, edwinY, edwinZ],
    //   scale: [1,0.5, 5.0]});
    //
    //
    //
    // edwinTransformationNode.setMatrix(flyInACircleMatrix);

    var robotTransformationMatrix = mat4.multiply(mat4.create(), mat4.create(), glm.rotateY(animatedAngle));
      robotTransformationMatrix = mat4.multiply(mat4.create(), robotTransformationMatrix, glm.translate(edwinX,edwinY,edwinZ));
      edwinTransformationNode.setMatrix(robotTransformationMatrix);

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
