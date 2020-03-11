import React, {useEffect, useState} from 'react';
import { scroller } from "react-scroll";
import './Chat.css';
import {sendMessages, getMessages, getUserDataFromToken} from './chatService';

const io = require('socket.io-client');
const socket = io('http://localhost:3001');

const Chat = () => {
    // const listMessages = [" 24/11/2019 18:30  | Juan : Hola", "chau", "que tal"];
    const [receiveMessage, setReceiveMessage] = useState('');
    const [firstItems, setFirstItems] = useState('');
    const [messagesList, setMessagesList] = useState([]);
    const [messageInput, setMessageInput] = useState('');

   
    const scrollToBottom = () => {
        var objDiv = document.getElementById("divChat");
        objDiv.scrollTop = objDiv.scrollHeight;
    }
    useEffect(async ()  => {
        await getAll();
        scrollToBottom();
        return () => {
            console.log('finish get all');
        }
    }, []);

    const getAll = async () => {
        const resp = await getMessages();
        if(resp.length > 0 && resp){
            const userValues = getUserDataFromToken();
            
            const arrayMessages = resp.map((item,i) => {
                let classMessages;
                if(userValues.fullName == item.user){
                    classMessages = 'chatMessage chatMessageOwner';
                }else{
                    classMessages = 'chatMessage';
                }
                return({
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
    useEffect(() => {
        socket.on('recibirMensaje',async payload => {
            const userValues = getUserDataFromToken();
            let classMessages;
                if(userValues.fullName == payload.user){
                    classMessages = 'chatMessage chatMessageOwner';
                }else{
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
                console.log('finish use effect');
            }
        });
      }, [receiveMessage]);



    const send = async () => {
        if(messageInput != ''){
            await sendMessages(messageInput);
            setMessageInput('');
        }
        
    }

    return (
        <div className="chatContainer form-control">
            <h2>Chat</h2>
            <div className="listContainer form-control" id="divChat">
                {
                    messagesList.length > 0 ? 
                    messagesList.map(message => {
                    return(<React.Fragment>
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
                <input value={messageInput} onChange={e => setMessageInput(e.target.value) } className="form-control"></input>
                <button onClick={() => send()} className="btn btn-info">Enviar</button>
            </div>
        </div>
    )
}

export default Chat;