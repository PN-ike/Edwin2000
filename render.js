// var posx = 0;
// var posy = 0;
// var posz = 0.1;
// var prev = -10.5
// var bool = true;

// TODO render"klasse" eigentlich obsolot mit funktionierendem scene graph
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


     var inMat = mat4.create();
     mat4.invert(inMat, sceneMatrix);
     var initVals = vec3.fromValues(-0.3, -0.3, -0.3);
     var outVals = vec4.create();
     multiplyVectorMatrix(outVals, inMat, initVals);


     // cam.viewDirection[0] = outVals[0];
     // cam.viewDirection[1] = outVals[1];
     // cam.viewDirection[2] = outVals[2];

    setUpModelViewMatrix(viewMatrix, sceneMatrix);
    renderCube();


    //x -->12
    //y -->13
    //z -->14



}
// TODO rausschmeißen vor Abgabe
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

// TODO rausschmeißen vor Abgabe
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

// TODO rausschmeißen vor Abgabe
function renderPlane() {
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexBuffer);
  gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false,0,0) ;
  gl.enableVertexAttribArray(positionLocation);

  gl.bindBuffer(gl.ARRAY_BUFFER, cubeColorBuffer);
  gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false,0,0) ;
  gl.enableVertexAttribArray(colorLocation);

  // store current sceneMatrix in originSceneMatrix, so it can be restored
  var originSceneMatrix = sceneMatrix;

  sceneMatrix = matrixMultiply(sceneMatrix, makeYRotationMatrix(convertDegreeToRadians(animatedAngle)));
  sceneMatrix = matrixMultiply(sceneMatrix, makeTranslationMatrix(0, 0, 0));
  sceneMatrix = matrixMultiply(sceneMatrix, makeScaleMatrix(1, 0.8, 5));
  setUpModelViewMatrix(viewMatrix, sceneMatrix);
  renderCube();

  //left back wing
  sceneMatrix = originSceneMatrix;
  sceneMatrix = matrixMultiply(sceneMatrix, makeYRotationMatrix(convertDegreeToRadians(90)));
  sceneMatrix = matrixMultiply(sceneMatrix, makeYRotationMatrix(convertDegreeToRadians(animatedAngle)));
  sceneMatrix = matrixMultiply(sceneMatrix, makeZShearMatrix(0.5, 0));
  sceneMatrix = matrixMultiply(sceneMatrix, makeYShearMatrix(0, 0.8));
  sceneMatrix = matrixMultiply(sceneMatrix, makeTranslationMatrix(1, 0, 0.5));
  sceneMatrix = matrixMultiply(sceneMatrix, makeScaleMatrix(1, 0.1, 2));
  setUpModelViewMatrix(viewMatrix, sceneMatrix);
  renderCube();

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

// TODO rausschmeißen vor Abgabe
function renderCube() {
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeIndexBuffer);
  gl.drawElements(gl.TRIANGLES, cubeIndices.length, gl.UNSIGNED_SHORT, 0); //LINE_STRIP
}
