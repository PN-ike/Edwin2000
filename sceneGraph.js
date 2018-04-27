var rootNode;

function spanSceneGraph() {
  rootNode = new SceneGraphNode();

  // create and place robot
  createRobot(rootNode);
  // create and place plane
  createPlane(rootNode);
}

function createPlane(rootNode) {
  // TODO create plane transformation matrix
  var planeTransformationMatrix = makeIdentityMatrix();
  var planeTransformationNode = new RenderSGNode(planeTransformationMatrix);
  rootNode.append(planeTransformationNode);

  // body TODO Translation to flight start (3. Argument)
  createBodyPart(
    makeYRotationMatrix(convertDegreeToRadians(animatedAngle)),
    makeTranslationMatrix(0, 0, 0),
    makeScaleMatrix(1, 0.8, 5),
    planeTransformationNode
  );

  //left back wing
  createPlanePart(
    makeYRotationMatrix(convertDegreeToRadians(90)),
    makeYRotationMatrix(convertDegreeToRadians(animatedAngle)),
    makeZShearMatrix(0.5, 0),
    makeYShearMatrix(0, 0.8),
    makeTranslationMatrix(1, 0, 0.5)
    makeScaleMatrix(1, 0.1, 2),
    planeTransformationNode
  );

  //right back wing
  createPlanePart(
    makeYRotationMatrix(convertDegreeToRadians(90)),
    makeYRotationMatrix(convertDegreeToRadians(animatedAngle)),
    makeZShearMatrix(-0.5, 0),
    makeYShearMatrix(0, -0.8),
    makeTranslationMatrix(1, 0, -0.5)
    makeScaleMatrix(1, 0.1, 2),
    planeTransformationNode
  );

  // top finn
  createPlanePart(
    makeYRotationMatrix(convertDegreeToRadians(90)),
    makeYRotationMatrix(convertDegreeToRadians(animatedAngle)),
    makeXRotationMatrix(convertDegreeToRadians(90)),
    makeZShearMatrix(-0.5, 0),
    makeTranslationMatrix(1, 0, -0.5),
    makeScaleMatrix(1, 0.1, 2),
    planeTransformationNode
  );

  // front left wing
  createPlanePart(
    makeYRotationMatrix(convertDegreeToRadians(90)),
    makeYRotationMatrix(convertDegreeToRadians(animatedAngle)),
    makeZShearMatrix(0.5, 0),
    makeYShearMatrix(0, 0.8),
    makeTranslationMatrix(-0.5, 0, 1.5),
    makeScaleMatrix(1.5, 0.1, 5),
    planeTransformationNode
  );

  // front right wing
  createPlanePart(
    makeYRotationMatrix(convertDegreeToRadians(90)),
    makeYRotationMatrix(convertDegreeToRadians(animatedAngle)),
    makeZShearMatrix(-0.5, 0),
    makeYShearMatrix(0, -0.8),
    makeTranslationMatrix(-0.5, 0, -1.5),
    makeScaleMatrix(1.5, 0.1, 5),
    planeTransformationNode
  );
}

function createPlanePart(matrixA, matrixB, matrixC, matrixD, matrixE, matrixF, node) {
  var transformationMatrix = matrixA;
  transformationMatrix = matrixMultiply(transformationMatrix, matrixB);
  transformationMatrix = matrixMultiply(transformationMatrix, matrixC);
  transformationMatrix = matrixMultiply(transformationMatrix, matrixD);
  transformationMatrix = matrixMultiply(transformationMatrix, matrixE);
  transformationMatrix = matrixMultiply(transformationMatrix, matrixF);

  transformationNode = new TransformationSGNode(transformationMatrix);
  node.append(transformationNode);

  var cubeNode = new CubeRenderNode();
  transformationNode.append(cubeNode);
}

