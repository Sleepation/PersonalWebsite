// To make it uniform
    precision mediump float;

    // an attribute will receive data from a buffer
    attribute vec2 a_position;

    uniform vec2 u_resolution;

    // all shaders have a main function
    void main() {

      // gl_Position is a special variable a vertex shader
      // is responsible for setting

      vec2 zeroToOne = a_position/u_resolution;

      vec2 zeroToTwo = zeroToOne * 2.0;

      vec2 clipSpace = zeroToTwo - 1.0;

      gl_Position = vec4(clipSpace, 0.0, 1.0);
    }