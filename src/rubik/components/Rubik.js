import React from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Rubik = () => {
  let rotate = "";
  let count = 0;
  let coreToRotate = "";
  const arrayControlKeys = [
    "a",
    "s",
    "d",
    "w",
    "ArrowLeft",
    "ArrowUp",
    "ArrowRight",
    "ArrowDown",
  ];
  const arrayCoreToRotate = [
    "white",
    "yellow",
    "blue",
    "green",
    "red",
    "orange",
    "black",
  ];

  const conditionToDetectLayer = {
    white: { y: 1 },
    yellow: { y: -1 },
    blue: { z: -1 },
    green: { z: 1 },
    red: { x: 1 },
    orange: { x: -1 },
    black: { y: 0, x: 0 },
  };

  const objColorRubik = {
    green: 0x009b48,
    white: 0xffffff,
    red: 0xb71234,
    yellow: 0xffd500,
    blue: 0x0046ad,
    orange: 0xff5800,
  };

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

  const material = new THREE.MeshLambertMaterial({
    // color: 0x00ff00,
    wireframe: false,
  });

  const cube = new THREE.Mesh(geometry, material);

  const group = new THREE.Group();

  const chooseColor = (x, y, z) => {
    if (y == 1) {
      return objColorRubik.white;
    }
    if (y == -1) {
      return objColorRubik.yellow;
    }
    if (x == 1) {
      return objColorRubik.blue;
    }
    if (x == -1) {
      return objColorRubik.green;
    }
    if (z == 1) {
      return objColorRubik.red;
    }
    if (z == -1) {
      return objColorRubik.orange;
    }
  };

  let loader = new THREE.TextureLoader();

  let materialArray = [
    new THREE.MeshBasicMaterial({ map: loader.load("images/orange.png") }),
    new THREE.MeshBasicMaterial({ map: loader.load("images/red.png") }),
    new THREE.MeshBasicMaterial({ map: loader.load("images/white.png") }),
    new THREE.MeshBasicMaterial({ map: loader.load("images/yellow.png") }),
    new THREE.MeshBasicMaterial({ map: loader.load("images/blue.png") }),
    new THREE.MeshBasicMaterial({ map: loader.load("images/green.png") }),
  ];

  const renderLayer = (paramY) => {
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        // let color = chooseColor(j, paramY, i);
        let cube = new THREE.Mesh(geometry, materialArray);

        cube.position.z = i;
        cube.position.y = paramY;

        cube.position.x = j;

        group.add(cube);
      }
    }
  };

  renderLayer(-1);
  renderLayer(0);
  renderLayer(1);

  const getGroupLayer = () => {
    let resultArr = [];
    let resultGroup = new THREE.Group();

    group.children.forEach((cube) => {
      if (cube.position.y === 1) resultArr.push(cube);
    });
    resultArr.forEach((child) => {
      resultGroup.add(child);
    });

    return resultGroup;
  };

  const layerTop = getGroupLayer();
  // console.log(layerTop);
  // layerTop.children.map((cube) => cube.material.color.set(0xff0000));
  // console.log(group);

  scene.add(layerTop);
  scene.add(group);

  camera.position.z = 5;

  const origin = new THREE.Vector3(0, 0, 0);
  const length = 3;

  const vectorY = new THREE.Vector3(0, 1, 0);
  const vectorX = new THREE.Vector3(1, 0, 0);
  const arrowAssistY = new THREE.ArrowHelper(vectorY, origin, length, "red");
  const arrowAssistX = new THREE.ArrowHelper(vectorX, origin, length, "yellow");
  scene.add(arrowAssistX, arrowAssistY);

  const orbit = new OrbitControls(camera, renderer.domElement);
  orbit.update();

  function animate() {
    requestAnimationFrame(animate);

    if (rotate !== "" && count < 8) {
      doRotateOnRequest();
      count++;
    } else {
      count = 0;
      rotate = "";
    }

    orbit.update();
    renderer.render(scene, camera);
  }
  animate();

  document.addEventListener("keydown", keydownDetect);

  function keydownDetect(e) {
    if (count == 0) {
      if (e.key == arrayControlKeys[0]) rotate = "left";
      if (e.key == arrayControlKeys[1]) rotate = "down";
      if (e.key == arrayControlKeys[2]) rotate = "right";
      if (e.key == arrayControlKeys[3]) rotate = "up";
      if (e.key == arrayControlKeys[4]) rotate = "arleft";
      if (e.key == arrayControlKeys[5]) rotate = "arup";
      if (e.key == arrayControlKeys[6]) rotate = "arright";
      if (e.key == arrayControlKeys[7]) rotate = "ardown";
    }
  }

  function doRotateOnRequest() {
    const motionFrame = Math.PI / 16;

    if (rotate == "left") {
      group.rotateOnWorldAxis(vectorY, -motionFrame);
    }
    if (rotate == "right") {
      group.rotateOnWorldAxis(vectorY, motionFrame);
    }
    if (rotate == "up") {
      group.rotateOnWorldAxis(vectorX, -motionFrame);
    }
    if (rotate == "down") {
      group.rotateOnWorldAxis(vectorX, motionFrame);
    }

    if (rotate == "arleft") {
      layerTop.rotateOnWorldAxis(vectorY, -motionFrame);
    }
    if (rotate == "arright") {
      layerTop.rotateOnWorldAxis(vectorY, motionFrame);
    }
    if (rotate == "arup") {
      layerTop.rotateOnWorldAxis(vectorX, -motionFrame);
    }
    if (rotate == "ardown") {
      layerTop.rotateOnWorldAxis(vectorX, motionFrame);
    }
  }
  return <div></div>;
};

export default Rubik;
