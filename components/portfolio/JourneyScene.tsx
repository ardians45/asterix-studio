"use client";

/**
 * The career timeline as a race track. A ribbon of tarmac winds away from the camera, with four
 * chrome timing gates (S1 to S4), a chequered finish gate and a desk with a gadget on it behind
 * the line. The camera rides the track following `getProgress()` (0..1, read every frame, so
 * scrolling never re-renders React).
 *
 * Plain three.js like GadgetScene: simple geometry only, one renderer, the loop pauses when the
 * section is off screen or the tab is hidden, everything is disposed on unmount.
 * With `still` it draws one frame from the finish line instead of looping.
 */

import { useEffect, useRef } from "react";
import {
  AmbientLight,
  BoxGeometry,
  BufferGeometry,
  CanvasTexture,
  CatmullRomCurve3,
  Color,
  DirectionalLight,
  DoubleSide,
  Float32BufferAttribute,
  Fog,
  Group,
  Material,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  SRGBColorSpace,
  Texture,
  TextureLoader,
  Vector3,
  WebGLRenderer,
} from "three";
import { buildEnvironment, buildGadgets, fitCover } from "./GadgetScene";

const BUTTER = "#FFD60A";
const INK = "#0E0E0E";
const HALF_WIDTH = 6;
// Gerbang dilewati kamera di tengah tiap chapter (progress 0.1/0.3/0.5/0.7 → t = CAM_FROM + p*(CAM_TO-CAM_FROM)),
// jadi panel teks S1..S4 ganti pas gerbangnya kelihatan.
const GATES = [0.16, 0.34, 0.52, 0.70];
const GATE_Y = 6; // height of the beam centre
const FINISH_T = 0.95;
const CAM_FROM = 0.02;
const CAM_TO = 0.93;
const LOOK_AHEAD = 0.04;
const FOV = 50;
const UP = new Vector3(0, 1, 0);

type Props = {
  /** current progress 0..1, read on every frame */
  getProgress?: () => number;
  /** render a single frame from the finish line, no loop */
  still?: boolean;
  className?: string;
};

