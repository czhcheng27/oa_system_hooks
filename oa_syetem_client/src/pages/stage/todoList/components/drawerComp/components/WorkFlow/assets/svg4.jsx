import React, {
  useState,
  useReducer,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";

const SVG4 = (props) => {
  return (
    <span style={{ width: "40px", height: "33px", display: "inline-block" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 40 34"
      >
        <defs>
          <filter
            x="-31.5%"
            y="-42.6%"
            width="163%"
            height="185.3%"
            filterUnits="objectBoundingBox"
            id="l4s8a7mfo__8ebziq0ymc"
          >
            <feGaussianBlur stdDeviation="2.875" in="SourceGraphic" />
          </filter>
          <filter
            x="-31.7%"
            y="-250.5%"
            width="179.2%"
            height="726.3%"
            filterUnits="objectBoundingBox"
            id="l4s8a7mfo__lvwo1g1j7e"
          >
            <feOffset
              dx="1"
              dy="1"
              in="SourceAlpha"
              result="shadowOffsetOuter1"
            />
            <feGaussianBlur
              stdDeviation="1.5"
              in="shadowOffsetOuter1"
              result="shadowBlurOuter1"
            />
            <feColorMatrix
              values="0 0 0 0 0 0 0 0 0 0.321568627 0 0 0 0 0.850980392 0 0 0 0.364788776 0"
              in="shadowBlurOuter1"
            />
          </filter>
          <filter
            x="-31.7%"
            y="-250.5%"
            width="179.2%"
            height="726.3%"
            filterUnits="objectBoundingBox"
            id="l4s8a7mfo__ifhy0gc1og"
          >
            <feOffset
              dx="1"
              dy="1"
              in="SourceAlpha"
              result="shadowOffsetOuter1"
            />
            <feGaussianBlur
              stdDeviation="1.5"
              in="shadowOffsetOuter1"
              result="shadowBlurOuter1"
            />
            <feColorMatrix
              values="0 0 0 0 0 0 0 0 0 0.321568627 0 0 0 0 0.850980392 0 0 0 0.364788776 0"
              in="shadowBlurOuter1"
            />
          </filter>
          <filter
            x="-31.7%"
            y="-250.5%"
            width="179.2%"
            height="726.3%"
            filterUnits="objectBoundingBox"
            id="l4s8a7mfo__ynf76ugdri"
          >
            <feOffset
              dx="1"
              dy="1"
              in="SourceAlpha"
              result="shadowOffsetOuter1"
            />
            <feGaussianBlur
              stdDeviation="1.5"
              in="shadowOffsetOuter1"
              result="shadowBlurOuter1"
            />
            <feColorMatrix
              values="0 0 0 0 0 0 0 0 0 0.321568627 0 0 0 0 0.850980392 0 0 0 0.364788776 0"
              in="shadowBlurOuter1"
            />
          </filter>
          <filter
            x="-140.7%"
            y="-139.2%"
            width="451.9%"
            height="447.9%"
            filterUnits="objectBoundingBox"
            id="l4s8a7mfo__mzt8qet8bk"
          >
            <feOffset
              dx="1"
              dy="1"
              in="SourceAlpha"
              result="shadowOffsetOuter1"
            />
            <feGaussianBlur
              stdDeviation="1.5"
              in="shadowOffsetOuter1"
              result="shadowBlurOuter1"
            />
            <feColorMatrix
              values="0 0 0 0 0 0 0 0 0 0.321568627 0 0 0 0 0.850980392 0 0 0 0.364788776 0"
              in="shadowBlurOuter1"
            />
          </filter>
          <filter
            x="-140.7%"
            y="-139.2%"
            width="451.9%"
            height="447.9%"
            filterUnits="objectBoundingBox"
            id="l4s8a7mfo__1c8znpoz1m"
          >
            <feOffset
              dx="1"
              dy="1"
              in="SourceAlpha"
              result="shadowOffsetOuter1"
            />
            <feGaussianBlur
              stdDeviation="1.5"
              in="shadowOffsetOuter1"
              result="shadowBlurOuter1"
            />
            <feColorMatrix
              values="0 0 0 0 0 0 0 0 0 0.321568627 0 0 0 0 0.850980392 0 0 0 0.364788776 0"
              in="shadowBlurOuter1"
            />
          </filter>
          <filter
            x="-140.7%"
            y="-139.2%"
            width="451.9%"
            height="447.9%"
            filterUnits="objectBoundingBox"
            id="l4s8a7mfo__d5lorl4dmo"
          >
            <feOffset
              dx="1"
              dy="1"
              in="SourceAlpha"
              result="shadowOffsetOuter1"
            />
            <feGaussianBlur
              stdDeviation="1.5"
              in="shadowOffsetOuter1"
              result="shadowBlurOuter1"
            />
            <feColorMatrix
              values="0 0 0 0 0 0 0 0 0 0.321568627 0 0 0 0 0.850980392 0 0 0 0.364788776 0"
              in="shadowBlurOuter1"
            />
          </filter>
          <path
            d="M19.7457555,14.7614236 L30.7805603,14.7614236 C31.2214973,14.7614236 31.5789474,15.1188736 31.5789474,15.5598107 C31.5789474,16.0007477 31.2214973,16.3581978 30.7805603,16.3581978 L19.7457555,16.3581978 C19.3048185,16.3581978 18.9473684,16.0007477 18.9473684,15.5598107 C18.9473684,15.1188736 19.3048185,14.7614236 19.7457555,14.7614236 Z"
            id="l4s8a7mfo__tnlxenuljf"
          />
          <path
            d="M19.7457555,19.6097421 L30.7805603,19.6097421 C31.2214973,19.6097421 31.5789474,19.9671921 31.5789474,20.4081292 C31.5789474,20.8490662 31.2214973,21.2065162 30.7805603,21.2065162 L19.7457555,21.2065162 C19.3048185,21.2065162 18.9473684,20.8490662 18.9473684,20.4081292 C18.9473684,19.9671921 19.3048185,19.6097421 19.7457555,19.6097421 Z"
            id="l4s8a7mfo__j6hfo4xrwh"
          />
          <path
            d="M15.1052632,17.0453631 C15.8900889,17.0453631 16.5263158,16.401953 16.5263158,15.6082664 C16.5263158,14.8145797 15.8900889,14.1711696 15.1052632,14.1711696 C14.3204375,14.1711696 13.6842105,14.8145797 13.6842105,15.6082664 C13.6842105,16.401953 14.3204375,17.0453631 15.1052632,17.0453631 Z"
            id="l4s8a7mfo__1vcwrk72zl"
          />
          <path
            d="M15.1052632,21.8936816 C15.8900889,21.8936816 16.5263158,21.2502715 16.5263158,20.4565849 C16.5263158,19.6628982 15.8900889,19.0194881 15.1052632,19.0194881 C14.3204375,19.0194881 13.6842105,19.6628982 13.6842105,20.4565849 C13.6842105,21.2502715 14.3204375,21.8936816 15.1052632,21.8936816 Z"
            id="l4s8a7mfo__56mff0pgtn"
          />
          <path
            d="M15.1052632,26.7621254 C15.8900889,26.7621254 16.5263158,26.1187153 16.5263158,25.3250286 C16.5263158,24.531342 15.8900889,23.8879319 15.1052632,23.8879319 C14.3204375,23.8879319 13.6842105,24.531342 13.6842105,25.3250286 C13.6842105,26.1187153 14.3204375,26.7621254 15.1052632,26.7621254 Z"
            id="l4s8a7mfo__g4fx9av5sp"
          />
          <rect
            id="l4s8a7mfo__5tej2357fa"
            x="0"
            y="0"
            width="32.6315789"
            height="23.4193548"
            rx="1.25"
          />
          <rect
            id="l4s8a7mfo__5wav72g0ej"
            x="18.9473684"
            y="24.4781858"
            width="12.6315789"
            height="1.59677419"
            rx=".7983871"
          />
          <linearGradient
            x1="100%"
            y1="50%"
            x2="0%"
            y2="50%"
            id="l4s8a7mfo__wcwnuihhvb"
          >
            <stop stopColor="#0B82D9" offset="0%" />
            <stop stopColor="#0052D9" offset="100%" />
          </linearGradient>
        </defs>
        <g fill="none" fillRule="evenodd">
          <path
            d="M26.1184211,0 C26.808777,-1.96629406e-15 27.3684211,0.559644063 27.3684211,1.25 L27.368,9.58 L8.61842105,9.58064516 C7.97121236,9.58064516 7.43888715,10.0725198 7.37487466,10.7028399 L7.36842105,10.8306452 L7.368,20.225 L1.25,20.2258065 C0.559644063,20.2258065 3.06588824e-16,19.6661624 0,18.9758065 L0,1.25 C1.37500386e-16,0.559644063 0.559644063,1.26816328e-16 1.25,0 L26.1184211,0 Z"
            fill="#0052D9"
            transform="translate(0 .016905)"
          />
          <g transform="translate(7.368421 9.59755)">
            <mask id="l4s8a7mfo__1igbd3uhkd" fill="#fff">
              <use xlinkHref="#l4s8a7mfo__5tej2357fa" />
            </mask>
            <rect
              fill="url(#l4s8a7mfo__wcwnuihhvb)"
              filter="url(#l4s8a7mfo__8ebziq0ymc)"
              mask="url(#l4s8a7mfo__1igbd3uhkd)"
              x="-7.36842105"
              y="-9.58064516"
              width="27.3684211"
              height="20.2258065"
              rx="1.25"
            />
          </g>
          <path
            d="M37.6973684,9.89314516 C37.9562519,9.89314516 38.1906269,9.99807842 38.360281,10.1677326 C38.5299352,10.3373867 38.6348684,10.5717617 38.6348684,10.8306452 L38.6348684,10.8306452 L38.6348684,30.6854839 C38.6348684,30.9443673 38.5299352,31.1787423 38.360281,31.3483965 C38.1906269,31.5180506 37.9562519,31.6229839 37.6973684,31.6229839 L37.6973684,31.6229839 L8.61842105,31.6229839 C8.35953758,31.6229839 8.12516258,31.5180506 7.95550845,31.3483965 C7.78585431,31.1787423 7.68092105,30.9443673 7.68092105,30.6854839 L7.68092105,30.6854839 L7.68092105,10.8306452 C7.68092105,10.5717617 7.78585431,10.3373867 7.95550845,10.1677326 C8.12516258,9.99807842 8.35953758,9.89314516 8.61842105,9.89314516 L8.61842105,9.89314516 Z"
            stroke="#AACEFA"
            strokeWidth=".625"
            fillOpacity=".4"
            fill="#A9CDFB"
            transform="translate(0 .016905)"
          />
          <g transform="translate(0 .016905)">
            <use
              fill="#000"
              filter="url(#l4s8a7mfo__lvwo1g1j7e)"
              xlinkHref="#l4s8a7mfo__tnlxenuljf"
            />
            <use fill="#FFF" xlinkHref="#l4s8a7mfo__tnlxenuljf" />
          </g>
          <g transform="translate(0 .016905)">
            <use
              fill="#000"
              filter="url(#l4s8a7mfo__ifhy0gc1og)"
              xlinkHref="#l4s8a7mfo__j6hfo4xrwh"
            />
            <use fill="#FFF" xlinkHref="#l4s8a7mfo__j6hfo4xrwh" />
          </g>
          <g transform="translate(0 .016905)">
            <use
              fill="#000"
              filter="url(#l4s8a7mfo__ynf76ugdri)"
              xlinkHref="#l4s8a7mfo__5wav72g0ej"
            />
            <use fill="#FFF" xlinkHref="#l4s8a7mfo__5wav72g0ej" />
          </g>
          <g transform="translate(0 .016905)">
            <use
              fill="#000"
              filter="url(#l4s8a7mfo__mzt8qet8bk)"
              xlinkHref="#l4s8a7mfo__1vcwrk72zl"
            />
            <use fill="#FFF" xlinkHref="#l4s8a7mfo__1vcwrk72zl" />
          </g>
          <g transform="translate(0 .016905)">
            <use
              fill="#000"
              filter="url(#l4s8a7mfo__1c8znpoz1m)"
              xlinkHref="#l4s8a7mfo__56mff0pgtn"
            />
            <use fill="#FFF" xlinkHref="#l4s8a7mfo__56mff0pgtn" />
          </g>
          <g transform="translate(0 .016905)">
            <use
              fill="#000"
              filter="url(#l4s8a7mfo__d5lorl4dmo)"
              xlinkHref="#l4s8a7mfo__g4fx9av5sp"
            />
            <use fill="#FFF" xlinkHref="#l4s8a7mfo__g4fx9av5sp" />
          </g>
        </g>
      </svg>
    </span>
  );
};

SVG4.defaultProps = {};

export default SVG4;
