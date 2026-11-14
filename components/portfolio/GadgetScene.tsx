"use client";

/**
 * A chrome / holographic gadget floating in the middle of the page. It turns toward the mouse,
 * spins into a different gadget every few seconds, and its screen shows real project screenshots.
 * No model or HDR downloads: the gadgets are simple geometry and the reflections come from
 * Lightformers baked into a small local environment.
 */

import * as THREE from "three";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox, useTexture } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";

const SCREENS = [
  "/portfolio/screens/paletindo.webp",
  "/portfolio/screens/bantu.webp",
  "/portfolio/screens/srlaundry.webp",
  "/portfolio/screens/greenify.webp",
  "/portfolio/screens/careerconnect.webp",
];

const BUTTER = "#FFD60A";
const SCREEN_ASPECT = 1.41;
const VARIANTS = 3;

type Pointer = { x: number; y: number };

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

function fitCover(tex: THREE.Texture) {
  const img = tex.image as { width: number; height: number } | undefined;
  if (!img) return;
  const a = img.width / img.height;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
  if (a > SCREEN_ASPECT) {
    tex.repeat.set(SCREEN_ASPECT / a, 1);
    tex.offset.set((1 - SCREEN_ASPECT / a) / 2, 0);
  } else {
    tex.repeat.set(1, a / SCREEN_ASPECT);
    tex.offset.set(0, 1 - a / SCREEN_ASPECT); // keep the top of the page in view
  }
  tex.needsUpdate = true;
}

