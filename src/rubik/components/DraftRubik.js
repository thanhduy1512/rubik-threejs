import React from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";

const Rubik = () => {
  let rotate = "";
  let count = 0;

  // Setup scene, camera and renderer
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

  //Setup cube
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
  });

  const orbit = new OrbitControls(camera, renderer.domElement);
  const control = new TransformControls(camera, renderer.domElement);

  control.addEventListener("change", render);

  control.addEventListener("dragging-changed", function (event) {
    orbit.enabled = !event.value;
  });

  //   const obj3dLayer = new THREE.Object3D();

  const cube = new THREE.Mesh(geometry, material);

  scene.add(cube);

  control.attach(cube);
  scene.add(control);

  window.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
      case 69: // E
        control.setMode("rotate");
        break;
    }
  });

  //   obj3dLayer.add(cube);
  //   scene.add(obj3dLayer);

  camera.position.z = 5;
  //   obj3dLayer.rotation.x = 0.5;
  //   obj3dLayer.rotation.y = 0.4;

  const dirX = new THREE.Vector3(1, 0, 0);
  const dirY = new THREE.Vector3(0, 1, 0);
  const dirZ = new THREE.Vector3(0, 0, 1);

  //normalize the direction vector (convert to vector of length 1)

  const origin = new THREE.Vector3(0, 0, 0);
  const length = 1;

  //ADD ARROW XYZ
  //   const arrowHelperX = new THREE.ArrowHelper(dirX, origin, length, "red");
  //   const arrowHelperY = new THREE.ArrowHelper(dirY, origin, length, "blue");
  //   const arrowHelperZ = new THREE.ArrowHelper(dirZ, origin, length, "yellow");

  //   const arrowHelperXCube = new THREE.ArrowHelper(dirX, origin, 2, "red");
  //   const arrowHelperYCube = new THREE.ArrowHelper(dirY, origin, 2, "blue");
  //   const arrowHelperZCube = new THREE.ArrowHelper(dirZ, origin, 2, "yellow");
  //   obj3dLayer.add(arrowHelperX, arrowHelperY, arrowHelperZ);
  //   cube.add(arrowHelperXCube, arrowHelperYCube, arrowHelperZCube);

  orbit.update();

  function animate() {
    requestAnimationFrame(animate);

    // if (rotate !== "" && count < 8) {
    //   doRotateOnRequest();
    //   count += 1;
    // } else {
    //   count = 0;
    //   rotate = "";
    // }

    orbit.update();
    renderer.render(scene, camera);
  }
  animate();

  //   document.addEventListener("keydown", keydownDetect);

  //   function keydownDetect(e) {
  //     console.log(e.key);
  //     if (count === 0) {
  //       if (e.key === "a") {
  //         rotate = "left";
  //       }
  //       if (e.key === "s") rotate = "down";
  //       if (e.key === "d") {
  //         rotate = "right";
  //       }
  //       if (e.key === "w") rotate = "up";
  //     }
  //   }

  //   function doRotateOnRequest() {
  //     let motionFrame = Math.PI / 16;
  //     if (rotate === "left" || rotate === "up") {
  //       motionFrame = -motionFrame;
  //     }

  //     if (rotate === "left") {
  //       cube.rotation.y += motionFrame;
  //     }
  //     if (rotate === "right") {
  //       cube.rotation.y += motionFrame;
  //     }
  //     if (rotate === "up") {
  //       return (obj3dLayer.rotation.x += motionFrame);
  //     }
  //     if (rotate === "down") {
  //       return (obj3dLayer.rotation.x += motionFrame);
  //     }
  //   }

  function render() {
    renderer.render(scene, camera);
  }
  return <div></div>;
};

export default Rubik;
