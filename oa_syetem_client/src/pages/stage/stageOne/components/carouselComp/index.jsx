import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import TitleTip from "../../../../../components/TitleTip";
import css from "./index.module.less";
import ProjectItem from "../projectItem";

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
  const scrollAreaRef = useRef();

  const [lastSwiperSlideSty, setLastSwiperSlideSty] = useState({});
  const [show, setShow] = useState({
    row: 0,
    column: 0,
  });

  let count = -1;
  //计算一屏多少个，总共多少屏
  const calculate = () => {
    const boxW = 206 + 8,
      total = 18,
      column = Math.floor(scrollAreaRef.current.offsetWidth / boxW),
      row = Math.ceil(total / column);
    setShow({ row, column });
    total % column && setLastSwiperSlideSty({ justifyContent: "flex-start" });
  };

  useEffect(() => {
    calculate();
  }, []);

  return (
    <div className={css.projectData}>
      {/* title */}
      <div className={css.titleWrap}>
        <TitleTip>Project Data</TitleTip>
        <div className={css.showProject}>
          <span
            className={css.text}
            // onClick={() => {
            //   setAddProjectModalShow(true);
            // }}
          >
            Project Adjustment
          </span>
        </div>
      </div>

      {/* carousel */}
      <div className={css.content}>
        <div ref={scrollAreaRef} className={css.scrollArea}>
          <Swiper
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
                              // selectProject={selectProject}
                              // clickProjectCard={clickProjectCard}
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
    </div>
  );
};

export default CarouselComp;
