var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React from 'react';
//Chartjs-2 imports
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
var Chart = function (_a) {
    var goalsForTotal = _a.goalsForTotal, goalsAgainstTotal = _a.goalsAgainstTotal;
    var labels = Object.keys(goalsForTotal.minute);
    var goalsFor = [];
    labels.forEach(function (key) {
        var _a;
        if (((_a = goalsForTotal.minute[key]) === null || _a === void 0 ? void 0 : _a.total) === null) {
            goalsFor = __spreadArray(__spreadArray([], goalsFor, true), [0], false);
        }
        else {
            goalsFor = __spreadArray(__spreadArray([], goalsFor, true), [goalsForTotal.minute[key].total], false);
        }
    });
    var goalsAgainst = [];
    labels.forEach(function (key) {
        if (goalsAgainstTotal.minute[key].total === null) {
            goalsAgainst = __spreadArray(__spreadArray([], goalsAgainst, true), [0], false);
        }
        else {
            goalsAgainst = __spreadArray(__spreadArray([], goalsAgainst, true), [goalsAgainstTotal.minute[key].total], false);
        }
    });
    return (React.createElement("div", { className: "chart-handler" },
        React.createElement(Line, { options: {
                responsive: true,
                scales: {
                    y: {
                        min: 0,
                        ticks: {
                            stepSize: 1,
                        }
                    },
                    y1: {
                        display: false
                    }
                }
            }, data: {
                labels: labels,
                datasets: [{
                        label: "Gols feitos",
                        data: goalsFor,
                        borderColor: 'rgb(53, 162, 235)',
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        yAxisID: 'y'
                    },
                    {
                        label: "Gols sofridos",
                        data: goalsAgainst,
                        borderColor: 'rgb(139, 0, 0)',
                        backgroundColor: 'rgba(139, 0, 0, 0.5)',
                        yAxisID: 'y1'
                    }]
            } })));
};
export default Chart;
