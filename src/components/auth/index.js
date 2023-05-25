import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import axios from 'axios';
import conf from '../../axios';
import Context from '../../contexts/context';
import { useNavigate } from 'react-router-dom';
import './style.css';
import Loading from '../loading';

const Auth = () => {

    const [token, setToken] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const context = useContext(Context);

    useEffect(()=>{
        if (context.isLogged){
            navigate('/home');
        }
    }, []);

    const submitTokenForm = (e) => {

        //Prevent input submit to submit page
        e.preventDefault();

        //Clear errors
        setErrors([]);

        function tokenIsValid(string) {
            const regex = /^[a-zA-Z0-9]+$/;
            return regex.test(string);
          }

        if (token.length === 32 && tokenIsValid(token)) {

            //Set token to axios header
            conf.headers = {...conf.headers, 'x-rapidapi-key': token}

            context.setIsLoading(true);

            //Validating with api the given token
            axios.get('status', conf)
            .then(
                (response) => {
                    
                    //Verify if token is recognized by API. If yes, save it on session storage
                    if (response.data.errors.token) {
                        setErrors({"inputToken":"Token inserido está incorreto."});
                    } else {
                        localStorage.setItem('token', token);
                        context.setIsLogged(true);
                        navigate('/home');
                    }
                }
            ).catch(function (error) {
                console.error("Fetch: " ,error);
                setErrors({"inputToken":"Houve algum problema de comunicação. Favor entrar emcontato com o suporte."});
            }).finally(()=>{
                context.setIsLoading(false);
            });
        } else {
            context.setIsLoading(false);
            setErrors({"inputToken":"Token inserido é inválido."});
        }
    };

    return (
        <div className="container">
            {context.isLoading ? 
                <Loading></Loading>
                :
                <>
                    <h2>
                        Identifique-se com seu Token
                    </h2>
                    <form>
                        <input
                            type="text"
                            name="token"
                            value={token}
                            onChange={e=>setToken(e.target.value)}
                            id="inputToken"
                            className={errors.inputToken ? "errored" : ""}
                        />
                        {
                            errors.inputToken ?
                                <small id="error-Panel">{errors.inputToken}</small>
                            :
                                <></>
                        }
                        <input type="submit" onClick={e=>submitTokenForm(e)}/>
                    </form>
                    <small>
                        Se não possui uma conta, crie uma nesse <a href="https://dashboard.api-football.com/register" target="_blank" rel="noreferrer">link</a>.
                    </small>
                </>
            }
        </div>
    );
};

export default Auth;