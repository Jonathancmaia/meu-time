import React, { useContext, useEffect } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import Context from '../../contexts/context';

const Home = () => {

    const context = useContext(Context);
    const navigate = useNavigate();

    useEffect(()=>{
        if (!context.isLogged){
            navigate('/welcome');
        }
    });

    return (
        <div className="container">
            Bem vindo à sua home.
        </div>
    );
};

export default Home;