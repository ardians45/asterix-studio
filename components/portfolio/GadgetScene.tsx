"use client";

/**
 * A chrome / holographic retro handheld floating in the hero. It turns toward the mouse and its
 * screen cycles through real project screenshots. No model or HDR downloads: the device is simple
 * geometry and the reflections come from Lightformers baked into a small local environment.
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
const SCREEN_W = 1.72;
const SCREEN_H = 1.22;

type Pointer = { x: number; y: number };

function fitCover(tex: THREE.Texture) {
  const img = tex.image as { width: number; height: number } | undefined;
  if (!img) return;
  const s = SCREEN_W / SCREEN_H;
  const a = img.width / img.height;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
  if (a > s) {
    tex.repeat.set(s / a, 1);
    tex.offset.set((1 - s / a) / 2, 0);
  } else {
    tex.repeat.set(1, a / s);
    tex.offset.set(0, 1 - a / s); // keep the top of the page in view
  }
  tex.needsUpdate = true;
}

function Device({ pointer, reduced }: { pointer: React.RefObject<Pointer>; reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const compact = useThree((s) => s.size.width < 640);
  const textures = useTexture(SCREENS);
  const [index, setIndex] = useState(0);

  useMemo(() => textures.forEach(fitCover), [textures]);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % SCREENS.length), 2800);
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

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const p = pointer.current ?? { x: 0, y: 0 };
    const k = 1 - Math.pow(0.002, delta); // frame-rate independent damping
    const ty = reduced ? -0.35 : -0.35 + p.x * 0.7 + Math.sin(t * 0.6) * 0.08;
    const tx = reduced ? 0.12 : 0.12 - p.y * 0.45 + Math.cos(t * 0.5) * 0.05;
    g.rotation.y += (ty - g.rotation.y) * k;
    g.rotation.x += (tx - g.rotation.x) * k;
    g.rotation.z = reduced ? 0.08 : 0.08 + Math.sin(t * 0.4) * 0.04;
    g.position.y = (reduced ? 0 : Math.sin(t * 0.9) * 0.08) - 0.15;
  });

  return (
    <group ref={group} scale={compact ? 1.3 : 0.92} position-x={compact ? 0 : 1.7}>
      {/* body */}
      <RoundedBox args={[2.2, 3.05, 0.42]} radius={0.2} smoothness={6} material={chrome} />
      {/* screen bezel + screen */}
      <RoundedBox args={[1.92, 1.42, 0.06]} radius={0.06} position={[0, 0.66, 0.2]}>
        <meshStandardMaterial color="#0b0b0c" roughness={0.4} />
      </RoundedBox>
      <mesh position={[0, 0.66, 0.235]}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
        <meshBasicMaterial map={textures[index]} toneMapped={false} />
      </mesh>
      {/* d-pad */}
      <group position={[-0.55, -0.62, 0.22]}>
        <RoundedBox args={[0.5, 0.16, 0.08]} radius={0.03} material={darkChrome} />
        <RoundedBox args={[0.16, 0.5, 0.08]} radius={0.03} material={darkChrome} />
      </group>
      {/* A / B */}
      <mesh position={[0.42, -0.5, 0.23]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.08, 32]} />
        <meshPhysicalMaterial color={BUTTER} roughness={0.25} clearcoat={1} />
      </mesh>
      <mesh position={[0.74, -0.76, 0.23]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.08, 32]} />
        <meshPhysicalMaterial color="#111111" roughness={0.3} clearcoat={1} />
      </mesh>
      {/* speaker grille */}
      {[0, 1, 2].map((i) => (
        <RoundedBox key={i} args={[0.34, 0.04, 0.04]} radius={0.015} position={[0.55, -1.22 + i * 0.09, 0.21]} rotation={[0, 0, -0.5]} material={darkChrome} />
      ))}
      {/* start / select */}
      <RoundedBox args={[0.22, 0.06, 0.05]} radius={0.025} position={[-0.18, -1.2, 0.21]} material={darkChrome} />
      <RoundedBox args={[0.22, 0.06, 0.05]} radius={0.025} position={[0.12, -1.2, 0.21]} material={darkChrome} />
      {/* antenna */}
      <mesh position={[-0.78, 1.82, -0.05]} rotation={[0, 0, 0.12]} material={chrome}>
        <cylinderGeometry args={[0.035, 0.035, 0.8, 16]} />
      </mesh>
      <mesh position={[-0.83, 2.22, -0.05]}>
        <sphereGeometry args={[0.08, 24, 24]} />
        <meshPhysicalMaterial color={BUTTER} roughness={0.2} clearcoat={1} />
      </mesh>
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

export default function GadgetScene({ className = "" }: { className?: string }) {
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
          <Device pointer={pointer} reduced={reduced} />
        </Suspense>
      </Canvas>
    </div>
  );
}
