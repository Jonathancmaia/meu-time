import React, { useContext, useEffect } from 'react';
import './style.css';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Context from '../../contexts/context';
import Loading from '../loading';
import Request from '../request';
var Leagues = function () {
    var _a, _b, _c;
    //Calling hooks
    var navigate = useNavigate();
    var _d = useParams(), league = _d.league, season = _d.season;
    var thisPath = { path: 'teams?league=' + league + '&season=' + season };
    var request = Request({ token: false, path: thisPath.path, login: false });
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
                    React.createElement("h1", null, "Selecione o time desejado"),
                    React.createElement("div", { className: "content-handler" }, ((_b = (_a = context.data) === null || _a === void 0 ? void 0 : _a[thisPath.path]) === null || _b === void 0 ? void 0 : _b.response) ?
                        (_c = context.data) === null || _c === void 0 ? void 0 : _c[thisPath.path].response.map(function (team, i) {
                            return React.createElement(Link, { key: i, to: '/leagues/' + league + '/' + season + '/' + team.team.id + '?logo=' + team.team.logo + '&name=' + team.team.name },
                                team.team.logo ?
                                    React.createElement("img", { src: team.team.logo, alt: team.team.name + " logo" })
                                    :
                                        React.createElement("div", { className: "no-icon" }),
                                React.createElement("button", null, team.team.name));
                        })
                        :
                            React.createElement(React.Fragment, null)))));
};
export default Leagues;
