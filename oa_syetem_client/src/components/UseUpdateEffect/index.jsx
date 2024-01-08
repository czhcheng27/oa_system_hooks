import * as React from "react";

export default function useUpdateEffect(effect, deps) {
  const didMountRef = React.useRef(false);
  React.useEffect(() => {
    if (didMountRef.current) {
      effect();
    } else {
      didMountRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
