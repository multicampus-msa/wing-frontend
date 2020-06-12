import React from 'react';
import Route from 'react-router-dom/es/Route'
import HomePage from './Home/HomePage'
import LivePage from './Live/LivePage'
import StreamingPage from './Streaming/StreamingPage'
import SupportPage from './Support/SupportPage'
import ConcertPage from './Concert/ConcertPage'
import SearchPage from './Search/SearchPage';
import MyPage from './MyPage/MyPage';

function Root() {
    return (
        <>
            <Route exact path="/" component={HomePage}/>
            <Route path="/home" component={HomePage}/>
            <Route path="/streaming" component={StreamingPage}/>
            <Route path="/live" component={LivePage}/>
            <Route path="/support" component={SupportPage}/>
            <Route path="/concert" component={ConcertPage}/>
            <Route path="/search/:searchWord" component={SearchPage}/>
            <Route path="/mypage/:userName" component={MyPage}/>
        </>
    );
}

export default Root;