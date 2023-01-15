#include <common>

uniform vec3 iResolution;
uniform float iTime;

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}