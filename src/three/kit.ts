// @ts-nocheck
import { i as e } from "../ui/app";
import * as THREE from "three";

const t = THREE.RepeatWrapping,
  l = THREE.LinearMipmapLinearFilter,
  g = THREE.FloatType,
  _ = THREE.HalfFloatType,
  Ke = THREE.SRGBColorSpace,
  P = THREE.Vector2,
  yt = THREE.Quaternion,
  F = THREE.Vector3,
  Bt = THREE.WebGLRenderTarget,
  Ut = THREE.Matrix4,
  $t = THREE.Euler,
  I = THREE.Object3D,
  L = THREE.Group,
  R = THREE.Color,
  wn = THREE.Scene,
  zn = THREE.Box3,
  rr = THREE.BufferAttribute,
  z = THREE.Float32BufferAttribute,
  _r = THREE.BufferGeometry,
  wr = THREE.Plane,
  Dr = THREE.SpriteMaterial,
  Vr = THREE.Sprite,
  Jr = THREE.MeshBasicMaterial,
  B = THREE.Mesh,
  _i = THREE.InstancedMesh,
  Ci = THREE.CanvasTexture,
  wi = THREE.DepthTexture,
  V = THREE.BoxGeometry,
  Di = THREE.CircleGeometry,
  H = THREE.CylinderGeometry,
  Oi = THREE.ConeGeometry,
  ki = THREE.Curve,
  Ri = THREE.CatmullRomCurve3,
  Xi = THREE.CubicBezierCurve3,
  Qi = THREE.LineCurve3,
  ea = THREE.QuadraticBezierCurve3,
  ra = THREE.CurvePath,
  ia = THREE.Path,
  aa = THREE.Shape,
  Ha = THREE.ExtrudeGeometry,
  Ga = THREE.LatheGeometry,
  Ka = THREE.PlaneGeometry,
  qa = THREE.RingGeometry,
  Ja = THREE.ShapeGeometry,
  Xa = THREE.SphereGeometry,
  Za = THREE.TorusGeometry,
  Qa = THREE.TubeGeometry,
  $a = THREE.ShadowMaterial,
  co = THREE.ShaderMaterial,
  uo = THREE.MeshStandardMaterial,
  fo = THREE.MeshNormalMaterial,
  po = THREE.MeshLambertMaterial,
  Io = THREE.HemisphereLight,
  Xo = THREE.PointLight,
  Zo = THREE.OrthographicCamera,
  $o = THREE.DirectionalLight,
  _s = THREE.Raycaster;

var Ss = new Zo(-1, 1, 1, -1, 0, 1),
  Cs = new (class extends _r {
    constructor() {
      (super(),
        this.setAttribute(
          `position`,
          new z([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3),
        ),
        this.setAttribute(`uv`, new z([0, 2, 0, 0, 2, 0], 2)));
    }
  })(),
  ws = class {
    constructor(e) {
      this._mesh = new B(Cs, e);
    }
    dispose() {
      this._mesh.geometry.dispose();
    }
    render(e) {
      e.render(this._mesh, Ss);
    }
    get material() {
      return this._mesh.material;
    }
    set material(e) {
      this._mesh.material = e;
    }
  },
  Ts = 0,
  Es = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`,
  Ds = `
  uniform sampler2D tColor;
  uniform sampler2D tNormal;
  uniform sampler2D tDepth;
  uniform vec2 texel;
  uniform float thickness;
  uniform float depthRange;
  uniform float depthThreshold;
  uniform float normalThreshold;
  uniform vec3 lineColor;
  uniform float lineOpacity;
  uniform bool srgbOut;
  varying vec2 vUv;

  float depthAt(vec2 uv) { return texture2D(tDepth, uv).r * depthRange; }

  // Edge strength between the centre pixel and a pair of opposite neighbours.
  float edgePair(vec2 uv, vec2 off, float d0, vec4 n0) {
    vec4 na = texture2D(tNormal, uv + off);
    vec4 nb = texture2D(tNormal, uv - off);
    float da = depthAt(uv + off);
    float db = depthAt(uv - off);

    // silhouette against empty space
    float e = max(abs(na.a - n0.a), abs(nb.a - n0.a));

    if (n0.a > 0.5) {
      // depth: second derivative ignores sloped planes, catches steps
      float lap = abs(da + db - 2.0 * d0);
      float stepA = (na.a > 0.5) ? abs(da - d0) : 0.0;
      float stepB = (nb.a > 0.5) ? abs(db - d0) : 0.0;
      float dEdge = smoothstep(depthThreshold, depthThreshold * 2.0, min(lap, max(stepA, stepB) * 2.0));
      e = max(e, dEdge);

      // normal creases
      vec3 c = n0.xyz * 2.0 - 1.0;
      float ca = na.a > 0.5 ? 1.0 - dot(c, na.xyz * 2.0 - 1.0) : 0.0;
      float cb = nb.a > 0.5 ? 1.0 - dot(c, nb.xyz * 2.0 - 1.0) : 0.0;
      e = max(e, 0.9 * smoothstep(normalThreshold, normalThreshold * 2.2, max(ca, cb)));
    }
    return e;
  }

  void main() {
    vec4 col = texture2D(tColor, vUv);
    vec4 n0 = texture2D(tNormal, vUv);
    float d0 = depthAt(vUv);

    vec2 o = texel * thickness;
    float e = 0.0;
    e = max(e, edgePair(vUv, vec2(o.x, 0.0), d0, n0));
    e = max(e, edgePair(vUv, vec2(0.0, o.y), d0, n0));
    e = max(e, edgePair(vUv, vec2(o.x, o.y) * 0.7071, d0, n0));
    e = max(e, edgePair(vUv, vec2(o.x, -o.y) * 0.7071, d0, n0));
    // a softer outer ring for smoother line edges
    float e2 = 0.0;
    vec2 o2 = o * 1.5;
    e2 = max(e2, edgePair(vUv, vec2(o2.x, 0.0), d0, n0));
    e2 = max(e2, edgePair(vUv, vec2(0.0, o2.y), d0, n0));
    e = max(e, e2 * 0.35);
    e *= lineOpacity;

    // colour target holds premultiplied linear colour
    vec3 rgb = col.a > 0.0 ? col.rgb / col.a : vec3(0.0);
    float a = col.a;
    float outA = a + e * (1.0 - a);
    // blend un-premultiplied colours weighted by coverage
    vec3 mixed = (rgb * a * (1.0 - e) + lineColor * e) / max(outA, 1e-4);
    gl_FragColor = vec4(mixed, outA);
    #include <colorspace_fragment>
    // offscreen (a picture to read back): plain sRGB with straight alpha;
    // on screen: premultiplied, as the canvas expects
    if (srgbOut) gl_FragColor = sRGBTransferOETF(gl_FragColor);
    else gl_FragColor.rgb *= gl_FragColor.a;
  }
`,
  Os = class {
    constructor(
      e,
      { lineColor: t = `#151a2c`, thickness: n = 1, opacity: r = 1 } = {},
    ) {
      ((this.renderer = e),
        (this.thickness = n),
        (this.colorTarget = new Bt(1, 1, { type: _, samples: 4 })),
        (this.normalTarget = new Bt(1, 1, {
          type: _,
          depthTexture: new wi(1, 1, g),
        })),
        (this.normalMaterial = new fo()),
        (this.material = new co({
          vertexShader: Es,
          fragmentShader: Ds,
          uniforms: {
            tColor: { value: this.colorTarget.texture },
            tNormal: { value: this.normalTarget.texture },
            tDepth: { value: this.normalTarget.depthTexture },
            texel: { value: new P() },
            thickness: { value: n },
            depthRange: { value: 1 },
            depthThreshold: { value: 0.35 },
            normalThreshold: { value: 0.22 },
            lineColor: { value: new R(t) },
            lineOpacity: { value: r },
            srgbOut: { value: !1 },
          },
          depthTest: !1,
          depthWrite: !1,
          transparent: !0,
          blending: 0,
        })),
        (this.quad = new ws(this.material)),
        (this.clearColor = new R()));
    }
    setSize(e, t, n) {
      let r = Math.max(1, Math.round(e * n)),
        i = Math.max(1, Math.round(t * n));
      (this.colorTarget.setSize(r, i),
        this.normalTarget.setSize(r, i),
        this.material.uniforms.texel.value.set(1 / r, 1 / i),
        (this.pixelRatio = n),
        this.setLineScale(this.lineScale ?? 1));
    }
    setLineScale(e) {
      ((this.lineScale = e),
        (this.material.uniforms.thickness.value =
          this.thickness * (this.pixelRatio ?? 1) * e));
    }
    render(e, t, n = null) {
      let r = this.renderer,
        i = r.getClearAlpha();
      r.getClearColor(this.clearColor);
      let a = t.layers.mask;
      ((this.material.uniforms.depthRange.value = t.far - t.near),
        r.setClearColor(0, 0),
        t.layers.set(Ts),
        (e.overrideMaterial = this.normalMaterial),
        r.setRenderTarget(this.normalTarget),
        r.clear(),
        r.render(e, t),
        (e.overrideMaterial = null),
        t.layers.enableAll(),
        r.setRenderTarget(this.colorTarget),
        r.clear(),
        r.render(e, t),
        (t.layers.mask = a),
        (this.material.uniforms.srgbOut.value = !!n),
        r.setRenderTarget(n),
        r.clear(),
        this.quad.render(r),
        n && r.setRenderTarget(null),
        r.setClearColor(this.clearColor, i));
    }
    dispose() {
      (this.colorTarget.dispose(),
        this.normalTarget.dispose(),
        this.normalMaterial.dispose(),
        this.material.dispose(),
        this.quad.dispose());
    }
  };
function ks(e, t = !1) {
  let n = e[0].index !== null,
    r = new Set(Object.keys(e[0].attributes)),
    i = new Set(Object.keys(e[0].morphAttributes)),
    a = {},
    o = {},
    s = e[0].morphTargetsRelative,
    c = new _r(),
    l = 0;
  for (let u = 0; u < e.length; ++u) {
    let d = e[u],
      f = 0;
    if (n !== (d.index !== null))
      return (
        console.error(
          `THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ` +
            u +
            `. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`,
        ),
        null
      );
    for (let e in d.attributes) {
      if (!r.has(e))
        return (
          console.error(
            `THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ` +
              u +
              `. All geometries must have compatible attributes; make sure "` +
              e +
              `" attribute exists among all geometries, or in none of them.`,
          ),
          null
        );
      (a[e] === void 0 && (a[e] = []), a[e].push(d.attributes[e]), f++);
    }
    if (f !== r.size)
      return (
        console.error(
          `THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ` +
            u +
            `. Make sure all geometries have the same number of attributes.`,
        ),
        null
      );
    if (s !== d.morphTargetsRelative)
      return (
        console.error(
          `THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ` +
            u +
            `. .morphTargetsRelative must be consistent throughout all geometries.`,
        ),
        null
      );
    for (let e in d.morphAttributes) {
      if (!i.has(e))
        return (
          console.error(
            `THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ` +
              u +
              `.  .morphAttributes must be consistent throughout all geometries.`,
          ),
          null
        );
      (o[e] === void 0 && (o[e] = []), o[e].push(d.morphAttributes[e]));
    }
    if (t) {
      let e;
      if (n) e = d.index.count;
      else if (d.attributes.position !== void 0)
        e = d.attributes.position.count;
      else
        return (
          console.error(
            `THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ` +
              u +
              `. The geometry must have either an index or a position attribute`,
          ),
          null
        );
      (c.addGroup(l, e, u), (l += e));
    }
  }
  if (n) {
    let t = 0,
      n = [];
    for (let r = 0; r < e.length; ++r) {
      let i = e[r].index;
      for (let e = 0; e < i.count; ++e) n.push(i.getX(e) + t);
      t += e[r].attributes.position.count;
    }
    c.setIndex(n);
  }
  for (let e in a) {
    let t = As(a[e]);
    if (!t)
      return (
        console.error(
          `THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the ` +
            e +
            ` attribute.`,
        ),
        null
      );
    c.setAttribute(e, t);
  }
  for (let e in o) {
    let t = o[e][0].length;
    if (t !== 0) {
      ((c.morphAttributes = c.morphAttributes || {}),
        (c.morphAttributes[e] = []));
      for (let n = 0; n < t; ++n) {
        let t = [];
        for (let r = 0; r < o[e].length; ++r) t.push(o[e][r][n]);
        let r = As(t);
        if (!r)
          return (
            console.error(
              `THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the ` +
                e +
                ` morphAttribute.`,
            ),
            null
          );
        c.morphAttributes[e].push(r);
      }
    }
  }
  return c;
}
function As(e) {
  let t,
    n,
    r,
    i = -1,
    a = 0;
  for (let o = 0; o < e.length; ++o) {
    let s = e[o];
    if ((t === void 0 && (t = s.array.constructor), t !== s.array.constructor))
      return (
        console.error(
          `THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`,
        ),
        null
      );
    if ((n === void 0 && (n = s.itemSize), n !== s.itemSize))
      return (
        console.error(
          `THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`,
        ),
        null
      );
    if ((r === void 0 && (r = s.normalized), r !== s.normalized))
      return (
        console.error(
          `THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`,
        ),
        null
      );
    if ((i === -1 && (i = s.gpuType), i !== s.gpuType))
      return (
        console.error(
          `THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`,
        ),
        null
      );
    a += s.count * n;
  }
  let o = new t(a),
    s = new rr(o, n, r),
    c = 0;
  for (let t = 0; t < e.length; ++t) {
    let r = e[t];
    if (r.isInterleavedBufferAttribute) {
      let e = c / n;
      for (let t = 0, i = r.count; t < i; t++)
        for (let i = 0; i < n; i++) {
          let n = r.getComponent(t, i);
          s.setComponent(t + e, i, n);
        }
    } else o.set(r.array, c);
    c += r.count * n;
  }
  return (i !== void 0 && (s.gpuType = i), s);
}
var js = 28.3,
  Ms = 51.5,
  Ns = 1.6,
  Ps = 2.54,
  W = { n: 15, left: 1.45, right: 26.85, top: 44.6 },
  Fs = [
    `EN`,
    `VP`,
    `VN`,
    `D34`,
    `D35`,
    `D32`,
    `D33`,
    `D25`,
    `D26`,
    `D27`,
    `D14`,
    `D12`,
    `D13`,
    `GND`,
    `VIN`,
  ],
  Is = [
    `D23`,
    `D22`,
    `TX0`,
    `RX0`,
    `D21`,
    `D19`,
    `D18`,
    `D5`,
    `TX2`,
    `RX2`,
    `D4`,
    `D2`,
    `D15`,
    `GND`,
    `3V3`,
  ],
  Ls = (e, t) =>
    e === `GND`
      ? t === `left`
        ? `GND2`
        : `GND`
      : e === `VP`
        ? `G36`
        : e === `VN`
          ? `G39`
          : e === `TX0`
            ? `TX`
            : e === `RX0`
              ? `RX`
              : e === `TX2`
                ? `G17`
                : e === `RX2`
                  ? `G16`
                  : /^D\d+$/.test(e)
                    ? `G${e.slice(1)}`
                    : e,
  Rs = {};
for (let [e, t] of [
  [`left`, Fs],
  [`right`, Is],
])
  t.forEach((t, n) => {
    Rs[Ls(t, e)] = { side: e, i: n, label: t, x: W[e], y: W.top - n * Ps };
  });
var zs = { x: 14.15, w: 18, y0: 26.4, y1: 52.1, shield: 18.2 },
  Bs = [
    { type: `usbc`, x: 14.15, y: 2.8 },
    { type: `button`, x: 5.2, y: 3.6, name: `EN` },
    { type: `button`, x: 23.1, y: 3.6, name: `BOOT` },
    { type: `sot223`, x: 9.8, y: 13.6, rot: 90 },
    { type: `qfn`, x: 18.8, y: 13, rot: 45 },
    { type: `sod`, x: 13.9, y: 8.4 },
    { type: `sot23`, x: 20, y: 8.2 },
    { type: `sot23`, x: 8.2, y: 8, rot: 90 },
    { type: `led`, x: 8.6, y: 20.8, color: `red`, name: `PWR` },
    { type: `led`, x: 19.7, y: 20.8, color: `blue`, name: `LED` },
    { type: `c0603`, x: 7.6, y: 17.6, rot: 90 },
    { type: `c0603`, x: 12, y: 17.6, rot: 90 },
    { type: `r0603`, x: 14, y: 13.4, rot: 90 },
    { type: `c0603`, x: 15.6, y: 13.4, rot: 90 },
    { type: `r0603`, x: 16.8, y: 9.2 },
    { type: `r0603`, x: 16.8, y: 7.5 },
    { type: `c0603`, x: 21.4, y: 16.2, rot: 90 },
    { type: `c0603`, x: 17.4, y: 17.4 },
    { type: `r0603`, x: 20.4, y: 18.2 },
    { type: `r0603`, x: 10.8, y: 20.8, rot: 90 },
    { type: `r0603`, x: 17.5, y: 20.8, rot: 90 },
    { type: `c0603`, x: 7.4, y: 23.4 },
    { type: `c0603`, x: 20.9, y: 23.4 },
    { type: `r0603`, x: 14.15, y: 21 },
  ],
  Vs = [
    { t: `EN`, x: 5.2, y: 6.5, s: 1.25, w: 700 },
    { t: `BOOT`, x: 23.1, y: 6.5, s: 1.25, w: 700 },
    { t: `PWR`, x: 8.6, y: 22.3, s: 0.95, w: 700 },
    { t: `IO2`, x: 19.7, y: 22.3, s: 0.95, w: 700 },
    { t: `U1`, x: 9.8, y: 17.6, s: 0.9 },
    { t: `U2`, x: 18.8, y: 16.3, s: 0.9 },
    { t: `D1`, x: 13.9, y: 10, s: 0.9 },
  ],
  Hs = {
    module: [
      `ESP32-WROOM-32`,
      `Two 240 MHz cores, Wi-Fi and Bluetooth under one metal shield.`,
    ],
    antenna: [
      `PCB antenna`,
      `The wiggly copper track that sends and hears Wi-Fi and Bluetooth.`,
    ],
    usbc: [
      `USB-C port`,
      `Uploads sketches, powers the board and carries the serial monitor.`,
    ],
    EN: [`EN (reset) button`, `Restarts your sketch from the top.`],
    BOOT: [
      `BOOT button`,
      `Hold it while uploading if the board will not start flashing. In a sketch it is GPIO 0: LOW while pressed.`,
    ],
    sot223: [
      `AMS1117 regulator`,
      `Turns the 5 V from USB into the 3.3 V the ESP32 runs on.`,
    ],
    qfn: [
      `CP2102 USB chip`,
      `Turns USB into serial so your computer can talk to the ESP32.`,
    ],
    sod: [`Protection diode`, `Stops current flowing back into your USB port.`],
    sot23: [
      `Transistor`,
      `Part of the auto-reset circuit that starts each upload.`,
    ],
    PWR: [`Power LED`, `Red whenever the board has power.`],
    LED: [
      `Blue LED (GPIO 2)`,
      `Wired to GPIO 2 — your sketch can switch it on.`,
    ],
    r0603: [`Resistor`, `A surface-mount resistor.`],
    c0603: [`Capacitor`, `A surface-mount decoupling capacitor.`],
    headerLeft: [
      `Left pins`,
      `EN, the analog-only pins 34–39, GPIOs 32–13, GND and VIN (5 V).`,
    ],
    headerRight: [`Right pins`, `GPIOs 23–15, the serial pins, GND and 3V3.`],
    board: [`ESP32 DevKit V1`, `Hover the parts to learn what they do.`],
  },
  Us = 2.5;
function Ws(e) {
  let t = Rs[e];
  if (!t) throw Error(`Unknown pin ${e}`);
  return [t.x - js / 2, Us, Ms / 2 - t.y];
}
var Gs = {
  usbc: { w: 9, d: 7.4, h: 3.2 },
  button: { w: 4.2, d: 3.2, h: 1.6 },
  sot223: { w: 6.6, d: 7, h: 1.7, silk: !0 },
  qfn: { w: 4, d: 4, h: 0.85, silk: !0 },
  sod: { w: 2.8, d: 1.6, h: 1.1, silk: !0 },
  sot23: { w: 2.9, d: 2.5, h: 1.1, silk: !0 },
  led: { w: 1.6, d: 0.8, h: 0.6 },
  r0603: { w: 1.6, d: 0.8, h: 0.45 },
  c0603: { w: 1.6, d: 0.8, h: 0.8 },
};
function Ks(e) {
  let t = [],
    n = (n, r, i, a) => {
      let o = ((e.rot ?? 0) * Math.PI) / 180;
      t.push({
        x: e.x + n * Math.cos(o) - r * Math.sin(o),
        y: e.y + n * Math.sin(o) + r * Math.cos(o),
        w: i,
        d: a,
        rot: e.rot ?? 0,
      });
    };
  switch (e.type) {
    case `r0603`:
    case `c0603`:
    case `led`:
      (n(-0.8, 0, 0.75, 0.95), n(0.8, 0, 0.75, 0.95));
      break;
    case `sod`:
      (n(-1.6, 0, 0.9, 1.2), n(1.6, 0, 0.9, 1.2));
      break;
    case `sot23`:
      (n(-0.95, -1.15, 0.6, 0.8),
        n(0.95, -1.15, 0.6, 0.8),
        n(0, 1.15, 0.6, 0.8));
      break;
    case `sot223`:
      (n(-2.3, -3.1, 1, 1.6),
        n(0, -3.1, 1, 1.6),
        n(2.3, -3.1, 1, 1.6),
        n(0, 3.1, 3.4, 1.6));
      break;
    case `qfn`:
      for (let e = 0; e < 7; e++) {
        let t = -1.5 + e * 0.5;
        (n(t, -2.2, 0.25, 0.5),
          n(t, 2.2, 0.25, 0.5),
          n(-2.2, t, 0.5, 0.25),
          n(2.2, t, 0.5, 0.25));
      }
      break;
    case `button`:
      for (let e of [-1, 1])
        for (let t of [-1, 1]) n(e * 2.6, t * 1.1, 1.1, 0.8);
      break;
    case `usbc`:
      (n(-4.9, 1.6, 1.2, 2.2),
        n(4.9, 1.6, 1.2, 2.2),
        n(-4.9, -2.4, 1.2, 1.8),
        n(4.9, -2.4, 1.2, 1.8));
  }
  return t;
}
function qs() {
  let e = [],
    t = [];
  for (let n of Bs) {
    let r = Gs[n.type];
    r &&
      (e.push({
        x: n.x,
        y: n.y,
        w: r.w,
        d: r.d,
        h: r.h,
        rot: n.rot ?? 0,
        silk: r.silk,
      }),
      t.push(...Ks(n)));
  }
  for (let t of [`left`, `right`]) {
    let n = W.top - ((W.n - 1) * Ps) / 2;
    e.push({ x: W[t], y: n, w: Ps, d: W.n * Ps, h: Us });
  }
  return (
    e.push({
      x: zs.x,
      y: (zs.y0 + zs.y1) / 2,
      w: zs.w,
      d: zs.y1 - zs.y0,
      h: 3.2,
    }),
    { footprints: e, pads: t }
  );
}
var G = 40,
  Js = {
    base: `#24262e`,
    trace: `rgba(74, 79, 96, 0.55)`,
    traceEdge: `rgba(10, 11, 16, 0.4)`,
    via: `#5b5f6c`,
    viaHole: `#121318`,
    silk: `#eeefee`,
    pad: `#d4b26e`,
    padShade: `#a3854c`,
  };
function Ys(e) {
  let t = e >>> 0;
  return () => {
    t += 1831565813;
    let e = Math.imul(t ^ (t >>> 15), 1 | t);
    return (
      (e ^= e + Math.imul(e ^ (e >>> 7), 61 | e)),
      ((e ^ (e >>> 14)) >>> 0) / 4294967296
    );
  };
}
var Xs = (e) => e * G,
  Zs = (e) => (Ms - e) * G;
function Qs(e, t, n, r, i, a, o) {
  (e.save(),
    e.translate(Xs(t), Zs(n)),
    e.rotate((-a * Math.PI) / 180),
    o(-(r * G) / 2, -(i * G) / 2, r * G, i * G),
    e.restore());
}
function $s(
  e,
  t,
  n,
  r,
  i,
  {
    rot: a = 0,
    align: o = `center`,
    weight: s = 600,
    base: c = `middle`,
    spacing: l = 0,
  } = {},
) {
  (e.save(),
    e.translate(Xs(n), Zs(r)),
    e.rotate((-a * Math.PI) / 180),
    (e.font = `${s} ${i * G}px "Barlow Semi Condensed", "Barlow", sans-serif`),
    (e.textAlign = o),
    (e.textBaseline = c),
    l && (e.letterSpacing = `${l * G}px`),
    e.fillText(t, 0, 0),
    e.restore());
}
function ec(e, t) {
  (e.beginPath(),
    t.forEach(([t, n], r) =>
      r ? e.lineTo(Xs(t), Zs(n)) : e.moveTo(Xs(t), Zs(n)),
    ),
    e.stroke());
}
function tc(e, t, n) {
  let [r, i] = e,
    [a, o] = t,
    s = a - r,
    c = o - i,
    l = Math.min(Math.abs(s), Math.abs(c)),
    u = Math.sign(s),
    d = Math.sign(c);
  if (Math.abs(s) > Math.abs(c)) {
    let a = Math.abs(s) - l;
    return n ? [e, [r + u * a, i], t] : [e, [r + u * l, i + d * l], t];
  }
  let f = Math.abs(c) - l;
  return n ? [e, [r, i + d * f], t] : [e, [r + u * l, i + d * l], t];
}
function nc(e, t) {
  let n = document.createElement(`canvas`);
  ((n.width = Math.round(js * G)), (n.height = Math.round(Ms * G)));
  let r = n.getContext(`2d`),
    i = Ys(11);
  ((r.fillStyle = Js.base), r.fillRect(0, 0, n.width, n.height));
  let a = r.createRadialGradient(Xs(14), Zs(22), 160, Xs(14), Zs(24), 1360);
  (a.addColorStop(0, `rgba(255,255,255,0.04)`),
    a.addColorStop(1, `rgba(0,0,0,0.12)`),
    (r.fillStyle = a),
    r.fillRect(0, 0, n.width, n.height),
    (r.lineCap = `round`),
    (r.lineJoin = `round`));
  let o = [];
  for (let e = 0; e < W.n; e++) {
    let t = W.top - e * Ps,
      n = Math.min(Math.max(t, 27.5), 40) - (e % 3) * 0.4;
    (o.push(tc([W.left + 1.2, t], [5.8 + (e % 4) * 0.3, n], e % 2 == 0)),
      o.push(tc([W.right - 1.2, t], [22.5 - (e % 4) * 0.3, n], e % 2 == 1)));
  }
  for (let e = 0; e < 46; e++) {
    let e = [3.5 + i() * 21, 1.5 + i() * 23],
      t = 2 + i() * 7,
      n = Math.floor(i() * 8) * (Math.PI / 4),
      r = [e[0] + Math.cos(n) * t, e[1] + Math.sin(n) * t],
      a = [r[0] + (i() - 0.5) * 6, r[1] + (i() - 0.5) * 6];
    o.push(tc(e, r, i() > 0.5).concat(tc(r, a, i() > 0.5).slice(1)));
  }
  for (let e of o) {
    let t = e.map(([e, t]) => [
      Math.min(Math.max(e, 0.8), js - 0.8),
      Math.min(Math.max(t, 0.8), Ms - 0.8),
    ]);
    ((r.strokeStyle = Js.traceEdge),
      (r.lineWidth = 0.5 * G),
      ec(r, t),
      (r.strokeStyle = Js.trace),
      (r.lineWidth = 0.28 * G),
      ec(r, t));
  }
  for (let e = 0; e < 60; e++) {
    let e = 4 + i() * 20,
      t = 2 + i() * 24;
    ((r.fillStyle = Js.via),
      r.beginPath(),
      r.arc(Xs(e), Zs(t), 0.36 * G, 0, Math.PI * 2),
      r.fill(),
      (r.fillStyle = Js.viaHole),
      r.beginPath(),
      r.arc(Xs(e), Zs(t), 0.15 * G, 0, Math.PI * 2),
      r.fill());
  }
  for (let t of e.footprints) {
    let e = t.h ?? 1,
      n = Math.min(0.3 + Math.sqrt(e) * 0.38, 1.6),
      i = Math.min(0.1 + e * 0.07, 0.8);
    (r.save(),
      (r.filter = `blur(${n * G}px)`),
      (r.fillStyle = `rgba(0, 0, 0, ${Math.min(0.32 + e * 0.04, 0.6)})`));
    let a = Math.min(e * 0.09, 0.9);
    (Qs(r, t.x - a * 0.6, t.y - a, t.w + i, t.d + i, t.rot ?? 0, (e, t, n, i) =>
      r.fillRect(e, t, n, i),
    ),
      r.restore());
  }
  for (let t of e.pads)
    Qs(r, t.x, t.y, t.w, t.d, t.rot ?? 0, (e, t, n, i) => {
      ((r.fillStyle = Js.padShade),
        r.fillRect(e - 0.05 * G, t - 0.05 * G, n + 0.1 * G, i + 0.1 * G),
        (r.fillStyle = Js.pad),
        r.fillRect(e, t, n, i));
    });
  for (let e of [`left`, `right`])
    for (let t = 0; t < W.n; t++) {
      let n = W[e],
        i = W.top - t * Ps;
      ((r.fillStyle = Js.pad),
        r.beginPath(),
        r.arc(Xs(n), Zs(i), 0.95 * G, 0, Math.PI * 2),
        r.fill());
    }
  ((r.fillStyle = Js.silk), (r.strokeStyle = Js.silk));
  for (let t of e.footprints)
    t.silk &&
      Qs(r, t.x, t.y, t.w + 0.8, t.d + 0.8, t.rot ?? 0, (e, t, n, i) => {
        ((r.lineWidth = 0.14 * G), r.strokeRect(e, t, n, i));
      });
  (Fs.forEach((e, t) =>
    $s(r, e, W.left + 1.75, W.top - t * Ps, 1.02, {
      align: `left`,
      weight: 700,
    }),
  ),
    Is.forEach((e, t) =>
      $s(r, e, W.right - 1.75, W.top - t * Ps, 1.02, {
        align: `right`,
        weight: 700,
      }),
    ),
    (r.lineWidth = 0.15 * G));
  for (let [e, t] of [
    [W.left + 2.8, W.top - 14 * Ps],
    [W.right - 2.8, W.top - 14 * Ps],
  ])
    (r.beginPath(),
      r.roundRect(Xs(e - 1.65), Zs(t + 0.85), 3.3 * G, 1.7 * G, 0.3 * G),
      r.stroke());
  for (let e of Vs)
    $s(r, e.t, e.x, e.y, e.s ?? 1, { rot: e.rot ?? 0, weight: e.w ?? 600 });
  $s(r, `ESP32 DEVKIT V1`, 14.15, 25, 1.25, { weight: 700, spacing: 0.1 });
  let s = new Ci(n);
  return (
    (s.colorSpace = Ke),
    (s.anisotropy = t?.capabilities.getMaxAnisotropy() ?? 8),
    s.repeat.set(1 / js, 1 / Ms),
    (s.generateMipmaps = !0),
    (s.minFilter = l),
    s
  );
}
function rc(e, t, n) {
  let r = document.createElement(`canvas`);
  ((r.width = e), (r.height = t), n(r.getContext(`2d`), e, t));
  let i = new Ci(r);
  return ((i.colorSpace = Ke), i);
}
var ic = (e, t = 0.6, n = 0, r = {}) =>
  new uo({ color: e, roughness: t, metalness: n, ...r });
