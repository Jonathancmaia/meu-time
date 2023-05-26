import React, { useContext } from 'react';
import './style.css';
import Context from '../../contexts/context';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {

    const context = useContext(Context);
    const location = useLocation().pathname;
    const navigate = useNavigate();
    
    return (
        <header>
            <Link to="/" disabled = {

                //If link is on the page where this point, disable it
                location === '/auth' ?
                    true
                :
                    false
            }>
                <h1>
                    Meu Time
                </h1>
            </Link>
            {

            //Verify if user is logged
            context.isLogged ?
                <div>
                    <span>
                        <Link to="/home">
                            Home
                        </Link>
                    </span>
                    <span onClick={()=>{
                        localStorage.removeItem('token');
                        context.setErrors(false);
                        context.setIsLogged(false);
                        navigate('/');
                    }}>
                        Sair &raquo;
                    </span>
                </div>
                :
                <Link to="/auth">
                    <button disabled = {

                        //If link is on the page where this point, disable it
                        location === '/auth' ?
                            true
                        :
                            false
                    }>
                        Login
                    </button>
                </Link>
            }
        </header>
    );
};

export default Header;