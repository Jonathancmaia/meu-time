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
    var country = useParams().country;
    var thisPath = { path: 'leagues?search=' + country };
    var request = Request({ token: false, path: thisPath.path, login: false });
    var context = useContext(Context);
    //If user is not logged in, go to index
    useEffect(function () {
        if (!context.isLogged) {
            navigate('/');
        }
        request();
    }, []);
    //Open drop down menu
    var openDropDownMenu = function (e, league) {
        document.getElementById(league + 'menu').classList.toggle("show");
    };
    //Close drop down menu
    window.onclick = function (e) {
        if (!e.target.parentNode.classList.contains('item')) {
            var dropdowns = document.getElementsByClassName("drop-down-menu");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
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
                    React.createElement("h1", null, "Selecione a liga/copa desejada"),
                    React.createElement("div", { className: "content-handler" }, ((_b = (_a = context.data) === null || _a === void 0 ? void 0 : _a[thisPath.path]) === null || _b === void 0 ? void 0 : _b.response) ?
                        (_c = context.data) === null || _c === void 0 ? void 0 : _c[thisPath.path].response.map(function (league, i) {
                            return React.createElement("div", { className: "item", key: i, onClick: function (e) { openDropDownMenu(e, league.league.id); } },
                                league.league ?
                                    React.createElement("img", { src: league.league.logo, alt: league.league.name + "flag" })
                                    :
                                        React.createElement("div", { className: "no-icon" }),
                                React.createElement("button", null, league.league.name),
                                React.createElement("div", { className: "drop-down-menu", id: league.league.id + "menu" }, league.seasons ?
                                    league.seasons.map(function (season, i) {
                                        return React.createElement(Link, { key: i, to: '/leagues/' + league.league.id + '/' + season.year }, season.year);
                                    })
                                    :
                                        React.createElement(React.Fragment, null)));
                        })
                        :
                            React.createElement(React.Fragment, null)))));
};
export default Leagues;
