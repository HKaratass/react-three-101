import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls, Stats, useGLTF } from '@react-three/drei';
import { MeshPhysicalMaterial } from 'three';
import { Suspense, useEffect, useRef, useState } from 'react';
// import * as THREE from 'three';
// useGLTF.preload(`${import.meta.env.BASE_URL}/models/${"scene2"}.gltf`)
function Model({ SCENE, SCROLL, AUTO }) {
  const m1 = useGLTF(`${import.meta.env.BASE_URL}/models/${"scene"}.gltf`);
  const m2 = useGLTF(`${import.meta.env.BASE_URL}/models/${"scene2"}.gltf`);
  const scene = SCENE ? m2.scene : m1.scene;

  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      // child.receiveShadow = true;
    }
    if (child.name.includes(SCENE ? 'Window' : 'Glass')) {
      child.material = new MeshPhysicalMaterial({
        // ...child.material,
        color: 'lightblue',
        transparent: true,
        opacity: .18,
        reflectivity: 10,
        envMapIntensity: 1
      });
    }
  });



  const modelRef = useRef();
  const [rotation, setRotation] = useState(0);
  useEffect(() => {
    const scroll = (event) => {
      setRotation((prevRotation) => prevRotation + event.deltaY * 0.001);
    };
    if (SCROLL)
      window.addEventListener('wheel', scroll);
    else
      window.removeEventListener('wheel', scroll);

    return () => {
      window.removeEventListener('wheel', scroll);
    };
  }, [SCROLL]);

  useFrame(() => {
    if (AUTO && modelRef.current) {
      modelRef.current.rotation.y += 0.01;
    }
    if (!AUTO && modelRef.current) {
      modelRef.current.rotation.y = rotation;
    }
  });

  return <primitive ref={modelRef} object={scene} scale={[8, 8, 8]} />;
}

function FixedCamera({ ANCHOR }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(-1.5, 1, 2)
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [ANCHOR]);

  return null;
}

function App() {
  const cam = [-1.5, 1, 2];
  const allFalse = {
    SCROLL: false,
    AUTO: false,
    ORBIT: false
  }
  const [config, setConfig] = useState({
    ORBIT: true,
    DARK: true,
    CAM: false,
    SCROLL: false,
    AUTO: false,
    M: false
  })



  return (
    <div style={{ backgroundColor: config.DARK ? "#343434" : "#efefef" }}>
      <button onClick={() => setConfig(prev => ({ ...prev, ...allFalse, SCROLL: true }))} style={{ position: "absolute", zIndex: "90", top: "22px", width: "70px", left: "80px" }}>SCROLL</button>
      <button onClick={() => setConfig(prev => ({ ...prev, ...allFalse, ORBIT: true }))} style={{ position: "absolute", zIndex: "90", top: "0px", width: "60px", left: "80px" }}>ORBIT</button >
      <button onClick={() => setConfig(prev => ({ ...prev, ...allFalse, AUTO: true }))} style={{ position: "absolute", zIndex: "90", top: "0px", width: "60px", left: "141px" }}>AUTO</button>
      <button onClick={() => setConfig(prev => ({ ...prev, CAM: !prev.CAM }))} style={{ position: "absolute", zIndex: "90", top: "10px", width: "50px", right: "10px" }}>CAM</button>
      <button onClick={() => setConfig(prev => ({ ...prev, DARK: !prev.DARK }))} style={{ position: "absolute", zIndex: "90", top: "10px", width: "60px", right: "70px" }}>{config.DARK ? "LIGHT" : "DARK"}</button>
      <button onClick={() => setConfig(prev => ({ ...prev, M: !prev.M }))} style={{ position: "absolute", zIndex: "90", top: "40px", width: "40px", right: "10px" }}>{config.M ? "M1" : "M2"}</button>
      <Canvas style={{
        width: "100dvw",
        height: "100dvh",
      }}
        shadows
        camera={{ position: cam, fov: 10 }}
      >
        <ambientLight color={"#f2f2f2"} intensity={3} />
        
        {/* Araba Gölge */}
        <pointLight position={[-1.4, 1, 0]}
          color={"#f2f2f2"}
          intensity={25}
          castShadow
          decay={4}
          distance={5}
          shadow-mapSize-width={1024 * 4}
          shadow-mapSize-height={1024 * 4}
        />

        {/* Araba altı aydınlatma */}
        <pointLight position={[0, -1, 0]}
          color={"#f2f2f2"}
          intensity={2}
          castShadow
          decay={10}
          distance={2}
        />

        <spotLight
          position={[-50, 75, 0]}
          color={"#f2f2f2"}
          castShadow
          angle={Math.PI / 3}
          penumbra={0.3} // gölge geçisi
          intensity={6000}
          target-position={[0, 0, 0]}
          shadow-mapSize-width={1024 * 4}
          shadow-mapSize-height={1024 * 4}
        />

        {config.ORBIT && <OrbitControls />} {/* //autoRotate */}
        <FixedCamera ANCHOR={config.CAM} />
        <Stats />

        <directionalLight
          position={cam}
          intensity={2}
        />
        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow >
          <circleGeometry args={[0.3, 32]} />
          <meshStandardMaterial color={config.DARK ? "#343434" : "#efefef"} />
        </mesh>

        <Suspense fallback={
          <Html>
            <div style={{ color: 'white', fontSize: '2em', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              Loading...
            </div>
          </Html>
        }>
          <Model SCENE={config.M} SCROLL={config.SCROLL} AUTO={config.AUTO} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default App