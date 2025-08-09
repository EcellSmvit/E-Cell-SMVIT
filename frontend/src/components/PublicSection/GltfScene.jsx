import React, { useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function EnvironmentLoader() {
  const { scene } = useThree();
  useEffect(() => {
    let disposed = false;
    import('three/examples/jsm/loaders/RGBELoader').then(({ RGBELoader }) => {
      const loader = new RGBELoader();
      loader.load(
        'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/studio_small_08_2k.hdr',
        (texture) => {
          if (disposed) {
            texture.dispose();
            return;
          }
          texture.mapping = THREE.EquirectangularReflectionMapping;
          scene.environment = texture;
        }
      );
    });

    return () => {
      disposed = true;
      if (scene.environment) {
        scene.environment.dispose?.();
        scene.environment = null;
      }
    };
  }, [scene]);

  return null;
}

const Model = () => {
  const group = useRef();
  const { scene } = useGLTF('/model.gltf');
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color('#9893fd'),
          metalness: 0.1,
          roughness: 0.01,
        });
        child.material.needsUpdate = true;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    if (group.current) {
      group.current.position.set(0, 1.5, 0);
      group.current.rotation.set(0, 0, 0);
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#page2',
          start: 'top top',
          end: '+=350%',
          scrub: 2,
        },
      });

      if (group.current) {
        tl.to(group.current.position, { x: 3, y: 1.5, z: 0, ease: 'power2.out' });
      }


      if (group.current) {
        tl.to(group.current.position, { x: 3, y: 1.5, z: 0, ease: 'power2.out' })
          .to(group.current.position, { x: 0, y: -2, z: 0, ease: 'power2.out' });
      }
    });
    return () => ctx.revert();
  }, [scene]);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.01;
    }
  });

  return <primitive ref={group} object={scene} scale={0.02} />;
};

useGLTF.preload('/model.gltf');
export default function GltfScene() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
      <ambientLight intensity={2} />
      <pointLight color={0x4E46E4} position={[-10, 10, 10]} intensity={1} distance={100} />
      <EnvironmentLoader />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
      />

      <Model />
    </Canvas>
  );
}
