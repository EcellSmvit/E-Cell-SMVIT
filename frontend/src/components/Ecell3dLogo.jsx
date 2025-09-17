import React, { useRef, useEffect } from 'react';
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

function Ecell3dLogo() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let renderer, scene, camera, controls, animationId;
    let loadedModel = null;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = canvas.parentElement;
    if (!container) return;

    scene = new THREE.Scene();
    scene.background = null;

    const { clientWidth, clientHeight } = container;
    camera = new THREE.PerspectiveCamera(75, clientWidth / clientHeight, 0.1, 1000);
    camera.position.z = 8;

    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(clientWidth, clientHeight, false);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = true;

    scene.add(new THREE.AmbientLight(0xffffff, 0.1));
    const light1 = new THREE.PointLight(0x4f46e5, 1, 100);
    light1.position.set(-10, 10, 10);
    scene.add(light1);

    new RGBELoader().load(
      "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_08_1k.hdr",
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
      }
    );

    const loader = new GLTFLoader();
    loader.load(
      "/model.gltf",
      (gltf) => {
        const targetScale = 0.07;
        gltf.scene.scale.set(targetScale, targetScale, targetScale);
        scene.add(gltf.scene);
        loadedModel = gltf.scene;
      },
      undefined,
      (error) => {
        // Optionally handle model loading errors
        // console.error('Error loading GLTF model:', error);
      }
    );

    const animate = () => {
      controls.update();
      if (loadedModel) loadedModel.rotation.y += 0.01;
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const { clientWidth, clientHeight } = container;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight, false);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationId) cancelAnimationFrame(animationId);
      if (controls) controls.dispose();
      if (renderer) renderer.dispose();
      if (loadedModel) scene.remove(loadedModel);
      while (scene.children.length > 0) scene.remove(scene.children[0]);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="world"
      style={{
        background: "transparent",
        pointerEvents: "auto",
        width: "100%",
        height: "100%",
        display: "block"
      }}
    />
  );
}

export default Ecell3dLogo;