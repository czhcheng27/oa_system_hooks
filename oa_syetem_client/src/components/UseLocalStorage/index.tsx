import React, { useEffect, useState } from "react";

interface useLocalStorageProps {
  key: string;
  initialValue: string;
}

const useLocalStorage: React.FC<useLocalStorageProps> = ({
  key,
  initialValue,
}) => {
  const [value, setValue] = useState(() => {
    try {
      const localValue = window.localStorage.getItem(key);
      return localValue ? JSON.parse(localValue) : initialValue;
    } catch (e) {
      console.log("err", e);
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};

export default useLocalStorage;
