class Camera {

  constructor() {
    this.multiplier = 2;

    this.eyex = 0;
    this.eyey = 1;
    this.eyez = 2;

    this.centerx = 0;
    this.centery = 0;
    this.centerz = 0;

    this.upx = 0;
    this.upy = 1
    this.upz = 0;

    this.moveButton = false;
    this.lookButton = false;

    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;

    this.moveValueLeft = 0;
    this.moveValueRight = 0;
    this.moveValueUp = 0;
    this.moveValueDown = 0;

    this.lookHorizontalValue = 0;
    this.lookVerticalValue = 0;
  }


  lookUp(viewMatrix) {
    viewMatrix = matrixMultiply(viewMatrix, makeXRotationMatrix(convertDegreeToRadians(this.lookVerticalValue*this.multiplier)));
    this.lookButton = false;
    this.up = false;
    return viewMatrix;
  }

  lookDown(viewMatrix) {
    viewMatrix = matrixMultiply(viewMatrix, makeXRotationMatrix(convertDegreeToRadians(this.lookVerticalValue*this.multiplier)));
    this.lookButton = false;
    this.down = false;
    return viewMatrix;
  }

  lookLeft(viewMatrix) {
    viewMatrix = matrixMultiply(viewMatrix, makeYRotationMatrix(convertDegreeToRadians(this.lookHorizontalValue*this.multiplier)));
    this.lookButton = false;
    this.left = false;
    return viewMatrix;
  }

  lookRight(viewMatrix) {
    viewMatrix = matrixMultiply(viewMatrix, makeYRotationMatrix(convertDegreeToRadians(this.lookHorizontalValue*this.multiplier)));
    this.lookButton = false;
    this.right = false;
    return viewMatrix;
  }

}
