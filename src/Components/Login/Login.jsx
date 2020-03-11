import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import './Login.css';
import logo from '../../Assets/squartle.png';
import loginUser from './loginService';
const Login = () => {
    const history = useHistory();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errorClass, setErrorClass] = useState('errorNoActive');
    const validateLogin = async () => {
        setErrorClass('errorNoActive');
        const token = await loginUser(user, password);
        if(token){
            localStorage.setItem('auth_token', token);
            history.push('/home');
        }else{
            setErrorClass('errorActive');
        }
    }
    return (
        <div className="loginContainer">
            <div>
                <img className="logo" src={logo} />
            </div>
            <div>
                <h1>Login</h1>
            </div>
            <div className={errorClass}>
                <h3>El usuario o la contraseña son incorrectos.</h3>
            </div>
            <div>
                <input value={user} type="text" className="form-control" onChange={e => setUser(e.target.value)} placeholder="User" />
            </div>
            <div>
                <input value={password} type="password" className="form-control" onChange={e => setPassword(e.target.value)} placeholder="Password" />
            </div>
            <div>
                <button className="btn btn-info" onClick={() => validateLogin()}>Login</button>
            </div>
        </div>
    )
}

export default Login;