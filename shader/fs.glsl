precision mediump float;

struct Material {
	vec4 ambient;
	vec4 diffuse;
	vec4 specular;
	vec4 emission;
	float shininess;
};

struct Light {
	vec4 ambient;
	vec4 diffuse;
	vec4 specular;
};


vec4 calculateSimplePointLight(Light light, Material material, vec3 lightVec, vec3 normalVec, vec3 eyeVec, vec4 textureColor) {
	lightVec = normalize(lightVec);
	normalVec = normalize(normalVec);
	eyeVec = normalize(eyeVec);

	//compute diffuse term
	float diffuse = max(dot(normalVec,lightVec),0.0);

	//compute specular term
	vec3 reflectVec = reflect(-lightVec,normalVec);
	float spec = pow( max( dot(reflectVec, eyeVec), 0.0) , material.shininess);

  //TASK 2: replace diffuse and ambient material color with texture color
  material.diffuse = textureColor;
  material.ambient = textureColor;
	//Note: an alternative to replacing the material color is to multiply it with the texture color


	vec4 c_amb  = clamp(light.ambient * material.ambient, 0.0, 1.0);
	vec4 c_diff = clamp(diffuse * light.diffuse * material.diffuse, 0.0, 1.0);
	vec4 c_spec = clamp(spec * light.specular * material.specular, 0.0, 1.0);
	vec4 c_em   = material.emission;

  return  c_amb + c_diff + c_spec + c_em;
}
//texture related variables
uniform bool u_transparent;
uniform bool u_enableObjectTexture;
uniform bool u_enableCubeTexture;

varying vec2 v_texCoord;
uniform sampler2D u_tex;

uniform samplerCube u_texCube;

varying vec3 v_position;

uniform Light u_light;
uniform Light u_light2;


//varying vectors for light computation
varying vec3 v_normalVec;
varying vec3 v_eyeVec;
varying vec3 v_lightVec;
varying vec3 v_light2Vec;

uniform Material u_material;

void main (void) {

  vec4 textureColor = vec4(0,0,0,1);

  if(u_enableCubeTexture) {
    //set texture coordinates to vertex position so every face of the cube contains one image
    vec3 texCoords = v_position;
    //do texture lookup in cube map using the textureCube function
    textureColor = textureCube(u_texCube, texCoords);
  } else
  if (u_enableObjectTexture) {
    //texture lookup
    textureColor =  texture2D(u_tex, v_texCoord);
  }

	if (!u_transparent) {
		gl_FragColor =	calculateSimplePointLight(u_light, u_material, v_lightVec, v_normalVec, v_eyeVec, textureColor) +
		calculateSimplePointLight(u_light2, u_material, v_light2Vec, v_normalVec, v_eyeVec, textureColor);
	} else {
		gl_FragColor = textureColor;
	}

  return;
}
