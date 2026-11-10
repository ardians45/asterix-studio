"use client";

/**
 * Draggable 3D ID card on a lanyard (adapted from the React Bits "Lanyard" component).
 *
 * Differences from the original, to keep it light:
 * - No .glb model or texture downloads: the card, clip and strap are simple geometry and the
 *   card faces are drawn on a <canvas> at runtime (profile photo, name, role).
 * - The render loop only runs while `active` is true (the About card is on screen).
 * - Device pixel ratio is capped at 1.5.
 */

import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, extend, useFrame, useThree, type ThreeElement } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RapierRigidBody,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";

extend({ MeshLineGeometry, MeshLineMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: ThreeElement<typeof MeshLineGeometry>;
    meshLineMaterial: Partial<ThreeElement<typeof MeshLineMaterial>>;
  }
}

const ACCENT = "#e8702a";
const INK = "#18181b";
const PAPER = "#F5F4F0";

// Card size in world units (credit-card-ish portrait ratio)
const CARD_W = 1.6;
const CARD_H = 2.25;
const TEX_W = 1024;
const TEX_H = Math.round((TEX_W * CARD_H) / CARD_W); // 1440

type LerpedBody = RapierRigidBody & { lerped?: THREE.Vector3 };

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement | null>((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

async function drawFront(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")!;
  const [photo, logo] = await Promise.all([loadImage("/profile.webp"), loadImage("/logo-black.svg")]);
  try {
    await document.fonts.ready;
  } catch {}

  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, TEX_W, TEX_H);

  // Header band
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, TEX_W, 210);
  ctx.fillStyle = ACCENT;
  ctx.fillRect(0, 210, TEX_W, 14);
  // Slot for the clip
  ctx.fillStyle = PAPER;
  roundRect(ctx, TEX_W / 2 - 90, 48, 180, 34, 17);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = "600 34px Inter, Arial, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("ASTERIX STUDIO", 72, 160);
  ctx.textAlign = "right";
  ctx.fillStyle = ACCENT;
  ctx.fillText("PORTFOLIO", TEX_W - 72, 160);

  // Photo
  const px = 72, py = 290, pw = TEX_W - 144, ph = 640;
  ctx.save();
  roundRect(ctx, px, py, pw, ph, 36);
  ctx.clip();
  ctx.fillStyle = "#e7e5df";
  ctx.fillRect(px, py, pw, ph);
  if (photo) {
    const scale = Math.max(pw / photo.width, ph / photo.height);
    const w = photo.width * scale;
    const h = photo.height * scale;
    ctx.drawImage(photo, px + (pw - w) / 2, py + (ph - h) / 2.6, w, h);
  }
  ctx.restore();

  // Name + role
  ctx.textAlign = "left";
  ctx.fillStyle = INK;
  ctx.font = "700 92px 'Cinzel Decorative', Georgia, serif";
  ctx.fillText("Ardian", 72, 1050);
  ctx.fillText("Setiawan", 72, 1145);
  ctx.fillStyle = ACCENT;
  ctx.font = "600 36px Inter, Arial, sans-serif";
  ctx.fillText("UI/UX DESIGNER & WEB DEVELOPER", 72, 1215);

  // Footer line
  ctx.strokeStyle = "rgba(24,24,27,0.18)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(72, 1270);
  ctx.lineTo(TEX_W - 72, 1270);
  ctx.stroke();
  ctx.fillStyle = "rgba(24,24,27,0.65)";
  ctx.font = "500 30px Inter, Arial, sans-serif";
  ctx.fillText("Indonesia · Remote", 72, 1340);
  if (logo) ctx.drawImage(logo, TEX_W - 72 - 120, 1290, 120, 72);
}

function drawBack(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, TEX_W, TEX_H);
  ctx.fillStyle = ACCENT;
  ctx.fillRect(0, TEX_H - 120, TEX_W, 120);
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.font = "700 84px 'Cinzel Decorative', Georgia, serif";
  ctx.fillText("Asterix", TEX_W / 2, TEX_H / 2 - 20);
  ctx.fillText("Studio", TEX_W / 2, TEX_H / 2 + 80);
  ctx.font = "500 34px Inter, Arial, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.fillText("asterixstudio.site", TEX_W / 2, TEX_H / 2 + 170);
  ctx.fillStyle = INK;
  ctx.font = "600 30px Inter, Arial, sans-serif";
  ctx.fillText("DESIGN WITH PURPOSE · CODE WITH PRECISION", TEX_W / 2, TEX_H - 48);
}

function makeStrapTexture() {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 64;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = ACCENT;
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 26px Inter, Arial, sans-serif";
  ctx.textBaseline = "middle";
  ctx.fillText("ASTERIX STUDIO  •  ", 18, 33);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  return tex;
}

function useCardTextures() {
  const [front, back] = useMemo(() => {
    const f = document.createElement("canvas");
    const b = document.createElement("canvas");
    f.width = b.width = TEX_W;
    f.height = b.height = TEX_H;
    const ft = new THREE.CanvasTexture(f);
    const bt = new THREE.CanvasTexture(b);
    for (const t of [ft, bt]) {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
    }
    drawBack(b);
    bt.needsUpdate = true;
    return [ft, bt] as const;
  }, []);

  useEffect(() => {
    let cancelled = false;
    drawFront(front.image as HTMLCanvasElement).then(() => {
      if (!cancelled) front.needsUpdate = true;
    });
    return () => {
      cancelled = true;
    };
  }, [front]);

  useEffect(() => () => {
    front.dispose();
    back.dispose();
  }, [front, back]);

  return { front, back };
}

