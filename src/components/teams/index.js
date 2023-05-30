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
    const { league, season } = useParams();
    const thisPath = {path: 'teams?league='+league+'&season='+season};
    const request = Request(thisPath);
 
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
                        <h1>
                            Selecione o time desejado
                        </h1>
                        <div className="content-handler">
                            {
                                context.data?.[thisPath.path]?.response ? 
                                    context.data?.[thisPath.path].response.map((team, i) => 
                                        <Link key={i} to={'/leagues/'+league+'/'+season+'/'+team.team.id }>
                                            {team.team.logo ?
                                                <img src={team.team.logo} alt={team.team.name+" logo"}/>
                                            :
                                                <div className="no-icon"></div>
                                            }
                                            
                                            <button>{team.team.name}</button>
                                        </Link>
                                    )
                                :
                                    <></>
                            }
                        </div>
                    </>
            }
        </div>
    );
};

export default Leagues;