var camera;

class Camera {

  constructor() {
    //this.position = vec3.fromValues(-2.65, 9, 40);
    //this.viewDirection = vec3.fromValues(0.2672, -0.345, -0.89);

    this.position = vec3.fromValues(0, 7, 0);
    this.viewDirection = vec3.fromValues(-1, 0, 0);

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

    moveUp() {
      if(!camera.free) {
        return;
      }

      var toAdd = vec3.create();
      vec3.scale(toAdd, this.myUp, this.movementSpeed);
      vec3.add(this.position, this.position, toAdd);

      return;
    }

    moveDown() {
      if(!camera.free) {
        return;
      }

      var toAdd = vec3.create();
      vec3.scale(toAdd, this.myUp, -this.movementSpeed);
      vec3.add(this.position, this.position, toAdd);

      return;
    }

    moveForward() {
      if(!camera.free) {
        return;
      }

      var toAdd = vec3.create();
      vec3.scale(toAdd, this.viewDirection, this.movementSpeed);
      vec3.add(this.position, this.position, toAdd);

      return;
    }

    moveBack() {
      if(!camera.free) {
        return;
      }

      var toAdd = vec3.create();
      vec3.scale(toAdd, this.viewDirection, -this.movementSpeed);
      vec3.add(this.position, this.position, toAdd);

      return;
    }

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


    updateViewDirection() {

          let rotateMatrix = mat4.multiply(mat4.create(),
                                glm.rotateX(-this.xDegree),
                                glm.rotateY(-this.yDegree));

          this.viewDirection = vec3.transformMat4(vec3.create(), [-1, -1, -1], rotateMatrix);

          vec3.normalize(this.viewDirection, this.viewDirection);
    }
}

function animateCamera(camera, timeInMilliseconds) {
  let wayPoints = generateWayPoints();
  let startTime = undefined;
  let endTime = undefined;
  let startPoint = undefined;
  let endPoint = undefined;
  let cameraAnimation = true;
  let xDegreeOffset = 0;
  let yDegreeOffset = 0;

  if(timeInMilliseconds <= 8000) {
    startTime = timeInMilliseconds;
    endTime = 8000;
    startPoint = wayPoints[0];
    endPoint = wayPoints[1];

    if(timeInMilliseconds >= 1000 && timeInMilliseconds <= 4500) {
      xDegreeOffset = timeInMilliseconds/10000;
      yDegreeOffset = timeInMilliseconds/10000;
    }

  } else if(timeInMilliseconds <= 21000) {
    startTime = timeInMilliseconds - 8000;
    endTime = 21000;
    startPoint = wayPoints[1];
    endPoint = wayPoints[2];
    if(timeInMilliseconds >= 18000 && timeInMilliseconds <= 21000) {
      yDegreeOffset = timeInMilliseconds/100000;
    }
  } else {
    cameraAnimation = false;
  }

  if(cameraAnimation) {

    let camTime = startTime / endTime;
    camTime = Math.max(0, Math.min(1, camTime));

    let pos = vec3.lerp(vec3.create(), startPoint, endPoint, camTime);
    camera.position = pos;
    camera.xDegree += xDegreeOffset;
    camera.yDegree += yDegreeOffset;
    camera.updateViewDirection();
  }
}

function generateWayPoints() {
  let t0 = vec3.fromValues(0, 20, 0);
  let t8 = vec3.fromValues(0, 10, 0);
  let t21 = vec3.fromValues(0, 20, 0);
  let t30 = vec3.fromValues(5, 5, 10);

  return [t0, t8, t21, t30];
}
