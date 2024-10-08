import { useEffect, useState } from 'react';

export const useLocalStorageArray = (key: string, initialValue:any=[]) => {
  const [storedArray, setStoredArray] = useState<any>([]);

  useEffect(() => {
    // Only run this code on the client
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem(key);
      if (storedData) {
        setStoredArray(JSON.parse(storedData));
      } else {
        localStorage.setItem(key, JSON.stringify(initialValue));
        setStoredArray(initialValue);
      }
    }
  }, []);

  const addObject = (obj:any) => {
    const updatedArray = [...storedArray, obj];
    setStoredArray(updatedArray);
    localStorage.setItem(key, JSON.stringify(updatedArray));
  };

  const updateObject = (id:any, updatedObj:any) => {
    const updatedArray = storedArray.map((item:any) => item.id === id ? updatedObj : item);
    setStoredArray(updatedArray);
    localStorage.setItem(key, JSON.stringify(updatedArray));
  };

  const deleteObject = (id:any) => {
    const updatedArray = storedArray.filter((item:any) => item.id !== id);
    setStoredArray(updatedArray);
    localStorage.setItem(key, JSON.stringify(updatedArray));
  };

  const clearAll = (key:any)=>{
    localStorage.setItem(key,'')
  }

  return { storedArray, addObject, updateObject, deleteObject,clearAll };
};


