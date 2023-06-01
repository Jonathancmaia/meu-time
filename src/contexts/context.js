import { createContext } from 'react';
var defaultValue = {
    isLogged: false,
    setIsLogged: false,
    isLoading: false,
    setIsLoading: false,
    setErrors: false,
    errors: false,
    data: false,
    setData: false
};
var Context = createContext(defaultValue);
export default Context;
