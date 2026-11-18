"use client";

/**
 * A chrome / glass gadget floating in the middle of the hero. It turns toward the mouse, spins
 * into a different gadget every few seconds, and its screen shows real project screenshots.
 *
 * Written against plain three.js (no react-three-fiber / drei) to keep the chunk small:
 * - no model or HDR downloads: gadgets are simple geometry, reflections come from a tiny
 *   procedural environment baked once with PMREM;
 * - screen textures load one at a time, only when a gadget is about to show them;
 * - the render loop stops whenever the hero is off screen or the tab is hidden.
 */

import { useEffect, useRef } from "react";
import {
  AmbientLight,
  BoxGeometry,
  BufferGeometry,
  ClampToEdgeWrapping,
  Color,
  CylinderGeometry,
  DirectionalLight,
  Group,
  Material,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  Scene,
  SRGBColorSpace,
  Texture,
  TextureLoader,
  WebGLRenderer,
} from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

const SCREENS = [
  "/portfolio/screens/paletindo.webp",
  "/portfolio/screens/bantu.webp",
  "/portfolio/screens/srlaundry.webp",
  "/portfolio/screens/greenify.webp",
  "/portfolio/screens/careerconnect.webp",
];

const BUTTER = "#FFD60A";
const SCREEN_ASPECT = 1.41;
const CAMERA_Z = 8.6;
const FOV = 35;
const VIEW_H = 2 * CAMERA_Z * Math.tan((FOV * Math.PI) / 360); // world height visible at z = 0

// Little components soldered to the handheld's board: [x, y, width, height, material(0 gold, 1 chrome, 2 dark)]
const PARTS: [number, number, number, number, number][] = [
  [-0.7, -1.15, 0.3, 0.2, 2],
  [-0.3, -1.3, 0.16, 0.1, 0],
  [0.7, -1.2, 0.36, 0.14, 2],
  [0.75, -0.98, 0.1, 0.1, 0],
  [0.0, -0.35, 0.34, 0.24, 2],
  [0.02, -0.68, 0.2, 0.08, 0],
  [-0.2, -0.12, 0.12, 0.08, 1],
  [0.25, -0.1, 0.22, 0.1, 2],
  [-0.85, -0.05, 0.12, 0.2, 0],
  [0.88, -0.05, 0.1, 0.24, 1],
  [0.4, -1.32, 0.3, 0.06, 0],
  [-0.9, -1.38, 0.12, 0.06, 0],
];

export function fitCover(tex: Texture) {
  const img = tex.image as { width: number; height: number } | undefined;
  if (!img) return;
  const a = img.width / img.height;
  tex.colorSpace = SRGBColorSpace;
  tex.wrapS = tex.wrapT = ClampToEdgeWrapping;
  if (a > SCREEN_ASPECT) {
    tex.repeat.set(SCREEN_ASPECT / a, 1);
    tex.offset.set((1 - SCREEN_ASPECT / a) / 2, 0);
  } else {
    tex.repeat.set(1, a / SCREEN_ASPECT);
    tex.offset.set(0, 1 - a / SCREEN_ASPECT); // keep the top of the page in view
  }
}

