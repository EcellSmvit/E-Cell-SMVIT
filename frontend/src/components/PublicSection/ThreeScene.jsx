import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { MorphoTextFlip } from "@/components/ui/morphotextflip";
import Background from "../PublicSection/Background";
import SocialMedia from "./SocialMedia";

const ThreeScene = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let renderer, scene, camera, controls, animationId, loadedModel = null;
    const canvas = canvasRef.current;
    const container = canvas.parentElement;

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
    renderer.setSize(clientWidth, clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = true;

    scene.add(new THREE.AmbientLight("white", 0.1));
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
    loader.load("/model.gltf", (gltf) => {
      const targetScale = 0.07;
      gltf.scene.scale.set(targetScale, targetScale, targetScale);
      scene.add(gltf.scene);
      loadedModel = gltf.scene;
    });

    const animate = () => {
      controls.update();
      if (loadedModel) loadedModel.rotation.y += 0.01;
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const { clientWidth, clientHeight } = container;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      controls.dispose();
      renderer.dispose();
      if (loadedModel) scene.remove(loadedModel);
      while (scene.children.length > 0) scene.remove(scene.children[0]);
    };
  }, []);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-between overflow-hidden text-center">
      <div className="absolute inset-0 z-0">
        <Background />
      </div>

      {/* Top 3D Logo */}
      <div className="z-10 w-full flex items-center justify-center pt-8">
        <div className="w-[70vw] md:w-[40vw] max-w-md aspect-square">
          <canvas
            ref={canvasRef}
            id="world"
            style={{
              background: "transparent",
              pointerEvents: "auto",
              width: "100%",
              height: "100%",
              display: "block",
            }}
          />
        </div>
      </div>

      {/* Center Text */}
      <div className="z-10 px-4 flex flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl md:text-5xl font-bold text-white">
          WHERE ASPIRATION MEETS OPPORTUNITY
        </h1>
        <MorphoTextFlip
          words={["EMPOWER", "INNOVATE", "LEAD", "SUCCEED"]}
          textClassName="text-2xl md:text-6xl text-white font-bold mt-2"
          animationType="fadeScale"
        />
      </div>

      {/* Bottom Social Media */}
      <div className="z-10 w-full flex justify-center pb-8">
        <SocialMedia />
      </div>
    </div>
  );
};

export default ThreeScene;