function ac() {
  return {
    edge: ic(`#2b2d35`, 0.7),
    header: ic(`#1f2129`, 0.55),
    pin: ic(`#dcbf74`, 0.3, 0.6),
    plastic: ic(`#2a2c35`, 0.5),
    chip: ic(`#2a2d38`, 0.45),
    shield: ic(`#e4e3de`, 0.32, 0.55),
    shieldEdge: ic(`#cfcec8`, 0.4, 0.5),
    modulePcb: ic(`#2c3140`, 0.6),
    metal: ic(`#e9e6df`, 0.36, 0.5),
    tongue: ic(`#2b2e38`, 0.5),
    hole: ic(`#0d0f15`, 0.9),
    tan: ic(`#d6b98c`, 0.5, 0.2),
    resBody: ic(`#25272f`, 0.5),
    ledBase: ic(`#f3eee4`, 0.6),
    buttonBody: ic(`#e8e5de`, 0.5, 0.2),
    buttonCap: ic(`#25272f`, 0.5),
  };
}
function oc(e, t, n = {}) {
  let r = new Ha(e, { depth: t, bevelEnabled: !1, curveSegments: 24, ...n });
  return (r.rotateX(-Math.PI / 2), r);
}
function K(e, t, n, r, i = 0, a = 0, o = 0) {
  let s = new B(new V(e, t, n), r);
  return (s.position.set(i, a + t / 2, o), s);
}
function sc(e, t, n, r = 0, i = 0) {
  let a = new aa(),
    o = r - e / 2,
    s = i - t / 2;
  return (
    a.moveTo(o + n, s),
    a.lineTo(o + e - n, s),
    a.quadraticCurveTo(o + e, s, o + e, s + n),
    a.lineTo(o + e, s + t - n),
    a.quadraticCurveTo(o + e, s + t, o + e - n, s + t),
    a.lineTo(o + n, s + t),
    a.quadraticCurveTo(o, s + t, o, s + t - n),
    a.lineTo(o, s + n),
    a.quadraticCurveTo(o, s, o + n, s),
    a
  );
}
var cc;
function lc(e, t) {
  ((cc ??= rc(128, 128, (e) => {
    let t = e.createRadialGradient(64, 64, 2, 64, 64, 63);
    (t.addColorStop(0, `rgba(255,255,255,1)`),
      t.addColorStop(0.3, `rgba(255,255,255,0.5)`),
      t.addColorStop(1, `rgba(255,255,255,0)`),
      (e.fillStyle = t),
      e.fillRect(0, 0, 128, 128));
  })),
    (cc.userData.shared = !0));
  let n = new Vr(
    new Dr({ map: cc, color: e, transparent: !0, opacity: 0, depthWrite: !1 }),
  );
  return (n.scale.set(t, t, 1), n.layers.set(1), n);
}
function uc(e, t) {
  let n = new L(),
    r = e * Ps;
  n.add(K(Ps - 0.06, Us, r - 0.06, t.header));
  for (let i = 1; i < e; i++)
    n.add(K(Ps + 0.02, 0.5, 0.14, t.hole, 0, Us - 0.45, -r / 2 + i * Ps));
  let i = [];
  for (let t = 0; t < e; t++) {
    let e = -r / 2 + Ps / 2 + t * Ps,
      n = new V(0.64, 5.6, 0.64);
    (n.translate(0, Us + 2.8, e), i.push(n.toNonIndexed()));
    let a = new Oi(0.45, 0.5, 4, 1);
    (a.rotateY(Math.PI / 4),
      a.translate(0, Us + 5.85, e),
      i.push(a.toNonIndexed()));
  }
  return (n.add(new B(ks(i), t.pin)), n);
}
function dc() {
  return rc(512, 560, (e, t, n) => {
    ((e.fillStyle = `#e1e0db`), e.fillRect(0, 0, t, n));
    for (let r = 0; r < 70; r++)
      ((e.fillStyle = `rgba(255,255,255,${0.04 + (r % 5) * 0.012})`),
        e.fillRect(0, (r * n) / 70, t, 2));
    ((e.strokeStyle = `#6f727a`),
      (e.fillStyle = `#6f727a`),
      (e.lineCap = `round`),
      (e.lineWidth = 15));
    for (let t of [38, 70, 102])
      (e.beginPath(),
        e.arc(150, 200, t, -Math.PI * 0.78, -Math.PI * 0.22),
        e.stroke());
    (e.beginPath(),
      e.arc(150, 200, 15, 0, Math.PI * 2),
      e.fill(),
      (e.font = `700 100px "Barlow Semi Condensed", sans-serif`),
      (e.textBaseline = `middle`),
      e.fillText(`ESP32`, 236, 152),
      (e.font = `600 46px "Barlow Semi Condensed", sans-serif`),
      e.fillText(`WROOM-32`, 240, 228),
      (e.font = `500 30px "Barlow Semi Condensed", sans-serif`),
      e.fillText(`Wi-Fi · BT · BLE`, 60, 330),
      e.fillText(`FCC ID: 2AC7Z-ESPWROOM32`, 60, 380),
      e.fillText(`R 211-161007`, 60, 425),
      e.strokeRect(60, 460, 64, 50),
      (e.font = `700 30px "Barlow Semi Condensed", sans-serif`),
      e.fillText(`CE`, 70, 487));
  });
}
function fc() {
  let e = zs.y1 - zs.y0;
  return rc(Math.round(zs.w * 24), Math.round(e * 24), (e, t, n) => {
    ((e.fillStyle = `#2c3140`),
      e.fillRect(0, 0, t, n),
      (e.fillStyle = `#d4b26e`));
    for (let r = 0; r < 14; r++) {
      let i = n - (1.2 + r * 1.27) * 24;
      (e.fillRect(0, i - 0.35 * 24, 21.6, 0.7 * 24),
        e.fillRect(t - 21.6, i - 0.35 * 24, 21.6, 0.7 * 24));
    }
    for (let t = 0; t < 10; t++)
      e.fillRect((3.3 + t * 1.27) * 24 - 0.35 * 24, n - 21.6, 0.7 * 24, 21.6);
    ((e.strokeStyle = `#d4b26e`),
      (e.lineWidth = 0.55 * 24),
      (e.lineJoin = `round`),
      e.beginPath());
    let r = 21.6,
      i = 5.4 * 24;
    (e.moveTo(43.2, 158.40000000000003), e.lineTo(43.2, r));
    let a = 43.2,
      o = !0;
    for (; a < t - 81.6;)
      (e.lineTo(a + 1.6 * 24, o ? r : i),
        (a += 1.6 * 24),
        e.lineTo(a, o ? i : r),
        (o = !o));
    (e.stroke(), e.fillRect(1.2 * 24, 151.20000000000002, 2.2 * 24, 0.8 * 24));
  });
}
function pc(e, t) {
  let n = new L(),
    r = zs.y1 - zs.y0,
    i = ic(`#ffffff`, 0.6, 0, { map: t.modulePcb }),
    a = new B(new V(zs.w, 0.8, r), [
      e.modulePcb,
      e.modulePcb,
      i,
      e.modulePcb,
      e.modulePcb,
      e.modulePcb,
    ]);
  ((a.position.y = 0.4), n.add(a));
  let o = zs.shield,
    s = r / 2 - 0.9 - o / 2,
    c = ic(`#ffffff`, 0.3, 0.5, { map: t.shield }),
    l = new B(new V(15.8, 2.4, o), [
      e.shieldEdge,
      e.shieldEdge,
      c,
      e.shieldEdge,
      e.shieldEdge,
      e.shieldEdge,
    ]);
  return (
    l.position.set(0, 2, s),
    n.add(l),
    (n.userData.lidY = 3.2),
    (n.userData.shieldZ = s),
    n
  );
}
function mc(e) {
  let t = new L(),
    n = 3.26,
    r = (e, t) => {
      let n = t / 2,
        r = new aa();
      return (
        r.moveTo(-e / 2 + n, -n),
        r.lineTo(e / 2 - n, -n),
        r.absarc(e / 2 - n, 0, n, -Math.PI / 2, Math.PI / 2, !1),
        r.lineTo(-e / 2 + n, n),
        r.absarc(-e / 2 + n, 0, n, Math.PI / 2, (Math.PI * 3) / 2, !1),
        r
      );
    },
    i = new Ha(r(8.94, n), { depth: 7.4, bevelEnabled: !1, curveSegments: 20 });
  (i.translate(0, n / 2, -7.4 / 2), t.add(new B(i, e.metal)));
  let a = new B(new Ja(r(8.24, 2.5599999999999996), 20), e.hole);
  (a.position.set(0, n / 2, 3.71),
    t.add(a),
    t.add(K(6.4, 0.66, 0.3, e.tongue, 0, n / 2 - 0.33, 3.72)));
  for (let n of [-1, 1]) t.add(K(0.5, 1.6, 1.8, e.metal, n * 4.67, 0, -1.2));
  return t;
}
function hc(e) {
  let t = new L();
  (t.add(K(4.2, 1.1, 3.2, e.buttonBody)),
    t.add(K(3.9, 0.12, 2.9, e.metal, 0, 1.1, 0)));
  let n = t.add(K(1.8, 0.55, 1.2, e.buttonCap, 0, 1.2, 0)).children.at(-1);
  ((t.userData.cap = n), (t.userData.capY = n.position.y));
  for (let n of [-1, 1])
    for (let r of [-1, 1])
      t.add(K(0.8, 0.3, 0.6, e.metal, n * 2.5, 0, r * 1.1));
  return t;
}
function gc(e) {
  let t = new L();
  (t.add(K(6.5, 1.6, 3.5, e.chip, 0, 0.1, 0)),
    t.add(K(3, 0.25, 1.7, e.pin, 0, 0, -2.6)));
  for (let n of [-2.3, 0, 2.3])
    (t.add(K(0.7, 0.25, 1.8, e.pin, n, 0, 2.5)),
      t.add(K(0.7, 0.6, 0.25, e.pin, n, 0.2, 1.75)));
  return t;
}
function _c(e) {
  let t = new L();
  t.add(K(2.9, 1, 1.4, e.chip, 0, 0.12, 0));
  for (let [n, r] of [
    [-0.95, 1],
    [0.95, 1],
    [0, -1],
  ])
    t.add(K(0.42, 0.18, 0.7, e.pin, n, 0, r * 1));
  return t;
}
function vc(e) {
  let t = new L();
  t.add(K(4, 0.85, 4, e.chip));
  let n = new B(new Di(0.3, 16), e.hole);
  return (
    (n.rotation.x = -Math.PI / 2),
    n.position.set(-1.3, 0.86, 1.3),
    t.add(n),
    t
  );
}
function yc(e) {
  let t = new L();
  return (
    t.add(K(2.6, 1, 1.5, e.chip)),
    t.add(K(0.4, 0.02, 1.52, ic(`#cfd2d6`, 0.5), -0.9, 1, 0)),
    t
  );
}
function bc(e, t) {
  let n = new L();
  return (
    t === `r0603`
      ? (n.add(K(1, 0.45, 0.8, e.resBody)),
        n.add(K(0.32, 0.47, 0.82, e.pin, -0.66, 0, 0)),
        n.add(K(0.32, 0.47, 0.82, e.pin, 0.66, 0, 0)))
      : (n.add(K(1, 0.8, 0.8, e.tan)),
        n.add(K(0.32, 0.82, 0.82, e.pin, -0.66, 0, 0)),
        n.add(K(0.32, 0.82, 0.82, e.pin, 0.66, 0, 0))),
    n
  );
}
var xc = {
  red: { color: `#ec5a4b`, glow: `#ff5a46` },
  blue: { color: `#6fa8f0`, glow: `#4f9dff` },
};
function Sc(e, t) {
  let n = new L(),
    r = xc[t] ?? xc.red;
  n.add(K(1.6, 0.3, 0.8, e.ledBase));
  let i = ic(r.color, 0.3, 0, { emissive: r.color, emissiveIntensity: 0.12 });
  n.add(K(1.2, 0.32, 0.72, i, 0, 0.3, 0));
  let a = lc(r.glow, 9);
  return (
    (a.position.y = 1.4),
    n.add(a),
    (i.userData.on = new R(r.glow)),
    (i.userData.glow = a),
    (n.userData.lens = i),
    n
  );
}
function Cc(e, t) {
  switch (e.type) {
    case `usbc`:
      return mc(t);
    case `button`:
      return hc(t);
    case `sot223`:
      return gc(t);
    case `sot23`:
      return _c(t);
    case `qfn`:
      return vc(t);
    case `sod`:
      return yc(t);
    case `led`:
      return Sc(t, e.color);
    case `r0603`:
    case `c0603`:
      return bc(t, e.type);
    default:
      return null;
  }
}
function wc(e, t) {
  let n = oc(sc(js, Ms, 1.4, js / 2, Ms / 2), Ns, { curveSegments: 12 });
  return (
    n.translate(0, -Ns, 0),
    new B(n, [ic(`#ffffff`, 0.72, 0, { map: t }), e.edge])
  );
}
var Tc = null;
function Ec(e) {
  if (!Tc) {
    Tc = { pcb: nc(qs(), e), shield: dc(), modulePcb: fc() };
    for (let e of Object.values(Tc)) e.userData.shared = !0;
  }
  return Tc;
}
function Dc(e) {
  let t = ac(),
    n = Ec(e),
    r = n.pcb,
    i = new L(),
    a = new L();
  (a.position.set(-js / 2, 0, Ms / 2), i.add(a));
  let o = (e, t, n, r = 0, i = 0) => (
      e.position.set(t, r, -n),
      (e.rotation.y = (i * Math.PI) / 180),
      a.add(e),
      e
    ),
    s = (e) => {
      let [t, n] = Hs[e] ?? [];
      return t ? { name: t, desc: n, key: e } : null;
    },
    c = wc(t, r);
  ((c.userData.part = { ...s(`board`), lift: !1 }), a.add(c));
  for (let e of [`left`, `right`]) {
    let n = W.top - ((W.n - 1) * Ps) / 2,
      r = o(uc(W.n, t), W[e], n);
    r.userData.part = s(e === `left` ? `headerLeft` : `headerRight`);
  }
  let l = o(pc(t, n), zs.x, (zs.y0 + zs.y1) / 2);
  l.userData.part = s(`module`);
  let u = {};
  for (let e of Bs) {
    let n = Cc(e, t);
    n &&
      (o(n, e.x, e.y, 0, e.rot ?? 0),
      (n.userData.part = s(e.name ?? e.type)),
      e.name && n.userData.lens && (u[e.name] = n.userData.lens));
  }
  let d = u.PWR;
  (d &&
    ((d.emissiveIntensity = 1.2),
    (d.userData.glow.material.opacity = 0.3),
    delete u.PWR),
    i.traverse((e) => {
      e.isMesh && ((e.castShadow = !0), (e.receiveShadow = !1));
    }));
  let f = (e, t, n) => {
      let r = new I();
      return (o(r, e, t, n), r);
    },
    p = (zs.y0 + zs.y1) / 2 - l.userData.shieldZ,
    m = Us + 6;
  return {
    root: i,
    anchors: {
      module: f(zs.x, p, l.userData.lidY),
      antenna: f(zs.x, zs.y1 - 3.4, 0.85),
      usb: f(14.15, -0.4, 3),
      pinsRight: f(W.right, W.top - 5 * Ps, m),
      pinsLeft: f(W.left, W.top - 5 * Ps, m),
      power: f(W.right, W.top - 14 * Ps, m),
      vin: f(W.left, W.top - 14 * Ps, m),
      en: f(5.2, 3.6, 1.8),
      boot: f(23.1, 3.6, 1.8),
      bootEdge: f(23.1, 1.5, 1.1),
      led: f(19.7, 20.8, 0.62),
      pwr: f(8.6, 20.8, 0.62),
      regulator: f(9.8, 13.6, 1.7),
      usbChip: f(18.8, 13, 0.85),
    },
    leds: u,
  };
}
function Oc(e, t) {
  let { root: n, anchors: r, leds: i } = Dc();
  return (
    (n.userData.part = { name: e, desc: t }),
    (n.userData.anchor = r.module),
    (n.userData.anchors = r),
    (n.userData.leds = i),
    n
  );
}
var q = 2.54,
  kc = Math.PI / 180,
  J = (e, t = 0.5, n = 0, r = {}) =>
    new uo({ color: e, roughness: t, metalness: n, ...r });
function Ac(e) {
  e.traverse((e) => {
    if (e.isMesh || e.isSprite || e.isLine) {
      e.geometry?.dispose();
      for (let t of [].concat(e.material))
        t &&
          !t.userData.shared &&
          (t.map && !t.map.userData.shared && t.map.dispose(), t.dispose());
    }
  });
}
function Y(e, t, n, r, i = 0, a = 0, o = 0) {
  let s = new B(new V(e, t, n), r);
  return (s.position.set(i, a + t / 2, o), s);
}
function X(e, t, n, r) {
  let i = new I();
  return (i.position.set(t, n, r), e.add(i), (e.userData.anchor = i), i);
}
function jc(e, ...t) {
  e.userData.ends = t.map(([t, n, r]) => {
    let i = new I();
    return (i.position.set(t, n, r), e.add(i), i);
  });
}
function Z(e, t, n) {
  let r = document.createElement(`canvas`);
  ((r.width = e), (r.height = t), n(r.getContext(`2d`), e, t));
  let i = new Ci(r);
  return ((i.colorSpace = Ke), (i.anisotropy = 8), i);
}
var Mc;
function Nc(e, t) {
  ((Mc ??= Z(128, 128, (e) => {
    let t = e.createRadialGradient(64, 64, 2, 64, 64, 63);
    (t.addColorStop(0, `rgba(255,255,255,1)`),
      t.addColorStop(0.25, `rgba(255,255,255,0.55)`),
      t.addColorStop(1, `rgba(255,255,255,0)`),
      (e.fillStyle = t),
      e.fillRect(0, 0, 128, 128));
  })),
    (Mc.userData.shared = !0));
  let n = new Vr(
    new Dr({ map: Mc, color: e, transparent: !0, opacity: 0, depthWrite: !1 }),
  );
  return (n.scale.set(t, t, 1), n.layers.set(1), n);
}
var Pc = {
    cols: 23,
    height: 8.5,
    width: 62,
    depth: 50,
    rows: {
      a: 13.97,
      b: 11.43,
      c: 8.89,
      d: 6.35,
      e: 3.81,
      f: -3.81,
      g: -6.35,
      h: -8.89,
      i: -11.43,
      j: -13.97,
      "-": 19.98,
      "+": 22.52,
      "-b": -19.98,
      "+b": -22.52,
    },
  },
  Fc = [6, 12, 18],
  Ic = 7.2,
  Lc = 21.25;
function Rc(e, t) {
  return new F((e - 12) * q, Pc.height, Pc.rows[t]);
}
function zc(e, t, n, r) {
  ((e.fillStyle = `#e1d7c4`),
    e.fillRect(t - 0.78 * r, n - 0.78 * r, 1.56 * r, 1.56 * r),
    (e.fillStyle = `#3b3d47`),
    e.fillRect(t - 0.52 * r, n - 0.52 * r, 1.04 * r, 1.04 * r));
}
function Bc(e) {
  let { width: t } = Pc;
  return Z(Math.round(t * 22), 350, (n, r, i) => {
    ((n.fillStyle = `#f5efe3`), n.fillRect(0, 0, r, i));
    let a = e ? 1.6 : -17.5,
      o = e ? [`e`, `d`, `c`, `b`, `a`] : [`j`, `i`, `h`, `g`, `f`];
    for (let e of o) {
      let i = (Pc.rows[e] - a) * 22;
      for (let e = 1; e <= Pc.cols; e++)
        zc(n, (t / 2 + (e - 12) * q) * 22, i, 22);
      ((n.fillStyle = `#a69c8b`),
        (n.font = `600 33px "Barlow Semi Condensed", sans-serif`),
        (n.textAlign = `center`),
        (n.textBaseline = `middle`),
        n.fillText(e, 33, i),
        n.fillText(e, r - 33, i));
    }
    n.font = `600 28.6px "Barlow Semi Condensed", sans-serif`;
    let s = e ? i - 20.9 : 20.9;
    for (let e of [1, 5, 10, 15, 20])
      n.fillText(String(e), (t / 2 + (e - 12) * q) * 22, s);
  });
}
function Vc(e) {
  let { width: t } = Pc;
  return Z(Math.round(t * 22), Math.round(Ic * 22), (n, r, i) => {
    ((n.fillStyle = `#f5efe3`), n.fillRect(0, 0, r, i));
    let a = (e ? Lc : -21.25) - Ic / 2,
      o = (e) => (Pc.rows[e] - a) * 22,
      [s, c] = e ? [`+`, `-`] : [`+b`, `-b`],
      l = (e, t) => o(e) + Math.sign(o(e) - o(t)) * 1.85 * 22;
    ((n.fillStyle = `#d6574a`),
      n.fillRect(70.4, l(s, c) - 4.84, r - 140.8, 9.68),
      (n.fillStyle = `#3d6fc4`),
      n.fillRect(70.4, l(c, s) - 4.84, r - 140.8, 9.68));
    for (let e of [s, c])
      for (let r = 1; r <= Pc.cols; r++)
        Fc.includes(r) || zc(n, (t / 2 + (r - 12) * q) * 22, o(e), 22);
    ((n.font = `700 37.4px "Barlow Semi Condensed", sans-serif`),
      (n.textAlign = `center`),
      (n.textBaseline = `middle`),
      (n.fillStyle = `#d6574a`),
      n.fillText(`+`, 33, o(s)),
      n.fillText(`+`, r - 33, o(s)),
      (n.fillStyle = `#3d6fc4`),
      n.fillText(`−`, 33, o(c)),
      n.fillText(`−`, r - 33, o(c)));
  });
}
function Hc() {
  let e = new L(),
    { width: t, height: n, depth: r } = Pc,
    i = J(`#ebe3d2`, 0.75);
  for (let r of [!0, !1]) {
    let a = J(`#ffffff`, 0.7, 0, { map: Bc(r) }),
      o = new B(new V(t, n, 15.9), [i, i, a, i, i, i]);
    (o.position.set(0, n / 2, (r ? 1 : -1) * 9.55), e.add(o));
    let s = J(`#ffffff`, 0.7, 0, { map: Vc(r) }),
      c = new B(new V(t, n, Ic), [i, i, s, i, i, i]);
    (c.position.set(0, n / 2, (r ? 1 : -1) * Lc), e.add(c));
  }
  return (
    e.add(Y(t, n - 2.4, 3.2, i)),
    e.add(Y(t - 2, 0.6, r - 2, J(`#d9cfbb`, 0.8), 0, -0.6, 0)),
    (e.userData.part = {
      name: `Breadboard`,
      desc: `Holes in each short row of five are joined underneath; each rail runs the whole length.`,
    }),
    X(e, -t / 2 + 6, n, 0),
    e
  );
}
function Uc(e = `#e8392e`, { height: t = 9 } = {}) {
  let n = new L(),
    r = J(e, 0.22, 0, { emissive: e, emissiveIntensity: 0.05 }),
    i = [
      [0, 0],
      [2.95, 0],
      [2.95, 1.1],
      [2.5, 1.1],
      [2.5, 5.6],
    ].map(([e, t]) => new P(e, t));
  for (let e = 1; e <= 12; e++) {
    let t = (e / 12) * (Math.PI / 2);
    i.push(new P(Math.cos(t) * 2.5, 5.6 + Math.sin(t) * 2.5));
  }
  let a = new B(new Ga(i, 48), r);
  ((a.position.y = t), n.add(a));
  let o = J(`#d2cfc8`, 0.35, 0.6);
  for (let e of [-1.27, 1.27]) n.add(Y(0.55, t, 0.55, o, e, 0, 0));
  let s = Nc(e, 26);
  return (
    (s.position.y = t + 4.5),
    n.add(s),
    (n.userData.light = { lens: r, glow: s }),
    (n.userData.part = {
      name: `5 mm LED`,
      desc: `Lights when current flows from the long leg (anode) to the short leg.`,
    }),
    X(n, 0, t + 8.2, 0),
    n
  );
}
var Wc = {
  black: `#2b2b2b`,
  brown: `#7a4a2a`,
  red: `#d0412f`,
  orange: `#e8892f`,
  yellow: `#efc540`,
  gold: `#c9a54a`,
};
function Gc(
  e = [`red`, `red`, `brown`, `gold`],
  t = 4 * q,
  { lift: n = 3.4, name: r = `220 Ω resistor` } = {},
) {
  let i = new L(),
    a = J(`#e6cfa4`, 0.55),
    o = [],
    s = 6.4,
    c = [
      [0, -6.4 / 2 - 0.4],
      [0.75, -6.4 / 2 - 0.35],
      [1.25, -6.4 / 2],
      [1.3, -2.1],
      [1.08, -6.4 / 2 + 1.7],
      [1.08, s / 2 - 1.7],
      [1.3, s / 2 - 1.1],
      [1.25, s / 2],
      [0.75, 3.5500000000000003],
      [0, 3.6],
    ];
  for (let [e, t] of c) o.push(new P(e, t));
  let l = new B(new Ga(o, 32), a);
  ((l.rotation.z = Math.PI / 2), (l.position.y = n), i.add(l));
  let u = [-2, -1, 0, 1.9];
  e.forEach((e, t) => {
    let r = Math.abs(u[t]) > 1.6 ? 1.33 : 1.12,
      a = new B(new H(r, r, 0.5, 32, 1, !0), J(Wc[e], 0.5));
    ((a.rotation.z = Math.PI / 2), a.position.set(u[t], n, 0), i.add(a));
  });
  let d = J(`#d4d0c8`, 0.3, 0.65);
  for (let e of [-1, 1]) {
    let r = new ra(),
      a = new F((e * s) / 2, n, 0),
      o = new F((e * t) / 2 - e * 0.6, n, 0),
      c = new F((e * t) / 2, n - 0.6, 0),
      l = new F((e * t) / 2, -0.5, 0);
    (r.add(new Qi(a, o)),
      r.add(new ea(o, new F((e * t) / 2, n, 0), c)),
      r.add(new Qi(c, l)),
      i.add(new B(new Qa(r, 24, 0.3, 6, !1), d)));
  }
  return (
    (i.userData.part = {
      name: r,
      desc: `Limits the current flowing through the circuit.`,
    }),
    X(i, 0, n + 1.3, 0),
    i
  );
}
var Kc = (e) => ((e.userData.shared = !0), e),
  qc = Kc(J(`#24272f`, 0.5)),
  Jc = Kc(J(`#d9d4ca`, 0.3, 0.7)),
  Yc = 8.5;
