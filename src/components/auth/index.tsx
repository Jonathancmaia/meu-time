import React, { useState, useEffect, useContext } from 'react';
import Context from '../../contexts/context';
import { useNavigate } from 'react-router-dom';
import './style.css';
import Loading from '../loading';
import Request from '../request';

const Auth = () => {

    const [token, setToken] = useState("");

    //calling hooks
    const navigate = useNavigate();
    const request = Request({token: token, path: 'status', login: true});

    //context interface
    interface contextType {
        isLogged: boolean;
        isLoading: boolean;
        setIsLoading: any;
        setErrors: any;
        errors: any;
    }

    const context = useContext<contextType>(Context);
    
    //if user is logged, go to home page
    useEffect(()=>{
        if (context.isLogged){
            navigate('/home');
        }
    }, []);

    const submitTokenForm = (e) => {

        //Prevent input submit to submit page
        e.preventDefault();

        //valid token
        function tokenIsValid(string) {
            const regex = /^[a-zA-Z0-9]+$/;
            return regex.test(string);
          }

        if (token.length === 32 && tokenIsValid(token)) {
            request();
        } else {
            context.setIsLoading(false);
            context.setErrors({"inputToken":"Token inserido é inválido."});
        }
    };

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
                            className="inputToken"
                        />
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