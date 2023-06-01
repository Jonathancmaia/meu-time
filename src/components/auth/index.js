import React, { useState, useEffect, useContext } from 'react';
import Context from '../../contexts/context';
import { useNavigate } from 'react-router-dom';
import './style.css';
import Loading from '../loading';
import Request from '../request';
var Auth = function () {
    var _a = useState(""), token = _a[0], setToken = _a[1];
    //calling hooks
    var navigate = useNavigate();
    var request = Request({ token: token, path: 'status', login: true });
    var context = useContext(Context);
    //if user is logged, go to home page
    useEffect(function () {
        if (context.isLogged) {
            navigate('/home');
        }
    }, []);
    var submitTokenForm = function (e) {
        //Prevent input submit to submit page
        e.preventDefault();
        //valid token
        function tokenIsValid(string) {
            var regex = /^[a-zA-Z0-9]+$/;
            return regex.test(string);
        }
        if (token.length === 32 && tokenIsValid(token)) {
            request();
        }
        else {
            context.setIsLoading(false);
            context.setErrors({ "inputToken": "Token inserido é inválido." });
        }
    };
    return (React.createElement("div", { className: "container" },
        context.errors ?
            React.createElement(React.Fragment, null, Object.keys(context.errors).map(function (error, i) {
                return React.createElement("small", { key: i, className: "error" }, context.errors[error]);
            }))
            :
                React.createElement(React.Fragment, null),
        context.isLoading ?
            React.createElement(Loading, null)
            :
                React.createElement(React.Fragment, null,
                    React.createElement("h2", null, "Identifique-se com seu Token"),
                    React.createElement("form", null,
                        React.createElement("input", { type: "text", name: "token", value: token, onChange: function (e) { return setToken(e.target.value); }, className: "inputToken" }),
                        React.createElement("input", { type: "submit", onClick: function (e) { return submitTokenForm(e); } })),
                    React.createElement("small", null,
                        "Se n\u00E3o possui uma conta, crie uma nesse ",
                        React.createElement("a", { href: "https://dashboard.api-football.com/register", target: "_blank", rel: "noreferrer" }, "link"),
                        "."))));
};
export default Auth;