function Xc(
  e,
  t,
  n,
  {
    arch: r = 14,
    lean: i = 0.18,
    leanB: a = i,
    endA: o = !0,
    endB: s = !0,
    route: c = null,
    turnB: l = 0,
  } = {},
) {
  let u = new L(),
    d = Yc,
    f = e.clone(),
    p = t.clone();
  (o && (f.y += d), s && (p.y += d));
  let m;
  if (c) m = c(f, p);
  else {
    let e = Math.max(f.y, p.y) + r,
      t = new F(f.x, e, f.z).lerp(p, i);
    t.y = e;
    let n = new F(p.x, e, p.z).lerp(f, a);
    ((n.y = e), (m = new Xi(f, t, n, p)));
  }
  let h = new Qa(m, 96, 0.72, 8, !1),
    g = new B(h, J(n, 0.42));
  u.add(g);
  let _ = [];
  for (let [r, i] of [
    [o, e],
    [s, t],
  ]) {
    let e = new L();
    (e.position.copy(i),
      r &&
        (e.add(Y(2.45, d, 2.45, qc)),
        e.add(Y(2.6, 1.6, 2.6, J(n, 0.42), 0, 6.9, 0)),
        e.add(Y(0.6, 1.2, 0.6, Jc, 0, -1, 0))),
      u.add(e),
      _.push(e));
  }
  ((_[1].rotation.y = l),
    (u.userData.wire = {
      tube: g,
      count: h.index.count,
      ends: _,
      curve: m,
      radius: 0.72,
      p0: f,
      endB: s,
    }),
    (u.userData.part = {
      name: `Jumper wire`,
      desc: `Carries a signal or power between two points.`,
    }));
  let v = m.getPoint(0.5);
  return (X(u, v.x, v.y, v.z), u);
}
function Zc(e, t, n, r = 0) {
  let i = e.userData.wire;
  if (!i?.p0) return;
  let a = t.clone();
  (i.endB && (a.y += Yc), (i.curve = n(i.p0, a)));
  let o = new Qa(i.curve, 96, 0.72, 8, !1),
    s = i.tube.geometry;
  for (let e of [`position`, `normal`])
    (s.attributes[e].array.set(o.attributes[e].array),
      (s.attributes[e].needsUpdate = !0));
  (s.computeBoundingSphere(),
    s.computeBoundingBox(),
    o.dispose(),
    i.ends[1].position.copy(t),
    (i.ends[1].rotation.y = r),
    e.userData.anchor.position.copy(i.curve.getPoint(0.5)));
}
var Qc = class extends ki {
    constructor(e, t) {
      (super(), (this.spine = e), (this.offset = t), (this.tan = new F()));
    }
    getPoint(e, t = new F()) {
      let n = this.spine.getPoint(e, t),
        r = this.spine.getTangent(e, this.tan);
      return n.add(new F(-r.z, 0, r.x).normalize().multiplyScalar(this.offset));
    }
  },
  $c = class extends ki {
    constructor(e) {
      (super(), (this.curve = e));
    }
    getPoint(e, t = new F()) {
      return this.curve.getPoint(1 - e, t);
    }
  };
function el(e, t, n) {
  let r = new L(),
    i = 1.5,
    a = new F().subVectors(t, e).setY(0),
    o = a.length(),
    s = a.normalize(),
    c = (e) => e.clone().setY(e.y + i),
    l = e.clone().setY(e.y - 0.6),
    u = c(e),
    d = c(t),
    f = t.clone().setY(t.y - 0.6),
    p = new ra(),
    m = Math.min(1.2, o / 2);
  (p.add(new Qi(l, u.clone().setY(u.y - m))),
    p.add(new ea(u.clone().setY(u.y - m), u, u.clone().addScaledVector(s, m))),
    p.add(
      new Qi(u.clone().addScaledVector(s, m), d.clone().addScaledVector(s, -m)),
    ),
    p.add(new ea(d.clone().addScaledVector(s, -m), d, d.clone().setY(d.y - m))),
    p.add(new Qi(d.clone().setY(d.y - m), f)));
  let h = new Qa(p, 48, 0.55, 8, !1),
    g = new B(h, J(n, 0.45));
  r.add(g);
  let _ = [new L(), new L()];
  return (
    r.add(..._),
    (r.userData.wire = {
      tube: g,
      count: h.index.count,
      ends: _,
      curve: p,
      radius: 0.55,
    }),
    (r.userData.part = {
      name: `Wire link`,
      desc: `A short wire joining two rows of the breadboard.`,
    }),
    X(r, (e.x + t.x) / 2, e.y + i, (e.z + t.z) / 2),
    r
  );
}
var tl = [`Do`, `Re`, `Mi`, `Fa`, `Sol`, `La`, `Si`, `Do`],
  nl = [
    `#f7c6c0`,
    `#f9d6b2`,
    `#f7e7a8`,
    `#d3eab9`,
    `#bfe5dc`,
    `#c4d7f2`,
    `#dacdf1`,
    `#f3c7dc`,
  ],
  rl = 8.4;
function il() {
  let t = new L(),
    n = tl.length,
    r = n * rl + 5,
    i = 1.6,
    a = Z(Math.round(r * 12), 360, (t, i, a) => {
      ((t.fillStyle = `#253047`),
        t.fillRect(0, 0, i, a),
        (t.strokeStyle = `rgba(212, 178, 110, 0.55)`),
        (t.lineWidth = 0.4 * 12));
      for (let e = 0; e < n; e++) {
        let n = (r / 2 + (e - 3.5) * q) * 12,
          i = (r / 2 + (e - 3.5) * rl) * 12;
        (t.beginPath(),
          t.moveTo(n, 40.8),
          t.lineTo(n, 78),
          t.lineTo(i, 108),
          t.lineTo(i, 144),
          t.stroke());
      }
      ((t.fillStyle = `rgba(238, 239, 238, 0.9)`),
        (t.font = `700 ${1.6 * 12}px "Barlow Semi Condensed", sans-serif`),
        (t.textAlign = `left`),
        t.fillText(e(`TOUCH PIANO`), 30, 36));
    }),
    o = J(`#202a3e`, 0.6),
    s = new B(new V(r, i, 30), [
      o,
      o,
      J(`#ffffff`, 0.6, 0, { map: a }),
      o,
      o,
      o,
    ]);
  ((s.position.y = i / 2), t.add(s));
  let c = [];
  (tl.forEach((e, r) => {
    let a = (r - (n - 1) / 2) * rl,
      o = new L();
    o.position.set(a, i, 3.4);
    let s = J(`#${new R(nl[r]).multiplyScalar(0.92).getHexString()}`, 0.5),
      l = J(`#ffffff`, 0.5, 0, {
        map: Z(110, 250, (t, n, i) => {
          ((t.fillStyle = nl[r]),
            t.fillRect(0, 0, n, i),
            (t.fillStyle = `#2b3245`),
            (t.font = `700 34px "Barlow Semi Condensed", sans-serif`),
            (t.textAlign = `center`),
            (t.textBaseline = `middle`),
            t.fillText(e, n / 2, i - 30));
        }),
      }),
      u = new B(new V(7.5, 2.2, 19), [s, s, l, s, s, s]);
    ((u.position.y = 1.1), o.add(u));
    let d = J(`#d39a58`, 0.35, 0.65, {
        emissive: `#ff8a3a`,
        emissiveIntensity: 0,
      }),
      f = new B(new V(4.8, 0.2, 10), d);
    (f.position.set(0, 2.2, -2.2),
      o.add(f),
      (o.userData.keyIndex = r),
      (u.userData.keyIndex = r),
      (f.userData.keyIndex = r),
      t.add(o),
      c.push({ tile: o, pad: d, y0: o.position.y }));
  }),
    t.add(Y(n * q, 2.5, q, J(`#1f2129`, 0.55), 0, i, -11.8)));
  let l = [];
  for (let e = 0; e < n; e++) {
    let r = (e - (n - 1) / 2) * q;
    (t.add(Y(0.64, 6, 0.64, Jc, r, 4.1, -11.8)), l.push(new F(r, 4.1, -11.8)));
  }
  return (
    (t.userData.pins = l),
    (t.userData.keys = c),
    (t.userData.part = {
      name: `Touch keys`,
      desc: `Eight copper pads: touch one and its pin’s touchRead() value drops.`,
    }),
    X(t, r / 2 - 1.6, i, -13),
    jc(t, [-r / 2 + 1.3, i, 3.4], [r / 2 - 1.3, i, 3.4]),
    t
  );
}
var al = { w: 24, h: 48, t: 2.8, tilt: 26 * kc };
function ol() {
  let e = new L(),
    t = new L();
  (t.position.set(0, 2.6, 0), (t.rotation.x = -al.tilt), e.add(t));
  let { w: n, h: r, t: i } = al,
    a = new aa();
  (a.moveTo(-n / 2 + 4, 0),
    a.lineTo(n / 2 - 4, 0),
    a.quadraticCurveTo(n / 2, 0, n / 2, 4),
    a.lineTo(n / 2, r - 4),
    a.quadraticCurveTo(n / 2, r, n / 2 - 4, r),
    a.lineTo(-n / 2 + 4, r),
    a.quadraticCurveTo(-n / 2, r, -n / 2, r - 4),
    a.lineTo(-n / 2, 4),
    a.quadraticCurveTo(-n / 2, 0, -n / 2 + 4, 0));
  let o = new B(
    new Ha(a, { depth: i, bevelEnabled: !1, curveSegments: 10 }),
    J(`#2a2e3a`, 0.45),
  );
  ((o.position.z = -i), t.add(o));
  let s = document.createElement(`canvas`);
  ((s.width = 300), (s.height = 620));
  let c = new Ci(s);
  ((c.colorSpace = Ke), (c.anisotropy = 8));
  let l = new B(new Ka(n - 2.4, r - 3.6), new Jr({ map: c }));
  (l.position.set(0, r / 2, 0.02), t.add(l));
  let u = J(`#d9b98b`, 0.7);
  (e.add(Y(n * 0.8, 2.6, 8, u, 0, 0, -1.6)),
    e.add(Y(n * 0.8, 1.4, 1.4, u, 0, 2.6, 2.8)));
  let d = new B(new V(n * 0.45, 22, 2.4), u);
  (d.position.set(0, 10.4, -i - 3.6),
    (d.rotation.x = -al.tilt),
    e.add(d),
    (e.userData.screen = { canvas: s, tex: c }),
    (e.userData.part = {
      name: `Phone`,
      desc: `Tap it to send the ESP32 a command.`,
    }));
  let f = new F(0, r + 1.5, 0).applyEuler(t.rotation).add(t.position);
  return (X(e, f.x, f.y, f.z), cl(e, { mode: `wifi` }), e);
}
function sl(e, t, n, r, i, a) {
  (e.beginPath(), e.roundRect(t, n, r, i, a));
}
function cl(
  t,
  {
    mode: n = `wifi`,
    online: r = !1,
    lit: i = !1,
    name: a = `ESP32`,
    address: o = ``,
    lines: s = [],
    pressed: c = !1,
    level: l = 0,
    pumping: u = !1,
    taken: d = !1,
  } = {},
) {
  let f = t.userData.screen;
  if (!f) return;
  let p = f.canvas.getContext(`2d`),
    m = f.canvas.width,
    h = f.canvas.height;
  ((p.fillStyle = `#f8f3ea`),
    p.fillRect(0, 0, m, h),
    (p.textBaseline = `middle`),
    (p.textAlign = `center`));
  let g = (e, t) => {
      p.font = `600 ${t}px "Barlow", sans-serif`;
      let n = Math.max(...e.map((e) => p.measureText(e).width));
      n > m - 36 &&
        (p.font = `600 ${Math.floor((t * (m - 36)) / n)}px "Barlow", sans-serif`);
    },
    _ = (t) => {
      let n = e(t).split(`
`);
      ((p.fillStyle = `#7b8088`),
        g(n, 30),
        n.forEach((e, t) => p.fillText(e, m / 2, 330 + t * 40)));
    },
    v = (t, n, r = 26) => {
      let i = e(t).split(`
`);
      (g(i, r), i.forEach((e, t) => p.fillText(e, m / 2, n + t * (r + 8))));
    };
  if (n === `bay`) {
    if (
      ((p.fillStyle = `#e9e1d3`),
      sl(p, 14, 22, m - 28, 50, 25),
      p.fill(),
      (p.fillStyle = `#5b6168`),
      (p.font = `600 24px "Barlow", sans-serif`),
      p.fillText(r ? o : `esp32.local`, m / 2, 48),
      (p.fillStyle = `#0f2239`),
      (p.font = `700 44px "Barlow Semi Condensed", sans-serif`),
      p.fillText(`BAY 1`, m / 2, 140),
      !r)
    )
      _(`Can’t reach
the board yet.
Press Run.`);
    else {
      let e = c ? 96 : 104;
      ((p.fillStyle = d ? `#e0533d` : `#3fae6a`),
        p.beginPath(),
        p.arc(m / 2, 320, e, 0, Math.PI * 2),
        p.fill(),
        (p.fillStyle = `#fff`),
        (p.font = `700 ${d ? 46 : 54}px "Barlow Semi Condensed", sans-serif`),
        p.fillText(d ? `TAKEN` : `FREE`, m / 2, 324),
        (p.fillStyle = `#7b8088`),
        v(
          `Reloads every 2 s,
or tap to reload`,
          500,
        ));
    }
  } else if (n === `tank`)
    ((p.fillStyle = `#e9e1d3`),
      sl(p, 14, 22, m - 28, 50, 25),
      p.fill(),
      (p.fillStyle = `#5b6168`),
      (p.font = `600 24px "Barlow", sans-serif`),
      p.fillText(r ? o : `esp32.local`, m / 2, 48),
      r
        ? ((p.fillStyle = `#0f2239`),
          (p.font = `700 40px "Barlow Semi Condensed", sans-serif`),
          p.fillText(`TANK`, m / 2, 128),
          (p.font = `700 96px "Barlow Semi Condensed", sans-serif`),
          p.fillText(`${Math.round(l)}%`, m / 2, 210),
          (p.fillStyle = `#e2d9ca`),
          sl(p, 34, 280, m - 68, 40, 20),
          p.fill(),
          (p.fillStyle = `#3f97df`),
          sl(
            p,
            34,
            280,
            Math.max(40, ((m - 68) * Math.min(100, l)) / 100),
            40,
            20,
          ),
          p.fill(),
          (p.fillStyle = u ? `#f86b1d` : `#d9d0c1`),
          sl(p, 46, 370, m - 92, 76, 38),
          p.fill(),
          (p.fillStyle = u ? `#fff` : `#4d535a`),
          (p.font = `700 40px "Barlow Semi Condensed", sans-serif`),
          p.fillText(u ? `PUMP ON` : `PUMP OFF`, m / 2, 410),
          (p.fillStyle = `#7b8088`),
          v(
            `Refreshes
every 2 s`,
            520,
          ))
        : ((p.fillStyle = `#0f2239`),
          (p.font = `700 44px "Barlow Semi Condensed", sans-serif`),
          p.fillText(`WATER TANK`, m / 2, 140),
          _(`Can’t reach
the board yet.
Press Run.`)));
  else if (n === `wifi`) {
    if (
      ((p.fillStyle = `#e9e1d3`),
      sl(p, 14, 22, m - 28, 50, 25),
      p.fill(),
      (p.fillStyle = `#5b6168`),
      (p.font = `600 24px "Barlow", sans-serif`),
      p.fillText(r ? o : `esp32.local`, m / 2, 48),
      (p.fillStyle = `#0f2239`),
      (p.font = `700 44px "Barlow Semi Condensed", sans-serif`),
      p.fillText(`ESP32 LAMP`, m / 2, 140),
      !r)
    )
      _(`Can’t reach
the board yet.
Press Run.`);
    else {
      let e = c ? 96 : 104;
      ((p.fillStyle = i ? `#f86b1d` : `#d9d0c1`),
        p.beginPath(),
        p.arc(m / 2, 330, e, 0, Math.PI * 2),
        p.fill(),
        (p.fillStyle = i ? `#fff` : `#4d535a`),
        (p.font = `700 58px "Barlow Semi Condensed", sans-serif`),
        p.fillText(i ? `ON` : `OFF`, m / 2, 334),
        (p.fillStyle = `#5b6168`),
        v(
          `Tap to switch
the LED`,
          500,
          28,
        ));
    }
  } else if (
    ((p.fillStyle = `#2f78c4`),
    p.fillRect(0, 0, m, 104),
    (p.fillStyle = `#fff`),
    (p.font = `700 34px "Barlow Semi Condensed", sans-serif`),
    p.fillText(`BLUETOOTH`, m / 2, 38),
    (p.font = `600 24px "Barlow", sans-serif`),
    p.fillText(r ? a : e(`not connected`), m / 2, 76),
    !r)
  )
    _(`Press Run,
then tap
to send.`);
  else {
    let t = 500;
    p.font = `600 34px "JetBrains Mono", monospace`;
    for (let [e, n] of [...s].reverse().slice(0, 5)) {
      let r = Math.min(m - 40, p.measureText(e).width + 40),
        i = n ? m - 16 - r : 16;
      ((p.fillStyle = n ? `#2f78c4` : `#e6ddcd`),
        sl(p, i, t - 32, r, 62, 24),
        p.fill(),
        (p.fillStyle = n ? `#fff` : `#1b2333`),
        (p.textAlign = `left`),
        p.fillText(e, i + 20, t),
        (p.textAlign = `center`),
        (t -= 76));
    }
    let n = e(`Tap to send “{cmd}”`, { cmd: i ? `off` : `on` });
    ((p.fillStyle = `#5b6168`), g([n], 26), p.fillText(n, m / 2, 580));
  }
  f.tex.needsUpdate = !0;
}
function ll(e, t) {
  let n = new ra(),
    r = [],
    i = e[0].clone();
  for (let a = 1; a < e.length; a++) {
    let o = e[a],
      s = e[a + 1];
    if (!s) {
      n.add(new Qi(i, o.clone()));
      break;
    }
    let c = o.clone().sub(e[a - 1]),
      l = c.length();
    c.normalize();
    let u = s.clone().sub(o),
      d = u.length();
    u.normalize();
    let f = Math.min(t, l / 2, d / 2),
      p = o.clone().addScaledVector(c, -f),
      m = o.clone().addScaledVector(u, f);
    i.distanceTo(p) > 0.001 && n.add(new Qi(i, p));
    let h = new ea(p, o.clone(), m);
    (n.add(h), r.push(h), (i = m));
  }
  return { path: n, bends: r };
}
var ul = { w: 46, d: 40, h: 44, floor: 3, lid: 2 },
  dl = ul.h - ul.floor - 6,
  fl = {
    hole: new F(8, ul.h + ul.lid, -4),
    inlet: new F(8, ul.h - 6, -4),
    probe: new F(-10, ul.h + ul.lid, 9),
    spout: new F(ul.w / 2 + 6.6, 4.9, 6),
  };
function pl() {
  let e = new L(),
    { w: t, d: n, h: r, floor: i, lid: a } = ul,
    o = J(`#e7e2d8`, 0.55);
  e.add(Y(t + 3, i, n + 3, o));
  for (let a of [-1, 1])
    for (let s of [-1, 1])
      e.add(Y(2.6, r - i, 2.6, o, (t / 2) * a, i, (n / 2) * s));
  let s = t + 3,
    c = n + 3,
    l = new aa();
  (l.moveTo(-s / 2, -c / 2),
    l.lineTo(s / 2, -c / 2),
    l.lineTo(s / 2, c / 2),
    l.lineTo(-s / 2, c / 2),
    l.closePath());
  for (let [e, t] of [
    [fl.hole, 3.1],
    [fl.probe, 7.3],
  ]) {
    let n = new ia();
    (n.absarc(e.x, -e.z, t, 0, Math.PI * 2, !0), l.holes.push(n));
  }
  let u = new Ha(l, { depth: a, bevelEnabled: !1, curveSegments: 24 });
  u.rotateX(-Math.PI / 2);
  let d = new B(u, o);
  ((d.position.y = r), e.add(d));
  let f = new B(new Za(3.2, 0.7, 10, 28), J(`#f2f0ea`, 0.4));
  ((f.rotation.x = Math.PI / 2),
    f.position.copy(fl.hole).setY(r + a + 0.5),
    e.add(f));
  let p = new uo({
      color: `#d8eef6`,
      roughness: 0.1,
      transparent: !0,
      opacity: 0.22,
      depthWrite: !1,
      side: 2,
    }),
    m = (t, n, a, o) => {
      let s = new B(new Ka(t, r - i), p);
      (s.position.set(n, i + (r - i) / 2, a),
        (s.rotation.y = o),
        s.layers.set(1),
        (s.renderOrder = 2),
        e.add(s));
    };
  (m(t, 0, n / 2, 0),
    m(t, 0, -n / 2, 0),
    m(n, t / 2, 0, Math.PI / 2),
    m(n, -t / 2, 0, Math.PI / 2));
  let h = new V(t - 1.6, 1, n - 1.6);
  h.translate(0, 0.5, 0);
  let g = new B(
    h,
    J(`#3f97df`, 0.2, 0, { transparent: !0, opacity: 0.78, depthWrite: !1 }),
  );
  ((g.position.y = i), (g.renderOrder = 1), (g.userData.water = !0), e.add(g));
  let _ = document.createElement(`canvas`);
  ((_.width = 120), (_.height = 600));
  let v = new Ci(_);
  ((v.colorSpace = Ke), (v.anisotropy = 8));
  let y = new B(
    new Ka(9, dl + 4),
    new Jr({ map: v, transparent: !0, depthWrite: !1 }),
  );
  (y.position.set(t / 2 - 8, i + dl / 2, n / 2 + 0.3),
    y.layers.set(1),
    (y.renderOrder = 3),
    e.add(y));
  let b = J(`#c9a45a`, 0.35, 0.6),
    { spout: x } = fl,
    S = new B(new H(1.6, 1.6, 7, 16), b);
  ((S.rotation.z = Math.PI / 2), S.position.set(x.x - 3.1, 9, x.z), e.add(S));
  let C = new B(new H(1.4, 1.4, 4.5, 16), b);
  (C.position.set(x.x, 7.2, x.z),
    e.add(C),
    e.add(Y(6, 1.2, 1.2, J(`#d6574a`, 0.5), x.x - 2.6, 10.4, x.z)));
  let w = new B(new Di(4, 24), J(`#5d636e`, 0.6, 0.4));
  return (
    (w.rotation.x = -Math.PI / 2),
    w.position.set(x.x, 0.05, x.z),
    e.add(w),
    (e.userData.tank = { water: g, scale: { canvas: _, tex: v, marks: null } }),
    (e.userData.part = {
      name: `Water tank`,
      desc: `The pump fills it; the tap on its side uses the water.`,
    }),
    X(e, t / 2 - 8, i + dl * 0.72, n / 2 + 0.3),
    hl(e, 0.35),
    gl(e, 25, 90),
    e
  );
}
var ml = (e) => ul.floor + Math.max(0.001, e) * dl;
function hl(e, t) {
  let n = e.userData.tank;
  ((n.water.scale.y = Math.max(0.001, Math.min(1, t)) * dl),
    (n.water.visible = t > 0.002));
}
function gl(e, t, n) {
  let r = e.userData.tank.scale,
    i = `${t}|${n}`;
  if (r.marks === i) return;
  r.marks = i;
  let a = r.canvas.getContext(`2d`),
    { width: o, height: s } = r.canvas,
    c = (2 / (dl + 4)) * s,
    l = (e) => s - c - (e / 100) * (s - 2 * c);
  (a.clearRect(0, 0, o, s),
    (a.fillStyle = `rgba(255, 251, 245, 0.82)`),
    a.fillRect(0, 0, o, s),
    (a.fillStyle = `#4d535a`),
    (a.font = `600 24px "Barlow Semi Condensed", sans-serif`),
    (a.textBaseline = `middle`));
  for (let e = 0; e <= 100; e += 10) {
    let t = l(e);
    (a.fillRect(0, t - 1.5, e % 50 ? 22 : 34, 3),
      e % 50 == 0 &&
        a.fillText(`${e}`, 42, t + (e === 100 ? 12 : e === 0 ? -12 : 0)));
  }
  for (let [e, r] of [
    [t, `#e0463c`],
    [n, `#26a586`],
  ]) {
    let t = l(e);
    ((a.fillStyle = r), a.fillRect(0, t - 4, o, 8));
  }
  r.tex.needsUpdate = !0;
}
var _l = new F(0, 9.4, 3.5);
function vl() {
  let e = new L(),
    t = J(`#23262e`, 0.8),
    n = new B(new H(7, 7, 9, 40), t);
  ((n.position.y = 4.5), e.add(n));
  let r = new B(new H(9.4, 9.4, 1.6, 40), J(`#3a3e48`, 0.6));
  ((r.position.y = 0.8), e.add(r));
  let i = new B(new H(7, 7, 3, 40), t);
  ((i.position.y = -ul.lid - 1.5), e.add(i));
  let a = new B(new H(1.6, 2, 1.6, 16), J(`#3a3e48`, 0.6));
  return (
    a.position.set(_l.x, 8.6, _l.z),
    e.add(a),
    (e.userData.face = new F(0, -ul.lid - 3, 0)),
    (e.userData.part = {
      name: `Level probe (JSN-SR04T)`,
      desc: `A waterproof ultrasonic sensor looking down at the water: the further away the water, the emptier the tank.`,
    }),
    X(e, 0, 9, 0),
    e
  );
}
var yl = Object.fromEntries(
    [`GND`, `Echo`, `Trig`, `5V`].map((e, t) => [
      e,
      new F(-8.4, 6.1, (t - 1.5) * q),
    ]),
  ),
  bl = new F(10.6, 5.6, -12);
