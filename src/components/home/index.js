import React, { useContext, useEffect } from 'react';
import './style.css';
import { useNavigate, Link } from 'react-router-dom';
import Context from '../../contexts/context';
import Loading from '../loading';
import Request from '../request';

const Home = () => {

    //Calling hooks
    const context = useContext(Context);
    const navigate = useNavigate();
    const request = Request({path: 'countries'});

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
                        Selecione o país desejado
                    </h1>
                    <div className="content-handler">
                        {
                            context.data?.countries?.response ? 
                                context.data.countries?.response.map((country, i) => 
                                    <Link key={i} to={'/leagues/'+country.name }>
                                        {country.code ?
                                            <img src={"https://media.api-sports.io/flags/"+country.code?.toLowerCase()+".svg"} alt={country.name+"flag"}/>
                                        :
                                            <div className="no-icon"></div>
                                        }
                                        
                                        <button>{country.name}</button>
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

export default Home;