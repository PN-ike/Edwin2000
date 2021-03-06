var camera;

class Camera {

  constructor() {
    this.position = vec3.fromValues(0, 7, 0);
    this.viewDirection = vec3.fromValues(-1, -1, -1);

    this.myUp = vec3.fromValues(0, 1, 0);


    this.xDegree = 0;
    this.yDegree = 0;

    this.movementSpeed = 0.1;

    this.left = false;
    this.right = false;
    this.forward = false;
    this.back = false;
    this.up = false;
    this.down = false;

    this.free = false;

  }
    //compute upward movement
    moveUp() {
      if(!camera.free) {
        return;
      }

      var toAdd = vec3.create();
      vec3.scale(toAdd, this.myUp, this.movementSpeed);
      vec3.add(this.position, this.position, toAdd);

      return;
    }
    //compute down movement
    moveDown() {
      if(!camera.free) {
        return;
      }

      var toAdd = vec3.create();
      vec3.scale(toAdd, this.myUp, -this.movementSpeed);
      vec3.add(this.position, this.position, toAdd);

      return;
    }

    //compute forward movement
    moveForward() {
      if(!camera.free) {
        return;
      }

      var toAdd = vec3.create();
      vec3.scale(toAdd, this.viewDirection, this.movementSpeed);
      vec3.add(this.position, this.position, toAdd);

      return;
    }

    //compute back movement
    moveBack() {
      if(!camera.free) {
        return;
      }

      var toAdd = vec3.create();
      vec3.scale(toAdd, this.viewDirection, -this.movementSpeed);
      vec3.add(this.position, this.position, toAdd);

      return;
    }

    //compute left movement
    moveLeft() {
      if(!camera.free) {
        return;
      }

      var direction = vec3.create();
      var toAdd = vec3.create();

      vec3.cross(direction, this.viewDirection, this.myUp);
      vec3.scale(toAdd, direction, -this.movementSpeed);
      vec3.add(this.position, this.position, toAdd);

      return;
    }

    //compute right movement
    moveRight() {
      if(!camera.free) {
        return;
      }

      var direction = vec3.create();
      var toAdd = vec3.create();

      vec3.cross(direction, this.viewDirection, this.myUp);
      vec3.scale(toAdd, direction, this.movementSpeed);
      vec3.add(this.position, this.position, toAdd);

      return;
    }

    //compute viewDirection
    updateViewDirection() {

          let rotateMatrix = mat4.multiply(mat4.create(),
                                glm.rotateX(-this.xDegree),
                                glm.rotateY(-this.yDegree));

          this.viewDirection = vec3.transformMat4(vec3.create(), [-1, -1, -1], rotateMatrix);

          vec3.normalize(this.viewDirection, this.viewDirection);
    }
}