function Band({ maxSpeed = 50, minSpeed = 10 }: { maxSpeed?: number; minSpeed?: number }) {
  const band = useRef<THREE.Mesh<MeshLineGeometry, MeshLineMaterial>>(null);
  const fixed = useRef<LerpedBody>(null!);
  const j1 = useRef<LerpedBody>(null!);
  const j2 = useRef<LerpedBody>(null!);
  const j3 = useRef<LerpedBody>(null!);
  const card = useRef<RapierRigidBody>(null!);

  const vec = useMemo(() => new THREE.Vector3(), []);
  const ang = useMemo(() => new THREE.Vector3(), []);
  const rot = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);

  const segmentProps = {
    type: "dynamic" as const,
    canSleep: true,
    colliders: false as const,
    angularDamping: 4,
    linearDamping: 4,
  };

  const { front, back } = useCardTextures();
  const strap = useMemo(() => makeStrapTexture(), []);
  useEffect(() => () => strap.dispose(), [strap]);

  const [curve] = useState(() => {
    const c = new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
    ]);
    c.curveType = "chordal";
    return c;
  });
  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);
  const size = useThree((s) => s.size);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, CARD_H / 2 + 0.33, 0]]);

  useEffect(() => {
    if (!hovered) return;
    document.body.style.cursor = dragged ? "grabbing" : "grab";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }
    if (fixed.current && j1.current && j2.current && j3.current && card.current && band.current) {
      // A long frame (background tab, resuming after the loop was paused) gives a huge delta;
      // an unclamped lerp factor > 1 overshoots and eventually turns the strap into NaN.
      const dt = Math.min(delta, 1 / 30);
      [j1, j2].forEach((ref) => {
        const body = ref.current!;
        const t = body.translation();
        if (!body.lerped || !Number.isFinite(body.lerped.x)) body.lerped = new THREE.Vector3().copy(t);
        const clamped = Math.max(0.1, Math.min(1, body.lerped.distanceTo(t)));
        body.lerped.lerp(t, Math.min(1, dt * (minSpeed + clamped * (maxSpeed - minSpeed))));
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped!);
      curve.points[2].copy(j1.current.lerped!);
      curve.points[3].copy(fixed.current.translation());
      // Chordal splines divide by the gap between points: skip a frame where two coincide
      const ok = curve.points.every(
        (p, i) => Number.isFinite(p.x + p.y + p.z) && (i === 0 || p.distanceToSquared(curve.points[i - 1]) > 1e-8)
      );
      if (ok) band.current.geometry.setPoints(curve.getPoints(32));
      // Gently turn the card back to face the viewer
      ang.copy(card.current.angvel() as THREE.Vector3);
      rot.copy(card.current.rotation() as unknown as THREE.Vector3);
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true);
    }
  });

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[CARD_W / 2, CARD_H / 2, 0.01]} />
          <group
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              (e.target as Element).releasePointerCapture?.(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e) => {
              (e.target as Element).setPointerCapture?.(e.pointerId);
              if (card.current) {
                drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation() as THREE.Vector3)));
              }
            }}
          >
            {/* Card body */}
            <RoundedBox args={[CARD_W, CARD_H, 0.03]} radius={0.08} smoothness={4}>
              <meshPhysicalMaterial color="#ffffff" roughness={0.35} clearcoat={1} clearcoatRoughness={0.2} />
            </RoundedBox>
            {/* Printed faces */}
            <mesh position={[0, 0, 0.0155]}>
              <planeGeometry args={[CARD_W - 0.04, CARD_H - 0.04]} />
              <meshPhysicalMaterial map={front} roughness={0.4} clearcoat={1} clearcoatRoughness={0.15} />
            </mesh>
            <mesh position={[0, 0, -0.0155]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[CARD_W - 0.04, CARD_H - 0.04]} />
              <meshPhysicalMaterial map={back} roughness={0.4} clearcoat={1} clearcoatRoughness={0.15} />
            </mesh>
            {/* Metal clip */}
            <mesh position={[0, CARD_H / 2 + 0.12, 0]}>
              <boxGeometry args={[0.32, 0.26, 0.06]} />
              <meshStandardMaterial color="#c9c9cf" metalness={1} roughness={0.25} />
            </mesh>
            <mesh position={[0, CARD_H / 2 + 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.07, 0.02, 12, 24]} />
              <meshStandardMaterial color="#c9c9cf" metalness={1} roughness={0.25} />
            </mesh>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={new THREE.Vector2(size.width, size.height)}
          useMap={1}
          map={strap}
          repeat={new THREE.Vector2(-4, 1)}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}

export default function LanyardScene({ active }: { active: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 13], fov: 16 }}
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), 0)}
      aria-label="Interactive ID card of Ardian Setiawan. Drag to swing it."
    >
      <ambientLight intensity={Math.PI} />
      <Physics gravity={[0, -40, 0]} timeStep={1 / 60} paused={!active}>
        <Band />
      </Physics>
      <Environment blur={0.75} resolution={256}>
        <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
      </Environment>
    </Canvas>
  );
}
