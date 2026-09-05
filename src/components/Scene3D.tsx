import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, Environment, Lightformer, Text3D, Torus } from "@react-three/drei";
import { useMemo, useRef, Suspense } from "react";
import * as THREE from "three";

const FONT_URL = "/fonts/helvetiker_bold.typeface.json";

function useMouse() {
  const { pointer } = useThree();
  return pointer;
}

/** The bracket frame from the logo: left bar, bottom bar, right bar. */
function Bracket() {
  const w = 1.95; // half width
  const h = 1.15; // half height
  const t = 0.11; // bar thickness
  const d = 0.42; // depth

  const mat = (
    <meshStandardMaterial
      color="#0d1416"
      emissive="#5fd3e6"
      emissiveIntensity={1.15}
      metalness={0.85}
      roughness={0.25}
    />
  );

  return (
    <group>
      <mesh position={[-w, 0, 0]}>
        <boxGeometry args={[t, h * 2, d]} />
        {mat}
      </mesh>
      <mesh position={[w, 0, 0]}>
        <boxGeometry args={[t, h * 2, d]} />
        {mat}
      </mesh>
      <mesh position={[0, -h, 0]}>
        <boxGeometry args={[w * 2 + t, t, d]} />
        {mat}
      </mesh>
    </group>
  );
}

function BeMark() {
  const group = useRef<THREE.Group>(null);
  const pointer = useMouse();

  useFrame((_, raw) => {
    const dt = Math.min(raw, 0.05);
    const g = group.current;
    if (!g) return;
    const t = performance.now() / 1000;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointer.x * 0.55 + Math.sin(t * 0.35) * 0.16, 3, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -pointer.y * 0.32 + Math.sin(t * 0.27) * 0.06, 3, dt);
    g.position.y = Math.sin(t * 0.6) * 0.12;
  });

  return (
    <group ref={group} scale={0.92}>
      <Center position={[0, 0.16, 0]}>
        <Text3D
          font={FONT_URL}
          size={1.55}
          height={0.42}
          curveSegments={10}
          bevelEnabled
          bevelThickness={0.03}
          bevelSize={0.025}
          bevelSegments={4}
        >
          Be
          <meshPhysicalMaterial
            color="#dff2f6"
            metalness={0.9}
            roughness={0.16}
            clearcoat={1}
            envMapIntensity={1.7}
          />
        </Text3D>
      </Center>
      <Bracket />

      {/* faint orbiting rings for depth */}
      <Torus args={[3.1, 0.01, 8, 128]} rotation={[Math.PI / 2.2, 0.4, 0]}>
        <meshBasicMaterial color="#9aa4a8" transparent opacity={0.4} />
      </Torus>
      <Torus args={[3.5, 0.008, 8, 128]} rotation={[Math.PI / 1.7, -0.3, 0.6]}>
        <meshBasicMaterial color="#5fd3e6" transparent opacity={0.3} />
      </Torus>
    </group>
  );
}

function Dust({ count = 420 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 5;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(p) * Math.cos(t);
      arr[i * 3 + 1] = r * Math.sin(p) * Math.sin(t) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(p);
    }
    return arr;
  }, [count]);

  useFrame((_, raw) => {
    const dt = Math.min(raw, 0.05);
    if (ref.current) ref.current.rotation.y += dt * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.028} color="#ffffff" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

export function Scene3D() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 9], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={2.2} />
      <pointLight position={[-5, -3, -4]} intensity={12} color="#4fd0e6" />
      <Suspense fallback={null}>
        <Environment>
          <Lightformer intensity={3} position={[0, 5, 2]} scale={[12, 12, 1]} />
          <Lightformer
            intensity={2}
            color="#7fdce8"
            position={[-6, 1, -2]}
            rotation-y={Math.PI / 2}
            scale={[18, 2, 1]}
          />
          <Lightformer
            intensity={1.2}
            color="#ffffff"
            position={[6, -2, 1]}
            rotation-y={-Math.PI / 2}
            scale={[16, 3, 1]}
          />
        </Environment>
        <BeMark />
        <Dust />
      </Suspense>
    </Canvas>
  );
}
