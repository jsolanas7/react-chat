import {urlSocket} from '../../enviroment/environment';

export const getMessages = async () => {
    const token = localStorage.getItem('auth_token');
    const resp = await fetch(urlSocket + '/chat/getall',{
        headers: {
            'token': token
        }
    });
    if(!resp.ok){
        console.log('no se pudo traer los mensajes');
    }else{
        const result = await resp.json();
        return result;
    }
}

export const sendMessages = async (message) => {
    const token = localStorage.getItem('auth_token');
    const userValues =  getUserDataFromToken();
    const body = {
        user: userValues.fullName,  
        message
    };
    console.log(urlSocket);
    const resp = await fetch(urlSocket + '/chat/create', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    });
}

export const getUserDataFromToken = () => {
        const token = localStorage.getItem('auth_token');
        if(token){
            var base64Url = token.toString().split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            const tokenParse = JSON.parse(window.atob(base64));
            const email = tokenParse['user']['email'];
            const fullName = tokenParse['user']['firstName'] + ' ' + tokenParse['user']['surName'];
            return {
                email,
                fullName
            }
        }
        
}
