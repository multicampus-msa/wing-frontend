// 메뉴와 리스트 컴포넌트를 모두 감싸는 컴포넌트 
import React from 'react';
import Button from "@material-ui/core/Button";
import { Switch, Link, Route } from "react-router-dom";
import LiveList from './LiveListComponent/LiveList';
import PlayList from './PlayListComponent/PlayList';
import styled from "styled-components";
import LivePlayer from './LiveListComponent/LivePlayer';
import VideoPlayer from './PlayListComponent/VideoPlayer';

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

class  LivePage extends React.Component{
    render(){
    return (
        <Switch>
            <StyledDiv>
                <Link style={{gridColumn: '1 / 2'}} to={'/Live/LiveList'}>
                    <Button>Live List</Button>
                </Link>
                <Link style={{gridColumn: '2 / 3'}} to={'/Live/PlayList'}>
                    <Button>Play List</Button>
                </Link>

                <div style={{gridRow: '2 / 3'}}>
                    <Route exact path="/Live" component={LiveList} />
                    <Route exact path="/Live/liveList" component={LiveList} />
                    <Route path="/Live/livePlayer/:videoId/:title" component={LivePlayer}/>
                    <Route excat path="/Live/playList" component={PlayList} />
                    <Route path="/Live/videoPlayer/:videoId/:title/:date" component={VideoPlayer}/>
                </div>
            </StyledDiv>
        </Switch>
    ) 
  }; 
}

export default LivePage;
