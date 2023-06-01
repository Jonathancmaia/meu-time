import React, { useState } from 'react';
import Context from './context';
var ContextProvider = function (_a) {
    var children = _a.children;
    var cache_init = [];
    if (localStorage.getItem('data')) {
        cache_init = JSON.parse(localStorage.getItem('data')).data;
    }
    //Check if existis a token saved in cache
    var _b = useState(function () {
        if (localStorage.getItem('token')) {
            return true;
        }
        else {
            return false;
        }
    }), isLogged = _b[0], setIsLogged = _b[1];
    var _c = useState(false), isLoading = _c[0], setIsLoading = _c[1];
    var _d = useState(cache_init), data = _d[0], setData = _d[1];
    var _e = useState(false), errors = _e[0], setErrors = _e[1];
    //Save and rescue data on browser, like a cache system. Data have 1h validty
    var cache = function () {
        if (cache_init.length <= 0) {
            localStorage.setItem('data', JSON.stringify({ 'data': data, 'validity': new Date().getTime() }));
        }
        else if (new Date().getTime() - cache_init.validity >= 60 * 60 * 1000) {
            localStorage.removeItem('data');
        }
        else if (JSON.stringify(Object.keys(cache_init).sort()) !== JSON.stringify(Object.keys(data).sort())) {
            localStorage.removeItem('data');
            localStorage.setItem('data', JSON.stringify({ 'data': data, 'validity': new Date().getTime() }));
        }
    };
    cache();
    return (React.createElement(Context.Provider, { value: { isLogged: isLogged, setIsLogged: setIsLogged, isLoading: isLoading, setIsLoading: setIsLoading, data: data, setData: setData, errors: errors, setErrors: setErrors } }, children));
};
export default ContextProvider;
