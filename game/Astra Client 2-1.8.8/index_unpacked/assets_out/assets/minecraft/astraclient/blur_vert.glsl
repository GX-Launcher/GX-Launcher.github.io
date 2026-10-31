EAGLER_IN(0, vec2, vertexPosition)
EAGLER_OUT(vec2, uv)
void main() {
    uv = vertexPosition * 0.5 + 0.5;
    gl_Position = vec4(vertexPosition, 0.0, 1.0);
}
