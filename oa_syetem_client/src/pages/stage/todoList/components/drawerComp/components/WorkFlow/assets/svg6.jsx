import React, {
  useState,
  useReducer,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";

const SVG6 = (props) => {
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
            id="n6gnqgg19__lm1xay7oca"
          >
            <stop stopColor="#0B82D9" offset="0%" />
            <stop stopColor="#0052D9" offset="100%" />
          </linearGradient>
          <linearGradient
            x1="50.0040971%"
            y1="92.0233787%"
            x2="100%"
            y2="28.197001%"
            id="n6gnqgg19__n3snqyyl8c"
          >
            <stop stopColor="#85CAFF" offset="0%" />
            <stop stopColor="#FFF" offset="100%" />
          </linearGradient>
          fillRule
          <linearGradient
            x1="26.2533848%"
            y1="39.5438663%"
            x2="79.4224666%"
            y2="65.7179769%"
            id="n6gnqgg19__kpmr07gwbd"
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
            id="n6gnqgg19__1urwnhvgve"
          >
            <feGaussianBlur stdDeviation="2.95934959" in="SourceGraphic" />
          </filter>
          <filter
            x="-23.5%"
            y="-22.8%"
            width="165.9%"
            height="163.8%"
            filterUnits="objectBoundingBox"
            id="n6gnqgg19__kolwu6i99g"
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
            id="n6gnqgg19__b7znm3l8eb"
          />
          <path
            d="M11.1949219,10.9605469 C11.1949219,11.2253906 10.9804688,11.4410156 10.7144531,11.4410156 L1.05820313,11.4410156 C0.793359375,11.4410156 0.577734375,11.2265625 0.577734375,10.9605469 C0.577734375,10.6957031 0.7921875,10.4800781 1.05820313,10.4800781 L10.7144531,10.4800781 C10.9804688,10.48125 11.1949219,10.6957031 11.1949219,10.9605469 Z M10.471875,7.36875 L8.25820313,7.36875 L7.61484375,5.87578125 C8.4046875,5.34609375 8.92382813,4.44492188 8.92382813,3.42304688 C8.92382813,1.79179688 7.60195313,0.469921875 5.97070313,0.469921875 C4.33945313,0.469921875 3.01757813,1.79179688 3.01757813,3.42304688 C3.01757813,4.44960938 3.54140625,5.353125 4.33476563,5.88164063 L3.69375,7.36875 L1.32070313,7.36875 C0.922265625,7.39570313 0.6046875,7.715625 0.57890625,8.1140625 L0.57890625,9.32695313 C0.605859375,9.73242188 0.93515625,10.0546875 1.34414063,10.0699219 L10.4683594,10.0699219 C10.8492188,10.0382813 11.1539063,9.740625 11.1960938,9.36328125 L11.1960938,8.04726563 C11.1421875,7.6828125 10.8421875,7.39804688 10.471875,7.36875 Z"
            id="n6gnqgg19__3uto4r652h"
          />
        </defs>
        <g fill="none" fillRule="evenodd">
          <g transform="translate(1 1)">
            <rect
              fill="url(#n6gnqgg19__lm1xay7oca)"
              x="9.6504065"
              y=".30769231"
              width="19.3495935"
              height="20.3076923"
              rx="2.73170732"
            />
            <mask id="n6gnqgg19__ig9adygmuf" fill="#fff">
              <use xlinkHref="#n6gnqgg19__b7znm3l8eb" />
            </mask>
            <use
              stroke="url(#n6gnqgg19__n3snqyyl8c)"
              fill="#EBF6FF"
              xlinkHref="#n6gnqgg19__b7znm3l8eb"
            />
            <rect
              fill="url(#n6gnqgg19__kpmr07gwbd)"
              filter="url(#n6gnqgg19__1urwnhvgve)"
              mask="url(#n6gnqgg19__ig9adygmuf)"
              x="7.28455285"
              y="1.61538462"
              width="22.0813008"
              height="17.5384615"
              rx=".68292683"
            />
          </g>
          <g transform="translate(8 9)">
            <use
              fill="#000"
              filter="url(#n6gnqgg19__kolwu6i99g)"
              xlinkHref="#n6gnqgg19__3uto4r652h"
            />
            <use fill="#FFF" xlinkHref="#n6gnqgg19__3uto4r652h" />
          </g>
        </g>
      </svg>
    </span>
  );
};

SVG6.defaultProps = {};

export default SVG6;
