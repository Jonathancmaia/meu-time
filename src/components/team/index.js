import React, { useContext, useEffect } from 'react';
import './style.css';
import { useNavigate, useParams, Link, useSearchParams } from 'react-router-dom';
import Context from '../../contexts/context';
import Loading from '../loading';
import Request from '../request';
var Leagues = function () {
    var _a, _b, _c, _d;
    //Calling hooks
    var navigate = useNavigate();
    var _e = useParams(), league = _e.league, season = _e.season, team = _e.team;
    var thisPath = { path: 'players?league=' + league + '&season=' + season + '&team=' + team };
    var request = Request({ token: false, path: thisPath.path, login: false });
    var searchParams = useSearchParams()[0];
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
                    React.createElement("section", { className: "team-header" },
                        React.createElement("img", { src: searchParams.get("logo"), alt: searchParams.get("name") + 'logo' }),
                        React.createElement("h1", null, searchParams.get("name"))),
                    React.createElement("section", null,
                        React.createElement("h1", null, "Jogadores"),
                        React.createElement("table", null,
                            React.createElement("thead", null,
                                React.createElement("tr", null,
                                    React.createElement("th", null, "Nome"),
                                    React.createElement("th", null, "Idade"),
                                    React.createElement("th", null, "Nacionalidade"))),
                            React.createElement("tbody", null, ((_b = (_a = context.data) === null || _a === void 0 ? void 0 : _a[thisPath.path]) === null || _b === void 0 ? void 0 : _b.response) ?
                                ((_c = context.data) === null || _c === void 0 ? void 0 : _c[thisPath.path].response.length) > 0 ?
                                    (_d = context.data) === null || _d === void 0 ? void 0 : _d[thisPath.path].response.map(function (player, i) {
                                        return React.createElement("tr", { key: i },
                                            React.createElement("td", null, player.player.name),
                                            React.createElement("td", null, player.player.age),
                                            React.createElement("td", null, player.player.nationality));
                                    })
                                    :
                                        React.createElement("tr", null,
                                            React.createElement("td", { colSpan: 3 }, "Dado n\u00E3o dispon\u00EDvel."))
                                :
                                    React.createElement(React.Fragment, null)))),
                    React.createElement(Link, { to: '/statistics/' + league + '/' + season + '/' + team },
                        React.createElement("button", null, "Estat\u00EDsticas")))));
};
export default Leagues;
