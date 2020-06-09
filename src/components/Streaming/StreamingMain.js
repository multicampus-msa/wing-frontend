import React, { useContext, useEffect, useState } from "react";
import Carousel from 'react-bootstrap/Carousel'
import styled from 'styled-components'
import axios from "axios";
import API_URL from "../Constants/API_URL";
import MusicTable from "./MusicTable";
import UserContext from "../Context/UserContext";

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 150px 150px 150px 150px 150px 150px;
  grid-template-rows: 65px 300px 100px 300px 300px 600px;
  margin-top: 1rem;
  margin-left: 1rem;
  font-family: "NanumSquare", sans-serif;
  
`

const StreamingMain = () => {

    const [isResponseOk, setIsResponseOk] = useState(false);
    const [recommendObject, setRecommendObject] = useState([]);
    const userState = useContext(UserContext);

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
        <div style={{ gridRow: "1 / 4", gridColumn: "2 / 8", fontFamily: "NanumBarunGothic"}}>
            <StyledDiv>
                <p style={{ fontSize: "29px", borderBottom: "1px solid", borderColor: "#c2c2c2", gridColumn: "1 / 7"}}>{userState.name} 님에게 추천하는 따끈따끈한 최신 추천 음악</p>
                <Carousel interval={4000} style={{ gridColumn: "1 / 7" }}>
                    <Carousel.Item>
                        <img style={{ width: "300px", height: "300px" }}
                             alt="test"
                             src="https://img.etnews.com/news/article/2018/02/20/article_20171249540608.gif"/>
                        <img style={{ width: "300px", height: "300px" }}
                             alt="test"
                             src="https://image.genie.co.kr/Y/IMAGE/IMG_MUZICAT/IV2/Genie_Magazine/7866/Mgz_Main_Top_20191231112651.jpg"/>
                        <img style={{ width: "300px", height: "300px" }}
                             alt="test"
                             src="data:image/jpeg;base64,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"/>
                        <Carousel.Caption>
                            <span style={{ background: "rgba(0, 0, 0, 0.5)", fontSize: "25px", fontWeight: "bold" }}>당신의 귀를 달달하게 해줄 3인의 음악</span>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img style={{ width: "300px", height: "300px" }}
                             alt="test"
                             src="http://image.xportsnews.com/contents/images/upload/article/2013/0724/1374660073655.jpg"/>
                        <img style={{ width: "300px", height: "300px" }}
                             alt="test"
                             src="https://img.hani.co.kr/imgdb/resize/2017/0317/148964211022_20170317.JPG"/>
                        <img style={{ width: "300px", height: "300px" }}
                             alt="test"
                             src="https://t1.daumcdn.net/liveboard/melon_magazine/dd06958b0a2e48b98aaa0e1c16b03532.png"/>
                        <Carousel.Caption>
                            <span style={{ background: "rgba(0, 0, 0, 0.5)", fontSize: "25px", fontWeight: "bold" }}>요즘 힙합, 인디씬에서 핫한 아티스트들의 신보</span>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>



                <p style={{ fontSize: "29px", borderBottom: "1px solid", borderColor: "#c2c2c2", gridColumn: "1 / 7", marginTop: "2rem"}}>최신음악</p>

                <div style={{ gridColumn: "1 / 7"}}>
                {
                    isResponseOk ? <MusicTable musicList={recommendObject}/> : <span> </span>
                }
                </div>
                <div style={{gridRow: "6"}}> </div>
            </StyledDiv>
        </div>
    )
}

export default StreamingMain