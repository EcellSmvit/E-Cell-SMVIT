import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import ScrollButton from "./ScrollButton";
import { MorphoTextFlip } from "@/components/ui/morphotextflip";
import Background from "../PublicSection/Background";
import SocialMedia from "./SocialMedia";

// import { PulsatingButton } from "../magicui/pulsating-button";

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
    <>
      <div className="flex overflow-hidden relative flex-row justify-center items-center w-full h-screen">
        <div className="absolute inset-0 z-0">
          <Background />
        </div>
        
        <section className="flex z-10 flex-col justify-center items-start p-8 ml-8 w-1/2">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
          WHERE ASPIRATION MEETS OPPORTUNITY
          </h1>
          <MorphoTextFlip
            words={["EMPOWER", "INNOVATE", "LEAD", "SUCCEED"]}
            textClassName="text-4xl md:text-7xl text-white font-bold mt-1"
            animationType="fadeScale"
          />
        </section>
  
        <div className="z-10 w-1/2 h-full">
          <canvas
            ref={canvasRef}
            id="world"
            style={{
              background: "transparent",
              pointerEvents: "auto",
            }}
          />
        </div>
      </div>
      <div>
        
      </div >
      <div className="absolute bottom-1/4 left-1/2 z-10 text-white transform -translate-x-1/2">
        {/* <PulsatingButton onClick={() => window.location.href = "/recruitment"}>
          Recruitment
        </PulsatingButton> */}
      </div>
      
      
      <div className="block sm:hidden">
        <ScrollButton />
      </div>
      <div className="absolute bottom-8 left-1/2 z-10 transform -translate-x-1/2">
        <SocialMedia/>
      </div>
    </>
  );
};

export default ThreeScene;