function Screen({ map, width, position }: { map: THREE.Texture; width: number; position: [number, number, number] }) {
  const h = width / SCREEN_ASPECT;
  return (
    <group position={position}>
      <RoundedBox args={[width + 0.2, h + 0.2, 0.06]} radius={0.06} position={[0, 0, -0.035]}>
        <meshStandardMaterial color="#0b0b0c" roughness={0.4} />
      </RoundedBox>
      <mesh>
        <planeGeometry args={[width, h]} />
        <meshBasicMaterial map={map} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Device({
  pointer,
  reduced,
  fixedVariant,
  scale,
}: {
  pointer: React.RefObject<Pointer>;
  reduced: boolean;
  fixedVariant?: number;
  scale: number;
}) {
  const group = useRef<THREE.Group>(null);
  const spin = useRef({ target: 0, value: 0 });
  // shrink on narrow canvases so the wide gadgets still fit a phone screen
  const fit = useThree((s) => Math.min(1, s.viewport.width / (4.4 * scale)));
  const textures = useTexture(SCREENS);
  const [index, setIndex] = useState(0);

  useMemo(() => textures.forEach(fitCover), [textures]);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      spin.current.target += Math.PI * 2; // one full turn hides the swap
      window.setTimeout(() => setIndex((i) => i + 1), 260);
    }, 3200);
    return () => window.clearInterval(id);
  }, [reduced]);

  const chrome = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#ffffff",
        metalness: 1,
        roughness: 0.12,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        iridescence: 1,
        iridescenceIOR: 1.7,
        iridescenceThicknessRange: [180, 820],
      }),
    []
  );
  const darkChrome = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: "#2a2d33", metalness: 0.9, roughness: 0.25, clearcoat: 1 }),
    []
  );
  const gold = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: "#f2b632", metalness: 1, roughness: 0.2, clearcoat: 1 }),
    []
  );
  const glass = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#ffffff",
        // plain alpha instead of transmission: transmission samples the frame behind it, and this
        // canvas is transparent over the page, so there is nothing for it to sample
        metalness: 0.2,
        roughness: 0.02,
        clearcoat: 1,
        iridescence: 1,
        iridescenceIOR: 1.6,
        envMapIntensity: 2.2,
        transparent: true,
        opacity: 0.24,
        depthWrite: false,
      }),
    []
  );
  const pcb = useMemo(() => new THREE.MeshStandardMaterial({ color: "#15171a", roughness: 0.6, metalness: 0.3 }), []);
  const plastic = useMemo(() => new THREE.MeshPhysicalMaterial({ color: "#c9ccd1", roughness: 0.35, clearcoat: 0.6 }), []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const p = pointer.current ?? { x: 0, y: 0 };
    const k = 1 - Math.pow(0.002, delta); // frame-rate independent damping
    const s = spin.current;
    s.value += (s.target - s.value) * (1 - Math.pow(0.0006, delta));
    const ty = (reduced ? -0.3 : -0.3 + p.x * 0.7 + Math.sin(t * 0.6) * 0.08) + s.value;
    const tx = reduced ? 0.12 : 0.12 - p.y * 0.45 + Math.cos(t * 0.5) * 0.05;
    g.rotation.y += (ty - g.rotation.y) * k;
    g.rotation.x += (tx - g.rotation.x) * k;
    g.rotation.z = reduced ? 0.08 : 0.08 + Math.sin(t * 0.4) * 0.05;
    g.position.y = reduced ? 0 : Math.sin(t * 0.9) * 0.08;
  });

  const variant = fixedVariant ?? index % VARIANTS;
  const map = textures[index % SCREENS.length];

  return (
    <group ref={group} scale={scale * fit}>
      {/* 0: clear-shell handheld: circuit board visible through glass, chrome rim, gold grips */}
      <group visible={variant === 0}>
        {/* circuit board + parts inside */}
        <RoundedBox args={[2.1, 2.95, 0.1]} radius={0.04} position={[0, 0, -0.02]} material={pcb} />
        {PARTS.map(([x, y, w, h, m], i) => (
          <mesh key={i} position={[x, y, 0.06]} material={m === 0 ? gold : m === 1 ? chrome : darkChrome}>
            <boxGeometry args={[w, h, 0.07]} />
          </mesh>
        ))}
        {[-0.25, 0.05, 0.35].map((x, i) => (
          <mesh key={i} position={[x, -1.0, 0.09]} rotation={[Math.PI / 2, 0, 0]} material={chrome}>
            <cylinderGeometry args={[0.09, 0.09, 0.14, 20]} />
          </mesh>
        ))}
        {/* screen in a silver bezel */}
        <RoundedBox args={[2.0, 1.52, 0.2]} radius={0.08} position={[0, 0.68, 0.1]} material={chrome} />
        <Screen map={map} width={1.72} position={[0, 0.68, 0.215]} />
        {/* d-pad disc */}
        <group position={[-0.6, -0.5, 0.16]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} material={plastic}>
            <cylinderGeometry args={[0.36, 0.36, 0.1, 40]} />
          </mesh>
          <RoundedBox args={[0.5, 0.16, 0.08]} radius={0.03} position={[0, 0, 0.07]} material={plastic} />
          <RoundedBox args={[0.16, 0.5, 0.08]} radius={0.03} position={[0, 0, 0.07]} material={plastic} />
        </group>
        {/* four buttons in a diamond */}
        {[
          [0, 0.2],
          [0.2, 0],
          [0, -0.2],
          [-0.2, 0],
        ].map(([x, y], i) => (
          <mesh key={i} position={[0.6 + x, -0.5 + y, 0.2]} rotation={[Math.PI / 2, 0, 0]} material={plastic}>
            <cylinderGeometry args={[0.13, 0.13, 0.14, 28]} />
          </mesh>
        ))}
        {/* glass shell + chrome rim + gold grips */}
        <RoundedBox args={[2.36, 3.2, 0.5]} radius={0.16} smoothness={6} material={glass} />
        {[-1, 1].map((s) => (
          <group key={s}>
            <RoundedBox args={[0.1, 3.24, 0.56]} radius={0.04} position={[s * 1.2, 0, 0]} material={chrome} />
            {[0, 1, 2, 3].map((i) => (
              <RoundedBox key={i} args={[0.14, 0.34, 0.5]} radius={0.05} position={[s * 1.27, -1.25 + i * 0.42, 0]} material={gold} />
            ))}
          </group>
        ))}
        <RoundedBox args={[2.4, 0.1, 0.56]} radius={0.04} position={[0, 1.6, 0]} material={chrome} />
        <RoundedBox args={[2.4, 0.1, 0.56]} radius={0.04} position={[0, -1.6, 0]} material={chrome} />
      </group>

      {/* 1: landscape chrome frame with gold corner brackets */}
      <group visible={variant === 1}>
        <RoundedBox args={[3.1, 2.3, 0.34]} radius={0.14} smoothness={6} material={chrome} />
        <Screen map={map} width={2.6} position={[0, 0, 0.2]} />
        {[
          [-1, 1],
          [1, 1],
          [-1, -1],
          [1, -1],
        ].map(([sx, sy], i) => (
          <group key={i} position={[sx * 1.5, sy * 1.1, 0.06]}>
            <RoundedBox args={[0.5, 0.14, 0.5]} radius={0.05} position={[-sx * 0.16, 0, 0]} material={gold} />
            <RoundedBox args={[0.14, 0.5, 0.5]} radius={0.05} position={[0, -sy * 0.16, 0]} material={gold} />
          </group>
        ))}
      </group>

      {/* 2: twin-stick controller with antennas */}
      <group visible={variant === 2}>
        <RoundedBox args={[3.7, 2.0, 0.5]} radius={0.22} smoothness={6} material={darkChrome} />
        <RoundedBox args={[3.76, 0.22, 0.56]} radius={0.08} position={[0, -0.95, 0]} material={gold} />
        <RoundedBox args={[1.56, 1.2, 0.12]} radius={0.06} position={[0, 0.08, 0.24]} material={chrome} />
        <Screen map={map} width={1.36} position={[0, 0.08, 0.31]} />
        {[-1, 1].map((s) => (
          <group key={s}>
            {/* stick */}
            <mesh position={[s * 1.28, 0.25, 0.3]} rotation={[Math.PI / 2, 0, 0]} material={chrome}>
              <cylinderGeometry args={[0.3, 0.34, 0.12, 40]} />
            </mesh>
            <mesh position={[s * 1.28, 0.25, 0.48]} rotation={[Math.PI / 2, 0, 0]} material={plastic}>
              <cylinderGeometry args={[0.11, 0.14, 0.3, 24]} />
            </mesh>
            {/* yellow dial */}
            <mesh position={[s * 1.28, -0.5, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.15, 0.15, 0.16, 28]} />
              <meshPhysicalMaterial color={BUTTER} roughness={0.25} clearcoat={1} />
            </mesh>
            {/* antenna */}
            <mesh position={[s * 0.75, 1.75, -0.1]} rotation={[0, 0, s * 0.14]} material={darkChrome}>
              <cylinderGeometry args={[0.045, 0.06, 1.6, 16]} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

function Studio() {
  return (
    <Environment resolution={256} frames={1}>
      <color attach="background" args={["#7d838c"]} />
      <Lightformer form="rect" intensity={5} color="#ffffff" position={[0, 4, 3]} scale={[8, 2, 1]} rotation-x={Math.PI / 2} />
      <Lightformer form="rect" intensity={3} color={BUTTER} position={[-5, 0, 1]} scale={[2, 8, 1]} rotation-y={Math.PI / 2} />
      <Lightformer form="rect" intensity={3} color="#4fd1ff" position={[5, 1, 0]} scale={[2, 6, 1]} rotation-y={-Math.PI / 2} />
      <Lightformer form="rect" intensity={2.5} color="#ff4fb8" position={[0, -3, 2]} scale={[6, 1.5, 1]} rotation-x={-Math.PI / 2} />
      <Lightformer form="ring" intensity={4} color="#ffffff" position={[2, 2, 5]} scale={2} />
      <Lightformer form="rect" intensity={2} color="#ffffff" position={[0, 0, 6]} scale={[10, 3, 1]} />
      <Lightformer form="rect" intensity={1.5} color="#333333" position={[0, 0, -6]} scale={[10, 10, 1]} />
    </Environment>
  );
}

export default function GadgetScene({
  className = "",
  fixedVariant,
  scale = 0.7,
}: {
  className?: string;
  /** lock the gadget to one shape instead of cycling through them */
  fixedVariant?: number;
  scale?: number;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const pointer = useRef<Pointer>({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);
  const reduced = useReducedMotion() ?? false;

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (wrap.current) io.observe(wrap.current);
    return () => {
      window.removeEventListener("pointermove", onMove);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={wrap} className={className} aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        frameloop={visible ? "always" : "never"}
        camera={{ position: [0, 0, 8.6], fov: 35 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} />
        <Suspense fallback={null}>
          <Studio />
          <Device pointer={pointer} reduced={reduced} fixedVariant={fixedVariant} scale={scale} />
        </Suspense>
      </Canvas>
    </div>
  );
}
