import React from 'react'
import styled from "styled-components";
import { Link } from "react-router-dom";

const TitleDiv = styled.div`
  grid-row: 2;
  grid-column: 2;
  border-bottom: 1px solid darkgrey;
  font-size: 25px;
  background: linear-gradient( to right, whitesmoke, white);
`

const SupportSampleDiv = styled.div`
  grid-row: 3;
  grid-column: 2;
  background: black;

`
const HomeSupport = () => {
    return (
        <>
            <TitleDiv><Link to={"/support"}>> 뮤지션 후원하기</Link></TitleDiv>
            <SupportSampleDiv>
                <Link to={"/support/detail/21"}>
                    <img src="support_weare.png"
                         alt="support"
                         style={{ width: "450px", height: "450px" }}
                    />
                </Link>
            </SupportSampleDiv>
        </>
    )
}

export default HomeSupport