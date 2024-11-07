import React, { useState, useEffect, useRef } from 'react';
import LoginForm from './LoginForm';
import MessageInput from './MessageInput';
import MessageField from './MessageField';
import NavigationHead from './NavigationHead';
import io from 'socket.io-client';


const socket = io('http://localhost:8000'); // connect with server and get socket

function MainWindow() {

  // MAIN STATES AND REFS

  const [username, setUsername] = useState(''); // current username
  const [channelName, setChannelName] = useState(''); // current chat
  const [message, setMessage] = useState(''); // message from input
  const [messages, setMessages] = useState([]); // state of messages from chat
  const [userList, setUserList] = useState([]); // users
  const [loginForm, setLoginForm] = useState(true); // state of autification
  const endRef = useRef(null); // end point

  // RECEIVE FROM SERVER

  useEffect(() => { // actions after rendering
    socket.on('join-user', (user) => {
      const formattedUser = {
        username: user.username,
      };
      setUserList((prevUserList) => [...prevUserList, formattedUser]); // get user, formatted and join to end of user list
    });

    socket.on('receive-message', (data) => {
      const formattedMessage = {
        username: data.username,
        content: data.content,
        timestamp: data.timestamp,
      };
      setMessages((prevMessages) => [...prevMessages, formattedMessage]); // get message, formatted and join to end of message list
    });

    socket.on('update-members', (members) => { // get members of channel
      console.log(members);
      setUserList(members);
      console.log(userList);
    });

    socket.on('update-message', (messages) => { // get messages of channel
      console.log(messages);
      setMessages(messages);
    });

    if (channelName) {
      socket.emit('get-messages', channelName); // send request on get messages always when channelName is changed
    }

    return () => { // cansel all subs 
      socket.off('join-user');
      socket.off('update-members');
      socket.off('receive-message');
      socket.off('update-message');
    };
  }, [channelName, userList]); // check input messages on socket by change of channelName, userList

  // SEND TO SERVER

  const joinChannel = () => {
    if (username && channelName) {
      socket.emit('join-channel', { channel_name: channelName, username: username });
      setLoginForm(false); // hide login form
    }
  };

  const sendMessage = () => {
    if (message.trim() && channelName && username) {  // clear spaces around the message
      const data = {
        content: message,
        channel_name: channelName,
        username,
      };
      socket.emit('send-message', data); // send 'send-message' event to server
      setMessage(''); // сlear input after sending
    }
  };
  
  return (
    <>
      {loginForm && (
        <LoginForm
          username={username}
          setUsername={setUsername}
          setChannelName={setChannelName}
          channelName={channelName}
          joinChannel={joinChannel}
        />
      )}
      {!loginForm && (
        <>
          <NavigationHead
            userList={userList}
            channelName={channelName}
            setUsername = {setUsername}
          />
          <div style={{ paddingBottom: '100px' }}>
            <MessageField messages={messages} endRef={endRef} />
          </div>
          <div ref={endRef} />
          <MessageInput message={message} setMessage={setMessage} sendMessage={sendMessage}/>
        </>
      )}
    </>
  );
}

export default MainWindow;
