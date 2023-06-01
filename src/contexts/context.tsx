import { createContext } from 'react';

interface contextType {
    isLogged: boolean;
    setIsLogged: any;
    isLoading: boolean;
    setIsLoading: any;
    setErrors: any;
    errors: any;
    data: any;
    setData: any;
}

const defaultValue: contextType = {
    isLogged: false,
    setIsLogged: false,
    isLoading: false,
    setIsLoading: false,
    setErrors: false,
    errors: false,
    data: false,
    setData: false
};

const Context = createContext(defaultValue);

export default Context;