import { urlSocket } from '../../enviroment/environment';

const loginUser = async (email, password) => {
    const data = {
        email,
        password
    }

    const resp = await fetch(urlSocket + '/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!resp.ok) {
        if (!resp.ok) {
            console.log('error al loguear');
        } else {
            return resp;
        }
    } else {
        const token = await resp.json();
        return token;
    }
}

export default loginUser;