// function which takes timeInMilliseconds and camera as args and performs
// animation depending which timestamp is currently active
function animateCamera(camera, timeInMilliseconds) {
  // get waypoints to move cam along
  let wayPoints = generateWayPoints();
  let startTime = undefined;
  let endTime = undefined;
  let startPoint = undefined;
  let endPoint = undefined;
  let cameraAnimation = true;
  let xDegreeOffset = 0;
  let yDegreeOffset = 0;

  if(timeInMilliseconds <= 2000) {
    displayText('t'
                + Math.round(timeInMilliseconds/1000)
                + '\n Billboard: Wolke rechts oben \n Skymap \n Materialien: Edwin (Chrome) \n Boden (Dunkel)\n Texturen: Cube-texture auf Edwin und 2D Textur auf dem Boden \n Animation: Edwin \n Komplexes Modell: Edwin \n Shading: Edwin');
  } else if(timeInMilliseconds <= 3000) {
    displayText('t'
                + Math.round(timeInMilliseconds/1000)
                + '\n Materialien: Edwin (Chrome) \n Boden (Dunkel)\n Texturen: Cube-texture auf Edwin und 2D Textur auf dem Boden \n Animation: Edwin \n Komplexes Modell: Edwin \n Shading: Edwin');

  } else if(timeInMilliseconds <= 8000){
      displayText('t'
                  + Math.round(timeInMilliseconds/1000)
                  + '\n particle system \n Materialien: Edwin (Chrome) \n Boden (Dunkel)\n Texturen: Cube-texture auf Edwin und 2D Textur auf dem Boden \n Animation: Edwin \n Komplexes Modell: Edwin \n Shading: Edwin');


    //displayText('t' + Math.round(timeInMilliseconds/1000) + '\n particle system');
  } else if(timeInMilliseconds <= 21000) {
    displayText('t '
                + Math.round(timeInMilliseconds/1000)
                + '\n Partikeleffekt: Lagerfeuer \n Billboarding: Partikel \n Lighting Lagerfeuer (fix) \n Materialien: Edwin (Chrome), Lagerfeuer (Individuell), Roboter (Obsidian), C-3PO (Gold), Boden (Dunkel) \n Texturen: Cube-texture auf Edwin und Roboter, 2D Textur auf dem Boden und den Partikeln \n Animation: Edwin, Roboter, Partikel\n Komplexes Modell: Edwin, Roboter \n Shading: Edwin, Roboter, C3-PO');
  } else if(timeInMilliseconds <= 30000){
    displayText('t' + Math.round(timeInMilliseconds/1000)
  + '\nBillboarding: Wolke \n Lighting: Sonne (beweglich) \n Materialien: Edwin (Chrome), C-3PO (Gold), Boden (Dunkel) \n Texturen: Cube-texture auf Edwin, 2D Textur auf dem Boden und der Glasswand \n Animation: Edwin, Roboter, Partikel \n Komplexes Modell: Edwin \n Shading: Edwin, C3-PO \n Transparancy: Glasswand');
} else {
  displayText('t' + Math.round(timeInMilliseconds/1000));
}
  // depending which timestamp is currently correct set startTime, endtime, startpoint and endpoint correctly
  if(timeInMilliseconds <= 8000) {
    startTime = timeInMilliseconds;
    endTime = 8000;
    startPoint = wayPoints[0];
    endPoint = wayPoints[1];

    // rotate camera downwards, factors generated by trial and error
    if(timeInMilliseconds >= 1000 && timeInMilliseconds <= 4500) {
      xDegreeOffset = timeInMilliseconds/10000;
      yDegreeOffset = timeInMilliseconds/10000;
    }

  } else if(timeInMilliseconds <= 21000) {
    startTime = timeInMilliseconds - 8000;
    endTime = 21000 - 8000;
    startPoint = wayPoints[1];
    endPoint = wayPoints[2];

    // rotate camera slightly to the right
    if(timeInMilliseconds >= 18000 && timeInMilliseconds <= 21000) {
      yDegreeOffset = timeInMilliseconds/100000;
    }

  } else if(timeInMilliseconds <= 30000) {
    startTime = timeInMilliseconds - 21000;
    endTime = 30000 - 21000;
    startPoint = wayPoints[2];
    endPoint = wayPoints[3];

    // end of animation reached
  } else {
    cameraAnimation = false;
  }

  // if camera animation is still running, perform linear interpolation between
  // startPoint and EndPoint and rotate
  if(cameraAnimation) {
    // weghing factor for lERP
    let camTime = startTime / endTime;
    // clamp betweeen 0 and 1, 0 = startPoint, 1 = endPointr
    camTime = Math.max(0, Math.min(1, camTime));

    let pos = vec3.lerp(vec3.create(), startPoint, endPoint, camTime);
    camera.position = pos;
    camera.xDegree += xDegreeOffset;
    camera.yDegree += yDegreeOffset;

    camera.updateViewDirection();
  }
}

// generate waypoints which camera visits in animation
function generateWayPoints() {
  let t0 = vec3.fromValues(0, 20, 0);
  let t8 = vec3.fromValues(0, 10, 0);
  let t21 = vec3.fromValues(0, 20, 0);
  let t30 = vec3.fromValues(0, 25, 0);

  return [t0, t8, t21, t30];
}
