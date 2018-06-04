var cloudBaseNode;

function createFloor(resources) {

  var floorBaseNode = new ShaderSGNode(createProgram(gl, resources.vs, resources.fs));

  var rectangleNode = new TextureSGNode(floorTexture, 2, new RenderSGNode(makeRect(2, 2)));

  var floorTransformationNode = new TransformationSGNode(mat4.create(), [
              new TransformationSGNode(glm.transform({
                scale: [10, 10, 1.0],
                rotateX: 90,
                translate: [0, -0.9, 0]
                }),  [rectangleNode])]);

  floorBaseNode.append(floorTransformationNode);

  return floorBaseNode;

}
function createClouds(resources) {

      cloudBaseNode = new TransformationSGNode(mat4.create());

      cloudBaseNode.append(createCloud(0, 10, 0));
      cloudBaseNode.append(createCloud(15, 15, 0));
      cloudBaseNode.append(createCloud(-10, 10, 0));
      cloudBaseNode.append(createCloud(-5, 5, -30));

      return cloudBaseNode;
}

function createCloud(x, y, z) {
      {
        //initialize cloud
        let cloud = new BillboardSGNode(new TextureSGNode(cloudTexture, 2,
                    new RenderSGNode(makeRect(1))));

        var cloudTransformNode = new TransformationSGNode(glm.transform({ translate: [x,y,z]}), [
          cloud
        ]);
      }
      return cloudTransformNode;
}

function createGlassWall(resources) {

    var wallBaseNode = new ShaderSGNode(createProgram(gl, resources.vs, resources.fs));

    var rectangleNode = new TextureSGNode(windowTexture, 2, new RenderSGNode(makeRect(0.3, 0.3)));

    var wallTransformationNode = new TransformationSGNode(mat4.create(), [
                new TransformationSGNode(glm.transform({
                  rotateY: 45,
                  translate: [13, 3.6, 10],
                  scale: [20, 15, 0.5]
                  }),  [rectangleNode])]);

    wallBaseNode.append(wallTransformationNode);

    return wallBaseNode;
}

/**
 * returns a new rendering context
 * @param gl the gl context
 * @param projectionMatrix optional projection Matrix
 * @returns {ISceneGraphContext}
 */


function createSceneGraphContext(gl, shader) {

  //create a default projection matrix
  projectionMatrix = mat4.perspective(mat4.create(), fieldOfViewInRadians, aspectRatio, near, far);
  //set projection matrix
  gl.uniformMatrix4fv(gl.getUniformLocation(shader, 'u_projection'), false, projectionMatrix);

  return {
    gl: gl,
    sceneMatrix: mat4.create(),
    viewMatrix: calculateViewMatrix(),
    projectionMatrix: projectionMatrix,
    shader: shader
  };
}

//a scene graph node to enable billboarding
class BillboardSGNode extends SGNode {
  constructor(children) {
      super(children);
  }

  render(context)
  {
    //enable billboarding in shader
    gl.uniform1i(gl.getUniformLocation(context.shader, 'u_billboardEnabled'), 1);

    //render children
    super.render(context);

    //disable billboarding in shader
    gl.uniform1i(gl.getUniformLocation(context.shader, 'u_billboardEnabled'), 0);
  }
}

class ShaderSceneGraphNode extends SGNode {
  /**
   * constructs a new shader node with the given shader program
   * @param shader the shader program to use
   */
  constructor(shader) {
    super();
    this.shader = shader;
  }

  render(context) {
    //backup prevoius one
    var backup = context.shader;
    //set current shader
    context.shader = this.shader;
    //activate the shader
    context.gl.useProgram(this.shader);
    //set projection matrix
    gl.uniformMatrix4fv(gl.getUniformLocation(context.shader, 'u_projection'),
      false, context.projectionMatrix);
    //render children
    super.render(context);
    //restore backup
    context.shader = backup;
    //activate the shader
    context.gl.useProgram(backup);
  }
};


//a scene graph node for setting texture parameters
class TextureSGNode extends SGNode {
  constructor(texture, textureunit, children ) {
      super(children);
      this.texture = texture;
      this.textureunit = textureunit;
  }

  render(context)
  {
    //tell shader to use our texture; alternatively we could use two phong shaders: one with and one without texturing support
    gl.uniform1i(gl.getUniformLocation(context.shader, 'u_enableObjectTexture'), 1);


    //set additional shader parameters
    gl.uniform1i(gl.getUniformLocation(context.shader, 'u_tex'), this.textureunit);

    //activate/select texture unit and bind texture
    gl.activeTexture(gl.TEXTURE0 + this.textureunit);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);

    //render children
    super.render(context);

    //clean up
    gl.activeTexture(gl.TEXTURE0 + this.textureunit); //set active texture unit since it might have changed in children render functions
    gl.bindTexture(gl.TEXTURE_2D, null);

    //disable texturing in shader
    gl.uniform1i(gl.getUniformLocation(context.shader, 'u_enableObjectTexturex'), 0);
  }
}

//a scene graph node for setting texture parameters for a cube
class CubeTextureSGNode extends SGNode {

  constructor(envtexture, textureunit , children ) {
      super(children);
      this.envtexture = envtexture;
      this.textureunit = textureunit;
  }

  render(context)
  {
    gl.uniform1i(gl.getUniformLocation(context.shader, 'u_enableCubeTexture'), 1);
    gl.uniform1i(gl.getUniformLocation(context.shader, 'u_texCube'), this.textureunit);

    //activate and bind texture
    gl.activeTexture(gl.TEXTURE0 + this.textureunit);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.envtexture);

    //render children
    super.render(context);

    //clean up
    gl.uniform1i(gl.getUniformLocation(context.shader, 'u_enableCubeTexture'), 0);
    gl.activeTexture(gl.TEXTURE0 + this.textureunit);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
  }
}
