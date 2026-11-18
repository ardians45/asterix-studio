"use client";

/**
 * The career timeline as a race track. A ribbon of tarmac winds away from the camera with four
 * chrome timing gates (S1 to S4) and photo billboards beside the road. There is no finish: the
 * road runs on into the fog and, in the last chapter, the camera keeps creeping forward past a
 * NEXT LAP sign. The camera rides the track following `getProgress()` (0..1, read every frame,
 * so scrolling never re-renders React).
 *
 * Plain three.js like GadgetScene: simple geometry only, one renderer, the loop pauses when the
 * section is off screen or the tab is hidden, everything is disposed on unmount.
 * With `still` it draws one frame (road to the horizon, sign, a few photos) instead of looping.
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
  LatheGeometry,
  LineBasicMaterial,
  LineSegments,
  Material,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  SplineCurve,
  SRGBColorSpace,
  Texture,
  TextureLoader,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { buildEnvironment } from "./GadgetScene";
import { journey } from "./data";

const BUTTER = "#FFD60A";
const INK = "#0E0E0E";
const HALF_WIDTH = 6;
// Semua nilai t di bawah dinyatakan pada lintasan lama (8 segmen) lalu diskalakan ke lintasan yang
// sudah diperpanjang lewat `T()`, jadi posisi gerbang dan kamera tidak bergeser.
// Gerbang dilewati kamera di tengah tiap chapter (progress 0.1/0.3/0.5/0.7 → t = CAM_FROM + p*(CAM_TO-CAM_FROM)),
// jadi panel teks S1..S4 ganti pas gerbangnya kelihatan.
const GATES = [0.16, 0.34, 0.52, 0.70];
const GATE_Y = 6; // height of the beam centre
const CAM_FROM = 0.02;
const CAM_TO = 0.93;
const LOOK_AHEAD = 0.04;
const SIGN_AHEAD = 48; // NEXT LAP sign: unit di depan kamera akhir (CAM_TO), di KIRI jalan supaya tetap di layar saat jalan tampil di kanan
const SIGN_T_STILL = 0.78; // closer, so it is readable in the single still frame
const STILL_T = 0.68; // camera for the still frame
const DRIFT_SPEED = 1.5; // units per second, last chapter only
const DRIFT_FROM = 0.8; // progress where the last chapter starts
const FOG_FAR = 175;
const BOARD_W = 5.2; // photo, 4:3
const BOARD_H = 3.9;
const PLATE_H = 0.62;
const FRAME = 0.12;
const POLE_H = 2.0;
const SHOW_DIST = 75;
const HIDE_DIST = 15;
const BOARD_FIRST = 1; // papan pertama: sedikit di depan gerbang dari kamera
const BOARD_STEP = 11; // papan berikut: di belakang gerbang
const CAM_SIDE = 1.5; // kamera geser ke kanan dari garis tengah
const VIEW_SHIFT = 0.45; // geser gambar ke kanan di desktop
const CLIENT_SCALE = 0.55; // papan klien: 55% papan utama
const CLIENT_FIRST = 4.5; // jarak papan klien pertama di belakang papan terakhir chapter
const CLIENT_STEP = 4.6; // jarak antar papan klien
const BALLOON_SIDE = [-23, -23]; // geser ke samping dari garis tengah (negatif = kiri jalan, yang di layar desktop jatuh di area kanan)
const BALLOON_AFTER = [30, 30]; // unit di belakang gerbang
const BALLOON_SCALE = 1.2;
const BALLOON_Y = 5.5; // tinggi keranjang
const BANNER_W = 6;
const BANNER_H = 4.5;
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

function inkPlate(w: number, h: number, draw: (ctx: CanvasRenderingContext2D) => void) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  draw(c.getContext("2d")!);
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

const FONT = '800 {S}px Inter, Archivo, system-ui, sans-serif';

/** ink label strip under a photo, text butter, shrunk to fit */
function labelTexture(text: string) {
  return inkPlate(1024, 150, (ctx) => {
    ctx.fillStyle = INK;
    ctx.fillRect(0, 0, 1024, 150);
    let size = 64;
    ctx.font = FONT.replace("{S}", String(size));
    while (ctx.measureText(text).width > 940 && size > 24) {
      size -= 2;
      ctx.font = FONT.replace("{S}", String(size));
    }
    ctx.fillStyle = BUTTER;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 512, 78);
  });
}