function xl() {
  let e = new L(),
    t = Z(275, 400, (e, t, n) => {
      ((e.fillStyle = `#2b5f46`),
        e.fillRect(0, 0, t, n),
        (e.fillStyle = `rgba(255,255,255,0.9)`),
        (e.textBaseline = `middle`),
        (e.textAlign = `center`),
        (e.font = `700 40px "Barlow Semi Condensed", sans-serif`),
        e.fillText(`JSN-SR04T`, t / 2, 330),
        (e.font = `600 22px "Barlow Semi Condensed", sans-serif`),
        (e.textAlign = `left`),
        Object.entries(yl).forEach(([t, n]) =>
          e.fillText(t, (n.x + 11 + 1.8) * 12.5, (n.z + 16) * 12.5),
        ));
    }),
    n = J(`#244f3b`, 0.6),
    r = new B(new V(22, 1.6, 32), [
      n,
      n,
      J(`#ffffff`, 0.6, 0, { map: t }),
      n,
      n,
      n,
    ]);
  ((r.position.y = 2.8), e.add(r));
  for (let t of [-1, 1])
    for (let n of [-1, 1])
      e.add(Y(1.6, 2, 1.6, J(`#c9c4b8`, 0.5), t * 8.5, 0, n * 13.5));
  (e.add(Y(6, 1.2, 7, J(`#2a2d3a`, 0.5), -1, 3.6, -10)),
    e.add(Y(2.5, 2.5, 10.2, qc, -8.4, 3.6, 0)));
  for (let t of Object.values(yl)) e.add(Y(0.64, 6, 0.64, Jc, t.x, 3.6, t.z));
  return (
    e.add(Y(4.6, 4.4, 8, J(`#efece4`, 0.5), bl.x - 2.4, 3.6, bl.z)),
    (e.userData.part = {
      name: `JSN-SR04T board`,
      desc: `Drives the probe on the tank: send a pulse on Trig, time the echo on Echo. Runs on 3.3 V (v3 boards).`,
    }),
    X(e, 0, 3.6, 0),
    e
  );
}
var Sl = [`IN`, `GND`, `VCC`],
  Cl = [`NC`, `COM`, `NO`],
  wl = Object.fromEntries(
    Sl.map((e, t) => [e, new F(-21.5, 6.1, (t - 1) * q)]),
  ),
  Tl = Object.fromEntries(
    Cl.map((e, t) => [e, new F(24.7, 6.7, (t - 1) * 5.08)]),
  );
function El() {
  let e = new L(),
    t = Z(500, 260, (e, t, n) => {
      ((e.fillStyle = `#2d5bb0`),
        e.fillRect(0, 0, t, n),
        (e.fillStyle = `rgba(255,255,255,0.92)`),
        (e.font = `600 21px "Barlow Semi Condensed", sans-serif`),
        (e.textAlign = `center`),
        (e.textBaseline = `middle`),
        Sl.forEach((t, r) => e.fillText(t, 70, n / 2 + (r - 1) * 25.4)),
        (e.font = `600 26px "Barlow Semi Condensed", sans-serif`),
        Cl.forEach((t, r) => e.fillText(t, 395, n / 2 + (r - 1) * 50.8)),
        (e.font = `600 22px "Barlow Semi Condensed", sans-serif`),
        e.fillText(`1 RELAY 5V`, 130, 230),
        (e.strokeStyle = `rgba(255,255,255,0.7)`),
        (e.lineWidth = 3),
        e.strokeRect(150, 40, 200, 175));
    }),
    n = J(`#284f99`, 0.6),
    r = new B(new V(50, 1.6, 26), [
      n,
      n,
      J(`#ffffff`, 0.6, 0, { map: t }),
      n,
      n,
      n,
    ]);
  ((r.position.y = 2.8), e.add(r));
  for (let t of [-1, 1])
    for (let n of [-1, 1])
      e.add(Y(1.8, 2, 1.8, J(`#c9c4b8`, 0.5), t * 22.5, 0, n * 10.5));
  let i = Z(300, 300, (e, t, n) => {
      ((e.fillStyle = `#2f63d0`),
        e.fillRect(0, 0, t, n),
        (e.fillStyle = `rgba(255,255,255,0.92)`),
        (e.textAlign = `center`),
        (e.font = `700 40px "Barlow Semi Condensed", sans-serif`),
        e.fillText(`SRD-05VDC`, t / 2, 100),
        (e.font = `600 32px "Barlow Semi Condensed", sans-serif`),
        e.fillText(`10A 250VAC`, t / 2, 160),
        e.fillText(`10A 30VDC`, t / 2, 205));
    }),
    a = J(`#2f63d0`, 0.45),
    o = new B(new V(19, 15.5, 15.5), [
      a,
      a,
      J(`#ffffff`, 0.45, 0, { map: i }),
      a,
      a,
      a,
    ]);
  (o.position.set(1, 11.35, 0), e.add(o));
  let s = 20.5;
  e.add(Y(8, 9, 15.2, J(`#3474d6`, 0.5), s, 3.6, 0));
  let c = J(`#cfd2d6`, 0.3, 0.7);
  (Object.values(Tl).forEach(({ z: t }) => {
    let n = new B(new H(1.7, 1.7, 0.6, 20), c);
    (n.position.set(s, 12.9, t),
      e.add(n),
      e.add(Y(3, 0.3, 0.5, J(`#3b3e48`, 0.6), s, 13.2, t)),
      e.add(Y(0.3, 2.6, 2.6, J(`#16181e`, 0.9), 24.55, 5.4, t)));
  }),
    e.add(Y(2.54, 2.5, 7.62, qc, -21.5, 3.6, 0)));
  for (let t of Object.values(wl)) e.add(Y(0.64, 6, 0.64, Jc, t.x, 3.6, t.z));
  (e.add(Y(2.6, 1, 1.5, J(`#25272f`, 0.5), -13, 3.6, 6)),
    e.add(Y(3.4, 1.2, 1.8, J(`#25272f`, 0.5), -13, 3.6, -6)));
  let l = `#e8392e`,
    u = J(l, 0.3, 0, { emissive: l, emissiveIntensity: 0.06 });
  e.add(Y(2.2, 1, 1.6, u, -12, 3.6, 10.5));
  let d = Nc(l, 16);
  return (
    d.position.set(-12, 5.8, 10.5),
    e.add(d),
    (e.userData.relay = { lens: u, glow: d }),
    (e.userData.part = {
      name: `1-channel relay module`,
      desc: `A 5 V coil pulls a switch closed when IN goes HIGH. Its contacts (COM to NO) can switch mains: 10 A at 250 V AC.`,
    }),
    X(e, 1, 19.1, 0),
    e
  );
}
function Dl(e, t) {
  let n = e.userData.relay;
  ((n.lens.emissiveIntensity = t ? 1.4 : 0.06),
    (n.glow.material.opacity = t ? 0.7 : 0));
}
var Ol = {
  inlet: new F(27.5, 14, 0),
  outlet: new F(14, 35, 0),
  cable: new F(-9.5, 25.2, -7.4),
};
function kl() {
  let e = new L(),
    t = new L();
  e.add(t);
  let n = J(`#4b505c`, 0.55);
  e.add(Y(34, 3, 22, n, 0, 0, 0));
  for (let e of [-12, 10]) t.add(Y(5, 6, 18, J(`#3266b8`, 0.5), e, 3, 0));
  let r = J(`#3a75cc`, 0.45),
    i = (e, n, r, i, a = 14, o = !1) => {
      let s = new B(new H(e, e, n, 40, 1, o), r);
      return (
        (s.rotation.z = Math.PI / 2),
        s.position.set(i, a, 0),
        t.add(s),
        s
      );
    };
  i(10, 26, r, -4);
  for (let e = 0; e < 6; e++) i(10.6, 1.1, r, -14 + e * 4);
  i(10.4, 6.4, J(`#59606d`, 0.6, 0, { side: 2 }), -20.2, 14, !0);
  let a = new B(new Di(10.2, 40), J(`#2b2f38`, 0.8));
  ((a.rotation.y = -Math.PI / 2), a.position.set(-17.1, 14, 0), t.add(a));
  let o = new L();
  o.position.set(-20.6, 14, 0);
  let s = J(`#ff7a1f`, 0.4, 0, {
      emissive: `#ff7a1f`,
      emissiveIntensity: 0.25,
    }),
    c = new B(new H(2.2, 2.2, 2.4, 20), J(`#e9e6df`, 0.4));
  ((c.rotation.z = Math.PI / 2), o.add(c));
  for (let e = 0; e < 4; e++) {
    let t = new B(new V(0.6, 7.4, 4.6), s);
    ((t.position.y = 5.4), (t.rotation.y = 0.45));
    let n = new L();
    ((n.rotation.x = (e / 4) * Math.PI * 2), n.add(t), o.add(n));
  }
  t.add(o);
  let l = new B(
    new Di(9.2, 40),
    new Jr({ color: `#ff7a1f`, transparent: !0, opacity: 0, depthWrite: !1 }),
  );
  ((l.rotation.y = -Math.PI / 2),
    l.position.set(-22.4, 14, 0),
    l.layers.set(1),
    t.add(l));
  let u = J(`#2b2f38`, 0.7);
  for (let [e, n] of [
    [9.8, 0.6],
    [5.2, 0.4],
  ]) {
    let r = new B(new Za(e, n, 8, 40), u);
    ((r.rotation.y = Math.PI / 2), r.position.set(-23.3, 14, 0), t.add(r));
  }
  for (let e = 0; e < 2; e++) {
    let n = new B(new V(0.7, 19.6, 0.7), u);
    (n.position.set(-23.3, 14, 0),
      (n.rotation.x = (e / 2) * Math.PI + Math.PI / 4),
      t.add(n));
  }
  let d = J(`#c7cbd2`, 0.3, 0.6);
  (i(12, 10, d, 14), i(6, 2, d, 19.8));
  let f = new B(new H(3, 3, 9, 24), d);
  (f.position.set(14, 30.5, 0), t.add(f));
  let p = new B(new H(3.2, 3.2, 7, 24), d);
  ((p.rotation.z = Math.PI / 2),
    p.position.set(24, 14, 0),
    t.add(p),
    t.add(Y(12, 7, 10, r, -6, 22, 0)));
  let m = new B(new H(1.8, 1.8, 2.4, 16), J(`#25272f`, 0.6));
  ((m.rotation.x = Math.PI / 2),
    m.position.set(Ol.cable.x, Ol.cable.y, -6.2),
    t.add(m));
  let h = `#3fd27a`,
    g = J(h, 0.3, 0, { emissive: h, emissiveIntensity: 0.05 }),
    _ = new B(new Xa(1.6, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), g);
  ((_.rotation.x = -Math.PI / 2), _.position.set(-2.5, 25.4, -5), t.add(_));
  let v = Nc(h, 14);
  (v.position.set(-2.5, 25.4, -7), t.add(v));
  let y = Z(220, 120, (e, t, n) => {
      ((e.fillStyle = `#e9e6df`),
        e.fillRect(0, 0, t, n),
        (e.fillStyle = `#1b2333`),
        (e.font = `700 40px "Barlow Semi Condensed", sans-serif`),
        (e.textAlign = `center`),
        e.fillText(`230 V ~`, t / 2, 52),
        (e.font = `600 32px "Barlow Semi Condensed", sans-serif`),
        e.fillText(`370 W`, t / 2, 96));
    }),
    b = new B(new Ka(9, 4.9), J(`#ffffff`, 0.6, 0, { map: y }));
  return (
    b.rotation.set(-Math.PI / 2, 0, Math.PI),
    b.position.set(-6, 29.06, 1.6),
    t.add(b),
    (e.userData.pump = {
      body: t,
      fan: o,
      blur: l,
      lamp: { lens: g, glow: v },
    }),
    (e.userData.part = {
      name: `Water pump (230 V)`,
      desc: `A mains surface pump: while the relay is on, its fan spins and it lifts water from the well into the tank.`,
    }),
    X(e, -16, 24.6, 0),
    e
  );
}
function Al(e, t) {
  let n = e.userData.pump.lamp;
  ((n.lens.emissiveIntensity = t ? 1.6 : 0.05),
    (n.glow.material.opacity = t ? 0.75 : 0));
}
var jl = { w: 32, d: 22, h: 10, water: 7 };
function Ml() {
  let t = new L(),
    { w: n, d: r, h: i, water: a } = jl,
    o = J(`#b8b0a3`, 0.85),
    s = 2.2;
  (t.add(Y(n, 1.2, r, o)),
    t.add(Y(n, i, s, o, 0, 0, r / 2 - s / 2)),
    t.add(Y(n, i, s, o, 0, 0, -r / 2 + s / 2)),
    t.add(Y(s, i, r - 2 * s, o, n / 2 - s / 2, 0, 0)),
    t.add(Y(s, i, r - 2 * s, o, -n / 2 + s / 2, 0, 0)));
  let c = new B(
    new V(n - 2 * s, a - 1.2, r - 2 * s),
    J(`#3f97df`, 0.2, 0, { transparent: !0, opacity: 0.85 }),
  );
  ((c.position.y = 1.2 + (a - 1.2) / 2), (c.userData.water = !0), t.add(c));
  let l = Z(240, 64, (t, n, r) => {
      ((t.fillStyle = `#b8b0a3`),
        t.fillRect(0, 0, n, r),
        (t.fillStyle = `#4d535a`),
        (t.font = `700 44px "Barlow Semi Condensed", sans-serif`),
        (t.textAlign = `center`),
        (t.textBaseline = `middle`),
        t.fillText(e(`WELL`), n / 2, r / 2 + 2));
    }),
    u = new B(new Ka(12, 3.2), J(`#ffffff`, 0.85, 0, { map: l }));
  return (
    u.position.set(0, i / 2, r / 2 + 0.02),
    t.add(u),
    (t.userData.part = {
      name: `Well`,
      desc: `Where the water comes from. The pump sucks it up through the pipe.`,
    }),
    X(t, 0, i, r / 2),
    t
  );
}
function Nl() {
  let e = Z(128, 32, (e, t, n) => {
    ((e.fillStyle = `#3d93de`),
      e.fillRect(0, 0, t, n),
      (e.strokeStyle = `#bfe3ff`),
      (e.lineWidth = 9),
      (e.lineJoin = `round`),
      e.beginPath(),
      e.moveTo(34, -2),
      e.lineTo(74, n / 2),
      e.lineTo(34, n + 2),
      e.stroke());
  });
  return ((e.wrapS = t), (e.wrapT = t), e);
}
function Pl(e, { radius: t = 2.2, name: n = `Pipe`, desc: r = `` } = {}) {
  let i = new L(),
    { path: a, bends: o } = ll(e, t * 2.4),
    s = a.getLength(),
    c = Math.ceil(s / 0.7),
    l = new B(
      new Qa(a, c, t, 18, !1),
      new uo({
        color: `#eef5f8`,
        roughness: 0.15,
        transparent: !0,
        opacity: 0.4,
        depthWrite: !1,
      }),
    );
  ((l.renderOrder = 2), i.add(l));
  let u = Nl();
  u.repeat.set(s / 7, 1);
  let d = new B(new Qa(a, c, t * 0.66, 12, !1), new Jr({ map: u }));
  (d.layers.set(1), i.add(d));
  let f = J(`#f4f3ee`, 0.45);
  for (let e of o) i.add(new B(new Qa(e, 12, t * 1.3, 18, !1), f));
  for (let [n, r] of [
    [e[0], e[1]],
    [e[e.length - 1], e[e.length - 2]],
  ]) {
    let e = new B(new H(t * 1.3, t * 1.3, 2.4, 18), f);
    (e.position.copy(n).addScaledVector(r.clone().sub(n).normalize(), 1.2),
      e.quaternion.setFromUnitVectors(
        new F(0, 1, 0),
        r.clone().sub(n).normalize(),
      ),
      i.add(e));
  }
  ((i.userData.path = { curve: a, radius: t * 1.3 }),
    (i.userData.flow = { tex: u }),
    (i.userData.part = { name: n, desc: r }));
  let p = a.getPointAt(0.5);
  return (X(i, p.x, p.y, p.z), i);
}
function Fl() {
  let e = new L(),
    t = new B(new H(3.4, 3.4, 4, 18), J(`#9aa3ad`, 0.5, 0.4));
  ((t.position.y = -2), e.add(t));
  for (let t = 0; t < 3; t++)
    e.add(Y(7, 0.4, 0.8, J(`#5b6168`, 0.6), 0, -3.6 + t * 1.2, 3.1));
  return (
    (e.userData.part = {
      name: `Foot valve`,
      desc: `A strainer at the bottom of the suction pipe: it keeps grit out and the pipe full of water.`,
    }),
    X(e, 0, 0, 0),
    e
  );
}
var Il = new F(0, 23.5, 0);
function Ll() {
  let e = new L(),
    t = J(`#f1eee8`, 0.55);
  e.add(Y(30, 12, 24, t));
  let n = new B(new H(9, 9, 1, 40), J(`#e2ddd3`, 0.5));
  ((n.position.y = 12.5), e.add(n));
  let r = new B(new H(6.4, 7, 9, 32), J(`#2e3240`, 0.5));
  ((r.position.y = 17.5),
    e.add(r),
    e.add(Y(4, 3, 4, J(`#2e3240`, 0.5), 0, 22, 0)));
  let i = Z(300, 120, (e, t, n) => {
      ((e.fillStyle = `#f2c23a`),
        e.fillRect(0, 0, t, n),
        (e.fillStyle = `#1b2333`),
        e.beginPath(),
        e.moveTo(55, 18),
        e.lineTo(98, 100),
        e.lineTo(12, 100),
        e.closePath(),
        e.fill(),
        (e.fillStyle = `#f2c23a`),
        (e.font = `700 54px "Barlow Semi Condensed", sans-serif`),
        (e.textAlign = `center`),
        e.fillText(`!`, 55, 92),
        (e.fillStyle = `#1b2333`),
        (e.font = `700 48px "Barlow Semi Condensed", sans-serif`),
        e.fillText(`230 V`, 200, 76));
    }),
    a = new B(new Ka(16, 6.4), J(`#ffffff`, 0.6, 0, { map: i }));
  return (
    a.position.set(0, 6, 12.05),
    e.add(a),
    (e.userData.part = {
      name: `Mains socket`,
      desc: `230 V AC (120 V in some countries) — enough to kill. The relay keeps it away from the ESP32.`,
    }),
    X(e, 0, 23, 0),
    e
  );
}
function Rl(
  e,
  t,
  {
    radius: n = 0.9,
    bend: r = 3.5,
    name: i = `Mains cable`,
    desc: a = `Brown is live, blue is neutral. The relay switches the live wire.`,
  } = {},
) {
  let o = new L(),
    { path: s } = ll(e, r),
    c = new Qa(s, Math.ceil(s.getLength() / 0.7), n, 10, !1),
    l = new B(c, J(t, 0.5));
  o.add(l);
  let u = [new L(), new L()];
  (o.add(...u),
    (o.userData.wire = {
      tube: l,
      count: c.index.count,
      ends: u,
      curve: s,
      radius: n,
    }),
    (o.userData.part = { name: i, desc: a }));
  let d = s.getPointAt(0.5);
  return (X(o, d.x, d.y, d.z), o);
}
function zl() {
  let e = new L(),
    t = new Jr({ color: `#b3a084`, transparent: !0, depthWrite: !1 }),
    n = (n, r, i = t) => {
      let a = new Ka(n, r);
      a.rotateX(-Math.PI / 2);
      let o = new B(a, i);
      return (o.layers.set(1), e.add(o), o);
    },
    r = n(1, 0.5),
    i = [n(0.5, 5), n(0.5, 5)],
    a = document.createElement(`canvas`);
  ((a.width = 220), (a.height = 84));
  let o = new Ci(a);
  ((o.colorSpace = Ke), (o.anisotropy = 8));
  let s = n(16, 6.1, new Jr({ map: o, transparent: !0, depthWrite: !1 }));
  return (
    (s.renderOrder = 1),
    (s.position.y = 0.02),
    (e.userData.marker = {
      line: r,
      ticks: i,
      label: s,
      canvas: a,
      tex: o,
      text: null,
    }),
    (e.userData.part = {
      name: `Distance`,
      desc: `How far apart the boards are.`,
    }),
    e
  );
}
function Bl(e, t, n) {
  let r = e.userData.marker;
  if (
    ((r.line.scale.x = t),
    (r.line.position.x = t / 2),
    (r.ticks[1].position.x = t),
    (r.label.position.x = t / 2),
    n === r.text)
  )
    return;
  r.text = n;
  let i = r.canvas.getContext(`2d`),
    { width: a, height: o } = r.canvas;
  (i.clearRect(0, 0, a, o),
    i.beginPath(),
    i.roundRect(3, 3, a - 6, o - 6, (o - 6) / 2),
    (i.fillStyle = `#fffbf6`),
    i.fill(),
    (i.lineWidth = 4),
    (i.strokeStyle = `#cdbb9f`),
    i.stroke(),
    (i.fillStyle = `#0f2239`),
    (i.font = `700 46px "Barlow Semi Condensed", sans-serif`),
    (i.textAlign = `center`),
    (i.textBaseline = `middle`),
    i.fillText(n, a / 2, o / 2 + 2),
    (r.tex.needsUpdate = !0));
}
function Vl(e = `#3d8fe0`) {
  let t = new L(),
    n = J(e, 0.4),
    r = 0.27 * Math.PI,
    i = (e, t) => {
      let n = new aa();
      return (
        n.absarc(0, 0, t, Math.PI / 2 - r, Math.PI / 2 + r, !1),
        n.absarc(0, 0, e, Math.PI / 2 + r, Math.PI / 2 - r, !0),
        n.closePath(),
        n
      );
    };
  for (let [e, r] of [
    [6, 10],
    [14, 18],
    [22, 26],
  ])
    t.add(
      new B(
        new Ha(i(e, r), {
          depth: 3,
          bevelEnabled: !0,
          bevelSize: 0.6,
          bevelThickness: 0.6,
          bevelSegments: 2,
          curveSegments: 32,
        }),
        n,
      ),
    );
  let a = new B(new H(3.4, 3.4, 3, 32), n);
  return ((a.rotation.x = Math.PI / 2), a.position.set(0, 0, 1.5), t.add(a), t);
}
function Hl({ withLabel: e = !0 } = {}) {
  let t = new L(),
    n = Z(900, 400, (t, n, r) => {
      ((t.fillStyle = `#3a56a0`),
        t.fillRect(0, 0, n, r),
        (t.strokeStyle = `rgba(255,255,255,0.85)`),
        (t.fillStyle = `rgba(255,255,255,0.9)`),
        (t.lineWidth = 5),
        t.beginPath(),
        t.arc(190, 190, 172, 0, Math.PI * 2),
        t.arc(710, 190, 172, 0, Math.PI * 2),
        t.stroke(),
        (t.font = `700 40px "Barlow Semi Condensed", sans-serif`),
        (t.textAlign = `center`),
        e && t.fillText(`HC-SR04P`, 450, 70),
        (t.font = `700 30px "Barlow Semi Condensed", sans-serif`),
        t.fillText(`T`, 190, 385),
        t.fillText(`R`, 710, 385),
        (t.font = `600 26px "Barlow Semi Condensed", sans-serif`),
        [`VCC`, `Trig`, `Echo`, `Gnd`].forEach((e, n) =>
          t.fillText(e, 374 + n * 51, 370),
        ));
    }),
    r = J(`#33509a`, 0.6),
    i = new B(new V(45, 1.6, 20), [
      r,
      r,
      J(`#ffffff`, 0.6, 0, { map: n }),
      r,
      r,
      r,
    ]);
  t.add(i);
  let a = J(`#e2e1dc`, 0.3, 0.55),
    o = J(`#3b3e48`, 0.85);
  for (let e of [-13, 13]) {
    let n = new B(new H(8, 8, 12, 48, 1, !0), a);
    (n.position.set(e, 6.8, 0), t.add(n));
    let r = new B(new qa(6.2, 8, 48), a);
    ((r.rotation.x = -Math.PI / 2), r.position.set(e, 12.8, 0), t.add(r));
    let i = new B(new Di(6.2, 48), o);
    ((i.rotation.x = -Math.PI / 2), i.position.set(e, 12, 0), t.add(i));
    let s = new B(new H(6.2, 6.2, 0.8, 48, 1, !0), a);
    (s.position.set(e, 12.4, 0), t.add(s));
  }
  let s = Y(6, 2.6, 2.4, a, 0, 0.8, -5.5);
  (t.add(s),
    t.add(Y(5, 1.2, 4, J(`#262833`, 0.5), 0, 0.8, 3)),
    t.add(Y(10.2, 2.5, 2.5, J(`#2a2d3a`, 0.5), 0, -1.25, 11.2)));
  for (let e = 0; e < 4; e++) {
    let n = new B(new V(0.64, 0.64, 8), Jc);
    (n.position.set(-3.81 + e * q, 0, 14.2), t.add(n));
  }
  return (
    (t.userData.part = {
      name: `HC-SR04P ultrasonic sensor`,
      desc: `Measures distance by timing a 40 kHz sound echo. The P version runs on 3.3 V.`,
    }),
    X(t, 0, 0.8, -10),
    (t.userData.emitters = [new F(-13, 13, 0), new F(13, 13, 0)]),
    t
  );
}
function Ul() {
  let e = new L(),
    t = J(`#2c3242`, 0.55);
  e.add(Y(11, 30, 1.6, t, 0, 4, 0));
  let n = J(`#d9d4ca`, 0.3, 0.7);
  for (let t = 0; t < 4; t++)
    e.add(Y(0.64, 7, 0.64, n, -3.81 + t * q, -2.6, 0));
  e.add(Y(10.2, 2.5, 2.5, J(`#24272f`, 0.5), 0, 1.6, 0));
  let r = [`#e8392e`, `#f2c23a`, `#3fbf6a`],
    i = [];
  return (
    r.forEach((t, n) => {
      let r = 28 - n * 8.4,
        a = J(t, 0.25, 0, { emissive: t, emissiveIntensity: 0.05 }),
        o = new B(new Xa(2.6, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), a);
      ((o.rotation.x = Math.PI / 2), o.position.set(0, r, 0.8), e.add(o));
      let s = new B(new H(3, 3, 0.8, 32), J(`#e9e4d8`, 0.5));
      ((s.rotation.x = Math.PI / 2), s.position.set(0, r, 1), e.add(s));
      let c = Nc(t, 22);
      (c.position.set(0, r, 4), e.add(c), i.push({ lens: a, glow: c }));
    }),
    (e.userData.lights = i),
    (e.userData.part = {
      name: `Traffic light module`,
      desc: `Three LEDs with built-in resistors: red, yellow and green.`,
    }),
    X(e, 0, 34, 0),
    e
  );
}
var Wl = Object.fromEntries(
  [`DIN`, `5V`, `GND`].map((e, t) => [e, new F((t - 1) * q, 0, 0)]),
);
function Gl() {
  let e = new L(),
    t = J(`#1d2028`, 0.55);
  for (let t of Object.values(Wl)) e.add(Y(0.64, 7, 0.64, Jc, t.x, -2.6, 0));
  e.add(Y(7.62, 2.5, 2.5, qc, 0, 1.6, 0));
  let n = new B(new V(10, 12, 1.6), t);
  (n.position.set(0, 10, 0), e.add(n));
  let r = Z(250, 120, (e, t, n) => {
      ((e.fillStyle = `#1d2028`),
        e.fillRect(0, 0, t, n),
        (e.fillStyle = `rgba(255,255,255,0.9)`),
        (e.font = `700 34px "Barlow Semi Condensed", sans-serif`),
        (e.textAlign = `center`),
        (e.textBaseline = `middle`),
        Object.keys(Wl).forEach((n, r) =>
          e.fillText(n, t / 2 + (r - 1) * 63.5, 92),
        ));
    }),
    i = new B(new Ka(10, 4.8), J(`#ffffff`, 0.6, 0, { map: r }));
  (i.position.set(0, 6.6, 0.81), e.add(i));
  let a = 31.5,
    o = new aa();
  o.absarc(0, 0, 18.5, 0, Math.PI * 2, !1);
  let s = new ia();
  (s.absarc(0, 0, 11.5, 0, Math.PI * 2, !0), o.holes.push(s));
  let c = new Ha(o, { depth: 1.6, bevelEnabled: !1, curveSegments: 48 });
  c.translate(0, 0, -0.8);
  let l = new B(c, t);
  ((l.position.y = a), e.add(l));
  let u = J(`#f1eee6`, 0.45),
    d = [];
  for (let t = 0; t < 12; t++) {
    let n = ((255 - t * 30) * Math.PI) / 180,
      r = Math.cos(n) * 15,
      i = a + Math.sin(n) * 15;
    e.add(Y(5, 5, 1.4, u, r, i - 2.5, 1.5));
    let o = J(`#e9e6df`, 0.3, 0, {
        emissive: `#000000`,
        emissiveIntensity: 0.05,
      }),
      s = new B(new H(2.1, 2.1, 0.4, 24), o);
    ((s.rotation.x = Math.PI / 2), s.position.set(r, i, 2.4), e.add(s));
    let c = Nc(`#ffffff`, 24);
    (c.position.set(r, i, 5), e.add(c), d.push({ lens: o, glow: c }));
  }
  return (
    (e.userData.pixels = d),
    (e.userData.part = {
      name: `12-LED ring (WS2812)`,
      desc: `Twelve RGB LEDs, each with its own little chip: one data wire sets the colour of every one, passed along the ring from LED to LED.`,
    }),
    X(e, 0, 51, 0),
    e
  );
}
function Kl(e, t, n, r = 1) {
  let i = e.userData.pixels?.[t];
  if (!i) return;
  let a = n && r > 0;
  (a && (i.lens.emissive.set(n), i.glow.material.color.set(n)),
    i.lens.color.set(a ? n : `#e9e6df`),
    (i.lens.emissiveIntensity = a ? 0.4 + 1.6 * r : 0.05),
    (i.glow.material.opacity = a ? 0.9 * r : 0));
}
var ql = { w: 40, h: 56, d: 32 },
  Jl = {
    signal: new F(4.8, ql.h + 1.5, 12.7),
    ground: new F(4.8, ql.h + 1.5, 14.3),
  };
