// @ts-nocheck
import {
  a as e,
  c as t,
  i as n,
  l as r,
  n as i,
  o as a,
  r as o,
  s,
  t as c,
  u as l,
} from "../ui/app";
import {
  $ as u,
  $t as m,
  A as h,
  An as _,
  Ar as v,
  At as y,
  B as b,
  Bn as x,
  Bt as C,
  C as w,
  Cn as E,
  Ct as O,
  D as k,
  Dn as A,
  Dt as ee,
  E as M,
  En as te,
  Et as N,
  F as P,
  Fi as re,
  Fn as ie,
  Fr as ae,
  Ft as F,
  G as oe,
  Gi as I,
  Gn as L,
  Gr as R,
  Gt as se,
  H as ce,
  Hi as le,
  Hr as de,
  Ht as fe,
  I as pe,
  Ir as he,
  It as ge,
  J as _e,
  Ji as ve,
  Jn as ye,
  Jt as xe,
  K as Se,
  Ki as Ce,
  Kn as z,
  Kr as we,
  Kt as Te,
  L as Ee,
  Li as B,
  Ln as De,
  Lt as H,
  M as Oe,
  Mi as ke,
  Mn as Ae,
  Mr as je,
  Mt as Me,
  N as Ne,
  Nn as Pe,
  Nt as Ie,
  O as Le,
  On as Re,
  Ot as Be,
  P as Ve,
  Pn as Ue,
  Pt as Ge,
  Q as Ke,
  Qt as Xe,
  R as Ze,
  Rn as Qe,
  Rt as et,
  S as tt,
  St as nt,
  T as rt,
  Tn as it,
  Tr as at,
  Tt as ot,
  U as st,
  Un as lt,
  Ut as dt,
  V as ft,
  Vr as pt,
  Vt as mt,
  W as ht,
  Wi as gt,
  Wn as _t,
  Wr as vt,
  Wt as yt,
  X as bt,
  Xn as W,
  Xt as St,
  Y as Ct,
  Yt as Et,
  Z as Dt,
  Zt as At,
  _ as jt,
  _n as Nt,
  _t as Pt,
  a as Ft,
  an as Lt,
  at as zt,
  b as Bt,
  bn as Ht,
  br as Ut,
  bt as Wt,
  c as Gt,
  ca as G,
  cn as Kt,
  ct as Jt,
  d as Yt,
  da as Xt,
  dn as Zt,
  dr as Qt,
  dt as $t,
  en,
  et as nn,
  f as rn,
  fn as on,
  ft as cn,
  g as ln,
  gn as dn,
  gt as pn,
  h as mn,
  hn as gn,
  hr as _n,
  ht as vn,
  i as yn,
  in as xn,
  it as Cn,
  j as wn,
  jn as En,
  jr as Dn,
  jt as On,
  k as kn,
  kn as jn,
  kt as Mn,
  l as Nn,
  ln as Fn,
  lr as In,
  lt as Ln,
  m as Rn,
  mn as Bn,
  mr as Vn,
  mt as Hn,
  n as Un,
  nn as Wn,
  nr as Gn,
  nt as Kn,
  o as qn,
  on as Yn,
  ot as Zn,
  p as Qn,
  pn as er,
  pt as nr,
  q as rr,
  qt as ir,
  r as ar,
  rn as sr,
  rr as cr,
  rt as lr,
  s as ur,
  sa as dr,
  sn as fr,
  st as mr,
  t as hr,
  tn as _r,
  tr as vr,
  tt as yr,
  u as br,
  un as Sr,
  ur as Cr,
  ut as wr,
  v as Tr,
  vn as Dr,
  vr as Or,
  vt as kr,
  w as Ar,
  wn as jr,
  wt as Nr,
  x as Pr,
  xn as Ir,
  xr as Lr,
  xt as Rr,
  y as zr,
  yn as Vr,
  yr as Hr,
  yt as Ur,
  z as Wr,
  zn as Gr,
  zt as qr
} from "./kit";
import * as THREE from "three";

const ds = THREE.WebGLRenderer,
  _i = THREE.PMREMGenerator;
var fs = class extends gt {
    constructor() {
      (super(), (this.name = `RoomEnvironment`), (this.position.y = -3.5));
      let e = new _t();
      e.deleteAttribute(`uv`);
      let t = new he({ side: 1 }),
        n = new he(),
        r = new we(16777215, 900, 28, 2);
      (r.position.set(0.418, 16.199, 0.3), this.add(r));
      let i = new Dn(e, t);
      (i.position.set(-0.757, 13.219, 0.717),
        i.scale.set(31.713, 28.305, 28.591),
        this.add(i));
      let a = new Lr(e, n, 6),
        o = new pt();
      (o.position.set(-10.906, 2.009, 1.846),
        o.rotation.set(0, -0.195, 0),
        o.scale.set(2.328, 7.905, 4.651),
        o.updateMatrix(),
        a.setMatrixAt(0, o.matrix),
        o.position.set(-5.607, -0.754, -0.758),
        o.rotation.set(0, 0.994, 0),
        o.scale.set(1.97, 1.534, 3.955),
        o.updateMatrix(),
        a.setMatrixAt(1, o.matrix),
        o.position.set(6.167, 0.857, 7.803),
        o.rotation.set(0, 0.561, 0),
        o.scale.set(3.927, 6.285, 3.687),
        o.updateMatrix(),
        a.setMatrixAt(2, o.matrix),
        o.position.set(-2.017, 0.018, 6.124),
        o.rotation.set(0, 0.333, 0),
        o.scale.set(2.002, 4.566, 2.064),
        o.updateMatrix(),
        a.setMatrixAt(3, o.matrix),
        o.position.set(2.291, -0.756, -2.621),
        o.rotation.set(0, -0.286, 0),
        o.scale.set(1.546, 1.552, 1.496),
        o.updateMatrix(),
        a.setMatrixAt(4, o.matrix),
        o.position.set(-2.193, -0.369, -5.547),
        o.rotation.set(0, 0.516, 0),
        o.scale.set(3.875, 3.487, 2.986),
        o.updateMatrix(),
        a.setMatrixAt(5, o.matrix),
        this.add(a));
      let s = new Dn(e, ps(50));
      (s.position.set(-16.116, 14.37, 8.208),
        s.scale.set(0.1, 2.428, 2.739),
        this.add(s));
      let c = new Dn(e, ps(50));
      (c.position.set(-16.109, 18.021, -8.207),
        c.scale.set(0.1, 2.425, 2.751),
        this.add(c));
      let l = new Dn(e, ps(17));
      (l.position.set(14.904, 12.198, -1.832),
        l.scale.set(0.15, 4.265, 6.331),
        this.add(l));
      let u = new Dn(e, ps(43));
      (u.position.set(-0.462, 8.89, 14.52),
        u.scale.set(4.38, 5.441, 0.088),
        this.add(u));
      let d = new Dn(e, ps(20));
      (d.position.set(3.235, 11.486, -12.541),
        d.scale.set(2.5, 2, 0.1),
        this.add(d));
      let f = new Dn(e, ps(100));
      (f.position.set(0, 20, 0), f.scale.set(1, 0.1, 1), this.add(f));
    }
    dispose() {
      let e = new Set();
      this.traverse((t) => {
        t.isMesh && (e.add(t.geometry), e.add(t.material));
      });
      for (let t of e) t.dispose();
    }
  };
function ps(e) {
  return new ae({ color: 0, emissive: 16777215, emissiveIntensity: e });
}
var ms = {
    linear: (e) => e,
    inOutCubic: (e) => (e < 0.5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2),
    outCubic: (e) => 1 - (1 - e) ** 3,
    outQuart: (e) => 1 - (1 - e) ** 4,
    inCubic: (e) => e * e * e,
    outBack: (e) => 1 + 2.70158 * (e - 1) ** 3 + 1.70158 * (e - 1) ** 2,
    inBack: (e) => 2.70158 * e * e * e - 1.70158 * e * e,
  },
  hs = class {
    constructor() {
      ((this.list = new Set()), (this.speed = 1));
    }
    add({
      duration: e = 600,
      delay: t = 0,
      easing: n = ms.inOutCubic,
      onUpdate: r,
      onComplete: i,
      onStart: a,
    }) {
      let o = {
        start: performance.now() + t * this.speed,
        duration: Math.max(1, e * this.speed),
        easing: n,
        onUpdate: r,
        onComplete: i,
        onStart: a,
        started: !1,
        done: !1,
        cancel: () => {
          ((o.done = !0), this.list.delete(o));
        },
      };
      return (this.list.add(o), o);
    }
    wait(e) {
      return new Promise((t) =>
        this.add({ duration: 1, delay: e, onComplete: t }),
      );
    }
    get active() {
      return this.list.size > 0;
    }
    update(e = performance.now()) {
      for (let t of [...this.list]) {
        if (e < t.start) continue;
        t.started || ((t.started = !0), t.onStart?.());
        let n = Math.min(1, (e - t.start) / t.duration);
        (t.onUpdate?.(t.easing(n), n),
          n >= 1 && (this.list.delete(t), (t.done = !0), t.onComplete?.()));
      }
    }
  },
  gs = Math.PI / 180,
  _s = 90 * gs,
  vs = 3.2,
  ys = 22,
  bs = 760,
  xs = 110,
  Ss = 4.5,
  Cs = 340,
  ws = (e) => Math.atan2(Math.sin(e), Math.cos(e)),
  Ts = new Set([
    `ArrowUp`,
    `ArrowDown`,
    `ArrowLeft`,
    `ArrowRight`,
    `PageUp`,
    `PageDown`,
  ]),
  Es = (e) =>
    !!e &&
    e !== document.body &&
    (e.scrollHeight > e.clientHeight + 1 ||
      e.scrollWidth > e.clientWidth + 1) &&
    /auto|scroll/.test(getComputedStyle(e).overflow),
  Ds = (e, t, n) => Math.min(n, Math.max(t, e)),
  Os = {
    KeyW: [0, -1],
    ArrowUp: [0, -1],
    KeyS: [0, 1],
    ArrowDown: [0, 1],
    KeyA: [-1, 0],
    ArrowLeft: [-1, 0],
    KeyD: [1, 0],
    ArrowRight: [1, 0],
  },
  ks = class {
    constructor(
      e,
      {
        tweens: t,
        toStage: n,
        getSize: r,
        onChange: i,
        onClick: a,
        onDragState: o,
        onGrab: s,
        onZoom: c,
        onPan: l,
      },
    ) {
      ((this.el = e),
        (this.tweens = t),
        (this.toStage = n),
        (this.getSize = r),
        (this.onChange = i),
        (this.onZoom = c),
        (this.onPan = l),
        (this.onClick = a),
        (this.onDragState = o),
        (this.onGrab = s),
        (this.glide = new dr()),
        (this.grab = null),
        (this.view = {
          target: new G(),
          azimuth: 36 * gs,
          elevation: 43 * gs,
          zoom: 8.4,
        }),
        (this.zoomGoal = this.view.zoom),
        (this.zoomAnchor = null),
        (this.velocity = new dr()),
        (this.keys = new Set()),
        (this.pointers = new Map()),
        (this.drag = null),
        (this.anim = null),
        (this.fit = 1),
        (this.bounds = { minX: -90, maxX: 150, minZ: -110, maxZ: 90 }),
        e.addEventListener(`pointerdown`, (e) => this.down(e)),
        e.addEventListener(`pointermove`, (e) => this.move(e)),
        e.addEventListener(`pointerup`, (e) => this.up(e)),
        e.addEventListener(`pointercancel`, (e) => this.up(e)),
        e.addEventListener(`lostpointercapture`, (e) => this.up(e)),
        e.addEventListener(`wheel`, (e) => this.wheel(e), { passive: !1 }),
        e.addEventListener(`contextmenu`, (e) => {
          this.overUi(e) || e.preventDefault();
        }),
        e.addEventListener(
          `auxclick`,
          (e) => e.button === 1 && e.preventDefault(),
        ),
        window.addEventListener(`keydown`, (e) => this.keydown(e)),
        window.addEventListener(`keyup`, (e) => this.keys.delete(e.code)),
        window.addEventListener(`blur`, () => this.keys.clear()));
    }
    overUi(e) {
      return !!e.target.closest?.(
        `.callout, .viewbar, .tag, .hotspot, .readout, .schematic-card, .inspector`,
      );
    }
    down(e) {
      if (this.overUi(e)) return;
      if (
        (e.button === 1 && e.preventDefault(),
        this.glide.set(0, 0),
        e.button === 0 && this.pointers.size === 0 && !this.grab)
      ) {
        let t = this.onGrab?.(e);
        if (t) {
          (this.stopAnimation(),
            this.el.setPointerCapture(e.pointerId),
            (this.grab = { id: e.pointerId, handler: t }),
            this.onDragState?.(`part`));
          return;
        }
      }
      (this.stopAnimation(), this.el.setPointerCapture(e.pointerId));
      let t = this.toStage(e.clientX, e.clientY);
      this.pointers.set(e.pointerId, t);
      let n = e.timeStamp;
      ((this.drag = {
        mode:
          this.pointers.size > 1 ? `touch` : e.button === 1 ? `rotate` : `pan`,
        start: t,
        last: t,
        moved: 0,
        panning: !1,
        ratchet: 0,
        samples: [{ t: n, x: t.x, y: t.y }],
        touch: this.touchState(),
      }),
        this.onDragState?.(this.drag.mode));
    }
    touchState() {
      let e = [...this.pointers.values()];
      return e.length < 2
        ? null
        : {
            dist: Math.hypot(e[0].x - e[1].x, e[0].y - e[1].y),
            angle: Math.atan2(e[1].y - e[0].y, e[1].x - e[0].x),
            mid: { x: (e[0].x + e[1].x) / 2, y: (e[0].y + e[1].y) / 2 },
            twist: this.drag?.touch?.twist ?? 0,
          };
    }
    sample(e, t, n) {
      let r = n ?? performance.now();
      for (
        e.samples.push({ t: r, x: t.x, y: t.y });
        e.samples.length > 2 && r - e.samples[0].t > 100;
      )
        e.samples.shift();
    }
    move(e) {
      if (this.grab && e.pointerId === this.grab.id) {
        (this.grab.handler.move?.(e), this.onChange());
        return;
      }
      if (!this.drag || !this.pointers.has(e.pointerId)) return;
      if (!e.buttons) {
        this.up(e);
        return;
      }
      let t = this.toStage(e.clientX, e.clientY);
      this.pointers.set(e.pointerId, t);
      let n = this.drag;
      if (n.mode === `touch`) {
        let t = this.touchState();
        (t &&
          n.touch &&
          (this.zoomAt(t.dist / Math.max(1, n.touch.dist), t.mid),
          (this.zoomGoal = this.view.zoom),
          this.onZoom?.(),
          this.panBy(t.mid.x - n.touch.mid.x, t.mid.y - n.touch.mid.y),
          this.onPan?.(),
          this.sample(n, t.mid, e.timeStamp),
          (t.twist = n.touch.twist + ws(t.angle - n.touch.angle)),
          Math.abs(t.twist) > 40 * gs &&
            (this.turn(t.twist > 0 ? 1 : -1), (t.twist = 0))),
          (n.touch = t),
          (n.moved += 10),
          (n.panning = !0),
          this.onChange());
        return;
      }
      let r = t.x - n.last.x,
        i = t.y - n.last.y;
      if (
        ((n.last = t),
        (n.moved += Math.abs(r) + Math.abs(i)),
        n.mode === `rotate`)
      )
        ((n.ratchet += r),
          Math.abs(n.ratchet) > xs &&
            (this.turn(n.ratchet > 0 ? -1 : 1), (n.ratchet = 0)));
      else {
        if ((this.sample(n, t, e.timeStamp), n.panning)) this.panBy(r, i);
        else {
          if (Math.hypot(t.x - n.start.x, t.y - n.start.y) < 4) return;
          ((n.panning = !0), this.panBy(t.x - n.start.x, t.y - n.start.y));
        }
        (this.onPan?.(), this.onChange());
      }
    }
    up(e) {
      if (this.grab && e.pointerId === this.grab.id) {
        (this.grab.handler.up?.(e),
          (this.grab = null),
          this.onDragState?.(null),
          this.onChange());
        return;
      }
      if (!this.pointers.has(e.pointerId)) return;
      this.pointers.delete(e.pointerId);
      let t = this.drag;
      t &&
        (this.pointers.size === 0
          ? (t.panning
              ? this.fling(t, e.timeStamp)
              : t.mode === `pan` && e.button === 0 && this.onClick?.(e),
            (this.drag = null),
            this.onDragState?.(null))
          : (t.touch = this.touchState()));
    }
    fling(e, t = performance.now()) {
      let n = e.samples,
        r = n[n.length - 1];
      if (!r || t - r.t > 60) return;
      let i = n.find((e) => r.t - e.t <= 90) ?? n[0],
        a = r.t - i.t;
      if (a < 8) return;
      let o = (r.x - i.x) / a,
        s = (r.y - i.y) / a,
        c = Math.hypot(o, s);
      if (c < 0.08) return;
      let l = Math.min(1, Ss / c);
      (this.glide.set(o * l, s * l), this.onChange());
    }
    wheel(e) {
      if (this.overUi(e)) return;
      (e.preventDefault(), this.stopAnimation());
      let t = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
      ((this.zoomGoal = Ds(this.zoomGoal * Math.exp(-t * 0.0018), vs, ys)),
        (this.zoomAnchor = this.toStage(e.clientX, e.clientY)),
        this.onChange(),
        this.onZoom?.());
    }
    keydown(e) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      let t = document.activeElement;
      if (
        !t?.matches?.(`input, textarea, select`) &&
        !(
          e.code.startsWith(`Arrow`) &&
          t?.matches?.(`[role="tab"], [role="radio"]`)
        ) &&
        !(Ts.has(e.code) && Es(t))
      ) {
        if (Os[e.code])
          (this.keys.add(e.code),
            this.stopAnimation(),
            this.glide.set(0, 0),
            e.preventDefault(),
            this.onChange());
        else if (!e.repeat) {
          if (e.code === `KeyQ`) this.turn(-1);
          else if (e.code === `KeyE`) this.turn(1);
          else if (e.key === `+` || e.key === `=` || e.code === `PageUp`)
            this.zoomBy(1.3);
          else if (e.key === `-` || e.key === `_` || e.code === `PageDown`)
            this.zoomBy(1 / 1.3);
          else return;
          e.preventDefault();
        }
      }
    }
    axes() {
      let e = this.view.azimuth;
      return {
        right: new G(Math.cos(e), 0, -Math.sin(e)),
        away: new G(-Math.sin(e), 0, -Math.cos(e)),
      };
    }
    panBy(e, t) {
      let { right: n, away: r } = this.axes(),
        i = this.view.zoom * this.fit,
        a = Math.sin(this.view.elevation);
      (this.view.target
        .addScaledVector(n, -e / i)
        .addScaledVector(r, t / (i * a)),
        this.clampTarget());
    }
    clampTarget() {
      let e = this.view.target,
        t = this.bounds,
        n = Ds(e.x, t.minX, t.maxX),
        r = Ds(e.z, t.minZ, t.maxZ);
      ((n !== e.x || r !== e.z) && this.glide.set(0, 0), (e.x = n), (e.z = r));
    }
    groundAt(e, t) {
      let { cx: n, cy: r } = this.getSize(),
        { right: i, away: a } = this.axes(),
        o = this.view.zoom * this.fit,
        s = Math.sin(this.view.elevation);
      return this.view.target
        .clone()
        .addScaledVector(i, (e - n) / o)
        .addScaledVector(a, -(t - r) / (o * s));
    }
    zoomAt(e, t) {
      let n = this.view,
        r = n.zoom,
        i = Ds(r * e, vs, ys);
      if (t) {
        let { cx: e, cy: a } = this.getSize(),
          { right: o, away: s } = this.axes(),
          c = Math.sin(n.elevation),
          l = (1 / r - 1 / i) / this.fit;
        (n.target
          .addScaledVector(o, (t.x - e) * l)
          .addScaledVector(s, -((t.y - a) * l) / c),
          this.clampTarget());
      }
      n.zoom = i;
    }
    zoomBy(e) {
      this.stopAnimation();
      let { cx: t, cy: n } = this.getSize();
      ((this.zoomGoal = Ds(this.zoomGoal * e, vs, ys)),
        (this.zoomAnchor = { x: t, y: n }),
        this.onChange(),
        this.onZoom?.());
    }
    stopAnimation() {
      this.anim &&
        (this.anim.cancel(),
        (this.anim = null),
        (this.zoomGoal = this.view.zoom));
    }
    jumpTo(e) {
      (this.stopAnimation(), this.velocity.set(0, 0), this.glide.set(0, 0));
      let t = this.view;
      (e.target && t.target.set(...e.target),
        e.azimuth !== void 0 && (t.azimuth = e.azimuth),
        e.elevation !== void 0 && (t.elevation = e.elevation),
        e.zoom !== void 0 && (t.zoom = e.zoom),
        (this.zoomGoal = t.zoom),
        this.onChange());
    }
    animateTo(e, { duration: t = 1200, easing: n = ms.inOutCubic } = {}) {
      (this.stopAnimation(), this.velocity.set(0, 0), this.glide.set(0, 0));
      let r = this.view,
        i = {
          target: r.target.clone(),
          azimuth: r.azimuth,
          elevation: r.elevation,
          zoom: r.zoom,
        },
        a = e.target
          ? new G().fromArray(e.target.toArray ? e.target.toArray() : e.target)
          : i.target,
        o = e.azimuth === void 0 ? 0 : ws(e.azimuth - i.azimuth),
        s = e.elevation ?? i.elevation,
        c = e.zoom ?? i.zoom;
      return new Promise((e) => {
        let l = this.tweens.add({
          duration: t,
          easing: n,
          onUpdate: (e) => {
            (r.target.lerpVectors(i.target, a, e),
              (r.azimuth = ws(i.azimuth + o * e)),
              (r.elevation = i.elevation + (s - i.elevation) * e),
              (r.zoom = Math.exp(
                Math.log(i.zoom) + (Math.log(c) - Math.log(i.zoom)) * e,
              )),
              (this.zoomGoal = r.zoom),
              this.onChange());
          },
          onComplete: () => {
            (this.anim === l && (this.anim = null), e());
          },
        });
        ((l.goal = i.azimuth + o),
          (l.to = { target: a.toArray(), elevation: s, zoom: c }),
          (l.end = performance.now() + t),
          (this.anim = l));
      });
    }
    turn(e, t = 36 * gs) {
      let n = this.anim?.goal ?? this.view.azimuth,
        r = Math.round(ws(n - t) / _s) + e,
        i = this.anim?.to ?? {},
        a = this.anim ? this.anim.end - performance.now() : 0;
      return this.animateTo(
        { ...i, azimuth: ws(t + r * _s) },
        { duration: Math.max(620, a) },
      );
    }
    update(e) {
      let t = !1,
        n = new dr(),
        r = this.keys.has(`ShiftLeft`) || this.keys.has(`ShiftRight`) ? 2 : 1;
      for (let e of this.keys) {
        let t = Os[e];
        t && ((n.x += t[0]), (n.y += t[1]));
      }
      n.lengthSq() && n.normalize().multiplyScalar(bs * r);
      let i = 1 - Math.exp(-e / 70);
      if (
        ((this.velocity.x += (n.x - this.velocity.x) * i),
        (this.velocity.y += (n.y - this.velocity.y) * i),
        this.velocity.lengthSq() > 1
          ? (n.lengthSq() && (this.stopAnimation(), this.onPan?.()),
            this.panBy(
              (-this.velocity.x * e) / 1e3,
              (-this.velocity.y * e) / 1e3,
            ),
            (t = !0))
          : this.velocity.set(0, 0),
        this.glide.lengthSq() > 4e-4 && !this.drag
          ? (this.panBy(this.glide.x * e, this.glide.y * e),
            this.glide.multiplyScalar(Math.exp(-e / Cs)),
            (t = !0))
          : this.drag || this.glide.set(0, 0),
        !this.anim && Math.abs(Math.log(this.zoomGoal / this.view.zoom)) > 1e-4)
      ) {
        let n = (this.zoomGoal / this.view.zoom) ** (1 - Math.exp(-e / 75));
        (this.zoomAt(n, this.zoomAnchor), (t = !0));
      }
      return (t && this.onChange(), t);
    }
    get settled() {
      return (
        !this.anim &&
        !this.drag &&
        this.glide.lengthSq() <= 4e-4 &&
        this.velocity.lengthSq() <= 1 &&
        Math.abs(Math.log(this.zoomGoal / this.view.zoom)) <= 0.01
      );
    }
    get destination() {
      let e = this.anim;
      return e
        ? {
            target: new G(...e.to.target),
            azimuth: e.goal,
            elevation: e.to.elevation,
            zoom: e.to.zoom,
          }
        : this.view;
    }
    isNear(e, t = this.view) {
      let n = new G(...e.target);
      return (
        Math.abs(ws(t.azimuth - e.azimuth)) < 3 * gs &&
        Math.abs(t.elevation - e.elevation) < 3 * gs &&
        Math.abs(Math.log(t.zoom / e.zoom)) < 0.06 &&
        t.target.distanceTo(n) < 3
      );
    }
  },
  As = Math.PI / 180,
  js = new G(56, -4, -12),
  Y = -4,
  X = (e, t) => Wt(e, t).add(js),
  Ms = (e) => new G(...Gr(e)),
  Z = {
    red: `#d64a3a`,
    navy: `#2f3547`,
    orange: `#f0a53a`,
    yellow: `#f0b53a`,
    green: `#3fae6a`,
    blue: `#3d6fc4`,
    coral: `#ee7f62`,
    purple: `#8a63c9`,
    brown: `#7a5034`,
    teal: `#2aa38d`,
    pink: `#e2729a`,
  },
  Ns = { id: `breadboard`, build: mr, at: js };
