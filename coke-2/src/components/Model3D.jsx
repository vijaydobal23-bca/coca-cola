import { useEffect, useRef } from "react";
import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

function Model3D({fileName , val}) {

  const canvasRef = useRef(null);
  const { x, y, z, px, py, pz } = val;

  useEffect(() => {

    const scene = new THREE.Scene();

    // CAMERA
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.set(0, 0.6, 4);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.setClearColor(0x000000, 0);

    renderer.physicallyCorrectLights = true;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.6;

    // CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);

    controls.enableDamping = true;
    controls.enableZoom = false;
    
    

    // ---------- LIGHTING ----------

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.6);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = true;

    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;

    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 1.5);
    fillLight.position.set(-5, 5, 5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 2);
    rimLight.position.set(0, 5, -6);
    scene.add(rimLight);

    // ---------- SHADOW FLOOR ----------

    const shadowPlaneGeometry = new THREE.PlaneGeometry(10, 10);

    const shadowPlaneMaterial = new THREE.ShadowMaterial({
      opacity: 0.25
    });

    const shadowPlane = new THREE.Mesh(
      shadowPlaneGeometry,
      shadowPlaneMaterial
    );

    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.2;

    shadowPlane.receiveShadow = true;

    scene.add(shadowPlane);

    // ---------- MODEL ----------

    const loader = new GLTFLoader();

    let model;

    loader.load(
      `/${fileName}`,
      (gltf) => {

        model = gltf.scene;

        model.scale.set(x, y, z);
        model.position.set(px, py, pz);

        model.traverse((child) => {

          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }

        });

        scene.add(model);

      }
    );

    // ---------- RESPONSIVE CAMERA ----------

    function updateCamera() {

      if (window.innerWidth < 600) {

        camera.position.set(0, 0.8, 5);

      } else if (window.innerWidth < 1000) {

        camera.position.set(0, 0.7, 4.5);

      } else {

        camera.position.set(0, 0.6, 4);

      }

    }

    updateCamera();

    // ---------- ANIMATION ----------

    function animate() {

      if (model) {
        model.rotation.y += 0.01; // rotate can
      }

      controls.update();
      renderer.render(scene, camera);

    }

    renderer.setAnimationLoop(animate);

    // ---------- RESIZE ----------

    const handleResize = () => {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);

      updateCamera();

    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.setAnimationLoop(null);
      controls.dispose();
      renderer.dispose();
    };

  }, [fileName, px, py, pz, x, y, z]);

  return (
    <div className="w-full h-full">
      <canvas ref={canvasRef} />
    </div>
  );

}

export default Model3D;
