import React, { useState } from 'react';
import Context from './context';

const ContextProvider = ({ children }) => {

  let token_init = false;
  let cache_init = [];

  //Validate token on storage. If return a error delete the token from storage
  if(localStorage.getItem('token')){
    token_init  = localStorage.getItem('token');
  }

  if(localStorage.getItem('data')){
    cache_init = JSON.parse(localStorage.getItem('data')).data;
  }

  const [isLogged, setIsLogged] = useState(token_init);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(cache_init);
  const [errors, setErrors] = useState(false);

  //Save and rescue data on browser, like a cache system. Data have 1h validty
  const cache = () => {

    if(cache_init === []){
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