/** Soft studio: a grey room with a few coloured light panels, baked into an environment map. */
export function buildEnvironment(renderer: WebGLRenderer) {
  const env = new Scene();
  env.background = new Color("#7d838c");
  const geo = new PlaneGeometry(1, 1);
  const panel = (color: string, intensity: number, pos: [number, number, number], scale: [number, number], look: [number, number, number] = [0, 0, 0]) => {
    const m = new MeshBasicMaterial({ color: new Color(color).multiplyScalar(intensity), side: 2 });
    const mesh = new Mesh(geo, m);
    mesh.position.set(...pos);
    mesh.scale.set(scale[0], scale[1], 1);
    mesh.lookAt(...look);
    env.add(mesh);
  };
  panel("#ffffff", 5, [0, 4, 3], [8, 2]);
  panel(BUTTER, 3, [-5, 0, 1], [2, 8]);
  panel("#4fd1ff", 3, [5, 1, 0], [2, 6]);
  panel("#ff4fb8", 2.5, [0, -3, 2], [6, 1.5]);
  panel("#ffffff", 4, [2, 2, 5], [2, 2]);
  panel("#ffffff", 2, [0, 0, 6], [10, 3]);
  panel("#333333", 1.5, [0, 0, -6], [10, 10]);

  const pmrem = new PMREMGenerator(renderer);
  const target = pmrem.fromScene(env, 0.03);
  pmrem.dispose();
  env.traverse((o) => {
    if (o instanceof Mesh) (o.material as Material).dispose();
  });
  geo.dispose();
  return target;
}