function Q(e, t, n, r, i) {
  let a = typeof t == `string` ? Ms(t) : t,
    o = typeof n == `string` ? Ms(n) : n;
  return {
    id: e,
    key: [e, ...a.toArray(), ...o.toArray(), r].join(`|`),
    wire: !0,
    build: () => Rr(a, o, r, i),
  };
}
function Ps(e, t, n, r = Z.navy) {
  return {
    id: e,
    key: [e, ...t.toArray(), ...n.toArray(), r].join(`|`),
    wire: !0,
    build: () => y(t, n, r),
  };
}
var Fs = Q(`w-gnd`, `GND`, X(1, `-`), Z.navy, { arch: 10 }),
  Is = Q(`w-3v3`, `3V3`, X(1, `+`), Z.red, { arch: 13 });
function Ls(e, t = `color`, n = `led`) {
  let r = (e) => tt[e[t] ?? t] ?? tt.red;
  return { id: n, build: (e) => ot(r(e)), apply: (e, t) => Wn(e, r(t)), at: e };
}
function Rs(e = `color`, t = null) {
  return [
    t
      ? {
          id: `resistor`,
          key: (e) => `resistor|${e[t]}`,
          build: (e) => ir(e[t]),
          at: X(8, `c`),
        }
      : {
          id: `resistor`,
          key: `resistor|220`,
          build: () => ir(220),
          at: X(8, `c`),
        },
    Ls(X(10.5, `d`), e),
    Q(`w-g2`, `G2`, X(6, `a`), Z.orange, { arch: 10 }),
    Ps(`l-led`, X(11, `a`), X(11, `-`)),
  ];
}
function zs(e) {
  let t = X(e + 1.5, `b`);
  return (
    (t.y += 15.6),
    { id: `sensor`, build: () => Ae(), at: t, rot: [90 * As, 0, 0] }
  );
}
var Bs = 0.8,
  Vs = js.z + 11.43 + 12.8,
  Hs = (e) => Vs + e * Bs,
  Us = (e) => (e - Vs) / Bs;
function Ws(e) {
  return {
    id: `obstacle`,
    key: (e) => `obstacle|${e.obstacle}`,
    build: (e) => F(e.obstacle),
    at: (t) => new G(e, Y, Hs(t.gap)),
    interact: { type: `slide`, param: `gap`, toParam: (e) => Us(e.z) },
  };
}
var Gs = new G(47.6, Y, 34),
  Ks = (e) => Oe[e].clone().add(Gs),
  qs = new G(118, Y, -2),
  Js = new Qt(0, 36 * As, 0),
  Ys = (e) => Le[e].clone().applyEuler(Js).add(qs),
  Xs = new G(-24, Y, 44),
  Zs = (e) => h[e].clone().add(Xs),
  Qs = new G(114, Y, -4),
  $s = (e) => zr[e].clone().add(Qs),
  ec = new G(47.6, Y, 34),
  tc = (e) => Pr[e].clone().add(ec),
  nc = 34,
  rc = (e) => {
    let t = ec.x + nc * (1 - e.cover / 100);
    return new G(t, Y + (t - ec.x < 11 ? 1.6 : 0), ec.z + Bt.z);
  },
  ic = (e) =>
    Math.round(Math.max(0, Math.min(100, (1 - (e.x - ec.x) / nc) * 100))),
  ac = new G(115, Y, 0),
  oc = (e) => Tr[e].clone().add(ac),
  sc = 4095,
  cc = 2600;
function lc(e) {
  return Math.round(cc - 2480 * (e.cover / 100) ** 1.5);
}
var uc = [`G4`, `G2`, `G15`, `G13`, `G14`, `G27`, `G33`, `G32`],
  dc = new G(58, Y, 33),
  fc = (e) => new G(dc.x + (e - 3.5) * wn, dc.y + 1.6 + 2.5, dc.z - 15 + 3.2),
  pc = [Z.red, Z.orange, Z.yellow, Z.green, Z.teal, Z.blue, Z.purple, Z.pink],
  mc = new Set([`G4`, `G2`, `G15`]),
  hc = (e, t = new G(104, Y, 2)) => ({
    id: `phone`,
    key: `phone|${e}`,
    build: () => {
      let t = et();
      return (Lt(t, { mode: e }), t);
    },
    at: t,
    rot: [0, 36 * As, 0],
    interact: { type: `press`, input: `tap` },
  }),
  gc = new G(Math.cos(36 * As), 0, -Math.sin(36 * As)),
  _c = new G(Math.sin(36 * As), 0, Math.cos(36 * As)),
  vc = (e) => 58 + 14 * Math.log10(Math.max(1, e)),
  yc = (e) => gc.clone().multiplyScalar(vc(e)),
  bc = (e) => Math.max(1, Math.round(10 ** ((e.dot(gc) - 58) / 14))),
  xc = new G(0, 1, 0),
  Sc = (e, t, n = 0) => t.clone().applyAxisAngle(xc, n).add(e),
  Cc = new G(14, Y, -64),
  wc = 180 * As,
  Tc = new G(-42, Y, -64),
  Ec = new G(92, Y, -60),
  Dc = new G(-44, Y, -8),
  Oc = 90 * As,
  kc = new G(-82, Y, -14),
  Ac = new G(54, Y, -24),
  jc = new G(-61, Y, 61),
  Mc = { live: `#8a5a3c`, neutral: `#3a66c4`, probe: `#23262e` },
  Nc = -3.1,
  Pc = (e) => Sc(Cc, Ve[e], wc),
  Fc = (e) => Sc(Dc, b[e], Oc),
  Ic = (e) => Sc(Dc, ft[e], Oc),
  Lc = (e) => Sc(Ec, _e[e]),
  Rc = (e) => Sc(Ac, Ar[e]),
  zc = Sc(kc, oe),
  $ = (e, t, n) => new G(e, t, n),
  Bc = (e, t, n, r) => ({ id: e, key: e, wire: !0, build: () => wr(n, t, r) }),
  Vc = [
    {
      id: `tank`,
      build: ie,
      at: Ec,
      apply: (e, t) => {
        (Nt(e, t.level / 100), Dr(e, l.low, l.high));
      },
    },
    { id: `probe`, build: ee, at: Lc(`probe`) },
    { id: `well`, build: it, at: Tc },
    { id: `pump`, build: Ue, at: Cc, rot: [0, wc, 0] },
    { id: `strainer`, build: jr, at: $(Tc.x, 1.5, Tc.z) },
    {
      id: `pipe-in`,
      build: () => {
        let e = Pc(`inlet`);
        return qr([$(Tc.x, 1.5, Tc.z), $(Tc.x, e.y, Tc.z), e], {
          name: `Suction pipe`,
          desc: `The pump pulls water up out of the well through it.`,
        });
      },
      at: $(0, 0, 0),
    },
    {
      id: `pipe-out`,
      build: () => {
        let e = Pc(`outlet`),
          t = Lc(`hole`),
          n = t.y + 12;
        return qr([e, $(e.x, n, e.z), $(t.x, n, t.z), Lc(`inlet`)], {
          name: `Delivery pipe`,
          desc: `Carries the water from the pump up into the tank.`,
        });
      },
      at: $(0, 0, 0),
    },
    { id: `relay`, build: Te, at: Dc, rot: [0, Oc, 0] },
    { id: `socket`, build: On, at: kc },
    { id: `jsn`, build: N, at: Ac },
    hc(`tank`, jc),
    Q(`w-r-vcc`, `VIN`, Fc(`VCC`), Z.red, { arch: 6 }),
    Q(`w-r-gnd`, `GND2`, Fc(`GND`), Z.navy, { arch: 10 }),
    Q(`w-r-in`, `G27`, Fc(`IN`), Z.orange, { arch: 14 }),
    Q(`w-l-3v3`, `3V3`, Rc(`5V`), Z.red, { arch: 6 }),
    Q(`w-l-trig`, `G18`, Rc(`Trig`), Z.yellow, { arch: 10 }),
    Q(`w-l-echo`, `G19`, Rc(`Echo`), Z.green, { arch: 12 }),
    Q(`w-l-gnd`, `GND`, Rc(`GND`), Z.navy, { arch: 20 }),
    Bc(
      `c-com`,
      Mc.live,
      (() => {
        let e = Ic(`COM`),
          t = kc.x + 17,
          n = e.z - 5.3;
        return [
          zc.clone().add($(1, 0, 0)),
          zc.clone().add($(1, 6, 0)),
          $(t, zc.y + 6, zc.z),
          $(t, Nc, zc.z),
          $(t, Nc, n),
          $(e.x, Nc, n),
          $(e.x, e.y, n),
          e,
        ];
      })(),
    ),
    Bc(
      `c-no`,
      Mc.live,
      (() => {
        let e = Ic(`NO`),
          t = Pc(`cable`),
          n = t.z + 6.1;
        return [
          e,
          $(e.x, e.y, e.z - 4.3),
          $(e.x, Nc, e.z - 6.8),
          $(e.x, Nc, e.z - 9.3),
          $(t.x + 1.2, Nc, e.z - 9.3),
          $(t.x + 1.2, Nc, n),
          $(t.x + 1.2, t.y, n),
          $(t.x + 1.2, t.y, t.z),
        ];
      })(),
    ),
    Bc(
      `c-neutral`,
      Mc.neutral,
      (() => {
        let e = Pc(`cable`),
          t = e.z + 6.1,
          n = kc.z - 16,
          r = Ic(`NO`).z - 13.3;
        return [
          zc.clone().add($(-1, 0, 0)),
          zc.clone().add($(-1, 6, 0)),
          $(zc.x - 1, zc.y + 6, n),
          $(zc.x - 1, Nc, n),
          $(zc.x - 1, Nc, r),
          $(e.x - 1.2, Nc, r),
          $(e.x - 1.2, Nc, t),
          $(e.x - 1.2, e.y, t),
          $(e.x - 1.2, e.y, e.z),
        ];
      })(),
    ),
    Bc(
      `c-probe`,
      Mc.probe,
      (() => {
        let e = Lc(`probe`).add(Ne),
          t = Sc(Ac, rt),
          n = t.z;
        return [
          e,
          e.clone().setY(e.y + 2.5),
          $(e.x, e.y + 2.5, n),
          $(e.x, Nc, n),
          $(t.x + 6, Nc, n),
          $(t.x + 6, t.y, n),
          t,
        ];
      })(),
      {
        name: `Probe cable`,
        desc: `The probe’s long cable: it lets the board stay with the ESP32, away from the water.`,
      },
    ),
  ],
  Hc = new G(124, Y, -6),
  Uc = (e) => Rn[e].clone().add(Hc),
  Wc = new G(44, Y, -2),
  Gc = new G(Wc.x + 71, Y, Wc.z - 6.35),
  Kc = (e) => rn[e].clone().add(Wc);
function qc(e, t) {
  let n = u[e].clone().add(Gc),
    r = Qn[t].clone().add(Wc),
    i = -3.3;
  return [
    n,
    n.clone().setX(n.x - 6),
    new G(n.x - 6, i, n.z),
    new G(r.x + 6, i, n.z),
    new G(r.x + 6, r.y, n.z),
    r,
  ];
}
var Jc = [`G4`, `G2`, `G15`, `G13`, `G14`, `G27`, `G33`],
  Yc = new G(dc.x - wn / 2, Y, dc.z - 15 + 3.2 + 29 - 3),
  Xc = (e) => Object.values(jt)[e].clone().add(Yc),
  Zc = new G(-66, Y, -6),
  Qc = (e) =>
    ht
      .clone()
      .add(Zc)
      .setY(Y + ht.y + e),
  $c = new G(-8, Y, 44),
  el = (e) =>
    mn
      .clone()
      .add($c)
      .setY(Y + mn.y + e),
  tl = { x0: -75, x1: 92, z0: $c.z + 8, z1: $c.z + 52 },
  nl = (tl.z0 + tl.z1) / 2,
  rl = new G(22, Y, tl.z0 - 5),
  il = (e) => Wr[e].clone().add(rl),
  al = new G(rl.x, Y, tl.z1 + 3),
  ol = rl.x,
  sl = $c.x + ur.thick / 2 + 1.5,
  cl = (e) => 42 + (-104 * e) / 100,
  ll = (e) => Math.min(100, Math.max(0, ((e - 42) / -104) * 100)),
  ul = (e) => e + 0.5 < ol && e + br.length - 0.5 > ol,
  dl = (e) => al.z - (ul(e) ? nl + br.half : Ze.z + rl.z),
  fl = nl - br.half - $c.z;
function pl(e) {
  if (e >= 89.9) return 1 / 0;
  let t = (e * Math.PI) / 180;
  return ur.pivot + fl * Math.tan(t) - ur.half / Math.cos(t);
}
function ml(e, t = 1.5) {
  let n = $c.x - ur.thick / 2 - t - e,
    r = $c.x + ur.thick / 2 + t - e,
    i = 0;
  for (let e = Math.max(0, n); e <= Math.min(br.length, r); e += 0.5)
    i = Math.max(i, cn(e));
  return i;
}
var hl = new G(-45, Y, -5),
  gl = (e) => Ke[e].clone().add(hl),
  _l = (e) =>
    Ct.clone()
      .add(hl)
      .setY(Y + Ct.y + e),
  vl = hl.z + 70,
  yl = (e) => hl.x + 60 * (1 - (2 * e) / 100),
  bl = (e) =>
    Math.round(Math.max(0, Math.min(100, ((1 - (e - hl.x) / 60) * 100) / 2))),
  xl = bt.clone().add(hl),
  Sl = (e) => rr.clone().add(new G(yl(e), Y, vl)),
  Cl = new G(-40, Y, 48),
  wl = (e) =>
    P.clone()
      .add(Cl)
      .setY(Y + P.y + e),
  Tl = new G(-6, 50, 22),
  El = new G(1, -0.5, -0.6).normalize(),
  Dl = 5,
  Ol = [
    [`w-rd-vcc`, `VCC`, X(5, `+`), Z.red, { riseA: 22 }],
    [`w-rd-trig`, `Trig`, `G15`, Z.yellow, { riseA: 18 }],
    [`w-rd-echo`, `Echo`, `G4`, Z.green, { riseA: 18 }],
    [`w-rd-gnd`, `Gnd`, X(4, `-`), Z.navy, { riseA: 30, lift: 10 }],
  ],
  kl = (e, t) => {
    let n = dt(t);
    return n.centre.addScaledVector(n.side, Ee[e]).add(Cl);
  };
function Al(e, t, { riseA: n, lift: r = 0 }) {
  let i = dt(t);
  return (t, a) => {
    let o = i.centre
        .clone()
        .add(Cl)
        .setY(a.y)
        .addScaledVector(xc, Dl)
        .addScaledVector(i.back, Dl),
      s = o.clone().addScaledVector(i.back, 20).addScaledVector(xc, 3),
      c = new vr(o, s, Tl.clone().addScaledVector(El, -14), Tl),
      l = new st(c, Ee[e]),
      u = l.getPoint(0),
      d = l.getPoint(1),
      f = d.clone().addScaledVector(El, 12);
    f.y += r;
    let p = new Gn();
    return (
      p.add(
        new vr(
          t,
          t
            .clone()
            .lerp(d, 0.2)
            .setY(t.y + n),
          f,
          d,
        ),
      ),
      p.add(new ce(l)),
      p.add(
        new vr(
          u,
          u.clone().addScaledVector(i.back, -0.55 * Dl),
          a.clone().setY(a.y + 0.55 * Dl),
          a,
        ),
      ),
      p
    );
  };
}
var jl = Ol.map(([e, t, n, r, i]) =>
  Q(e, n, kl(t, 90), r, { route: Al(t, 90, i), turnB: dt(90).turn }),
);
function Ml(e, t) {
  let { turn: n } = dt(t);
  for (let [r, i, , , a] of Ol) {
    let o = e(r);
    o && zt(o, kl(i, t), Al(i, t, a), n);
  }
}
var Nl = new G(62, Y, 40),
  Pl = new Qt(0, 36 * As, 0),
  Fl = (e) => kn[e].clone().applyEuler(Pl).add(Nl),
  Il = 0.5,
  Ll = pe.clone().add(Cl),
  Rl = { z: Cl.z + 82, span: 72, half: 22.5, side: 9.5 },
  zl = (e) => Cl.x + Rl.span * ((2 * e) / 100 - 1),
  Bl = (e) =>
    Math.round(
      Math.max(0, Math.min(100, (((e - Cl.x) / Rl.span + 1) * 100) / 2)),
    ),
  Vl = new G(Cl.x - 50, Y, Cl.z + 40),
  Hl = new G(Cl.x + 46, Y, Cl.z + 42),
  Ul = [
    { box: [Vl.x - 13, Vl.x + 13, Vl.z, Vl.z + 22], jitter: 0.3, miss: 0 },
    { circle: [Hl.x, Hl.z + 11, 11], jitter: 1.4, miss: 0.06 },
  ],
  Wl = new G(30, Y, -80),
  Gl = (e) => e.clone().add(Wl),
  Kl = X(6.5, `d`).setZ(js.z),
  ql = X(11, `+b`).setZ(js.z + (Nn.rows[`+b`] + Nn.rows[`-b`]) / 2),
  Jl = X(15, `h`),
  Yl = new G(112, Y, -56);
