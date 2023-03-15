import React, { useRef, forwardRef, useImperativeHandle } from "react";
import IntroContent from "./introContent";
import css from "./index.module.less";
import SeparateName from "./separateName";

// eslint-disable-next-line react/display-name
const Introduction = forwardRef(({ introData }, ref) => {
  const { contentData, standardNameData } = introData || {};
  const introContentRef = useRef();
  const nameRef = useRef();

  useImperativeHandle(ref, () => ({
    getIntroData: async () => {
      const contentData = await introContentRef.current.getContentData();
      const standardNameData = await nameRef.current.getNameData();
      return { contentData, standardNameData };
    },
  }));

  return (
    <div className={css.introduction_wrapper}>
      <IntroContent ref={introContentRef} contentData={contentData} />

      <SeparateName ref={nameRef} standardNameData={standardNameData} />
    </div>
  );
});

export default Introduction;
