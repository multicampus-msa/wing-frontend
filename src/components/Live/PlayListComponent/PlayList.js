import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import BringPlayListData from './BringPlayListData';
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

function PlayList() {

    const classes = useStyles();
    const [videos,
        setVideos] = useState([]);

    useEffect(() => {
        BringPlayListData({
            key: YOUTUBE_DATA_API_KEY
        }, videos => {
            setVideos(videos)
        });
    }, [])

    return (
        <>
            <div className={classes.wrapperTitle}>
                <p style={{ fontSize: "29px", borderBottom: "1px solid", borderColor: "#c2c2c2", gridColumn: "1 / 7", marginTop: '20px'}}>장르별 영상 목록</p>
            </div>
            <div className={classes.wrapperVideo}>
            {videos.map((video, index) => (
                    <Box key={index} width={220} marginRight={0.6} my={5}>
                        {video ? (
                        <Link to={'/live/videoPlayer/' + video.snippet.resourceId.videoId + '/' + video.snippet.title + '/' + video.snippet.publishedAt}>
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
                                Win:G
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                {video.snippet.publishedAt.substr(0, 10)}
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

export default PlayList;
