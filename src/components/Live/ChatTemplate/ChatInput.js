import React, {useState, useContext} from 'react';
import socketio from 'socket.io-client';
import UserContext from "../../Context/UserContext";

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
    root: {
      padding: '2px 4px',
      display: 'block',
      alignItems: 'center',
      width: '270px',
      fontFamily: "NanumSquare",
    },
    name: {
        fontSize: '14px',
        marginLeft: '8px',
        textAlign: 'left',
    },
    inputWrapper: {
        display: 'flex',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
}));

const ChatInput = ({videoId}) => {
    const classes = useStyles();
    const [message, setMessage] = useState('');
    const userState = useContext(UserContext);

    const handleChange = (e) =>{ // input 창 입력 변화 이벤트 처리 
        setMessage(e.target.value); 
    }
    
    const handleClick = () => { // 보내기 버튼 클릭 시 이벤트 처리 
        if (userState.name === '') {
            alert('로그인이 필요한 기능입니다.')
        }
        else if (message === '') {
            alert('메시지를 입력하세요.')
        }
        else {
            const socket = socketio.connect('http://localhost:3001');
            socket.emit('joinRoom', {roomName: videoId});
            const {name, imageUrl} = userState;
            socket.emit('message', {name : name, message : message, imageUrl: imageUrl}); 
        }
        setMessage('');
    }

    const handleKeypress = (e) => { // 엔터를 이용하여 전송할 경우 이벤트 처리 
        if(e.key === 'Enter'){
            handleClick();
        }
    }

    return (
        <div style={{display: 'flex'}}>
            <Avatar src={userState.imageUrl} style={{width: '45px', height: '45px', marginLeft: '5px', marginTop: '5px'}}/>
            <div className={classes.root}>
                <div className={classes.name}>
                    {
                        userState.name === '' ? 'Unknown User' : userState.name  
                    }
                </div>
                <div className={classes.inputWrapper}>
                    <InputBase
                        className={classes.input}
                        placeholder="메시지를 입력하세요"
                        value={message}
                        onChange={handleChange}
                        onKeyPress={handleKeypress}
                    />
                    <IconButton className={classes.iconButton} aria-label="send" onClick={handleClick}>
                        <SendIcon />
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default ChatInput;
