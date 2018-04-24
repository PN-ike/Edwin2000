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
    this.forward = false;
    this.back = false;
    this.up = false;
    this.down = false;

    this.lookHorizontalValue = 0;
    this.lookVerticalValue = 0;
  }

    moveUp(viewMatrix) {
      viewMatrix = matrixMultiply(viewMatrix, makeTranslationMatrix(0, -0.1, 0));
      this.up = false;
      this.moveButton = false;
      return viewMatrix;
    }

    moveDown(viewMatrix) {
      viewMatrix = matrixMultiply(viewMatrix, makeTranslationMatrix(0, 0.1, 0));
      this.down = false;
      this.moveButton = false;
      return viewMatrix;
    }

    moveForward(viewMatrix) {
      viewMatrix = matrixMultiply(viewMatrix, makeTranslationMatrix(0, 0, 0.1));
      this.forward = false;
      this.moveButton = false;
      return viewMatrix;
    }

    moveBack(viewMatrix) {
      viewMatrix = matrixMultiply(viewMatrix, makeTranslationMatrix(0, 0, -0.1));
      this.back = false;
      this.moveButton = false;
      return viewMatrix;
    }

    moveLeft(viewMatrix) {
      viewMatrix = matrixMultiply(viewMatrix, makeTranslationMatrix(0.1, 0, 0));
      this.left = false;
      this.moveButton = false;
      return viewMatrix;
    }

    moveRight(viewMatrix) {
      viewMatrix = matrixMultiply(viewMatrix, makeTranslationMatrix(-0.1, 0, 0));
      this.right = false;
      this.moveButton = false;
      return viewMatrix;
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
