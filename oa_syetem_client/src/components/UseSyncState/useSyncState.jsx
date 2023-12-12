import { useEffect, useRef, useState } from "react";

/**
 * 自定义 useState
 * @param state
 * @returns
 */
const useSyncState = (state) => {
  const cbRef = useRef();
  const [data, setData] = useState(state);

  useEffect(() => {
    cbRef.current && cbRef.current(data);
  }, [data]);

  return [
    data,
    (val, callback) => {
      setData(val);
      cbRef.current = callback;
    },
  ];
};

export default useSyncState;
