class Camera {

  constructor() {
    this.position = vec3.fromValues(0, 0, 3);
    this.viewDirection = vec3.fromValues(0, 0, -1);
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
  }

    moveUp() {
      var toAdd = vec3.create();
      vec3.scale(toAdd, this.myUp, this.movementSpeed);
      vec3.add(this.position, this.position, toAdd);

      return;
    }

    moveDown() {
      var toAdd = vec3.create();
      vec3.scale(toAdd, this.myUp, -this.movementSpeed);
      vec3.add(this.position, this.position, toAdd);

      return;
    }

    moveForward() {

      var toAdd = vec3.create();
      vec3.scale(toAdd, this.viewDirection, this.movementSpeed);
      vec3.add(this.position, this.position, toAdd);

      return;
    }

    moveBack() {
      var toAdd = vec3.create();
      vec3.scale(toAdd, this.viewDirection, -this.movementSpeed);
      vec3.add(this.position, this.position, toAdd);

      return;
    }

    moveLeft() {
      var direction = vec3.create();
      var toAdd = vec3.create();

      vec3.cross(direction, this.viewDirection, this.myUp);
      vec3.scale(toAdd, direction, -this.movementSpeed);
      vec3.add(this.position, this.position, toAdd);

      return;
    }

    moveRight() {
      var direction = vec3.create();
      var toAdd = vec3.create();

      vec3.cross(direction, this.viewDirection, this.myUp);
      vec3.scale(toAdd, direction, this.movementSpeed);
      vec3.add(this.position, this.position, toAdd);

      return;
    }


    upDateViewDirection() {

      // if(false) {

          let rotateMatrix = mat4.multiply(mat4.create(),
                                glm.rotateX(-this.xDegree),
                                glm.rotateY(-this.yDegree));

          this.viewDirection = vec3.transformMat4(vec3.create(), [0, 0, -1], rotateMatrix);

          vec3.normalize(this.viewDirection, this.viewDirection);

      //}
    }

}
