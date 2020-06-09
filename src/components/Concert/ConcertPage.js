import React from 'react';
import {Route , Switch} from 'react-router-dom';
import ConcertList from './ConcertList';
import ConcertDetail from './ConcertDetail';


const ConcertPage = () => {
    return (
        <Switch>
            <Route exact path="/concert" component={ConcertList}/>
            <Route exact path="/concert/:pageNumber" component={ConcertList}/>
            <Route exact path="/concert/detail/:concertId" component={ConcertDetail}/>
        </Switch>
    )
}

export default ConcertPage;