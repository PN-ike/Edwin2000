// Phong Vertex Shader

attribute vec3 a_position;
attribute vec3 a_normal;
//given texture coordinates per vertex
attribute vec2 a_texCoord;

uniform mat4 u_modelView;
uniform mat3 u_normalMatrix;
uniform mat4 u_projection;
uniform mat4 u_invView;

uniform vec3 u_lightPos;
uniform bool u_billboardEnabled;
uniform bool u_enableObjectTexture;
uniform bool u_enableCubeTexture;

//output of this shader
varying vec3 v_normalVec;
varying vec3 v_eyeVec;
varying vec3 v_lightVec;

varying vec2 v_texCoord;
varying vec3 v_position;

void main() {
	//eyePosition = u_modelView * vec4(a_position,1)

	if (u_enableCubeTexture) {
		v_position = a_position;
	}

	if (u_enableObjectTexture) {
		v_texCoord = a_texCoord;
	}

	if (u_billboardEnabled) {
		//modify the position so that it depends on 	the camera position
		gl_Position = u_projection * (u_modelView * vec4(0, 0, 0, 1) + vec4(a_position, 1));
		return;
	} else {

		gl_Position = u_projection * u_modelView * vec4(a_position,1);
	}
}