function Yl() {
  let e = new L(),
    { w: t, h: n, d: r } = ql,
    i = J(`#f3f2ee`, 0.45),
    a = J(`#dfe7ec`, 0.55);
  (e.add(Y(t - 2, 3, r - 2, J(`#5b606b`, 0.6), 0, 0, 0)),
    e.add(Y(t, 2, r, i, 0, 3, 0)),
    e.add(Y(t, n - 5, 2, i, 0, 5, -r / 2 + 1)));
  for (let a of [-t / 2 + 1, t / 2 - 1]) e.add(Y(2, n - 5, r, i, a, 5, 0));
  (e.add(Y(t, 2, r, i, 0, n - 2, 0)),
    e.add(Y(t - 4, n - 9, 0.6, a, 0, 5, -r / 2 + 2.3)),
    e.add(Y(t - 4, 1, r - 6, J(`#cfe3ee`, 0.3), 0, 28, -1)));
  let o = new B(new H(3.6, 3.6, 13, 20), J(`#fbfbf8`, 0.35));
  o.position.set(-10, 11.5, -5);
  let s = new B(new H(2, 2.2, 2.4, 16), J(`#3d6fc4`, 0.4));
  (s.position.set(-10, 19.2, -5), e.add(o, s));
  for (let [t, n] of [
    [4, 2],
    [10.5, -3],
  ]) {
    let r = new B(new Xa(3.4, 18, 14), J(`#d8443a`, 0.4));
    (r.position.set(t, 8.3, n), e.add(r));
  }
  let c = new B(new H(3.4, 3.4, 8, 20), J(`#f0a53a`, 0.4));
  (c.position.set(-6, 33, -4), e.add(c));
  let l = J(`#fff6d8`, 0.4, 0, { emissive: `#ffe9a8`, emissiveIntensity: 0 });
  e.add(Y(10, 1.2, 4, l, 0, n - 3.2, -6));
  let u = new L();
  (u.position.set(-t / 2, 2, r / 2),
    u.add(Y(t, n - 2, 4, i, t / 2, 0, 2)),
    u.add(Y(t - 6, n - 10, 1, a, t / 2, 4, -0.5)),
    u.add(Y(2, 18, 2.6, J(`#c9ccd2`, 0.3, 0.6), t - 4, 20, 5.3)));
  let d = J(`#f8f6f0`, 0.5);
  (u.add(Y(10, 3, 3, d, 30, n - 2, 2.5)),
    e.add(u),
    e.add(Y(10, 3, 4, d, 10, n, 13.5)),
    (e.userData.hinge = u),
    (e.userData.knob = u),
    (e.userData.light = l),
    (e.userData.part = {
      name: `Fridge with a reed switch`,
      desc: `Drag the door to open it. While it’s shut, the magnet on the door holds the reed switch on top closed; open it and the switch springs open.`,
    }));
  let f = new I();
  return (
    f.position.set(10, n + 3, 13.5),
    e.add(f),
    (e.userData.anchors = { reed: f }),
    X(e, 0, n + 4, 0),
    e
  );
}
function Xl(e, t) {
  ((e.userData.hinge.rotation.y = -(t * Math.PI) / 180),
    (e.userData.light.emissiveIntensity = t > 12 ? 1.4 : 0));
}
var Zl = 25,
  Ql = { plus: new F(-37.9, Zl, 2.54), minus: new F(-37.9, Zl, -2.54) };
function $l() {
  let e = new L();
  e.add(Y(30, 15, 20, J(`#c9a26e`, 0.75)));
  let t = J(`#f2c23a`, 0.5);
  e.add(Y(32, 20, 17, t, 0, 15, 0));
  for (let t of [-9, 2]) {
    let n = new B(new H(1.5, 1.5, 17.2, 12), J(`#2b2f38`, 0.8));
    ((n.rotation.x = Math.PI / 2), n.position.set(t, 20, 0), e.add(n));
  }
  let n = new B(new H(9, 9, 20, 36), J(`#c7cbd2`, 0.3, 0.6));
  ((n.rotation.z = Math.PI / 2), n.position.set(-26, Zl, 0), e.add(n));
  let r = new B(new H(6.5, 6.5, 1.4, 28), J(`#2b2f38`, 0.6));
  ((r.rotation.z = Math.PI / 2), r.position.set(-36.7, Zl, 0), e.add(r));
  for (let t of Object.values(Ql))
    e.add(Y(0.8, 3.2, 1.8, J(`#d9d4ca`, 0.3, 0.7), t.x + 0.6, t.y - 1.6, t.z));
  e.add(Y(3.6, 5.4, 6, J(`#f1eee6`, 0.5), 8, 22.3, 11.5));
  let i = new L();
  i.position.set(8, Zl, 23.5);
  let a = new B(new H(22, 22, 18, 56), J(`#2a2c33`, 0.85));
  ((a.rotation.x = Math.PI / 2), i.add(a));
  let o = J(`#1c1e24`, 0.9);
  for (let e = 0; e < 20; e++) {
    let t = (e / 20) * Math.PI * 2,
      n = Y(1.6, 1, 18.4, o, 0, -0.5, 0),
      r = new L();
    ((r.rotation.z = t), (n.position.y = 22), r.add(n), i.add(r));
  }
  let s = Z(256, 256, (e, t, n) => {
      ((e.fillStyle = `#f2c23a`),
        e.beginPath(),
        e.arc(t / 2, n / 2, t / 2, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = `#7a5a12`));
      for (let r = 0; r < 6; r++) {
        let i = (r / 6) * Math.PI * 2;
        (e.beginPath(),
          e.arc(
            t / 2 + Math.cos(i) * 74,
            n / 2 + Math.sin(i) * 74,
            26,
            0,
            Math.PI * 2,
          ),
          e.fill());
      }
      ((e.fillStyle = `#d9a91f`),
        e.beginPath(),
        e.arc(t / 2, n / 2, 26, 0, Math.PI * 2),
        e.fill());
    }),
    c = new B(
      new Di(15, 40),
      new uo({ map: s, roughness: 0.5, transparent: !0 }),
    );
  ((c.position.z = 9.05), i.add(c));
  let l = Y(3, 6, 0.3, J(`#f3efe6`, 0.6), 0, 15.6, 9);
  return (
    i.add(l),
    e.add(i),
    (e.userData.wheel = i),
    (e.userData.part = {
      name: `TT gear motor and wheel`,
      desc: `A small DC motor with a gearbox, the kind robot cars use: slower and stronger than the bare motor. Reverse the current and it turns the other way.`,
    }),
    X(e, 0, 37, 0),
    e
  );
}
var eu = [`A-IB`, `A-IA`, `VCC`, `GND`, `B-IB`, `B-IA`],
  tu = Object.fromEntries(
    eu.map((e, t) => [e, new F(-12.5, 6.1, (t - 2.5) * q)]),
  ),
  nu = {
    A1: new F(13.2, 6.6, -8.89),
    A2: new F(13.2, 6.6, -3.81),
    B1: new F(13.2, 6.6, 3.81),
    B2: new F(13.2, 6.6, 8.89),
  };
function ru() {
  let e = new L(),
    t = Z(300, 240, (e, t, n) => {
      ((e.fillStyle = `#c63a32`),
        e.fillRect(0, 0, t, n),
        (e.fillStyle = `rgba(255,255,255,0.92)`),
        (e.textBaseline = `middle`),
        (e.font = `600 17px "Barlow Semi Condensed", sans-serif`),
        (e.textAlign = `left`),
        eu.forEach((t, r) => e.fillText(t, 42, n / 2 + (r - 2.5) * 25.4)),
        (e.font = `700 26px "Barlow Semi Condensed", sans-serif`),
        (e.textAlign = `center`),
        e.fillText(`L9110S`, 150, 120),
        (e.font = `600 18px "Barlow Semi Condensed", sans-serif`),
        e.fillText(`MOTOR A`, 196, 26),
        e.fillText(`MOTOR B`, 196, 214));
    }),
    n = J(`#a8302a`, 0.6),
    r = new B(new V(30, 1.6, 24), [
      n,
      n,
      J(`#ffffff`, 0.6, 0, { map: t }),
      n,
      n,
      n,
    ]);
  ((r.position.y = 2.8), e.add(r));
  for (let t of [-1, 1])
    for (let n of [-1, 1])
      e.add(Y(1.8, 2, 1.8, J(`#c9c4b8`, 0.5), t * 13, 0, n * 10));
  e.add(Y(2.5, 2.5, 15.24, qc, -12.5, 3.6, 0));
  for (let t of Object.values(tu)) e.add(Y(0.64, 6, 0.64, Jc, t.x, 3.6, t.z));
  for (let t of [-5, 5]) e.add(Y(4, 1.4, 5, J(`#25272f`, 0.5), 2, 3.6, t));
  let i = 9.5,
    a = J(`#cfd2d6`, 0.3, 0.7);
  for (let t of [-6.35, 6.35])
    e.add(Y(7, 8, 10.4, J(`#2f8f5b`, 0.5), i, 3.6, t));
  for (let t of Object.values(nu)) {
    let n = new B(new H(1.7, 1.7, 0.6, 20), a);
    (n.position.set(i, 11.9, t.z),
      e.add(n),
      e.add(Y(3, 0.3, 0.5, J(`#3b3e48`, 0.6), i, 12.2, t.z)),
      e.add(Y(0.3, 2.6, 2.6, J(`#16181e`, 0.9), 13.05, 5.3, t.z)));
  }
  return (
    (e.userData.part = {
      name: `L9110S motor driver`,
      desc: `Two H-bridges, one for each motor. For motor A, a signal on A-IA drives it one way and on A-IB the other; both low lets it stop.`,
    }),
    X(e, 0, 12, 0),
    e
  );
}
var iu = 4,
  au = {
    small: {
      stand: 36,
      w: 27,
      h: 27,
      glass: [25, 18, 3.6],
      screen: [22, 11, 12.6],
      holes: 11.2,
      name: `0.96" OLED display`,
      chip: `driven over I2C`,
    },
    big: {
      stand: 44,
      w: 35.4,
      h: 33.5,
      glass: [33, 23, 3.8],
      screen: [29.4, 14.7, 15.3],
      holes: 15,
      name: `1.3" OLED display`,
      chip: `driven by an SH1106 over I2C`,
    },
  },
  ou = (e) =>
    Object.fromEntries(
      [`GND`, `VCC`, `SCL`, `SDA`].map((t, n) => [
        t,
        new F((n - 1.5) * q, iu + e.h, -2.05),
      ]),
    ),
  su = ou(au.small),
  cu = ou(au.big);
function lu({ big: e = !1 } = {}) {
  let t = e ? au.big : au.small,
    n = iu + t.h,
    r = new L(),
    i = J(`#c9a26e`, 0.75);
  r.add(Y(t.stand, iu, 16, i, 0, 0, -1));
  for (let e of [1.6, -1.6]) r.add(Y(t.stand - 6, 3, 1.6, i, 0, iu, e));
  let a = `#1e3a5c`;
  (r.add(Y(t.w, t.h, 1.6, J(a, 0.55), 0, iu, 0)),
    r.add(Y(10.2, 2.5, 2.5, qc, 0, n - 2.5, -2.05)));
  let o = e ? cu : su;
  for (let e of Object.values(o)) r.add(Y(0.64, 6, 0.64, Jc, e.x, e.y, e.z));
  let s = Z(Math.round(t.w * 10), 50, (e, t, n) => {
      ((e.fillStyle = a),
        e.fillRect(0, 0, t, n),
        (e.fillStyle = `rgba(255,255,255,0.92)`),
        (e.font = `700 12px "Barlow Semi Condensed", sans-serif`),
        (e.textAlign = `center`),
        (e.textBaseline = `middle`),
        Object.keys(o).forEach((r, i) =>
          e.fillText(r, t / 2 + (i - 1.5) * 25.4, n / 2),
        ));
    }),
    c = new B(new Ka(t.w, 5), J(`#ffffff`, 0.6, 0, { map: s }));
  (c.position.set(0, n - 2.6, 0.81), r.add(c));
  let l = J(`#d9d4ca`, 0.35, 0.6);
  for (let e of [-t.holes, t.holes]) {
    let t = new B(new qa(0.9, 1.6, 20), l);
    (t.position.set(e, n - 2.2, 0.82), r.add(t));
  }
  let [u, d, f] = t.glass;
  r.add(Y(u, d, 0.8, J(`#0d1016`, 0.25), 0, iu + f, 1.2));
  let p = document.createElement(`canvas`);
  ((p.width = 256), (p.height = 128));
  let m = new Ci(p);
  ((m.colorSpace = Ke), (m.anisotropy = 8));
  let [h, g, _] = t.screen,
    v = new B(new Ka(h, g), new Jr({ map: m }));
  return (
    v.position.set(0, iu + _, 1.62),
    v.layers.set(1),
    r.add(v),
    (r.userData.screen = { canvas: p, tex: m }),
    (r.userData.part = {
      name: t.name,
      desc: `128 × 64 pixels that light up by themselves, ${t.chip}: two wires, SDA and SCL, carry everything it shows.`,
    }),
    X(r, 0, n, 1),
    uu(r, null),
    r
  );
}
function uu(e, t, n = 50) {
  let { canvas: r, tex: i } = e.userData.screen,
    a = r.getContext(`2d`);
  ((a.fillStyle = `#05070b`),
    a.fillRect(0, 0, r.width, r.height),
    t != null &&
      ((a.fillStyle = a.strokeStyle = `#d8f1ff`),
      (a.font = `700 52px "JetBrains Mono", monospace`),
      (a.textBaseline = `top`),
      a.fillText(`${t > 0 ? t : `--`} cm`, 0, 16),
      (a.lineWidth = 2),
      a.strokeRect(1, 93, 254, 26),
      a.fillRect(
        4,
        96,
        Math.round((Math.max(0, Math.min(t, n)) * 124) / n) * 2,
        20,
      )),
    (i.needsUpdate = !0));
}
function du() {
  let e = new L(),
    t = new L();
  (t.scale.setScalar(0.72), e.add(t));
  let n = new L(),
    r = new aa();
  (r.moveTo(-20, 3),
    r.lineTo(20, 3),
    r.quadraticCurveTo(21.5, 3, 21.5, 5),
    r.lineTo(21.2, 9),
    r.quadraticCurveTo(21, 10.2, 18.5, 10.6),
    r.lineTo(11.5, 11.2),
    r.lineTo(6.5, 17),
    r.quadraticCurveTo(5.8, 17.6, 4.6, 17.6),
    r.lineTo(-8.2, 17.6),
    r.quadraticCurveTo(-9.4, 17.6, -10, 16.9),
    r.lineTo(-14.6, 11.2),
    r.lineTo(-19.4, 10.6),
    r.quadraticCurveTo(-21.5, 10.2, -21.5, 8),
    r.lineTo(-21.5, 5),
    r.quadraticCurveTo(-21.5, 3, -20, 3));
  let i = J(`#e3604b`, 0.45),
    a = new B(
      new Ha(r, {
        depth: 16,
        bevelEnabled: !0,
        bevelSize: 1,
        bevelThickness: 1.2,
        bevelSegments: 3,
        curveSegments: 12,
      }),
      i,
    );
  ((a.position.z = -8), n.add(a));
  let o = J(`#f2ead7`, 0.35),
    s = new aa();
  (s.moveTo(-13.4, 11.6),
    s.lineTo(10.2, 11.6),
    s.lineTo(5.8, 16.4),
    s.lineTo(-9.4, 16.4),
    s.closePath());
  for (let e of [9.25, -9.25]) {
    let t = new B(new Ha(s, { depth: 0.3, bevelEnabled: !1 }), o);
    ((t.position.z = e - 0.15), n.add(t));
  }
  let c = Y(1.2, 5.2, 18.6, i, -1.2, 11.4, 0);
  n.add(c);
  let l = new B(new V(0.4, 4.4, 13), o);
  (l.position.set(8.9, 14.1, 0), (l.rotation.z = 0.86), n.add(l), t.add(n));
  let u = J(`#2a2d38`, 0.7),
    d = J(`#efe6d4`, 0.45),
    f = [];
  for (let e of [-12.5, 12.5])
    for (let n of [-8.6, 8.6]) {
      let r = new L(),
        i = new B(new H(4.4, 4.4, 3.2, 28), u);
      ((i.rotation.x = Math.PI / 2), r.add(i));
      let a = new B(new H(2, 2, 3.4, 20), d);
      ((a.rotation.x = Math.PI / 2),
        r.add(a),
        r.position.set(e, 4.4, n),
        t.add(r),
        f.push(r));
    }
  return (
    (e.userData.wheels = f),
    (e.userData.part = {
      name: `Toy car`,
      desc: `Something for the sensor to measure.`,
    }),
    X(t, -2, 18.8, 0),
    (e.userData.anchor = t.userData.anchor),
    e
  );
}
var fu = {
  220: { bands: [`red`, `red`, `brown`, `gold`], name: `220 Ω resistor` },
  1e3: { bands: [`brown`, `black`, `red`, `gold`], name: `1 kΩ resistor` },
  1e4: { bands: [`brown`, `black`, `orange`, `gold`], name: `10 kΩ resistor` },
};
function pu(e, t = 4 * q, { lift: n } = {}) {
  let r = fu[e] ?? fu[220];
  return Gc(r.bands, t, { name: r.name, lift: n });
}
function mu(e, t, n) {
  let r = new L();
  return (
    r.add(e),
    (r.userData.part = t),
    (r.userData.echo = n),
    (r.userData.anchor = e.userData.anchor),
    (r.userData.wheels = e.userData.wheels),
    r
  );
}
function hu() {
  let e = du();
  return (
    (e.rotation.y = 90 * kc),
    (e.position.z = 21.5 * 0.72),
    mu(
      e,
      { name: `Toy car`, desc: `Its flat bumper sends back a clear echo.` },
      { jitter: 0.4, miss: 0 },
    )
  );
}
function gu() {
  let t = new L(),
    n = Y(26, 21, 22, J(`#cfa36c`, 0.85), 0, 0, 11);
  (t.add(n),
    t.add(Y(26.4, 1.2, 10.6, J(`#c39660`, 0.85), 0, 21, 5.6)),
    t.add(Y(26.4, 1.2, 10.6, J(`#c39660`, 0.85), 0, 21, 66 / 4 - 0.1)),
    t.add(Y(5.5, 1.35, 22.2, J(`#e7d8b4`, 0.6), 0, 21, 11)));
  let r = Z(256, 200, (t, n, r) => {
      ((t.fillStyle = `#cfa36c`),
        t.fillRect(0, 0, n, r),
        (t.strokeStyle = `#7a5530`),
        (t.lineWidth = 7),
        t.strokeRect(40, 46, 176, 108),
        (t.fillStyle = `#7a5530`),
        (t.font = `700 40px "Barlow Semi Condensed", sans-serif`),
        (t.textAlign = `center`));
      let i = e(`THIS
SIDE UP`).split(`
`),
        a = Math.max(...i.map((e) => t.measureText(e).width));
      (a > 156 &&
        (t.font = `700 ${Math.floor(6240 / a)}px "Barlow Semi Condensed", sans-serif`),
        i.forEach((e, r) => t.fillText(e, n / 2, 92 + r * 44)));
    }),
    i = new B(new Ka(20.8, 14.7), J(`#ffffff`, 0.85, 0, { map: r }));
  return (
    (i.rotation.y = Math.PI),
    i.position.set(0, 21 / 2, -0.02),
    t.add(i),
    X(t, 0, 22.4, 11),
    mu(
      t,
      { name: `Cardboard box`, desc: `Flat and hard: a strong, steady echo.` },
      { jitter: 0.2, miss: 0 },
    )
  );
}
function _u() {
  let e = new L(),
    t = Z(512, 256, (e, t, n) => {
      let r = [
        `#e3604b`,
        `#f6efe1`,
        `#f0b53a`,
        `#f6efe1`,
        `#3d7be0`,
        `#f6efe1`,
      ];
      (r.forEach((i, a) => {
        ((e.fillStyle = i),
          e.fillRect((a * t) / r.length, 0, t / r.length + 1, n));
      }),
        (e.fillStyle = `#f6efe1`),
        e.fillRect(0, 0, t, 18),
        e.fillRect(0, n - 18, t, 18));
    }),
    n = new B(new Xa(11, 48, 24), J(`#ffffff`, 0.35, 0, { map: t }));
  return (
    n.position.set(0, 11, 11),
    n.rotation.set(0.5, 0.3, 0.2),
    e.add(n),
    X(e, 0, 22.5, 11),
    mu(
      e,
      {
        name: `Beach ball`,
        desc: `Round surfaces scatter the sound, so readings wobble.`,
      },
      { jitter: 2.6, miss: 0.08 },
    )
  );
}
function vu() {
  let e = new L(),
    t = J(`#ffffff`, 0.85, 0, {
      map: Z(460, 300, (e, t, n) => {
        ((e.fillStyle = `#e8dcc4`), e.fillRect(0, 0, t, n));
        for (let r = 0; r * 37 < n; r++) {
          let n = r % 2 ? -38 : 0;
          for (let i = n; i < t; i += 76)
            ((e.fillStyle =
              (r * 7 + Math.round(i / 76) * 3) % 5 == 0
                ? `#c56a4f`
                : `#d27a5c`),
              e.fillRect(i + 3, r * 37 + 3, 70, 31));
        }
      }),
    }),
    n = J(`#c97254`, 0.85),
    r = new B(new V(46, 30, 6), [n, n, J(`#d9c9ad`, 0.85), n, t, t]);
  return (
    r.position.set(0, 15, 3),
    e.add(r),
    X(e, 0, 30.5, 3),
    mu(
      e,
      {
        name: `Brick wall`,
        desc: `A big flat surface: the cleanest echo of all.`,
      },
      { jitter: 0, miss: 0 },
    )
  );
}
var yu = { car: hu, box: gu, ball: _u, wall: vu };
function bu(e = `car`) {
  return (yu[e] ?? hu)();
}
function xu(e = 36, t = 70) {
  let n = new L(),
    r = Z(e * 8, t * 8, (e, t, n) => {
      ((e.fillStyle = `#545861`), e.fillRect(0, 0, t, n));
      let r = 7,
        i = () => (r = (r * 16807) % 2147483647) / 2147483647;
      for (let r = 0; r < 1400; r++)
        ((e.fillStyle = `rgba(255,255,255,${0.03 + i() * 0.06})`),
          e.fillRect(i() * t, i() * n, 3, 3));
      e.fillStyle = `#f3efe4`;
      let a = 11.2;
      (e.fillRect(16, 16, a, n - 16),
        e.fillRect(t - 16 - a, 16, a, n - 16),
        e.fillRect(16, 16, t - 32, a),
        (e.font = `700 104px "Barlow Semi Condensed", sans-serif`),
        (e.textAlign = `center`),
        (e.textBaseline = `middle`),
        e.fillText(`1`, t / 2, n - 72));
    }),
    i = new B(new Ka(e, t), J(`#ffffff`, 0.92, 0, { map: r }));
  return (
    (i.rotation.x = -Math.PI / 2),
    i.position.set(0, -0.005, t / 2),
    (i.userData.noShadow = !0),
    n.add(i),
    (n.userData.part = {
      name: `Parking bay`,
      desc: `Bay 1. The sensor at its end measures how far in the car has come.`,
    }),
    X(n, 0, 0, t / 2),
    n
  );
}
var Su = { w: 44, d: 24, t: 1.6, pitch: 13 },
  Cu = Object.fromEntries(
    [`K1`, `K2`, `K3`, `GND`].map((e, t) => [
      e,
      new F((t - 1.5) * q, Su.t + 2.5, -Su.d / 2 + 3),
    ]),
  );
function wu() {
  let e = new L(),
    { w: t, d: n, t: r } = Su,
    i = Z(t * 12, n * 12, (e, t, n) => {
      ((e.fillStyle = `#25344f`),
        e.fillRect(0, 0, t, n),
        (e.fillStyle = `rgba(255,255,255,0.92)`),
        (e.font = `700 19px "Barlow Semi Condensed", sans-serif`),
        (e.textAlign = `center`),
        (e.textBaseline = `middle`),
        Object.keys(Cu).forEach((n, r) =>
          e.fillText(n, t / 2 + (r - 1.5) * q * 12, 6.4 * 12),
        ),
        (e.font = `700 22px "Barlow Semi Condensed", sans-serif`),
        [1, 2, 3].forEach((r, i) =>
          e.fillText(String(r), t / 2 + (i - 1) * Su.pitch * 12, n - 1.6 * 12),
        ));
    }),
    a = J(`#1f2b42`, 0.6),
    o = new B(new V(t, r, n), [
      a,
      a,
      J(`#ffffff`, 0.6, 0, { map: i }),
      a,
      a,
      a,
    ]);
  ((o.position.y = r / 2), e.add(o));
  let s = [];
  for (let t = 0; t < 3; t++) {
    let n = (t - 1) * Su.pitch,
      i = 3.2,
      a = Y(12, 3.6, 12, J(`#2a2d3a`, 0.5), n, r, i),
      o = Y(12.4, 0.5, 12.4, J(`#d9d6cf`, 0.32, 0.6), n, r + 3.6, i),
      c = new L();
    c.position.set(n, r + 4, i);
    let l = new B(
      new Ga(
        [
          [0, 0],
          [4.6, 0],
          [4.6, 2.6],
          [4.2, 3.3],
          [3.2, 3.6],
          [0, 3.7],
        ].map(([e, t]) => new P(e, t)),
        40,
      ),
      J(`#e3604b`, 0.4),
    );
    c.add(l);
    for (let e of [a, o, c, l]) e.userData.keyIndex = t;
    (e.add(a, o, c), s.push({ tile: c, y0: c.position.y, mat: l.material }));
  }
  e.add(Y(4 * q, 2.5, q, qc, 0, r, -n / 2 + 3));
  for (let t of Object.values(Cu)) e.add(Y(0.64, 6, 0.64, Jc, t.x, t.y, t.z));
  return (
    (e.userData.keys = s),
    (e.userData.part = {
      name: `Button pad`,
      desc: `Three push buttons: each joins its pin to GND while you hold it.`,
    }),
    X(e, -t / 2 + 1.4, r, -n / 2 + 1.4),
    jc(e, [-t / 2 + 1.3, r, 3.2], [t / 2 - 1.3, r, 3.2]),
    e
  );
}
function Tu(e, t) {
  e.userData.keys?.forEach((e, n) => e.mat.color.set(t[n] ?? `#e3604b`));
}
var Eu = { w: 22, d: 26, t: 1.6 },
  Du = Object.fromEntries(
    [`GND`, `OUT`, `VCC`].map((e, t) => [
      e,
      new F((t - 1) * q, Eu.t + 2.5, -Eu.d / 2 + 3),
    ]),
  );
