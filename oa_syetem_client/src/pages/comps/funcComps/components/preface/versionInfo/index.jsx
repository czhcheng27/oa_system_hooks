import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataHasBeenUpdated, updateOutlineAllData } from "@/redux/actions";
import { cloneDeep } from "@/utils";
import FirstLunch from "./firstLunch";
import VersionRevise from "./versionRevise";
import css from "./index.module.less";

// eslint-disable-next-line react/display-name
const VersionInfo = forwardRef(({ versionInfo }, ref) => {
  const { isRevisedVersion, valueData } = versionInfo;
  const vrRef = useRef();

  const dispatch = useDispatch();

  const outlineAllData = useSelector((s) => s.rdcTestOutlineAllData);

  const [firstLunchStch, setFirstLunchStch] = useState(true);

  useImperativeHandle(ref, () => ({
    getVersionInfo: async () => {
      const vrData = await vrRef.current.getVersionRevise();
      return { isRevisedVersion: !firstLunchStch, valueData: vrData };
    },
  }));

  useEffect(() => {
    setFirstLunchStch(!isRevisedVersion);
  }, [versionInfo]);

  const switchFunction = async (data) => {
    dispatch(dataHasBeenUpdated(true));
    setFirstLunchStch(data);
    const vrData = await vrRef.current.getVersionRevise();
    const cbData = {
      isRevisedVersion: !data,
      valueData: vrData,
    };
    const _temp = cloneDeep(outlineAllData[1]);
    const a = { ..._temp, data: { ..._temp.data, versionInfo: cbData } };
    outlineAllData[1] = a;
    dispatch(updateOutlineAllData(outlineAllData));
  };

  return (
    <div>
      <FirstLunch
        firstLunchStch={firstLunchStch}
        setFirstLunchStch={setFirstLunchStch}
        switchFunction={switchFunction}
      />
      <VersionRevise
        ref={vrRef}
        vrData={valueData}
        firstLunchStch={firstLunchStch}
        setFirstLunchStch={setFirstLunchStch}
        switchFunction={switchFunction}
      />
    </div>
  );
});

export default VersionInfo;
