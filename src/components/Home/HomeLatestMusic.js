import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { CarouselItem } from "react-bootstrap";
import styled from "styled-components";

const LatestMusicTitleDiv = styled.div`
  grid-row: 2;
  grid-column: 1;
  border-bottom: 1px solid darkgrey;
  font-size: 25px;
  background: linear-gradient( to right, whitesmoke, white);
`

const CarouselDiv = styled.div`
  grid-row: 3;
  grid-column: 1;
`

const HomeLatestMusic = () => {
    return (
        <>
            <LatestMusicTitleDiv><Link to={"/streaming/"}>> 최신음악</Link></LatestMusicTitleDiv>
            <CarouselDiv>
                <Carousel>
                    <CarouselItem>
                        <Link to={'/streaming/album/8'}>
                            <div className="image">
                                <img style={{ width: "450px", height: "450px" }}
                                     alt="test"
                                     src="fantasy.png"/>
                            </div>
                        </Link>
                    </CarouselItem>
                    <CarouselItem>
                        <Link to={'/streaming/album/7'}>
                            <div className="image">
                                <img style={{ width: "450px", height: "450px" }}
                                     alt="test"
                                     src="casker.png"/>
                            </div>
                        </Link>
                    </CarouselItem>
                    <CarouselItem>
                        <Link to={'/streaming/album/9'}>
                            <div className="image">
                                <img style={{ width: "450px", height: "450px" }}
                                     alt="test"
                                     src="woo.png"/>
                            </div>
                        </Link>
                    </CarouselItem>
                </Carousel>
            </CarouselDiv>
        </>
    )
}

export default HomeLatestMusic