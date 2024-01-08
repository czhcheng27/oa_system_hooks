/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Button } from "antd";
import css from "./index.module.less";
import { arrange } from "../../../utils/func";

const ElectronicSignature = () => {
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  let canvas, ctx;

  useEffect(() => {
    canvas = document.getElementById("signatureCanvas");
    ctx = canvas.getContext("2d");

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    return () => {
      isDrawing = false;
      lastX = 0;
      lastY = 0;
      canvas = null;
      ctx = null;
    };
  }, []);

  function startDrawing(e) {
    console.log("startDrawing", e);
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  }

  console.log(
    "aaaa",
    arrange("michael").wait(5).doSomething("commit").waitFirst(5).execute()
  );

  function draw(e) {
    if (!isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
  }

  function stopDrawing() {
    isDrawing = false;
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function saveCanvas() {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "signature.png";
    link.href = image;
    link.click();
  }

  return (
    <div>
      <canvas id="signatureCanvas" className={css.canvas}></canvas>
      <br />
      <Button onClick={clearCanvas}>Clear Signature</Button>
      <Button type="primary" onClick={saveCanvas}>
        Save Signature
      </Button>
    </div>
  );
};

export default ElectronicSignature;
