import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, Icosahedron, Torus } from "@react-three/drei";
import { useMemo, useRef, Suspense } from "react";
import * as THREE from "three";

function useMouse() {
  const { pointer } = useThree();
  return pointer;
}

function Core() {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const pointer = useMouse();

  useFrame((_, raw) => {
    const dt = Math.min(raw, 0.05);
    if (!group.current) return;
    group.current.rotation.y += dt * 0.18;
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      -pointer.y * 0.35,
      3,
      dt,
    );
    group.current.rotation.z = THREE.MathUtils.damp(
      group.current.rotation.z,
      pointer.x * 0.2,
      3,
      dt,
    );
    if (inner.current) {
      inner.current.rotation.y -= dt * 0.5;
      const s = 1 + Math.sin(performance.now() / 900) * 0.03;
      inner.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={group}>
      {/* faceted glass shell */}
      <Icosahedron args={[1.65, 1]}>
        <meshPhysicalMaterial
          color="#dfe7ea"
          roughness={0.08}
          metalness={0.1}
          transmission={0.92}
          thickness={1.6}
          ior={1.45}
          clearcoat={1}
          envMapIntensity={1.6}
        />
      </Icosahedron>

      {/* wireframe cage */}
      <Icosahedron args={[2.15, 1]}>
        <meshBasicMaterial color="#7fdce8" wireframe transparent opacity={0.22} />
      </Icosahedron>

      {/* glowing core */}
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.72, 0]} />
        <meshStandardMaterial
          color="#0b0b0b"
          emissive="#5fd3e6"
          emissiveIntensity={1.4}
          roughness={0.3}
          metalness={0.9}
        />
      </mesh>

      <Torus args={[2.7, 0.012, 8, 128]} rotation={[Math.PI / 2.2, 0.4, 0]}>
        <meshBasicMaterial color="#9aa4a8" transparent opacity={0.55} />
      </Torus>
      <Torus args={[3.1, 0.008, 8, 128]} rotation={[Math.PI / 1.7, -0.3, 0.6]}>
        <meshBasicMaterial color="#5fd3e6" transparent opacity={0.4} />
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
      camera={{ position: [0, 0, 7], fov: 45 }}
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
        <Core />
        <Dust />
      </Suspense>
    </Canvas>
  );
}
