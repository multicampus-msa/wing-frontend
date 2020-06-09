import React from 'react';
import ChatList from './ChatList'; 
import ChatInput from './ChatInput'; 

const ChatBar = ({videoId}) => { 

    console.log(videoId);

    return (
        <div style={{display: 'flex', flexDirection:'column', width: '300px', marginLeft:'12px'}}>
            <ChatList videoId={videoId}/>
            <ChatInput videoId={videoId}/>
        </div>
    ); 
}

export default ChatBar; 
