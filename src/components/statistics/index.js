import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Chart from '../chart';
import Context from '../../contexts/context';
import Request from '../request';
import Loading from '../loading';
import './style.css';
var Statistics = function () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11;
    var _12 = useParams(), league = _12.league, season = _12.season, team = _12.team;
    var thisPath = { path: 'teams/statistics?league=' + league + '&season=' + season + '&team=' + team };
    var request = Request(thisPath);
    var context = useContext(Context);
    useEffect(function () {
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
                    React.createElement("section", null,
                        React.createElement("h1", null, "Forma\u00E7\u00E3o mais utilizada"),
                        React.createElement("h2", null, (function () {
                            var _a, _b, _c;
                            var lineups = (_c = (_b = (_a = context === null || context === void 0 ? void 0 : context.data) === null || _a === void 0 ? void 0 : _a[thisPath.path]) === null || _b === void 0 ? void 0 : _b.response) === null || _c === void 0 ? void 0 : _c.lineups;
                            if (!lineups || lineups.length === 0) {
                                return React.createElement("div", null, "dado n\u00E3o dispon\u00EDvel");
                            }
                            var maxPlayedLineup = lineups.reduce(function (maxPlayedLineup, currentLineup) {
                                if (currentLineup.played > maxPlayedLineup.played) {
                                    return currentLineup;
                                }
                                else {
                                    return maxPlayedLineup;
                                }
                            });
                            return maxPlayedLineup.formation;
                        })())),
                    React.createElement("section", null,
                        React.createElement("h1", null, "Resultados"),
                        React.createElement("table", null,
                            React.createElement("thead", null,
                                React.createElement("tr", null,
                                    React.createElement("th", null, "Jogos"),
                                    React.createElement("th", null, "Vit\u00F3rias"),
                                    React.createElement("th", null, "Empates"),
                                    React.createElement("th", null, "Derrotas"))),
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", null, (_e = (_d = (_c = (_b = (_a = context === null || context === void 0 ? void 0 : context.data) === null || _a === void 0 ? void 0 : _a[thisPath.path]) === null || _b === void 0 ? void 0 : _b.response) === null || _c === void 0 ? void 0 : _c.fixtures) === null || _d === void 0 ? void 0 : _d.played) === null || _e === void 0 ? void 0 : _e.total),
                                    React.createElement("td", null, (_k = (_j = (_h = (_g = (_f = context === null || context === void 0 ? void 0 : context.data) === null || _f === void 0 ? void 0 : _f[thisPath.path]) === null || _g === void 0 ? void 0 : _g.response) === null || _h === void 0 ? void 0 : _h.fixtures) === null || _j === void 0 ? void 0 : _j.wins) === null || _k === void 0 ? void 0 : _k.total),
                                    React.createElement("td", null, (_q = (_p = (_o = (_m = (_l = context === null || context === void 0 ? void 0 : context.data) === null || _l === void 0 ? void 0 : _l[thisPath.path]) === null || _m === void 0 ? void 0 : _m.response) === null || _o === void 0 ? void 0 : _o.fixtures) === null || _p === void 0 ? void 0 : _p.draws) === null || _q === void 0 ? void 0 : _q.total),
                                    React.createElement("td", null, (_v = (_u = (_t = (_s = (_r = context === null || context === void 0 ? void 0 : context.data) === null || _r === void 0 ? void 0 : _r[thisPath.path]) === null || _s === void 0 ? void 0 : _s.response) === null || _t === void 0 ? void 0 : _t.fixtures) === null || _u === void 0 ? void 0 : _u.loses) === null || _v === void 0 ? void 0 : _v.total))))),
                    React.createElement("section", null,
                        React.createElement("h1", null, "Gr\u00E1fico de gols por tempo de jogo"),
                        ((_z = (_y = (_x = (_w = context === null || context === void 0 ? void 0 : context.data) === null || _w === void 0 ? void 0 : _w[thisPath.path]) === null || _x === void 0 ? void 0 : _x.response) === null || _y === void 0 ? void 0 : _y.goals) === null || _z === void 0 ? void 0 : _z.for) && ((_3 = (_2 = (_1 = (_0 = context === null || context === void 0 ? void 0 : context.data) === null || _0 === void 0 ? void 0 : _0[thisPath.path]) === null || _1 === void 0 ? void 0 : _1.response) === null || _2 === void 0 ? void 0 : _2.goals) === null || _3 === void 0 ? void 0 : _3.against) ?
                            React.createElement(Chart, { goalsForTotal: (_7 = (_6 = (_5 = (_4 = context === null || context === void 0 ? void 0 : context.data) === null || _4 === void 0 ? void 0 : _4[thisPath.path]) === null || _5 === void 0 ? void 0 : _5.response) === null || _6 === void 0 ? void 0 : _6.goals) === null || _7 === void 0 ? void 0 : _7.for, goalsAgainstTotal: (_11 = (_10 = (_9 = (_8 = context === null || context === void 0 ? void 0 : context.data) === null || _8 === void 0 ? void 0 : _8[thisPath.path]) === null || _9 === void 0 ? void 0 : _9.response) === null || _10 === void 0 ? void 0 : _10.goals) === null || _11 === void 0 ? void 0 : _11.against })
                            :
                                React.createElement(Loading, null)))));
};
export default Statistics;
