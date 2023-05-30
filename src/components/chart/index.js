import React from 'react';

//Chartjs-2 imports
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from "react-chartjs-2";

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );

const Chart = ({goalsForTotal, goalsAgainstTotal}) => {
    const labels = Object.keys(goalsForTotal.minute);

    let goalsFor = [];
    labels.forEach(
        (key)=>{
            if(goalsForTotal[key]?.total === null){
                goalsFor = [...goalsFor, 0];
            } else {
                goalsFor = [...goalsFor, goalsForTotal.minute[key].total];
            }
        }
    );

    let goalsAgainst = [];
    labels.forEach(
        (key)=>{
            if(goalsAgainstTotal.minute[key].total === null){
                goalsAgainst = [...goalsAgainst, 0];
            } else {
                goalsAgainst = [...goalsAgainst, goalsAgainstTotal.minute[key].total];
            }
        }
    );

    return (
        <div className="chart-handler">
            <Line
                options={{
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
                }}
                data={{
                    labels: labels,
                    datasets: [{
                        label: "Gols feitos",
                        data: goalsFor,
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        yAxisID: 'y'
                    },
                    {
                        label: "Gols sofridos",
                        data: goalsAgainst,
                        borderColor: 'rgb(53, 162, 235)',
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        yAxisID: 'y1'
                    }]
                }}
            />
        </div>
    );
}

export default Chart;