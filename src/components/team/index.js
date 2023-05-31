import React, { useContext, useEffect } from 'react';
import './style.css';
import { useNavigate, useParams, Link, useSearchParams } from 'react-router-dom';
import Context from '../../contexts/context';
import Loading from '../loading';
import Request from '../request';

const Leagues = () => {

    //Calling hooks
    const context = useContext(Context);
    const navigate = useNavigate();
    const { league, season, team } = useParams();
    const thisPath = {path: 'players?league='+league+'&season='+season+'&team='+team};
    const request = Request(thisPath);
    const [searchParams, setSearchParams] = useSearchParams();
 
    //If user is not logged in, go to index
    useEffect(()=>{
        if (!context.isLogged){
            navigate('/');
        }

        request();
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
                        {/* Header */}
                        <section className="team-header">
                            <img src={searchParams.get("logo")} alt={searchParams.get("name")+'logo'}/>
                            <h1>
                                {searchParams.get("name")}
                            </h1>
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
                                            context.data?.[thisPath.path].response.length > 0 ?
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
                                            <tr>
                                                <td colSpan={3}>Dado não disponível.</td>
                                            </tr> 
                                        :
                                            <></>
                                    }
                                </tbody>
                            </table>
                        </section>

                        <Link to={'/statistics/'+league+'/'+season+'/'+team}>
                            <button>
                                Estatísticas
                            </button>
                        </Link>
                    </>
            }
        </div>
    );
};

export default Leagues;