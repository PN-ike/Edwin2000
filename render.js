
function myTestCameraRenderFunction(sceneMatrix, viewMatrix) {

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexBuffer);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false,0,0) ;
    gl.enableVertexAttribArray(positionLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeColorBuffer);
    gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false,0,0) ;
    gl.enableVertexAttribArray(colorLocation);

    var originSceneMatrix = sceneMatrix;

    sceneMatrix = originSceneMatrix;
    sceneMatrix = matrixMultiply(sceneMatrix, makeYRotationMatrix(convertDegreeToRadians(animatedAngle)));
    sceneMatrix = matrixMultiply(sceneMatrix, makeTranslationMatrix(0, 0, 2));

    setUpModelViewMatrix(viewMatrix, sceneMatrix);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeIndexBuffer);
    gl.drawElements(gl.TRIANGLES, cubeIndices.length, gl.UNSIGNED_SHORT, 0);
}

// TODO rausschmeißen vor Abgabe
function renderPlane() {
  // gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexBuffer);
  // gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false,0,0) ;
  // gl.enableVertexAttribArray(positionLocation);
  //
  // gl.bindBuffer(gl.ARRAY_BUFFER, cubeColorBuffer);
  // gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false,0,0) ;
  // gl.enableVertexAttribArray(colorLocation);
  //
  // // store current sceneMatrix in originSceneMatrix, so it can be restored
  // var originSceneMatrix = sceneMatrix;
  //
  // sceneMatrix = matrixMultiply(sceneMatrix, makeYRotationMatrix(convertDegreeToRadians(animatedAngle)));
  // sceneMatrix = matrixMultiply(sceneMatrix, makeTranslationMatrix(0, 0, 0));
  // sceneMatrix = matrixMultiply(sceneMatrix, makeScaleMatrix(1, 0.8, 5));
  // setUpModelViewMatrix(viewMatrix, sceneMatrix);
  // renderCube();

  //right back wing
  sceneMatrix = originSceneMatrix;
  sceneMatrix = matrixMultiply(sceneMatrix, makeYRotationMatrix(convertDegreeToRadians(90)));
  sceneMatrix = matrixMultiply(sceneMatrix, makeYRotationMatrix(convertDegreeToRadians(animatedAngle)));
  sceneMatrix = matrixMultiply(sceneMatrix, makeZShearMatrix(-0.5, 0));
  sceneMatrix = matrixMultiply(sceneMatrix, makeYShearMatrix(0, -0.8));
  sceneMatrix = matrixMultiply(sceneMatrix, makeTranslationMatrix(1, 0, -0.5));
  sceneMatrix = matrixMultiply(sceneMatrix, makeScaleMatrix(1, 0.1, 2));
  setUpModelViewMatrix(viewMatrix, sceneMatrix);
  renderCube();

  // top finn
  sceneMatrix = originSceneMatrix;
  sceneMatrix = matrixMultiply(sceneMatrix, makeYRotationMatrix(convertDegreeToRadians(90)));
  sceneMatrix = matrixMultiply(sceneMatrix, makeYRotationMatrix(convertDegreeToRadians(animatedAngle)));
  sceneMatrix = matrixMultiply(sceneMatrix, makeXRotationMatrix(convertDegreeToRadians(90)));
  sceneMatrix = matrixMultiply(sceneMatrix, makeZShearMatrix(-0.5, 0));
  sceneMatrix = matrixMultiply(sceneMatrix, makeTranslationMatrix(1, 0, -0.5));
  sceneMatrix = matrixMultiply(sceneMatrix, makeScaleMatrix(1, 0.1, 2));
  setUpModelViewMatrix(viewMatrix, sceneMatrix);
  renderCube();

  // front left wing
  sceneMatrix = originSceneMatrix;
  sceneMatrix = matrixMultiply(sceneMatrix, makeYRotationMatrix(convertDegreeToRadians(90)));
  sceneMatrix = matrixMultiply(sceneMatrix, makeYRotationMatrix(convertDegreeToRadians(animatedAngle)));
  sceneMatrix = matrixMultiply(sceneMatrix, makeZShearMatrix(0.5, 0));
  sceneMatrix = matrixMultiply(sceneMatrix, makeYShearMatrix(0, 0.8));
  sceneMatrix = matrixMultiply(sceneMatrix, makeTranslationMatrix(-0.5, 0, 1.5));
  sceneMatrix = matrixMultiply(sceneMatrix, makeScaleMatrix(1.5, 0.1, 5));
  setUpModelViewMatrix(viewMatrix, sceneMatrix);
  renderCube();

  // front right wing
  sceneMatrix = originSceneMatrix;
  sceneMatrix = matrixMultiply(sceneMatrix, makeYRotationMatrix(convertDegreeToRadians(90)));
  sceneMatrix = matrixMultiply(sceneMatrix, makeYRotationMatrix(convertDegreeToRadians(animatedAngle)));
  sceneMatrix = matrixMultiply(sceneMatrix, makeZShearMatrix(-0.5, 0));
  sceneMatrix = matrixMultiply(sceneMatrix, makeYShearMatrix(0, -0.8));
  sceneMatrix = matrixMultiply(sceneMatrix, makeTranslationMatrix(-0.5, 0, -1.5));
  sceneMatrix = matrixMultiply(sceneMatrix, makeScaleMatrix(1.5, 0.1, 5));
  setUpModelViewMatrix(viewMatrix, sceneMatrix);
  renderCube();
}
