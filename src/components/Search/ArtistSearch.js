import React, {useState, useEffect} from 'react';
import API_URL from "../Constants/API_URL";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: 'block',
        padding: '5px 0',
        borderBottom: '1px solid #ccc',
    },
    wrapperBody: {
        display: 'flex',
    },
    wrapperInfo: {
        float: 'left',
        width: '511px',
        minHeight: '220px',
        marginLeft: '24px',
        marginTop: '10px',
        padding: '0 24px 19px 0',
        display: 'block',
    },
    wrapperText: {
        display: 'block',
        marginBottom: '5px',
    },
    image: {
        display: 'block',
        width: '208px',
        height: '208px',
    },
    artistName: {
        fontSize: '22px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },

    wrapperSubBody: {
        display: 'flex',
        marginTop: '10px',
    },
    subWrapper: {
        display: 'flex',
        overflow: 'auto',
        width: '920px',
        padding: '5px 0',
        borderBottom: '1px solid #ccc',
    },
    wrapperSubInfo: {
        float: 'left',
        width: '185px',
        minHeight: '110px',
        marginLeft: '18px',
        marginTop: '5px',
        padding: '0 20px 10px 0',
        display: 'grid',
    },
    wrapperSubText: {
        display: 'block',
        fontSize: '15px',
        marginBottom: '3px',
    },
    subImage: {
        display: 'block',
        width: '112px',
        height: '112px',
    },
    subArtistName: {
        fontSize: '17px',
        fontWeight: 'bold',
        marginBottom: '7px',
    },
}));

const ArtistSearch = ({searchWord}) => {

    const classes = useStyles();
    const [artistList, setArtistList] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get(API_URL + "/api/artist?", {
            params: {
                'name': searchWord
            }
        })
            .then(res => {
                setArtistList(res.data)
            })
            .catch(err => alert(err))
    }, [searchWord])

    return (
        <>
            <p style={{ fontSize: "28px", borderBottom: "1px solid", borderColor: "#c2c2c2", width: "900px" }}><b>아티스트</b> ({artistList.length})</p>
            {
                artistList.length === 0 ? (
                    <p style={{ fontSize: "18px", borderBottom: "1px solid", borderColor: "#c2c2c2", width: "900px", marginBottom: '20px' }}>
                        <b>'{searchWord}'</b>(으)로 검색한 결과가 없습니다.
                    </p>
                ) : (
                    <>
                        <div className={classes.wrapper}>
                            <div className={classes.wrapperBody}>
                                <Link to={`/streaming/artist/${artistList[0].artistId}`}
                                    style={{ color: 'green' }}
                                >
                                    <img className={classes.image}
                                        src={artistList[0].imageUri}
                                        alt="profileImage"
                                    />
                                </Link>
                                <div className={classes.wrapperInfo}>
                                    <Link to={`/streaming/artist/${artistList[0].artistId}`}
                                        style={{ color: 'green' }}
                                    >
                                        <div className={classes.artistName}>{artistList[0].artistName}</div>
                                    </Link>
                                    <div className={classes.wrapperText}>
                                        <div><b>Debut</b></div>
                                        <div>{artistList[0].debutDate}</div>
                                    </div>
                                    <div className={classes.wrapperText}>
                                        <div><b>Genre</b></div>
                                        <div>{artistList[0].artistGenre}</div>
                                    </div>
                                    <div className={classes.wrapperText}>
                                        <div><b>Company</b></div>
                                        <div>{artistList[0].artistCompany}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.subWrapper}>
                            {artistList.slice(1).map((artist) => {
                                return (
                                    <div className={classes.wrapperSubBody}>
                                        <Link to={`/streaming/artist/${artist.artistId}`}
                                            style={{ color: 'green' }}
                                        >
                                            <img className={classes.subImage}
                                                src={artist.imageUri}
                                                alt="profileImage"
                                            />
                                        </Link>
                                        <div className={classes.wrapperSubInfo}>
                                            <Link to={`/streaming/artist/${artist.artistId}`}
                                                style={{ color: 'green' }}
                                            >
                                                <div className={classes.subArtistName}>{artist.artistName}</div>
                                            </Link>
                                            <div className={classes.wrapperSubText}>
                                                <div>{artist.debutDate}</div>
                                            </div>
                                            <div className={classes.wrapperSubText}>
                                                <div>{artist.artistGenre}</div>
                                            </div>
                                            <div className={classes.wrapperSubText}>
                                                <div>{artist.artistCompany}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </>
                )
            }
        </>
    )
}

export default ArtistSearch;
