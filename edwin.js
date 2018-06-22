var edwinTransformationNode;
var edwinX = -20;
var edwinY = 5;
var edwinZ = -20;

var rotateYAx = 44.8;
var rotateOZ = 0;
var keyFrames;
var position;
var callCount = 0;
//implements edwins layout, called once from init()

function createEdwin(gl, resources) {

  // set edwins materials
  var edwinBaseNode = new MaterialSGNode();

    edwinBaseNode.ambient = [0.24725, 0.1995, 0.0745, 1];
    edwinBaseNode.diffuse = [0.75164, 0.60648, 0.22648, 1];
    edwinBaseNode.specular = [0.628281, 0.555802, 0.366065, 1];
    edwinBaseNode.shininess = 10;

  // set edwins texture
  var cubeNode = new CubeTextureSGNode(robotBodyTexture, 4, new RenderSGNode(makeCube()));

  // set edwins starting position
  edwinTransformationNode = new TransformationSGNode(mat4.create(), [
              new TransformationSGNode(glm.transform({
                translate: [edwinX, edwinY, edwinZ],
                rotateY: 0}))]);

  edwinBaseNode.append(edwinTransformationNode);

  //create body
  var bodyTransformationNode = new TransformationSGNode(mat4.create(), [
              new TransformationSGNode(glm.transform({
                scale: [1,0.8, 5.0]}),  [
              cubeNode
              ])]);

  edwinTransformationNode.append(bodyTransformationNode);

  // create left back wing
  var leftBackWingTransformationMatrix = mat4.create();
  mat4.mul(leftBackWingTransformationMatrix, leftBackWingTransformationMatrix,makeYRotationMatrix(convertDegreeToRadians(90)));
  mat4.mul(leftBackWingTransformationMatrix, leftBackWingTransformationMatrix,makeZShearMatrix(0.5, 0))
  mat4.mul(leftBackWingTransformationMatrix, leftBackWingTransformationMatrix,makeYShearMatrix(0, 0.8))
  mat4.mul(leftBackWingTransformationMatrix, leftBackWingTransformationMatrix,makeTranslationMatrix(1, 0, 0.5))
  mat4.mul(leftBackWingTransformationMatrix, leftBackWingTransformationMatrix,makeScaleMatrix(1, 0.1, 2))
  var leftBackWingTransformationNode =  new TransformationSGNode(leftBackWingTransformationMatrix, cubeNode);
  edwinTransformationNode.append(leftBackWingTransformationNode);

    // create right back wing
  var rightBackWingTransformationMatrix = mat4.create();
  mat4.mul(rightBackWingTransformationMatrix, rightBackWingTransformationMatrix,makeYRotationMatrix(convertDegreeToRadians(90)));
  mat4.mul(rightBackWingTransformationMatrix, rightBackWingTransformationMatrix,makeZShearMatrix(-0.5, 0))
  mat4.mul(rightBackWingTransformationMatrix, rightBackWingTransformationMatrix,makeYShearMatrix(0, -0.8))
  mat4.mul(rightBackWingTransformationMatrix, rightBackWingTransformationMatrix,makeTranslationMatrix(1, 0, -0.5))
  mat4.mul(rightBackWingTransformationMatrix, rightBackWingTransformationMatrix,makeScaleMatrix(1, 0.1, 2))
  var rightBackWingTransformationNode =  new TransformationSGNode(rightBackWingTransformationMatrix, cubeNode);
  edwinTransformationNode.append(rightBackWingTransformationNode);

  // create top finn
  var finnTransformationMatrix = mat4.create();
  mat4.mul(finnTransformationMatrix, finnTransformationMatrix,makeYRotationMatrix(convertDegreeToRadians(90)));
  mat4.mul(finnTransformationMatrix, finnTransformationMatrix,makeXRotationMatrix(convertDegreeToRadians(90)));
  mat4.mul(finnTransformationMatrix, finnTransformationMatrix,makeZShearMatrix(-0.5, 0));
  mat4.mul(finnTransformationMatrix, finnTransformationMatrix,makeTranslationMatrix(1, 0, -0.5));
  mat4.mul(finnTransformationMatrix, finnTransformationMatrix,makeScaleMatrix(1, 0.1, 2));
  var finnTransformationNode =  new TransformationSGNode(finnTransformationMatrix, cubeNode);
  edwinTransformationNode.append(finnTransformationNode);

  //create right wing
  var rightWingTransformationMatrix = mat4.create();
  mat4.mul(rightWingTransformationMatrix, rightWingTransformationMatrix, makeYRotationMatrix(convertDegreeToRadians(90)));
  mat4.mul(rightWingTransformationMatrix, rightWingTransformationMatrix, makeZShearMatrix(0.5, 0));
  mat4.mul(rightWingTransformationMatrix, rightWingTransformationMatrix, makeYShearMatrix(0, 0.8));
  mat4.mul(rightWingTransformationMatrix, rightWingTransformationMatrix, makeTranslationMatrix(-0.5, 0, 1.5));
  mat4.mul(rightWingTransformationMatrix, rightWingTransformationMatrix, makeScaleMatrix(1.5, 0.1, 5));
  var rightWingTransformationNode =  new TransformationSGNode(rightWingTransformationMatrix, cubeNode);
  edwinTransformationNode.append(rightWingTransformationNode);

  //create left Wing
  var leftWingTransformationMatrix = mat4.create();
  mat4.mul(leftWingTransformationMatrix, leftWingTransformationMatrix, makeYRotationMatrix(convertDegreeToRadians(90)));
  mat4.mul(leftWingTransformationMatrix, leftWingTransformationMatrix, makeZShearMatrix(-0.5, 0));
  mat4.mul(leftWingTransformationMatrix, leftWingTransformationMatrix, makeYShearMatrix(0, -0.8));
  mat4.mul(leftWingTransformationMatrix, leftWingTransformationMatrix, makeTranslationMatrix(-0.5, 0, -1.5));
  mat4.mul(leftWingTransformationMatrix, leftWingTransformationMatrix, makeScaleMatrix(1.5, 0.1, 5));
  var leftWingTransformationNode =  new TransformationSGNode(leftWingTransformationMatrix, cubeNode);
  edwinTransformationNode.append(leftWingTransformationNode);

  // init key frames
  keyFrames = createKeyFrames();

  return edwinBaseNode;

}

//implements movement of edwin, called for each frame from render()
//TODO//turn of when working on the layout!!!
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
        let position = vec4.create();
        let t = startT/destT;
        // clamp t
        t = Math.max(0, Math.min(1, t));

        // TODO calc middle of startP and destP on 90° circle

        quat.slerp(position, startP, destP, t);

        let rotation = quat.create();
        quat.rotationTo(rotation, startP, destP);

        let edwinRotationMatrix = mat4.create();

        let edwinTransformationMatrix = glm.transform({
            translate: position
          });

        if(rotate) {
          // factor generated by trial end error, gives full 360° rotatioN
          rotateYAx -= 0.0064;
        }

        mat4.rotateY(edwinTransformationMatrix, edwinTransformationMatrix, rotateYAx);

        edwinTransformationNode.matrix = edwinTransformationMatrix ;
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
  var t28 = quat.fromValues(10.5, 4.5, 10, 1);

  // fall keyFrame
  var t30 = quat.fromValues(10.5, -0.75, 10, 1);

  return new Array(t0, t3, t8, t12, t17, t21, t28, t30);
}
