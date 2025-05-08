import React, { useRef, forwardRef } from 'react';
import BasisStd from './basisStd';
import FileRel from './fileRel';
import InfoPanel from './infoPanel';
import ReplaceFile from './replaceFile';
import VersionInfo from './versionInfo';
import css from './index.module.less';

// eslint-disable-next-line react/display-name
const Preface = forwardRef(({ prefaceData, standardType }, ref) => {
  const { basisStd, infoPanel, fileRel = {}, replaceFile = {}, versionInfo = {} } = prefaceData;
  const basisStdRef = useRef();
  const fileRelRef = useRef();
  const replaceFileRef = useRef();
  const versionInfoRef = useRef();

  return (
    <div className={css.preface_wrapper}>
      <BasisStd ref={basisStdRef} basisStd={basisStd} />
      <FileRel ref={fileRelRef} fileRel={fileRel} />
      <ReplaceFile ref={replaceFileRef} replaceFile={replaceFile} />
      <InfoPanel infoPanel={infoPanel} standardType={standardType} />
      <VersionInfo ref={versionInfoRef} versionInfo={versionInfo} />
    </div>
  );
});

export default Preface;
