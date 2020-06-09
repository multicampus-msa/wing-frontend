import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter } from 'react-router-dom';
import Playlist from "react-mp3-player";

const tracks = [
    {
        img: 'https://m.withdrama.net/web/product/big/20191223/27fe1214450665b2b0ef00600b0f0856.jpg',
        name: 'test',
        desc: 'Still good',
        src: 'Still good.mp'
    }
]

ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, document.getElementById('root'));
//ReactDOM.render(<Playlist tracks={tracks}/>, document.getElementById('player'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
