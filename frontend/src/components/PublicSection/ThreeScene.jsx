import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {RGBELoader} from 'three/addons/loaders/RGBELoader.js'
import ScrollButton from './ScrollButton';

const ThreeScene = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let renderer, scene, camera, controls, animationId, loadedModel = null;


    scene = new THREE.Scene();
    scene.background = null;

    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 8;

    renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = true;   
    controls.update()

    let light = new THREE.AmbientLight("white",0.1);
    scene.add(light)

    const light1 = new THREE.PointLight(0x4F46E5,1,100)
    light1.position.set(-10, 10, 10);
    scene.add(light1)

   new RGBELoader()
  .load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/studio_small_08_2k.hdr', (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
  });



    const loader = new GLTFLoader();
    loader.load(
      '/model.gltf', 
      function (gltf) {
        gltf.scene.scale.set(0.05, 0.05, 0.05);
        scene.add(gltf.scene);
        loadedModel = gltf.scene;

      }
    );


    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
      if (loadedModel) {
      loadedModel.rotation.y += 0.01;  
}
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      controls.dispose();
      renderer.dispose();
      if (loadedModel) scene.remove(loadedModel);
      while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
      }
    };
  }, []);

  return (
    <>
    <canvas
      ref={canvasRef}
      id="world"
      style={{
        width: '100vw',
        height: '100vh',
        display: 'block',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 0,
        pointerEvents: 'auto' 
      }}
    />
    <div>
      <ScrollButton/>
    </div>
    </>
  );
};

export default ThreeScene;
