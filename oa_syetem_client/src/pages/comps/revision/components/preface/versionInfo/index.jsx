import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import FirstLunch from "./firstLunch";
import VersionRevise from "./versionRevise";
import css from "./index.module.less";

// eslint-disable-next-line react/display-name
const VersionInfo = forwardRef(({ versionInfo }, ref) => {
  const { isFirstLunch, valueData } = versionInfo;
  const vrRef = useRef();
  const [firstLunchStch, setFirstLunchStch] = useState(true);

  useImperativeHandle(ref, () => ({
    getVersionInfo: async () => {
      const vrData = await vrRef.current.getVersionRevise();
      return { isFirstLunch: firstLunchStch, valueData: vrData };
    },
  }));

  useEffect(() => {
    setFirstLunchStch(isFirstLunch);
  }, [versionInfo]);

  return (
    <div>
      <FirstLunch
        firstLunchStch={firstLunchStch}
        setFirstLunchStch={setFirstLunchStch}
      />
      <VersionRevise
        ref={vrRef}
        vrData={valueData}
        firstLunchStch={firstLunchStch}
        setFirstLunchStch={setFirstLunchStch}
      />
    </div>
  );
});

export default VersionInfo;
