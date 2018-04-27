const mouse = {
  pos: { x : 0, y : 0},
  leftButtonDown: false
};

function initInteraction(canvas) {

  document.addEventListener('keypress', function(event) {
    //listen for key event globally
    if(event.code === 'KeyW'){
      cam.moveForward();
    }
    if(event.code === 'KeyS'){
      cam.moveBack();
    }
    if(event.code === 'KeyA'){
      cam.moveLeft();
  }
    if(event.code === 'KeyD'){
      cam.moveRight();
    }
    if(event.code === 'KeyE'){
      cam.moveUp();
    }
    if(event.code === 'KeyQ'){
      cam.moveDown();
    }

  });
    canvas.addEventListener('mousedown', function(event) {
        mouse.pos = toPos(event);
        mouse.leftButtonDown = event.button === 0;
      });
      canvas.addEventListener('mousemove', function(event) {
        const pos = toPos(event);
        const delta = { x : mouse.pos.x - pos.x, y: mouse.pos.y - pos.y };
        if (mouse.leftButtonDown) {
           //substract to get inverted movement
          cam.yDegree += delta.x*.25; // if we have a x-delta we want to rotate around y
          cam.xDegree += delta.y*.25; // multipy with 0.25 for pixel to Degree conversion
          cam.xDegree = Math.min(90, cam.xDegree);
          cam.xDegree = Math.max(-90, cam.xDegree);
        }
        mouse.pos = pos;
      });
      canvas.addEventListener('mouseup', function(event) {
        mouse.pos = toPos(event);
        mouse.leftButtonDown = false;
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


function toPos(event) {
  //convert to local coordinates
  const rect = gl.canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}
