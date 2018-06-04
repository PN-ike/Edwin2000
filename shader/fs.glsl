precision mediump float;

//texture related variables
uniform bool u_enableObjectTexture;
uniform bool u_enableCubeTexture;

varying vec2 v_texCoord;
uniform sampler2D u_tex;

uniform samplerCube u_texCube;

varying vec3 v_position;


struct Material {
	vec4 ambient;
	vec4 diffuse;
	vec4 specular;
	vec4 emission;
	float shininess;
};

uniform Material u_material;

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
    gl_FragColor =  texture2D(u_tex, v_texCoord);
    return;
  }

  return;
}