/** clean white panel shown until a logo loads, or as a typeset wordmark when there is no logo (first part big, rest smaller) */
function panelTexture(wordmark?: string) {
  return inkPlate(1024, 768, (ctx) => {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 1024, 768);
    if (!wordmark) return;
    const [head, ...rest] = wordmark.split(" · ");
    const sub = rest.join(" · ");
    const fit = (text: string, start: number, max: number) => {
      let size = start;
      ctx.font = FONT.replace("{S}", String(size));
      while (ctx.measureText(text).width > max && size > 24) {
        size -= 4;
        ctx.font = FONT.replace("{S}", String(size));
      }
      return size;
    };
    ctx.fillStyle = INK;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const hs = fit(head, 230, 800);
    ctx.fillText(head, 512, sub ? 340 : 384);
    if (sub) {
      fit(sub, Math.round(hs * 0.42), 800);
      ctx.fillText(sub, 512, 340 + hs * 0.62);
    }
  });
}

function nextLapTexture() {
  return inkPlate(1024, 320, (ctx) => {
    ctx.fillStyle = INK;
    ctx.fillRect(0, 0, 1024, 320);
    ctx.strokeStyle = BUTTER;
    ctx.lineWidth = 14;
    ctx.strokeRect(14, 14, 996, 292);
    ctx.fillStyle = BUTTER;
    ctx.font = FONT.replace("{S}", "150");
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("NEXT LAP →", 512, 172);
  });
}

/** banner printed on a balloon: butter frame, photo (drawn once it loads), ink caption strip */
function bannerCanvas(label: string, img?: HTMLImageElement) {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 768;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = BUTTER;
  ctx.fillRect(0, 0, 1024, 768);
  const x = 28;
  const y = 28;
  const w = 1024 - x * 2;
  const h = 768 - y * 2 - 120;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(x, y, w, h);
  if (img && img.width && img.height) {
    const a = img.width / img.height;
    const t = w / h;
    const sw = a > t ? img.height * t : img.width;
    const sh = a > t ? img.height : img.width / t;
    ctx.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, x, y, w, h);
  }
  const sy = y + h + 24;
  const sh2 = 768 - sy - y;
  ctx.fillStyle = INK;
  ctx.fillRect(x, sy, w, sh2);
  let size = 64;
  ctx.font = FONT.replace("{S}", String(size));
  while (ctx.measureText(label).width > w - 40 && size > 24) {
    size -= 2;
    ctx.font = FONT.replace("{S}", String(size));
  }
  ctx.fillStyle = BUTTER;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, 512, sy + sh2 / 2 + 3);
  return c;
}

/** centre-crop a photo texture to 4:3 */
function cover43(tex: Texture) {
  const img = tex.image as { width: number; height: number } | undefined;
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 4;
  if (!img || !img.width || !img.height) return;
  const target = BOARD_W / BOARD_H;
  const a = img.width / img.height;
  if (a > target) {
    tex.repeat.set(target / a, 1);
    tex.offset.set((1 - target / a) / 2, 0);
  } else {
    tex.repeat.set(1, a / target);
    tex.offset.set(0, (1 - a / target) / 2);
  }
}

