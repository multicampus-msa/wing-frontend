import React, { useEffect, useState } from 'react'
import axios from "axios";
import API_URL from "../../Constants/API_URL";
import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

const ContentDiv = styled.div`
  font-size: 25px;
 
`
const TitleDiv = styled.div`
  border-bottom: 1px solid;
  
`

const MusicDetailForm = ({ id }) => {

    const [musicObject, setMusicObject] = useState({});
    const [isResponseOk, setIsResponseOk] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get(API_URL + "/api/music/" + id)
            .then(res => {
                setMusicObject(res.data);
                setIsResponseOk(true);
            })
    }, [id])


    return (
        <>
            <div style={{
                outline: "none",
                gridColumn: "1 / 5",
                marginTop: "1rem",
                fontSize: "32px",
                fontWeight: "bold"
            }}>
                <TitleDiv>
                    Music
                </TitleDiv>
            </div>
            {
                isResponseOk ?
                    <>
                        <div style={{ gridRow: "2 / 6", gridColumn: "1 / 3" }}>
                            <img style={{ width: "350px", height: "350px" }}
                                 src={musicObject.albumImage}
                                 alt="albumImage"
                            />
                        </div>
                        <div style={{ gridColumn: "3 / 5", fontSize: "33px", fontWeight: "bold" }}>
                            {musicObject.musicName}
                            <br/>
                            {musicObject.artistList.map(obj => {
                                return (
                                    <p style={{ fontSize: "22px" }}>
                                        <RouterLink
                                            style={{ color: "Green" }}
                                            to={"/streaming/artist/" + obj.artistId}>
                                            {obj.artistName}
                                        </RouterLink>
                                    </p>
                                )
                            })}
                        </div>
                        <ContentDiv style={{ marginTop: "2rem" }}>Genre</ContentDiv>
                        <ContentDiv style={{ marginTop: "2rem" }}>{musicObject.musicGenre}</ContentDiv>
                        <ContentDiv>Album</ContentDiv>
                        <ContentDiv>
                            <p style={{ fontSize: "22px" }}>
                                <RouterLink
                                    style={{ color: "Green" }}
                                    to={"/streaming/album/" + musicObject.albumId}>
                                    {musicObject.albumName}
                                </RouterLink>
                            </p>
                        </ContentDiv>
                        <ContentDiv style={{ marginTop: "-2rem" }}> </ContentDiv>
                        <ContentDiv style={{ marginTop: "-2rem" }}> </ContentDiv>

                        <div style={{ fontSize: "33px", fontWeight: "bold", gridColumn: "1 / 5" }}>
                            <TitleDiv>
                                Lyrics
                            </TitleDiv>
                        </div>
                        <div style={{ fontSize: "18px", gridColumn: "1 / 5" }}>
                            {musicObject.lyrics.split('\\r\\n').map( line => {
                                return (<span>{line}<br/></span>)
                            })}
                        </div>

                        <div className="footer" style={{display: "absolute", bottom: "100%", width: "100%", height: "200px"}}> </div>
                    </>

                    :

                    <span>로딩중~</span>
            }
        </>

    )
}

export default MusicDetailForm