function Xl(e, t, n) {
  let r = Gl(yn[e]),
    i = X(n, `h`),
    a = -3.3,
    o = r.z + 3.6 + t * 2.2,
    s = i.y + 9;
  return [
    r,
    r.clone().setZ(r.z + 2),
    new G(r.x, a, o),
    new G(i.x, a, o),
    new G(i.x, s, o),
    new G(i.x, s, i.z),
    i,
  ];
}
var Zl =
    (e, t = 0.3) =>
    (n, r) => {
      let i = Math.max(n.y, r.y) + e;
      return new vr(
        n,
        n.clone().add(new G(12, e * 0.6, 0)),
        new G(r.x, i, r.z).lerp(n, t).setY(i),
        r,
      );
    },
  Ql = Yt.clone().add(Jl),
  $l = hr.clone().add(Yl),
  eu = -2.8,
  tu = [
    $l,
    $l.clone().setX($l.x - 7),
    new G($l.x - 7, eu, $l.z),
    new G($l.x - 7, eu, js.z - 28),
    new G(Ql.x, eu, js.z - 28),
    new G(Ql.x, Ql.y, js.z - 28),
    Ql,
  ],
  nu = [
    { id: `buzzer`, build: Ln, at: X(9.5, `e`) },
    Q(`w-g18`, `G18`, X(8, `a`), Z.orange, { arch: 8 }),
    Ps(`l-buzzer`, X(11, `a`), X(11, `-`)),
  ],
  ru = {
    board: { parts: [] },
    blink: {
      parts: [
        Ns,
        ...Rs(`color`, `ohms`),
        {
          id: `resistor-r`,
          key: (e) => `resistor-r|${e.ohms}`,
          build: (e) => ir(e.ohms),
          at: X(16, `c`),
        },
        Ls(X(18.5, `d`), `color`, `led-r`),
        Q(`w-g4`, `G4`, X(14, `a`), Z.blue, { arch: 16 }),
        Ps(`l-led-r`, X(19, `a`), X(19, `-`)),
        Fs,
      ],
    },
    button: {
      parts: [
        Ns,
        ...Rs(`red`),
        Fs,
        {
          id: `door`,
          build: Me,
          at: Hc,
          apply: (e, t) => en(e, t.open),
          interact: { type: `knob`, param: `open`, min: 0, max: 90, sweep: 90 },
        },
        Q(`w-g4`, `G4`, X(21, `e`), Z.teal, { arch: 16 }),
        Q(`w-reed`, Uc(`signal`), X(21, `a`), Z.teal, {
          arch: 10,
          endA: !1,
          lean: 0.15,
        }),
        Q(`w-reed-gnd`, Uc(`ground`), X(22, `-`), Z.navy, {
          arch: 10,
          endA: !1,
          lean: 0.15,
        }),
      ],
    },
    wifi: { parts: [Ns, ...Rs(), Fs, hc(`wifi`)] },
    sound: {
      parts: [
        Ns,
        ...nu,
        {
          id: `r-red`,
          key: `r-red|220|3`,
          build: () => ir(220, 3 * wn),
          at: X(14.5, `c`),
        },
        Ls(X(16.5, `d`), `red`, `led-red`),
        Q(`w-g17`, `G17`, X(13, `a`), Z.red, { arch: 12 }),
        Ps(`l-red`, X(17, `a`), X(17, `-`)),
        {
          id: `r-blue`,
          key: `r-blue|220|3`,
          build: () => ir(220, 3 * wn),
          at: X(20.5, `c`),
        },
        Ls(X(22.5, `d`), `blue`, `led-blue`),
        Q(`w-g16`, `G16`, X(19, `a`), Z.blue, { arch: 16 }),
        Ps(`l-blue`, X(23, `a`), X(23, `-`)),
        Fs,
      ],
    },
    piano: {
      parts: [
        Ns,
        ...nu,
        Fs,
        {
          id: `keys`,
          build: _,
          at: dc,
          interact: { type: `press`, input: `key` },
        },
        ...uc.map((e, t) =>
          Q(`w-key${t}`, e, fc(t), pc[t], {
            arch: mc.has(e) ? 8 + t * 3 : 22 + (t - 3) * 3,
          }),
        ),
      ],
    },
    knob: {
      parts: [
        Ns,
        {
          id: `pot`,
          build: mt,
          at: Gs,
          apply: (e, t) => {
            e.userData.knob.rotation.y = -((t.pot / sc) * 270 - 135) * As;
          },
          interact: { type: `knob`, param: `pot`, min: 0, max: sc, sweep: 270 },
        },
        Q(`w-pot-gnd`, Ks(`GND`), X(7, `-`), Z.navy, { arch: 6 }),
        Q(`w-pot-out`, Ks(`OUT`), X(9, `a`), Z.green, { arch: 6 }),
        Q(`w-pot-vcc`, Ks(`VCC`), X(10, `+`), Z.red, { arch: 6 }),
        Q(`w-g34`, `G34`, X(9, `e`), Z.green, { arch: 18 }),
        { id: `ring`, build: C, at: X(22, `c`) },
        Q(`w-g5`, `G5`, X(21, `a`), Z.yellow, { arch: 16 }),
        Q(`w-vin`, `VIN`, X(22, `a`), Z.red, { arch: 28 }),
        Ps(`l-ring-gnd`, X(23, `a`), X(23, `-`)),
        Fs,
        Is,
      ],
    },
    rgb: {
      parts: [
        Ns,
        { id: `r-red`, build: () => ir(220), at: X(11, `c`) },
        { id: `r-green`, build: () => ir(220), at: X(16, `c`) },
        { id: `r-blue`, build: () => ir(220), at: X(21, `c`) },
        { id: `rgb`, build: Ie, at: Qs, apply: (e) => er(e, ...a[0].rgb) },
        Q(`w-g17`, `G17`, X(9, `a`), Z.coral, { arch: 8 }),
        Q(`w-g16`, `G16`, X(14, `a`), Z.green, { arch: 12 }),
        Q(`w-g4`, `G4`, X(19, `a`), Z.blue, { arch: 16 }),
        Q(`w-lamp-r`, X(13, `e`), $s(`R`), Z.coral, { arch: 18 }),
        Q(`w-lamp-g`, X(18, `d`), $s(`G`), Z.green, { arch: 13 }),
        Q(`w-lamp-b`, X(23, `b`), $s(`B`), Z.blue, { arch: 8 }),
        Q(`w-lamp-gnd`, X(23, `-`), $s(`GND`), Z.navy, { arch: 6 }),
        Fs,
        {
          id: `pad`,
          build: Jt,
          at: Xs,
          apply: (e) =>
            xn(
              e,
              a.map((e) => e.color),
            ),
          interact: { type: `press`, input: `key` },
        },
        Q(`w-k1`, Zs(`K1`), `G25`, Z.yellow, { arch: 14 }),
        Q(`w-k2`, Zs(`K2`), `G26`, Z.teal, { arch: 11 }),
        Q(`w-k3`, Zs(`K3`), `G27`, Z.pink, { arch: 8 }),
        Q(`w-k-gnd`, Zs(`GND`), `GND2`, Z.navy, { arch: 5 }),
      ],
    },
    light: {
      parts: [
        Ns,
        { id: `ldr`, build: Be, at: ec },
        Q(`w-ldr-gnd`, tc(`GND`), X(7, `-`), Z.navy, { arch: 6 }),
        Q(`w-ldr-out`, tc(`OUT`), X(9, `a`), Z.green, { arch: 6 }),
        Q(`w-ldr-vcc`, tc(`VCC`), X(10, `+`), Z.red, { arch: 6 }),
        Q(`w-g34`, `G34`, X(9, `e`), Z.green, { arch: 18 }),
        {
          id: `cap`,
          build: St,
          at: rc,
          interact: { type: `slide`, param: `cover`, toParam: ic },
        },
        {
          id: `resistor`,
          key: `resistor|220`,
          build: () => ir(220),
          at: X(18, `c`),
        },
        Q(`w-g2`, `G2`, X(16, `e`), Z.orange, { arch: 14 }),
        { id: `lamp`, build: Re, at: ac },
        Q(`w-lamp-plus`, oc(`plus`), X(20, `a`), Z.yellow, {
          arch: 7,
          endA: !1,
          lean: 0.5,
        }),
        Q(`w-lamp-minus`, oc(`minus`), X(21, `-`), Z.navy, {
          arch: 7,
          endA: !1,
          lean: 0.5,
        }),
        Fs,
        Is,
      ],
    },
    sensor: {
      parts: [
        Ns,
        zs(8),
        Ws(js.x - 6.35),
        Ps(`l-s-3v3`, X(8, `a`), X(8, `+`), Z.red),
        Ps(`l-s-gnd`, X(11, `a`), X(11, `-`)),
        Q(`w-g5`, `G5`, X(9, `d`), Z.yellow, { arch: 22, leanB: 0 }),
        Q(`w-g18`, `G18`, X(10, `e`), Z.green, { arch: 25, leanB: 0 }),
        Q(`w-g21`, `G21`, X(22, `i`), Z.blue, { arch: 12, leanB: 0 }),
        Q(`w-g22`, `G22`, X(21, `j`), Z.purple, { arch: 15, leanB: 0 }),
        { id: `oled`, build: ge, at: qs, rot: [0, 36 * As, 0] },
        Ps(`l-oled-3v3`, X(23, `+`), X(23, `a`), Z.red),
        Q(`w-oled-gnd`, X(20, `-`), Ys(`GND`), Z.navy, { arch: 8, leanB: 0 }),
        Q(`w-oled-vcc`, X(23, `c`), Ys(`VCC`), Z.red, { arch: 8, leanB: 0 }),
        Q(`w-oled-scl`, X(21, `f`), Ys(`SCL`), Z.purple, { arch: 8, leanB: 0 }),
        Q(`w-oled-sda`, X(22, `f`), Ys(`SDA`), Z.blue, { arch: 8, leanB: 0 }),
        Fs,
        Is,
      ],
    },
    motor: {
      parts: [
        { id: `driver`, build: Ge, at: Wc },
        { id: `motor`, build: Ur, at: Gc },
        Q(`w-g19`, `G19`, Kc(`A-IB`), Z.blue, { arch: 8 }),
        Q(`w-g18`, `G18`, Kc(`A-IA`), Z.orange, { arch: 8 }),
        Q(`w-vin`, `VIN`, Kc(`VCC`), Z.red, { arch: 20 }),
        Q(`w-gnd`, `GND`, Kc(`GND`), Z.navy, { arch: 10 }),
        Bc(`c-motor-red`, Z.red, qc(`plus`, `A2`), {
          radius: 0.7,
          bend: 2.5,
          name: `Motor wire`,
          desc: `Red, from the motor’s + tab to the driver’s motor A terminal.`,
        }),
        Bc(`c-motor-black`, `#23262e`, qc(`minus`, `A1`), {
          radius: 0.7,
          bend: 2.5,
          name: `Motor wire`,
          desc: `Black, from the motor’s − tab to the driver’s motor A terminal.`,
        }),
      ],
    },
    servo: {
      parts: [
        {
          id: `road`,
          build: () =>
            xe(tl.x1 - tl.x0, tl.z1 - tl.z0, sl - (tl.x0 + tl.x1) / 2),
          at: new G((tl.x0 + tl.x1) / 2, Y, nl),
        },
        { id: `gate`, build: Cn, at: $c },
        { id: `receiver`, build: Nr, at: rl },
        {
          id: `laser`,
          build: O,
          at: al,
          apply: (e, t) => _r(e, dl(Math.max(sl, cl(t.car)))),
        },
        {
          id: `car`,
          build: kr,
          at: (e) => new G(Math.max(sl, cl(e.car)), Y, nl),
          interact: { type: `slide`, param: `car`, toParam: (e) => ll(e.x) },
        },
        Q(`w-s-sig`, el(1.5), `G27`, Z.orange, {
          arch: 7,
          endA: !1,
          lean: 0.6,
          leanB: 0.25,
        }),
        Q(`w-s-vin`, el(0), `VIN`, Z.red, {
          arch: 4.5,
          endA: !1,
          lean: 0.6,
          leanB: 0.25,
        }),
        Q(`w-s-gnd`, el(-1.5), `GND2`, Z.brown, {
          arch: 3,
          endA: !1,
          lean: 0.6,
          leanB: 0.25,
        }),
        Q(`w-r-vcc`, `3V3`, il(`VCC`), Z.red, { arch: 4 }),
        Q(`w-r-gnd`, `GND`, il(`GND`), Z.navy, { arch: 7 }),
        Q(`w-r-out`, `G4`, il(`OUT`), Z.green, { arch: 10 }),
      ],
    },
    bluetooth: { parts: [Ns, ...Rs(), Fs, hc(`bt`)] },
    radar: {
      parts: [
        {
          id: `road`,
          build: () => xe(2 * Rl.span + 70, 30, 1e3),
          at: new G(Cl.x, Y, Rl.z),
        },
        {
          id: `scope`,
          build: yt,
          at: Cl,
          apply: (e, t) => Fn(e, t.range / Il, 90, 1, !1),
        },
        { id: `radar`, build: se, at: Cl },
        { id: `box`, build: () => F(`box`), at: Vl },
        { id: `ball`, build: () => F(`ball`), at: Hl },
        {
          id: `car`,
          build: fe,
          at: (e) => new G(zl(e.car), Y, Rl.z),
          interact: { type: `slide`, param: `car`, toParam: (e) => Bl(e.x) },
        },
        Ns,
        {
          id: `oled`,
          key: `oled|1.3`,
          build: () => ge({ big: !0 }),
          at: Nl,
          rot: [0, 36 * As, 0],
        },
        Q(`w-rd-sig`, wl(1.7), `G13`, Z.orange, {
          arch: 7,
          endA: !1,
          lean: 0.6,
          leanB: 0.25,
        }),
        Q(`w-rd-vin`, wl(0), `VIN`, Z.red, {
          arch: 4.5,
          endA: !1,
          lean: 0.6,
          leanB: 0.25,
        }),
        Q(`w-rd-sgnd`, wl(-1.7), `GND2`, Z.brown, {
          arch: 3,
          endA: !1,
          lean: 0.6,
          leanB: 0.15,
        }),
        ...jl,
        Q(`w-rd-g22`, `G22`, X(11, `e`), Z.purple, { arch: 6 }),
        Q(`w-rd-g21`, `G21`, X(13, `c`), Z.blue, { arch: 6 }),
        Q(`w-rd-oled-gnd`, X(7, `-`), Fl(`GND`), Z.navy, { arch: 8, leanB: 0 }),
        Q(`w-rd-oled-vcc`, X(8, `+`), Fl(`VCC`), Z.red, { arch: 8, leanB: 0 }),
        Q(`w-rd-oled-scl`, X(11, `a`), Fl(`SCL`), Z.purple, {
          arch: 8,
          leanB: 0,
        }),
        Q(`w-rd-oled-sda`, X(13, `a`), Fl(`SDA`), Z.blue, {
          arch: 8,
          leanB: 0,
        }),
        Fs,
        Is,
      ],
    },
    stepper: {
      parts: [
        { id: `axis`, build: Mn, at: Wl },
        {
          id: `feeder`,
          build: lr,
          at: Wl,
          interact: { type: `press`, input: `refill` },
        },
        { id: `bins`, build: Kn, at: Wl },
        {
          id: `pad`,
          build: Jt,
          at: Xs,
          apply: (e) => xn(e, Gt),
          interact: { type: `press`, input: `key` },
        },
        Q(`w-k1`, Zs(`K1`), `G25`, Z.yellow, { arch: 14 }),
        Q(`w-k2`, Zs(`K2`), `G26`, Z.teal, { arch: 11 }),
        Q(`w-k3`, Zs(`K3`), `G27`, Z.pink, { arch: 8 }),
        Q(`w-k-gnd`, Zs(`GND`), `GND2`, Z.navy, { arch: 5 }),
        Ns,
        { id: `a4988`, build: E, at: Kl },
        { id: `cap`, build: $t, at: ql },
        { id: `jack`, build: nr, at: Jl },
        { id: `adapter`, build: Pe, at: Yl },
        Bc(`c-st-dc`, `#23262e`, tu, {
          radius: 1.2,
          bend: 4,
          name: `12 V lead`,
          desc: `From the adapter to the DC jack: 12 V on the middle pin, ground round the outside.`,
        }),
        ...[`1B`, `1A`, `2A`, `2B`].map((e, t) =>
          Bc(`c-st-${e}`, M[e], Xl(e, t, 5 + t), {
            radius: 0.7,
            bend: 2.5,
            name: `Motor wire`,
            desc: `Green and black are one of the motor’s coils (1B, 1A), red and blue the other (2A, 2B).`,
          }),
        ),
        Ps(`l-st-gnd`, X(3, `j`), X(3, `-b`)),
        Ps(`l-st-mgnd`, X(9, `j`), X(9, `-b`)),
        Ps(`l-st-vmot`, X(10, `j`), X(10, `+b`), Z.red),
        Ps(`l-st-slp`, X(5, `b`), X(6, `b`), Z.green),
        Ps(`l-st-jack`, X(14, `j`), X(14, `+b`), Z.red),
        Ps(`l-st-jgnd`, X(16, `j`), X(16, `-b`)),
        Q(`w-st-3v3`, `3V3`, X(4, `j`), Z.red, { arch: 14 }),
        Q(`w-st-gnd`, `GND`, X(1, `-b`), Z.navy, { arch: 12 }),
        Q(`w-st-dir`, `G18`, X(3, `a`), Z.blue, { arch: 6 }),
        Q(`w-st-step`, `G19`, X(4, `b`), Z.purple, { arch: 7 }),
        Q(`w-st-home`, Gl(qn.NO), `G22`, Z.orange, { arch: 6, leanB: 0.08 }),
        Q(`w-st-home-gnd`, Gl(qn.COM), X(4, `-b`), Z.navy, { arch: 6 }),
        Q(`w-st-sig`, Gl(ar.SIG), `G23`, Z.yellow, { endA: !1, route: Zl(22) }),
        Q(`w-st-mgnd`, Gl(ar.GND), X(2, `-b`), Z.navy, {
          endA: !1,
          route: Zl(19, 0.12),
        }),
        Q(`w-st-12v`, Gl(ar[`12V`]), X(2, `+b`), Z.red, {
          endA: !1,
          route: Zl(15, 0.2),
        }),
      ],
    },
    solar: {
      parts: [
        { id: `track`, build: () => A(146), at: new G(hl.x, Y, vl) },
        { id: `tracker`, build: Ir, at: hl },
        {
          id: `sun`,
          build: te,
          at: (e) => new G(yl(e.sun), Y, vl),
          apply: (e) => gn(e, xl),
          interact: { type: `slide`, param: `sun`, toParam: (e) => bl(e.x) },
        },
        Q(`w-t-sig`, _l(1.7), `G13`, Z.orange, {
          arch: 6,
          endA: !1,
          lean: 0.6,
        }),
        Q(`w-t-vin`, _l(0), `VIN`, Z.red, { arch: 4, endA: !1, lean: 0.6 }),
        Q(`w-t-gnd`, _l(-1.7), `GND2`, Z.brown, {
          arch: 2,
          endA: !1,
          lean: 0.6,
        }),
        Q(`w-e-vcc`, `3V3`, gl(`VCC`), Z.red, { arch: 3 }),
        Q(`w-e-gnd`, `GND`, gl(`GND`), Z.navy, { arch: 3 }),
        Q(`w-e-l`, `G15`, gl(`L`), Z.green, { arch: 3 }),
        Q(`w-e-r`, `G4`, gl(`R`), Z.blue, { arch: 3 }),
      ],
    },
    espnow: {
      boardButtons: { BOOT: `bootA` },
      parts: [
        {
          id: `boardB`,
          build: () =>
            Qe(
              `Board B`,
              `A second ESP32 running the same sketch. Drag it away to test the range.`,
            ),
          at: (e) => yc(e.apart),
          buttons: { BOOT: `bootB` },
          interact: { type: `slide`, param: `apart`, toParam: bc },
        },
        {
          id: `apart`,
          build: vn,
          at: _c.clone().multiplyScalar(34).setY(-3.9),
          rot: [0, 36 * As, 0],
          apply: (e, t) => m(e, vc(t.apart), `${t.apart} m`),
        },
      ],
    },
    pump: { parts: Vc },
    keypad: {
      parts: [
        Ns,
        ...nu,
        Fs,
        {
          id: `keypad`,
          build: nt,
          at: Yc,
          interact: { type: `press`, input: `key` },
        },
        ...Jc.map((e, t) =>
          Q(`w-kp${t}`, e, Xc(t), pc[t], {
            arch: mc.has(e) ? 8 + t * 3 : 22 + (t - 3) * 3,
          }),
        ),
        { id: `safe`, build: Et, at: Zc },
        Q(`w-s-sig`, Qc(1.5), `G26`, Z.orange, {
          arch: 6,
          endA: !1,
          lean: 0.6,
        }),
        Q(`w-s-vin`, Qc(0), `VIN`, Z.red, { arch: 4, endA: !1, lean: 0.6 }),
        Q(`w-s-gnd`, Qc(-1.5), `GND2`, Z.brown, {
          arch: 2,
          endA: !1,
          lean: 0.6,
        }),
      ],
    },
    project: {
      parts: [
        Ns,
        zs(8),
        { id: `lights`, build: En, at: X(21.5, `b`) },
        { id: `bay`, build: () => H(36, 60), at: new G(js.x - 6.35, Y, 14.5) },
        Ws(js.x - 6.35),
        hc(`bay`, new G(104, Y, -22)),
        Ps(`l-sensor-3v3`, X(8, `a`), X(8, `+`), Z.red),
        Q(`w-g5`, `G5`, X(9, `d`), Z.yellow, { arch: 30, leanB: 0 }),
        Q(`w-g18`, `G18`, X(10, `d`), Z.green, { arch: 33, leanB: 0 }),
        Ps(`l-sensor-gnd`, X(11, `a`), X(11, `-`)),
        Ps(`l-lights`, X(20, `a`), X(20, `-`)),
        Q(`w-g21`, `G21`, X(21, `e`), Z.coral, { arch: 14, leanB: 0 }),
        Q(`w-g22`, `G22`, X(22, `e`), Z.yellow, { arch: 17, leanB: 0 }),
        Q(`w-g23`, `G23`, X(23, `e`), Z.green, { arch: 20, leanB: 0 }),
        Fs,
        Is,
      ],
    },
  },
  iu = {
    board: { target: [0, 0, 3.6], zoom: 10.6, frame: [2, -4.4, 54.1, 48.1] },
    blink: { target: [30, 0, -6], zoom: 7, frame: [4.6, 0.7, 119.3, 71.8] },
    button: { target: [63.7, 0, 2.7], zoom: 5, frame: [1.2, 2.6, 156.6, 112] },
    wifi: { target: [40, 0, -4], zoom: 6, frame: [4.8, 0.1, 133.5, 80.8] },
    sound: { target: [30, 0, -6], zoom: 7, frame: [4.6, 0.7, 119.3, 71.8] },
    piano: { target: [38, 0, 8], zoom: 5.6, frame: [6.4, -4.4, 119.3, 103.8] },
    knob: {
      target: [38.6, 0, 5.9],
      zoom: 6.4,
      frame: [4.7, -8.7, 119.3, 84.6],
    },
    rgb: { target: [33.5, 0, 14.7], zoom: 5, frame: [6, -5, 189.1, 91.1] },
    light: { target: [53.2, 0, 2.7], zoom: 6, frame: [-0.2, -6.6, 136.8, 97] },
    sensor: {
      target: [49.9, 0, 8.9],
      zoom: 5.6,
      frame: [12.4, -6.4, 149.5, 94.1],
    },
    motor: { target: [61.3, 0, -1.8], zoom: 5.4, frame: [0, 0, 155.7, 102.3] },
    servo: { target: [18, 0, 56], zoom: 4.6, frame: [0, 0, 136.4, 117] },
    bluetooth: { target: [40, 0, -4], zoom: 6, frame: [4.8, 0.1, 133.5, 80.8] },
    espnow: { target: [37.2, 0, -27], zoom: 6.4, frame: [-15, 0.5, 118, 58] },
    project: { target: [34, 0, 2], zoom: 6, frame: [20.2, 7.2, 147.6, 98.5] },
    pump: {
      target: [-2.6, 0, -38.7],
      zoom: 3.6,
      frame: [-0.5, -3.7, 258.8, 116.2],
    },
    keypad: { target: [-7, 0, 8], zoom: 3.4, frame: [3.2, -5.4, 198.5, 160.6] },
    solar: {
      target: [-58.4, 0, 11.6],
      zoom: 4,
      frame: [-1.1, 1.1, 164.1, 138.5],
    },
    radar: { target: [-19, 0, 28.5], zoom: 3.4, frame: [0, 0, 248.4, 146.6] },
    stepper: {
      target: [-37.4, 0, -63.5],
      zoom: 3.1,
      frame: [19.4, -12.9, 232.5, 216.5],
    },
  },
  au = (e) => ru[e]?.boardButtons ?? null;
