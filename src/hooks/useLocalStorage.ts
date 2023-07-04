import { useState, useEffect } from "react";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

export function useLocalStorage<T>(
  storageKey: string,
  initialValue: T | (() => T)
) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(storageKey);

    if (jsonValue != null) return JSON.parse(jsonValue);

    // else when not in local storage
    if (typeof initialValue === "function") {
      return (initialValue as () => T)();

      // b/cz 'return initialValue()' would tsc fail since initialValue can be T | (() => T)
    } else {
      // now else type of initialValue is T
      return initialValue;
    }
  });

  // set to local storage
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(storedValue));
  }, [storageKey, storedValue]);

  return [storedValue, setStoredValue] as [
    typeof storedValue,
    typeof setStoredValue
  ];
}
