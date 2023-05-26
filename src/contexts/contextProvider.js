import React, {useState} from 'react';
import Context from './context';

const ContextProvider = ({ children }) => {

  let init = false;

  //Validate token on storage. If return a error delete the token from storage
  if(localStorage.getItem('token')){
    init  = localStorage.getItem('token');
  }

  const [isLogged, setIsLogged] = useState(init);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(false);
  const [errors, setErrors] = useState(false);

  return (
    <Context.Provider value={{isLogged, setIsLogged, isLoading, setIsLoading, data, setData, errors, setErrors}}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
