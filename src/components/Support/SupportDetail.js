import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import axios from 'axios';
import YouTube from 'react-youtube';
import SupportTable from './SupportTable'
import API_URL from "../Constants/API_URL";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: 'grid',
        width: '1080px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '10px',
        position: 'relative',
        fontFamily: "NanumSquare",
    },
    root: {
        justifyContent: 'center'
    },
    body: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '10px',
        textAlign: 'center',
        width: '1080px',
        display: 'block',
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'NanumSquare',
    },
    line: {
        borderWidth: '2px',
    },
    video: {
        margin: '20px 5px',
        display: 'grid',
        float: 'left',
    },
    supportInfo: {
        width: '360px',
        height: '350px',
        display: 'block',
        float: 'left',
        justifyContent: 'left',
        margin: '10px 30px',
    },
    infoTitle: {
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: '25px',
    },
    infoText: {
        textAlign: 'left',
        fontSize: '21px',
        padding: '0px 5px',
    },
    tableWrapper: {
        display: 'block',
        width: '1080px',
        height: '600px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '10px',
        position: 'relative',
    }
}));

function SupportDetail({match}) {
    const classes = useStyles();
    const [artist, setArtist] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [supporterNum, setSupporterNum] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get(API_URL + "/api/artist/" + match.params.artistId)
            .then(res => setArtist(res.data))
            .catch(err => alert(err));
        
        axios.get(API_URL + ":8005/api/support/artist/" + match.params.artistId)
            .then(res => {setTotalAmount(res.data.reduce((pre, item) => {
                return pre += item.amount;
            }, 0)); return res})
            .then(res => {
                let set = new Set();
                res.data.map((item) => set.add(item.userName))
                setSupporterNum(set.size)
            })
            .catch(err => alert(err));

    }, [match.params.artistId])

    return (
        <div className={classes.wrapper}>
            <div className={classes.body}>
            <h2 className={classes.title}>아티스트 후원하기</h2>
            <hr className={classes.line}/>
                <YouTube className={classes.video} videoId={artist.video} height='390' width='640'/>
                <div className={classes.supportInfo}>
                    <p className={classes.infoTitle}>아티스트 정보</p>
                    <hr className={classes.line}/>
                    <p className={classes.infoText}>{artist.artistName}</p>
                    <p className={classes.infoText}>{artist.artistGenre} / {artist.artistCompany}</p>
                    <br/>
                    <p className={classes.infoTitle}>이번 달 후원 상황</p>
                    <hr className={classes.line}/>
                    <p className={classes.infoText}><b>{totalAmount.toLocaleString('en-US')}</b>원 후원</p>
                    <p className={classes.infoText}><b>{supporterNum}</b>명의 서포터</p>
                    <Link to={`/support/payment/${artist.artistId}`}>
                        <Button variant="contained" fullWidth="true">
                            후원하기
                        </Button>
                    </Link>
                </div>
            </div>
            <br/>
            <div className={classes.tableWrapper}>
                <p className={classes.infoTitle}>아티스트 후원 상세 정보</p>
                <hr className={classes.line}/>
                <SupportTable artistId={match.params.artistId}/>
            </div>
        </div>
    );
}

export default SupportDetail;
