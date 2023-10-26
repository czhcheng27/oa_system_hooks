/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from "react";

export function useResize() {
  const [ref, setRef] = useState(null);
  const [size, setSize] = useState({
    w: 0,
    h: 0,
    e: null,
  });

  const handleSize = useCallback(() => {
    setSize({
      w: ref?.offsetWidth || 0,
      h: ref?.offsetHeight || 0,
      e: ref || null,
    });
  }, [ref?.offsetHeight, ref?.offsetWidth]);

  useEffect(() => {
    const myObserver = new ResizeObserver((entries) => {
      handleSize();
    });
    ref && myObserver.observe(ref);
    return () => {
      ref && myObserver.unobserve(ref);
    };
  }, [ref]);

  return [setRef, size, ref];
}
