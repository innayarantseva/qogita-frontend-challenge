import { useState, useEffect, Dispatch } from "react";

const getStorageValue = (key: string, defaultValue: unknown) => {
  const valueFromStorage = localStorage.getItem(key);
  const parsedValue = valueFromStorage && JSON.parse(valueFromStorage);
  return parsedValue || defaultValue;
};

export const useLocalStorage = <Value>(
  storageKey: string,
  defaultValue: Value
): [Value, Dispatch<Value>] => {
  const [value, setValue] = useState<Value>(defaultValue);

  useEffect(() => {
    setValue(getStorageValue(storageKey, defaultValue));
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [storageKey, value]);

  return [value, setValue];
};
