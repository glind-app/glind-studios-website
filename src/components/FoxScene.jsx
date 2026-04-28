import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, OrbitControls } from '@react-three/drei'
import Fox from './Fox'

export default function FoxScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 5], fov: 45 }}
      gl={{ antialias: true }}
      style={{ background: '#ffffff', width: '100%', height: '100%' }}
    >
      <ambientLight intensity={2} color="#ffffff" />
      <directionalLight intensity={2} color="#FFF8F0" position={[-3, 8, 5]} />
      <directionalLight intensity={1} color="#EEF4FF" position={[5, 4, 2]} />

      <Suspense fallback={null}>
        <Fox />
      </Suspense>

      <ContactShadows
        position={[0, -1.22, 0]}
        opacity={0.15}
        scale={4}
        blur={3}
        color="#B09070"
      />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.06}
        target={[0, 0, 0]}
minPolarAngle={0.3}
        maxPolarAngle={1.3}
      />
    </Canvas>
  )
}
