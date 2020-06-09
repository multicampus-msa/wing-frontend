import React, {useEffect, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      position: 'relative',
      overflow: 'auto',
      height: '100%',
    },
}));

const ChatListItem = ({logs}) => {
    const classes = useStyles();
    const listEl = useRef(null);

    useEffect(() => {
        listEl.current.scrollTo(0, listEl.current.scrollHeight)
    })

    return (
        <List className={classes.root} ref={listEl}>
            {
                logs.map((value) => (
                    <ListItem key={value.key}>
                        <ListItemAvatar>
                            <Avatar src={value.imageUrl} />
                        </ListItemAvatar>
                        <ListItemText id={value.key} primary={value.name} secondary={value.message} />
                    </ListItem>
                ))
            }
        </List>
    );
}

export default ChatListItem;