const easeOutBack = (x: number) => {
  const c1 = 1.4;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

type Board = { g: Group; x: number; z: number; tx: number; tz: number; v: number };
type Balloon = Board & { sx: number; sz: number; phase: number; baseY: number };

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
    scene.fog = new Fog(INK, 25, FOG_FAR);
    const camera = new PerspectiveCamera(FOV, 1, 0.3, 320);
    const envTarget = buildEnvironment(renderer);
    scene.environment = envTarget.texture;
    scene.add(new AmbientLight("#ffffff", 0.55));
    const sun = new DirectionalLight("#ffffff", 1.1);
    sun.position.set(30, 60, 20);
    scene.add(sun);

    // ── the track ──────────────────────────────────────────────────────────
    // 12 control points; the first 9 are the original lap, the rest run on into the fog (no finish)
    const pts: Vector3[] = [];
    for (let i = 0; i <= 11; i++) pts.push(new Vector3(Math.sin(i * 0.85) * 28, Math.sin(i * 0.55 + 0.5) * 2.5, -i * 65));
    const curve = new CatmullRomCurve3(pts, false, "centripetal");
    const LEN = curve.getLength();
    const L0 = new CatmullRomCurve3(pts.slice(0, 9), false, "centripetal").getLength();
    /** t on the old 8-segment track -> t on this longer one */
    const T = (t: number) => (t * L0) / LEN;

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
      strip(pos, idx, 0, 1, 720, 0, HALF_WIDTH, 0);
      scene.add(new Mesh(toGeo(pos, idx), tarmac));
    }
    {
      const pos: number[] = [];
      const idx: number[] = [];
      for (const s of [-1, 1]) strip(pos, idx, 0, 1, 720, s * (HALF_WIDTH - 0.4), 0.14, 0.03);
      // dashed centre line: 4 units of paint, 5 of gap, all the way out
      const period = 9 / LEN;
      for (let t = 0.004; t + 4 / LEN < 1; t += period) strip(pos, idx, t, t + 4 / LEN, 3, 0, 0.09, 0.03);
      scene.add(new Mesh(toGeo(pos, idx), lineMat));
    }

    // ── gates ──────────────────────────────────────────────────────────────
    const chrome = keepMat(new MeshPhysicalMaterial({ color: "#ffffff", metalness: 1, roughness: 0.14, clearcoat: 1, clearcoatRoughness: 0.1 }));
    const postGeo = keepGeo(new BoxGeometry(0.6, 7.2, 0.6));
    const beamGeo = keepGeo(new BoxGeometry(HALF_WIDTH * 2 + 1.4, 2.4, 0.7));
    const plateGeo = keepGeo(new PlaneGeometry(5.2, 2.275));
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
      const g = gate(T(t));
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

    // ── logo billboards beside the road ───────────────────────────────────
    const loader = new TextureLoader();
    let disposed = false;
    let draw: () => void = () => {};
    const wide = !still && window.innerWidth >= 1024; // text column covers the left 40% of the screen
    const boards: Board[] = [];
    const frameH = BOARD_H + PLATE_H + FRAME * 2;
    const frameGeo = keepGeo(new BoxGeometry(BOARD_W + FRAME * 2, frameH, FRAME));
    const photoGeo = keepGeo(new PlaneGeometry(BOARD_W, BOARD_H));
    const labelGeo = keepGeo(new PlaneGeometry(BOARD_W, PLATE_H));
    const boardPoleGeo = keepGeo(new BoxGeometry(0.16, 1, 0.16));
    const boardPoleMat = keepMat(new MeshStandardMaterial({ color: "#8a8a8a", metalness: 0.6, roughness: 0.4 }));
    const frameMat = keepMat(new MeshStandardMaterial({ color: BUTTER, roughness: 0.55 }));
    const boardCenterY = POLE_H + frameH / 2;
    const facing = new Vector3();
    const yaw = (25 * Math.PI) / 180;

    /** one billboard at track position t, `off` to the side; sc < 1 makes a smaller board on a shorter pole */
    const makeBoard = (ph: { src?: string; label: string; wordmark?: string }, t: number, off: number, sc: number) => {
      frameAt(t);
      const s = off < 0 ? -1 : 1;
      const g = new Group();
      g.position.set(p.x + side.x * off, p.y, p.z + side.z * off);
      // face the oncoming camera, turned about 25 degrees toward the road
      facing.set(-tan.x * Math.cos(yaw) - s * side.x * Math.sin(yaw), 0, -tan.z * Math.cos(yaw) - s * side.z * Math.sin(yaw));
      g.lookAt(g.position.x + facing.x, g.position.y, g.position.z + facing.z);

      const inner = new Group();
      inner.scale.setScalar(sc);
      const pole = new Mesh(boardPoleGeo, boardPoleMat);
      pole.scale.y = boardCenterY;
      pole.position.set(0, boardCenterY / 2, -FRAME);
      const frame = new Mesh(frameGeo, frameMat);
      frame.position.set(0, boardCenterY, 0);

      const photoMat = keepMat(new MeshBasicMaterial({ map: keepTex(panelTexture(ph.wordmark)) }));
      const photo = new Mesh(photoGeo, photoMat);
      photo.position.set(0, boardCenterY + frameH / 2 - FRAME - BOARD_H / 2, FRAME / 2 + 0.005);
      const plate = new Mesh(labelGeo, keepMat(new MeshBasicMaterial({ map: keepTex(labelTexture(ph.label)) })));
      plate.position.set(0, boardCenterY - frameH / 2 + FRAME + PLATE_H / 2, FRAME / 2 + 0.005);
      inner.add(pole, frame, photo, plate);
      g.add(inner);
      g.scale.y = 0.001;
      g.visible = false;
      scene.add(g);
      boards.push({ g, x: g.position.x, z: g.position.z, tx: tan.x, tz: tan.z, v: 0 });

      if (ph.src) {
        loader.load(
          ph.src,
          (tex) => {
            if (disposed) {
              tex.dispose();
              return;
            }
            cover43(tex);
            texs.push(tex);
            photoMat.map = tex;
            photoMat.needsUpdate = true;
            if (still) draw();
          },
          undefined,
          () => {}, // missing file: keep the placeholder
        );
      }
    };

    journey.forEach((ch, ci) => {
      // papan diletakkan relatif terhadap kamera di tengah chapter (progress 0.1/0.3/0.5/0.7): 24..46 unit di depannya, sebelum gerbang
      const camC = CAM_FROM + (CAM_TO - CAM_FROM) * (0.1 + 0.2 * ci);
      const gd = (T(GATES[ci]) - T(camC)) * LEN; // jarak kamera (tengah chapter) ke gerbang chapter ini
      ch.photos.forEach((ph, k) => {
        const ahead = k === 0 ? gd + BOARD_FIRST : gd + BOARD_STEP * k;
        const t = T(camC) + ahead / LEN;
        const s = -1; // semua papan di kiri jalan (permintaan user); di desktop kamera digeser lebih ke kanan supaya tetap di luar kolom teks
        const gap = wide ? 5.4 : 1.5 + ((k + ci) % 3) * 0.75; // jarak dari tepi aspal
        // desktop: papan di balik gerbang (k>=1) digeser keluar sampai tepi dalamnya tepat di kiri tiang gerbang pada layar
        const half = (BOARD_W + FRAME * 2) / 2;
        const off = s * (wide && k > 0 ? (HALF_WIDTH + 2.3) * (ahead / gd) + half + 0.6 - CAM_SIDE : HALF_WIDTH + gap + half);
        makeBoard(ph, t, off, 1);
      });
      // deretan papan klien kecil di belakang papan terakhir, rapat seperti papan sponsor
      const lastAhead = ch.photos.length > 1 ? gd + BOARD_STEP * (ch.photos.length - 1) : gd + BOARD_FIRST;
      (ch.clients ?? []).forEach((ph, j) => {
        const ahead = lastAhead + CLIENT_FIRST + CLIENT_STEP * j;
        const t = T(camC) + ahead / LEN;
        const half = ((BOARD_W + FRAME * 2) * CLIENT_SCALE) / 2;
        makeBoard(ph, t, -(HALF_WIDTH + (wide ? 1.6 : 1.2) + half), CLIENT_SCALE);
      });
    });

    // ── hot-air balloons for the two podiums (S3, S4), floating over the road ─
    const balloons: Balloon[] = [];
    if (!still) {
      const prof = new SplineCurve(
        [[0.7, 0], [1.4, 0.9], [2.3, 2.0], [2.9, 3.3], [3.0, 4.3], [2.6, 5.5], [1.7, 6.5], [0.7, 7.2], [0, 7.45]].map(([x, y]) => new Vector2(x * 1.15, y * 1.1)),
      ).getPoints(36);
      const lathe = new LatheGeometry(prof, 24);
      const envGeo = keepGeo(lathe.toNonIndexed());
      lathe.dispose();
      {
        const pos = envGeo.getAttribute("position");
        const col: number[] = [];
        const cb = new Color(BUTTER);
        const ck = new Color("#1b1b1b");
        for (let i = 0; i < pos.count; i += 3) {
          const cx = (pos.getX(i) + pos.getX(i + 1) + pos.getX(i + 2)) / 3;
          const cz = (pos.getZ(i) + pos.getZ(i + 1) + pos.getZ(i + 2)) / 3;
          const stripe = Math.floor(((Math.atan2(cz, cx) + Math.PI) / (Math.PI * 2)) * 12 + 0.001) % 2;
          const c = stripe ? ck : cb;
          for (let k = 0; k < 3; k++) col.push(c.r, c.g, c.b);
        }
        envGeo.setAttribute("color", new Float32BufferAttribute(col, 3));
      }
      const envMat = keepMat(new MeshStandardMaterial({ vertexColors: true, roughness: 0.7, side: DoubleSide }));
      const basketGeo = keepGeo(new BoxGeometry(1.5, 1, 1.5));
      const basketMat = keepMat(new MeshStandardMaterial({ color: "#5a3d1e", roughness: 0.9 }));
      const rimGeo = keepGeo(new BoxGeometry(1.7, 0.16, 1.7));
      const ropeMat = keepMat(new LineBasicMaterial({ color: "#cfcfcf" }));
      const ropeGeo = keepGeo(new BufferGeometry());
      {
        const v: number[] = [];
        for (const sx of [-1, 1]) for (const sz of [-1, 1]) v.push(sx * 0.65, 0.5, sz * 0.65, sx * 0.85, 2.7, sz * 0.85);
        ropeGeo.setAttribute("position", new Float32BufferAttribute(v, 3));
      }
      const env0 = 2.7; // bottom of the envelope above the basket
      const envMid = env0 + 4.3 * 1.1; // widest point: where the banner sits
      const bannerGeo = keepGeo(new PlaneGeometry(BANNER_W, BANNER_H, 16, 1));
      {
        // bend the banner around the envelope so it reads as printed on it
        const R = 3.45 + 0.05;
        const pos = bannerGeo.getAttribute("position");
        for (let i = 0; i < pos.count; i++) {
          const x = pos.getX(i);
          pos.setZ(i, Math.sqrt(R * R - x * x));
        }
        bannerGeo.computeVertexNormals();
      }
      const specs = [
        { src: "/portfolio/balloons/mia.webp", label: "2nd place · MIA × LinkAja 2025", gate: 2 },
        { src: "/portfolio/balloons/prada.webp", label: "3rd place · PRADA × Tel-U 2026", gate: 3 },
      ];
      specs.forEach((sp, bi) => {
        const bt = T(GATES[sp.gate]) + BALLOON_AFTER[bi] / LEN;
        frameAt(bt);
        const g = new Group();
        const baseY = p.y + BALLOON_Y;
        const lat = wide ? BALLOON_SIDE[bi] : BALLOON_SIDE[bi] * 0.7;
        g.position.set(p.x + side.x * lat, baseY, p.z + side.z * lat);
        g.lookAt(g.position.x - tan.x, g.position.y, g.position.z - tan.z); // +z toward the camera
        const env = new Mesh(envGeo, envMat);
        env.position.y = env0;
        const basket = new Mesh(basketGeo, basketMat);
        const rim = new Mesh(rimGeo, butterMat);
        rim.position.y = 0.5;
        const ropes = new LineSegments(ropeGeo, ropeMat);
        const bannerTex = keepTex(new CanvasTexture(bannerCanvas(sp.label)));
        bannerTex.colorSpace = SRGBColorSpace;
        const bannerMat = keepMat(new MeshBasicMaterial({ map: bannerTex }));
        const banner = new Mesh(bannerGeo, bannerMat);
        banner.position.set(0, envMid, 0);
        g.add(env, basket, rim, ropes, banner);
        g.scale.setScalar(0.001);
        g.visible = false;
        scene.add(g);
        balloons.push({ g, x: g.position.x, z: g.position.z, tx: tan.x, tz: tan.z, v: 0, sx: side.x, sz: side.z, phase: bi * 2.1, baseY });

        const img = new Image();
        img.onload = () => {
          if (disposed) return;
          const tex = new CanvasTexture(bannerCanvas(sp.label, img));
          tex.colorSpace = SRGBColorSpace;
          tex.anisotropy = 4;
          texs.push(tex);
          bannerMat.map = tex;
          bannerMat.needsUpdate = true;
        };
        img.src = sp.src;
      });
    }

    // ── NEXT LAP sign, right of the road, facing the camera ────────────────
    {
      frameAt(still ? T(SIGN_T_STILL) : T(CAM_TO) + SIGN_AHEAD / LEN);
      const g = new Group();
      const off = still ? HALF_WIDTH + 6 : -(HALF_WIDTH + 5.5);
      g.position.set(p.x + side.x * off, p.y, p.z + side.z * off);
      g.lookAt(g.position.x - tan.x, g.position.y, g.position.z - tan.z);
      const signW = still ? 7.5 : 11;
      const signH = signW * 0.3125;
      const signY = 5.6;
      const poleG = keepGeo(new BoxGeometry(0.2, signY, 0.2));
      for (const x of [-signW / 2 + 0.6, signW / 2 - 0.6]) {
        const pole = new Mesh(poleG, boardPoleMat);
        pole.position.set(x, signY / 2, -0.1);
        g.add(pole);
      }
      const sign = new Mesh(keepGeo(new PlaneGeometry(signW, signH)), keepMat(new MeshBasicMaterial({ map: keepTex(nextLapTexture()) })));
      sign.position.set(0, signY, 0.01);
      const backing = new Mesh(keepGeo(new BoxGeometry(signW + 0.1, signH + 0.1, 0.1)), darkMat);
      backing.position.set(0, signY, -0.05);
      g.add(sign, backing);
      scene.add(g);
    }

    // ── camera + loop ──────────────────────────────────────────────────────
    const camPos = new Vector3();
    const camLook = new Vector3();
    const STILL_P = (STILL_T - CAM_FROM) / (CAM_TO - CAM_FROM);
    // never reach the fogged-out end of the road, and stop well before the NEXT LAP sign so it stays in view
    const maxDrift = Math.max(0, Math.min((1 - (FOG_FAR + 10) / LEN - T(CAM_TO)) * LEN, SIGN_AHEAD - 30));
    let drift = 0;
    const place = (progress: number) => {
      const tc = T(CAM_FROM + (CAM_TO - CAM_FROM) * Math.min(1, Math.max(0, progress))) + drift / LEN;
      frameAt(tc);
      camPos.copy(p).addScaledVector(side, CAM_SIDE).addScaledVector(UP, 2.2);
      frameAt(tc + T(LOOK_AHEAD));
      camLook.copy(p).addScaledVector(UP, 0.8);
      camera.position.copy(camPos);
      camera.lookAt(camLook);
    };

    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      if (!still && w >= 1024) camera.setViewOffset(w, h, -w * VIEW_SHIFT, 0, w, h); // track + left-side boards sit right of the text column
      else camera.clearViewOffset();
      camera.updateProjectionMatrix();
      if (still) draw();
    };

    let smooth = still ? STILL_P : progressRef.current?.() ?? 0;
    draw = () => {
      place(smooth);
      renderer.render(scene, camera);
    };

    /** grow boards near the camera out of the ground, sink the ones left behind; no allocations */
    const proj = new Vector3();
    const updateBoards = (delta: number, instant: boolean) => {
      const cx = camera.position.x;
      const cz = camera.position.z;
      const k = 1 - Math.exp(-delta * 4);
      for (let i = 0; i < boards.length; i++) {
        const b = boards[i];
        const dx = b.x - cx;
        const dz = b.z - cz;
        const d = Math.sqrt(dx * dx + dz * dz);
        const passed = dx * b.tx + dz * b.tz < 0; // camera already beyond the board
        let want = d < (passed ? HIDE_DIST : SHOW_DIST) ? 1 : 0;
        if (wide && want) {
          // safety: never rise behind the text column (left 42% of the screen)
          proj.set(b.x, boardCenterY, b.z).project(camera);
          if (proj.z < 1 && (proj.x + 1) / 2 < 0.53) want = 0;
        }
        b.v = instant ? want : b.v + (want - b.v) * k;
        if (b.v < 0.003) {
          b.g.visible = false;
        } else {
          b.g.visible = true;
          b.g.scale.y = Math.max(0.001, easeOutBack(Math.min(1, b.v)));
        }
      }
    };

    /** balloons: grow in when their chapter is near, bob and drift slowly; no allocations */
    const updateBalloons = (delta: number, time: number) => {
      const cx = camera.position.x;
      const cz = camera.position.z;
      const k = 1 - Math.exp(-delta * 3);
      for (let i = 0; i < balloons.length; i++) {
        const b = balloons[i];
        const dx = b.x - cx;
        const dz = b.z - cz;
        const d = Math.sqrt(dx * dx + dz * dz);
        const passed = dx * b.tx + dz * b.tz < 0;
        const want = d < (passed ? HIDE_DIST : SHOW_DIST) ? 1 : 0;
        b.v = b.v + (want - b.v) * k;
        if (b.v < 0.003) {
          b.g.visible = false;
          continue;
        }
        b.g.visible = true;
        b.g.scale.setScalar(Math.max(0.001, easeOutBack(Math.min(1, b.v))) * BALLOON_SCALE);
        const drift = Math.sin(time * 0.11 + b.phase) * 2.2;
        b.g.position.set(b.x + b.sx * drift, b.baseY + Math.sin(time * 0.5 + b.phase) * 0.8, b.z + b.sz * drift);
        b.g.rotation.z = Math.sin(time * 0.35 + b.phase) * 0.025;
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let raf = 0;
    let io: IntersectionObserver | undefined;
    let onVisibility: (() => void) | undefined;
    if (still) {
      place(smooth);
      updateBoards(0, true);
      draw();
    } else {
      let last = performance.now();
      const frame = (now: number) => {
        raf = requestAnimationFrame(frame);
        // rAF timestamp can be earlier than performance.now() on the first frame: a negative delta made the damping overshoot wildly
        const delta = Math.max(0, Math.min(0.05, (now - last) / 1000));
        last = now;
        const target = progressRef.current?.() ?? 0;
        smooth += (target - smooth) * (1 - Math.pow(0.0004, delta)); // frame-rate independent damping
        // last chapter: keep creeping down the road; elsewhere settle back to the scroll position
        drift = smooth >= DRIFT_FROM ? Math.min(maxDrift, drift + DRIFT_SPEED * delta) : Math.max(0, drift - 60 * delta);
        place(smooth);
        camera.updateMatrixWorld();
        updateBoards(delta, false);
        updateBalloons(delta, now / 1000);
        renderer.render(scene, camera);
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
      envTarget.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [still]);

  return <div ref={wrap} className={className} aria-hidden="true" />;
}
