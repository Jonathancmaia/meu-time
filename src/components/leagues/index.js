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

    //Open drop down menu
    const openDropDownMenu = (e, league) => {
        document.getElementById(league+'menu').classList.toggle("show");
    };

    //Close drop down menu
    window.onclick = function(e) {
        if (!e.target.parentNode.classList.contains('item')) {
            var dropdowns = document.getElementsByClassName("drop-down-menu");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                    }
                }
        }
    }

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
                                    <div className="item" key={i} onClick={(e)=>{openDropDownMenu(e, league.league.id)}}>
                                        {league.league ?
                                            <img src={league.league.logo} alt={league.league.name+"flag"}/>
                                        :
                                            <div className="no-icon"></div>
                                        }
                                        <button>{league.league.name}</button>
                                        <div className="drop-down-menu" id={league.league.id+"menu"}>
                                            {league.seasons ? 
                                                league.seasons.map((season, i) => 
                                                    <Link key={i}  to={'/leagues/'+league.league.id+'/'+season.year}>
                                                        {season.year}
                                                    </Link>
                                                )
                                            :
                                                <></>
                                            }
                                        </div>
                                    </div>
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