function ou(e, t = {}) {
  return (ru[e] ?? ru.board).parts.map((e) => ({
    ...e,
    key: typeof e.key == `function` ? e.key(t) : (e.key ?? e.id),
    at: typeof e.at == `function` ? e.at(t) : e.at,
    build: () => e.build(t),
  }));
}
var su = new W(`#ffb340`);
function cu(e, t) {
  lu(e, +!!t);
}
function lu(e, t) {
  e &&
    (e.emissive.copy((e.userData.baseEmissive ??= e.emissive.clone())),
    t > 0 && e.emissive.copy(e.userData.on ?? su),
    (e.emissiveIntensity = 0.12 + t * 1.5),
    e.userData.glow && (e.userData.glow.material.opacity = t * 0.75));
}
function uu(e, t) {
  e &&
    ((e.lens.emissiveIntensity = 0.05 + t * (e.gain ?? 1.4)),
    (e.glow.material.opacity = t * 0.85),
    e.hue &&
      e.lens.color.copy(e.base).lerp(e.hue, Math.min(1, t * 1.3) * 0.85));
}
function du(e, t = 0.6) {
  let n = new R(160, 160);
  n.rotateX(-Math.PI / 2);
  let r = new Dn(
    n,
    new I({
      transparent: !0,
      depthWrite: !1,
      side: 2,
      uniforms: {
        color: { value: new W(e) },
        radius: { value: 2 },
        opacity: { value: 0 },
        spread: { value: t },
      },
      vertexShader: `
        varying vec2 vP;
        void main() {
          vP = (uv - 0.5) * ${(160).toFixed(1)};
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float radius;
        uniform float opacity;
        uniform float spread;
        varying vec2 vP;
        void main() {
          float d = length(vP);
          float a = abs(atan(vP.x, -vP.y));
          float ring = 1.0 - smoothstep(0.45, 1.0, abs(d - radius));
          float cone = 1.0 - smoothstep(spread - 0.1, spread + 0.08, a);
          float alpha = ring * cone * opacity;
          if (alpha < 0.01) discard;
          gl_FragColor = vec4(color, alpha);
          #include <colorspace_fragment>
        }
      `,
    }),
  );
  return (r.layers.set(1), r);
}
var fu = class {
    constructor(e, t) {
      ((this.scene = e), (this.sensor = t), (this.arcs = []), (this.last = 0));
      let n = new R(1.1, 1);
      (n.rotateX(-Math.PI / 2),
        (this.tape = new Dn(
          n,
          new I({
            transparent: !0,
            depthWrite: !1,
            uniforms: {
              length: { value: 10 },
              color: { value: new W(`#f86b1d`) },
            },
            vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
            fragmentShader: `
          uniform float length;
          uniform vec3 color;
          varying vec2 vUv;
          void main() {
            float d = fract(vUv.y * length / 3.0);
            if (d > 0.55) discard;
            gl_FragColor = vec4(color, 0.95);
            #include <colorspace_fragment>
          }
        `,
          }),
        )),
        this.tape.layers.set(1),
        e.add(this.tape));
    }
    update(e, t) {
      let n = this.sensor,
        r = new G(-13, 13, 0).applyMatrix4(n.matrixWorld),
        i = new G(13, 13, 0).applyMatrix4(n.matrixWorld);
      e - this.last > 220 &&
        ((this.last = e), this.spawn(r, `#26a586`, 1, t, e));
      for (let n of [...this.arcs]) {
        let r = (e - n.born) / n.life;
        r >= 1
          ? (this.scene.remove(n.mesh),
            n.mesh.geometry.dispose(),
            n.mesh.material.dispose(),
            this.arcs.splice(this.arcs.indexOf(n), 1),
            n.dir > 0 &&
              this.spawn(i.clone().setZ(i.z + t), `#f0a53a`, -1, t, e))
          : ((n.mesh.material.uniforms.radius.value = 2 + r * t),
            n.mesh.position.copy(n.origin),
            (n.mesh.material.uniforms.opacity.value =
              Math.sin(r * Math.PI) * 0.9));
      }
      let a = t + 12;
      (this.tape.scale.set(1, 1, a),
        this.tape.position.set((r.x + i.x) / 2, -3.9, r.z - 12 + a / 2),
        (this.tape.material.uniforms.length.value = a));
    }
    spawn(e, t, n, r, i) {
      let a = du(t);
      (n < 0 && (a.rotation.y = Math.PI),
        a.position.copy(e),
        this.scene.add(a),
        this.arcs.push({
          mesh: a,
          origin: e.clone(),
          dir: n,
          born: i,
          life: 260 + r * 12,
        }));
    }
    dispose() {
      for (let e of this.arcs)
        (this.scene.remove(e.mesh),
          e.mesh.geometry.dispose(),
          e.mesh.material.dispose());
      (this.scene.remove(this.tape),
        this.tape.geometry.dispose(),
        this.tape.material.dispose());
    }
  },
  pu = class {
    constructor(e) {
      ((this.scene = e), (this.rings = []));
    }
    emit(
      e,
      t,
      n = `#26a586`,
      {
        size: r = 26,
        life: i = 700,
        spread: a = Math.PI + 0.2,
        order: o = 0,
      } = {},
    ) {
      let s = du(n, a);
      (s.position.copy(e),
        (s.renderOrder = o),
        this.scene.add(s),
        this.rings.push({ mesh: s, born: t, life: i, size: r }));
    }
    update(e) {
      for (let t of [...this.rings]) {
        let n = (e - t.born) / t.life;
        n >= 1
          ? (this.scene.remove(t.mesh),
            t.mesh.geometry.dispose(),
            t.mesh.material.dispose(),
            this.rings.splice(this.rings.indexOf(t), 1))
          : ((t.mesh.material.uniforms.radius.value = 6 + n * t.size),
            (t.mesh.material.uniforms.opacity.value = (1 - n) * 0.9));
      }
      return this.rings.length > 0;
    }
    dispose() {
      for (let e of this.rings)
        (this.scene.remove(e.mesh),
          e.mesh.geometry.dispose(),
          e.mesh.material.dispose());
      this.rings = [];
    }
  };
function mu(e = 220, t = `red`) {
  return (Math.max(0, 3.3 - (w[t] ?? 2)) / e) * 1e3;
}
var hu = (e, t) => Math.min(1, (mu(e, t) / 5.9) ** 0.55),
  gu = [`C`, `C#`, `D`, `D#`, `E`, `F`, `F#`, `G`, `G#`, `A`, `A#`, `B`];
function _u(e) {
  if (!e) return `rest`;
  let t = Math.round(12 * Math.log2(e / 440)) + 57;
  return `${gu[((t % 12) + 12) % 12]}${Math.floor(t / 12)}`;
}
var vu = 170,
  yu = class {
    constructor(e) {
      ((this.fn = e), (this.key = null), (this.walk = null));
    }
    at(e, t = 0) {
      let n = e ? `${e}#${t}` : null;
      n !== this.key &&
        ((this.key = n), this.fn?.(e ? { text: e, nth: t } : null));
    }
    play(e, t, { loop: n = !1, intro: r = [] } = {}) {
      ((this.walk = { intro: r, steps: e, loop: n, t0: t }), this.update(t));
    }
    update(e) {
      let t = this.walk;
      if (!t) return;
      let n = (e) => e.reduce((e, t) => e + (t[2] ?? vu), 0),
        r = e - t.t0,
        i = t.intro;
      r >= n(t.intro) &&
        ((r -= n(t.intro)), (i = t.steps), t.loop && (r %= n(t.steps) || 1));
      let a = 0;
      for (; a < i.length - 1 && r >= (i[a][2] ?? vu);)
        ((r -= i[a][2] ?? vu), a++);
      let [o, s = 0] = i[a] ?? [];
      this.at(typeof o == `function` ? o() : o, s);
    }
    clear() {
      ((this.walk = null), this.at(null));
    }
  };