function createRobot(rootNode) {
  // TODO create robot transformation matrix
  var robotTransformationMatrix = createRobotTransformationMatrix();
  var robotTransformationNode = new RenderSGNode(robotTransformationMatrix);
  rootNode.append(robotTransformationNode);

  //body
  var bodyNode = new CubeRenderNode();
  robotTransformationNode.append(bodyNode);

  //head
  createBodyPart(
    makeYRotationMatrix(convertDegreeToRadians(animatedAngle)),
    makeTranslationMatrix(0, 0.4, 0),
    makeScaleMatrix(0.4, 0.33, 0.5),
    robotTransformationNode
  );

  //antenna
  createBodyPart(
    makeYRotationMatrix(convertDegreeToRadians(animatedAngle))),
    makeTranslationMatrix(0.07, 0.5, 0.1),
    makeScaleMatrix(0.1, 0.5, 0.1),
    headTransformationNode
  );

  //right arm
  createArm(
    makeTranslationMatrix(0.4, 0, 0),
    makeScaleMatrix(0.4, 0.33, 0.5),
    makeXRotationMatrix(convertDegreeToRadians(animatedAngle*2)),
    robotTransformationNode
  );

  createBodyPart(
    makeTranslationMatrix(0.4, 0, 0),
    makeScaleMatrix(0.4, 0.33, 0.5),
    makeXRotationMatrix(convertDegreeToRadians(-animatedAngle*2)),
    robotTransformationNode
  );

  createBodyPart(
    makeTranslationMatrix(0.65, 0, 0),
    makeScaleMatrix(0.4, 0.33, 0.5),
    makeXRotationMatrix(convertDegreeToRadians(-animatedAngle)),
    robotTransformationNode
  );

  //left arm
  createArm(
    makeTranslationMatrix(-0.4, 0, 0),
    makeScaleMatrix(0.4, 0.33, 0.5),
    makeXRotationMatrix(convertDegreeToRadians(animatedAngle*2)),
    robotTransformationNode
  );

  createBodyPart(
    makeTranslationMatrix(-0.4, 0, 0),
    makeScaleMatrix(0.4, 0.33, 0.5),
    makeXRotationMatrix(convertDegreeToRadians(-animatedAngle*2)),
    robotTransformationNode
  );

  createBodyPart(
    makeTranslationMatrix(-0.65, 0, 0),
    makeScaleMatrix(0.4, 0.33, 0.5),
    makeXRotationMatrix(convertDegreeToRadians(-animatedAngle)),
    robotTransformationNode
  );

  //left leg
  createBodyPart(
    makeIdentityMatrix(),
    makeTranslationMatrix(0.16, -0.6, 0),
    makeScaleMatrix(0.2, 1, 1),
    robotTransformationNode
  );

  //right leg
  createBodyPart(
    makeIdentityMatrix(),
    makeTranslationMatrix(-0.16, -0.6, 0),
    makeScaleMatrix(0.2, 1, 1),
    robotTransformationNode
  );

}

function createBodyPart(matrixA, matrixB, matrixC, node) {
  var transformationMatrix = matrixA;
  transformationMatrix = matrixMultiply(transformationMatrix, matrixB);
  transformationMatrix = matrixMultiply(transformationMatrix, matrixC);

  transformationNode = new TransformationSGNode(transformationMatrix);
  node.append(transformationNode);

  var cubeNode = new CubeRenderNode();
  transformationNode.append(cubeNode);
}

/**
 * a cube node that renders a cube at its local origin
 * class as shown in lab
 */
class CubeRenderNode extends SceneGraphNode {

  render(context) {

    //setting the model view and projection matrix on shader
    setUpModelViewMatrix(context.sceneMatrix, context.viewMatrix);

    var positionLocation = gl.getAttribLocation(context.shader, 'a_position');
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexBuffer);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false,0,0) ;
    gl.enableVertexAttribArray(positionLocation);

    var colorLocation = gl.getAttribLocation(context.shader, 'a_color');
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeColorBuffer);
    gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false,0,0) ;
    gl.enableVertexAttribArray(colorLocation);

    //set alpha value for blending
    gl.uniform1f(gl.getUniformLocation(context.shader, 'u_alpha'), 0.5);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeIndexBuffer);
    gl.drawElements(gl.TRIANGLES, cubeIndices.length, gl.UNSIGNED_SHORT, 0);

    //render children
    super.render(context);
  }
}
