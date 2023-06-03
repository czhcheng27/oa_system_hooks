import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { UndoOutlined } from "@ant-design/icons";
import classNames from "classnames";
import earchImg from "../../assets/earth.png";
import ringImg from "../../assets/ring.png";
import css from "./index.module.less";

let width, height, renderer, camera, scene, stats, controls, containerDom;
const radius = 5;
const group = new THREE.Group();
const groupHalo = new THREE.Group();

const Earth = (props) => {
  useEffect(() => {
    containerDom = document.querySelector("#earthBox");
    width = containerDom?.clientWidth;
    height = containerDom?.clientHeight;
    initScene();
    initCamera();
    initLight();
    initEarth();
    initRenderer();
    initControls();
    animate();
  }, []);

  const initRenderer = () => {
    renderer = new THREE.WebGLRenderer({ alpha: true });
    // 设置显示比例
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setClearAlpha(0);
    renderer.render(scene, camera);
    containerDom?.appendChild(renderer.domElement);
  };

  const initScene = () => {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);

    //创建一个长方体几何对象Geometry
    const geometry = new THREE.BufferGeometry();

    //创建一个材质对象Material
    const material = new THREE.MeshPhongMaterial({ depthWrite: false });

    // 两个参数分别为几何体geometry、材质material
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  };

  const initCamera = () => {
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(0, 0, 24);
    camera.lookAt(0, 0, 0);
  };

  const initLight = () => {
    // 环境光会均匀的照亮场景中的所有物体。环境光不能用来投射阴影，因为它没有方向。
    const ambientLight = new THREE.AmbientLight(0xcccccc, 1.1);
    scene.add(ambientLight);

    // 平行光是沿着特定方向发射的光。从它发出的光线都是平行的。常常用平行光来模拟太阳光的效果
    const directionalLight2 = new THREE.DirectionalLight(0xff2ffff, 0.2);
    directionalLight2.position.set(1, 0.1, 0.1).normalize();
    scene.add(directionalLight2);

    // 半球光, 光源直接放置于场景之上，光照颜色从天空光线颜色渐变到地面光线颜色。半球光不能投射阴影。
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.2);
    hemiLight.position.set(0, 1, 0);
    scene.add(hemiLight);

    let directionalLight;
    directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(100, 500, 20);
    scene.add(directionalLight);
  };

  const initControls = () => {
    // 设置相机控件轨道监控器 OrbitControls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // 阻尼惯性，要使得这一值生效，必须在动画循环里调用.update()
    // controls.addEventListener("change", function () {
    //   renderer.render(scene, camera);
    // });
  };

  const initEarth = () => {
    // 初始化一个加载器
    const globeTextureLoader = new THREE.TextureLoader();
    // 加载一个资源
    globeTextureLoader.load(ringImg, function (texture) {
      const geometry = new THREE.PlaneGeometry(26, 26); //平面缓冲几何体, 一个用于生成平面几何体的类。
      const material = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geometry, material);
      groupHalo.add(mesh);
    });
    groupHalo.position.set(0, -1.5, 0);
    groupHalo.rotation.set(1.8, 0, 0);
    scene.add(groupHalo);
    globeTextureLoader.load(earchImg, function (texture) {
      const globeGgeometry = new THREE.SphereGeometry(radius, 100, 100); // 球缓冲几何体, 一个用于生成球体的类。
      // 在实践中，该材质提供了比MeshLambertMaterial 或MeshPhongMaterial 更精确和逼真的结果，代价是计算成本更高
      const globeMaterial = new THREE.MeshStandardMaterial({ map: texture });
      const globeMesh = new THREE.Mesh(globeGgeometry, globeMaterial);
      group.rotation.set(0, 0, 0.1);
      group.add(globeMesh);
    });
    scene.add(group);
  };

  const animate = () => {
    window.requestAnimationFrame(() => {
      if (controls) controls.update();
      if (stats) stats.update();
      group.rotation.y = group.rotation.y + 0.001;
      groupHalo.rotation.z = groupHalo.rotation.z + 0.001;
      renders();
      animate();
    });
  };

  const renders = () => {
    renderer.clear();
    renderer.render(scene, camera);
  };

  const resizeEarch = () => {
    const ele = document.querySelector("#earthBox");
    width = ele?.clientWidth;
    height = ele?.clientHeight;
    renderer.setSize(width, height);
    camera.updateProjectionMatrix();
    initCamera();
    renders();
    initControls();
  };

  return (
    <div className={css.chartBox}>
      <div id="earthBox" className={css.earthBox}></div>
      <UndoOutlined className={css.refreshPosition} onClick={resizeEarch} />
    </div>
  );
};

export default Earth;
