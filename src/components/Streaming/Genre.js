import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import axios from 'axios'
import API_URL from "../Constants/API_URL";
import GenreList from "./GenreList";

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 150px);
  grid-template-rows: 65px 240px 65px 240px 65px 240px 65px 240px;
  grid-gap: 1rem 1rem;
  margin-top: 1rem;
  margin-left: 1rem;
  outline: none;
  font-family: "NanumSquare", sans-serif;
  
  .MuiLink-root {
    color: black;
  }
  
  h2, p, #line {
    grid-column: 1 / 4;
  }
  
`
const Genre = () => {

    const [electronicaObject, setElectronicaObject] = useState([]);
    const [popObject, setPopObject] = useState([]);
    const [hiphopObject, setHiphopObject] = useState([]);
    const [rockObject, setRockObject] = useState([]);
    const [isResponseOk, setIsResponseOk] = useState(false);

    useEffect(() => {
        axios.get(API_URL + "/api/music/genre=일렉트로니카")
            .then(res => {
                setElectronicaObject(res.data.slice(0, 5));
            })
            .catch(err => alert(err))

        axios.get(API_URL + "/api/music/genre=팝")
            .then(res => {
                setPopObject(res.data.slice(0, 5));
            })
            .catch(err => alert(err))

        axios.get(API_URL + "/api/music/genre=힙합")
            .then(res => {
                setHiphopObject(res.data.slice(0, 5));
            })
            .catch(err => alert(err))

        axios.get(API_URL + "/api/music/genre=락")
            .then(res => {
                setRockObject(res.data.slice(0, 5));
            })
            .then(() => setIsResponseOk(true))
            .catch(err => alert(err))
    }, [])


    return (
        <>

            <StyledDiv>
                <p style={{
                    fontSize: "29px",
                    gridColumn: "1 / 7",
                    borderBottom: "1px solid",
                    borderColor: "#c2c2c2",
                    width: "900px"
                }}>일렉트로니카</p>
                {
                    isResponseOk ?
                        <GenreList GenreObject={electronicaObject}/>
                        : <span> </span>
                }

                <p style={{
                    fontSize: "29px",
                    gridColumn: "1 / 7",
                    borderBottom: "1px solid",
                    borderColor: "#c2c2c2",
                    width: "900px"
                }}>포크 / 팝 / 발라드</p>

                {
                    isResponseOk ?
                        <GenreList GenreObject={popObject}/>
                        : <span> </span>
                }

                <p style={{
                    fontSize: "29px",
                    gridColumn: "1 / 7",
                    borderBottom: "1px solid",
                    borderColor: "#c2c2c2",
                    width: "900px"
                }}>힙합</p>

                {
                    isResponseOk ?
                        <GenreList GenreObject={hiphopObject}/>
                        : <span> </span>
                }

                <p style={{
                    fontSize: "29px",
                    gridColumn: "1 / 7",
                    borderBottom: "1px solid",
                    borderColor: "#c2c2c2",
                    width: "900px"
                }}>락</p>

                {
                    isResponseOk ?
                        <GenreList GenreObject={rockObject}/>
                        : <span> </span>
                }
                
                <div style={{gridRow: "10", height: "300px"}}> </div>
            </StyledDiv>

        </>
    );
}

export default Genre