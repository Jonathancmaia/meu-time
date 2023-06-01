import React, { useContext } from 'react';
import './style.css';
import Context from '../../contexts/context';
import { Link, useLocation, useNavigate } from 'react-router-dom';
var Header = function () {
    var location = useLocation().pathname;
    var navigate = useNavigate();
    var context = useContext(Context);
    return (React.createElement("header", null,
        location === '/auth' ?
            React.createElement(Link, { to: '/' },
                React.createElement("h1", null, "Meu Time"))
            :
                React.createElement(Link, { to: '' },
                    React.createElement("h1", null, "Meu Time")),
        //Verify if user is logged
        context.isLogged ?
            React.createElement("div", null,
                React.createElement("span", null,
                    React.createElement(Link, { to: "/home" }, "Home")),
                React.createElement("span", { onClick: function () {
                        localStorage.removeItem('token');
                        context.setErrors(false);
                        context.setIsLogged(false);
                        navigate('/');
                    } }, "Sair \u00BB"))
            :
                React.createElement(Link, { to: "/auth" },
                    React.createElement("button", { disabled: 
                        //If link is on the page where this point, disable it
                        location === '/auth' ?
                            true
                            :
                                false }, "Login"))));
};
export default Header;
