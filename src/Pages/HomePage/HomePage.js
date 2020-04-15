import React, { useState, useEffect } from 'react';
import Chat from '../../Components/Chat/Chat';
import './HomePage.css';
import { getUserDataFromToken } from '../../Components/Chat/chatService';
import {urlSocket} from '../../enviroment/environment';



const io = require('socket.io-client');
const userName = getUserDataFromToken().fullName;
const socket = io(urlSocket, {query: {name: userName }});


const HomePage = () => {
    const [usersLogged, setUsersLogged] = useState([]);

    
    useEffect(() => {
        socket.on('connectClient', (user) => {
            const isThere = usersLogged.indexOf(user);
            if(isThere == -1){
                setUsersLogged(oldArray => [...oldArray, user]);
            }
        });
    }, [])
    
    return(
    <div className="homePageContainer">
        {/* <div className="usersOnlineContainer form-control">
            <h4 class='title'>Usuarios conectados</h4>

            {usersLogged.length > 0
            ?
                usersLogged.map(item => {
                    return(<p>&#9673; <strong>{item == undefined ? '' : item}</strong></p>)
                })
            :
            <h3>No hay usuarios conectados</h3>
            }
        </div> */}
        <Chat/>
    </div>
    
    )
}

export default HomePage;