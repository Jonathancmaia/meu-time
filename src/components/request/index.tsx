import { useContext } from 'react';
import axios from 'axios';
import Context from '../../contexts/context';
import Conf from '../../axios';
import { useNavigate } from 'react-router-dom';

const Request = ({token, path, login}) => {

    //Call hooks
    const navigate = useNavigate();
    const conf = Conf();

    //context interface
    interface contextType {
        isLogged: boolean;
        setIsLogged: any;
        isLoading: boolean;
        setIsLoading: any;
        errors: any;
        setErrors: any;
        setData: any;
        data: any;
    }

    const context = useContext<contextType>(Context);

    if (!token) {token = localStorage.getItem('token')};
    if (!login) {login = false};

    const request = () => {
        
        async function getResponse(){

            //Verify if response is done before, if yes, don't do it again
            if (!context.data[path]){
                
                //Start loading state
                context.setIsLoading(true);

                //Set token header
                conf.axiosConfig.headers = {...conf.axiosConfig.headers, 'x-rapidapi-key': token};

                //Validating with api the given token
                await axios.get(path, conf.axiosConfig)
                .then((response) => {

                    //Verify if token is recognized by API. If yes, save it on session storage
                    if (login === true){
                        if (response.data.errors.token) {
                            context.setErrors({"inputToken":"Token inserido está incorreto."});
                        } else {
                            localStorage.setItem('token', token);               
                            context.setIsLogged(true);        
                            navigate('/home');
                        }
                    } else {

                        //if for some reason the token turn invalid or blocked, logout the user
                        if (response.data.errors.token){
                            if(localStorage.getItem('token')){
                                context.setIsLogged(false);
                                context.setErrors(false);
                                localStorage.removeItem('token');
                                navigate('/');
                            }
                        } else if (response.data.errors.requests){
                            context.setErrors({"container": "Você chegou ao máximo de requests diárias."});
                        } else {
                            context.setData({...context.data, [path]: response.data});
                        }
                    }
                }).catch(function (error) {
                    context.setErrors({"container":"Houve algum problema de comunicação. Favor entrar em contato com o suporte. ( "+error+" )"});
                }).finally(()=>{
                    context.setIsLoading(false);
                });
            }
        }

        getResponse();
    }

    return (request);
};

export default Request;