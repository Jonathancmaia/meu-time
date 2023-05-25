import React, {useState} from 'react';
import Context from './context';

const ContextProvider = ({ children }) => {

  let init = false;

  //Validate token on storage. If return a error delete the token from storage
  if(localStorage.getItem('token')){
    init  = true;
  }

  const [isLogged, setIsLogged] = useState(init);
  const [isLoading, setIsLoading] = useState(init);

  return (
    <Context.Provider value={{isLogged, setIsLogged, isLoading, setIsLoading}}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
