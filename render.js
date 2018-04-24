
function myTestCameraRenderFunction(sceneMatrix, viewMatrix) {

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexBuffer);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false,0,0) ;
    gl.enableVertexAttribArray(positionLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeColorBuffer);
    gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false,0,0) ;
    gl.enableVertexAttribArray(colorLocation);

    var originSceneMatrix = sceneMatrix;

    sceneMatrix = matrixMultiply(sceneMatrix, makeTranslationMatrix(0, 0, -5));
    //sceneMatrix = matrixMultiply(sceneMatrix, makeScaleMatrix(3, 3, 3));
    sceneMatrix = matrixMultiply(sceneMatrix, makeYRotationMatrix(convertDegreeToRadians(animatedAngle)));
    //sceneMatrix = matrixMultiply(sceneMatrix, makeYRotationMatrix(convertDegreeToRadians(180)));
    setUpModelViewMatrix(viewMatrix, sceneMatrix);
    renderCube();

    sceneMatrix = originSceneMatrix;
    sceneMatrix = matrixMultiply(sceneMatrix, makeTranslationMatrix(0, 5, 0));
    sceneMatrix = matrixMultiply(sceneMatrix, makeScaleMatrix(3, 3, 3));
    sceneMatrix = matrixMultiply(sceneMatrix, makeYRotationMatrix(convertDegreeToRadians(animatedAngle)));
    sceneMatrix = matrixMultiply(sceneMatrix, makeYRotationMatrix(convertDegreeToRadians(180)));
    setUpModelViewMatrix(viewMatrix, sceneMatrix);
    renderCube();
}

