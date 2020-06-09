import { Link } from "react-router-dom";
import { Link as MuiLink } from '@material-ui/core'
import React from "react";


const GenreList = ({ GenreObject }) => {

    return (
        GenreObject.map(music => {
            return (
                <div style={{ marginLeft: "2rem" }}>
                    <Link to={'/streaming/album/' + music.albumId}>
                        <img style={{ width: "100px", height: "100px" }}
                             alt="test"
                             src={music.albumImage}/>
                    </Link>
                    {
                        music.artistList.map(artist => {
                            return (
                                <p style={{ marginTop: "1rem", width: "130px" }}>
                                    <Link style={{ fontSize: "18px", color: "black" }}
                                          to={"/streaming/artist/" + artist.artistId}>{artist.artistName}</Link>
                                </p>
                            )
                        })
                    }
                    <MuiLink style={{color: "black"}} href={music.fileUri}>
                        <p style={{ width: "130px" }}>{music.musicName}</p>
                    </MuiLink>
                </div>
            )
        })
    )
}

export default GenreList