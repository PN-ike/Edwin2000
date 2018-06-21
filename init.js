
const mouse = {
  pos: { x : 0, y : 0},
  leftButtonDown: false
};

function initInteraction(canvas) {

  document.addEventListener('keypress', function(event) {
    //listen for key event globally

    if(event.code === 'KeyW'){
      camera.moveForward();
    }
    if(event.code === 'KeyS'){
      camera.moveBack();
    }
    if(event.code === 'KeyA'){
      camera.moveLeft();
  }
    if(event.code === 'KeyD'){
      camera.moveRight();
    }
    if(event.code === 'KeyE'){
      camera.moveUp();
    }
    if(event.code === 'KeyQ'){
      camera.moveDown();
    }
    if(event.code === 'KeyF'){
      camera.free = true;
    }
    if(event.code === 'KeyC'){
      console.log("position: " + camera.position);
      console.log("viewDirection: " + camera.viewDirection);
    }
  });
    canvas.addEventListener('mousedown', function(event) {
        mouse.pos = toPos(event);
        mouse.leftButtonDown = event.button === 0;
      });
      canvas.addEventListener('mousemove', function(event) {
        const pos = toPos(event);
        const delta = { x : mouse.pos.x - pos.x, y: mouse.pos.y - pos.y };
        if (mouse.leftButtonDown && camera.free) {
           //substract to get inverted movement
          camera.yDegree += delta.x*.25; // if we have a x-delta we want to rotate around y
          camera.xDegree += delta.y*.25; // multipy with 0.25 for pixel to Degree conversion
          camera.xDegree = Math.min(45, camera.xDegree);
          camera.xDegree = Math.max(-45, camera.xDegree);
        }
        mouse.pos = pos;
      });
      canvas.addEventListener('mouseup', function(event) {
        mouse.pos = toPos(event);
        mouse.leftButtonDown = false;
      });

}

function toPos(event) {
  //convert to local coordinates
  const rect = gl.canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

function initTexture(texture)
{
  //create texture object
  var tex = gl.createTexture();
  //select a texture unit
  gl.activeTexture(gl.TEXTURE0);
  //bind texture to active texture unit
  gl.bindTexture(gl.TEXTURE_2D, tex);
  //set sampling parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  //TASK 4: change texture sampling behaviour
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  //upload texture data
  gl.texImage2D(gl.TEXTURE_2D, //texture unit target == texture type
    0, //level of detail level (default 0)
    gl.RGBA, //internal format of the data in memory
    gl.RGBA, //image format (should match internal format)
    gl.UNSIGNED_BYTE, //image data type
    texture); //actual image data
  //clean up/unbind texture
  gl.bindTexture(gl.TEXTURE_2D, null);

  return tex;
}

function initCubeTexture(textures) {
  //create the texture
  var cubeTexture = gl.createTexture();
  //define some texture unit we want to work on
  gl.activeTexture(gl.TEXTURE0);
  //bind the texture to the texture unit
  gl.bindTexture(gl.TEXTURE_CUBE_MAP, cubeTexture);
  //set sampling parameters
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  //gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, gl.MIRRORED_REPEAT); //will be available in WebGL 2
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  //set correct image for each side of the cube map
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);//flipping required for our skybox, otherwise images don't fit together
  gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textures[0]);
  gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textures[1]);
  gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textures[2]);
  gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textures[3]);
  gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textures[4]);
  gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textures[5]);
  //generate mipmaps (optional)
  gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
  //unbind the texture again
  gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);

  return cubeTexture;
}

function makeCube() {

  var s = 0.3;

   var position =
   [-s, s, -s,
		-s, s, s,
		s, s, s,
		s, s, -s,

		// Left
		-s, s, s,
		-s, -s, s,
		-s, -s, -s,
		-s, s, -s,

		// Right
		s, s, s,
		s, -s, s,
		s, -s, -s,
		s, s, -s,

		// Front
		s, s, s,
		s, -s, s,
		-s, -s, s,
		-s, s, s,

		// Back
		s, s, -s,
		s, -s, -s,
		-s, -s, -s,
		-s, s, -s,

		// Bottom
		-s, -s, -s,
		-s, -s, s,
		s, -s, s,
		s, -s, -s];

   var normal = [
     0, 1, 0,
     0, 1, 0,
     0, 1, 0,
     0, 1, 0,

     -1, 0, 0,
     -1, 0, 0,
     -1, 0, 0,
     -1, 0, 0,

     1, 0, 0,
     1, 0, 0,
     1, 0, 0,
     1, 0, 0,

     0, 0, -1,
     0, 0, -1,
     0, 0, -1,
     0, 0, -1,

     0, 0, 1,
     0, 0, 1,
     0, 0, 1,
     0, 0, 1,

     0, -1, 0,
     0, -1, 0,
     0, -1, 0,
     0, -1, 0
   ];
   var texture = [
     0, 0,
     0, 1,
     1, 1,
     1, 0,

     0, 0,
     1, 0,
     1, 1,
     0, 1,

     1, 1,
     0, 1,
     0, 0,
     1, 0,

     1, 1,
     1, 0,
     0, 0,
     0, 1,

     0, 0,
     0, 1,
     1, 1,
     1, 0,

     1, 1,
     1, 0,
     0, 0,
     0, 1
 ];
   var index = [
		// Top
		0, 1, 2,
		0, 2, 3,

		// Left
		5, 4, 6,
		6, 4, 7,

		// Right
		8, 9, 10,
		8, 10, 11,

		// Front
		13, 12, 14,
		15, 14, 12,

		// Back
		16, 17, 18,
		16, 18, 19,

		// Bottom
		21, 20, 22,
		22, 20, 23
	];
   return {
     position: position,
     normal: normal,
     texture: texture,
     index: index
   };
 }
