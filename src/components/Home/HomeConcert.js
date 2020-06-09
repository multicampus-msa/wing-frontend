import React from 'react'
import styled from "styled-components";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { CarouselItem } from "react-bootstrap";

const TitleDiv = styled.div`
  margin-top: 2rem;
  grid-row: 4;
  grid-column: 2;
  border-bottom: 1px solid darkgrey;
  font-size: 25px;
  background: linear-gradient( to right, whitesmoke, white);
`

const ConcertSampleDiv = styled.div`
  grid-row: 5;
  grid-column: 2;
  background: darkblue;

`

const HomeConcert = () => {
    return (
        <>
            <TitleDiv><Link to={"/concert"}>> 공연 정보</Link></TitleDiv>
            <ConcertSampleDiv>
                <Carousel interval={6000}>
                    <CarouselItem>
                        <Link to={'/concert/detail/2'}>
                            <div className="image">
                                <img style={{ width: "450px", height: "450px" }}
                                     alt="jannabi"
                                     src="jancon.png"/>
                            </div>
                        </Link>
                    </CarouselItem>
                    <CarouselItem>
                        <Link to={'/concert/detail/3'}>
                            <div className="image">
                                <img style={{ width: "450px", height: "450px" }}
                                     alt="test"
                                     src="garionconcert.png"/>
                            </div>
                        </Link>
                    </CarouselItem>
                </Carousel>
            </ConcertSampleDiv>
        </>
    )
}

export default HomeConcert