#line 2

EAGLER_IN(vec2, v_position2f)
EAGLER_FRAG_OUT()

uniform sampler2D u_samplerTexture;
uniform vec2 u_texelSize;
uniform vec2 u_blurDir;

const float weights[7] = float[](0.07027, 0.13197, 0.19046, 0.21460, 0.19046, 0.13197, 0.07027);

void main() {
	vec3 color = vec3(0.0);
	for (int i = -3; i <= 3; ++i) {
		vec2 offset = u_blurDir * u_texelSize * float(i);
		color += EAGLER_TEXTURE_2D(u_samplerTexture, v_position2f + offset).rgb * weights[i + 3];
	}
	eagler_FragColor = vec4(color, 1.0);
}
