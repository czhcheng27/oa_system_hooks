import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { Form, Input } from "antd";
import IntroContent from "./introContent";
import css from "./index.module.less";

const { Item } = Form;

// eslint-disable-next-line react/display-name
const Introduction = forwardRef(({ introData }, ref) => {
  const { contentData, standardNameData } = introData || {};
  const introContentRef = useRef();
  const nameRef = useRef();

  useImperativeHandle(ref, () => ({
    getIntroData: async () => {
      const contentData = await introContentRef.current.getContentData();
      // const standardNameData = await nameRef.current.getNameData();
      console.log("contentData", contentData);
      return { contentData, standardNameData };
    },
  }));

  return (
    <div className={css.introduction_wrapper}>
      <IntroContent ref={introContentRef} contentData={contentData} />
    </div>
  );
});

export default Introduction;