export function buildGadgets(screenMat: MeshBasicMaterial) {
  const geos: BufferGeometry[] = [];
  const mats: Material[] = [];
  const keep = <T extends Material>(m: T) => (mats.push(m), m);

  const chrome = keep(
    new MeshPhysicalMaterial({ color: "#ffffff", metalness: 1, roughness: 0.12, clearcoat: 1, clearcoatRoughness: 0.1, iridescence: 1, iridescenceIOR: 1.7, iridescenceThicknessRange: [180, 820] })
  );
  const dark = keep(new MeshPhysicalMaterial({ color: "#2a2d33", metalness: 0.9, roughness: 0.25, clearcoat: 1 }));
  const gold = keep(new MeshPhysicalMaterial({ color: "#f2b632", metalness: 1, roughness: 0.2, clearcoat: 1 }));
  const plastic = keep(new MeshPhysicalMaterial({ color: "#c9ccd1", roughness: 0.35, clearcoat: 0.6 }));
  const yellow = keep(new MeshPhysicalMaterial({ color: BUTTER, roughness: 0.25, clearcoat: 1 }));
  const pcb = keep(new MeshStandardMaterial({ color: "#15171a", roughness: 0.6, metalness: 0.3 }));
  const bezel = keep(new MeshStandardMaterial({ color: "#0b0b0c", roughness: 0.4 }));
  // plain alpha rather than transmission: the canvas is transparent over the page, so there is
  // no frame behind the glass for transmission to sample
  const glass = keep(
    new MeshPhysicalMaterial({ color: "#ffffff", metalness: 0.2, roughness: 0.02, clearcoat: 1, iridescence: 1, iridescenceIOR: 1.6, envMapIntensity: 2.2, transparent: true, opacity: 0.24, depthWrite: false })
  );

  const add = (parent: Group, geo: BufferGeometry, mat: Material, x = 0, y = 0, z = 0) => {
    geos.push(geo);
    const mesh = new Mesh(geo, mat);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  };
  const rbox = (p: Group, w: number, h: number, d: number, r: number, m: Material, x = 0, y = 0, z = 0) => add(p, new RoundedBoxGeometry(w, h, d, 3, r), m, x, y, z);
  const box = (p: Group, w: number, h: number, d: number, m: Material, x = 0, y = 0, z = 0) => add(p, new BoxGeometry(w, h, d), m, x, y, z);
  /** cylinder with its flat face toward the viewer */
  const knob = (p: Group, r1: number, r2: number, depth: number, seg: number, m: Material, x = 0, y = 0, z = 0) => {
    const mesh = add(p, new CylinderGeometry(r1, r2, depth, seg), m, x, y, z);
    mesh.rotation.x = Math.PI / 2;
    return mesh;
  };
  const screen = (p: Group, width: number, x: number, y: number, z: number) => {
    const h = width / SCREEN_ASPECT;
    rbox(p, width + 0.2, h + 0.2, 0.06, 0.03, bezel, x, y, z - 0.035);
    add(p, new PlaneGeometry(width, h), screenMat, x, y, z);
  };

  // 0: clear-shell handheld: circuit board visible through glass, chrome rim, gold grips
  const handheld = new Group();
  rbox(handheld, 2.1, 2.95, 0.1, 0.04, pcb, 0, 0, -0.02);
  for (const [x, y, w, h, m] of PARTS) box(handheld, w, h, 0.07, m === 0 ? gold : m === 1 ? chrome : dark, x, y, 0.06);
  for (const x of [-0.25, 0.05, 0.35]) knob(handheld, 0.09, 0.09, 0.14, 16, chrome, x, -1.0, 0.09);
  rbox(handheld, 2.0, 1.52, 0.2, 0.08, chrome, 0, 0.68, 0.1);
  screen(handheld, 1.72, 0, 0.68, 0.215);
  knob(handheld, 0.36, 0.36, 0.1, 32, plastic, -0.6, -0.5, 0.16);
  rbox(handheld, 0.5, 0.16, 0.08, 0.03, plastic, -0.6, -0.5, 0.23);
  rbox(handheld, 0.16, 0.5, 0.08, 0.03, plastic, -0.6, -0.5, 0.23);
  for (const [x, y] of [[0, 0.2], [0.2, 0], [0, -0.2], [-0.2, 0]]) knob(handheld, 0.13, 0.13, 0.14, 24, plastic, 0.6 + x, -0.5 + y, 0.2);
  rbox(handheld, 2.36, 3.2, 0.5, 0.16, glass);
  for (const s of [-1, 1]) {
    rbox(handheld, 0.1, 3.24, 0.56, 0.04, chrome, s * 1.2, 0, 0);
    for (let i = 0; i < 4; i++) rbox(handheld, 0.14, 0.34, 0.5, 0.05, gold, s * 1.27, -1.25 + i * 0.42, 0);
  }
  rbox(handheld, 2.4, 0.1, 0.56, 0.04, chrome, 0, 1.6, 0);
  rbox(handheld, 2.4, 0.1, 0.56, 0.04, chrome, 0, -1.6, 0);

  // 1: landscape chrome frame with gold corner brackets
  const frame = new Group();
  rbox(frame, 3.1, 2.3, 0.34, 0.14, chrome);
  screen(frame, 2.6, 0, 0, 0.2);
  for (const [sx, sy] of [[-1, 1], [1, 1], [-1, -1], [1, -1]]) {
    rbox(frame, 0.5, 0.14, 0.5, 0.05, gold, sx * 1.34, sy * 1.1, 0.06);
    rbox(frame, 0.14, 0.5, 0.5, 0.05, gold, sx * 1.5, sy * 0.94, 0.06);
  }

  // 2: twin-stick controller with antennas
  const pad = new Group();
  rbox(pad, 3.7, 2.0, 0.5, 0.22, dark);
  rbox(pad, 3.76, 0.22, 0.56, 0.08, gold, 0, -0.95, 0);
  rbox(pad, 1.56, 1.2, 0.12, 0.05, chrome, 0, 0.08, 0.24);
  screen(pad, 1.36, 0, 0.08, 0.31);
  for (const s of [-1, 1]) {
    knob(pad, 0.3, 0.34, 0.12, 32, chrome, s * 1.28, 0.25, 0.3);
    knob(pad, 0.11, 0.14, 0.3, 20, plastic, s * 1.28, 0.25, 0.48);
    knob(pad, 0.15, 0.15, 0.16, 24, yellow, s * 1.28, -0.5, 0.3);
    const antenna = add(pad, new CylinderGeometry(0.045, 0.06, 1.6, 12), dark, s * 0.75, 1.75, -0.1);
    antenna.rotation.z = s * 0.14;
  }

  const variants = [handheld, frame, pad];
  const dispose = () => {
    geos.forEach((g) => g.dispose());
    mats.forEach((m) => m.dispose());
  };
  return { variants, dispose };
}