function bu() {
  let e = !1;
  return (t) => {
    let n = t && !e;
    return ((e = t), n);
  };
}
function xu(l, u) {
  let {
      scene: d,
      parts: f,
      leds: p,
      anchors: m = {},
      out: h,
      readout: g,
      params: _,
      inputs: v,
      setParam: y,
    } = u,
    b = performance.now(),
    x = (e) => f.get(e)?.group,
    S = new yu(u.trace),
    C = (e) => m[e]?.getWorldPosition(new G()) ?? null,
    w = 0,
    T = (e, t, n = 280) => {
      e - w < n || ((w = e), h(t));
    };
  if (l === `builtin`) {
    h(`Hello from the ESP32!`);
    let e = !1;
    return (
      S.play(
        [
          [`digitalWrite(LED, HIGH)`, 0, 260],
          [`delay(1000)`, 0, 740],
        ],
        b,
        {
          loop: !0,
          intro: [
            [`Serial.begin(115200)`, 0, 300],
            [`Serial.println("Hello`, 0, 400],
            [`pinMode(LED, OUTPUT)`, 0, 400],
          ],
        },
      ),
      {
        update(t) {
          return (
            S.update(t),
            e || t - b < 1100
              ? !1
              : ((e = !0), cu(p.LED, !0), h(`GPIO 2 → HIGH`), !0)
          );
        },
        stop() {
          (S.clear(), cu(p.LED, !1));
        },
      }
    );
  }
  if (l === `blink`) {
    let e = null,
      t = 0,
      n = b;
    return {
      update(r) {
        ((t += r - n), (n = r), (t %= _.rate * 2));
        let i = t < _.rate,
          a = hu(_.ohms, _.color);
        if (
          (uu(x(`led`)?.userData.light, i ? a : 0),
          uu(x(`led-r`)?.userData.light, i ? 0 : a),
          S.update(r),
          i === e)
        )
          return !1;
        e = i;
        let o = Math.min(vu, _.rate * 0.3);
        return (
          S.play(
            [
              [`digitalWrite(LEFT, ${i ? `HIGH` : `LOW`})`, 0, o],
              [`digitalWrite(RIGHT, ${i ? `LOW` : `HIGH`})`, 0, o],
              [`delay(`, +!i],
            ],
            r,
          ),
          cu(p.LED, i),
          h(
            i ? `GPIO 2 → HIGH · GPIO 4 → LOW` : `GPIO 2 → LOW · GPIO 4 → HIGH`,
          ),
          !0
        );
      },
      stop() {
        (S.clear(),
          uu(x(`led`)?.userData.light, 0),
          uu(x(`led-r`)?.userData.light, 0),
          cu(p.LED, !1));
      },
    };
  }
  if (l === `button`) {
    let e = null,
      t = null,
      r = b;
    return (
      S.play(
        [
          [`digitalRead(DOOR)`],
          [`if (!open)`],
          [`bool alarm`],
          [`digitalWrite(ALARM, alarm)`],
          [`delay(20)`],
        ],
        b,
        { loop: !0 },
      ),
      {
        update(i) {
          let a = _.open > 12;
          (a !== e &&
            ((e = a),
            h(n(a ? `GPIO 4 → HIGH (door open)` : `GPIO 4 → LOW (door shut)`))),
            a || (r = i));
          let s = i - r > _.grace;
          (S.update(i), uu(x(`led`)?.userData.light, s ? hu(220, `red`) : 0));
          let c = x(`door`),
            l = a
              ? s
                ? n(`ALARM · shut the door!`)
                : n(`open {s} s`, { s: o((i - r) / 1e3, 1) })
              : n(`door shut`);
          return (
            c &&
              g({ text: l, position: c.position.clone().add(new G(0, 66, 0)) }),
            s !== t &&
              ((t = s),
              cu(p.LED, s),
              s &&
                h(
                  n(`Open for over {s} s: alarm on`, {
                    s: o(_.grace / 1e3, 1),
                  }),
                )),
            !0
          );
        },
        stop() {
          (S.clear(), uu(x(`led`)?.userData.light, 0), cu(p.LED, !1), g(null));
        },
      }
    );
  }
  if (l === `wifi`) {
    let e = new pu(d),
      t = bu(),
      r = null,
      i = 0,
      a = !1,
      o = !1,
      c = b,
      l = 0,
      u = () => s[_.network] ?? s.home,
      f = (e) => {
        let t = x(`phone`);
        t &&
          Lt(t, {
            mode: `wifi`,
            online: a,
            lit: o,
            address: u().ip,
            pressed: e < l,
          });
      },
      m = (e) => {
        ((r = _.network),
          (a = !1),
          (i = e + 1400),
          h(n(`Joining {ssid}…`, { ssid: u().ssid })),
          S.play(
            [
              [`WiFi.begin(SSID, PASS)`, 0, 320],
              [`while (WiFi.status()`, 0, 1080],
            ],
            e,
          ),
          f(e));
      },
      y = (e, t = []) =>
        S.play([[`server.handleClient()`, 0, 600]], e, { loop: !0, intro: t });
    return (
      m(b),
      {
        update(s) {
          (_.network !== r && m(s),
            !a &&
              s >= i &&
              ((a = !0),
              h(u().ip),
              y(s, [
                [`Serial.println(WiFi.localIP())`, 0, 360],
                [`server.on("/toggle"`, 0, 300],
                [`server.begin()`, 0, 300],
              ]),
              f(s)));
          let d = C(`antenna`);
          if (
            (d &&
              s >= c &&
              ((c = s + (a ? 1300 : 420)),
              e.emit(d, s, `#2f78c4`, { size: 34, life: 1100 })),
            t(!!v.tap))
          ) {
            let t = x(`phone`);
            (a
              ? ((o = !o),
                (l = s + 160),
                h(`GET /toggle → ${o ? `ON` : `OFF`}`),
                y(s, [
                  [`lit = !lit`, 0, 200],
                  [`digitalWrite(LED, lit)`, 0, 200],
                  [`server.send(200`, 0, 260],
                ]),
                cu(p.LED, o),
                t &&
                  e.emit(
                    t.userData.anchor.getWorldPosition(new G()).setY(4),
                    s,
                    `#f86b1d`,
                    { size: 30, life: 800 },
                  ))
              : h(n(`(the phone can’t reach the board yet)`)),
              f(s));
          }
          return (
            l && s >= l && ((l = 0), f(s)),
            uu(x(`led`)?.userData.light, o ? hu(220, _.color) : 0),
            d &&
              g({
                text: a ? `IP ${u().ip}` : n(`joining Wi-Fi…`),
                position: d.clone().setY(16),
              }),
            e.update(s),
            S.update(s),
            !0
          );
        },
        stop() {
          (S.clear(),
            e.dispose(),
            uu(x(`led`)?.userData.light, 0),
            cu(p.LED, !1),
            g(null),
            (a = !1),
            (o = !1),
            f(0));
        },
      }
    );
  }
  if (l === `bluetooth`) {
    let t = new pu(d),
      r = bu(),
      i = [],
      a = !1,
      o = !1,
      s = null,
      c = 0,
      l = null,
      u = () => e[_.name] ?? `ESP32`,
      f = () => {
        let e = x(`phone`);
        e && Lt(e, { mode: `bt`, online: a, lit: o, name: u(), lines: i });
      },
      m = (e, t = []) =>
        S.play([[`bt.available()`, 0, 500]], e, { loop: !0, intro: t }),
      y = (e) => {
        ((s = _.name),
          (a = !1),
          (i.length = 0),
          (c = e + 900),
          h(n(`Bluetooth on as “{name}”`, { name: u() })),
          m(e, [[`bt.begin(`, 0, 400]]),
          f());
      };
    return (
      y(b),
      {
        update(e) {
          (_.name !== s && y(e),
            !a && e >= c && ((a = !0), h(n(`Phone connected`)), f()));
          let d = C(`antenna`),
            b = x(`phone`)?.userData.anchor.getWorldPosition(new G()).setY(4);
          if (r(!!v.tap) && a && !l) {
            let n = o ? `off` : `on`;
            (i.push([n, !0]),
              h(`← ${n}`),
              b && t.emit(b, e, `#2f78c4`, { size: 30, life: 800 }),
              (o = n === `on`),
              cu(p.LED, o),
              (l = { at: e + 450, cmd: n }),
              m(e, [
                [`bt.readStringUntil`, 0, 160],
                [`cmd.trim()`, 0, 160],
                [`if (cmd == "${n}")`, 0, 220],
                [`bt.println(`, 0, 220],
              ]),
              f());
          }
          return (
            l &&
              e >= l.at &&
              (i.push([`LED ${l.cmd}`, !1]),
              h(`→ LED ${l.cmd}`),
              d && t.emit(d, e, `#2f78c4`, { size: 30, life: 800 }),
              (l = null),
              f()),
            uu(x(`led`)?.userData.light, o ? hu(220, _.color) : 0),
            d &&
              g({
                text: a
                  ? n(`paired · {name}`, { name: u() })
                  : n(`waiting to pair…`),
                position: d.clone().setY(16),
              }),
            t.update(e),
            S.update(e),
            !0
          );
        },
        stop() {
          (S.clear(),
            t.dispose(),
            uu(x(`led`)?.userData.light, 0),
            cu(p.LED, !1),
            g(null),
            (a = !1),
            (o = !1),
            (i.length = 0),
            f());
        },
      }
    );
  }
  if (l === `espnow`) return Eu(u, { start: b, part: x, trace: S, at: C });
  if (l === `pump`) return Pu(u, { start: b, part: x, trace: S });
  if (l === `knob`) {
    let e = ``,
      t = new W();
    S.play(
      [
        [`analogRead(POT)`],
        [`map(value`],
        [`ring.setPixelColor`, 0, 260],
        [`ring.show()`],
        [`Serial.println(value)`],
        [`delay(50)`],
      ],
      b,
      { loop: !0 },
    );
    let r = (e) => {
      let n = x(`ring`);
      if (!n) return;
      let r = 0.25 + 0.75 * (_.bright / 255);
      for (let i = 0; i < 12; i++)
        (_.style === `blue`
          ? t.setRGB(0, 90 / 255, 1, le)
          : _.style === `rainbow`
            ? t.setHSL(i / 12, 1, 0.5, le)
            : t.setRGB((i * 20) / 255, (255 - i * 20) / 255, 0, le),
          Yn(n, i, i < e ? t : null, r));
    };
    return {
      update(t) {
        S.update(t);
        let i = Math.round(_.pot),
          a = Math.floor((i * 12) / sc),
          o = `${a}|${_.style}|${_.bright}`,
          s = x(`pot`);
        return (
          s &&
            g({
              text: n(a === 1 ? `{value} → {n} LED` : `{value} → {n} LEDs`, {
                value: i,
                n: a,
              }),
              position: s.position.clone().add(new G(-23, 12, 7)),
            }),
          T(t, `${i}`, 300),
          o !== e && ((e = o), r(a), !0)
        );
      },
      stop() {
        (S.clear(), r(0), g(null));
      },
    };
  }
  if (l === `rgb`) {
    let e = [0, 1, 2].map(() => bu()),
      t = 0,
      r = ``,
      i = (e, t = []) =>
        S.play(
          [
            [`digitalRead(KEYS[i])`, 0, 140],
            [`delay(20)`, 0, 140],
          ],
          e,
          { loop: !0, intro: t },
        ),
      o = [
        [`ledcWrite(RED, COLOURS`],
        [`ledcWrite(GREEN, COLOURS`],
        [`ledcWrite(BLUE, COLOURS`],
      ];
    return (
      i(b, [[`ledcAttach(RED`], [`pinMode(k`], [`show(0)`, 0, 200], ...o]),
      {
        update(s) {
          for (let n = 0; n < 3; n++)
            e[n](!!v[`key${n}`]) &&
              ((t = n),
              (r = ``),
              i(s, [[`digitalRead(KEYS[i])`, 0, 160], ...o]));
          let [c, l, u] = a[t].rgb,
            d = x(`rgb`);
          (d && er(d, c, l, u),
            uu(d?.userData.light, Math.max(c, l, u) / 255),
            d &&
              g({
                text: n(`button {n} · {colour}`, {
                  n: t + 1,
                  colour: n(a[t].label),
                }),
                position: d.position.clone().add(new G(6, 44, 0)),
              }),
            S.update(s));
          let f = `${t}|${c},${l},${u}`;
          return (
            f !== r &&
            ((r = f),
            h(
              n(`button {n} → {colour}: ledcWrite {r}, {g}, {b}`, {
                n: t + 1,
                colour: n(a[t].label).toLowerCase(),
                r: c,
                g: l,
                b: u,
              }),
            ),
            !0)
          );
        },
        stop() {
          (S.clear(), uu(x(`rgb`)?.userData.light, 0), g(null));
        },
      }
    );
  }
  if (l === `light`) {
    let e = null,
      t = -1 / 0,
      r = lc(_);
    return (
      S.play(
        [
          [`analogRead(SENSOR)`],
          [`Serial.println(light)`],
          [`if (light <`],
          [
            () => (e ? `digitalWrite(LAMP, HIGH)` : `digitalWrite(LAMP, LOW)`),
            0,
            200,
          ],
          [`delay(500)`, 0, 300],
        ],
        b,
        { loop: !0 },
      ),
      {
        update(i) {
          i - t > 500 &&
            ((t = i),
            (r = Math.max(
              0,
              Math.min(sc, lc(_) + Math.round((Math.random() * 2 - 1) * 24)),
            )),
            h(`${r}`));
          let a = r < _.threshold;
          S.update(i);
          let o = x(`ldr`);
          if (
            (o &&
              g({
                text: n(a ? `light {value} · dark` : `light {value}`, {
                  value: r,
                }),
                position: o.position.clone().add(new G(-20, 4, 6)),
              }),
            a !== e)
          ) {
            e = a;
            let t = x(`lamp`);
            (t && dn(t, a),
              cu(p.LED, a),
              h(
                n(
                  a
                    ? `{value} < {limit} · dark, lamp ON`
                    : `{value} ≥ {limit} · light, lamp off`,
                  { value: r, limit: _.threshold },
                ),
              ));
          }
          return !0;
        },
        stop() {
          S.clear();
          let e = x(`lamp`);
          (e && dn(e, !1), cu(p.LED, !1), g(null));
        },
      }
    );
  }
  if (l === `sensor` || l === `project`) {
    let e = x(`sensor`);
    if (!e) return null;
    let t = l === `project`,
      r = new fu(d, e),
      i = x(`oled`),
      a = bu(),
      o = null,
      c = null,
      u = 0,
      f = _.gap,
      p = !t,
      m = 0,
      C = 0,
      w = null,
      T = () => (f || 400) <= _.far,
      E = (e) => {
        let t = x(`phone`);
        t &&
          Lt(t, {
            mode: `bay`,
            online: p,
            taken: T(),
            address: s.home.ip,
            pressed: e < C,
          });
      },
      D = [
        [`digitalWrite(TRIG, HIGH)`],
        [`delayMicroseconds(10)`],
        [`digitalWrite(TRIG, LOW)`],
        [`pulseIn(ECHO`, 0, 260],
      ],
      O = () =>
        [`digitalWrite(RED`, `digitalWrite(YLW`, `digitalWrite(GRN`][o ?? 2];
    return (
      t
        ? (h(n(`Joining {ssid}…`, { ssid: `your-network` })),
          S.play(
            [
              [`WiFi.begin(`, 0, 320],
              [`while (WiFi.status()`, 0, 1080],
            ],
            b,
          ))
        : S.play(
            [
              ...D,
              [`Serial.println(cm)`],
              [`display.print(`, 0, 120],
              [`display.display()`, 0, 120],
              [`delay(`, 0, 300],
            ],
            b,
            { loop: !0 },
          ),
      {
        shadows: !0,
        pinger: r,
        update(d) {
          if ((S.update(d), _.sweep)) {
            let e = 26 + 20 * Math.sin((d - b) * 55e-5 - 0.4);
            y(`gap`, Math.round(e * 10) / 10);
          }
          let k = x(`obstacle`);
          if (k) {
            if (c !== null)
              for (let e of k.userData.wheels ?? [])
                e.rotation.z += (k.position.z - c) / 3.168;
            c = k.position.z;
          }
          if (!p) {
            if (d < b + 1400) return !0;
            ((p = !0),
              h(s.home.ip),
              S.play(
                [
                  ...D,
                  [O, 0, 340],
                  [`server.handleClient()`, 0, 120],
                  [`delay(60)`],
                ],
                d,
                {
                  loop: !0,
                  intro: [
                    [`Serial.println(WiFi.localIP())`, 0, 360],
                    [`server.on("/"`, 0, 300],
                    [`server.begin()`, 0, 300],
                  ],
                },
              ));
          }
          if (
            (e.updateMatrixWorld(!0),
            r.update(d, _.gap * Bs),
            d - u > (_.interval ?? 60))
          ) {
            u = d;
            let e = k?.userData.echo ?? { jitter: 0, miss: 0 };
            ((f =
              Math.random() < e.miss
                ? 0
                : Math.max(
                    2,
                    Math.round(_.gap + (Math.random() * 2 - 1) * e.jitter),
                  )),
              l === `sensor` && h(f ? `${f} cm` : `0  ${n(`(no echo)`)}`),
              i && sr(i, f, _.full));
          }
          let A = new G(e.position.x, -2, e.position.z + 13 + (_.gap * Bs) / 2);
          g({ text: f ? `${f} cm` : n(`no echo`), position: A });
          let j = x(`lights`)?.userData.lights;
          if (j) {
            let e = f || 400,
              t = e > _.far ? 2 : +(e > _.near);
            t !== o &&
              ((o = t),
              j.forEach((e, n) => uu(e, +(n === t))),
              h(
                `${e} cm · ${n([`RED · stop!`, `YELLOW · slow down`, `GREEN · come on in`][t])}`,
              ));
          }
          if (t) {
            let e = a(!!v.tap);
            if ((e && ((C = d + 160), (m = d)), d >= m)) {
              m = d + 2e3;
              let t = T() ? `TAKEN` : `FREE`;
              ((t !== w || e) && h(`GET / → Bay 1: ${t}`), (w = t), E(d));
            } else C && d >= C && ((C = 0), E(d));
          }
          return !0;
        },
        stop() {
          (S.clear(),
            r.dispose(),
            g(null),
            x(`lights`)?.userData.lights?.forEach((e) => uu(e, 0)),
            i && sr(i, null),
            t && ((p = !1), E(0)));
        },
      }
    );
  }
  if (l === `sound`) {
    let e = new pu(d),
      t = null,
      r = 0,
      a = 0,
      o = b,
      s = null,
      c = null,
      l = 0,
      f = {
        red: x(`led-red`)?.userData.light,
        blue: x(`led-blue`)?.userData.light,
      };
    return {
      update(d) {
        let p = Math.max(1, _.step);
        (_.siren !== t &&
          ((t = _.siren),
          (r = 0),
          (a = 0),
          h(
            n(
              {
                wail: `siren: wail, 600 ↔ 1400 Hz`,
                yelp: `siren: yelp, 600 → 1400 Hz`,
                hilo: `siren: hi-lo, 960 / 770 Hz`,
              }[t],
            ),
          )),
          (r += d - o),
          (o = d));
        let m = { wail: 160, yelp: 20, hilo: 100 }[t] * p;
        for (; r >= m;) ((r -= m), a++);
        let v,
          y,
          b,
          C = Math.floor(r / p);
        (t === `wail`
          ? ((y = C < 80),
            (v = y ? 600 + C * 10 : 1400 - (C - 80) * 10),
            (b = +!y))
          : t === `yelp`
            ? ((y = a % 2 == 0), (v = 600 + C * 40), (b = 0))
            : ((y = r < 50 * p), (v = y ? 960 : 770), (b = +!y)),
          S.at(
            t === `hilo` || Math.floor(d / vu) % 2 ? `delay(` : `tone(BUZZER`,
            b,
          ));
        let w = y ? `red` : `blue`;
        (w !== c &&
          ((c = w),
          uu(f.red, +!!y),
          uu(f.blue, +!y),
          h(n(y ? `RED on · blue off` : `BLUE on · red off`))),
          u.sound() &&
            ((s ??= i(v, _.volume / 100)),
            s?.setFrequency(v),
            s?.setVolume(_.volume / 100)));
        let T = x(`buzzer`);
        return (
          T &&
            d >= l &&
            ((l = d + 220),
            e.emit(
              T.userData.top.clone().applyMatrix4(T.matrixWorld),
              d,
              y ? `#e0463c` : `#2f78c4`,
            )),
          T &&
            g({
              text: `♪ ${v} Hz`,
              position: T.position.clone().add(new G(0, 22, 0)),
            }),
          e.update(d),
          !0
        );
      },
      stop() {
        (S.clear(),
          s?.stop(),
          (s = null),
          e.dispose(),
          uu(f.red, 0),
          uu(f.blue, 0),
          g(null));
      },
    };
  }
  if (l === `piano`) {
    let e = new pu(d),
      n = x(`keys`),
      a = n?.userData.keys ?? [],
      o = -1,
      s = null,
      c = 0,
      l = -1,
      f = [
        [`int key = -1`, 0, 120],
        [`touchRead(KEYS[i])`, 0, 260],
        [`if (key != playing)`, 0, 160],
        [`delay(10)`, 0, 120],
      ];
    S.play(f, b, { loop: !0 });
    let p = () => {
      (s?.stop(), (s = null));
    };
    return {
      update(d) {
        let m = -1;
        if (_.autoplay) {
          let e = (d - b) % (r.length * 340),
            t = Math.floor(e / 340);
          e - t * 340 < 260 && (m = r[t]);
        }
        m !== l &&
          (a[l] && !v[`key${l}`] && (a[l].tile.position.y = a[l].y0),
          a[m] && (a[m].tile.position.y = a[m].y0 - 0.9),
          (l = m));
        let y = a.map((e, t) => !!v[`key${t}`] || t === m),
          C = y.map(
            (e) => (e ? 14 : 68) + Math.round((Math.random() * 2 - 1) * 3),
          ),
          w = -1;
        if (
          (C.forEach((e, t) => {
            e < _.threshold && (w = t);
          }),
          a.forEach((e, t) => {
            e.pad.emissiveIntensity = t === w ? 0.9 : y[t] ? 0.35 : 0;
          }),
          w !== o)
        ) {
          if (((o = w), p(), w < 0))
            (h(`noTone(18)`),
              S.play(f, d, { loop: !0, intro: [[`noTone(BUZZER)`, 0, 220]] }),
              g(null));
          else {
            let e = t[w];
            (u.sound() && (s = i(e, _.volume / 100)),
              h(`${k[w]}  ·  touchRead ${C[w]} → tone(18, ${e})`),
              S.play(f, d, {
                loop: !0,
                intro: [
                  [`tone(BUZZER, NOTES[key])`, 0, 220],
                  [`Serial.println(NAMES[key])`, 0, 220],
                ],
              }),
              (c = d));
          }
        }
        s?.setVolume(_.volume / 100);
        let T = x(`buzzer`);
        if (
          (o >= 0 &&
            d >= c &&
            T &&
            ((c = d + 260),
            e.emit(T.userData.top.clone().applyMatrix4(T.matrixWorld), d)),
          o >= 0 && n)
        ) {
          let e = a[o].tile.getWorldPosition(new G());
          g({ text: `♪ ${k[o]} · ${_u(t[o])}`, position: e.setY(e.y + 14) });
        }
        return (e.update(d), S.update(d), !0);
      },
      stop() {
        (S.clear(),
          p(),
          e.dispose(),
          g(null),
          a.forEach((e, t) => {
            ((e.pad.emissiveIntensity = 0),
              v[`key${t}`] || (e.tile.position.y = e.y0));
          }));
      },
    };
  }
  if (l === `motor`) {
    let e = 4.2,
      t = x(`motor`)?.userData.wheel,
      r = 0,
      i = -1;
    return {
      shadows: !0,
      update(a, o) {
        let s = _.run,
          c = (a - b) % (2 * s + 1e3),
          l = c < s ? 0 : c < s + 500 ? 1 : c < 2 * s + 500 ? 2 : 3,
          u = [_.speed, 0, -_.speed, 0][l];
        (l !== i &&
          ((i = l),
          h(
            [
              `drive(${_.speed})  ${n(`forwards`)}`,
              `drive(0)  ${n(`stop`)}`,
              `drive(-${_.speed})  ${n(`backwards`)}`,
              `drive(0)  ${n(`stop`)}`,
            ][l],
          ),
          S.play(
            [
              [`drive(`, l + 1, 220],
              [`delay(`, l, 400],
            ],
            a,
          )),
          S.update(a));
        let d = (u / 255) * e;
        ((r += (d - r) * Math.min(1, o / (u ? 260 : 420))),
          t && (t.rotation.z -= (r * o) / 1e3));
        let f = Math.round((r / e) * 100),
          p = x(`motor`);
        return (
          p &&
            g({
              text:
                Math.abs(f) < 2
                  ? n(`stopped`)
                  : `${n(f > 0 ? `forwards ↻` : `backwards ↺`)} ${Math.abs(f)}%`,
              position: p.position.clone().add(new G(8, 52, 23.5)),
            }),
          !0
        );
      },
      stop() {
        (S.clear(), g(null));
      },
    };
  }
  if (l === `keypad`) {
    let e = ln.map(() => bu()),
      t = ``,
      r = 0,
      i = `locked`,
      a = 0,
      o = 0,
      s = 0,
      l = 0,
      d = ``,
      f = 0,
      p = (e, t) => u.sound() && c(e, t, 0.35),
      m = (e, t = []) =>
        S.play([[`keypad.getKey()`, 0, 300]], e, { loop: !0, intro: t });
    m(b, [[`latch.attach(26)`], [`latch.write(0)`, 0, 300]]);
    let y = (e, a) => {
      if ((p(2e3, 30), a === `*`))
        ((t = ``),
          h(n(`* → start again`)),
          m(e, [[`tone(BUZZER, 2000`], [`start again`, 0, 200]]));
      else if (a !== `#`)
        ((t = (t + a).slice(-8)),
          h(n(`key {key} → typed "{typed}"`, { key: a, typed: t })),
          m(e, [[`tone(BUZZER, 2000`], [`typed += key`, 0, 200]]));
      else if (t === _.code)
        ((r = 0),
          h(n(`# → "{typed}" is right: unlocking`, { typed: t })),
          (t = ``),
          (i = `unlocking`),
          (o = 90),
          S.play(
            [
              [`typed == CODE`],
              [`latch.write(90)`, 0, 300],
              [`delay(`, 0, _.open],
            ],
            e,
          ));
      else {
        r += 1;
        let i = r === 3;
        (h(
          i
            ? n(`# → "{typed}" is wrong, 3 in a row: ALARM`, { typed: t })
            : n(`# → "{typed}" is wrong ({n} of 3)`, { typed: t, n: r }),
        ),
          p(300, i ? 2e3 : 400),
          (d = n(i ? `ALARM!` : `wrong code`)),
          (f = e + (i ? 2e3 : 900)),
          i && (r = 0),
          (t = ``),
          m(e, [[`wrong++`], [`tone(BUZZER, 300`, 0, i ? 2e3 : 400]]));
      }
    };
    return {
      update(r, c) {
        for (let t = 0; t < ln.length; t++)
          e[t](!!v[`key${t}`]) && i === `locked` && y(r, ln[t]);
        let u = (600 * c) / 1e3;
        ((s += Math.max(-u, Math.min(u, o - s))),
          i === `unlocking` && s >= 89.5
            ? ((i = `open`),
              (a = r + _.open),
              h(n(`latch open: the door swings out`)))
            : i === `open` && r >= a - 600
              ? (i = `closing`)
              : i === `closing` && l <= 0.5
                ? ((i = `locking`),
                  (o = 0),
                  S.play([[`latch.write(0)`, 1, 300]], r))
                : i === `locking` &&
                  s <= 0.5 &&
                  ((i = `locked`), h(n(`locked again`)), m(r)));
        let p = i === `open` ? 42 : 0;
        l += Math.max((-80 * c) / 1e3, Math.min((80 * c) / 1e3, p - l));
        let b = x(`safe`);
        b && Bn(b, s, l);
        let C =
          r < f
            ? d
            : i === `locked`
              ? t
                ? n(`typed {dots}`, { dots: `•`.repeat(t.length) })
                : n(`locked · type the code, then #`)
              : n(`unlocked`);
        return (
          b &&
            g({ text: C, position: b.position.clone().add(new G(0, 52, 10)) }),
          S.update(r),
          !0
        );
      },
      stop() {
        (S.clear(), g(null));
        let e = x(`safe`);
        e && Bn(e, 0, 0);
      },
    };
  }
  if (l === `servo`) {
    let e = x(`gate`),
      t = x(`car`),
      r = x(`laser`),
      a = x(`receiver`),
      o = `idle`,
      s = 0,
      c = 0,
      l = 0,
      d = null,
      f = 0,
      p = !1,
      m = t ? t.position.x : 42,
      v = `drive`,
      C = b,
      w = 0,
      T = (e, t = []) =>
        S.play([[`if (digitalRead(BEAM) == LOW)`, 0, 300]], e, {
          loop: !0,
          intro: t,
        });
    T(b, [
      [`Serial.begin(`],
      [`pinMode(BEAM`],
      [`boom.attach(SERVO)`],
      [`boom.write(0)`, 0, 300],
    ]);
    let E = (e) => {
        if (e <= 0 || pl(0) >= e) return 0;
        let t = 0,
          n = 89.9;
        for (let r = 0; r < 18; r++) {
          let r = (t + n) / 2;
          pl(r) >= e ? (n = r) : (t = r);
        }
        return n;
      },
      D = (e, t) => {
        let n = pl(c) - 1.5,
          r = e;
        for (; Math.abs(t - r) > 1e-6;) {
          let e = Math.abs(t - r) > 0.5 ? r + Math.sign(t - r) * 0.5 : t;
          if (ml(e) > Math.max(n, ml(r))) break;
          r = e;
        }
        return r;
      },
      O = b;
    return {
      shadows: !0,
      update(b) {
        let x = Math.min(250, b - O);
        O = b;
        let k = x / 1e3,
          A;
        if (_.sweep) {
          if (v === `drive`) {
            let e =
              !(
                pl(c) >
                br.profile.reduce((e, [, t]) => Math.max(e, t), 0) + 0.5
              ) && m > sl
                ? Math.min(60, 6 + 2.5 * (m - sl))
                : 60;
            ((A = Math.max(-62, m - e * k)),
              m <= -62 && ((v = `out`), (C = b)));
          } else
            v === `out`
              ? ((A = m),
                (w = Math.min(1, (b - C) / 350)),
                w >= 1 &&
                  o === `idle` &&
                  c < 0.5 &&
                  b - C > 900 &&
                  ((v = `in`), (C = b), (m = 42), (A = m)))
              : ((A = m),
                (w = Math.max(0, 1 - (b - C) / 350)),
                b - C > 1100 && (v = `drive`));
        } else {
          ((v = `drive`), (w = Math.max(0, w - 3 * k)));
          let e = cl(_.car);
          A = m + Math.max(-200 * k, Math.min(200 * k, e - m));
        }
        let j = D(m, A),
          ee = j - m;
        ((m = j), _.sweep && y(`car`, Math.round(ll(m) * 10) / 10));
        let M = w < 0.5 && ul(m);
        for (
          o === `idle` &&
          M &&
          ((o = `up`),
          (l = b),
          (f += 1),
          (p = !1),
          h(`Car ${f}: up`),
          S.play(
            [
              [`boom.write(a)`, 0, 140],
              [`delay(`, 0, 140],
            ],
            b,
            {
              loop: !0,
              intro: [
                [`cars++`, 0, 120],
                [`Serial.printf(`, 0, 160],
              ],
            },
          ));
          (o === `up` || o === `down`) && b >= l;
        )
          ((l += _.step),
            o === `up` && s < _.up
              ? (s += 1)
              : o === `down` && s > 0
                ? --s
                : o === `up`
                  ? ((o = `wait`),
                    S.play(
                      [
                        [`while (digitalRead(BEAM) == LOW)`, 0, 160],
                        [`delay(`, 1, 160],
                      ],
                      b,
                      { loop: !0 },
                    ))
                  : ((o = `idle`),
                    h(`down`),
                    T(b, [[`Serial.println("down")`, 0, 200]])));
        (o === `wait` &&
          !M &&
          ((o = `hold`), (l = b + _.hold), S.play([[`delay(`, 2, _.hold]], b)),
          o === `hold` &&
            b >= l &&
            ((o = `down`),
            (l = b),
            S.play(
              [
                [`boom.write(a)`, 1, 140],
                [`delay(`, 3, 140],
              ],
              b,
              { loop: !0 },
            )));
        let te = (600 * x) / 1e3,
          ne = E(ml(m, 0)),
          N = c;
        ((c += Math.max(-te, Math.min(te, s - c))),
          c < ne &&
            ((c = ne),
            !p &&
              s < ne - 1 &&
              ((p = !0), h(n(`(the boom came down on the car)`)))));
        let P = Math.abs(c - N) > 0.01;
        if ((e && Xe(e, c), t)) {
          ((t.position.x = m), t.scale.setScalar(Math.max(0.001, 1 - w)));
          for (let e of t.userData.wheels ?? []) e.rotation.z += ee / br.wheel;
        }
        return (
          r && _r(r, dl(w < 0.5 ? m : 42)),
          a && Zt(a, !M),
          e &&
            g({
              text: `${n(M ? `beam cut` : `beam clear`)} · ${Math.round(c)}°`,
              position: e.position.clone().add(new G(-40, 24, -2)),
            }),
          P && !d && u.sound() && (d = i(320, 0.05)),
          d && !P && (d.stop(), (d = null)),
          S.update(b),
          !0
        );
      },
      stop() {
        (S.clear(),
          d?.stop(),
          (d = null),
          g(null),
          e && Xe(e, 0),
          a && Zt(a, !1),
          t && t.scale.setScalar(1),
          y(`car`, 0),
          t && (t.position.x = 42),
          r && _r(r, dl(42)));
      },
    };
  }
  if (l === `solar`) {
    let e = x(`tracker`),
      t = 90,
      r = b,
      a = -1e9,
      o = -1e9,
      s = null,
      c = null,
      l = 0,
      d = null,
      f = null,
      p = { left: 0, right: 0, lightL: 1, lightR: 1, power: 1, fixed: 1 },
      m = (e) =>
        Math.max(
          0,
          Math.min(1, (Dt.depth * Math.tan(e) - Dt.gap) / (2 * Dt.eye)),
        ),
      v = () => {
        let e = Sl(_.sun).sub(xl),
          n = Math.hypot(e.x, e.z),
          r = Math.atan2(e.x, e.z) - ((t - 90) * Math.PI) / 180,
          i = Math.max(0, Math.cos(r)) * (n / e.length()),
          a = i * (1 - (r > 0 ? m(r) : 0)),
          o = i * (1 - (r < 0 ? m(-r) : 0)),
          s = (e) =>
            Math.round(
              Math.max(
                0,
                Math.min(4095, 170 + 3600 * e + (Math.random() - 0.5) * 28),
              ),
            ),
          c = Math.max(0, Math.cos(Math.atan2(e.x, e.z)));
        return {
          left: s(a),
          right: s(o),
          lightL: a,
          lightR: o,
          power: Math.max(0, Math.cos(r)),
          fixed: c,
        };
      },
      C = (e) => [
        [`analogRead(EYE_L)`, 0, 110],
        [`analogRead(EYE_R)`, 0, 110],
        [`int diff`, 0, 110],
        ...(e === `right`
          ? [[`if (diff > DEAD_ZONE`, 0, 180]]
          : e === `left`
            ? [[`if (diff < -DEAD_ZONE`, 0, 180]]
            : []),
        [`pan.write(angle)`, 1, 110],
        [`delay(`, 0, 140],
      ];
    return (
      S.play(C(`hold`), b, {
        loop: !0,
        intro: [
          [`Serial.begin(`],
          [`pan.attach(SERVO)`],
          [`pan.write(angle)`, 0, 300],
        ],
      }),
      (d = `hold`),
      {
        update(m) {
          for (
            _.sweep
              ? ((f ??=
                  Math.asin(Math.max(-1, Math.min(1, (_.sun - 50) / 44))) -
                  ((2 * Math.PI) / 2e4) * m),
                y(
                  `sun`,
                  Math.round(
                    (50 + 44 * Math.sin(f + ((2 * Math.PI) / 2e4) * m)) * 10,
                  ) / 10,
                ))
              : (f = null),
              r = Math.max(r, m - 1e3);
            m >= r;
          ) {
            ((r += _.step), (p = v()));
            let e = p.right - p.left,
              n = t;
            (e > _.deadband && t < 150 && (t += 1),
              e < -_.deadband && t > 30 && --t,
              t !== n && (o = m));
            let i =
              e > _.deadband ? `right` : e < -_.deadband ? `left` : `hold`;
            (i !== c && ((c = i), (l = m)),
              m - a >= 500 &&
                ((a = m), h(`L ${p.left}  R ${p.right}  angle ${t}`)));
          }
          (c !== d && m - l > 250 && ((d = c), S.play(C(c), m, { loop: !0 })),
            e && (Vr(e, t), Ht(e, p.lightL, p.lightR, p.power)),
            g({
              text: n(`{p}% power · fixed panel {f}%`, {
                p: Math.round(p.power * 100),
                f: Math.round(p.fixed * 100),
              }),
              position: xl.clone().add(new G(0, 16, 0)),
            }));
          let b = m - o < 160;
          return (
            b && !s && u.sound() && (s = i(320, 0.04)),
            s && !b && (s.stop(), (s = null)),
            S.update(m),
            !0
          );
        },
        stop() {
          (S.clear(), s?.stop(), (s = null), g(null), e && Ht(e, 1, 1, 0));
        },
      }
    );
  }
  if (l === `radar`) {
    let e = x(`radar`),
      t = x(`oled`),
      r = x(`scope`),
      a = x(`car`),
      o = Math.PI / 180,
      s = Array(181).fill(0),
      c = 20,
      l = 1,
      d = b,
      f = b,
      p = null,
      m = 0,
      v = zl(_.car),
      C = null,
      w = (e, t, n, r, i) => {
        if (i.box) {
          let [a, o, s, c] = i.box,
            l = -1 / 0,
            u = 1 / 0;
          for (let [i, d, f, p] of [
            [e, n, a, o],
            [t, r, s, c],
          ]) {
            if (Math.abs(d) < 1e-9) {
              if (i < f || i > p) return null;
              continue;
            }
            let e = (f - i) / d,
              t = (p - i) / d;
            ((l = Math.max(l, Math.min(e, t))),
              (u = Math.min(u, Math.max(e, t))));
          }
          return l <= u && l > 0 ? l : null;
        }
        let [a, o, s] = i.circle,
          c = e - a,
          l = t - o,
          u = c * n + l * r,
          d = c * c + l * l - s * s,
          f = u * u - d;
        if (f < 0) return null;
        let p = -u - Math.sqrt(f);
        return p > 0 ? p : null;
      },
      T = (e) => {
        let t = [
            ...Ul,
            {
              box: [v - Rl.half, v + Rl.half, Rl.z - Rl.side, Rl.z + Rl.side],
              jitter: 0.4,
              miss: 0,
            },
          ],
          n = Ll.z - Cl.z,
          r = Cl.x + Math.cos(e * o) * n,
          i = Cl.z + Math.sin(e * o) * n,
          a = null;
        for (let n of [-6, -3, 0, 3, 6]) {
          let s = Math.cos((e + n) * o),
            c = Math.sin((e + n) * o);
          for (let e of t) {
            let t = w(r, i, s, c, e);
            t !== null &&
              (!a || t < a.d) &&
              (a = { d: t, t: e, x: r + s * t, z: i + c * t });
          }
        }
        return !a || Math.random() < a.t.miss
          ? { cm: 0 }
          : {
              cm: Math.max(
                2,
                Math.round(a.d * Il + (Math.random() * 2 - 1) * a.t.jitter),
              ),
              x: a.x,
              z: a.z,
            };
      },
      E = (e) => [
        [e > 0 ? `for (int a = 20` : `for (int a = 160`, 0, 120],
        [`turn.write(a)`, 0, 110],
        [`delay(`, 0, 110],
        [`seen[a] = distanceCm()`, 0, 110],
        [`pulseIn(ECHO`, 0, 120],
        [`display.drawLine(`, 0, 110],
        [`display.display()`, 0, 110],
      ];
    S.play(E(1), b, {
      loop: !0,
      intro: [
        [`Serial.begin(`],
        [`turn.attach(SERVO)`],
        [`Wire.begin(`],
        [`display.begin(`, 0, 300],
      ],
    });
    let D = (e) => {
      let t = -1;
      for (let e = 20; e <= 160; e++)
        s[e] > 0 && s[e] < _.range && (t < 0 || s[e] < s[t]) && (t = e);
      (h(t < 0 ? `Nothing in range` : `Nearest: ${s[t]} cm at ${t}°`),
        S.play(E(l), e, {
          loop: !0,
          intro: [
            [`nearest();`, +(l > 0), 220],
            [
              t < 0 ? `Serial.println("Nothing` : `Serial.printf("Nearest`,
              0,
              260,
            ],
          ],
        }));
    };
    return {
      shadows: !0,
      update(o) {
        let h = Math.min(250, o - f);
        ((f = o),
          _.sweep
            ? ((p ??=
                Math.asin(Math.max(-1, Math.min(1, (_.car - 50) / 48))) -
                ((2 * Math.PI) / 16e3) * o),
              y(
                `car`,
                Math.round(
                  (50 + 48 * Math.sin(p + ((2 * Math.PI) / 16e3) * o)) * 10,
                ) / 10,
              ))
            : (p = null));
        let b = zl(_.car);
        if (a && Math.abs(b - v) > 0.01) {
          a.rotation.y = b > v ? Math.PI : 0;
          for (let e of a.userData.wheels ?? [])
            e.rotation.z -= Math.abs(b - v) / br.wheel;
        }
        for (v = b, d = Math.max(d, o - 600); o >= d;) {
          d += _.step;
          let e = T(c);
          ((s[c] = e.cm),
            (m = e.cm),
            e.cm && e.cm < _.range && r && nn(r, e.x - Cl.x, e.z - Cl.z),
            l > 0 && c >= 160
              ? ((l = -1), D(o))
              : l < 0 && c <= 20
                ? ((l = 1), D(o))
                : (c += l));
        }
        return (
          e && e.userData.angle !== c && (Kt(e, c), Ml(x, c)),
          t && Sr(t, c, s, _.range),
          e &&
            g({
              text: `${c}° · ${m ? `${m} cm` : n(`no echo`)}`,
              position: Ll.clone().add(new G(-40, 6, -4)),
            }),
          r && (Fn(r, _.range / Il, c, l, !0), pn(r, h / 1300)),
          !C && u.sound() && (C = i(320, 0.02)),
          S.update(o),
          !0
        );
      },
      stop() {
        (S.clear(),
          C?.stop(),
          (C = null),
          g(null),
          t && Sr(t, null),
          r && (Fn(r, _.range / Il, 90, 1, !1), pn(r, 1)));
      },
    };
  }
  if (l === `stepper`) {
    let e = x(`axis`),
      t = x(`feeder`),
      r = x(`pad`),
      { pick: a, bins: s } = Ft,
      l = t?.userData.balls ?? [],
      d = t
        ? (t.userData.state ??= {
            queue: l.map((e, t) => t),
            bins: [[], [], []],
            carried: null,
          })
        : null,
      f = new Map(),
      p = [0, 1, 2].map(() => bu()),
      m = bu(),
      C = e?.userData.u ?? a,
      w = 0,
      T = null,
      E = !1,
      D = `home`,
      O = b,
      k = b,
      A = 0,
      j = 0,
      ee = 0,
      M = null,
      te = null,
      ne = !1,
      N = () => new G(yr(C), Un.magnet.y0 - 5, 0),
      P = (e, t, n, r, i = !1) =>
        f.set(e, {
          from: l[e].position.clone(),
          to: t,
          t0: r,
          dur: n,
          fall: i,
        }),
      re = (e, t, n, r = []) => {
        ((D = e), (O = t), n && S.play(n, t, { loop: !0, intro: r }));
      },
      ie = [[`axis.runToNewPosition(`, 0, 400]];
    S.play([[`axis.runSpeed()`, 0, 300]], b, {
      loop: !0,
      intro: [
        [`Serial.begin(`],
        [`pinMode(HOME`],
        [`axis.setMaxSpeed(`],
        [`axis.setAcceleration(`],
        [`axis.setSpeed(-20`, 0, 200],
      ],
    });
    let ae = (e) => {
        d.queue.forEach((t, n) => P(t, Pt(n), 380, e));
      },
      F = (e) => {
        ((d.queue = l.map((e, t) => t)),
          (d.bins = [[], [], []]),
          (d.carried = null),
          f.clear(),
          d.queue.forEach((t, n) =>
            f.set(t, {
              from: l[t].position.clone(),
              to: Pt(n),
              t0: e + n * 70,
              dur: 360,
              pop: !0,
            }),
          ),
          (ne = !1),
          (O = e));
      },
      oe = (e) => {
        if (T === null) return;
        let t = T - C,
          n = Math.sign(t) || 1,
          r = _.accel;
        if (Math.abs(t) < 0.001) {
          ((C = T), (w = 0), (T = null));
          return;
        }
        let i = Math.sqrt(2 * r * Math.abs(t));
        ((w = n * Math.min(_.speed, Math.abs(w) + r * e, i)),
          (C += w * e),
          (T - C) * n <= 0 && ((C = T), (w = 0), (T = null)));
      };
    return {
      shadows: !0,
      update(t) {
        let b = Math.min(250, t - k) / 1e3;
        k = t;
        let x = -1;
        for (let e = 0; e < 3; e++)
          p[e](!!v[`key${e}`]) && ((x = e), _.auto && y(`auto`, !1));
        if ((d && m(!!v.refill) && F(t), _.auto && D === `idle` && t >= j)) {
          if (d && !d.queue.length && d.carried === null) F(t);
          else {
            x = ee++ % 3;
            let e = r?.userData.keys?.[x];
            e && (M = { k: e, until: t + 180 });
          }
          j = t + 1100;
        }
        if (
          (M &&
            ((M.k.tile.position.y = M.k.y0 - (t < M.until ? 0.9 : 0)),
            t >= M.until && (M = null)),
          D === `home`)
        )
          ((C = Math.max(0, C - 20 * b)),
            (w = -20),
            C <= 0 &&
              ((w = 0),
              h(`Home`),
              (T = a),
              re(`toPick`, t, ie, [
                [`axis.setCurrentPosition(0)`, 0, 200],
                [`Serial.println("Home")`, 0, 200],
                [`goTo(PICK)`, 0, 150],
              ])));
        else for (let e = b; e > 1e-6; e -= 0.004) oe(Math.min(0.004, e));
        if ((D === `toPick` || D === `back`) && T === null)
          (re(`idle`, t, [[`digitalRead(BUTTONS[i])`, 0, 300]]),
            (j = Math.max(j, t + 700)));
        else if (D === `idle` && x >= 0)
          ((A = x),
            (E = !0),
            re(
              `grab`,
              t,
              [[`delay(`, 0, 400]],
              [
                [`digitalRead(BUTTONS[i])`, 0, 120],
                [`digitalWrite(MAGNET, HIGH)`, 0, 160],
              ],
            ),
            d &&
              d.queue.length &&
              Math.abs(C - a) < 0.5 &&
              !f.has(d.queue[0]) &&
              ((d.carried = d.queue.shift()),
              P(d.carried, N(), 70, t),
              (ne = !0),
              u.sound() && c(2600, 14, 0.12)));
        else if (D === `grab` && t - O >= _.hold)
          ((T = s[A]), re(`toBin`, t, ie, [[`goTo(BINS[i])`, 0, 150]]));
        else if (D === `toBin` && T === null) {
          if (
            ((E = !1),
            re(
              `drop`,
              t,
              [[`delay(`, 1, 400]],
              [[`digitalWrite(MAGNET, LOW)`, 0, 160]],
            ),
            d && d.carried !== null)
          ) {
            let e = d.carried;
            d.carried = null;
            let n = Zn(A, Math.min(4, d.bins[A].length));
            (d.bins[A].push(e), P(e, n, 240, t, !0));
          }
        } else
          D === `drop` &&
            t - O >= _.hold &&
            (h(`Ball into bin ${A + 1}`),
            (T = a),
            re(`back`, t, ie, [
              [`Serial.printf(`, 0, 150],
              [`goTo(PICK)`, 1, 150],
            ]));
        d && ne && Math.abs(C - a) > 11 && ((ne = !1), ae(t));
        for (let [e, n] of f) {
          let r = Math.max(0, Math.min(1, (t - n.t0) / n.dur));
          if (n.pop)
            (l[e].position.copy(r < 0.5 ? n.from : n.to),
              l[e].scale.setScalar(Math.max(0.001, Math.abs(1 - 2 * r))));
          else {
            let t = l[e].position.lerpVectors(
              n.from,
              n.to,
              n.fall ? r : 1 - (1 - r) * (1 - r),
            );
            n.fall && (t.y = n.from.y + (n.to.y - n.from.y) * r * r);
          }
          r >= 1 && (f.delete(e), n.fall && u.sound() && c(1700, 18, 0.14));
        }
        (d &&
          d.carried !== null &&
          !f.has(d.carried) &&
          l[d.carried].position.copy(N()),
          e && At(e, C, E),
          g({
            text: n(`{mm} mm · step {n}`, {
              mm: o(C, 1),
              n: Math.round(C * 25),
            }),
            position: Wl.clone().add(new G(yr(C), 88, 0)),
          }));
        let I = Math.abs(w) * 25;
        return (
          I > 20 && !te && u.sound() && (te = i(I, 0.03)),
          te && (I > 20 ? te.setFrequency(I) : (te.stop(), (te = null))),
          S.update(t),
          !0
        );
      },
      stop() {
        if (
          (S.clear(),
          te?.stop(),
          (te = null),
          g(null),
          M && (M.k.tile.position.y = M.k.y0),
          d && d.carried !== null)
        ) {
          let e = d.carried;
          d.carried = null;
          let t = s.findIndex((e) => Math.abs(C - e) < 8);
          t >= 0 && d.bins[t].length < 5
            ? (l[e].position.copy(Zn(t, d.bins[t].length)), d.bins[t].push(e))
            : d.queue.unshift(e);
        }
        for (let [e, t] of f) l[e].position.copy(t.to);
        for (let e of l) e.scale.setScalar(1);
        (d && d.queue.forEach((e, t) => l[e].position.copy(Pt(t))),
          e && At(e, a, !1));
      },
    };
  }
  return null;
}
var Su = { A: `24:6F:28:A1:3C:5D`, B: `24:6F:28:B2:4C:10` },
  Cu = (e) => -40 - 22 * Math.log10(Math.max(1, e)),
  wu = (e) => Math.min(1, Math.max(0, (-Cu(e) - 86) / 8)),
  Tu = class {
    constructor(e, t) {
      ((this.scene = e),
        (this.dots = [1.7, 1.2, 0.8].map((n, r) => {
          let i = new Dn(
            new ve(n, 16, 12),
            new je({
              color: t,
              transparent: !0,
              opacity: 1 - r * 0.3,
              depthWrite: !1,
            }),
          );
          return (i.layers.set(1), e.add(i), i);
        })));
    }
    place(e, t, n, r = 1) {
      let i = 12 + e.distanceTo(t) * 0.1;
      this.dots.forEach((a, o) => {
        let s = Math.max(0, n - o * 0.05);
        (a.position.lerpVectors(e, t, s),
          (a.position.y += Math.sin(s * Math.PI) * i),
          (a.material.opacity = (1 - o * 0.3) * r),
          a.scale.setScalar(0.4 + 0.6 * r));
      });
    }
    dispose() {
      for (let e of this.dots)
        (this.scene.remove(e), e.geometry.dispose(), e.material.dispose());
    }
  };
