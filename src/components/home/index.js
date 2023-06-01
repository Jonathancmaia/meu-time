import React, { useContext, useEffect } from 'react';
import './style.css';
import { useNavigate, Link } from 'react-router-dom';
import Context from '../../contexts/context';
import Loading from '../loading';
import Request from '../request';
var Home = function () {
    var _a, _b, _c, _d;
    //Calling hooks
    var navigate = useNavigate();
    var request = Request({ token: false, path: 'countries', login: false });
    var context = useContext(Context);
    //If user is not logged in, go to index
    useEffect(function () {
        if (!context.isLogged) {
            navigate('/');
        }
        request();
    }, []);
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
                    React.createElement("h1", null, "Selecione o pa\u00EDs desejado"),
                    React.createElement("div", { className: "content-handler" }, ((_b = (_a = context.data) === null || _a === void 0 ? void 0 : _a.countries) === null || _b === void 0 ? void 0 : _b.response) ?
                        (_d = (_c = context.data) === null || _c === void 0 ? void 0 : _c.countries) === null || _d === void 0 ? void 0 : _d.response.map(function (country, i) {
                            var _a;
                            return React.createElement(Link, { key: i, to: '/leagues/' + country.name },
                                country.code ?
                                    React.createElement("img", { src: "https://media.api-sports.io/flags/" + ((_a = country.code) === null || _a === void 0 ? void 0 : _a.toLowerCase()) + ".svg", alt: country.name + "flag" })
                                    :
                                        React.createElement("div", { className: "no-icon" }),
                                React.createElement("button", null, country.name));
                        })
                        :
                            React.createElement(React.Fragment, null)))));
};
export default Home;
