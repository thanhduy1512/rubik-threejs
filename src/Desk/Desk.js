import React from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

const Desk = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // const light = new THREE.AmbientLight(0xffffff, 0.8);
  // scene.add(light);

  const directionalLight = new THREE.AmbientLight(0xffffff, 0.8);
  directionalLight.position.set(50, 50, 0);
  scene.add(directionalLight);

  const fbxLoader = new FBXLoader();
  fbxLoader.load(
    "models/PC5.fbx",
    (object) => {
      // object.traverse(function (child) {
      //     if ((child as THREE.Mesh).isMesh) {
      //         // (child as THREE.Mesh).material = material
      //         if ((child as THREE.Mesh).material) {
      //             ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).transparent = false
      //         }
      //     }
      // })
      // object.scale.set(.01, .01, .01)

      let newMaterial = new THREE.MeshLambertMaterial({
        color: 0x000000,
      });
      object.children[1].material[1] = newMaterial;
      scene.add(object);
      console.log(object.children[1].material[1]);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    (error) => {
      console.log(error);
    }
  );

  // const controls = new DragControls(object, camera, renderer.domElement);
  // controls.addEventListener("dragstart", function (event) {
  //   event.object.material.emissive.set(0xaaaaaa);
  // });

  // controls.addEventListener("dragend", function (event) {
  //   event.object.material.emissive.set(0x000000);
  // });

  camera.position.z = 500;
  camera.position.y = 500;

  const orbit = new OrbitControls(camera, renderer.domElement);
  orbit.update();

  function animate() {
    requestAnimationFrame(animate);

    orbit.update();

    renderer.render(scene, camera);
  }
  animate();
  return <div>Desk</div>;
};

export default Desk;
