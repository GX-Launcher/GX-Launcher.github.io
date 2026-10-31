#line 2

EAGLER_IN(vec2, v_localPos2f)
EAGLER_FRAG_OUT()

uniform vec4 u_elementRect;
uniform float u_radius;
uniform float u_startAngle;
uniform float u_endAngle;
uniform vec4 u_color;

const float TWO_PI = 6.28318530718;

bool angleInRange(float angle, float startAngle, float endAngle) {
	if (endAngle < startAngle) {
		endAngle += TWO_PI;
		if (angle < startAngle) {
			angle += TWO_PI;
		}
	}
	return angle >= startAngle && angle <= endAngle;
}

void main() {
	vec2 size = u_elementRect.zw;
	vec2 center = size * 0.5;
	vec2 n = (v_localPos2f - center) / max(center, vec2(1.0));
	float dist = length(n) - 1.0;
	float aa = max(fwidth(dist), 1.0 / max(min(size.x, size.y), 1.0));
	float alpha = 1.0 - smoothstep(0.0, aa, dist);

	vec2 dir = normalize(vec2(n.x, -n.y));
	float angle = atan(dir.y, dir.x);
	if (angle < 0.0) {
		angle += TWO_PI;
	}

	if (!angleInRange(angle, u_startAngle, u_endAngle)) {
		discard;
	}

	eagler_FragColor = vec4(u_color.rgb, u_color.a * alpha);
}
