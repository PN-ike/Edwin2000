
function initInteraction(canvas) {
  document.addEventListener('keypress', function(event) {
    //listen for key event globally
    if (event.code === 'KeyR') {
      camera.movement.x = 0;
  		camera.movement.y = 0;
    }
    if(event.code === 'KeyW'){
      if (centery < 1) {
        centery+=0.1;
      }
      console.log(centery);
    }
    if(event.code === 'KeyA'){ camera.movement.left++}
    if(event.code === 'KeyS'){
      if (centery > -1) {
        centery-=0.1;
      }

      console.log(centery);
      }
    if(event.code === 'KeyD'){ camera.movement.right+= 10}

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
