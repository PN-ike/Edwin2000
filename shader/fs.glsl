/**
 * a phong shader implementation with texture support
 */
precision mediump float;

/**
 * definition of a material structure containing common properties
 */
struct Material {
	vec4 ambient;
	vec4 diffuse;
	vec4 specular;
	vec4 emission;
	float shininess;
};

//texture related variables
uniform bool u_enableObjectTexture; //note: boolean flags are a simple but not the best option to handle textured and untextured objects
uniform bool u_enableCubeTexture;

varying vec2 v_texCoord;
uniform sampler2D u_tex;

uniform samplerCube u_texCube;

varying vec3 v_position;



void main (void) {

  if(u_enableCubeTexture) {
    //set texture coordinates to vertex position so every face of the cube contains one image
    vec3 texCoords = v_position;

    //do texture lookup in cube map using the textureCube function
    gl_FragColor = textureCube(u_texCube, texCoords);
    return;
  }
  if (u_enableObjectTexture) {
    //texture lookup
    gl_FragColor =  texture2D(u_tex, v_texCoord); //replace me for TASK 1 and remove me for TASK 2!!!
    return;
  }

  return;
}
