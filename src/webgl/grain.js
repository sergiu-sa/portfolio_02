// Dependency-free fullscreen fragment shader: dark stage surface with a drifting light pool, vignette, and animated film grain.
// Returns a cleanup function. No-ops gracefully if WebGL is unavailable.
// Honors prefers-reduced-motion by rendering a single static frame.

const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`

const FRAG = `
precision highp float;
uniform vec2  u_res;
uniform float u_time;

float hash(vec2 x) {
  return fract(sin(dot(x, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  float aspect = u_res.x / u_res.y;

  // base dark surface (warm charcoal)
  vec3 base = vec3(0.040, 0.040, 0.052);

  // drifting light pool
  vec2 lp = vec2(0.5 + 0.05 * sin(u_time * 0.13), 0.40 + 0.04 * cos(u_time * 0.10));
  vec2 lc = uv - lp; lc.x *= aspect;
  float pool = smoothstep(0.72, 0.02, length(lc));
  vec3 col = base + pool * vec3(0.11, 0.105, 0.092);

  // vignette
  vec2 vc = uv - 0.5; vc.x *= aspect;
  col *= smoothstep(1.20, 0.30, length(vc));

  // animated grain
  float g = hash(gl_FragCoord.xy + fract(u_time) * vec2(91.7, 47.3));
  col += (g - 0.5) * 0.045;

  gl_FragColor = vec4(col, 1.0);
}
`

function compile(gl, type, src) {
  const sh = gl.createShader(type)
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.warn('[grain] shader compile failed:', gl.getShaderInfoLog(sh))
    gl.deleteShader(sh)
    return null
  }
  return sh
}

export function initGrain(canvas) {
  let gl
  try {
    gl = canvas.getContext('webgl', { antialias: false, depth: false, stencil: false })
  } catch {
    gl = null
  }
  if (!gl) return () => {}

  const vs = compile(gl, gl.VERTEX_SHADER, VERT)
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
  if (!vs || !fs) return () => {}

  const prog = gl.createProgram()
  gl.attachShader(prog, vs)
  gl.attachShader(prog, fs)
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.warn('[grain] program link failed:', gl.getProgramInfoLog(prog))
    return () => {}
  }
  gl.useProgram(prog)

  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(prog, 'p')
  gl.enableVertexAttribArray(loc)
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

  const uRes = gl.getUniformLocation(prog, 'u_res')
  const uTime = gl.getUniformLocation(prog, 'u_time')

  const dpr = () => Math.min(window.devicePixelRatio || 1, 1.5)
  function resize() {
    const w = Math.floor(canvas.clientWidth * dpr())
    const h = Math.floor(canvas.clientHeight * dpr())
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w
      canvas.height = h
    }
    gl.viewport(0, 0, canvas.width, canvas.height)
  }

  // Reduced motion: draw one static frame (no rAF loop), redraw on resize.
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) {
    function drawStatic() {
      resize()
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, 0)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    drawStatic()
    window.addEventListener('resize', drawStatic)
    return () => {
      window.removeEventListener('resize', drawStatic)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }

  let raf = 0
  const start = performance.now()
  function frame(now) {
    resize()
    gl.uniform2f(uRes, canvas.width, canvas.height)
    gl.uniform1f(uTime, (now - start) / 1000)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    raf = requestAnimationFrame(frame)
  }
  raf = requestAnimationFrame(frame)
  window.addEventListener('resize', resize)

  return () => {
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', resize)
    gl.getExtension('WEBGL_lose_context')?.loseContext()
  }
}
