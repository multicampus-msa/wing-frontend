import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import YouTube from 'react-youtube';

const useStyles = makeStyles((theme) => ({
    wrapperBody: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '10px',
        textAlign: 'center',
        width: '1400px',
        display: 'flex',
        flexWrap: 'wrap',
        fontFamily: "NanumSquare"
    },
    wrapperTitle: {
        marginBottom: '10px',
        width: '900px',
        fontFamily: "NanumSquare",
    },
    text: {
        textAlign: 'left',
        wordBreak: 'break-all',
    },
    wrapperVideo: {
        textAlign: 'left',
    },
    videoTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginTop: '10px',
        wordBreak: 'break-all',
        width: '640px',
    },
}));

function VideoPlayer({match}) {

    const classes = useStyles();
    
    return (
        <>
            <div className={classes.wrapperTitle}>
                <p style={{ fontSize: "29px", borderBottom: "1px solid", borderColor: "#c2c2c2", gridColumn: "1 / 7", marginTop: '20px'}}>장르별 영상</p>
            </div>
            <div className={classes.wrapperBody}>
                <div className={classes.wrapperVideo}>
                    <YouTube videoId={match.params.videoId} />
                    <p className={classes.videoTitle}>{match.params.title}</p>
                    <p>{match.params.date.substr(0, 10)}</p>
                </div>
            </div>
        </>
    );
}

export default VideoPlayer;