function Eu(e, { start: t, part: r, trace: i, at: a }) {
  let {
      scene: o,
      leds: s,
      board: c,
      out: l,
      readout: u,
      params: d,
      inputs: f,
    } = e,
    p = new pu(o),
    m = [],
    h = { A: !1, B: !1 },
    g = { A: bu(), B: bu() },
    _ = { A: `B`, B: `A` },
    v = () => r(`boardB`),
    y = (e) => (e === `A` ? s.LED : v()?.userData.leds.LED),
    b = (e) =>
      e === `A`
        ? a(`antenna`)
        : v()?.userData.anchors.antenna.getWorldPosition(new G()),
    x = (e) => {
      let t = null;
      return (
        e?.traverse((e) => {
          e.userData.part?.key === `BOOT` &&
            e.userData.cap &&
            (t ??= e.userData);
        }),
        t
      );
    },
    S = { A: x(c), B: x(v()) },
    C = t + 900,
    w = `A`,
    T = null,
    E = 0,
    D = [
      [`bool now = digitalRead(BUTTON)`],
      [`if (now && !last)`],
      [`last = now`],
    ];
  (i.play(D, t, {
    loop: !0,
    intro: [
      [`WiFi.mode(WIFI_STA)`, 0, 300],
      [`Serial.println(WiFi.macAddress())`, 0, 300],
      [`esp_now_init()`, 0, 260],
      [`esp_now_register_recv_cb`, 0, 240],
      [`esp_now_add_peer`, 0, 260],
    ],
  }),
    l(`A › ${Su.A}`),
    l(`B › ${Su.B}`));
  let O = (e, t) => {
      let n = b(e),
        r = b(_[e]);
      if (!n || !r) return;
      ((h[e] = !h[e]),
        l(`${e} › Sent ${+!!h[e]}`),
        i.play(D, t, {
          loop: !0,
          intro: [
            [`lit = !lit`, 0, 180],
            [`esp_now_send(`, 0, 240],
            [`Serial.printf("Sent`, 0, 200],
            [`delay(30)`, 0, 160],
          ],
        }),
        p.emit(n, t, `#f86b1d`, { size: 22, life: 650 }));
      let a = Math.random() < wu(d.apart);
      m.push({
        id: e,
        value: h[e],
        t0: t,
        dur: 760 + d.apart,
        lost: a,
        lostAt: 0.45 + Math.random() * 0.35,
        dot: new Tu(o, e === `A` ? `#f86b1d` : `#2f78c4`),
      });
    },
    k = (e, t) => {
      let n = _[e.id],
        r = Math.round(Cu(d.apart) + (Math.random() * 2 - 1) * 2);
      (cu(y(n), e.value),
        l(`${n} › Got ${+!!e.value} (${r} dBm)`),
        i.play(D, t, {
          loop: !0,
          intro: [
            [`digitalWrite(LED, data[0])`, 0, 220],
            [`Serial.printf("Got`, 0, 260],
          ],
        }));
      let a = b(n);
      a && p.emit(a, t, `#2f78c4`, { size: 18, life: 600 });
    };
  return {
    update(e) {
      (d.auto &&
        e >= C &&
        ((T = { id: w, until: e + 170 }), (w = _[w]), (C = e + 1800)),
        T && e >= T.until && (T = null));
      for (let t of [`A`, `B`]) {
        let n = T?.id === t,
          r = !!f[`boot${t}`],
          i = S[t];
        (i && !r && (i.cap.position.y = i.capY - (n ? 0.35 : 0)),
          g[t](r || n) && O(t, e));
      }
      for (let t of [...m]) {
        let n = b(t.id),
          r = b(_[t.id]),
          i = (e - t.t0) / t.dur;
        !n || !r || i >= 1 || (t.lost && i >= t.lostAt + 0.25)
          ? (n && r && !t.lost && k(t, e),
            t.dot.dispose(),
            m.splice(m.indexOf(t), 1))
          : t.lost && i >= t.lostAt
            ? (t.puffed ||
                ((t.puffed = !0),
                p.emit(t.dot.dots[0].position.clone(), e, `#e0463c`, {
                  size: 10,
                  life: 420,
                }),
                (E = e + 900)),
              t.dot.place(n, r, t.lostAt, 1 - (i - t.lostAt) / 0.25))
            : t.dot.place(n, r, i);
      }
      let t = r(`apart`);
      if (t) {
        let r = t.userData.marker.label.getWorldPosition(new G());
        u({
          text:
            e < E
              ? n(`message lost`)
              : n(`signal {dbm} dBm`, { dbm: Math.round(Cu(d.apart)) }),
          position: r.setY(r.y + 9),
        });
      }
      return (p.update(e), i.update(e), !0);
    },
    stop() {
      (i.clear(), p.dispose());
      for (let e of m) e.dot.dispose();
      m.length = 0;
      for (let e of [`A`, `B`])
        (cu(y(e), !1),
          S[e] && !f[`boot${e}`] && (S[e].cap.position.y = S[e].capY));
      u(null);
    },
  };
}
var Du = 6,
  Ou = 1.3;
function ku(e, t) {
  let n = new cr(t, t * 0.8, 1, 16, 1, !0);
  n.translate(0, -0.5, 0);
  let r = new Dn(
    n,
    new je({ color: `#7cc0f2`, transparent: !0, opacity: 0.9, depthWrite: !1 }),
  );
  return (r.layers.set(1), (r.renderOrder = 4), (r.visible = !1), e.add(r), r);
}
var Au = 22,
  ju = 450,
  Mu = 900,
  Nu = 3.2;
