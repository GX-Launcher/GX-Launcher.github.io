precision mediump float;
uniform sampler2D u_texture;
uniform float u_blur;
EAGLER_IN(vec2, uv)

void main() {
    vec4 color = vec4(0.0);
    float total = 0.0;

    // simple box blur kernel
    for (float x = -4.0; x <= 4.0; x++) {
        for (float y = -4.0; y <= 4.0; y++) {
            float weight = 1.0 - (abs(x) + abs(y)) / 8.0;
            color += texture2D(u_texture, uv + vec2(x, y) * u_blur) * weight;
            total += weight;
        }
    }

    gl_FragColor = color / total;
}
