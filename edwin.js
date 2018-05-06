var edwinTransformationNode;

var edwinX = -20;
var edwinY = 5;
var edwinZ = -20;
var rotateYAx = 45;
var rotateOZ = 0;
var keyFrames;
var position;
var callCount = 0;
//implements edwins layout, called once from init()
function createEdwin(rootNode) {


  edwinTransformationNode = new TransformationSceneGraphNode(glm.transform({
      translate: [edwinX, edwinY, edwinZ],
      rotateOY: 0,}));
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

  // init key frames
  keyFrames = createKeyFrames();
}

//implements movement of edwin, called for each frame from render()
//turn of when working on the layout!!!
function animateEdwin (timeInMilliSeconds) {
  var startP;
  var destP;
  var startT;
  var destT;
  var position;
  var rotate = false;
  var animationEnd = false;

  if(timeInMilliSeconds <= 3000) {
    startP = keyFrames[0];
    destP = keyFrames[1];
    startT = timeInMilliSeconds;
    destT = 3000;

  } else if(timeInMilliSeconds <= 8000) {
    startP = keyFrames[1];
    destP = keyFrames[2];
    startT = timeInMilliSeconds - 3000;
    destT = 8000 - 3000;
    rotate = true;

  } else if(timeInMilliSeconds <= 12000) {
    startP = keyFrames[2];
    destP = keyFrames[3];
    startT = timeInMilliSeconds - 8000;
    destT = 12000 - 8000;
    rotate = true;

  } else if(timeInMilliSeconds <= 17000) {
    startP = keyFrames[3];
    destP = keyFrames[4];
    startT = timeInMilliSeconds - 12000;
    destT = 17000 - 12000;
    rotate = true;

  } else if(timeInMilliSeconds <= 21000) {
    startP = keyFrames[4];
    destP = keyFrames[5];
    startT = timeInMilliSeconds - 17000;
    destT = 21000 - 17000;
    rotate = true;

  } else if(timeInMilliSeconds <= 28000) {
    startP = keyFrames[5];
    destP = keyFrames[6];
    startT = timeInMilliSeconds - 21000;
    destT = 28000 - 21000;

  } else if(timeInMilliSeconds <= 30000) {
    startP = keyFrames[6];
    destP = keyFrames[7];
    startT = timeInMilliSeconds - 28000;
    destT = 30000 - 28000;

  } else {
    animationEnd = true;
  }

if(!animationEnd) {
    var position = quat.create();
    var t = startT/destT;
    // clamp t
    t = Math.max(0, Math.min(1, t));

    quat.slerp(position, startP, destP, t);

    var rotation = quat.create();
    quat.rotationTo(rotation, startP, destP);

    var edwinRotationMatrix = mat4.create();

    if(rotate) {
      // TODO calculate rotation via animatedAngle
      //var angle = animatedAngle;
      //if(minus) {
      //  angle = -animatedAngle;
      //}
      //rotateYAx = Math.sin(angle/180);
      if(rotateYAx < 360) {
        rotateYAx -= 0.0025;
      } else {
        rotateYAx = 0.0025
      }
    }

    var edwinTransformationMatrix = glm.transform({
        translate: position
      });

    mat4.rotateY(edwinTransformationMatrix, edwinTransformationMatrix, rotateYAx);

    edwinTransformationNode.setMatrix(edwinTransformationMatrix);
  }
}

function createKeyFrames() {
  // fly forward keyframes
  var t0 = quat.fromValues(edwinX, edwinY, edwinZ, 1);
  // 0, 5, 0
  var t3 = quat.fromValues(edwinX + 20, edwinY, edwinZ + 20, 1);

  // fly circle keyframes
  var t8 = quat.fromValues(edwinX + 25, edwinY, edwinZ + 25, 1);
  var t12 = quat.fromValues(edwinX + 20, edwinY, edwinZ + 30, 1);
  var t17 = quat.fromValues(edwinX + 15, edwinY, edwinZ + 25, 1);

  // 0, 5, 0
  var t21 = t3;
  var t28 = quat.fromValues(13, 4.5, 10, 1);

  // fall keyFrame
  var t30 = quat.fromValues(13, 0, 10, 1);

  return new Array(t0, t3, t8, t12, t17, t21, t28, t30);
}

//function edwinFlyToRoboAndDance() {
//
//  if (edwinX < -3 && edwinZ < -3) {
//    edwinMoveToRobo();
//  } else {
//    edwinFlyInACircle();
//  }
//}
//
//function edwinFlyInACircle() {
//      rotateY -= 1
//
//    var robotTransformationMatrix = mat4.multiply(mat4.create(), mat4.create(), glm.rotateY(rotateY));
//      robotTransformationMatrix = mat4.multiply(mat4.create(), robotTransformationMatrix, glm.rotateZ(rotateZ));
//      robotTransformationMatrix = mat4.multiply(mat4.create(), robotTransformationMatrix, glm.translate(edwinX,edwinY,edwinZ));
//      edwinTransformationNode.setMatrix(robotTransformationMatrix);
//
//}
//
//function edwinMoveToRobo() {
//
//  edwinX += 0.01;
//  edwinZ += 0.01;
//
//  if (rotateZ > -25) {
//    rotateZ -= 0.3;
//    edwinX += 0.01;
//    edwinZ -= 0.015;
//  } else {
//    if (rotateY < 60) {
//      rotateY += 0.1;
//      edwinX += 0.01;
//      edwinZ += 0.01;
//    }
//  }
//
//  // if (edwinX > -5) {
//  //   rotateY -= 0.2;
//  // }
//
//  var edwinTransformationMatrix = glm.transform({
//    rotateY: rotateY,
//    rotateZ: rotateZ,
//    translate: [edwinX, edwinY, edwinZ]});
//    edwinTransformationNode.setMatrix(edwinTransformationMatrix);
//
//}
//
//function edwinDance() {
//
//  var edwinTransformationMatrix = gl.pop();
//
//  edwinTransformationMatrix = glm.transform({
//    rotateY: animatedAngle,
//    translate: [edwinX, edwinY, edwinZ],
//    scale: [1,0.5, 5.0],});
//
//    //edwinTransformationNode.setMatrix(edwinTransformationMatrix);
//    gl.push(edwinTransformationMatrix);
//
//}
