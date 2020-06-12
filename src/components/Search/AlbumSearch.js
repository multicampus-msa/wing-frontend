import React, {useState, useEffect} from 'react';
import API_URL from "../Constants/API_URL";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    wrapperBody: {
        display: 'flex',
        marginTop: '10px',
    },
    wrapper: {
        display: 'flex',
        overflow: 'auto',
        width: '920px',
        padding: '5px 0',
        borderBottom: '1px solid #ccc',
    },
    wrapperInfo: {
        float: 'left',
        width: '185px',
        minHeight: '110px',
        marginLeft: '18px',
        padding: '0 20px 10px 0',
        display: 'grid',
    },
    wrapperText: {
        display: 'block',
        fontSize: '15px',
    },
    image: {
        display: 'block',
        width: '112px',
        height: '112px',
    },
    albumName: {
        fontSize: '17px',
        fontWeight: 'bold',
        marginBottom: '3px',
    },
}));

const AlbumSearch = ({searchWord}) => {

    const classes = useStyles();
    const [albumList, setAlbumList] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get(API_URL + "/api/album?", {
            params: {
                'name': searchWord
            }
        })
            .then(res => {
                setAlbumList(res.data)
            })
            .catch(err => alert(err))
    }, [searchWord])

    return (
        <>
            <p style={{ fontSize: "28px", borderBottom: "1px solid", borderColor: "#c2c2c2", width: "900px" }}><b>앨범</b> ({albumList.length})</p>
            {
                albumList.length === 0 ? (
                    <p style={{ fontSize: "18px", borderBottom: "1px solid", borderColor: "#c2c2c2", width: "900px", marginBottom: '20px' }}>
                        <b>'{searchWord}'</b>(으)로 검색한 결과가 없습니다.
                    </p>
                ) : (
                    <div className={classes.wrapper}>
                        {albumList.slice(0, 3).map((album) => {
                            return (
                                <div className={classes.wrapperBody}>
                                    <Link to={`/streaming/album/${album.albumId}`}
                                        style={{ color: 'green' }}
                                    >
                                        <img className={classes.image}
                                            src={album.imageUri}
                                            alt="profileImage"
                                        />
                                    </Link>
                                    <div className={classes.wrapperInfo}>
                                        <Link to={`/streaming/album/${album.albumId}`}
                                            style={{ color: 'green' }}
                                        >
                                            <div className={classes.albumName}>{album.albumName}</div>
                                        </Link>
                                        <div className={classes.wrapperText}>
                                            <div>{album.date}</div>
                                        </div>
                                        <div className={classes.wrapperText}>
                                            <div>{album.albumGenre}</div>
                                        </div>
                                        <div className={classes.wrapperText}>
                                            <div>{album.company}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )
            }
        </>
    )
}

export default AlbumSearch;
