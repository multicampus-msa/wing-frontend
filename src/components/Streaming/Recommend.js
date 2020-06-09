import React, { useContext, useEffect, useState } from "react"
import axios from "axios";
import { Link as MuiLink } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom"
import styled from "styled-components";
import API_URL from "../Constants/API_URL";

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 320px 320px 320px;
  grid-template-rows: 65px 65px 350px 350px 350px 400px;
  grid-gap: 1rem 1rem;
  margin-top: 1rem;
  margin-left: 1rem;
  outline: none;
  font-family: "NanumSquare", sans-serif;
    
  h2, p, #line {
    grid-column: 1 / 4;
  }
  
  img {
    transition: .3s;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  
  img:hover {
    -ms-transform: scale(1.1,1.1);
    -webkit-transform: scale(1.1,1.1);
    transform: scale(1.1,1.1);
   }
  
  .img_description:hover {
    visibility: visible;
    opacity: 1;
  }
`

const Recommend = () => {
    const [isResponseOk, setIsResponseOk] = useState(false);
    const [recommendObject, setRecommendObject] = useState([]);

    useEffect(() => {
        axios.get(API_URL + "/api/music/name=")
            .then(res => {
                setRecommendObject(res.data.slice(0, 9));
                setIsResponseOk(true);
            })
            .catch(err => {
                alert(err)
            })


    }, [])

    return (
        <StyledDiv>
            <p style={{ fontSize: "29px", borderBottom: "1px solid", borderColor: "#c2c2c2", width: "900px" }}>취향에 가까운 음악을 추천합니다</p>
            <p style={{ fontSize: "20px", marginTop: "1rem" }}>사용자의 음악 청취 패턴, 선호 장르를 종합한 결과입니다</p>
            {
                isResponseOk ? recommendObject.map((music, index) => {
                        return (
                            <div style={{
                                gridColumn: `${(index % 3) + 1} / ${(index % 3) + 2}`,
                                width: "300px",
                                height: "370px",
                                marginRight: "1rem",
                                marginBottom: "1rem"
                            }}
                            >
                                <MuiLink
                                    id="imgWrapper"
                                    href={music.fileUri}>
                                    <img alt="앨범 이미지" style={{ width: "200px", height: "200px" }} src={music.albumImage}/>
                                    <br/>
                                </MuiLink>
                                <div style={{ fontSize: "22px" }}>
                                    <RouterLink style={{ color: "grey" }} to={"/streaming/album/" + music.albumId}>
                                        {music.albumName}
                                    </RouterLink>
                                </div>
                                <span style={{ color: "grey", fontSize: "19px" }}>
                                        {music.artistList.map(obj => {
                                            return (
                                                <RouterLink style={{ color: "grey" }}
                                                            to={"/streaming/artist/" + obj.artistId}>
                                                    {obj.artistName}
                                                </RouterLink>
                                            )
                                        })}
                                    <RouterLink style={{ color: "grey" }} to={"/streaming/music/" + music.musicId}>
                                        <p>{music.musicName}</p>
                                    </RouterLink>
                                </span>

                            </div>
                        )
                    })
                    : <div id="loading">loading..</div>
            }
            <div style={{gridRow: "6"}}> </div>
        </StyledDiv>
    )
}

export default Recommend