function Pu(e, { start: t, part: r, trace: a }) {
  let { scene: o, out: s, readout: u, params: d, setParam: f } = e,
    p = 0,
    m = null,
    h = new pu(o),
    g = ku(o, 1.4),
    _ = ku(o, 0.9),
    v = `192.168.1.42`,
    y = d.level,
    b = d.level,
    x = Math.round(y),
    S = !1,
    C = 1 / 0,
    w = !1,
    T = t + 1900,
    E = 1 / 0,
    D = t,
    O = 0,
    k = 0,
    A = 0,
    j = { level: 0, pumping: !1 },
    ee = [
      [`level = readLevel()`, 0, 240],
      [`if (level <= `, 0, 160],
      [`if (level >= `, 0, 160],
      [`digitalWrite(RELAY, pumping)`, 0, 160],
      [`server.handleClient()`, 0, 200],
      [`delay(200)`, 0, 240],
    ];
  a.play(ee, t, {
    loop: !0,
    intro: [
      [`WiFi.begin(SSID, PASS)`, 0, 320],
      [`while (WiFi.status()`, 0, 1080],
      [`Serial.println(WiFi.localIP())`, 0, 260],
      [`server.on("/", page)`, 0, 200],
      [`server.begin()`, 0, 200],
    ],
  });
  let M = () => {
      let e = r(`phone`);
      e &&
        Lt(e, {
          mode: `tank`,
          online: w,
          address: v,
          level: j.level,
          pumping: j.pumping,
        });
    },
    te = (e, t) => (e ? e.localToWorld(t.clone()) : null);
  return (
    M(),
    {
      shadows: !0,
      update(o, ne) {
        let N = r(`tank`),
          P = r(`relay`),
          re = r(`pump`);
        d.level !== b && ((y = d.level), (b = d.level));
        let ie = o >= C,
          ae = y > 0 ? Ou : 0;
        if (
          ((y = Math.min(
            100,
            Math.max(0, y + ((ie ? Du : 0) - ae) * (ne / 1e3)),
          )),
          N && Nt(N, y / 100),
          o >= D && ((D = o + 300), (b = Math.round(y)), f(`level`, b)),
          !w && o >= t + 1400 && ((w = !0), s(v), (E = o + 300)),
          w && o >= T)
        ) {
          ((T = o + 200),
            (x = Math.max(
              0,
              Math.min(100, Math.round(y + (Math.random() * 2 - 1) * 0.6)),
            )));
          let t = S;
          (x <= l.low && (S = !0),
            x >= l.high && (S = !1),
            S !== t &&
              (s(`${x}%: pump ${S ? `ON` : `off`}`),
              a.play(ee, o, {
                loop: !0,
                intro: [
                  [S ? `pumping = true;` : `pumping = false;  // full`, 0, 260],
                  [`Serial.printf(`, 0, 220],
                  [`digitalWrite(RELAY, pumping)`, 0, 220],
                ],
              }),
              P && on(P, S),
              e.sound() && c(S ? 140 : 110, 22, 0.6),
              (C = S ? o + 600 : 1 / 0)));
        }
        (o >= E &&
          ((E = o + 2e3),
          (j.level = x),
          (j.pumping = S),
          a.play(ee, o, {
            loop: !0,
            intro: [
              [`String html =`, 0, 160],
              [`server.send(200`, 0, 200],
            ],
          }),
          M()),
          (p = S ? Math.min(1, p + ne / ju) : Math.max(0, p - ne / Mu)));
        let F = re?.userData.pump;
        if (F) {
          ((F.fan.rotation.x -= Au * p * (ne / 1e3)),
            (F.blur.material.opacity = 0.32 * Math.max(0, p - 0.3)));
          let e = 0.2 * p;
          (F.body.position.set(
            (Math.random() - 0.5) * e,
            (Math.random() - 0.5) * e,
            (Math.random() - 0.5) * e,
          ),
            fr(re, S));
        }
        for (let e of [`pipe-in`, `pipe-out`]) {
          let t = r(e)?.userData.flow;
          t && (t.tex.offset.x -= Nu * p * (ne / 1e3));
        }
        (S && !m && e.sound() && (m = i(98, 0.14)),
          m &&
            (m.setVolume(0.14 * p), !S && p === 0 && (m.stop(), (m = null))));
        let oe = r(`well`);
        oe &&
          p > 0.5 &&
          o >= A &&
          ((A = o + 420),
          h.emit(oe.localToWorld(new G(0, Se.water + 0.2, 0)), o, `#ffffff`, {
            size: 9,
            life: 600,
            order: 4,
          }));
        let I = N ? N.localToWorld(new G(0, jn(y / 100), 0)).y : 0,
          L = te(N, _e.inlet);
        ((g.visible = !!L && ie),
          g.visible &&
            (g.position.copy(L),
            g.scale.set(
              1 + Math.sin(o * 0.03) * 0.08,
              Math.max(0.5, L.y - I),
              1,
            )));
        let R = te(N, _e.spout);
        ((_.visible = !!R && ae > 0),
          _.visible &&
            (_.position.copy(R),
            _.scale.set(1, Math.max(0.5, R.y - (N.position.y + 0.1)), 1)),
          L &&
            ie &&
            o >= O &&
            ((O = o + 320),
            h.emit(L.clone().setY(I + 0.2), o, `#ffffff`, {
              size: 12,
              life: 650,
              order: 4,
            })));
        let se = r(`probe`);
        if (
          (se &&
            w &&
            o >= k &&
            ((k = o + 800),
            h.emit(te(se, se.userData.face).setY(I + 0.2), o, `#26a586`, {
              size: 9,
              life: 500,
              order: 4,
            })),
          se)
        ) {
          let e = se.userData.anchor.getWorldPosition(new G());
          u({
            text: w
              ? n(S ? `{level}% · pump ON` : `{level}% · pump off`, {
                  level: x,
                })
              : n(`joining Wi-Fi…`),
            position: e.setY(e.y + 16),
          });
        }
        return (h.update(o), a.update(o), !0);
      },
      stop() {
        (a.clear(), h.dispose());
        for (let e of [g, _])
          (o.remove(e), e.geometry.dispose(), e.material.dispose());
        let e = r(`relay`);
        e && on(e, !1);
        let t = r(`pump`);
        (t &&
          (t.userData.pump.body.position.set(0, 0, 0),
          (t.userData.pump.blur.material.opacity = 0),
          fr(t, !1)),
          m?.stop(),
          (m = null),
          u(null),
          (w = !1),
          M(),
          f(`level`, Math.round(y)));
      },
    }
  );
}
function Fu(e) {
  for (let t of Object.values(e)) t.userData.baseEmissive && cu(t, !1);
}
function Iu(e, t = 1100) {
  let n = performance.now();
  return {
    update(r) {
      let i = r - n;
      if (this.finished) return !1;
      let a = i > t;
      return (
        cu(e.LED, !a && Math.sin(i * 0.09) + Math.sin(i * 0.13 + 1) > 0.6),
        a && (this.finished = !0),
        !0
      );
    },
  };
}
var Lu = `M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.59-6.64 7.59H.47l8.6-9.83L0 1.15h7.6l5.24 6.93zm-1.29 19.5h2.04L6.49 3.24H4.3z`,
  Ru = `#bba78a`,
  zu = `x.com/DilumSanjaya`,
  Bu = 900,
  Vu = 0.8;
function Hu() {
  let e = document.createElement(`canvas`),
    t = e.getContext(`2d`),
    n = `700 84px "Barlow Semi Condensed", sans-serif`;
  ((t.font = n), (t.letterSpacing = `3px`));
  let r = t.measureText(zu).width;
  ((e.width = Math.ceil(159 + r + 20)),
    (e.height = 140),
    (t.fillStyle = Ru),
    t.save(),
    t.translate(20, 28),
    t.scale(84 / 24, 84 / 24),
    t.fill(new Path2D(Lu)),
    t.restore(),
    t.fillRect(130, 24, 3, 92),
    (t.font = n),
    (t.letterSpacing = `3px`),
    (t.textBaseline = `middle`),
    t.fillText(zu, 159, 74));
  let i = new ye(e);
  return (
    (i.colorSpace = le),
    (i.anisotropy = 8),
    { tex: i, aspect: 140 / e.width }
  );
}
var Uu = class {
    constructor() {
      let { tex: e, aspect: t } = Hu();
      ((this.aspect = t),
        (this.mesh = new Dn(
          new R(1, 1),
          new je({
            map: e,
            transparent: !0,
            opacity: 0,
            depthWrite: !1,
            side: 2,
          }),
        )),
        this.mesh.layers.set(1),
        (this.mesh.renderOrder = -1.5),
        (this.mesh.visible = !1),
        (this.shown = 0));
    }
    get active() {
      return this.mesh.visible;
    }
    place(e, t, n, r) {
      let i = this.mesh;
      (i.position.copy(e),
        i.quaternion.setFromRotationMatrix(
          new v().makeBasis(t, n, new G().crossVectors(t, n)),
        ),
        i.scale.set(r, r * this.aspect, 1));
    }
    show(e) {
      ((this.shown = e), (this.mesh.visible = !0));
    }
    hide() {
      ((this.mesh.visible = !1), (this.mesh.material.opacity = 0));
    }
    update(e) {
      if (!this.mesh.visible) return !1;
      let t = Math.max(0, Math.min(1, (e - this.shown) / Bu)),
        n = Vu * t * t * (3 - 2 * t);
      return (
        n !== this.mesh.material.opacity &&
        ((this.mesh.material.opacity = n), !0)
      );
    }
  },
  Wu = { floorCredit: !0, instantRun: !1 },
  Gu = 1,
  Ku = -4,
  qu = Math.PI / 180,
  Ju = 500,
  Yu = { azimuth: 36 * qu, elevation: 43 * qu },
  Xu = { minX: -90, maxX: 150, minZ: -110, maxZ: 90 },
  Zu = new G(40, 104, -34).multiplyScalar(2),
  Qu = new lt();
function $u(e, t = new lt()) {
  return (
    t.makeEmpty(),
    e.updateWorldMatrix(!0, !0),
    e.traverse((e) => {
      e.isMesh &&
        e.layers.isEnabled(0) &&
        (e.geometry.boundingBox || e.geometry.computeBoundingBox(),
        t.union(Qu.copy(e.geometry.boundingBox).applyMatrix4(e.matrixWorld)));
    }),
    t
  );
}
var ed = 6,
  td = new G();
