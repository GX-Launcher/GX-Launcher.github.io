#line 2

EAGLER_IN(vec2, v_localPos2f)
EAGLER_IN(vec2, v_screenCoord2f)
EAGLER_FRAG_OUT()

uniform sampler2D u_blurTexture;
uniform vec2 u_size2f;
uniform float u_radius;
uniform vec4 u_color;

float sdRoundRect(vec2 p, vec2 size, float radius) {
	vec2 q = abs(p - size * 0.5) - (size * 0.5 - vec2(radius));
	return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - radius;
}

void main() {
	float radius = min(u_radius, min(u_size2f.x, u_size2f.y) * 0.5);
	float dist = sdRoundRect(v_localPos2f, u_size2f, radius);
	float aa = max(fwidth(dist), 1.0);
	float alpha = 1.0 - smoothstep(0.0, aa, dist);
	vec3 blur = EAGLER_TEXTURE_2D(u_blurTexture, v_screenCoord2f).rgb;
	vec3 rgb = mix(blur, u_color.rgb, 0.35 * u_color.a);
	eagler_FragColor = vec4(rgb, alpha);
}