function plateTexture(text: string) {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 112;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = BUTTER;
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.fillStyle = INK;
  ctx.font = "800 76px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, c.width / 2, c.height / 2 + 4);
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

function checkerTexture() {
  const cell = 32;
  const c = document.createElement("canvas");
  c.width = cell * 20;
  c.height = cell * 2;
  const ctx = c.getContext("2d")!;
  for (let y = 0; y < 2; y++) {
    for (let x = 0; x < 20; x++) {
      ctx.fillStyle = (x + y) % 2 === 0 ? "#ffffff" : INK;
      ctx.fillRect(x * cell, y * cell, cell, cell);
    }
  }
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

export default function JourneyScene({ getProgress, still = false, className = "" }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const progressRef = useRef(getProgress);
  useEffect(() => {
    progressRef.current = getProgress;
  }, [getProgress]);

  useEffect(() => {
    const host = wrap.current;
    if (!host) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    } catch {
      // no WebGL: hide the (otherwise empty) frame; the section just shows its text
      host.closest(".pf-journey-canvas")?.setAttribute("data-failed", "true");
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(INK, 1);
    renderer.domElement.style.cssText = "display:block;width:100%;height:100%";
    host.appendChild(renderer.domElement);

    const geos: BufferGeometry[] = [];
    const mats: Material[] = [];
    const texs: Texture[] = [];
    const keepGeo = <T extends BufferGeometry>(g: T) => (geos.push(g), g);
    const keepMat = <T extends Material>(m: T) => (mats.push(m), m);
    const keepTex = <T extends Texture>(t: T) => (texs.push(t), t);

    const scene = new Scene();
    scene.background = new Color(INK);
    scene.fog = new Fog(INK, 25, 175);
    const camera = new PerspectiveCamera(FOV, 1, 0.3, 320);
    const envTarget = buildEnvironment(renderer);
    scene.environment = envTarget.texture;
    scene.add(new AmbientLight("#ffffff", 0.55));
    const sun = new DirectionalLight("#ffffff", 1.1);
    sun.position.set(30, 60, 20);
    scene.add(sun);

    // ── the track ──────────────────────────────────────────────────────────
    const pts: Vector3[] = [];
    for (let i = 0; i <= 8; i++) pts.push(new Vector3(Math.sin(i * 0.85) * 28, Math.sin(i * 0.55 + 0.5) * 2.5, -i * 65));
    const curve = new CatmullRomCurve3(pts, false, "centripetal");
    const LEN = curve.getLength();

    const p = new Vector3();
    const tan = new Vector3();
    const side = new Vector3();
    const frameAt = (t: number) => {
      curve.getPointAt(Math.min(1, Math.max(0, t)), p);
      curve.getTangentAt(Math.min(1, Math.max(0, t)), tan);
      side.set(-tan.z, 0, tan.x).normalize();
    };

    /** flat strip along the curve between t0 and t1, `off` to the side of the centre line */
    const strip = (pos: number[], idx: number[], t0: number, t1: number, segs: number, off: number, hw: number, y: number) => {
      const base = pos.length / 3;
      for (let i = 0; i <= segs; i++) {
        frameAt(t0 + ((t1 - t0) * i) / segs);
        pos.push(p.x + side.x * (off - hw), p.y + y, p.z + side.z * (off - hw));
        pos.push(p.x + side.x * (off + hw), p.y + y, p.z + side.z * (off + hw));
      }
      for (let i = 0; i < segs; i++) {
        const a = base + i * 2;
        idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
      }
    };
    const toGeo = (pos: number[], idx: number[]) => {
      const g = keepGeo(new BufferGeometry());
      g.setAttribute("position", new Float32BufferAttribute(pos, 3));
      g.setIndex(idx);
      g.computeVertexNormals();
      return g;
    };

    const tarmac = keepMat(new MeshStandardMaterial({ color: "#1a1a1a", roughness: 0.95, metalness: 0, side: DoubleSide }));
    const lineMat = keepMat(new MeshBasicMaterial({ color: BUTTER, side: DoubleSide, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }));

    {
      const pos: number[] = [];
      const idx: number[] = [];
      strip(pos, idx, 0, 1, 520, 0, HALF_WIDTH, 0);
      scene.add(new Mesh(toGeo(pos, idx), tarmac));
    }
    {
      const pos: number[] = [];
      const idx: number[] = [];
      for (const s of [-1, 1]) strip(pos, idx, 0, 1, 520, s * (HALF_WIDTH - 0.4), 0.14, 0.03);
      // dashed centre line: 4 units of paint, 5 of gap
      const period = 9 / LEN;
      for (let t = 0.004; t + 4 / LEN < 1; t += period) strip(pos, idx, t, t + 4 / LEN, 3, 0, 0.09, 0.03);
      scene.add(new Mesh(toGeo(pos, idx), lineMat));
    }

    // ── gates ──────────────────────────────────────────────────────────────
    const chrome = keepMat(new MeshPhysicalMaterial({ color: "#ffffff", metalness: 1, roughness: 0.14, clearcoat: 1, clearcoatRoughness: 0.1 }));
    const postGeo = keepGeo(new BoxGeometry(0.6, 7.2, 0.6));
    const beamGeo = keepGeo(new BoxGeometry(HALF_WIDTH * 2 + 1.4, 2.4, 0.7));
    const plateGeo = keepGeo(new PlaneGeometry(5.2, 2.275));
    const bannerGeo = keepGeo(new PlaneGeometry(HALF_WIDTH * 2 + 1, 2.1));
    const matGeo = keepGeo(new BoxGeometry(HALF_WIDTH * 2 - 1.2, 0.06, 1.8));
    const stripeGeo = keepGeo(new BoxGeometry(0.1, 0.02, 1.8));
    const butterMat = keepMat(new MeshStandardMaterial({ color: BUTTER, roughness: 0.6 }));
    const darkMat = keepMat(new MeshBasicMaterial({ color: INK }));

    /** a gate at t, facing along the track; returns the group */
    const gate = (t: number) => {
      frameAt(t);
      const g = new Group();
      g.position.copy(p);
      g.lookAt(p.x + tan.x, p.y, p.z + tan.z);
      for (const s of [-1, 1]) {
        const post = new Mesh(postGeo, chrome);
        post.position.set(s * (HALF_WIDTH + 0.5), 3.6, 0);
        g.add(post);
      }
      const beam = new Mesh(beamGeo, chrome);
      beam.position.set(0, GATE_Y, 0);
      g.add(beam);
      scene.add(g);
      return g;
    };

    GATES.forEach((t, i) => {
      const g = gate(t);
      const tex = keepTex(plateTexture(`S${i + 1}`));
      const m = keepMat(new MeshBasicMaterial({ map: tex }));
      const front = new Mesh(plateGeo, m);
      front.position.set(0, GATE_Y, -0.37); // the camera side
      front.rotation.y = Math.PI;
      const back = new Mesh(plateGeo, m);
      back.position.set(0, GATE_Y, 0.37);
      g.add(front, back);

      // RFID mat on the tarmac under the gate
      const mat = new Mesh(matGeo, butterMat);
      mat.position.set(0, 0.07, 0);
      g.add(mat);
      for (let k = -5; k <= 5; k++) {
        const line = new Mesh(stripeGeo, darkMat);
        line.position.set(k * 0.9, 0.11, 0);
        g.add(line);
      }
    });

    // finish gate with a chequered banner
    {
      const g = gate(FINISH_T);
      const tex = keepTex(checkerTexture());
      const m = keepMat(new MeshBasicMaterial({ map: tex }));
      const front = new Mesh(bannerGeo, m);
      front.position.set(0, GATE_Y, -0.37);
      front.rotation.y = Math.PI;
      const back = new Mesh(bannerGeo, m);
      back.position.set(0, GATE_Y, 0.37);
      g.add(front, back);
    }

    // desk behind the line, with a handheld gadget turning slowly on it
    const screenMat = keepMat(new MeshBasicMaterial({ color: "#0b0b0c", toneMapped: false }));
    const { variants, dispose: disposeGadgets } = buildGadgets(screenMat);
    const gadget = variants[0];
    const desk = new Group();
    const deskPos = new Vector3();
    const deskTan = new Vector3();
    const deskSide = new Vector3();
    {
      frameAt(FINISH_T + 22 / LEN);
      desk.position.copy(p);
      desk.lookAt(p.x - tan.x, p.y, p.z - tan.z); // front of the gadget faces the camera
      deskPos.copy(p);
      deskTan.copy(tan);
      deskSide.copy(side);
      const body = new Mesh(keepGeo(new BoxGeometry(6, 1.2, 3)), keepMat(new MeshStandardMaterial({ color: "#222222", roughness: 0.7, metalness: 0.2 })));
      body.position.y = 0.6;
      const top = new Mesh(keepGeo(new BoxGeometry(6.2, 0.1, 3.2)), butterMat);
      top.position.y = 1.25;
      desk.add(body, top);
      gadget.scale.setScalar(1.5);
      gadget.position.y = 1.3 + 1.6 * 1.5;
      desk.add(gadget);
      scene.add(desk);
    }

    const loader = new TextureLoader();
    let disposed = false;
    let draw: () => void = () => {};
    loader.load("/portfolio/screens/paletindo.webp", (t) => {
      if (disposed) {
        t.dispose();
        return;
      }
      fitCover(t);
      texs.push(t);
      screenMat.map = t;
      screenMat.color.set("#ffffff");
      screenMat.needsUpdate = true;
      if (still) draw();
    });

    // ── camera + loop ──────────────────────────────────────────────────────
    const camPos = new Vector3();
    const camLook = new Vector3();
    const deskEye = new Vector3();
    const deskAim = new Vector3();
    const place = (progress: number) => {
      const tc = CAM_FROM + (CAM_TO - CAM_FROM) * Math.min(1, Math.max(0, progress));
      frameAt(tc);
      camPos.copy(p).addScaledVector(side, 1.5).addScaledVector(UP, 2.2);
      frameAt(tc + LOOK_AHEAD);
      camLook.copy(p).addScaledVector(UP, 0.8);
      // chapter FIN: kamera naik pelan dan berhenti menghadap meja + gadget di balik garis finish
      const k = Math.min(1, Math.max(0, (progress - 0.82) / 0.18));
      const e = k * k * (3 - 2 * k);
      if (e > 0) {
        camPos.lerp(deskEye.copy(deskPos).addScaledVector(deskTan, -10).addScaledVector(deskSide, 1.2).addScaledVector(UP, 3.4), e);
        camLook.lerp(deskAim.copy(deskPos).addScaledVector(UP, 3.2), e);
      }
      camera.position.copy(camPos);
      camera.lookAt(camLook);
    };

    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      if (!still && w >= 1024) camera.setViewOffset(w, h, -w * 0.2, 0, w, h); // track sits in the right half
      else camera.clearViewOffset();
      camera.updateProjectionMatrix();
      if (still) draw();
    };

    let smooth = still ? 1 : progressRef.current?.() ?? 0;
    let spin = 0;
    draw = () => {
      place(smooth);
      gadget.rotation.y = still ? -0.35 : Math.sin(spin) * 0.45; // layar tetap menghadap kamera, cuma bergoyang pelan
      renderer.render(scene, camera);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let raf = 0;
    let io: IntersectionObserver | undefined;
    let onVisibility: (() => void) | undefined;
    if (still) {
      draw();
    } else {
      let last = performance.now();
      const frame = (now: number) => {
        raf = requestAnimationFrame(frame);
        const delta = Math.min(0.05, (now - last) / 1000);
        last = now;
        const target = progressRef.current?.() ?? 0;
        smooth += (target - smooth) * (1 - Math.pow(0.0004, delta)); // frame-rate independent damping
        spin += delta * 0.5;
        draw();
      };
      let onScreen = true;
      const sync = () => {
        const run = onScreen && !document.hidden;
        if (run && !raf) {
          last = performance.now();
          raf = requestAnimationFrame(frame);
        } else if (!run && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      };
      io = new IntersectionObserver(([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      });
      io.observe(host);
      onVisibility = sync;
      document.addEventListener("visibilitychange", sync);
      sync();
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io?.disconnect();
      ro.disconnect();
      if (onVisibility) document.removeEventListener("visibilitychange", onVisibility);
      texs.forEach((t) => t.dispose());
      mats.forEach((m) => m.dispose());
      geos.forEach((g) => g.dispose());
      disposeGadgets();
      envTarget.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [still]);

  return <div ref={wrap} className={className} aria-hidden="true" />;
}
