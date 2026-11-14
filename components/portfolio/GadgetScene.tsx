"use client";

/**
 * A chrome / holographic gadget floating in the middle of the page. It turns toward the mouse,
 * spins into a different gadget every few seconds, and its screen shows real project screenshots.
 * No model or HDR downloads: the gadgets are simple geometry and the reflections come from
 * Lightformers baked into a small local environment.
 */

import * as THREE from "three";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
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
  const candy = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: "#ff8a00", metalness: 0.2, roughness: 0.08, clearcoat: 1, transmission: 0.35, thickness: 0.6, ior: 1.4 }),
    []
  );

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
    <group ref={group} scale={scale}>
      {/* 0: chrome handheld */}
      <group visible={variant === 0}>
        <RoundedBox args={[2.2, 3.05, 0.42]} radius={0.2} smoothness={6} material={chrome} />
        <Screen map={map} width={1.72} position={[0, 0.66, 0.24]} />
        <group position={[-0.55, -0.62, 0.22]}>
          <RoundedBox args={[0.5, 0.16, 0.08]} radius={0.03} material={darkChrome} />
          <RoundedBox args={[0.16, 0.5, 0.08]} radius={0.03} material={darkChrome} />
        </group>
        <mesh position={[0.42, -0.5, 0.23]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.13, 0.13, 0.08, 32]} />
          <meshPhysicalMaterial color={BUTTER} roughness={0.25} clearcoat={1} />
        </mesh>
        <mesh position={[0.74, -0.76, 0.23]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.13, 0.13, 0.08, 32]} />
          <meshPhysicalMaterial color="#111111" roughness={0.3} clearcoat={1} />
        </mesh>
        {[0, 1, 2].map((i) => (
          <RoundedBox key={i} args={[0.34, 0.04, 0.04]} radius={0.015} position={[0.55, -1.22 + i * 0.09, 0.21]} rotation={[0, 0, -0.5]} material={darkChrome} />
        ))}
        <mesh position={[-0.78, 1.82, -0.05]} rotation={[0, 0, 0.12]} material={chrome}>
          <cylinderGeometry args={[0.035, 0.035, 0.8, 16]} />
        </mesh>
        <mesh position={[-0.83, 2.22, -0.05]}>
          <sphereGeometry args={[0.08, 24, 24]} />
          <meshPhysicalMaterial color={BUTTER} roughness={0.2} clearcoat={1} />
        </mesh>
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

      {/* 2: candy pager */}
      <group visible={variant === 2}>
        <RoundedBox args={[3.0, 1.7, 0.6]} radius={0.3} smoothness={8} material={candy} />
        <Screen map={map} width={1.6} position={[-0.45, 0, 0.32]} />
        <mesh position={[0.95, 0.3, 0.32]} rotation={[Math.PI / 2, 0, 0]} material={chrome}>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
        </mesh>
        <mesh position={[0.95, -0.3, 0.32]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
          <meshPhysicalMaterial color="#111111" roughness={0.3} clearcoat={1} />
        </mesh>
        <mesh position={[1.1, 1.25, 0]} rotation={[0, 0, -0.2]} material={chrome}>
          <cylinderGeometry args={[0.035, 0.035, 0.9, 16]} />
        </mesh>
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
