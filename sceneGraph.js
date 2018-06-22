var cloudBaseNode;

function createFloor(resources) {

  var floorBaseNode = new  MaterialSGNode();

      //dark
      floorBaseNode.ambient = [0, 0, 0, 1];
      floorBaseNode.diffuse = [0.1, 0.1, 0.1, 1];
      floorBaseNode.specular = [0.3, 0.3, 0.3, 1];
      floorBaseNode.shininess = 10;

  var rectangleNode = new TextureSGNode(floorTexture, 2, new RenderSGNode(makeRect(2, 2)));

  var floorTransformationNode = new TransformationSGNode(mat4.create(), [
              new TransformationSGNode(glm.transform({
                scale: [22.5, 22.5, 1.0],
                rotateX: 90,
                translate: [0, -0.9, 0]
                }),  [rectangleNode])]);

  floorBaseNode.append(floorTransformationNode);

  return floorBaseNode;

}
function createC3P0(resources) {

        let c3po = new MaterialSGNode([new RenderSGNode(resources.c3poModel)]);

        //gold
        c3po.ambient = [0.24725, 0.1995, 0.0745, 1];
        c3po.diffuse = [0.75164, 0.60648, 0.22648, 1];
        c3po.specular = [0.628281, 0.555802, 0.366065, 1];
        c3po.shininess = 0.4;

        let c3poNode = new TransformationSGNode(mat4.create(),
        [new TransformationSGNode(glm.translate(10, -1, 0),  [c3po])]);

        return c3poNode;
}

function createBonfire(resources) {

        let bonfire = new MaterialSGNode([ new RenderSGNode(resources.bonfireModel) ]);

        bonfire.ambient = [1, 1, 1, 1];
        bonfire.diffuse = [1, 1, 1, 1];
        bonfire.specular = [0.3, 0.2, 0., 1];
        bonfire.shininess = 1;

        let bonfireNode = new TransformationSGNode(mat4.create(),
          [
            new TransformationSGNode(glm.transform({ translate: [-0.95, -0.8, -0.8], scale: 0.5}), [bonfire])
          ]);

        return bonfireNode;
}

function createSun(resources) {

        let light2 = new LightSGNode();
        light2.uniform = 'u_light2';
        light2.ambient = [0.8, 0.8, 0.8, 1];
        light2.diffuse = [1, 1, 1, 1];
        light2.specular = [1, 1, 1, 1];
        light2.position = [2, -0.5, 0];
        light2.append(createLightSphere(resources));
        rotateLight2 = new TransformationSGNode(mat4.create(), [
            light2
        ]);

        return rotateLight2;
}

function animateSun() {
        mat4.multiply(rotateLight2.matrix, mat4.create(), glm.rotateY(circleCount/2));
        mat4.multiply(rotateLight2.matrix, rotateLight2.matrix, glm.translate(20, 12,0));
}


function createFireLight(resources) {

        let light = new LightSGNode();

        light.diffuse = [1, 0, 0, 1];
        light.specular = [1, 0, 0, 1];
        light.position = [-0.95, -0.8, -0.8];

        let translateLight = new TransformationSGNode(glm.translate(-0.95, -0.8, -0.8));
        translateLight.append(light);

        return translateLight;
}

function createLightSphere(resources) {
    return new ShaderSGNode(createProgram(gl, resources.vs_single, resources.fs_single), [
      new RenderSGNode(makeSphere(.2,10,10))
    ]);
}

function createSky() {

        var cubeNode = new TransparentSGNode(new CubeTextureSGNode(skyTexture, 4, new RenderSGNode(makeCube())));

        var node = new TransformationSGNode(mat4.create(), [
                    new TransformationSGNode(glm.transform({
                        scale: [150, 150, 150],
                        translate: [0, 15, 0],
                        rotateZ: 180
                      }), [cubeNode])]);

          return node;
}

function createClouds(resources) {

      cloudBaseNode = new TransformationSGNode(mat4.create());

      cloudBaseNode.append(createCloud(5, 20, 0, endCloudTexture));
      cloudBaseNode.append(createCloud(15, 30, 0, cloudTexture));
      cloudBaseNode.append(createCloud(-10, 20, 0, cloudTexture));
      cloudBaseNode.append(createCloud(-5, 15, -30, cloudTexture));

      return cloudBaseNode;
}

function createCloud(x, y, z, texture) {
      {
        //initialize cloud
        let cloud = new TransparentSGNode(new MaterialSGNode(new BillboardSGNode(new TextureSGNode(texture, 2,
                    new RenderSGNode(makeRect(1))))));

        var cloudTransformNode = new TransformationSGNode(glm.transform({ translate: [x,y,z]}), [
          cloud
        ]);
      }
      return cloudTransformNode;
}

function createGlassWall(resources) {

    var wallBaseNode = new  MaterialSGNode();

    var rectangleNode =new TransparentSGNode( new TextureSGNode(windowTexture, 2, new RenderSGNode(makeRect(0.3, 0.3))));

    var wallTransformationNode = new TransformationSGNode(mat4.create(), [
                new TransformationSGNode(glm.transform({
                  rotateY: 45,
                  translate: [13, 3.6, 10],
                  scale: [20, 15, 0.5]
                  }),  [rectangleNode])]);

    wallBaseNode.append(wallTransformationNode);

    return wallBaseNode;
}

// returns a new rendering context

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

// a node to tell the fragment shader to return the texture color
class TransparentSGNode extends SGNode {
  constructor(children) {
      super(children);
  }

  render(context)
  {
    //enable transparent boolean in shader
    gl.uniform1i(gl.getUniformLocation(context.shader, 'u_transparent'), 1);

    //render children
    super.render(context);

    //disable  transparent boolean in shader
    gl.uniform1i(gl.getUniformLocation(context.shader, 'u_transparent'), 0);
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
    //tell shader to use our texture
    gl.uniform1i(gl.getUniformLocation(context.shader, 'u_enableObjectTexture'), 1);

    //set shader parameters
    gl.uniform1i(gl.getUniformLocation(context.shader, 'u_tex'), this.textureunit);

    //activate texture unit and bind texture
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
    // tell the shader to enable cube texturing
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
