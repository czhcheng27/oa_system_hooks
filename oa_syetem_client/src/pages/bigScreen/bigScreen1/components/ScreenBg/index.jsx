import React, { useEffect } from "react";
import * as THREE from "three";
import bgBand from "../../assets/bgBand.png";
import gridImg from "../../assets/gridImg.png";
import bgArrow from "../../assets/bgArrow.png";
import endImg from "../../assets/endImg.png";
import css from "./index.module.less";

let width, height, renderer, camera, scene, stats, controls, containerDom;
const group = new THREE.Group();
const groupArrow1 = new THREE.Group();
const groupArrow2 = new THREE.Group();
const groupFloor = new THREE.Group();
const groupEnd = new THREE.Group();

const ScreenBg = (props) => {
  useEffect(() => {
    containerDom = document.querySelector("#screenBg");
    width = containerDom?.clientWidth;
    height = containerDom?.clientHeight;
    initCamera();
    initScene();
    initBand();
    initArrow();
    addScene();
    animate();
    initRenderer();
  }, []);

  const initRenderer = () => {
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setClearAlpha(0);
    containerDom?.appendChild(renderer.domElement);
  };

  const initCamera = () => {
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(0, 1.2, 5);
    camera.lookAt(0, 1.18, 0);
  };

  const initScene = () => {
    scene = new THREE.Scene();
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.MeshPhongMaterial({ depthWrite: false });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  };

  const initBand = () => {
    const globeTextureLoader = new THREE.TextureLoader();
    globeTextureLoader.load(bgBand, (texture) => {
      const globeShape = new THREE.PlaneGeometry(1, 4);
      const globeMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
      });
      const globeMeshList = [];
      for (let i = 1; i <= 5; i++) {
        globeMeshList.push(new THREE.Mesh(globeShape, globeMaterial));
        globeMeshList[i - 1].position.set(
          Math.ceil((i - 1) / 2) * (2.7 * (i % 2 == 1 ? -1 : 1)),
          0,
          6 + Math.ceil((i - 1) / 2) * 2
        );
        globeMeshList[i - 1].rotation.set(-Math.PI / 2, 0, 0);
        group.add(globeMeshList[i - 1]);
      }
    });
    globeTextureLoader.load(gridImg, (texture) => {
      const globeShape = new THREE.PlaneGeometry(12, 30);
      const globeMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
      });
      const globeMesh = new THREE.Mesh(globeShape, globeMaterial);
      globeMesh.position.set(0, -0.01, -10);
      globeMesh.rotation.set(-Math.PI / 2, 0, 0);
      groupFloor.add(globeMesh);
    });
    globeTextureLoader.load(endImg, (texture) => {
      const globeShape = new THREE.PlaneGeometry(60, 1);
      const globeMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
      });
      const globeMesh = new THREE.Mesh(globeShape, globeMaterial);
      globeMesh.position.set(0, -2, -100);
      groupEnd.add(globeMesh);
    });
  };

  const initArrow = () => {
    const globeTextureLoader = new THREE.TextureLoader();
    globeTextureLoader.load(bgArrow, (texture) => {
      const globeShape = new THREE.PlaneGeometry(0.7, 1.4);
      const globeMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
      });
      const globeMeshList = [];
      for (let i = 1; i <= 10; i++) {
        globeMeshList.push(new THREE.Mesh(globeShape, globeMaterial));
      }
      for (let i = 1; i <= 5; i++) {
        globeMeshList[i - 1].position.set(
          getArrowPositionX(i),
          0,
          i == 2 || i == 3 ? 10 : 2
        );
        globeMeshList[i + 4].position.set(
          getArrowPositionX(i),
          0,
          i == 2 || i == 3 ? 10 : 2
        );
        globeMeshList[i - 1].rotation.set(-Math.PI / 2, 0, 0);
        globeMeshList[i + 4].rotation.set(-Math.PI / 2, 0, 0);
        groupArrow1.add(globeMeshList[i - 1]);
        groupArrow2.add(globeMeshList[i + 4]);
      }
      groupArrow2.position.set(0, 0, 16);
    });
  };

  const getArrowPositionX = (i) => {
    return Math.ceil((i - 1) / 2) * (2.7 * (i % 2 == 1 ? -1 : 1));
  };

  const addScene = () => {
    scene.add(group);
    scene.add(groupArrow1);
    scene.add(groupArrow2);
    scene.add(groupFloor);
    scene.add(groupEnd);
  };

  const animate = () => {
    window.requestAnimationFrame(() => {
      if (controls) controls.update();
      if (stats) stats.update();
      group.position.z = group.position.z < -25 ? 0 : group.position.z - 0.05;
      groupArrow1.position.z =
        groupArrow1.position.z < -30 ? 0 : groupArrow1.position.z - 0.12;
      groupArrow2.position.z =
        groupArrow2.position.z < -30 ? 0 : groupArrow2.position.z - 0.12;
      renders();
      animate();
    });
  };

  const renders = () => {
    console.log("renders", renders);
    renderer.clear();
    renderer.render(scene, camera);
  };
  return <div className={css.bgBox} id="screenBg"></div>;
};

export default ScreenBg;
