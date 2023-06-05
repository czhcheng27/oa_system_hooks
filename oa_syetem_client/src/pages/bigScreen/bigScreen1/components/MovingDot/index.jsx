import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import * as THREE from "three";
import css from "./index.module.less";

import Img1 from "./sprites/snowflake1.png";
import Img2 from "./sprites/snowflake2.png";
import Img3 from "./sprites/snowflake3.png";
import Img4 from "./sprites/snowflake4.png";
import Img5 from "./sprites/snowflake5.png";

let width, height, camera, scene, renderer, stats, parameters, containerDom;

const materials = [];

const MovingDot = (props) => {
  useEffect(() => {
    containerDom = document.querySelector("#movingDot");
    width = containerDom?.clientWidth;
    height = containerDom?.clientHeight;
    initScene();
    initCamera();
    initRenderer();
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

  function createCanvasMaterial(color, size) {
    var matCanvas = document.createElement("canvas");
    matCanvas.width = matCanvas.height = size;
    var matContext = matCanvas.getContext("2d");
    // create exture object from canvas.
    var texture = new THREE.Texture(matCanvas);
    // Draw a circle
    var center = size / 2;
    matContext.beginPath();
    matContext.arc(center, center, size / 2, 0, 2 * Math.PI, false);
    matContext.closePath();
    matContext.fillStyle = color;
    matContext.fill();
    // need to set needsUpdate
    texture.needsUpdate = true;
    // return a texture made from the canvas
    return texture;
  }

  const initScene = () => {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0008);

    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    const textureLoader = new THREE.TextureLoader();

    const assignSRGB = (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
    };

    const sprite1 = textureLoader.load(Img1, assignSRGB);
    const sprite2 = textureLoader.load(Img2, assignSRGB);
    const sprite3 = textureLoader.load(Img3, assignSRGB);
    const sprite4 = textureLoader.load(Img4, assignSRGB);
    const sprite5 = textureLoader.load(Img5, assignSRGB);

    for (let i = 0; i < 1000; i++) {
      const x = Math.random() * 2000 - 1000;
      const y = Math.random() * 2000 - 1000;
      const z = Math.random() * 2000 - 1000;

      // const x = THREE.MathUtils.randFloatSpread(2000);
      // const y = THREE.MathUtils.randFloatSpread(2000);
      // const z = THREE.MathUtils.randFloatSpread(2000);

      vertices.push(x, y, z);
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );

    // parameters = [
    //   [[1.0, 0.2, 0.5], sprite2, 20],
    //   [[0.95, 0.1, 0.5], sprite3, 15],
    //   [[0.9, 0.05, 0.5], sprite1, 10],
    //   [[0.85, 0, 0.5], sprite5, 8],
    //   [[0.8, 0, 0.5], sprite4, 5],
    // ];

    parameters = [
      [[0, 10, 1], "white", 20],
      [[0, 0, 1], "white", 15],
      // [[0, 0, 1], "white", 10],
      [[10, 0, 1], "white", 8],
      [[0, 0, 11], "white", 5],
    ];

    for (let i = 0; i < parameters.length; i++) {
      const color = parameters[i][0];
      const sprite = parameters[i][1];
      const size = parameters[i][2];

      var hexColor = new THREE.Color(
        color[0],
        color[1],
        color[2]
      ).getHexString();

      materials[i] = new THREE.PointsMaterial({
        size: size,
        // color: sprite,
        // map: sprite,
        map: createCanvasMaterial("#" + hexColor, 256),
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
      });
      // materials[i].color.setHSL(
      //   color[0],
      //   color[1],
      //   color[2],
      //   THREE.SRGBColorSpace
      // );
      materials[i].color.setRGB(
        color[0],
        color[1],
        color[2],
        THREE.SRGBColorSpace
      );

      const particles = new THREE.Points(geometry, materials[i]);

      particles.rotation.x = Math.random() * 6;
      particles.rotation.y = Math.random() * 6;
      particles.rotation.z = Math.random() * 6;

      scene.add(particles);
    }
  };

  const initCamera = () => {
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(0, 0, 24);
    camera.lookAt(0, 0, 0);
  };

  const animate = () => {
    window.requestAnimationFrame(() => {
      if (stats) stats.update();
      render();
      animate();
    });
  };

  const render = () => {
    renderer.clear();
    const time = Date.now() * 0.00005;

    for (let i = 0; i < scene.children.length; i++) {
      const object = scene.children[i];

      if (object instanceof THREE.Points) {
        object.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));
      }
    }

    for (let i = 0; i < materials.length; i++) {
      const color = parameters[i][0];

      const h = ((360 * (color[0] + time)) % 360) / 360;
      materials[i].color.setHSL(h, color[1], color[2], THREE.SRGBColorSpace);
    }
    renderer.render(scene, camera);
  };

  return <div className={css.movingDot} id="movingDot"></div>;
};

export default MovingDot;
