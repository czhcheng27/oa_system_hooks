import React from "react";
import style from "./index.module.less";

export default function InfoArea({ data }) {
  return (
    <div className={style.InfoArea}>
      <div className={style.content}>
        <div className={style.left}>
          <p className={style.ecrNum}>
            <span className={style.icon}></span>
            <span className={style.text}>{data.ecrNum}</span>
          </p>
          <p className={style.ecrName}>{data.ecrName}</p>
        </div>
        <ul className={style.right}>
          <li className={style.projectNoBox}>
            <p className={style.name}>
              <svg className={`${style.icon} st-iconfont`}>
                <use xlinkHref="#st-icon-xiangmu_xiangmuguanli"></use>
              </svg>
              <span className={style.title}>Project No.</span>
            </p>
            <p className={style.text}>{data.projectNo}</p>
          </li>
          <li className={style.categoryBox}>
            <p className={style.name}>
              <svg className={`${style.icon} st-iconfont`}>
                <use xlinkHref="#st-icon-leibie"></use>
              </svg>
              <span className={style.title}>Category</span>
            </p>
            <p className={style.text}>{data.category}</p>
          </li>
          <li className={style.modifierBox}>
            <p className={style.name}>
              <svg className={`${style.icon} st-iconfont`}>
                <use xlinkHref="#st-icon-ERP_shenqingren"></use>
              </svg>
              <span className={style.title}>Apply</span>
            </p>
            <p className={style.text}>{data.creator}</p>
          </li>
          <li className={style.PMDBox}>
            <p className={style.name}>
              <svg className={`${style.icon} st-iconfont`}>
                <use xlinkHref="#st-icon-lianjie"></use>
              </svg>
              <span className={style.title}>PDM</span>
            </p>
            <p
              className={`${style.text} ${style.link}`}
              onClick={() => {
                data.urlstring && window.open(data.urlstring, "_black");
              }}
            >
              {data.urlstring}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
