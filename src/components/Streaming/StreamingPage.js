import React from 'react'
import Button from "@material-ui/core/Button";
import { Switch, Link, Route } from "react-router-dom";
import Recommend from "./Recommend";
import StreamingMain from "./StreamingMain";
import Genre from "./Genre";
import styled from "styled-components";
import ArtistDetailPage from "./Artist/ArtistDetailPage";
import AlbumDetailPage from "./Album/AlbumDetailPage";
import MusicDetailPage from "./Music/MusicDetailPage";

const StyledDiv = styled.div`
  display: grid;
  justify-content: center;
  grid-template-rows: 70px 100px;
  grid-template-columns: repeat(7, 100px);
  grid-gap: 0 2rem;
 
  
  .MuiButton-root {
    justify-content: center;
    width: 120px;
    font-size: 1.2rem;
    font-weight: bolder;
    font-family: "NanumSquare", sans-serif;
    background: whitesmoke;
  }
`

const StreamingPage = () => {

    return (
        <Switch>
            <StyledDiv>
                <Link style={{gridColumn: "1 / 2"}} to={'/Streaming'}>
                    <Button>최신음악</Button>
                </Link>
                <Link style={{gridColumn: "2 / 3"}}to={'/Streaming/recommend'}>
                    <Button>취향저격</Button>
                </Link>
                <Link style={{gridColumn: "3 / 4"}}to={'/Streaming/genre'}>
                    <Button>장르</Button>
                </Link>

                <div style={{ gridRow: "2 / 3"}}>
                    <Route exact path={'/Streaming/'} component={StreamingMain}/>
                    <Route exact path={'/Streaming/recommend'} component={Recommend}/>
                    <Route exact path={'/Streaming/genre'} component={Genre}/>
                    <Route exact path={'/Streaming/artist/:id'} component={ArtistDetailPage}/>
                    <Route exact path={'/Streaming/album/:id'} component={AlbumDetailPage}/>
                    <Route exact path={'/Streaming/music/:id'} component={MusicDetailPage}/>
                </div>
            </StyledDiv>
        </Switch>
    )
};


export default StreamingPage



