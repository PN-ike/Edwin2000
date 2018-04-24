
function initInteraction(canvas) {
  document.addEventListener('keypress', function(event) {
    //listen for key event globally
    if(event.code === 'KeyW'){
        cam.moveButton = true;
        cam.forward = true;
    }
    if(event.code === 'KeyS'){
        cam.moveButton = true;
        cam.back = true;
    }
    if(event.code === 'KeyA'){
        cam.moveButton = true;
        cam.left = true;
    }
    if(event.code === 'KeyD'){
        cam.moveButton = true;
        cam.right = true;
    }
    if(event.code === 'KeyK'){
      cam.lookButton = true;
      cam.right = true;
      cam.lookHorizontalValue++;
    }
    if(event.code === 'KeyH'){
      cam.lookButton = true;
      cam.left = true;
      cam.lookHorizontalValue--;
    }
    if(event.code === 'KeyU'){
      cam.lookButton = true;
      cam.up = true;
      cam.lookVerticalValue--;
    }
    if(event.code === 'KeyJ'){
      cam.lookButton = true;
      cam.down = true;
      cam.lookVerticalValue++;
    }
  });
}


function initQuadBuffer() {

  //create buffer for vertices
  quadVertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quadVertexBuffer);
  //copy data to GPU
  gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);

  //same for the color
  quadColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quadColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, quadColors, gl.STATIC_DRAW);
}

function initCubeBuffer() {

  cubeVertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, cubeVertices, gl.STATIC_DRAW);

  cubeColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, cubeColors, gl.STATIC_DRAW);

  cubeIndexBuffer = gl.createBuffer ();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeIndices), gl.STATIC_DRAW);
}
