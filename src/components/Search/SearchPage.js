import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ArtistSearch from './ArtistSearch';
import MusicSearch from './MusicSearch';
import AlbumSearch from './AlbumSearch';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: 'grid',
        width: '920px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '10px',
        position: 'relative',
        fontFamily: "NanumSquare",
    },
}));

const SearchPage = ({match}) => {
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <p style={{ fontSize: "18px", borderBottom: "1px solid", borderColor: "#c2c2c2", width: "900px", marginBottom: '20px' }}>
                <b>'{match.params.searchWord}'</b>에 대한 검색 결과입니다.
            </p>
            <ArtistSearch searchWord={match.params.searchWord}/>
            <br/>
            <br/>
            <MusicSearch searchWord={match.params.searchWord}/>
            <br/>
            <br/>
            <AlbumSearch searchWord={match.params.searchWord}/>
        </div>
    )
}

export default SearchPage;
