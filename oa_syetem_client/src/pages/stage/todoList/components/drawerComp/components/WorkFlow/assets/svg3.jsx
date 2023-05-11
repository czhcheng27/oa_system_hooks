import React, {
  useState,
  useReducer,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";

const SVG3 = (props) => {
  return (
    <span style={{ width: "29px", height: "24px", display: "inline-block" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 30 26"
      >
        <defs>
          <linearGradient
            x1="95.3933826%"
            y1="0%"
            x2="37.0495985%"
            y2="50%"
            id="dilde0ok9__cuaggl51oa"
          >
            <stop stopColor="#0B82D9" offset="0%" />
            <stop stopColor="#0052D9" offset="100%" />
          </linearGradient>
          <linearGradient
            x1="50.0040971%"
            y1="92.0233787%"
            x2="100%"
            y2="28.197001%"
            id="dilde0ok9__uwq41n2n5c"
          >
            <stop stopColor="#85CAFF" offset="0%" />
            <stop stopColor="#FFF" offset="100%" />
          </linearGradient>
          <linearGradient
            x1="26.2533848%"
            y1="39.5438663%"
            x2="79.4224666%"
            y2="65.7179769%"
            id="dilde0ok9__i6t4fs5j8d"
          >
            <stop stopColor="#448DF5" offset="0%" />
            <stop stopColor="#0058E1" offset="100%" />
          </linearGradient>
          <filter
            x="-40.2%"
            y="-50.6%"
            width="180.4%"
            height="201.2%"
            filterUnits="objectBoundingBox"
            id="dilde0ok9__7edsnz07fe"
          >
            <feGaussianBlur stdDeviation="2.95934959" in="SourceGraphic" />
          </filter>
          <filter
            x="-32.5%"
            y="-23.7%"
            width="191%"
            height="166.4%"
            filterUnits="objectBoundingBox"
            id="dilde0ok9__1dla4dlkgg"
          >
            <feOffset
              dx="1"
              dy="1"
              in="SourceAlpha"
              result="shadowOffsetOuter1"
            />
            <feGaussianBlur
              stdDeviation="1"
              in="shadowOffsetOuter1"
              result="shadowBlurOuter1"
            />
            <feColorMatrix
              values="0 0 0 0 0 0 0 0 0 0.321568627 0 0 0 0 0.850980392 0 0 0 0.364788776 0"
              in="shadowBlurOuter1"
            />
          </filter>
          <path
            d="M2.91382114,24 L23.2650407,24 C24.8742996,24 26.1788618,22.6954378 26.1788618,21.0861789 L26.1788618,7.14911526 C26.1788618,5.53985628 24.8742996,4.23529412 23.2650407,4.23529412 L12.5576619,4.23529412 C11.7765194,4.23529412 11.0280868,3.9216532 10.4803199,3.36475559 L8.02699718,0.870538532 C7.47923027,0.313640914 6.73079764,-5.87582752e-16 5.94965517,0 L2.91382114,0 C1.30456216,7.39705288e-16 2.47011824e-16,1.30456216 0,2.91382114 L0,21.0861789 C-1.94688626e-15,22.6954378 1.30456216,24 2.91382114,24 Z"
            id="dilde0ok9__7uvaacromb"
          />
          <path
            d="M16.4992435,13.0506062 L14.8661391,13.0506062 L14.8661391,13.0506062 L14.8661391,9.69245801 C14.8661391,9.01763797 14.3190894,8.47058824 13.6442693,8.47058824 C12.9694493,8.47058824 12.4223996,9.01763797 12.4223996,9.69245801 L12.4223996,13.0506062 L12.4223996,13.0506062 L10.7892952,13.0506062 C10.2371591,13.0506062 9.78956428,13.498201 9.78956428,14.0503371 C9.78956428,14.2711142 9.8626456,14.4856818 9.99740509,14.66056 L13.1691353,18.7765344 C13.3713454,19.0389437 13.7479938,19.0877448 14.010403,18.8855347 C14.0512733,18.8540405 14.0879092,18.8174046 14.1194034,18.7765344 L17.2911336,14.66056 C17.6281504,14.2232112 17.5468152,13.5954638 17.1094664,13.258447 C16.9345881,13.1236875 16.7200206,13.0506062 16.4992435,13.0506062 Z"
            id="dilde0ok9__sm9bq44ioh"
          />
        </defs>
        <g fill="none" fillRule="evenodd">
          <g transform="translate(1 1)">
            <rect
              fill="url(#dilde0ok9__cuaggl51oa)"
              x="9.6504065"
              y=".30769231"
              width="19.3495935"
              height="20.3076923"
              rx="2.73170732"
            />
            <mask id="dilde0ok9__3a5ofw8g2f" fill="#fff">
              <use xlinkHref="#dilde0ok9__7uvaacromb" />
            </mask>
            <use
              stroke="url(#dilde0ok9__uwq41n2n5c)"
              fill="#EBF6FF"
              xlinkHref="#dilde0ok9__7uvaacromb"
            />
            <rect
              fill="url(#dilde0ok9__i6t4fs5j8d)"
              filter="url(#dilde0ok9__7edsnz07fe)"
              mask="url(#dilde0ok9__3a5ofw8g2f)"
              x="7.28455285"
              y="1.61538462"
              width="22.0813008"
              height="17.5384615"
              rx=".68292683"
            />
          </g>
          <g transform="matrix(1 0 0 -1 1 28.482812)">
            <use
              fill="#000"
              filter="url(#dilde0ok9__1dla4dlkgg)"
              xlinkHref="#dilde0ok9__sm9bq44ioh"
            />
            <use fill="#FFF" xlinkHref="#dilde0ok9__sm9bq44ioh" />
          </g>
        </g>
      </svg>
    </span>
  );
};

SVG3.defaultProps = {};

export default SVG3;
