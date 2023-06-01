import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Chart from '../chart';
import Context from '../../contexts/context';
import Request from '../request';
import Loading from '../loading';
import './style.css';

const Statistics = () => {

    const { league, season, team } = useParams();
    const thisPath:any = {path: 'teams/statistics?league='+league+'&season='+season+'&team='+team};
    const request = Request(thisPath);

    //context interface
    interface contextType {
        isLogged: boolean;
        isLoading: boolean;
        errors: any;
        data: any;
    }

    const context = useContext<contextType>(Context);
    
    useEffect(()=>{
        request();
    },[]);

    return (
        <div className="container">
            {
                context.errors ?
                    <>
                        {
                            Object.keys(context.errors).map((error, i) =>
                                <small key={i} className="error">{context.errors[error]}</small>
                            )
                        }
                    </>
                :
                    <></>
            }
            {
                context.isLoading ?
                    <Loading></Loading>
                :
                    <>
                        {/* Most used formation*/}
                        <section>
                            <h1>
                                Formação mais utilizada
                            </h1>
                            <h2>
                                {(() => {
                                    const lineups = context?.data?.[thisPath.path]?.response?.lineups;

                                    if (!lineups || lineups.length === 0) {
                                        return <div>dado não disponível</div>;
                                    }

                                    const maxPlayedLineup = lineups.reduce((maxPlayedLineup, currentLineup) => {
                                    if (currentLineup.played > maxPlayedLineup.played) {
                                        return currentLineup;
                                    } else {
                                        return maxPlayedLineup;
                                    }
                                    });

                                    return maxPlayedLineup.formation;
                                })()}
                            </h2>
                        </section>

                        {/* Wins, draws and  loses table */}
                        <section>
                            <h1>
                                Resultados
                            </h1>
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            Jogos
                                        </th>
                                        <th>
                                            Vitórias
                                        </th>
                                        <th>
                                            Empates
                                        </th>
                                        <th>
                                            Derrotas
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            {context?.data?.[thisPath.path]?.response?.fixtures?.played?.total}
                                        </td>
                                        <td>
                                            {context?.data?.[thisPath.path]?.response?.fixtures?.wins?.total}
                                        </td>
                                        <td>
                                            {context?.data?.[thisPath.path]?.response?.fixtures?.draws?.total}
                                        </td>
                                        <td>
                                            {context?.data?.[thisPath.path]?.response?.fixtures?.loses?.total}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>

                        {/* Goals per time chart */}
                        <section>
                            <h1>
                                Gráfico de gols por tempo de jogo
                            </h1>
                            {
                                context?.data?.[thisPath.path]?.response?.goals?.for && context?.data?.[thisPath.path]?.response?.goals?.against ?
                                        <Chart
                                            goalsForTotal={context?.data?.[thisPath.path]?.response?.goals?.for}
                                            goalsAgainstTotal={context?.data?.[thisPath.path]?.response?.goals?.against}
                                        />
                                    :
                                        <Loading></Loading>
                            }
                        </section>
                    </>
            }
        </div>
    );
};

export default Statistics;