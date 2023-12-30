import React, { useEffect, useState } from "react";
import css from "./index.module.less";

const SvgAnm = () => {
  useEffect(() => {
    const paths = document.querySelectorAll(".icon .p");
    paths.forEach((path) => {
      const len = path.getTotalLength();
      path.style.setProperty("--l", len + 1);
    });
  }, []);
  return (
    <div>
      <svg
        class="icon"
        width="200"
        height="112.53"
        viewBox="0 0 1820 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* <line class="p" x1="0" y1="50%" x2="100%" y2="50%" /> */}
        <circle class="p" cx="50%" cy="50%" r="30%" />
      </svg>
    </div>
  );
};

export default SvgAnm;
