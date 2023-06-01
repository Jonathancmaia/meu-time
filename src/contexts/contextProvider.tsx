import React, { useState } from 'react';
import Context from './context';

const ContextProvider = ({ children }) => {

  let cache_init:any = [];

  if(localStorage.getItem('data')){
    cache_init = JSON.parse(localStorage.getItem('data')).data;
  }

  //Check if existis a token saved in cache
  const [isLogged, setIsLogged] = useState(()=>{
    if(localStorage.getItem('token')){
      return true;
    } else {
      return false;
    }
  }) as [boolean, React.Dispatch<React.SetStateAction<boolean>>];

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(cache_init);
  const [errors, setErrors] = useState<any>(false);

  //Save and rescue data on browser, like a cache system. Data have 1h validty
  const cache = () => {

    if(cache_init.length <= 0){
      localStorage.setItem('data', JSON.stringify({'data': data, 'validity': new Date().getTime()}));
    } else if (new Date().getTime() - cache_init.validity >= 60 * 60 * 1000){
      localStorage.removeItem('data');
    } else if (JSON.stringify(Object.keys(cache_init).sort()) !== JSON.stringify(Object.keys(data).sort())){
      localStorage.removeItem('data');
      localStorage.setItem('data', JSON.stringify({'data': data, 'validity': new Date().getTime()}));
    }
  };

  cache();

  return (
    <Context.Provider value={{isLogged, setIsLogged, isLoading, setIsLoading, data, setData, errors, setErrors}}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
