#line 2

EAGLER_IN(vec2, v_texCoord2f)
EAGLER_FRAG_OUT()

uniform sampler2D u_samplerTexture;
uniform vec2 u_texelSize;
uniform bool u_horizontal;

const float weights[7] = float[](0.07027, 0.13197, 0.19046, 0.21460, 0.19046, 0.13197, 0.07027);

vec3 blurHorizontal() {
    vec3 sum = vec3(0.0);
    for (int i = -3; i <= 3; i++) {
        sum += EAGLER_TEXTURE_2D(u_samplerTexture, v_texCoord2f + vec2(float(i) * u_texelSize.x, 0.0)).rgb * weights[i + 3];
    }
    return sum;
}

vec3 blurVertical() {
    vec3 sum = vec3(0.0);
    for (int i = -3; i <= 3; i++) {
        sum += EAGLER_TEXTURE_2D(u_samplerTexture, v_texCoord2f + vec2(0.0, float(i) * u_texelSize.y)).rgb * weights[i + 3];
    }
    return sum;
}

uniform vec2 u_blurDir; // was: uniform bool u_horizontal

void main() {
    vec3 sum = vec3(0.0);
    for (int i = -3; i <= 3; i++) {
        vec2 offset = vec2(float(i)) * u_texelSize * u_blurDir;
        sum += EAGLER_TEXTURE_2D(u_samplerTexture, v_texCoord2f + offset).rgb * weights[i + 3];
    }
    eagler_FragColor = vec4(sum, 1.0);
}