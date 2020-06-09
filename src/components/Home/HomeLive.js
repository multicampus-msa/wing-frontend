import React from 'react'
import styled from "styled-components";
import { Link } from "react-router-dom";

const TitleDiv = styled.div`
  margin-top: 2rem;
  background: linear-gradient( to right, whitesmoke, white);
  grid-row: 4;  
  grid-column: 1;
  border-bottom: 1px solid darkgrey;
  font-size: 25px;
`

const LiveSampleDiv = styled.div`
  grid-row: 5;
  grid-column: 1;
  background: green;

`

const HomeLive = () => {
    return (
        <>
            <TitleDiv>
                <Link to={"/live"}>> Live Now!</Link>
            </TitleDiv>
            <LiveSampleDiv>
                {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                <iframe width="450" height="450" src="https://www.youtube.com/embed/L-tuKezAciU" frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen/>
            </LiveSampleDiv>
        </>
    )
}

export default HomeLive