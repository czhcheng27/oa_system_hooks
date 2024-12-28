import React, { useState, useEffect, forwardRef, useContext } from "react";
import { Segmented } from "antd";
import { FlipBookContext } from "../..";
import { LIGHT_HOUSE } from "../../bookConfig";
import css from "./index.module.less";

const PageA = ({ initData }, ref) => {
  const { pageNum, chapterNo, pageVisible } = initData;
  const { getChapterPageParam, updateChapterPageParam } =
    useContext(FlipBookContext);

  const [listSegType, setListSegType] = useState(
    getChapterPageParam(chapterNo, LIGHT_HOUSE, "segVal")
  );

  useEffect(() => {
    if (pageVisible) {
      console.log(`call page"${pageNum}" api, and render page${pageNum}`);
    }
  }, [pageVisible]);

  const segmentChange = (value) => {
    setListSegType(value);
    updateChapterPageParam(chapterNo, LIGHT_HOUSE, "segVal", value);
  };

  return (
    <div ref={ref} className={css.moduleBox}>
      {pageVisible ? (
        <>
          chapter{chapterNo} PageA
          <div className={css.segment}>
            <Segmented
              options={[
                {
                  label: `optionA`,
                  value: "all",
                },
                {
                  label: `optionB`,
                  value: "0",
                },
                {
                  label: `optionC`,
                  value: "1",
                },
              ]}
              value={listSegType}
              onChange={(val) => segmentChange(val)}
              onMouseDownCapture={(e) => e.stopPropagation()}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default forwardRef(PageA);
