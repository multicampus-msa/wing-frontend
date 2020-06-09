import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import BringLiveListData from './BringLiveListData';
import { Link } from "react-router-dom";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import YOUTUBE_DATA_API_KEY from "../../Constants/YOUTUBE_DATA_API_KEY";

const useStyles = makeStyles((theme) => ({
    wrapperVideo: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '10px',
        textAlign: 'center',
        width: '900px',
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
    }
}));

function LiveList() {

    const classes = useStyles();
    const [videos,
        setVideos] = useState([]);

    useEffect(() => {
        BringLiveListData({
            key: YOUTUBE_DATA_API_KEY
        }, videos => {
            setVideos(videos)
        });
    }, [])

    return (
        <>
            <div className={classes.wrapperTitle}>
                <p style={{ fontSize: "29px", borderBottom: "1px solid", borderColor: "#c2c2c2", gridColumn: "1 / 7", marginTop: '20px'}}>라이브 영상 목록</p>
            </div>
            <div className={classes.wrapperVideo}>
                {videos.map((video, index) => (
                    <Box key={index} width={220} marginRight={0.6} my={5}>
                        {video ? (
                        <Link to={'/live/livePlayer/' + video.id.videoId + '/' + video.snippet.title}>
                            <img style={{ width: 220, height: 124 }} alt={video.snippet.title} src={video.snippet.thumbnails.default.url} />
                        </Link>
                        ) : (
                        <Skeleton variant="rect" width={220} height={124} />
                        )}

                        {video ? (
                        <div className={classes.text}>
                            <Box pr={2}>
                            <Typography gutterBottom variant="body2">
                                {video.snippet.title}
                            </Typography>
                            <Typography display="block" variant="caption" color="textSecondary">
                                {/* {video.snippet.channelTitle} */}
                                Wing:G
                            </Typography>
                            <Typography variant="caption" color="error" style={{border: 'solid', borderWidth: '1px'}}>
                                {/* {video.snippet.publishedAt} */}
                                실시간 스트리밍 중
                            </Typography>
                            </Box>
                        </div>
                        ) : (
                        <Box pt={0.5}>
                            <Skeleton />
                            <Skeleton width="60%" />
                        </Box>
                        )}
                    </Box>
                ))}
            </div>
        </>
    )
}

export default LiveList;