// fragment shaders don't have a default precision so we need
    // to pick one. mediump is a good default
    precision mediump float;

    uniform float u_time;

    uniform vec2 u_resolution;

    void main() {
      // gl_FragColor is a special variable a fragment shader
      // is responsible for setting


      //Sin is from -1 to 1

      float red = (sin(u_time * 2.0) + 1.0) * 0.5;
      float blue = (cos(u_time * 2.0) + 1.0) * 0.5;
      float green = (sin(u_time * 4.0) + 1.0) * 0.5;

      // vec3 topColor = vec3 (red, blue, green);

      vec3 topColor = vec3 (0.0, 0.180, 0.349);

      vec3 bottomColor = vec3(0.008, 0.710, 0.810);

      float normalized_x = gl_FragCoord.x/u_resolution.x;

      float wave = sin(normalized_x * 3.14 + u_time * 3.0) * 0.2 - 0.5;

      float normalized_y = gl_FragCoord.y/u_resolution.y;

      float gradient = (normalized_y - wave);

      // float x_sin = sin(normalized_y);

      vec3 color = mix(bottomColor, topColor, gradient);

      gl_FragColor = vec4(color, 1.0);
    }