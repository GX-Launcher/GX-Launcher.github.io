#line 2

EAGLER_VSH_LAYOUT_BEGIN()
EAGLER_IN(0, vec2, a_position2f)
EAGLER_VSH_LAYOUT_END()

uniform vec2 u_screenSize;
uniform vec4 u_elementRect;

EAGLER_OUT(vec2, v_texCoord2f)
EAGLER_OUT(vec2, v_localPos2f)
EAGLER_OUT(vec2, v_screenCoord2f)

void main() {
	v_texCoord2f = a_position2f * 0.5 + 0.5;
	v_localPos2f = v_texCoord2f * u_elementRect.zw;
	vec2 pixelPos = u_elementRect.xy + v_localPos2f;
	v_screenCoord2f = pixelPos / u_screenSize;
	EAGLER_VERT_POSITION = vec4(
		(pixelPos.x / u_screenSize.x) * 2.0 - 1.0,
		1.0 - (pixelPos.y / u_screenSize.y) * 2.0,
		0.0,
		1.0
	);
}
