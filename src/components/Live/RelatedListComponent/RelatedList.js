import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      height: '100%',
      position: 'relative',
      wordBreak: 'break-all',
    },
    primary: {
        marginLeft: '8px',
        fontSize: '13px',
    },
    secondary: {
        marginLeft: '8px',
        fontSize: '11px',
    },
    itemRoot: {
        marginTop: '6px',
        marginBottom: '6px'
    }
}));

function RelatedList() {
    const classes = useStyles();

    return(
        <div style={{width: '320px', marginLeft:'8px'}}>
            <p style={{ fontSize: "21px", borderBottom: "1px solid", borderColor: "#c2c2c2", gridColumn: "1 / 7", marginTop: '12px', textAlign: 'left', marginLeft: '8px', marginBottom: '2px'}}>관련 영상</p>
            <List className={classes.root}>
                <ListItem key={1} classes={{root: classes.itemRoot}}>
                    <img style={{ width: 120, height: 70 }} alt="About Time (Feat. 기리보이 GIRIBOY, THAMA)" src="https://i.ytimg.com/vi/RvEVDqpPJIs/default.jpg" />
                    <ListItemText classes={{primary : classes.primary, secondary: classes.secondary}} id={1} primary="About Time (Feat. 기리보이 GIRIBOY, THAMA)" secondary="2020-01-12" />
                </ListItem>
                <ListItem key={2} classes={{root: classes.itemRoot}}>
                    <img style={{ width: 120, height: 70 }} alt="Async JS Crash Course - Callbacks, Promises, Async Await" src="https://i.ytimg.com/vi/PoRJizFvM7s/default.jpg" />
                    <ListItemText classes={{primary : classes.primary, secondary: classes.secondary}} id={2} primary="Async JS Crash Course - Callbacks, Promises, Async Await" secondary="2020-02-09" />
                </ListItem>
                <ListItem key={3} classes={{root: classes.itemRoot}}>
                    <img style={{ width: 120, height: 70 }} alt="나플라(nafla) - 새벽에 듣기 좋은 감성+재즈 힙합 모음🌙" src="https://i.ytimg.com/vi/-nq_Urh_Xvk/default.jpg" />
                    <ListItemText classes={{primary : classes.primary, secondary: classes.secondary}} id={3} primary="나플라(nafla) - 새벽에 듣기 좋은 감성+재즈 힙합 모음🌙" secondary="2020-01-25" />
                </ListItem>
            </List>
        </div>
    )
}

export default RelatedList;