function renderQuad(sceneMatrix, viewMatrix) {

  sceneMatrix = matrixMultiply(sceneMatrix, makeTranslationMatrix(0, -0.9, 0));
  sceneMatrix = matrixMultiply(sceneMatrix, makeXRotationMatrix(convertDegreeToRadians(90)));
  setUpModelViewMatrix(viewMatrix, sceneMatrix);

  gl.bindBuffer(gl.ARRAY_BUFFER, quadVertexBuffer);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  //enable this vertex attribute
  gl.enableVertexAttribArray(positionLocation);

  //const colorLocation = gl.getAttribLocation(shaderProgram, 'a_color');
  //gl.enableVertexAttribArray(colorLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, quadColorBuffer);
  gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(colorLocation);

  // draw the bound data as 6 vertices = 2 triangles starting at index 0
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function renderRobot(sceneMatrix, viewMatrix) {

  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexBuffer);
  gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false,0,0) ;
  gl.enableVertexAttribArray(positionLocation);

  gl.bindBuffer(gl.ARRAY_BUFFER, cubeColorBuffer);
  gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false,0,0) ;
  gl.enableVertexAttribArray(colorLocation);

  //circle walk - transform whole scene
  sceneMatrix = matrixMultiply(sceneMatrix, makeYRotationMatrix(animatedAngle/100));

  // store current sceneMatrix in originSceneMatrix, so it can be restored
  var originSceneMatrix = sceneMatrix;

  //head
  sceneMatrix = matrixMultiply(sceneMatrix, makeYRotationMatrix(convertDegreeToRadians(animatedAngle)));
  sceneMatrix = matrixMultiply(sceneMatrix, makeTranslationMatrix(0, 0.4, 0));
  sceneMatrix = matrixMultiply(sceneMatrix, makeScaleMatrix(0.4, 0.33, 0.5));
  setUpModelViewMatrix(viewMatrix, sceneMatrix);
  renderCube();

  //antenna
  sceneMatrix = originSceneMatrix;
  sceneMatrix = matrixMultiply(sceneMatrix, makeYRotationMatrix(convertDegreeToRadians(animatedAngle)));
  sceneMatrix = matrixMultiply(sceneMatrix, makeTranslationMatrix(0.07, 0.5, 0.1));
  sceneMatrix = matrixMultiply(sceneMatrix, makeScaleMatrix(0.1, 0.5, 0.1));
  setUpModelViewMatrix(viewMatrix, sceneMatrix);
  renderCube();

  //body
  sceneMatrix = originSceneMatrix;
  setUpModelViewMatrix(viewMatrix, sceneMatrix);
  renderCube();

  //right arm
  sceneMatrix = originSceneMatrix;
  sceneMatrix = matrixMultiply(sceneMatrix, makeTranslationMatrix(0.4, 0, 0));
  sceneMatrix = matrixMultiply(sceneMatrix, makeScaleMatrix(0.4, 0.33, 0.5));
  sceneMatrix = matrixMultiply(sceneMatrix, makeXRotationMatrix(convertDegreeToRadians(animatedAngle*2)));
  setUpModelViewMatrix(viewMatrix, sceneMatrix);
  renderCube();

  sceneMatrix = originSceneMatrix;
  sceneMatrix = matrixMultiply(sceneMatrix, makeTranslationMatrix(0.4, 0, 0));
  sceneMatrix = matrixMultiply(sceneMatrix, makeScaleMatrix(0.4, 0.33, 0.5));
  sceneMatrix = matrixMultiply(sceneMatrix, makeXRotationMatrix(convertDegreeToRadians(-animatedAngle*2)));
  setUpModelViewMatrix(viewMatrix, sceneMatrix);
  renderCube();

  sceneMatrix = originSceneMatrix;
  sceneMatrix = matrixMultiply(sceneMatrix, makeTranslationMatrix(0.65, 0, 0));
  sceneMatrix = matrixMultiply(sceneMatrix, makeScaleMatrix(0.4, 0.33, 0.5));
  sceneMatrix = matrixMultiply(sceneMatrix, makeXRotationMatrix(convertDegreeToRadians(-animatedAngle)));
  setUpModelViewMatrix(viewMatrix, sceneMatrix);
  renderCube();

  //left arm
  sceneMatrix = originSceneMatrix;
  sceneMatrix = matrixMultiply(sceneMatrix, makeTranslationMatrix(-0.4, 0, 0));
  sceneMatrix = matrixMultiply(sceneMatrix, makeScaleMatrix(0.4, 0.33, 0.5));
  sceneMatrix = matrixMultiply(sceneMatrix, makeXRotationMatrix(convertDegreeToRadians(animatedAngle*2)));
  setUpModelViewMatrix(viewMatrix, sceneMatrix);
  renderCube();

  sceneMatrix = originSceneMatrix;
  sceneMatrix = matrixMultiply(sceneMatrix, makeTranslationMatrix(-0.4, 0, 0));
  sceneMatrix = matrixMultiply(sceneMatrix, makeScaleMatrix(0.4, 0.33, 0.5));
  sceneMatrix = matrixMultiply(sceneMatrix, makeXRotationMatrix(convertDegreeToRadians(-animatedAngle*2)));
  setUpModelViewMatrix(viewMatrix, sceneMatrix);
  renderCube();

  sceneMatrix = originSceneMatrix;
  sceneMatrix = matrixMultiply(sceneMatrix, makeTranslationMatrix(-0.65, 0, 0));
  sceneMatrix = matrixMultiply(sceneMatrix, makeScaleMatrix(0.4, 0.33, 0.5));
  sceneMatrix = matrixMultiply(sceneMatrix, makeXRotationMatrix(convertDegreeToRadians(-animatedAngle)));
  setUpModelViewMatrix(viewMatrix, sceneMatrix);
  renderCube();

  //left leg
  sceneMatrix = originSceneMatrix;
  sceneMatrix = matrixMultiply(sceneMatrix, makeTranslationMatrix(0.16, -0.6, 0));
  sceneMatrix = matrixMultiply(sceneMatrix, makeScaleMatrix(0.2, 1, 1));
  setUpModelViewMatrix(viewMatrix, sceneMatrix);
  renderCube();

  //right leg
  sceneMatrix = originSceneMatrix;
  sceneMatrix = matrixMultiply(sceneMatrix, makeTranslationMatrix(-0.16, -0.6, 0));
  sceneMatrix = matrixMultiply(sceneMatrix, makeScaleMatrix(0.2, 1, 1));
  setUpModelViewMatrix(viewMatrix, sceneMatrix);
  renderCube();

}

function renderCube() {
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeIndexBuffer);
  gl.drawElements(gl.TRIANGLES, cubeIndices.length, gl.UNSIGNED_SHORT, 0); //LINE_STRIP
}