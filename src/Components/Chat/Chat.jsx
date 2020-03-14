import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { scroller } from "react-scroll";
import './Chat.css';
import { sendMessages, getMessages, getUserDataFromToken } from './chatService';
import {urlSocket} from '../../enviroment/environment';

import audio from '../../Assets/audios/sirena.mp3';

const io = require('socket.io-client');
const userName = getUserDataFromToken().fullName;
const socket = io(urlSocket, {query: {name: userName }});

const Chat = () => {
    const [receiveMessage, setReceiveMessage] = useState('');
    const [messagesList, setMessagesList] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [userLogged, setUserLogged] = useState('');
    const users = [];


    
    const scrollToBottom = () => {
        var objDiv = document.getElementById("divChat");
        if(objDiv){
            objDiv.scrollTop = objDiv.scrollHeight;
        }
    }
    useEffect(async () => {
        
        await getAll();
        const userValues = getUserDataFromToken();
        setUserLogged(userValues.fullName);
        scrollToBottom();
        socket.on('recibirMensaje', async payload => {
            const userValues = getUserDataFromToken();
            let classMessages;
            if (userValues.fullName == payload.user) {
                classMessages = 'chatMessage chatMessageOwner';
            } else {
                classMessages = 'chatMessage';
            }
            setMessagesList(oldArray => [...oldArray, {
                owner: payload.user,
                message: payload.message,
                date: payload.date,
                classes: classMessages
            }]);
            scrollToBottom();
            return () => {
                socket.off('message', );
            }
            
        });
        return () => {
            console.log('finish get all');
        }
    }, []);
    
    


    
    const getAll = async () => {
        const resp = await getMessages();
        if (resp.length > 0 && resp) {
            const userValues = getUserDataFromToken();

            const arrayMessages = resp.map((item, i) => {
                let classMessages;
                if (userValues.fullName == item.user) {
                    classMessages = 'chatMessage chatMessageOwner';
                } else {
                    classMessages = 'chatMessage';
                }
                return ({
                    owner: item.user,
                    message: item.message,
                    date: item.date,
                    idScroll: i,
                    classes: classMessages
                });
            });
            setMessagesList(arrayMessages);
            scrollToBottom();
            console.log('llamo');
        }
    }
    
    const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          send();
        }
      }
    const send = async () => {
        if (messageInput != '') {
            await sendMessages(messageInput);
            setMessageInput('');
        }

    }
    return (
        <div className="chatContainer form-control">
            <h2>Chat - {userLogged}</h2>
            <div className="listContainer form-control" id="divChat">
                {
                    messagesList.length > 0 ?
                        messagesList.map(message => {
                            return (<React.Fragment>
                                <div className="principalMessageContainer">
                                    <div className="chatOwner">{message.owner}</div>
                                    <div title={message.date} id={message.idScroll} className={message.classes}>{message.message}</div>
                                </div>
                            </React.Fragment>)
                        })
                        :
                        <div>No hay mensajes</div>

                }
            </div>
            <div className="inputContainer">
                <input value={messageInput}  onKeyDown={e => _handleKeyDown(e)} onChange={e => setMessageInput(e.target.value)} className="form-control"></input>
                <button onClick={() => send()} className="btn btn-info">Enviar</button>
            </div>
        </div>
    )
}

export default Chat;