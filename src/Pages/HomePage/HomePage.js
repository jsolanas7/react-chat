import React, { useState, useEffect } from 'react';
import Chat from '../../Components/Chat/Chat';
import './HomePage.css';

const HomePage = () => {
    const [usersLogged, setUsersLogged] = useState([]);
    return(
    <div className="homePageContainer">
        <div className="usersOnlineContainer form-control">
            <h4 class='title'>Usuarios conectados</h4>
            {usersLogged.length > 0
            ?
                usersLogged.map(item => {
                    return(<p>&#9673; <strong>{item == undefined ? 'no ta' : item}</strong></p>)
                })
            :
            <h3>No hay usuarios conectados</h3>
            }
        </div>
        <Chat
            usersLogged = {usersLogged}
            setUsersLogged = {setUsersLogged}
        />
    </div>
    )
}

export default HomePage;