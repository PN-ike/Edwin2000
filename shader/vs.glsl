// Phong Vertex Shader

attribute vec3 a_position;
attribute vec3 a_normal;
attribute vec2 a_texCoord;

uniform mat4 u_modelView;
uniform mat3 u_normalMatrix;
uniform mat4 u_projection;
uniform mat4 u_invView;

uniform vec3 u_lightPos;
uniform vec3 u_light2Pos;
uniform bool u_billboardEnabled;
uniform bool u_enableObjectTexture;
uniform bool u_enableCubeTexture;

//output of this shader

varying vec3 v_normalVec;
varying vec3 v_eyeVec;
varying vec3 v_lightVec;
varying vec3 v_light2Vec;

varying vec2 v_texCoord;
varying vec3 v_position;


void main() {

		vec4 eyePosition = u_modelView * vec4(a_position,1);

		// output for phong shading
		v_normalVec = u_normalMatrix * a_normal;
	  v_eyeVec = -eyePosition.xyz;
		v_lightVec = u_lightPos - eyePosition.xyz;
		v_light2Vec = u_light2Pos - eyePosition.xyz;


	// if called from a CubeTextureSGNode
	if (u_enableCubeTexture) {
		v_position = a_position;
	}

	// if called from a TextureSGNode
	if (u_enableObjectTexture) {
		v_texCoord = a_texCoord;
	}
	// if called from a BillboardSGNode
	if (u_billboardEnabled) {
		//we use the camera translation part of the modelViewMatrix added with the
		// vertex position to make the vertex dependent on the camera position
		gl_Position = u_projection * (u_modelView * vec4(0, 0, 0, 1) + vec4(a_position, 1));
		return;
	} else {
		gl_Position = u_projection * u_modelView * vec4(a_position,1);
	}
}
