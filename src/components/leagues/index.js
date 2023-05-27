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
    const { country } = useParams();
    const thisPath = {path: 'leagues?search='+country};
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
                        Selecione a liga/copa desejada
                    </h1>
                    <div className="content-handler">
                        {
                            context.data?.[thisPath.path]?.response ? 
                                context.data?.[thisPath.path].response.map((league, i) => 
                                    <Link key={i} /*to={'/leagues/'+country.name }*/ to="#">
                                        {league.id ?
                                            <img src={"https://media.api-sports.io/football/leagues/"+league.id?.toLowerCase()+".png"} alt={league.name+"flag"}/>
                                        :
                                            <div className="no-icon"></div>
                                        }
                                        
                                        <button>{league.name}</button>
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