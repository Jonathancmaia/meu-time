import React, { useContext, useEffect } from 'react';
import './style.css';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Context from '../../contexts/context';
import Loading from '../loading';
import Request from '../request';

const Leagues = () => {

    //Calling hooks
    const context = useContext(Context);
    const navigate = useNavigate();
    const { league, season, team } = useParams();
    const thisPath = {path: 'players?league='+league+'&season='+season+'&team='+team};
    const statisticsPath = {path: 'teams/statistics?league='+league+'&season='+season+'&team='+team};
    const request = Request(thisPath);
    const staticsRequest = Request(statisticsPath);

    //Function that save most used lineup
    const lineups = context.data?.[statisticsPath.path]?.response?.lineups;

    const mostUsedLineUp = lineups.reduce((maxPlayedLineup, currentLineup) => {
        if (currentLineup.played > maxPlayedLineup.played) {
            return currentLineup;
        } else {
            return maxPlayedLineup;
        }
    });
 
    //If user is not logged in, go to index
    useEffect(()=>{
        if (!context.isLogged){
            navigate('/');
        }

        request();
        staticsRequest();
    }, []);

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
                        {/* Page header */}
                        <section className="team-header">
                            <div>
                                <img src={context.data?.[statisticsPath.path]?.response?.team?.logo} alt={context.data?.[statisticsPath.path]?.response?.team?.name+' logo'}/>
                                <h1>
                                    {context.data?.[statisticsPath.path]?.response?.team?.name}
                                </h1>
                            </div>
                            <div>
                                <small>
                                    ({context.data?.[statisticsPath.path]?.response?.league?.name} - {season})
                                </small>
                            </div>
                        </section>

                        {/* Players table */}
                        <section>
                            <h1>
                                Jogadores
                            </h1>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Idade</th>
                                        <th>Nacionalidade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        context.data?.[thisPath.path]?.response ? 
                                            context.data?.[thisPath.path].response.map((player, i) => 
                                                <tr key={i}>
                                                    <td>
                                                        {player.player.name}
                                                    </td>
                                                    <td>
                                                        {player.player.age}
                                                    </td>
                                                    <td>
                                                        {player.player.nationality}
                                                    </td>
                                                </tr>
                                            )
                                        :
                                            <></>
                                    }
                                </tbody>
                            </table>
                        </section>
                        
                        {/* Most used formation*/}
                        <section>
                            <h1>
                                Formação mais utilizada
                            </h1>
                            <h2>
                                {mostUsedLineUp.formation}
                            </h2>
                        </section>

                        {/*win, draws and  loses table*/}
                        <section>
                            <h1>
                                Resultado
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
                                            {context.data?.[statisticsPath.path]?.response?.fixtures.played.total}
                                        </td>
                                        <td>
                                            {context.data?.[statisticsPath.path]?.response?.fixtures.wins.total}
                                        </td>
                                        <td>
                                            {context.data?.[statisticsPath.path]?.response?.fixtures.draws.total}
                                        </td>
                                        <td>
                                            {context.data?.[statisticsPath.path]?.response?.fixtures.loses.total}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                    </>
            }
        </div>
    );
};

export default Leagues;