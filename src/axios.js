import Context from './contexts/context';
import {useContext} from 'react';

let Conf = () => {

    const context = useContext(Context);

    let axiosConfig = {
        method: 'get',
        baseURL: 'https://v3.football.api-sports.io/',
        headers: {'x-rapidapi-host': 'v3.football.api-sports.io'}
    }

    if (context.isLogged){
        axiosConfig.headers = {...axiosConfig.headers, 'x-rapidapi-key': localStorage.getItem('token')};
    }

    return ({axiosConfig});
};

export default Conf;