function nd(e, t = new lt()) {
  let n = e.scale.clone();
  return (
    e.scale.set(1, 1, 1),
    $u(e, t),
    e.scale.copy(n),
    e.updateWorldMatrix(!0, !0),
    t
  );
}
function rd() {
  return new I({
    transparent: !0,
    depthWrite: !1,
    uniforms: {
      color: { value: new W(`#e0d0b9`) },
      cell: { value: 9 },
      center: { value: new dr() },
      inner: { value: 38 },
      outer: { value: 84 },
      strength: { value: 0.9 },
    },
    vertexShader: `
      varying vec2 vPos;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vPos = wp.xz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      uniform float cell;
      uniform vec2 center;
      uniform float inner;
      uniform float outer;
      uniform float strength;
      varying vec2 vPos;
      void main() {
        vec2 g = abs(fract(vPos / cell - 0.5) - 0.5) / fwidth(vPos / cell);
        float line = 1.0 - min(min(g.x, g.y), 1.0);
        vec2 q = (vPos - center) / vec2(1.25, 1.0);
        float fade = 1.0 - smoothstep(inner, outer, length(q));
        float a = line * fade * strength;
        gl_FragColor = vec4(color, a);
        #include <colorspace_fragment>
      }
    `,
  });
}
function id(e) {
  let t = [...e].sort((e, t) => e[0] - t[0] || e[1] - t[1]),
    n = (e, t, n) =>
      (t[0] - e[0]) * (n[1] - e[1]) - (t[1] - e[1]) * (n[0] - e[0]),
    r = [];
  for (let e of t) {
    for (; r.length >= 2 && n(r[r.length - 2], r[r.length - 1], e) <= 0;)
      r.pop();
    r.push(e);
  }
  let i = [];
  for (let e = t.length - 1; e >= 0; e--) {
    let r = t[e];
    for (; i.length >= 2 && n(i[i.length - 2], i[i.length - 1], r) <= 0;)
      i.pop();
    i.push(r);
  }
  return r.slice(0, -1).concat(i.slice(0, -1));
}
function ad(e, t, n = 0) {
  for (let r of [e, t])
    for (let i = 0; i < r.length; i++) {
      let [a, o] = r[i],
        [s, c] = r[(i + 1) % r.length],
        l = c - o,
        u = a - s,
        d = Math.hypot(l, u) || 1,
        f = 1 / 0,
        p = -1 / 0,
        m = 1 / 0,
        h = -1 / 0;
      for (let [t, n] of e) {
        let e = (t * l + n * u) / d;
        ((f = Math.min(f, e)), (p = Math.max(p, e)));
      }
      for (let [e, n] of t) {
        let t = (e * l + n * u) / d;
        ((m = Math.min(m, t)), (h = Math.max(h, t)));
      }
      if (p + n < m || h + n < f) return !1;
    }
  return !0;
}
var od = class {
  constructor(e, t, n = {}) {
    ((this.canvas = e),
      (this.el = t),
      (this.hooks = n),
      (this.zoomPref = {}),
      (this.panPref = {}),
      (this.renderer = new ds({
        canvas: e,
        antialias: !1,
        alpha: !0,
        premultipliedAlpha: !0,
        powerPreference: `high-performance`,
      })),
      this.renderer.setClearColor(0, 0),
      (this.renderer.outputColorSpace = le),
      (this.renderer.shadowMap.enabled = !0),
      (this.renderer.shadowMap.type = 3),
      (this.renderer.shadowMap.autoUpdate = !1),
      (this.renderer.shadowMap.needsUpdate = !0),
      (this.scene = new gt()),
      (this.camera = new de(-1, 1, 1, -1, 1, 900)),
      (this.composer = new x(this.renderer, {
        lineColor: `#141a2c`,
        thickness: 1.3,
      })));
    let r = new _i(this.renderer);
    ((this.scene.environment = r.fromScene(new fs(), 0.04).texture),
      (this.scene.environmentIntensity = 0.4),
      r.dispose(),
      this.setupLights(),
      this.setupGround(),
      (this.mark = new Uu()),
      this.scene.add(this.mark.mesh),
      (this.markAz = null),
      (this.markToken = 0),
      (this.markCheck = 0));
    let { root: i, anchors: a, leds: o } = De(this.renderer);
    ((this.board = i),
      (this.boardAnchors = a),
      (this.leds = o),
      this.scene.add(i),
      (this.tweens = new hs()),
      (this.size = { w: 1, h: 1, cx: 0, cy: 0 }),
      (this.parts = new Map()),
      (this.pins = new Map()),
      (this.tmp = new G()),
      (this.raycaster = new ke()),
      this.raycaster.layers.set(0),
      (this.ndc = new dr()),
      (this.hovered = null),
      (this.pointer = null),
      (this.dirty = !0),
      (this.shadowDirty = !0),
      (this.autoRotate = !1),
      (this.lastInput = performance.now()),
      (this.sim = null),
      (this.flicker = null),
      (this.readoutState = null),
      (this.lessonId = `board`),
      (this.values = {}),
      (this.inputs = {}),
      (this.selection = null),
      (this.controls = new ks(t, {
        tweens: this.tweens,
        toStage: n.toStage,
        getSize: () => this.size,
        onChange: () => this.touch(),
        onClick: (e) => this.click(e),
        onDragState: (e) => {
          ((this.dragging = e),
            (t.dataset.drag = e ?? ``),
            e && this.setHovered(null));
        },
        onGrab: (e) => this.grab(e),
        onZoom: () => n.onZoom?.(),
        onPan: () => n.onPan?.(),
      })),
      this.setupSelectionRing(),
      (this.controls.view.azimuth = Yu.azimuth),
      (this.controls.view.elevation = Yu.elevation),
      t.addEventListener(`pointermove`, (e) => {
        this.pointer = { x: e.clientX, y: e.clientY, target: e.target };
      }),
      t.addEventListener(`pointerleave`, () => {
        ((this.pointer = null), this.setHovered(null));
      }),
      (this.loop = this.loop.bind(this)),
      requestAnimationFrame(this.loop));
  }
  setupLights() {
    this.scene.add(new Ut(`#fffaf3`, `#c2ae90`, 0.5));
    let e = new Cr(`#fff6ea`, 1.2);
    (e.position.set(-55, 100, 62), this.scene.add(e));
    let t = new Cr(`#ffffff`, 0.001);
    ((t.castShadow = !0),
      t.shadow.mapSize.set(2048, 2048),
      (t.shadow.radius = 11),
      (t.shadow.blurSamples = 20),
      (t.shadow.bias = -4e-4),
      this.scene.add(t),
      this.scene.add(t.target),
      (this.shadowLight = t),
      this.fitShadow(new G(30, 0, 0), 120));
  }
  fitShadow(e, t) {
    let n = this.shadowLight;
    (n.target.position.copy(e), n.position.copy(e).add(Zu));
    let r = n.shadow.camera;
    ((r.left = -t),
      (r.right = t),
      (r.top = t),
      (r.bottom = -t),
      (r.near = 20),
      (r.far = Zu.length() + t + 120),
      r.updateProjectionMatrix(),
      (this.shadowDirty = !0));
  }
  fitLesson() {
    let e = nd(this.board),
      t = new lt();
    for (let { group: n } of this.parts.values())
      n.userData.wire || e.union(nd(n, t));
    let n = e.getCenter(new G()).setY(0);
    (this.fitShadow(
      n,
      Math.max(120, Math.hypot(e.max.x - e.min.x, e.max.z - e.min.z) / 2 + 24),
    ),
      Object.assign(this.controls.bounds, {
        minX: Math.min(Xu.minX, e.min.x - 30),
        maxX: Math.max(Xu.maxX, e.max.x + 30),
        minZ: Math.min(Xu.minZ, e.min.z - 30),
        maxZ: Math.max(Xu.maxZ, e.max.z + 30),
      }));
  }
  setupGround() {
    let e = new Dn(
      new R(900, 900),
      new Ce({ color: `#7a5532`, opacity: 0.32, depthWrite: !1 }),
    );
    ((e.rotation.x = -Math.PI / 2),
      (e.position.y = Ku),
      (e.receiveShadow = !0),
      e.layers.set(Gu),
      (e.renderOrder = -1),
      this.scene.add(e),
      (this.grid = new Dn(new R(900, 900), rd())),
      (this.grid.rotation.x = -Math.PI / 2),
      (this.grid.position.y = -4.01),
      this.grid.layers.set(Gu),
      (this.grid.renderOrder = -2),
      this.scene.add(this.grid));
  }
  get view() {
    return this.controls.view;
  }
  homeView(e = this.lessonId, { own: t = !1 } = {}) {
    let n = this.lessonView(e);
    if (t) return n;
    let r = this.zoomPref?.[e] ?? 1;
    r !== 1 && (n.zoom = Math.min(22, Math.max(3.2, n.zoom * r)));
    let i = this.panPref?.[e];
    return (i && (n.target = n.target.map((e, t) => e + i[t])), n);
  }
  lessonView(e) {
    let t = iu[e] ?? iu.board,
      n = {
        target: t.target,
        zoom: t.zoom,
        azimuth: Yu.azimuth,
        elevation: Yu.elevation,
      };
    if (!this.frame || !t.frame) return n;
    let [r, i, a, o] = t.frame,
      s = this.controls.fit,
      c = Math.min(
        22,
        Math.max(3.2, Math.min(this.frame.w / a, this.frame.h / o) / s),
      ),
      l = new G(Math.cos(Yu.azimuth), 0, -Math.sin(Yu.azimuth)),
      u = new G(-Math.sin(Yu.azimuth), 0, -Math.cos(Yu.azimuth)),
      d = new G(...t.target)
        .addScaledVector(l, r)
        .addScaledVector(u, -i / Math.sin(Yu.elevation));
    return { ...n, target: d.toArray(), zoom: c };
  }
  isHome() {
    return this.controls.isNear(this.homeView());
  }
  headingHome() {
    return this.controls.isNear(this.homeView(), this.controls.destination);
  }
  resetView(e = 1100) {
    return this.controls.animateTo(this.homeView(), { duration: e });
  }
  touch() {
    ((this.dirty = !0), (this.lastInput = performance.now()));
  }
  resize(e, t, n, r, i, a = 1, o = null) {
    ((this.size = { w: e, h: t, cx: n, cy: r }),
      (this.controls.fit = a),
      (this.frame = o),
      (this.markCheck = performance.now() + 300),
      (this.markForce = !0),
      this.renderer.setPixelRatio(i),
      this.renderer.setSize(e, t, !1),
      this.composer.setSize(e, t, i),
      (this.dirty = !0),
      this.render());
  }
  placeCamera() {
    let { target: e, azimuth: t, elevation: n } = this.view,
      r = this.view.zoom * this.controls.fit,
      { w: i, h: a, cx: o, cy: s } = this.size,
      c = this.camera;
    ((c.left = -o / r),
      (c.right = (i - o) / r),
      (c.top = s / r),
      (c.bottom = -(a - s) / r),
      c.updateProjectionMatrix(),
      c.position.set(
        e.x + Math.sin(t) * Math.cos(n) * 320,
        e.y + Math.sin(n) * 320,
        e.z + Math.cos(t) * Math.cos(n) * 320,
      ),
      c.lookAt(e),
      c.updateMatrixWorld());
    let l = this.grid.material.uniforms;
    l.center.value.set(e.x, e.z);
    let u = 8.4 / r;
    ((l.inner.value = 38 * u), (l.outer.value = 84 * u));
  }
  anchor(e) {
    if (e.startsWith(`part:`)) {
      let [t, n] = e.slice(5).split(`:`),
        r = this.parts.get(t)?.group.userData;
      return (n ? r?.anchors?.[n] : r?.anchor) ?? null;
    }
    if (e.startsWith(`pin:`)) {
      let t = e.slice(4);
      if (!this.pins.has(t)) {
        let e = new pt();
        (e.position.copy(Ms(t)), this.scene.add(e), this.pins.set(t, e));
      }
      return this.pins.get(t);
    }
    return this.boardAnchors[e] ?? null;
  }
  project(e) {
    return (e.getWorldPosition(this.tmp), this.projectPoint(this.tmp));
  }
  projectPoint(e) {
    let t = this.tmp.copy(e).project(this.camera);
    return [(t.x * 0.5 + 0.5) * this.size.w, (-t.y * 0.5 + 0.5) * this.size.h];
  }
  partKey(e) {
    return e.key ?? e.id;
  }
  setLesson(e, { instant: t = !1, values: n = {} } = {}) {
    (this.stopSim(),
      this.select(null),
      this.mark.hide(),
      (this.markAz = null),
      this.setHovered(null),
      this.hooks.onHover?.(null, null),
      (this.lessonId = e),
      (this.values = n),
      (this.inputs = {}));
    let r = ou(e, n),
      i = new Map(r.map((e) => [e.id, e])),
      a = +!t;
    for (let [e, t] of [...this.parts]) {
      let n = i.get(e);
      (!n || this.partKey(n) !== this.partKey(t.spec)) &&
        (this.parts.delete(e), this.exitPart(t, a));
    }
    let o = 0,
      s = 0,
      c = 0;
    for (let e of r) {
      let t = this.parts.get(e.id);
      if (t) {
        this.movePart(t, e, a);
        continue;
      }
      let n = this.buildPart(e),
        r = e.wire ? 650 + s++ * 140 : 220 + o++ * 130;
      ((c = Math.max(c, r + (e.wire ? 700 : 750))),
        this.enterPart(n, r * a, a));
    }
    (this.fitLesson(), (this.shadowDirty = !0), (this.dirty = !0));
    let l = ++this.markToken;
    return t
      ? (this.controls.jumpTo(this.homeView()),
        this.tweens.update(performance.now() + 1e6),
        (this.markCheck = performance.now() + Ju),
        (this.markForce = !0),
        Promise.resolve())
      : (this.controls.animateTo(this.homeView(), { duration: 1300 }),
        this.tweens.wait(Math.max(c, 1300)).then(() => {
          l === this.markToken && this.placeMark();
        }));
  }
  relabel() {
    let e = this.view,
      t = {
        target: e.target.toArray(),
        azimuth: e.azimuth,
        elevation: e.elevation,
        zoom: e.zoom,
      };
    for (let [e, t] of [...this.parts])
      (this.parts.delete(e), this.scene.remove(t.group), Hn(t.group));
    (this.setLesson(this.lessonId, { instant: !0, values: this.values }),
      this.controls.jumpTo(t));
  }
  buildPart(e) {
    let t = e.build();
    (e.at && t.position.copy(e.at),
      e.rot && t.rotation.set(...e.rot),
      (t.userData.baseY = t.position.y),
      t.traverse((e) => {
        e.isMesh && !e.userData.noShadow && (e.castShadow = !0);
      }),
      e.apply?.(t, this.values));
    let n = { group: t, spec: e };
    return (this.parts.set(e.id, n), this.scene.add(t), n);
  }
  updateParams(e) {
    this.values = e;
    for (let t of ou(this.lessonId, e)) {
      let n = this.parts.get(t.id);
      if (!n) continue;
      if (t.key !== n.spec.key) {
        this.exitPart(n, 0.55);
        let e = this.buildPart(t);
        (this.enterPart(e, 120, 0.7, { drop: 14 }),
          this.selection?.id === t.id && (this.selection.group = e.group));
        continue;
      }
      n.spec = t;
      let r = n.group;
      (t.at && !n.moving && ((r.position.x = t.at.x), (r.position.z = t.at.z)),
        t.apply?.(r, e));
    }
    ((this.shadowDirty = !0),
      (this.dirty = !0),
      (this.markCheck = performance.now() + Ju));
  }
  applyY(e) {
    let t = e.userData;
    e.position.y = (t.baseY ?? 0) + (t.dropY ?? 0) + (t.hoverY ?? 0);
  }
  enterPart({ group: e, spec: t }, n, r, { drop: i } = {}) {
    let a = e.userData.wire;
    if (a) {
      let { tube: e, count: t, ends: i } = a;
      (e.geometry.setDrawRange(0, 0),
        i.forEach((e) => e.scale.setScalar(0.001)),
        this.tweens.add({
          delay: n,
          duration: 260 * r + 1,
          easing: ms.outBack,
          onUpdate: (e) => i[0].scale.setScalar(Math.max(0.001, e)),
        }),
        this.tweens.add({
          delay: n + 120 * r,
          duration: 620 * r + 1,
          easing: ms.inOutCubic,
          onUpdate: (n) => {
            (e.geometry.setDrawRange(0, Math.ceil((n * t) / 48) * 48),
              (this.shadowDirty = !0));
          },
        }),
        this.tweens.add({
          delay: n + 700 * r,
          duration: 260 * r + 1,
          easing: ms.outBack,
          onUpdate: (e) => i[1].scale.setScalar(Math.max(0.001, e)),
        }));
      return;
    }
    let o = i ?? (t.id === `breadboard` ? 24 : 46);
    ((e.userData.dropY = o),
      e.scale.setScalar(0.001),
      this.applyY(e),
      this.tweens.add({
        delay: n,
        duration: 720 * r + 1,
        easing: ms.linear,
        onUpdate: (t) => {
          ((e.userData.dropY = o * (1 - ms.outCubic(t))),
            e.scale.setScalar(
              Math.max(0.001, ms.outBack(Math.min(1, t * 1.15))),
            ),
            this.applyY(e),
            (this.shadowDirty = !0));
        },
      }));
  }
  exitPart({ group: e }, t) {
    (this.hovered === e && this.setHovered(null),
      this.selection?.group === e &&
        !this.parts.has(this.selection.id) &&
        this.select(null));
    let n = e.userData.wire,
      r = () => {
        (this.scene.remove(e), Hn(e), (this.shadowDirty = !0));
      };
    if (n) {
      let { tube: e, count: i, ends: a } = n;
      this.tweens.add({
        duration: 380 * t + 1,
        easing: ms.inCubic,
        onUpdate: (t) => {
          (e.geometry.setDrawRange(0, Math.floor(((1 - t) * i) / 48) * 48),
            a.forEach((e) => e.scale.setScalar(Math.max(0.001, 1 - t))),
            (this.shadowDirty = !0));
        },
        onComplete: r,
      });
      return;
    }
    let i = e.scale.x;
    this.tweens.add({
      delay: 60 * t,
      duration: 420 * t + 1,
      easing: ms.linear,
      onUpdate: (t) => {
        (e.scale.setScalar(Math.max(0.001, i * (1 - ms.inBack(t)))),
          (e.userData.dropY = 30 * t * t),
          this.applyY(e),
          (this.shadowDirty = !0));
      },
      onComplete: r,
    });
  }
  movePart(e, t, n) {
    e.spec = t;
    let r = e.group,
      i = r.position.clone();
    i.y = r.userData.baseY;
    let a = t.at ? t.at.clone() : i.clone(),
      o = r.rotation.clone(),
      s = t.rot ? new Qt(...t.rot) : o;
    (i.distanceTo(a) < 0.01 && o.equals(s)) ||
      ((e.moving = !0),
      this.tweens.add({
        delay: 120 * n,
        duration: 800 * n + 1,
        easing: ms.inOutCubic,
        onUpdate: (e, t) => {
          (r.position.lerpVectors(i, a, e),
            (r.userData.baseY = r.position.y),
            (r.userData.dropY = Math.sin(t * Math.PI) * 16),
            r.rotation.set(
              o.x + (s.x - o.x) * e,
              o.y + (s.y - o.y) * e,
              o.z + (s.z - o.z) * e,
            ),
            this.applyY(r),
            (this.shadowDirty = !0));
        },
        onComplete: () => {
          e.moving = !1;
        },
      }));
  }
  pick(e, t) {
    let n = this.canvas.getBoundingClientRect();
    (this.ndc.set(
      ((e - n.left) / n.width) * 2 - 1,
      -((t - n.top) / n.height) * 2 + 1,
    ),
      this.raycaster.setFromCamera(this.ndc, this.camera));
    let r = [this.board, ...[...this.parts.values()].map((e) => e.group)],
      i = this.raycaster.intersectObjects(r, !0);
    for (let e of i) {
      let t = e.object,
        n = null,
        r = null;
      for (; t;) {
        t.userData.part && (n ??= t);
        let e = [...this.parts].find(([, e]) => e.group === t);
        if (e) {
          ((r = e[0]), t.userData.part && (n = t));
          break;
        }
        t = t.parent;
      }
      if (n)
        return {
          group: n,
          info: n.userData.part,
          point: e.point,
          object: e.object,
          id: r,
        };
    }
    return null;
  }
  setupSelectionRing() {
    let e = new Or(),
      t = new je({
        color: `#f86b1d`,
        transparent: !0,
        opacity: 0.85,
        depthWrite: !1,
      }),
      n = new Dn(new B(0.93, 1, 72), t),
      r = new Dn(new B(0.8, 0.84, 72), t.clone());
    r.material.opacity = 0.45;
    for (let t of [n, r])
      ((t.rotation.x = -Math.PI / 2), t.layers.set(Gu), e.add(t));
    ((e.visible = !1),
      (e.renderOrder = -1),
      this.scene.add(e),
      (this.ring = e));
  }
  select(e) {
    if (!e) {
      this.selection &&
        ((this.selection = null),
        (this.ring.visible = !1),
        (this.dirty = !0),
        this.hooks.onSelect?.(null));
      return;
    }
    let t = typeof e == `string`,
      n = t ? e : ([...this.parts].find(([, t]) => t.group === e)?.[0] ?? null),
      r = t ? this.parts.get(n)?.group : e;
    r &&
      ((this.selection = { id: n, group: r }),
      (this.ring.visible = !0),
      this.placeRing(),
      (this.dirty = !0),
      this.hooks.onSelect?.({ id: n, info: r.userData.part, group: r }));
  }
  placeRing() {
    let e = this.selection;
    if (!e) return;
    let t = e.group;
    if (e.sizedFor !== t) {
      let n = nd(t);
      if (n.isEmpty()) return;
      let r = t.getWorldPosition(new G());
      e.offset = n.getCenter(new G()).sub(r);
      let i = n.getSize(new G());
      ((e.radius = Math.max(8, Math.hypot(i.x, i.z) / 2 + 3)),
        (e.rise = n.max.y - r.y),
        (e.sizedFor = t),
        (e.seatAt = null));
    }
    let n = t.getWorldPosition(td).add(e.offset),
      r = `${n.x.toFixed(1)}|${n.z.toFixed(1)}`;
    (e.seatAt !== r &&
      ((e.seat = this.seatBelow(t, n, n.y - e.offset.y + e.rise)),
      (e.seatAt = r)),
      this.ring.position.set(n.x, e.seat + 0.25, n.z),
      this.ring.scale.setScalar(e.radius));
  }
  seatBelow(e, t, n) {
    this.raycaster.set(new G(t.x, n + 40, t.z), new G(0, -1, 0));
    let r = [
        this.board,
        ...[...this.parts.values()].map((e) => e.group),
      ].filter((t) => t !== e),
      i = (t) => {
        for (let n = t; n; n = n.parent) if (n === e) return !0;
        return !1;
      },
      a = this.raycaster.intersectObjects(r, !0).find((e) => !i(e.object));
    return a ? Math.max(Ku, a.point.y) : Ku;
  }
  revealSelection(e) {
    let t = this.selectionScreen();
    if (!t || !e) return;
    let { w: n, h: r } = this.size,
      i = r - e;
    if (t[1] > 24 && t[1] < i - 24 && t[0] > 0 && t[0] < n) return;
    let a = [n / 2, Math.max(40, i * 0.55)],
      o = this.controls,
      s = o.groundAt(t[0], t[1]),
      c = o.groundAt(a[0], a[1]),
      l = o.view.target.clone().add(s.sub(c));
    o.animateTo({ target: l.toArray() }, { duration: 600 });
  }
  selectionScreen(e = null) {
    let t = this.selection;
    if (!t) return null;
    let n = t.group.userData.ends;
    if (n?.length && e)
      return n
        .map((e) => this.projectPoint(e.getWorldPosition(new G())))
        .reduce((t, n) =>
          Math.hypot(n[0] - e.x, n[1] - e.y) <
          Math.hypot(t[0] - e.x, t[1] - e.y)
            ? n
            : t,
        );
    let r = t.group.userData.anchor,
      i = r ? r.getWorldPosition(new G()) : $u(t.group).getCenter(new G());
    return this.projectPoint(i);
  }
  grab(e) {
    if (e.target !== this.canvas) return null;
    let t = this.pick(e.clientX, e.clientY),
      n = t && this.boardButton(t);
    if (n) return this.hold(n.input, n.cap, n.capY, 0.35);
    if (!t?.id) return null;
    let r = this.parts.get(t.id),
      i = r?.spec.interact;
    if (!i) return null;
    let a = r.group;
    if ((this.select(t.id), this.setHovered(null), i.type === `slide`)) {
      let e = new vt(new G(0, 1, 0), -t.point.y),
        n = t.point.clone().sub(a.position).setY(0),
        r = new G(),
        o = !1;
      return {
        move: (t) => {
          o || ((o = !0), this.hooks.onParam?.(`sweep`, !1));
          let a = this.canvas.getBoundingClientRect();
          (this.ndc.set(
            ((t.clientX - a.left) / a.width) * 2 - 1,
            -((t.clientY - a.top) / a.height) * 2 + 1,
          ),
            this.raycaster.setFromCamera(this.ndc, this.camera),
            this.raycaster.ray.intersectPlane(e, r) &&
              this.hooks.onParam?.(i.param, i.toParam(r.sub(n))));
        },
      };
    }
    if (i.type === `knob`) {
      let t = a.userData.knob ?? a,
        n = this.project(t),
        r = this.hooks.toStage,
        o = (e) => {
          let t = r(e.clientX, e.clientY);
          return Math.atan2(t.y - n[1], t.x - n[0]);
        },
        s = o(e),
        c = this.values[i.param] ?? i.min,
        l =
          ((i.max - i.min) / ((i.sweep * Math.PI) / 180)) *
          (i.reverse ? -1 : 1);
      return {
        move: (e) => {
          let t = o(e),
            n = Math.atan2(Math.sin(t - s), Math.cos(t - s));
          ((s = t),
            (c = Math.min(i.max, Math.max(i.min, c + n * l))),
            this.hooks.onParam?.(i.param, Math.round(c)));
        },
      };
    }
    if (i.type === `press`) {
      let e = i.input,
        n = a.userData.cap,
        r = a.userData.capY,
        o = 1.3;
      if (a.userData.keys) {
        let s = t.object;
        for (; s && s.userData.keyIndex === void 0;) s = s.parent;
        if (!s) return null;
        let c = a.userData.keys[s.userData.keyIndex];
        ((e = `${i.input}${s.userData.keyIndex}`),
          (n = c.tile),
          (r = c.y0),
          (o = 0.9));
      }
      return this.hold(e, n, r, o);
    }
    return null;
  }
  hold(e, t, n, r) {
    let i = (i) => {
      if (((this.inputs[e] = i), t)) {
        let e = t.position.y,
          a = n - (i ? r : 0);
        this.tweens.add({
          duration: 90,
          easing: ms.outCubic,
          onUpdate: (n) => {
            t.position.y = e + (a - e) * n;
          },
        });
      }
      (this.hooks.onInput?.(e, i), (this.dirty = !0));
    };
    return (i(!0), { up: () => i(!1) });
  }
  boardButton(e) {
    let t = e.id ? this.parts.get(e.id)?.spec.buttons : au(this.lessonId);
    if (!t) return null;
    for (let n = e.object; n; n = n.parent) {
      let e = t[n.userData.part?.key];
      if (e) return { input: e, cap: n.userData.cap, capY: n.userData.capY };
    }
    return null;
  }
  setHovered(e) {
    if (this.hovered === e) return;
    let t = this.hovered;
    this.hovered = e;
    let n = (e, t) => {
      if (!e || e.userData.part?.lift === !1 || e.userData.wire) return;
      e.userData.baseY ??= e.position.y;
      let n = e.userData.hoverY ?? 0;
      (e.userData.hoverAnim?.cancel(),
        (e.userData.hoverAnim = this.tweens.add({
          duration: 220,
          easing: ms.outCubic,
          onUpdate: (r) => {
            ((e.userData.hoverY = n + (t - n) * r),
              this.applyY(e),
              (this.shadowDirty = !0));
          },
        })));
    };
    (n(t, 0),
      n(e, e?.userData.part?.big ? 2.5 : 1.6),
      this.el.classList.toggle(`is-pointing`, !!e));
    let r = e
      ? [...this.parts.values()].find((t) => t.group === e)?.spec.interact?.type
      : null;
    (e && !r && au(this.lessonId)?.[e.userData.part?.key] && (r = `press`),
      (this.el.dataset.hand = r ?? ``),
      this.hooks.onHover?.(e ? e.userData.part : null, this.pointer));
  }
  updateHover() {
    if (!this.pointer || this.dragging) return;
    let e = this.pointer;
    if (e.target !== this.canvas) {
      this.setHovered(null);
      return;
    }
    if (e.done) return;
    e.done = !0;
    let t = this.pick(e.x, e.y);
    (this.setHovered(t?.group ?? null), t && this.hooks.onHover?.(t.info, e));
  }
  click(e) {
    if (document.elementFromPoint(e.clientX, e.clientY) !== this.canvas) return;
    let t = this.pick(e.clientX, e.clientY);
    (t && t.info.lift !== !1 ? this.select(t.id ?? t.group) : this.select(null),
      this.hooks.onPick?.(t));
  }
  focusPoint(e, t = 1.9) {
    let n = this.view;
    return this.controls.animateTo(
      {
        target: [e.x, Math.max(0, Math.min(e.y, 12)), e.z],
        zoom: Math.min(22, Math.max(n.zoom, this.homeView().zoom) * t),
      },
      { duration: 1e3 },
    );
  }
  focusAnchor(e) {
    let t = this.anchor(e);
    return t ? this.focusPoint(t.getWorldPosition(new G())) : null;
  }
  focusGroup(e) {
    let t = $u(e),
      n = t.getCenter(new G()),
      r = t.getSize(new G()).length();
    return this.focusPoint(n, Math.min(2.6, Math.max(1.4, 70 / r)));
  }
  screenHull(e) {
    let t = $u(e);
    if (t.isEmpty()) return null;
    let n = [],
      r = new G();
    for (let e of [t.min.x, t.max.x])
      for (let i of [t.min.y, t.max.y])
        for (let a of [t.min.z, t.max.z])
          n.push(this.projectPoint(r.set(e, i, a)));
    return id(n);
  }
  markAxes() {
    let e = this.controls.view.azimuth,
      t = new G(Math.cos(e), 0, -Math.sin(e)),
      n = new G(-Math.sin(e), 0, -Math.cos(e)),
      r = [new G(1, 0, 0), new G(-1, 0, 0), new G(0, 0, 1), new G(0, 0, -1)],
      i = (e, t) => e.reduce((e, n) => (n.dot(t) > e.dot(t) ? n : e)),
      a = i(r, t);
    return {
      along: a,
      up: i(
        r.filter((e) => Math.abs(e.dot(a)) < 0.5),
        n,
      ),
    };
  }
  markQuad(e, t, n, r, i) {
    let a = new G();
    return [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1],
    ].map(
      ([o, s]) => (
        a
          .copy(e)
          .addScaledVector(t, (o * r) / 2)
          .addScaledVector(n, (s * i) / 2),
        this.projectPoint(a)
      ),
    );
  }
  partHulls() {
    return [this.board, ...[...this.parts.values()].map((e) => e.group)]
      .map((e) => this.screenHull(e))
      .filter(Boolean);
  }
  placeMark() {
    if ((this.mark.hide(), (this.markAz = null), !Wu.floorCredit)) return;
    let { w: e, h: t } = this.size;
    if (e < 200 || t < 160) return;
    (this.placeCamera(), this.camera.updateMatrixWorld());
    let n = this.controls,
      r = n.view.zoom * n.fit,
      i = Math.min(270, Math.max(180, e * 0.25)) / r,
      a = i * this.mark.aspect,
      { along: o, up: s } = this.markAxes(),
      c = this.partHulls();
    if (!c.length) return;
    let l = (this.hooks.blockers?.() ?? []).map(
        (e) =>
          e.poly ?? [
            [e.x0, e.y0],
            [e.x1, e.y0],
            [e.x1, e.y1],
            [e.x0, e.y1],
          ],
      ),
      u = [...c, ...l],
      d = (n) =>
        !n.some(([n, r]) => n < 10 || r < 10 || n > e - 10 || r > t - 10) &&
        !u.some((e) => ad(n, e, 8)),
      f = iu[this.lessonId]?.mark,
      p = Math.abs(
        Math.atan2(
          Math.sin(n.view.azimuth - Yu.azimuth),
          Math.cos(n.view.azimuth - Yu.azimuth),
        ),
      );
    if (f && p < 10 * qu) {
      let e = new G(f.at[0], -3.95, f.at[1]),
        t = new G(f.along[0], 0, f.along[1]),
        n = new G(f.up[0], 0, f.up[1]),
        r = f.width * this.mark.aspect;
      if (d(this.markQuad(e, t, n, f.width, r))) {
        this.layMark(e, t, n, f.width, r);
        return;
      }
    }
    let m = 1 / 0,
      h = -1 / 0,
      g = -1 / 0;
    for (let e of c)
      for (let [t, n] of e)
        ((m = Math.min(m, t)), (h = Math.max(h, t)), (g = Math.max(g, n)));
    let _ = [(m + h) / 2, g + 20],
      v = new vt(new G(0, 1, 0), 4),
      y = new G(),
      b = null;
    for (let n = 16; n < t - 16; n += 14)
      for (let r = 16; r < e - 16; r += 14) {
        if (
          (this.ndc.set((r / e) * 2 - 1, -(n / t) * 2 + 1),
          this.raycaster.setFromCamera(this.ndc, this.camera),
          !this.raycaster.ray.intersectPlane(v, y))
        )
          continue;
        let c = Math.hypot(r - _[0], (n - _[1]) * 1.6);
        (b && c >= b.score) ||
          (d(this.markQuad(y, o, s, i, a)) &&
            (b = { score: c, at: y.clone() }));
      }
    b && this.layMark(b.at.setY(-3.95), o, s, i, a);
  }
  layMark(e, t, n, r, i) {
    (this.mark.place(e, t, n, r),
      (this.markSpot = { along: t, up: n, width: r, height: i }),
      (this.markAz = this.controls.view.azimuth),
      this.mark.show(performance.now()),
      (this.dirty = !0));
  }
  markCovered() {
    if (!this.mark.active || !this.markSpot) return !1;
    let { along: e, up: t, width: n, height: r } = this.markSpot,
      i = this.markQuad(this.mark.mesh.position, e, t, n, r);
    return this.partHulls().some((e) => ad(i, e, 4));
  }
  setGrid(e) {
    ((this.grid.visible = e), (this.dirty = !0));
  }
  setReducedMotion(e) {
    this.tweens.speed = e ? 0.05 : 1;
  }
  async runSketch(e, { out: t, trace: r }) {
    this.stopSim();
    let i = ++this.runToken;
    if (!Wu.instantRun) {
      if (
        ((this.flicker = Iu(this.leds, 1150 * this.tweens.speed)),
        t(n(`Compiling sketch…`)),
        await this.tweens.wait(600),
        i !== this.runToken ||
          (t(n(`Connecting to ESP32 on USB…`)),
          await this.tweens.wait(600),
          i !== this.runToken))
      )
        return !1;
      t(n(`Writing… 100 %. Hard resetting via RTS pin.`));
    }
    return (
      (this.sim = xu(e, {
        trace: r,
        scene: this.scene,
        parts: this.parts,
        leds: this.leds,
        anchors: this.boardAnchors,
        board: this.board,
        params: new Proxy({}, { get: (e, t) => this.values[t] }),
        inputs: this.inputs,
        sound: () => this.hooks.sound?.() ?? !0,
        setParam: (e, t) => this.hooks.onParam?.(e, t, { fromSim: !0 }),
        out: t,
        readout: (e) => {
          this.readoutState = e;
        },
      })),
      (this.dirty = !0),
      !0
    );
  }
  stopSim() {
    ((this.runToken = (this.runToken ?? 0) + 1),
      (this.sim &&= (this.sim.stop(), null)),
      (this.flicker = null),
      Fu(this.leds),
      (this.readoutState = null),
      (this.shadowDirty = !0),
      (this.dirty = !0));
  }
  loop(e) {
    requestAnimationFrame(this.loop);
    let t = Math.min(64, e - (this.lastFrame ?? e));
    this.lastFrame = e;
    let n = this.dirty;
    (this.tweens.active && (this.tweens.update(e), (n = !0)),
      this.controls.update(t) && (n = !0),
      this.autoRotate &&
        !this.dragging &&
        !this.controls.anim &&
        e - this.lastInput > 4500 &&
        this.controls.turn(1, Yu.azimuth),
      this.flicker?.update(e) && (n = !0));
    let r = !this.dragging && !this.controls.anim && !this.tweens.active;
    if (
      (r &&
        this.markAz !== null &&
        Math.abs(
          Math.atan2(
            Math.sin(this.view.azimuth - this.markAz),
            Math.cos(this.view.azimuth - this.markAz),
          ),
        ) >
          45 * qu &&
        this.placeMark(),
      r && this.markCheck && e > this.markCheck)
    ) {
      let e = this.markForce || this.markCovered();
      ((this.markCheck = 0), (this.markForce = !1), e && this.placeMark());
    }
    (this.mark.update(e) && (n = !0),
      this.sim &&
        this.sim.update(e, t) &&
        ((n = !0), this.sim?.shadows && (this.shadowDirty = !0)),
      this.updateHover(),
      n && this.render());
  }
  render() {
    ((this.dirty = !1),
      (this.shadowDirty &&= ((this.renderer.shadowMap.needsUpdate = !0), !1)),
      this.placeCamera(),
      this.selection && this.placeRing());
    let e = this.view.zoom * this.controls.fit;
    (this.composer.setLineScale(Math.min(1, Math.max(0.6, Math.sqrt(e / ed)))),
      this.composer.render(this.scene, this.camera),
      this.hooks.onFrame?.(this));
  }
};
export { od as BoardStage };

