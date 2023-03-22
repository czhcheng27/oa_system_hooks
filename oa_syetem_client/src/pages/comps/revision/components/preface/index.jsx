import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  forwardRef,
} from "react";
import BasisStd from "./basisStd";
import FileRel from "./fileRel";
import ReplaceFile from "./replaceFile";
import InfoPanel from "./infoPanel";
import css from "./index.module.less";

const Preface = forwardRef(({ prefaceData }, ref) => {
  const {
    basisStd,
    fileRel = {},
    replaceFile = {},
    versionInfo = {},
  } = prefaceData;

  const basisStdRef = useRef();
  const fileRelRef = useRef();
  const replaceFileRef = useRef();
  const versionInfoRef = useRef();

  return (
    <div className={css.preface_wrapper}>
      <BasisStd ref={basisStdRef} basisStd={basisStd} />
      <FileRel ref={fileRelRef} fileRel={fileRel} />
      <ReplaceFile ref={replaceFileRef} replaceFile={replaceFile} />
      <InfoPanel />
    </div>
  );
});

export default Preface;
