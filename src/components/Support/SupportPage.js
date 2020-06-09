import React from 'react';
import SupportList from './SupportList';
import SupportDetail from './SupportDetail';
import SupportPayment from './SupportPayment';
import SupportPaymentResult from './SupportPaymentResult'
import { Route, Switch } from 'react-router-dom';

const SupportPage = () => {
    return (
        <>
            <Switch>
                <Route exact path="/support" component={SupportList}/>
                <Route exact path="/support/list/:pageNum" component={SupportList}/>
                <Route exact path="/support/detail/:artistId" component={SupportDetail}/>
                <Route excat path="/support/payment/:artistId" component={SupportPayment}/>
                <Route excat path="/support/result/" component={SupportPaymentResult}/>
            </Switch>
        </>
    )
}

export default SupportPage;