export default function GadgetScene({ className = "", scale = 0.7 }: { className?: string; scale?: number }) {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = wrap.current;
    if (!host) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch {
      return; // no WebGL: the hero simply has no gadget
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.domElement.style.cssText = "display:block;width:100%;height:100%";
    host.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(FOV, 1, 0.1, 50);
    camera.position.z = CAMERA_Z;
    const envTarget = buildEnvironment(renderer);
    scene.environment = envTarget.texture;
    scene.add(new AmbientLight("#ffffff", 0.4));
    const sun = new DirectionalLight("#ffffff", 1.2);
    sun.position.set(3, 4, 5);
    scene.add(sun);

    const screenMat = new MeshBasicMaterial({ color: "#0b0b0c", toneMapped: false });
    const { variants, dispose } = buildGadgets(screenMat);
    const group = new Group();
    variants.forEach((v, i) => {
      v.visible = i === 0;
      group.add(v);
    });
    scene.add(group);

    // screen textures: fetched one at a time, the first right away
    const loader = new TextureLoader();
    const textures: (Texture | undefined)[] = [];
    const apply = (t: Texture) => {
      screenMat.map = t;
      screenMat.color.set("#ffffff");
      screenMat.needsUpdate = true;
    };
    /** put screenshot i on the screen; with `prefetch`, only make sure it is downloaded */
    const show = (i: number, prefetch = false) => {
      const n = i % SCREENS.length;
      const cached = textures[n];
      if (cached) {
        if (!prefetch) apply(cached);
        return;
      }
      loader.load(SCREENS[n], (t) => {
        fitCover(t);
        textures[n] = t;
        if (index % SCREENS.length === n) apply(t);
      });
    };

    let index = 0;
    show(0);
    const pointer = { x: 0, y: 0 };
    const spin = { target: 0, value: 0 };
    let fit = 1;

    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      // shrink on narrow canvases so the wide gadgets still fit a phone screen
      fit = Math.min(1, (VIEW_H * camera.aspect) / (4.4 * scale));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let raf = 0;
    let last = performance.now();
    const start = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const delta = Math.min(0.05, (now - last) / 1000);
      last = now;
      const t = (now - start) / 1000;
      const k = 1 - Math.pow(0.002, delta); // frame-rate independent damping
      spin.value += (spin.target - spin.value) * (1 - Math.pow(0.0006, delta));
      const ty = (reduced ? -0.3 : -0.3 + pointer.x * 0.7 + Math.sin(t * 0.6) * 0.08) + spin.value;
      const tx = reduced ? 0.12 : 0.12 - pointer.y * 0.45 + Math.cos(t * 0.5) * 0.05;
      group.rotation.y += (ty - group.rotation.y) * k;
      group.rotation.x += (tx - group.rotation.x) * k;
      group.rotation.z = reduced ? 0.08 : 0.08 + Math.sin(t * 0.4) * 0.05;
      group.position.y = reduced ? 0 : Math.sin(t * 0.9) * 0.08;
      group.scale.setScalar(scale * fit);
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
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    io.observe(host);
    document.addEventListener("visibilitychange", sync);
    sync();

    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // every few seconds: one full turn, and swap gadget + screenshot while it is edge-on
    let swap = 0;
    const cycle = reduced
      ? 0
      : window.setInterval(() => {
          if (!raf) return;
          spin.target += Math.PI * 2;
          show(index + 1, true); // start fetching the next screenshot before the swap
          swap = window.setTimeout(() => {
            index += 1;
            variants.forEach((v, i) => (v.visible = i === index % variants.length));
            show(index);
          }, 260);
        }, 3200);

    return () => {
      window.clearInterval(cycle);
      window.clearTimeout(swap);
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("pointermove", onMove);
      textures.forEach((t) => t?.dispose());
      screenMat.dispose();
      dispose();
      envTarget.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [scale]);

  return <div ref={wrap} className={className} aria-hidden="true" />;
}
