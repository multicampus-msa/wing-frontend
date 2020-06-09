import React from 'react';
import styled from 'styled-components'
import HomeLatestMusic from "./HomeLatestMusic";
import HomeSupport from "./HomeSupport";
import HomeLive from "./HomeLive";
import HomeConcert from "./HomeConcert";

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 450px);
  grid-template-rows: 100px 45px 450px 60px 450px 200px;
  grid-gap: 1rem 5rem;
  justify-content: center;
  align-items: center;
  font-family: "NanumSquare", sans-serif;
  font-weight: bold;
  

  a {
    color: black;
  }
  
  .image {
    background: black;
  }
  
  img:hover {
    transition: .4s;
    opacity: 0.7;
  }


`

const Title = styled.p`
  padding-top: 1rem;
  padding-bottom: 1rem;
  text-align: center;
  grid-column: 1 / 3;
  font-size: 29px;
  font-weight: bold;
  color: black;
  border: 3px solid black;
`

const Footer = styled.div`
  grid-row: 6;
  grid-column: 1 / 3;

`


const HomePage = () => {
    return (
        <StyledDiv>
            <Title>Win:G는 인디 아티스트들을 위한 플랫폼 입니다.</Title>
            <HomeLatestMusic/>
            <HomeSupport/>
            <HomeLive/>
            <HomeConcert/>
            <Footer/>
        </StyledDiv>
    );

}
export default HomePage;