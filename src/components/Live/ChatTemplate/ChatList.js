import React, { Component } from 'react';
import socketio from 'socket.io-client';
import ChatListItem from './ChatListItem';
import API_URL from "../../Constants/API_URL";

const socket = socketio.connect(API_URL + ':8007');

class ChatList extends Component {
    
    constructor(props){
        super(props); 
        this.state = {
            logs : []
        }
    }

    componentDidMount(){
        socket.emit('joinRoom', {roomName: this.props.videoId});
        socket.on('message', (data) =>{
            const logs2 = this.state.logs; 
            data.key = 'key_' + (this.state.logs.length + 1); 
            logs2.push(data);   
            this.setState({logs : logs2}); 
        });
    }
    
    componentDidUpdate() {
        socket.emit('joinRoom', {roomName: this.props.videoId});        
    }

    render() {
        return (
            <div style = {{backgroundColor : '#f2f2f2', marginBottom:'15px', height : '450px'}}>
                <ChatListItem logs={this.state.logs}/>
            </div>
        );
    }
}

export default ChatList;
