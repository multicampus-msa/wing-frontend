import React, {useState, useEffect} from 'react';
import {makeStyles ,withStyles} from '@material-ui/core/styles';
import axios from 'axios';
import API_URL from "../Constants/API_URL";
import ConcertTab from './ConcertTab';
import { Button } from '@material-ui/core';
import {purple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: 'block',
        width: '1200px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '10px',
        position: 'relative',
        fontFamily: "NanumSquare",
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    line: {
        borderWidth: '2px',
    },
    image: {
        width: '430px',
        height: '550px',
        float: 'left',
        marginBottom: '5px',
    },
    concertInfo: {
        width: '600px',
        height: '520px',
        display: 'block',
        float: 'left',
        marginLeft: '100px',
    },
    tab: {
        display: 'block'
    },
    infoTitle: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: '25px',
    },
    infoText: {
        textAlign: 'left',
        fontSize: '21px',
        padding: '0px 5px',
    },
    button: {
        float: 'right',
        
    },
    margin: {
        margin: theme.spacing(1),
        fontWeight: 'bold',
        fontFamily: "NanumSquare",
        fontSize: '20px',
    },
}));

const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[200]),
      backgroundColor: purple[200],
      size: 'large',
      '&:hover': {
        backgroundColor: purple[300],
        transform: 'scale(1.03)',
      },
    },
}))(Button);


const ConcertDetail = ({match}) => {
    const classes = useStyles();
    const [concert, setConcert] = useState({});

  
    useEffect(() => {
      axios.get(API_URL + '/api/concert/' + match.params.concertId)
        .then(res => setConcert(res.data));
        window.scrollTo(0,0);
    }, [match.params.concertId]);


    return (
        <>
            <div className={classes.wrapper}>
                <h2 className={classes.title}>{concert.concertName}</h2>
                <hr className={classes.line}/>
                <img className={classes.image} src={concert.imageUri} alt="공연포스터이미지"/>
                <div className={classes.concertInfo}>
                    <p className={classes.infoTitle}>공연날짜</p>
                    <hr className={classes.line}/>
                    <p className={classes.infoText}>
                        {
                            concert.dateStart !== undefined ? (
                                <p>콘서트기간 : {concert.dateStart.split("T",1)} ~ {concert.dateEnd.split("T",1)}</p>
                            )
                            :
                            <span>loading..</span>
                        }
                    </p>
                    <p className={classes.infoTitle}>공연설명</p>
                    <hr className={classes.line}/>
                    <p className={classes.infoText}>{concert.description}</p>
                    <p></p>
                </div>
                    <div className={classes.button}>
                        <ColorButton size="large" variant="contained" color="secondary" className={classes.margin} href={concert.ticketUri}>
                            예매하기
                        </ColorButton>
                    </div>
                <ConcertTab className={classes.tab} place={concert.place} artistList={concert.artistList} />


            </div>
        </>
    )
};

export default ConcertDetail;
