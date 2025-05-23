import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "antd";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import { useResize } from "src/components/Resize";
import TitleTip from "src/components/TitleTip";
import ProjectItem from "../projectItem";
import TransferTableModal from "../transferTableModal";
import css from "./index.module.less";

const list = [
  {
    allCount: 0,
    okCount: 0,
    overdueCount: 0,
    doingCount: 0,
    projectId: "01678aa17e5dce5823f5df520a2ef495",
    projectName: "test031706",
    projectNo: "test031706",
    fbomCarSeries: null,
  },
  {
    allCount: 0,
    okCount: 0,
    overdueCount: 0,
    doingCount: 0,
    projectId: "0539a191ef6e2779380178557bc86d22",
    projectName: "ZL012",
    projectNo: "ZL012",
    fbomCarSeries: null,
  },
  {
    allCount: 0,
    okCount: 0,
    overdueCount: 0,
    doingCount: 0,
    projectId: "004fbbbfa1dfdeb4ab1bd355d1971195",
    projectName: "121212",
    projectNo: "121212",
    fbomCarSeries: null,
  },
];

const CarouselComp = (props) => {
  const transferTableRef = useRef();

  const [botRef, { w: botWidth }] = useResize();

  const [selectProject, setSelectProject] = useState({});
  const [lastSwiperSlideSty, setLastSwiperSlideSty] = useState({});
  const [show, setShow] = useState({
    row: 0,
    column: 0,
  });

  let count = -1;
  //计算一屏多少个，总共多少屏
  const calculate = () => {
    if (!botWidth) return;
    const boxW = 206 + 8,
      total = 18,
      column = Math.floor(botWidth / boxW),
      row = Math.ceil(total / column);
    console.log(`row, column`, row, column);
    setShow({ row, column });
    total % column && setLastSwiperSlideSty({ justifyContent: "flex-start" });
  };

  const clickProjectCard = (e, data, receiveStatus) => {
    e.stopPropagation();
    if (!receiveStatus && data.projectId == selectProject.projectId) {
      data.status = "";
      setSelectProject({});
    } else {
      if (receiveStatus) {
        if (data.status && data.projectId == selectProject.projectId) {
          data.status = data.status == receiveStatus ? "" : receiveStatus;
        } else {
          data.status = receiveStatus;
        }
      }
      setSelectProject({ ...data });
    }
  };

  const rightCornerClick = () => {
    transferTableRef.current.openHandle();
  };

  useEffect(() => {
    setTimeout(() => {
      calculate();
    }, 100);
  }, [botWidth]);

  return (
    <div className={css.projectData}>
      {/* title */}
      <div className={css.titleWrap}>
        <TitleTip>Project Data</TitleTip>
        {/* <div className={css.showProject}>
          <span className={css.text} onClick={() => rightCornerClick()}>
            Project Adjustment
          </span>
        </div> */}
        <Button
          type="primary"
          style={{ margin: "0" }}
          onClick={() => rightCornerClick()}
        >
          <span className={css.text}>Project Adjustment</span>
        </Button>
      </div>

      {/* carousel */}
      <div className={css.content}>
        <div ref={botRef} className={css.scrollArea}>
          <Swiper
            resizeObserver={false}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            autoplay={false}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {Array(show.row)
              .fill(0)
              .map((outItem, outIndex) => {
                return (
                  <SwiperSlide
                    key={outIndex}
                    style={outIndex == show.row - 1 ? lastSwiperSlideSty : {}}
                  >
                    {Array(show.column)
                      .fill(0)
                      .map((inItem, inIndex) => {
                        count++;
                        return count < 18 ? (
                          <div className={css.projectItemWrap} key={inIndex}>
                            <ProjectItem
                              data={list[count]}
                              selectProject={selectProject}
                              clickProjectCard={clickProjectCard}
                            ></ProjectItem>
                          </div>
                        ) : null;
                      })}
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </div>
      <TransferTableModal ref={transferTableRef} />
    </div>
  );
};

export default CarouselComp;