function Ou() {
  let e = new L(),
    { w: t, d: n, t: r } = Eu,
    i = Z(t * 12, n * 12, (e, t, n) => {
      ((e.fillStyle = `#2b5aa8`),
        e.fillRect(0, 0, t, n),
        (e.fillStyle = `rgba(255,255,255,0.92)`),
        (e.font = `700 21px "Barlow Semi Condensed", sans-serif`),
        (e.textAlign = `center`),
        (e.textBaseline = `middle`),
        Object.keys(Du).forEach((n, r) =>
          e.fillText(n, t / 2 + (r - 1) * q * 12, 6.6 * 12),
        ));
    }),
    a = J(`#234b8c`, 0.6),
    o = new B(new V(t, r, n), [
      a,
      a,
      J(`#ffffff`, 0.6, 0, { map: i }),
      a,
      a,
      a,
    ]);
  ((o.position.y = r / 2),
    e.add(o),
    e.add(Y(10.5, 6.5, 10, J(`#3b62b3`, 0.5), 0, r, 4)));
  let s = new B(new H(4.6, 4.6, 1.2, 32), J(`#d9d6cf`, 0.32, 0.6));
  (s.position.set(0, r + 7.1, 4), e.add(s));
  let c = new L();
  c.position.set(0, r + 7.7, 4);
  let l = new B(
    new H(6.1, 6.4, 7, 24),
    J(`#2c3242`, 0.45, 0, { flatShading: !0 }),
  );
  ((l.position.y = 3.5), c.add(l));
  let u = new B(new H(5.4, 6.2, 0.9, 32), J(`#353b4d`, 0.4));
  ((u.position.y = 7.4), c.add(u));
  let d = Y(1.1, 0.4, 4.4, J(`#f4efe3`, 0.4), 0, 7.85, 2.6);
  (c.add(d), e.add(c), e.add(Y(3 * q, 2.5, q, qc, 0, r, -n / 2 + 3)));
  for (let t of Object.values(Du)) e.add(Y(0.64, 6, 0.64, Jc, t.x, t.y, t.z));
  return (
    (e.userData.knob = c),
    (e.userData.part = {
      name: `10 kΩ potentiometer`,
      desc: `Drag the knob to turn it: its OUT pin slides from 0 V to 3.3 V.`,
    }),
    X(e, -5, r + 12, 7.6),
    e
  );
}
function ku() {
  let e = new L(),
    t = J(`#d4d0c8`, 0.3, 0.65);
  for (let n of [-3.81, 3.81]) e.add(Y(0.6, 2.4, 0.6, t, n, -0.4, 0));
  let n = new B(new H(6, 6, 9.5, 48), J(`#25272f`, 0.45));
  ((n.position.y = 6.55), e.add(n));
  let r = new B(new Za(5.8, 0.25, 8, 48), J(`#2f323c`, 0.4));
  ((r.rotation.x = Math.PI / 2), (r.position.y = 11.3), e.add(r));
  let i = new B(new Di(1.2, 24), J(`#0d0f17`, 0.9));
  ((i.rotation.x = -Math.PI / 2), (i.position.y = 11.32), e.add(i));
  let a = Y(0.35, 0.05, 1.6, J(`#e9e4d8`, 0.5), -3.3, 11.3, 0);
  return (
    e.add(a, Y(1.6, 0.05, 0.35, J(`#e9e4d8`, 0.5), -3.3, 11.3, 0)),
    e.add(Y(12.6, 1.8, 12.6, J(`#1f2128`, 0.55), 0, 0, 0)),
    (e.userData.top = new F(0, 11.5, 0)),
    (e.userData.part = {
      name: `Piezo buzzer`,
      desc: `A disc that flexes when the pin toggles — that is the sound you hear.`,
    }),
    X(e, 0, 11.6, 0),
    e
  );
}
var Au = new F(-12.4, 3.4, 0);
function ju() {
  let e = new L(),
    t = J(`#3f67c4`, 0.4);
  (e.add(Y(22.8, 22.7, 12.2, t, 0, 0, 0)),
    e.add(Y(32.4, 2.5, 12.2, t, 0, 15.6, 0)));
  let n = new B(new H(6.1, 6.1, 4.2, 32), t);
  (n.position.set(5.6, 24.8, 0), e.add(n));
  let r = new B(new H(3.2, 3.2, 4.2, 24), t);
  (r.position.set(-1.4, 24.8, 0), e.add(r));
  let i = Z(400, 300, (e, t, n) => {
      ((e.fillStyle = `#3f67c4`),
        e.fillRect(0, 0, t, n),
        (e.fillStyle = `#f4efe3`),
        (e.font = `800 92px "Barlow Semi Condensed", sans-serif`),
        (e.textAlign = `center`),
        e.fillText(`SG90`, t / 2, 150),
        (e.font = `600 40px "Barlow Semi Condensed", sans-serif`),
        e.fillText(`MICRO SERVO 9g`, t / 2, 210));
    }),
    a = new B(new Ka(20, 13), J(`#ffffff`, 0.45, 0, { map: i }));
  (a.position.set(0, 7.5, 6.11), e.add(a), (e.userData.label = a));
  let o = new L();
  o.position.set(5.6, 26.9, 0);
  let s = new aa();
  (s.moveTo(-3.6, 0),
    s.absarc(0, 0, 3.6, Math.PI, 0, !1),
    s.lineTo(1.6, 17),
    s.absarc(0, 17, 1.6, 0, Math.PI, !1),
    s.closePath());
  for (let e = 0; e < 4; e++) {
    let t = new ia();
    (t.absarc(0, 5 + e * 3.6, 0.55, 0, Math.PI * 2, !0), s.holes.push(t));
  }
  let c = new Ha(s, { depth: 1.6, bevelEnabled: !1, curveSegments: 20 });
  c.rotateX(-Math.PI / 2);
  let l = new B(c, J(`#f4efe3`, 0.45));
  o.add(l);
  let u = new B(new H(1.2, 1.2, 0.6, 16), J(`#bfbdb8`, 0.3, 0.7));
  return (
    (u.position.y = 1.9),
    o.add(u),
    e.add(o),
    (e.userData.horn = o),
    e.add(Y(1, 3, 5.6, J(`#23262e`, 0.7), Au.x + 0.5, Au.y - 1.5, 0)),
    (e.userData.part = {
      name: `SG90 servo`,
      desc: `A motor with gears and a sensor inside: you tell it an angle, it holds it.`,
    }),
    X(e, 5.6, 29, 0),
    e
  );
}
var Mu = 14,
  Nu = 56,
  Pu = { pivot: Mu, half: 3, thick: 2.6, start: 2, length: Nu },
  Fu = new F(-30.5, Mu, -5.6),
  Iu = new F(Au.y, 0, Au.x - 1.5).add(Fu);
function Lu() {
  let e = new L(),
    t = J(`#c9a26e`, 0.75);
  (e.add(Y(33, 3, 24.5, t, -20.5, 0, -5.25)),
    e.add(Y(24, 4.9, 20, J(`#f0b53a`, 0.5), -19, 3, -6)),
    e.add(Y(24.3, 1.2, 20.3, J(`#2b2f38`, 0.6), -19, 4.4, -6)));
  let n = ju();
  (n.quaternion.setFromRotationMatrix(
    new Ut().makeBasis(new F(0, 0, 1), new F(1, 0, 0), new F(0, 1, 0)),
  ),
    n.position.copy(Fu),
    (n.userData.label.rotation.z = Math.PI / 2),
    e.add(n));
  let r = n.userData.horn,
    i = J(`#e0463c`, 0.45),
    a = J(`#f4efe3`, 0.5),
    o = Nu / 6;
  for (let e = 0; e < 6; e++) {
    let t = new B(new V(2 * Pu.half, Pu.thick, o), e % 2 ? a : i);
    (t.position.set(0, 3.6, -Pu.start - o * (e + 0.5)), r.add(t));
  }
  let s = new B(new H(4.2, 4.2, 2.8, 24), J(`#2b2f38`, 0.5));
  ((s.position.y = 3.6), r.add(s));
  let c = Pu.start + Nu - 2,
    l = Mu - Pu.half - 0.2;
  (e.add(Y(2.4, l, 2.4, J(`#e9e3d6`, 0.6), 0, 0, c)),
    e.add(Y(7, 1.6, 6, J(`#2b2f38`, 0.6), 0, 0, c)));
  for (let t of [-2.6, 2.6]) e.add(Y(1, 3.2, 2.4, J(`#f0b53a`, 0.5), t, l, c));
  return (
    (e.userData.horn = r),
    (e.userData.part = {
      name: `Barrier gate`,
      desc: `An SG90 servo with a striped boom on its horn: the angle the sketch writes lifts the boom.`,
    }),
    X(e, -16, 22, -6),
    Ru(e, 0),
    e
  );
}
function Ru(e, t) {
  let n = e.userData.horn;
  (n && (n.rotation.y = -Math.PI / 2 - (t * Math.PI) / 180),
    (e.userData.angle = t));
}
function zu() {
  let e = new L();
  (e.add(Y(16, 3, 20, J(`#c9a26e`, 0.75), 0, 0, 8)),
    e.add(Y(14, 7, 8, J(`#2b2f38`, 0.6), 0, 3, 13.5)),
    e.add(Y(3.6, 1.4, 2, J(`#efe6d4`, 0.5), -2.6, 10, 13.5)));
  let t = J(`#e8392e`, 0.3, 0, { emissive: `#e8392e`, emissiveIntensity: 1.2 });
  (e.add(Y(1.6, 0.8, 1.6, t, 3.4, 10, 13.5)),
    e.add(Y(4, 6.6 - 3 - 1.2, 4, J(`#e9e3d6`, 0.6), 0, 3, 5)),
    e.add(Y(9, 1.2, 10, J(`#22304c`, 0.6), 0, 6.6 - 1.2, 5.4)));
  let n = J(`#c9a14a`, 0.35, 0.7),
    r = new B(new H(2.4, 2.4, 8, 24), n);
  ((r.rotation.x = Math.PI / 2), r.position.set(0, 9, 4.4), e.add(r));
  let i = new B(new H(2.7, 2.7, 1.4, 24), J(`#2b2f38`, 0.5));
  ((i.rotation.x = Math.PI / 2), i.position.set(0, 9, 0.7), e.add(i));
  for (let [t, n] of [
    [-1.2, `#d64a3a`],
    [1.2, `#23262e`],
  ])
    e.add(Y(0.7, 0.7, 4.6, J(n, 0.45), t, 6.6, 11.1));
  let a = new L();
  a.position.set(0, 9, 0);
  let o = (e, t, n) => {
    let r = new B(
      new H(e, e, 1, 10, 1, !0).rotateX(Math.PI / 2).translate(0, 0, -0.5),
      new Jr({ color: t, transparent: n < 1, opacity: n, depthWrite: n === 1 }),
    );
    (r.layers.set(1), (r.userData.noShadow = !0), a.add(r));
  };
  (o(0.28, `#ff2c1c`, 1), o(0.95, `#ff5a40`, 0.22), e.add(a));
  let s = Nc(`#ff3a26`, 9);
  return (
    (s.material.opacity = 0.95),
    s.position.set(0, 9, 0),
    e.add(s),
    (e.userData.laser = { beam: a, spot: s }),
    (e.userData.part = {
      name: `Laser module`,
      desc: `A KY-008 red laser on its own coin cells. It shines straight across the road at the receiver.`,
    }),
    X(e, 0, 15, 6),
    Bu(e, 40),
    e
  );
}
function Bu(e, t) {
  let n = e.userData.laser;
  n && ((n.beam.scale.z = Math.max(0.01, t)), (n.spot.position.z = -t));
}
var Vu = { w: 14, h: 20, t: 1.6, z: -2.2 },
  Hu = Object.fromEntries(
    [`VCC`, `GND`, `OUT`].map((e, t) => [
      e,
      new F((t - 1) * q, 3 + Vu.h + 2.5, Vu.z),
    ]),
  ),
  Uu = new F(0, 9, Vu.z + Vu.t / 2 + 0.6);
function Wu() {
  let e = new L(),
    { w: t, h: n, t: r, z: i } = Vu;
  e.add(Y(18, 3, 10, J(`#c9a26e`, 0.75), 0, 0, -1));
  let a = Z(t * 12, n * 12, (e, t, n) => {
      ((e.fillStyle = `#2b3a5c`),
        e.fillRect(0, 0, t, n),
        (e.fillStyle = `rgba(255,255,255,0.92)`),
        (e.font = `700 12px "Barlow Semi Condensed", sans-serif`),
        (e.textAlign = `center`),
        (e.textBaseline = `middle`),
        Object.keys(Hu).forEach((n, r) =>
          e.fillText(n, t / 2 + (r - 1) * q * 12, 2.2 * 12),
        ));
    }),
    o = J(`#22304c`, 0.6),
    s = new B(new V(t, n, r), [
      o,
      o,
      o,
      o,
      J(`#ffffff`, 0.6, 0, { map: a }),
      o,
    ]);
  (s.position.set(0, 3 + n / 2, i), e.add(s));
  let c = i + r / 2,
    l = new B(new H(3, 3, 6, 24, 1, !0), J(`#23262e`, 0.6, 0, { side: 2 }));
  ((l.rotation.x = Math.PI / 2), l.position.set(0, 9, c + 3), e.add(l));
  let u = new B(new H(2.2, 2.2, 1, 20), J(`#4a2a2a`, 0.35));
  ((u.rotation.x = Math.PI / 2), u.position.set(0, 9, c + 0.5), e.add(u));
  let d = `#3fd46a`,
    f = J(d, 0.3, 0, { emissive: d, emissiveIntensity: 0.06 }),
    p = Y(1.8, 1.2, 1, f, 4.6, 15, c + 0.4);
  e.add(p);
  let m = Nc(d, 12);
  (m.position.set(4.6, 15.6, c + 1.4),
    e.add(m),
    e.add(Y(2.6, 1.1, 0.8, J(`#25272f`, 0.5), -3.6, 15, c + 0.4)),
    e.add(Y(3 * q, 2.5, q, qc, 0, 3 + n, i)));
  for (let t of Object.values(Hu)) e.add(Y(0.64, 6, 0.64, Jc, t.x, 3 + n, t.z));
  return (
    (e.userData.receiver = { lens: f, glow: m }),
    (e.userData.part = {
      name: `Laser receiver`,
      desc: `A light sensor tuned to the laser: OUT is HIGH while the beam reaches it and LOW when something cuts it.`,
    }),
    X(e, 0, 11, c + 6),
    e
  );
}
function Gu(e, t) {
  let n = e.userData.receiver;
  n &&
    ((n.lens.emissiveIntensity = t ? 1.4 : 0.06),
    (n.glow.material.opacity = t ? 0.75 : 0));
}
function Ku(e, t, n = 0) {
  let r = new L(),
    i = new Jr({
      map: Z(Math.round(e * 6), Math.round(t * 6), (t, r, i) => {
        let a = t.createLinearGradient(0, 0, r, 0);
        (a.addColorStop(0, `rgba(157,150,140,0)`),
          a.addColorStop(84 / r, `rgba(157,150,140,1)`),
          a.addColorStop(1 - 84 / r, `rgba(157,150,140,1)`),
          a.addColorStop(1, `rgba(157,150,140,0)`),
          (t.fillStyle = a),
          t.fillRect(0, 0, r, i),
          (t.globalCompositeOperation = `source-atop`),
          (t.fillStyle = `rgba(245,239,227,0.9)`),
          t.fillRect(0, 2.2 * 6, r, 1.1 * 6),
          t.fillRect(0, i - 3.3 * 6, r, 1.1 * 6));
        let o = (e / 2 + n) * 6;
        t.fillRect(o, 24, 10.8, i - 48);
        let s = (e) => {
          (t.beginPath(),
            t.moveTo(e, i / 2),
            t.lineTo(e + 42, i / 2 - 30),
            t.lineTo(e + 42, i / 2 - 12),
            t.lineTo(e + 90, i / 2 - 12),
            t.lineTo(e + 90, i / 2 + 12),
            t.lineTo(e + 42, i / 2 + 12),
            t.lineTo(e + 42, i / 2 + 30),
            t.closePath(),
            t.fill());
        };
        (s(o + 240), s(o + 492));
      }),
      transparent: !0,
      depthWrite: !1,
    }),
    a = new B(new Ka(e, t), i);
  return (
    (a.rotation.x = -Math.PI / 2),
    (a.position.y = 0.02),
    a.layers.set(1),
    (a.renderOrder = -1.5),
    (a.userData.noShadow = !0),
    r.add(a),
    r
  );
}
var qu = {
  length: 45,
  half: 9.2,
  wheel: 4.4,
  profile: [
    [0, 10],
    [4, 11.6],
    [11, 12.2],
    [16, 18],
    [18, 18.6],
    [30.7, 18.6],
    [32.5, 17.9],
    [37.1, 12.2],
    [41.9, 11.6],
    [44, 9],
    [45, 9],
  ],
};
function Ju() {
  let e = new L(),
    t = du();
  return (
    t.scale.setScalar(1 / 0.72),
    (t.rotation.y = Math.PI),
    (t.position.x = qu.length / 2),
    e.add(t),
    (e.userData.wheels = t.userData.wheels),
    (e.userData.part = {
      name: `Toy car`,
      desc: `Drag it up the road: when it cuts the laser beam, the barrier lifts for it.`,
    }),
    X(e, qu.length / 2, 21, 0),
    e
  );
}
function Yu(e) {
  let t = qu.profile;
  if (e <= 0 || e >= qu.length) return 0;
  for (let n = 1; n < t.length; n++)
    if (e <= t[n][0]) {
      let [r, i] = t[n - 1],
        [a, o] = t[n];
      return i + ((o - i) * (e - r)) / (a - r);
    }
  return 0;
}
var Xu = new F(0, 3, 5.6),
  Zu = { w: 40, h: 26, t: 1.8 },
  Qu = 4.6,
  $u = 3.6,
  ed = new F(8, 7.1, 32),
  td = { depth: 9, gap: 0.3, eye: 2.4 },
  nd = Object.fromEntries(
    [`R`, `L`, `GND`, `VCC`].map((e, t) => [
      e,
      ed.clone().setZ(ed.z + (t - 1.5) * q),
    ]),
  ),
  rd = new F(0, Au.y, -(Au.x - 1.5)).add(Xu),
  id = Xu.y + 26.9,
  ad = new F(0, id + Qu + Zu.h + 5.6, 2);
function od() {
  return Z(Zu.w * 12, Zu.h * 12, (e, t, n) => {
    ((e.fillStyle = `#d5d9de`), e.fillRect(0, 0, t, n));
    let r = 1.6 * 12,
      i = (t - 2 * r) / 5,
      a = (n - 2 * r) / 3;
    for (let t = 0; t < 5; t++)
      for (let n = 0; n < 3; n++) {
        let o = r + t * i,
          s = r + n * a;
        ((e.fillStyle = `#243a75`),
          e.fillRect(o + 2, s + 2, i - 4, a - 4),
          (e.fillStyle = `rgba(160, 182, 230, 0.35)`));
        for (let t = 1; t < 8; t++)
          e.fillRect(o + 2, s + (t * a) / 8, i - 4, 1);
        ((e.fillStyle = `rgba(214, 222, 238, 0.85)`),
          e.fillRect(o + i * 0.3, s + 2, 3, a - 4),
          e.fillRect(o + i * 0.7, s + 2, 3, a - 4));
      }
  });
}
function sd() {
  let e = new L(),
    t = J(`#c9a26e`, 0.75);
  e.add(Y(30, 3, 52, t, 3, 0, 12));
  let n = ju();
  (n.position.copy(Xu), (n.rotation.y = Math.PI / 2), e.add(n));
  let r = n.userData.horn,
    i = new L();
  ((i.rotation.y = -Math.PI / 2), r.add(i));
  let a = J(`#9aa1ab`, 0.45, 0.3);
  i.add(Y(8, 3, 3, a, 0, 1.6, 0));
  let o = J(`#cfd3d8`, 0.35, 0.6),
    s = J(`#ffffff`, 0.35, 0.1, {
      map: od(),
      emissive: `#7fa2f0`,
      emissiveIntensity: 0,
    }),
    c = new B(new V(Zu.w, Zu.h, Zu.t), [o, o, o, o, s, J(`#8b929c`, 0.6)]);
  (c.position.set(0, Qu + Zu.h / 2, 0), i.add(c));
  let l = Qu + Zu.h,
    u = J(`#2b2f38`, 0.55),
    d = Z(256, 160, (e, t, n) => {
      ((e.fillStyle = `#2b2f38`),
        e.fillRect(0, 0, t, n),
        (e.fillStyle = `rgba(255,255,255,0.85)`),
        (e.font = `700 26px "Barlow Semi Condensed", sans-serif`),
        (e.textAlign = `center`),
        (e.textBaseline = `middle`),
        e.fillText(`L`, t / 2 - $u * 16, n - 20),
        e.fillText(`R`, t / 2 + $u * 16, n - 20));
    }),
    f = new B(new V(16, 10, 4), [
      u,
      u,
      u,
      u,
      J(`#ffffff`, 0.55, 0, { map: d }),
      u,
    ]);
  (f.position.set(0, l + 5, -1), i.add(f));
  let p = [-3.6, $u].map((e) => {
    let t = J(`#ffffff`, 0.45, 0, { map: Jd() }),
      n = new B(new H(td.eye, td.eye, 1, 28), [
        J(`#c98d4f`, 0.5),
        t,
        J(`#b97f45`, 0.5),
      ]);
    return (
      (n.rotation.x = Math.PI / 2),
      n.position.set(e, l + 5.6, 1.5),
      i.add(n),
      t
    );
  });
  i.add(Y(1, 10, td.depth, u, 0, l, 1 + td.depth / 2));
  let m = J(`#23262e`, 0.6),
    h = (e, t) => {
      let n = new Ri(e.map((e) => new F(...e)));
      t.add(new B(new Qa(n, 64, 0.8, 8, !1), m));
    };
  h(
    [
      [0, l + 2, -3.2],
      [0, l - 1, -2.6],
      [0, 6.6, -2.6],
      [0, 2.6, -0.4],
    ],
    i,
  );
  let g = id,
    _ = -7.6;
  h(
    [
      [0, g + 2.6, 0],
      [-4.2, g + 1.6, 0],
      [_, g - 2.5, 1],
      [_, 14, 2],
      [_, 5.2, 6],
      [-6, 4.2, 20],
      [-1, 4.2, ed.z - 1],
      [ed.x - 2.6, 4.2, ed.z],
    ],
    e,
  );
  let v = { w: 9, d: 13 },
    y = ed.x + 1.6,
    b = Z(v.w * 12, v.d * 12, (e, t, n) => {
      ((e.fillStyle = `#2b3a5c`),
        e.fillRect(0, 0, t, n),
        (e.fillStyle = `rgba(255,255,255,0.92)`),
        (e.font = `700 13px "Barlow Semi Condensed", sans-serif`),
        (e.textAlign = `left`),
        (e.textBaseline = `middle`),
        Object.keys(nd).forEach((t, n) =>
          e.fillText(
            t,
            (ed.x + 1.7 - (y - v.w / 2)) * 12,
            ((n - 1.5) * q + v.d / 2) * 12,
          ),
        ));
    }),
    x = J(`#22304c`, 0.6),
    S = new B(new V(v.w, 1.6, v.d), [
      x,
      x,
      J(`#ffffff`, 0.6, 0, { map: b }),
      x,
      x,
      x,
    ]);
  (S.position.set(y, 3.8, ed.z),
    e.add(S),
    e.add(Y(q, 2.5, 4 * q, qc, ed.x, 4.6, ed.z)));
  for (let t of Object.values(nd)) e.add(Y(0.64, 6, 0.64, Jc, t.x, 4.6, t.z));
  let C = new I();
  return (
    C.position.set(0, l + 9, 2),
    i.add(C),
    (e.userData.tracker = {
      horn: r,
      cells: s,
      eyes: p,
      base: new R(`#ffffff`),
      shade: new R(`#3a3f4b`),
    }),
    (e.userData.anchors = { eyes: C }),
    (e.userData.part = {
      name: `Solar tracker`,
      desc: `A small solar panel on an SG90 servo, with two light sensors on top. Click it for the dead zone and the speed.`,
    }),
    X(e, 6.2, 16, 6),
    cd(e, 90),
    e
  );
}
function cd(e, t) {
  let n = e.userData.tracker;
  n &&
    ((n.horn.rotation.y = ((t - 90) * Math.PI) / 180), (e.userData.angle = t));
}
function ld(e, t, n, r) {
  let i = e.userData.tracker;
  i &&
    ([t, n].forEach((e, t) =>
      i.eyes[t].color.copy(i.shade).lerp(i.base, Math.max(0, Math.min(1, e))),
    ),
    (i.cells.emissiveIntensity = 0.35 * Math.max(0, r)));
}
var ud = new F(0, 35, 0);
function dd() {
  let e = new L();
  e.add(Y(14, 3, 10, J(`#2b2f38`, 0.6), 0, 3, 0));
  let t = J(`#cfd3d8`, 0.35, 0.6),
    n = new B(new H(1.3, 1.3, 21, 16), t);
  ((n.position.y = 16.5), e.add(n));
  let r = new B(new H(3.6, 2.4, 3.4, 24), J(`#2b2f38`, 0.5));
  ((r.position.y = 28.7), e.add(r));
  let i = new B(
    new Xa(5.4, 32, 24),
    J(`#ffe7a3`, 0.4, 0, { emissive: `#ffc94a`, emissiveIntensity: 1.3 }),
  );
  (i.position.copy(ud), (i.userData.noShadow = !0), e.add(i));
  let a = Nc(`#ffd36b`, 46);
  ((a.material.opacity = 0.85), a.position.copy(ud), e.add(a));
  let o = new H(3, 11, 1, 40, 1, !0);
  o.translate(0, -0.5, 0);
  let s = tf(`#ffd36b`);
  s.uniforms.opacity.value = 0.32;
  let c = new B(o, s);
  return (
    c.position.copy(ud),
    c.layers.set(1),
    (c.renderOrder = 2),
    (c.userData.noShadow = !0),
    e.add(c),
    (e.userData.sun = { beam: c }),
    (e.userData.part = {
      name: `The sun`,
      desc: `A bright bulb standing in for the sun. Drag it along its track, from sunrise to sunset.`,
    }),
    X(e, 0, ud.y + 7, 0),
    e
  );
}
var fd = new F(0, -1, 0);
function pd(e, t) {
  let n = e.userData.sun;
  if (!n) return;
  let r = e.localToWorld(ud.clone()),
    i = t.clone().sub(r),
    a = Math.max(1, i.length() - 4);
  (n.beam.quaternion.setFromUnitVectors(fd, i.normalize()),
    n.beam.scale.set(1, a, 1));
}
function md(t) {
  let n = new L(),
    r = J(`#c9a26e`, 0.75),
    i = Z(Math.round(t * 8), 96, (t, n, r) => {
      ((t.fillStyle = `#d4b07c`),
        t.fillRect(0, 0, n, r),
        (t.fillStyle = `#a77d4a`),
        t.fillRect(48, r / 2 - 3.2, n - 96, 6.4));
      for (let e = 0; e <= 12; e++)
        t.fillRect(
          64 + (e * (n - 128)) / 12 - 1.6,
          r / 2 + 9.6,
          3.2,
          (e % 6 ? 1.6 : 2.8) * 8,
        );
      ((t.fillStyle = `#7a5530`),
        (t.font = `700 27.2px "Barlow Semi Condensed", sans-serif`),
        (t.textBaseline = `middle`),
        (t.textAlign = `left`),
        t.fillText(e(`WEST`), 36, r / 2 - 24),
        (t.textAlign = `right`),
        t.fillText(e(`EAST`), n - 36, r / 2 - 24));
    }),
    a = new B(new V(t, 3, 12), [
      r,
      r,
      J(`#ffffff`, 0.75, 0, { map: i }),
      r,
      r,
      r,
    ]);
  ((a.position.y = 1.5), n.add(a));
  for (let e of [-1, 1])
    n.add(Y(3, 6, 12, J(`#2b2f38`, 0.6), e * (t / 2 - 1.5), 0, 0));
  return (
    (n.userData.part = {
      name: `Track`,
      desc: `The sun slides along it, from sunrise in the east to sunset in the west.`,
    }),
    n
  );
}
var hd = new F(0, 3, -5.6),
  gd = hd.y + 26.9,
  _d = new F(0, Au.y, Au.x - 1.5).add(hd),
  vd = 16.6,
  yd = -1.5,
  bd = new F(0, gd + vd, 11.3),
  xd = Object.fromEntries(
    [`VCC`, `Trig`, `Echo`, `Gnd`].map((e, t) => [e, 3.81 - t * q]),
  ),
  Sd = new F(0, 1, 0);
function Cd(e) {
  let t = ((90 - e) * Math.PI) / 180,
    n = new F(0, 29.05, yd).applyAxisAngle(Sd, t);
  return (
    (n.y += gd),
    {
      centre: n,
      back: new F(0, 0, -1).applyAxisAngle(Sd, t),
      side: new F(1, 0, 0).applyAxisAngle(Sd, t),
      turn: t,
    }
  );
}
function wd() {
  let e = new L(),
    t = J(`#c9a26e`, 0.75);
  e.add(Y(22, 3, 38, t, 0, 0, -5.6));
  let n = ju();
  (n.position.copy(hd), (n.rotation.y = -Math.PI / 2), e.add(n));
  let r = n.userData.horn,
    i = new L();
  ((i.rotation.y = Math.PI / 2), r.add(i));
  let a = J(`#9aa1ab`, 0.45, 0.3);
  i.add(Y(12, 1.6, 9, a, 0, 1.6, -1));
  let o = J(`#2a2d3a`, 0.5);
  (i.add(Y(8, 5.400000000000001, 1.4, o, 0, 3.2, -3)),
    i.add(Y(8, 5.400000000000001, 1.4, o, 0, 3.2, 0)));
  let s = Hl();
  (s.rotation.set(-Math.PI / 2, 0, Math.PI),
    s.position.set(0, vd, yd),
    i.add(s));
  let c = new I();
  return (
    c.position.set(0, 20.6, 10.5),
    i.add(c),
    (e.userData.radar = { horn: r }),
    (e.userData.anchors = { sensor: c }),
    (e.userData.part = {
      name: `Ultrasonic radar`,
      desc: `An HC-SR04P on an SG90 servo, sweeping from side to side. Click it for how long it waits at each degree.`,
    }),
    X(e, 0, 22, -10),
    Td(e, 90),
    e
  );
}
function Td(e, t) {
  let n = e.userData.radar;
  n &&
    ((n.horn.rotation.y = ((90 - t) * Math.PI) / 180), (e.userData.angle = t));
}
function Ed(e, t, n = [], r = 50) {
  let i = e.userData.screen;
  if (!i) return;
  let a = i.canvas.getContext(`2d`);
  if (
    ((a.fillStyle = `#05070b`),
    a.fillRect(0, 0, i.canvas.width, i.canvas.height),
    t != null)
  ) {
    (a.save(),
      a.scale(2, 2),
      (a.strokeStyle = a.fillStyle = `#d8f1ff`),
      (a.lineWidth = 1));
    for (let e of [63, 31])
      (a.beginPath(), a.arc(64, 0, e, 0, Math.PI), a.stroke());
    let e = (t * Math.PI) / 180;
    (a.beginPath(),
      a.moveTo(64, 0),
      a.lineTo(64 + 63 * Math.cos(e), 63 * Math.sin(e)),
      a.stroke());
    for (let e = 20; e <= 160; e++) {
      let t = n[e];
      if (!t || t >= r) continue;
      let i = (t * 63) / r,
        o = (e * Math.PI) / 180;
      a.fillRect(
        Math.round(64 + i * Math.cos(o)) - 1,
        Math.round(i * Math.sin(o)) - 1,
        3,
        3,
      );
    }
    a.restore();
  }
  i.tex.needsUpdate = !0;
}
var Dd = `#2fbf71`;
function Od() {
  let e = new L(),
    t = Z(512, 256, (e, t, n) => {
      let r = 20 * kc,
        i = 160 * kc;
      ((e.strokeStyle = `rgba(47, 191, 113, 0.55)`), (e.lineWidth = 3));
      for (let a of [n - 3, n / 2])
        (e.beginPath(), e.arc(t / 2, 0, a, r, i), e.stroke());
      e.lineWidth = 2;
      for (let r of [20, 30, 60, 90, 120, 150, 160]) {
        let i = r * kc;
        ((e.strokeStyle =
          r % 30 ? `rgba(47, 191, 113, 0.5)` : `rgba(47, 191, 113, 0.3)`),
          e.beginPath(),
          e.moveTo(t / 2, 0),
          e.lineTo(t / 2 + (n - 3) * Math.cos(i), (n - 3) * Math.sin(i)),
          e.stroke());
      }
    }),
    n = new B(
      new Ka(2, 1),
      new Jr({ map: t, transparent: !0, depthWrite: !1 }),
    );
  ((n.rotation.x = -Math.PI / 2), n.position.set(0, 0.03, 0.5));
  let r = new Di(1, 112, 20 * kc, 140 * kc),
    i = new co({
      transparent: !0,
      depthWrite: !1,
      side: 2,
      uniforms: {
        color: { value: new R(Dd) },
        lead: { value: Math.PI / 2 },
        dir: { value: 1 },
        trail: { value: 0.5 },
      },
      vertexShader: `
      varying vec2 vPos;
      void main() {
        vPos = position.xy;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
      fragmentShader: `
      uniform vec3 color;
      uniform float lead;
      uniform float dir;
      uniform float trail;
      varying vec2 vPos;
      void main() {
        float th = atan(vPos.y, vPos.x);
        float behind = (lead - th) * dir;
        float a = behind >= 0.0 ? pow(max(0.0, 1.0 - behind / trail), 2.0) * 0.32 : 0.0;
        a += (1.0 - smoothstep(0.0, 0.02, abs(lead - th))) * 0.45;
        a *= smoothstep(1.0, 0.97, length(vPos));
        gl_FragColor = vec4(color, a);
        #include <colorspace_fragment>
      }
    `,
    }),
    a = new B(r, i);
  ((a.rotation.x = Math.PI / 2), (a.position.y = 0.04));
  let o = new L();
  o.add(n, a);
  for (let e of [n, a])
    (e.layers.set(1), (e.renderOrder = -1.4), (e.userData.noShadow = !0));
  e.add(o);
  let s = new L();
  return (
    e.add(s),
    (e.userData.scope = {
      disc: o,
      sweep: i,
      sweepMesh: a,
      echoes: s,
      pool: [],
    }),
    kd(e, 100, 90, 1, !1),
    e
  );
}
function kd(e, t, n, r, i = !0) {
  let a = e.userData.scope;
  a &&
    (a.disc.scale.set(t, 1, t),
    (a.sweepMesh.visible = i),
    (a.sweep.uniforms.lead.value = (n * Math.PI) / 180),
    (a.sweep.uniforms.dir.value = r));
}
function Ad(e, t, n) {
  let r = e.userData.scope;
  if (!r) return;
  let i = r.pool.find((e) => e.material.opacity <= 0.01);
  (i || ((i = Nc(Dd, 7)), r.echoes.add(i), r.pool.push(i)),
    i.position.set(t, 0.6, n),
    (i.material.opacity = 1));
}
function jd(e, t) {
  for (let n of e.userData.scope?.pool ?? [])
    n.material.opacity = Math.max(0, n.material.opacity * (1 - t));
}
function Md() {
  let e = new L(),
    t = du();
  return (
    t.scale.setScalar(1 / 0.72),
    (t.rotation.y = Math.PI),
    e.add(t),
    (e.userData.wheels = t.userData.wheels),
    (e.userData.part = {
      name: `Toy car`,
      desc: `Drag it along the road to see its echo move across the radar.`,
    }),
    X(e, 0, 21, 0),
    e
  );
}
var Nd = [`1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `*`, `0`, `#`],
  Pd = { w: 44, d: 58, t: 1.2, pitch: 11.5 },
  Fd = Object.fromEntries(
    [`C1`, `C2`, `C3`, `R1`, `R2`, `R3`, `R4`].map((e, t) => [
      e,
      new F((t - 3) * q, Pd.t + 2.5, -Pd.d / 2 + 3),
    ]),
  );
function Id() {
  let e = new L(),
    { w: t, d: n, t: r, pitch: i } = Pd,
    a = Z(t * 12, n * 12, (e, t, n) => {
      ((e.fillStyle = `#1f2433`),
        e.fillRect(0, 0, t, n),
        (e.fillStyle = `rgba(255,255,255,0.9)`),
        (e.font = `700 17px "Barlow Semi Condensed", sans-serif`),
        (e.textAlign = `center`),
        (e.textBaseline = `middle`),
        Object.keys(Fd).forEach((n, r) =>
          e.fillText(n, t / 2 + (r - 3) * q * 12, 6.6 * 12),
        ),
        (e.strokeStyle = `rgba(255,255,255,0.25)`),
        (e.lineWidth = 6),
        e.strokeRect(30, 9.2 * 12, t - 60, n - 11.7 * 12));
    }),
    o = J(`#171b27`, 0.6),
    s = new B(new V(t, r, n), [
      o,
      o,
      J(`#ffffff`, 0.6, 0, { map: a }),
      o,
      o,
      o,
    ]);
  ((s.position.y = r / 2), e.add(s));
  let c = J(`#d9d5cc`, 0.5),
    l = Nd.map((t, a) => {
      let o = ((a % 3) - 1) * i,
        s = -n / 2 + 10 + i / 2 + Math.floor(a / 3) * i,
        l = t === `*` || t === `#`,
        u = Z(96, 96, (e, n, r) => {
          ((e.fillStyle = l ? `#f0a53a` : `#f1eee7`),
            e.fillRect(0, 0, n, r),
            (e.fillStyle = l ? `#ffffff` : `#1f2433`),
            (e.font = `700 62px "Barlow Semi Condensed", sans-serif`),
            (e.textAlign = `center`),
            (e.textBaseline = `middle`),
            e.fillText(t, n / 2, r / 2 + 4));
        }),
        d = new L();
      d.position.set(o, r, s);
      let f = new B(new V(10, 1.8, 10), [
        c,
        c,
        J(`#ffffff`, 0.5, 0, { map: u }),
        c,
        c,
        c,
      ]);
      return (
        (f.position.y = 0.9),
        d.add(f),
        (d.userData.keyIndex = a),
        (f.userData.keyIndex = a),
        e.add(d),
        { tile: d, y0: d.position.y }
      );
    });
  e.add(Y(7 * q, 2.5, q, qc, 0, r, -n / 2 + 3));
  for (let t of Object.values(Fd)) e.add(Y(0.64, 6, 0.64, Jc, t.x, t.y, t.z));
  return (
    (e.userData.keys = l),
    (e.userData.part = {
      name: `3 × 4 keypad`,
      desc: `Twelve keys on a grid of four rows and three columns: a pressed key joins its row to its column.`,
    }),
    X(e, t / 2 - 1.6, r, -n / 2 + 2),
    jc(e, [-t / 2 + 2.7, r, -7.5], [t / 2 - 2.7, r, -7.5]),
    e
  );
}
var Ld = { w: 68, h: 46, d: 36 },
  Rd = new F(23, 28, Ld.d / 2),
  zd = new F(-Au.x + 0.5, 0, Au.y).add(Rd);
function Bd() {
  let e = new L(),
    { w: t, h: n, d: r } = Ld,
    i = J(`#68707d`, 0.42, 0.4),
    a = J(`#3d434e`, 0.5, 0.3);
  (e.add(Y(t, 3, r, a, 0, 0, 0)), e.add(Y(t, n - 3, 2, i, 0, 3, -r / 2 + 1)));
  for (let a of [-t / 2 + 1, t / 2 - 1]) e.add(Y(2, n - 3, r, i, a, 3, 0));
  (e.add(Y(t, 3, r, i, 0, n - 3, 0)),
    e.add(Y(t - 4, 2, r - 2, J(`#4a505b`, 0.5), 0, 3, 0)),
    e.add(Y(26, n - 6, 2, i, 21, 3, r / 2 - 1)),
    e.add(Y(2, n - 6, r - 2, i, 9, 3, 0)));
  let o = J(`#e3ad2b`, 0.3, 0.75);
  for (let [t, n, r] of [
    [-24, 5, -3],
    [-12, 5, -3],
    [0, 5, -3],
    [-18, 9, -3],
    [-6, 9, -3],
    [-12, 13, -3],
  ])
    e.add(Y(10, 4, 14, o, t, n, r));
  let s = new L();
  (s.position.set(-t / 2 + 2, 4, r / 2),
    s.add(Y(40, n - 8, 3, i, 20, 0, 1.5)),
    s.add(Y(36, n - 12, 0.6, J(`#5b626e`, 0.45, 0.4), 20, 2, 3.2)));
  let c = new B(new H(7, 7, 2.2, 32), a);
  ((c.rotation.x = Math.PI / 2), c.position.set(16, 24, 4.1), s.add(c));
  let l = Y(1, 4, 0.6, J(`#f0a53a`, 0.4), 16, 26.5, 5.3);
  s.add(l);
  for (let e of [6, n - 14]) s.add(Y(1.6, 6, 3.4, a, -0.4, e, 1.5));
  let u = J(`#cfd2d8`, 0.25, 0.8),
    d = new B(new H(1.5, 1.5, 22, 16), u);
  ((d.rotation.x = Math.PI / 2), d.position.set(36, Rd.y - 4, 14), s.add(d));
  let f = new B(new Xa(2.6, 18, 14), u);
  (f.position.set(36, Rd.y - 4, 25.5),
    s.add(f),
    e.add(s),
    e.add(Y(26, 2, 25, a, 24, Rd.y - 6.1 - 2, r / 2 + 12.5)),
    e.add(Y(2, 10, 20, a, 31, Rd.y - 6.1 - 12, r / 2 + 10)));
  let p = ju();
  (p.quaternion
    .setFromAxisAngle(new F(0, 0, 1), Math.PI)
    .multiply(new yt().setFromAxisAngle(new F(1, 0, 0), Math.PI / 2)),
    p.position.copy(Rd),
    (p.userData.label.rotation.z = Math.PI),
    e.add(p));
  let m = p.userData.horn,
    h = new B(new V(4, 2, 22), J(`#f0b53a`, 0.45));
  (h.position.set(0, 3.4, -12), m.add(h));
  let g = new B(new H(3.2, 3.2, 2.4, 20), a);
  ((g.position.y = 3.4),
    m.add(g),
    (e.userData.horn = m),
    (e.userData.hinge = s),
    (e.userData.part = {
      name: `Safe with a servo lock`,
      desc: `An SG90 holds a latch across the handle: turned to 90°, it lets the door open.`,
    }));
  let _ = new I();
  return (
    _.position.set(Rd.x - 5.6, Rd.y + 8, Rd.z + 30),
    e.add(_),
    (e.userData.anchors = { latch: _ }),
    X(e, 0, n + 2, 0),
    Vd(e, 0, 0),
    e
  );
}
function Vd(e, t, n = 0) {
  ((e.userData.horn.rotation.y = -Math.PI / 2 - (t * Math.PI) / 180),
    (e.userData.hinge.rotation.y = -(n * Math.PI) / 180));
}
var Hd = {
    red: `#e8392e`,
    yellow: `#f2c23a`,
    green: `#3fbf6a`,
    blue: `#3d7be0`,
    white: `#f2efe6`,
  },
  Ud = { red: 2, yellow: 2.1, green: 2.2, blue: 3, white: 3.1 };
function Wd(e, t) {
  let n = e.userData.light;
  n &&
    (n.lens.color.set(t), n.lens.emissive.set(t), n.glow.material.color.set(t));
}
var Gd = Object.fromEntries(
  [`R`, `G`, `B`, `GND`].map((e, t) => [e, new F(-15, 9.5, (t - 1.5) * q)]),
);
function Kd() {
  let e = new L(),
    t = J(`#c9a26e`, 0.75);
  (e.add(Y(40, 7, 22, t)), e.add(Y(2.5, 2.5, 10.2, qc, -15, 7, 0)));
  for (let t of Object.values(Gd)) e.add(Y(0.64, 6, 0.64, Jc, t.x, 7, t.z));
  let n = Z(120, 260, (e, t, n) => {
      ((e.fillStyle = `#c9a26e`),
        e.fillRect(0, 0, t, n),
        (e.fillStyle = `#5a3d22`),
        (e.font = `700 30px "Barlow Semi Condensed", sans-serif`),
        (e.textBaseline = `middle`),
        Object.keys(Gd).forEach((t, r) =>
          e.fillText(t, 8, n / 2 + (r - 1.5) * 63.5),
        ));
    }),
    r = new B(new Ka(4.8, 10.4), J(`#ffffff`, 0.7, 0, { map: n }));
  ((r.rotation.x = -Math.PI / 2), r.position.set(-11.2, 7.02, 0), e.add(r));
  let i = new B(new H(8.5, 9.5, 3, 40), J(`#a9834f`, 0.6));
  (i.position.set(6, 8.5, 0), e.add(i));
  let a = J(`#f4f0e8`, 0.85, 0, {
      emissive: `#000000`,
      emissiveIntensity: 0.05,
    }),
    o = new B(new Xa(14, 48, 32), a);
  (o.position.set(6, 23, 0), e.add(o));
  let s = Nc(`#ffffff`, 74);
  return (
    s.position.set(6, 23, 0),
    e.add(s),
    (e.userData.light = {
      lens: a,
      glow: s,
      gain: 0.9,
      base: a.color.clone(),
      hue: new R(`#ffffff`),
    }),
    (e.userData.part = {
      name: `Mood lamp`,
      desc: `An RGB LED inside a frosted ball, so the whole ball glows in the mixed colour. Its header takes red, green, blue and the shared ground.`,
    }),
    X(e, 6, 37, 0),
    e
  );
}
function qd(e, t, n, r) {
  let i = e.userData.light;
  if (!i) return;
  let a = Math.max(t, n, r, 1),
    o = new R().setRGB(t / a, n / a, r / a, Ke);
  (i.lens.emissive.copy(o), i.glow.material.color.copy(o), i.hue.copy(o));
}
function Jd() {
  return Z(256, 256, (e, t, n) => {
    ((e.fillStyle = `#d9a35e`),
      e.fillRect(0, 0, t, n),
      (e.fillStyle = `#e8e4dc`),
      e.fillRect(0, 0, t, 40),
      e.fillRect(0, n - 40, t, 40),
      (e.strokeStyle = `#8a3f22`),
      (e.lineWidth = 15),
      (e.lineJoin = `round`),
      e.beginPath());
    for (let r = 0; r <= 7; r++) {
      let i = 28 + (r * (t - 56)) / 7;
      e.lineTo(i, r % 2 ? n - 52 : 52);
    }
    e.stroke();
  });
}
var Yd = { w: 22, d: 24, t: 1.6 },
  Xd = Object.fromEntries(
    [`GND`, `OUT`, `VCC`].map((e, t) => [
      e,
      new F((t - 1) * q, Yd.t + 2.5, -Yd.d / 2 + 3),
    ]),
  ),
  Zd = new F(0, Yd.t + 5.4, 5);
function Qd() {
  let e = new L(),
    { w: t, d: n, t: r } = Yd,
    i = Z(t * 12, n * 12, (e, t, n) => {
      ((e.fillStyle = `#2b3a5c`),
        e.fillRect(0, 0, t, n),
        (e.fillStyle = `rgba(255,255,255,0.92)`),
        (e.font = `700 21px "Barlow Semi Condensed", sans-serif`),
        (e.textAlign = `center`),
        (e.textBaseline = `middle`),
        Object.keys(Xd).forEach((n, r) =>
          e.fillText(n, t / 2 + (r - 1) * q * 12, 6.6 * 12),
        ));
    }),
    a = J(`#22304c`, 0.6),
    o = new B(new V(t, r, n), [
      a,
      a,
      J(`#ffffff`, 0.6, 0, { map: i }),
      a,
      a,
      a,
    ]);
  ((o.position.y = r / 2), e.add(o));
  let s = J(`#d4d0c8`, 0.3, 0.65);
  for (let t of [-1.27, 1.27]) e.add(Y(0.5, 3.4, 0.5, s, t, r, Zd.z));
  let c = new B(new H(2.6, 2.6, 1.8, 32), [
    J(`#c98d4f`, 0.5),
    J(`#ffffff`, 0.45, 0, { map: Jd() }),
    J(`#b97f45`, 0.5),
  ]);
  (c.position.set(0, r + 4.3, Zd.z),
    e.add(c),
    e.add(Y(3.2, 1, 1.6, J(`#22242c`, 0.5), -6, r, -3.5)),
    e.add(Y(3 * q, 2.5, q, qc, 0, r, -n / 2 + 3)));
  for (let t of Object.values(Xd)) e.add(Y(0.64, 6, 0.64, Jc, t.x, t.y, t.z));
  return (
    (e.userData.part = {
      name: `Light sensor`,
      desc: `A light-dependent resistor and a 10 kΩ resistor: OUT gives a higher voltage the more light falls on it.`,
    }),
    X(e, 0, r + 6, Zd.z),
    e
  );
}
function $d() {
  let e = new L(),
    t = J(`#3a3f4b`, 0.55),
    n = new B(new H(7.6, 8, 12, 32, 1, !0), t);
  ((n.position.y = 6), e.add(n));
  let r = new B(new H(7.6, 7.6, 1.2, 32), t);
  ((r.position.y = 11.4), e.add(r));
  let i = new B(new H(2.6, 3, 3, 20), J(`#f0a53a`, 0.45));
  return (
    (i.position.y = 13.5),
    e.add(i),
    (e.userData.part = {
      name: `Cap`,
      desc: `Drag it over the light sensor to make it dark, as at night.`,
    }),
    X(e, 0, 15, 0),
    e
  );
}
var ef;
function tf(e = `#ffc53d`) {
  return new co({
    transparent: !0,
    depthWrite: !1,
    side: 2,
    uniforms: { color: { value: new R(e) }, opacity: { value: 0.5 } },
    vertexShader: `
      varying float vAlong;
      varying float vFacing;
      void main() {
        vAlong = uv.y;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vec3 n = normalize(normalMatrix * normal);
        vFacing = abs(dot(n, normalize(-mv.xyz)));
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      uniform float opacity;
      varying float vAlong;
      varying float vFacing;
      void main() {
        float a = opacity * mix(0.25, 1.0, vAlong) * pow(vFacing, 1.4);
        gl_FragColor = vec4(color, a);
        #include <colorspace_fragment>
      }
    `,
  });
}
function nf() {
  ((ef ??= Z(128, 128, (e) => {
    let t = e.createRadialGradient(64, 64, 4, 64, 64, 63);
    (t.addColorStop(0, `rgba(255, 200, 70, 1)`),
      t.addColorStop(0.45, `rgba(255, 196, 70, 0.6)`),
      t.addColorStop(1, `rgba(255, 190, 60, 0)`),
      (e.fillStyle = t),
      e.fillRect(0, 0, 128, 128));
  })),
    (ef.userData.shared = !0));
  let e = new B(
    new Di(1, 40),
    new Jr({ map: ef, transparent: !0, depthWrite: !1, opacity: 0.9 }),
  );
  return (
    (e.rotation.x = -Math.PI / 2),
    e.layers.set(1),
    (e.renderOrder = 1),
    e
  );
}
var rf = { plus: new F(-6.9, 1.2, -0.95), minus: new F(-6.9, 1.2, 0.95) },
  Q = { y: 21, h: 13.5, top: 7, bottom: 11.5 };
function af() {
  let e = new L(),
    t = new B(
      new Ga(
        [
          [0, 0],
          [5.2, 0],
          [5.9, 0.5],
          [5.7, 1.5],
          [5, 2.4],
          [6.6, 4.6],
          [7.9, 7.8],
          [7.7, 11],
          [6.3, 13.8],
          [4, 15.8],
          [2.6, 16.9],
          [2.4, 18],
          [0, 18],
        ].map(([e, t]) => new P(e, t)),
        48,
      ),
      J(`#d98c5f`, 0.32),
    );
  e.add(t);
  let n = new B(new Za(7.95, 0.35, 8, 48), J(`#f4ead6`, 0.4));
  ((n.rotation.x = Math.PI / 2),
    (n.position.y = 9.3),
    e.add(n),
    e.add(Y(1.4, 2, 3.6, J(`#23262e`, 0.7), -6.1, 0.2, 0)));
  let r = J(`#c9a14a`, 0.35, 0.7),
    i = new B(new H(1.1, 1.4, 6, 16), r);
  ((i.position.y = 21), e.add(i));
  let a = new B(new H(1.6, 1.6, 3, 16), J(`#2b2f38`, 0.5));
  ((a.position.y = 25.5), e.add(a));
  let o = J(`#fff6dc`, 0.3, 0, {
      emissive: `#ffd27a`,
      emissiveIntensity: 0.05,
    }),
    s = new B(new Xa(3, 24, 16), o);
  ((s.position.y = 29.6), e.add(s));
  let c = J(`#f4ead6`, 0.8, 0, {
      emissive: `#ffc35c`,
      emissiveIntensity: 0,
      side: 2,
    }),
    l = new B(new H(Q.top, Q.bottom, Q.h, 48, 1, !0), c);
  ((l.position.y = Q.y + Q.h / 2), e.add(l));
  let u = J(`#c9b48a`, 0.5);
  for (let [t, n] of [
    [Q.top, Q.y + Q.h],
    [Q.bottom, Q.y],
  ]) {
    let r = new B(new Za(t, 0.35, 8, 48), u);
    ((r.rotation.x = Math.PI / 2), (r.position.y = n), e.add(r));
  }
  let d = 26.6,
    f = Q.bottom - ((d - Q.y) / Q.h) * (Q.bottom - Q.top);
  for (let t = 0; t < 3; t++) {
    let n = (t / 3) * Math.PI * 2 + Math.PI / 6,
      i = new B(new H(0.25, 0.25, f - 1.6, 6), r);
    (i.rotation.set(0, -n, Math.PI / 2),
      i.position.set(
        Math.cos(n) * ((f + 1.6) / 2),
        d,
        Math.sin(n) * ((f + 1.6) / 2),
      ),
      e.add(i));
  }
  let p = new H(Q.bottom - 0.6, 21, Q.y, 48, 1, !0);
  p.translate(0, -Q.y / 2, 0);
  let m = new B(p, tf());
  ((m.position.y = Q.y), m.layers.set(1), (m.renderOrder = 2), e.add(m));
  let h = new H(10, Q.top - 0.4, 8, 40, 1, !0);
  h.translate(0, 4, 0);
  let g = h.attributes.uv;
  for (let e = 0; e < g.count; e++) g.setY(e, 1 - g.getY(e));
  let _ = new B(h, tf());
  ((_.position.y = Q.y + Q.h), _.layers.set(1), (_.renderOrder = 2), e.add(_));
  let v = nf();
  ((v.position.y = 0.06), v.scale.set(27, 27, 1), e.add(v));
  let y = Nc(`#ffd27a`, 40);
  return (
    (y.material.depthTest = !1),
    (y.renderOrder = 3),
    (y.position.y = Q.y + Q.h / 2),
    e.add(y),
    (e.userData.lamp = { bulb: o, shade: c, beam: m, up: _, pool: v, glow: y }),
    of(e, !1),
    (e.userData.part = {
      name: `Table lamp`,
      desc: `A little table lamp with an LED bulb under its shade and two thin wires out of its base.`,
    }),
    X(e, 0, Q.y + Q.h + 1, 0),
    e
  );
}
function of(e, t) {
  let n = e.userData.lamp;
  ((n.bulb.emissiveIntensity = t ? 1.6 : 0.05),
    (n.shade.emissiveIntensity = t ? 0.75 : 0),
    (n.beam.visible = t),
    (n.beam.material.uniforms.opacity.value = 0.5),
    (n.up.visible = t),
    (n.up.material.uniforms.opacity.value = 0.35),
    (n.pool.visible = t),
    (n.glow.material.opacity = t ? 0.55 : 0));
}
var sf = {
    length: 170,
    plate: { t: 8, w: 44, h: 50 },
    rodY: 40,
    rodZ: 13,
    lead: 8,
    home: -43,
    travel: 106,
    car: { w: 32, d: 40, h: 14, y0: 33 },
    magnet: { r: 10, y0: 19, y1: 31 },
  },
  cf = { pick: 10, bins: [44, 74, 104] },
  lf = (e) => sf.home - e,
  $ = {
    z: -22,
    yl: 55.5,
    R: 8,
    fixed: -6,
    straight: 156,
    n: 19,
    h: 7,
    w: 10,
    tab: -13,
  };
$.pitch = ($.straight + Math.PI * $.R) / $.n;
var uf = Object.fromEntries(
    [`1B`, `1A`, `2A`, `2B`].map((e, t) => [
      e,
      new F(40.7 + t * 2.2, 26, 24.4),
    ]),
  ),
  df = Object.fromEntries(
    [`NO`, `COM`].map((e, t) => [e, new F(-15 + t * q, 48.5, 23.75)]),
  ),
  ff = Object.fromEntries(
    [`SIG`, `GND`, `12V`].map((e, t) => [
      e,
      new F(-0.4, $.yl + (1 - t) * 2.2, $.z),
    ]),
  ),
  pf = { "1B": `#3fae6a`, "1A": `#23262e`, "2A": `#d64a3a`, "2B": `#3d6fc4` };
function mf(e, t) {
  let n = e / 2,
    r = new aa();
  return (
    r.moveTo(-n + t, -n),
    r.lineTo(n - t, -n),
    r.lineTo(n, -n + t),
    r.lineTo(n, n - t),
    r.lineTo(n - t, n),
    r.lineTo(-n + t, n),
    r.lineTo(-n, n - t),
    r.lineTo(-n, -n + t),
    r.closePath(),
    r
  );
}
function hf(e, t, n, r = 42.3) {
  let i = new Ha(mf(r, 4), { depth: t, bevelEnabled: !1 });
  i.rotateY(Math.PI / 2);
  let a = new B(i, n);
  return (a.position.set(e, sf.rodY, 0), a);
}
function gf(e, t, n, r, i, a, o = 24) {
  let s = new H(e, e, t, o);
  s.rotateZ(Math.PI / 2);
  let c = new B(s, n);
  return (c.position.set(r + t / 2, i, a), c);
}
function _f() {
  let e = new L(),
    { length: n, plate: r, rodY: i, rodZ: a } = sf,
    o = J(`#aab0b8`, 0.4, 0.55),
    s = J(`#30343c`, 0.55, 0.2),
    c = J(`#dfe3e8`, 0.18, 0.9);
  for (let t of [0, -n - r.t]) {
    e.add(Y(r.t, r.h, r.w, o, t + r.t / 2, 0, 0));
    for (let n of [-r.w / 2 + 5, r.w / 2 - 5]) {
      let i = new B(new H(1.6, 1.6, 0.8, 16), s);
      ((i.rotation.z = Math.PI / 2),
        i.position.set(t < 0 ? t - 0.3 : t + r.t + 0.3, 6, n),
        e.add(i));
    }
  }
  e.add(gf(5, 2, s, -n, i, 0));
  for (let t of [-a, a]) e.add(gf(4, n, c, -n, i, t));
  let l = Z(64, 512, (e, t, n) => {
    ((e.fillStyle = `#9ea4ab`),
      e.fillRect(0, 0, t, n),
      (e.strokeStyle = `#6d737b`),
      (e.lineWidth = 9));
    for (let r = -64; r < n + 64; r += 24)
      (e.beginPath(), e.moveTo(0, r), e.lineTo(t, r + 18), e.stroke());
  });
  ((l.wrapS = l.wrapT = t), l.repeat.set(1, 8));
  let u = gf(4, n - 26, J(`#ffffff`, 0.35, 0.6, { map: l }), -n, i, 0);
  e.add(u);
  let d = new L();
  d.position.set(-14, i, 0);
  let f = new B(new H(9, 9, 24, 32).rotateZ(Math.PI / 2), o);
  d.add(f);
  for (let e of [-7, 7]) {
    let t = new B(new H(1.4, 1.4, 1, 12), s);
    (t.position.set(e, 9.1, 0), d.add(t));
  }
  (d.add(Y(1.2, 18.4, 0.6, s, 0, -9.2, 9.05)),
    e.add(d),
    e.add(gf(2.5, 12, c, -2, i, 0)));
  let p = J(`#4a4f58`, 0.45, 0.4),
    m = J(`#1e2026`, 0.5, 0.2);
  (e.add(hf(r.t, 8, p)),
    e.add(hf(r.t + 8, 24, m, 41.6)),
    e.add(hf(r.t + 32, 8, p)));
  let h = Z(400, 400, (e, t, n) => {
      ((e.fillStyle = `#1e2026`),
        e.fillRect(0, 0, t, n),
        (e.fillStyle = `#e9e4da`),
        e.fillRect(30, 120, t - 60, 160),
        (e.fillStyle = `#1e2026`),
        (e.font = `800 64px "Barlow Semi Condensed", sans-serif`),
        (e.textAlign = `center`),
        e.fillText(`NEMA 17`, t / 2, 192),
        (e.font = `600 40px "Barlow Semi Condensed", sans-serif`),
        e.fillText(`1.8° · 200 steps`, t / 2, 250));
    }),
    g = new B(new Ka(24, 24), J(`#ffffff`, 0.5, 0, { map: h }));
  ((g.rotation.x = -Math.PI / 2),
    (g.rotation.z = Math.PI / 2),
    g.position.set(r.t + 20, i + 21.2, 0),
    e.add(g),
    e.add(Y(7.6, 6, 3.2, J(`#f3efe6`, 0.5), 43.9, 23, 22.7)));
  let _ = new L(),
    v = sf.car,
    y = J(`#e8743b`, 0.5);
  _.add(Y(v.w, v.h, v.d, y, 0, v.y0, 0));
  for (let e of [-a, a])
    for (let t of [-1, 1]) {
      let n = new B(new qa(4.2, 6, 28), o);
      ((n.rotation.y = (t * Math.PI) / 2),
        n.position.set(t * (v.w / 2 + 0.05), i, e),
        _.add(n));
    }
  let b = J(`#c9a24a`, 0.35, 0.7),
    x = new B(new H(6.5, 6.5, 3.5, 32).rotateZ(Math.PI / 2), b);
  (x.position.set(-v.w / 2 - 1.75, i, 0), _.add(x));
  for (let e = 0; e < 4; e++) {
    let t = Math.PI / 4 + (e * Math.PI) / 2,
      n = new B(new H(0.8, 0.8, 0.6, 10).rotateZ(Math.PI / 2), s);
    (n.position.set(-v.w / 2 - 3.6, i + 4.6 * Math.cos(t), 4.6 * Math.sin(t)),
      _.add(n));
  }
  let S = sf.magnet;
  _.add(Y(14, v.y0 - S.y1, 14, o, 0, S.y1, 0));
  let C = new B(
    new H(S.r, S.r, S.y1 - S.y0 - 1.2, 40),
    J(`#c3c7cc`, 0.3, 0.75),
  );
  ((C.position.y = (S.y0 + S.y1 + 1.2) / 2), _.add(C));
  let w = new B(new H(S.r, S.r, 1.2, 40), J(`#6c7077`, 0.4, 0.6));
  ((w.position.y = S.y0 + 0.6), _.add(w));
  let T = new B(new qa(3.5, 4.2, 28), J(`#9ba0a6`, 0.35, 0.7));
  ((T.rotation.x = Math.PI / 2), (T.position.y = S.y0 - 0.02), _.add(T));
  let E = J(`#2b5aa8`, 0.55),
    D = v.y0 + v.h;
  (_.add(Y(16, 1.6, 12, E, 2, D, 4)),
    _.add(Y(4, 2.2, 5, J(`#25272f`, 0.5), 4, D + 1.6, 4)));
  let O = J(`#ff5a4a`, 0.4, 0, { emissive: `#ff3a2a`, emissiveIntensity: 0 }),
    k = Y(2, 1.2, 1.4, O, -3.5, D + 1.6, 8);
  _.add(k);
  let A = Nc(`#ff5a4a`, 10);
  (A.position.set(-3.5, D + 3.4, 8), _.add(A));
  let ee = $.tab;
  (_.add(Y(10, $.yl + 2 * $.R + 3.5 - D, 2, o, 0, D, ee - 1)),
    _.add(Y(4, $.h, 3, s, 0, $.yl + 2 * $.R - $.h / 2, ee - 3.5)));
  let te = J(`#23262e`, 0.6),
    ne = new Ri([
      new F(-4, D + 1.6, 1),
      new F(-4, D + 4, -6),
      new F(-3, D + 8, ee + 1.4),
      new F(-2, $.yl + 2 * $.R - 3, ee + 1.2),
      new F(0, $.yl + 2 * $.R, ee - 2),
    ]);
  _.add(new B(new Qa(ne, 40, 1.1, 8, !1), te));
  let re = new Ri([
    new F(-6, S.y1 - 1, 5),
    new F(-9, S.y1 + 1.5, 7),
    new F(-9, D - 2, 9),
    new F(-6, D + 1, 9),
  ]);
  (_.add(new B(new Qa(re, 24, 0.7, 6, !1), J(`#d64a3a`, 0.5))),
    e.add(_),
    e.add(Y(n + 2 * r.t, 2, 12, s, -n / 2, r.h, $.z)),
    e.add(Y(6, $.h + 1, $.w + 2, s, $.fixed + 2, r.h + 2, $.z)));
  let ie = J(`#2a2d34`, 0.6),
    ae = [];
  for (let t = 0; t < $.n; t++) {
    let t = new L();
    for (let e of [-$.w / 2 + 0.7, $.w / 2 - 0.7])
      t.add(Y($.pitch - 0.7, $.h, 1.4, ie, 0, -$.h / 2, e));
    (t.add(Y($.pitch - 0.7, 1.2, $.w - 2.8, ie, 0, $.h / 2 - 1.2, 0)),
      t.add(Y($.pitch - 0.7, 1.2, $.w - 2.8, ie, 0, -$.h / 2, 0)),
      e.add(t),
      ae.push(t));
  }
  let oe = J(`#2d3140`, 0.5);
  (e.add(Y(4, 12, 9, o, -2, 35, 23.5)),
    e.add(Y(18, 10, 6.5, oe, -13, 36, 23.75)),
    e.add(Y(6, 2.5, 2.5, qc, -13.73, 46, 23.75)));
  for (let t of Object.values(df))
    e.add(Y(0.64, 6, 0.64, Jc, t.x, t.y - 2.5, t.z));
  let se = new L();
  se.position.set(-20, 41, 20.4);
  let ce = Y(9, 1.2, 0.6, J(`#cfd2d6`, 0.3, 0.7), -4.5, -0.6, 0);
  se.add(ce);
  let le = new B(new H(1.4, 1.4, 3, 14), J(`#e8e4da`, 0.5));
  (le.position.set(-9, 0, -0.9),
    se.add(le),
    (se.rotation.y = -0.42),
    e.add(se),
    (e.userData.axis = {
      car: _,
      screw: u,
      coupler: d,
      links: ae,
      lever: se,
      led: O,
      ledGlow: A,
    }));
  let ue = new I();
  (ue.position.set(0, v.y0 + v.h + 6, 0), _.add(ue));
  let de = new I();
  (de.position.set(r.t + 20, i + 20, 0), e.add(de));
  let fe = new I();
  return (
    fe.position.set(-13, 50, 23.75),
    e.add(fe),
    (e.userData.anchors = { carriage: ue, motor: de, switch: fe }),
    (e.userData.part = {
      name: `Linear axis`,
      desc: `A NEMA17 stepper turns a lead screw; the carriage on it moves 8 mm for every turn, 0.04 mm for every step. Click it for its speed.`,
    }),
    X(e, r.t + 20, i + 20, 0),
    vf(e, cf.pick),
    e
  );
}
function vf(e, t, n = !1) {
  let r = e.userData.axis;
  if (!r) return;
  let i = lf(t);
  r.car.position.x = i;
  let a = (t / sf.lead) * Math.PI * 2;
  ((r.screw.rotation.x = -a), (r.coupler.rotation.x = -a));
  let { R: o, yl: s, fixed: c, straight: l, pitch: u } = $,
    d = (c + i - l) / 2,
    f = c - d;
  (r.links.forEach((e, t) => {
    let n = (t + 0.5) * u;
    if (n <= f) (e.position.set(c - n, s, $.z), (e.rotation.z = 0));
    else if (n <= f + Math.PI * o) {
      let t = (n - f) / o;
      (e.position.set(d - o * Math.sin(t), s + o - o * Math.cos(t), $.z),
        (e.rotation.z = -t));
    } else
      (e.position.set(d + (n - f - Math.PI * o), s + 2 * o, $.z),
        (e.rotation.z = Math.PI));
  }),
    (r.lever.rotation.y = -Math.acos(
      Math.min(Math.cos(0.42), (7 + Math.max(0, t)) / 10.4),
    )),
    (r.led.emissiveIntensity = n ? 1.4 : 0),
    (r.ledGlow.material.opacity = n ? 0.8 : 0),
    (e.userData.u = t),
    (e.userData.magnet = n));
}
var yf = 7,
  bf = { z0: 6, z1: 46, rise: 0.12 },
  xf = (e) => yf + Math.max(0, e - bf.z0) * bf.rise;
function Sf(e) {
  let t = e * 10.2;
  return new F(lf(cf.pick), (e ? xf(t) : yf) + 5, t);
}
var Cf = Kc(J(`#d3d8de`, 0.16, 0.95));
function wf() {
  let e = new B(new Xa(5, 28, 18), Cf);
  return (
    (e.userData.part = {
      name: `Steel ball`,
      desc: `A 10 mm steel ball: the magnet can pick it up from a couple of millimetres away.`,
    }),
    e
  );
}
function Tf() {
  let e = new L(),
    t = lf(cf.pick),
    n = J(`#c9a26e`, 0.75),
    r = J(`#9aa1ab`, 0.45, 0.3);
  (e.add(Y(16, yf, 16, n, t, 0, 0)), e.add(Y(16, 5, 2, r, t, yf, -7.5)));
  let i = new B(new qa(2.5, 4.5, 24), J(`#a88758`, 0.7));
  ((i.rotation.x = -Math.PI / 2), i.position.set(t, 7.02, 0), e.add(i));
  let a = bf.z1 - bf.z0,
    o = Math.atan(bf.rise),
    s = new L();
  (s.position.set(t, yf, bf.z0),
    (s.rotation.x = -o),
    s.add(Y(14, 1.2, a, r, 0, -1.2, a / 2)));
  for (let e of [-1, 1]) s.add(Y(1.2, 4, a, r, e * 6.4, -1.2, a / 2));
  e.add(s);
  for (let r of [bf.z0 + 6, bf.z1 - 4])
    e.add(Y(10, xf(r) - 1.2, 3, n, t, 0, r));
  let c = [];
  for (let t = 0; t < 5; t++) {
    let n = wf();
    (n.position.copy(Sf(t)), e.add(n), c.push(n));
  }
  return (
    (e.userData.balls = c),
    (e.userData.part = {
      name: `Ball feeder`,
      desc: `Steel balls roll down the ramp into the seat, one at a time, for the magnet to pick up. Click it to put the balls back.`,
    }),
    X(e, t, xf(30) + 12, 30),
    e
  );
}
var Ef = [`#e3604b`, `#f0b53a`, `#3d6fc4`],
  Df = { r: 14, h: 6, floor: 1.4 };
function Of(e, t) {
  let n = lf(cf.bins[e]);
  if (t >= 4) return new F(n, Df.floor + 5 + 7.1, 0);
  let r = Math.PI / 4 + (t * Math.PI) / 2;
  return new F(n + 7.1 * Math.cos(r), Df.floor + 5, 7.1 * Math.sin(r));
}
function kf() {
  let e = new L(),
    { r: t, h: n, floor: r } = Df,
    i = [
      [0, 0],
      [t, 0],
      [t, n],
      [t - 1.4, n],
      [t - 1.4, r],
      [0, r],
    ].map(([e, t]) => new P(e, t));
  return (
    cf.bins.forEach((r, a) => {
      let o = new B(new Ga(i, 48), J(Ef[a], 0.5));
      (o.position.set(lf(r), 0, 0), e.add(o));
      let s = Z(64, 64, (e, t, n) => {
          ((e.fillStyle = `#ffffff`),
            (e.font = `800 46px "Barlow Semi Condensed", sans-serif`),
            (e.textAlign = `center`),
            (e.textBaseline = `middle`),
            e.fillText(String(a + 1), t / 2, n / 2 + 2));
        }),
        c = new B(new Ka(5, 5), new Jr({ map: s, transparent: !0 }));
      (c.position.set(lf(r), n / 2, t + 0.05), c.layers.set(1), e.add(c));
    }),
    (e.userData.part = {
      name: `Bins`,
      desc: `Where the balls go: press button 1, 2 or 3 to send the next one to that bin.`,
    }),
    X(e, lf(cf.bins[1]), n + 4, 0),
    e
  );
}
var Af = [`GND`, `VDD`, `1B`, `1A`, `2A`, `2B`, `GND`, `VMOT`],
  jf = [`DIR`, `STEP`, `SLP`, `RST`, `MS3`, `MS2`, `MS1`, `EN`];
function Mf() {
  let e = new L(),
    t = 8 * q;
  for (let n of [-6.35, 6.35]) {
    e.add(Y(t, 2.5, q, qc, 0, 6, n));
    for (let t = 0; t < 8; t++)
      e.add(Y(0.64, 6, 0.64, Jc, (t - 3.5) * q, 0, n));
  }
  let n = Z(Math.round(t * 12), 182, (e, t, n) => {
      ((e.fillStyle = `#2e7d55`),
        e.fillRect(0, 0, t, n),
        (e.fillStyle = `rgba(255,255,255,0.92)`),
        (e.font = `700 13px "Barlow Semi Condensed", sans-serif`),
        (e.textAlign = `center`),
        (e.textBaseline = `middle`),
        Af.forEach((t, n) => e.fillText(t, (n + 0.5) * q * 12, 16)),
        jf.forEach((t, r) => e.fillText(t, (r + 0.5) * q * 12, n - 16)),
        (e.font = `800 17px "Barlow Semi Condensed", sans-serif`),
        e.fillText(`A4988`, t * 0.32, n / 2));
    }),
    r = J(`#256a47`, 0.6),
    i = new B(new V(t, 1.6, 15.2), [
      r,
      r,
      J(`#ffffff`, 0.6, 0, { map: n }),
      r,
      r,
      r,
    ]);
  ((i.position.y = 9.3), e.add(i));
  let a = J(`#c5cad1`, 0.35, 0.6);
  e.add(Y(8.5, 1.4, 8.5, a, 2.5, 10.1, 0));
  for (let t = 0; t < 5; t++) e.add(Y(0.9, 4, 8.5, a, -1.1 + t * 1.8, 11.5, 0));
  let o = new B(new H(1.9, 1.9, 1.4, 20), J(`#e9e4da`, 0.5));
  return (
    o.position.set(8, 10.799999999999999, 2.5),
    e.add(o),
    e.add(Y(2.6, 0.3, 0.6, J(`#4a4f58`, 0.5), 8, 11.5, 2.5)),
    (e.userData.part = {
      name: `A4988 stepper driver`,
      desc: `Every pulse on STEP moves the motor one step, the way DIR says. It drives the motor’s two coils from 12 V; VDD powers its logic from 3.3 V.`,
    }),
    X(e, 0, 16.1, 0),
    e
  );
}
function Nf() {
  let e = new L(),
    t = J(`#d2cfc8`, 0.35, 0.6);
  for (let n of [-1.27, 1.27]) e.add(Y(0.5, 2.4, 0.5, t, 0, 0, n));
  let n = new B(new H(3.15, 3.15, 11, 28), J(`#26304a`, 0.45));
  ((n.position.y = 7.9), e.add(n));
  let r = new B(
    new H(3.17, 3.17, 10.6, 28, 1, !0, Math.PI * 0.35, Math.PI * 0.3),
    J(`#c9ced6`, 0.5),
  );
  ((r.position.y = 7.9), e.add(r));
  let i = new B(new H(3, 3, 0.4, 28), J(`#b9bec6`, 0.35, 0.6));
  return (
    (i.position.y = 13.4),
    e.add(i),
    (e.userData.part = {
      name: `100 µF capacitor`,
      desc: `Across the 12 V supply right by the driver, it soaks up the spikes the motor’s coils make. The stripe marks its − leg.`,
    }),
    X(e, 0, 15, 0),
    e
  );
}
var Pf = new F(0, 6, -15.5);
function Ff() {
  let e = new L(),
    t = J(`#1d1f25`, 0.5);
  e.add(Y(9, 11, 13, t, 0, 0, 3));
  let n = new B(new H(3.2, 3.2, 0.4, 24), J(`#08090c`, 0.8));
  ((n.rotation.x = Math.PI / 2), n.position.set(0, 6, -3.55), e.add(n));
  let r = new B(new H(3.8, 3.8, 9, 24), t);
  ((r.rotation.x = Math.PI / 2), r.position.set(0, 6, -8), e.add(r));
  let i = new B(new H(1.6, 2.6, 3, 16), t);
  ((i.rotation.x = Math.PI / 2), i.position.set(0, 6, -14), e.add(i));
  for (let t of [-2.54, q]) e.add(Y(0.8, 1.6, 0.8, Jc, t, -1.4, 0));
  return (
    (e.userData.part = {
      name: `DC jack`,
      desc: `Brings the 12 V adapter onto the breadboard: + to the back + rail, − to the − rail.`,
    }),
    X(e, 0, 12, 3),
    e
  );
}
var If = new F(-12, 16, 0);
function Lf() {
  let e = new L(),
    t = J(`#f1eee8`, 0.55);
  e.add(Y(30, 12, 24, t));
  let n = J(`#24262d`, 0.5);
  e.add(Y(24, 26, 20, n, 0, 12.5, 0));
  let r = Z(240, 200, (e, t, n) => {
      ((e.fillStyle = `#24262d`),
        e.fillRect(0, 0, t, n),
        (e.fillStyle = `#e9e4da`),
        (e.font = `800 64px "Barlow Semi Condensed", sans-serif`),
        (e.textAlign = `center`),
        e.fillText(`12 V`, t / 2, 88),
        (e.font = `600 34px "Barlow Semi Condensed", sans-serif`),
        e.fillText(`2 A DC`, t / 2, 140));
    }),
    i = new B(new Ka(16, 13.3), J(`#ffffff`, 0.5, 0, { map: r }));
  return (
    i.position.set(0, 26, 10.05),
    e.add(i),
    e.add(Y(3, 3, 3, n, If.x + 1.5, If.y - 1.5, 0)),
    (e.userData.part = {
      name: `12 V adapter`,
      desc: `Plugs into the mains and gives 12 V DC for the motor and the magnet. The ESP32 itself runs from USB.`,
    }),
    X(e, 0, 39, 0),
    e
  );
}
export {
  Ql as $,
  Bl as $t,
  Cu as A,
  il as An,
  Ut as Ar,
  el as At,
  wl as B,
  Os as Bn,
  Gl as Bt,
  Ud as C,
  Mf as Cn,
  zu as Ct,
  tl as D,
  md as Dn,
  vl as Dt,
  pf as E,
  dd as En,
  xl as Et,
  _d as F,
  t as Fi,
  pl as Fn,
  po as Fr,
  bu as Ft,
  Il as G,
  co as Gi,
  rr as Gn,
  Ka as Gr,
  wd as Gt,
  $c as H,
  Ke as Hi,
  Zo as Hr,
  Md as Ht,
  bd as I,
  Vl as In,
  uo as Ir,
  lu as It,
  fl as J,
  Xa as Ji,
  Ci as Jn,
  Ku as Jt,
  jl as K,
  $a as Ki,
  _r as Kn,
  Xo as Kr,
  El as Kt,
  xd as L,
  qa as Li,
  Dc as Ln,
  xu as Lt,
  Du as M,
  _s as Mi,
  Hl as Mn,
  Jr as Mr,
  Yl as Mt,
  _l as N,
  Lf as Nn,
  Kd as Nt,
  su as O,
  af as On,
  Qd as Ot,
  Ol as P,
  kl as Pn,
  ru as Pt,
  nd as Q,
  Ru as Qt,
  Uu as R,
  Oc as Rn,
  ol as Rt,
  Hd as S,
  wf as Sn,
  Id as St,
  bl as T,
  Ml as Tn,
  l as Tr,
  Uc as Tt,
  Qc as U,
  zn as Un,
  Cd as Ut,
  Tl as V,
  I as Vr,
  Ou as Vt,
  zd as W,
  wn as Wi,
  V as Wn,
  wr as Wr,
  Od as Wt,
  ad as X,
  R as Xn,
  $d as Xt,
  rd as Y,
  Bd as Yt,
  td as Z,
  vf as Zt,
  Fd as _,
  hl as _n,
  Sf as _t,
  cf as a,
  cl as an,
  Zc as at,
  Zd as b,
  ld as bn,
  Io as br,
  Rc as bt,
  Ef as c,
  F as ca,
  Td as cn,
  wu as ct,
  Pf as d,
  Bt as da,
  Gu as dn,
  $t as dr,
  Nf as dt,
  Xl as en,
  Ad as et,
  tu as f,
  Dl as fn,
  Yu as ft,
  Nd as g,
  of as gn,
  jd as gt,
  Iu as h,
  pd as hn,
  g as hr,
  zl as ht,
  uf as i,
  Tu as in,
  Lu as it,
  q as j,
  Ul as jn,
  B as jr,
  Ll as jt,
  cu as k,
  ml as kn,
  _f as kt,
  Pc as l,
  kd as ln,
  wi as lr,
  ku as lt,
  Jl as m,
  Vd as mn,
  z as mr,
  Ac as mt,
  sf as n,
  Wd as nn,
  ra as nr,
  kf as nt,
  df as o,
  Kl as on,
  Of as ot,
  nu as p,
  qd as pn,
  Ff as pt,
  ud as q,
  pu as qt,
  ff as r,
  uu as rn,
  H as rr,
  Tf as rt,
  Pu as s,
  P as sa,
  Al as sn,
  Hc as st,
  If as t,
  Bu as tn,
  Xi as tr,
  lf as tt,
  qu as u,
  Ed as un,
  $o as ur,
  Rl as ut,
  rf as v,
  gl as vn,
  L as vr,
  Ju as vt,
  yl as w,
  Fl as wn,
  Wu as wt,
  Xd as x,
  sd as xn,
  _i as xr,
  Xc as xt,
  Gd as y,
  cd as yn,
  _ as yr,
  $l as yt,
  Hu as z,
  Ws as zn,
  Pl as zt
};
