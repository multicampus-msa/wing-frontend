import React, { Fragment, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components'
import MenuButtons from "./Main/MenuButtons";
import axios from 'axios'
import LOGO_URL from "./Constants/LOGO_URL";
import LoginButton from './Main/LoginButton';
import Root from './Root'
import UserContext from "./Context/UserContext";
import Avatar from "@material-ui/core/Avatar";
import API_URL from "./Constants/API_URL";

const LogoDiv = styled.div`
  display: grid;
  grid-template-columns: 300px 300px 175px 100px 150px;
  grid-template-rows: 50px 25px 45px;
  justify-content: center;
  font-family: "NanumSquare", sans-serif;
  font-weight: bold;
  font-size: large;
  
  .avatar {
    margin-left: 1rem;
    margin-top: -0.9rem;
    grid-column: 4;
    grid-row: 2;
  }
  
  .MuiAvatar-root {
    width: 70px;
    height: 70px;
  }
  
  .logo {
    margin-left: 2rem;
    grid-column: 2;
    grid-row: 1;
  }
  
  .loginButton {
    margin-left: 1.5rem;
    grid-column: 5;
    grid-row: 3;
  }
  
  .hello {
    margin-top: 2rem;
    grid-column: 5;
    grid-row: 1;
  }
  
  .userName {
    grid-column: 5;
    grid-row: 2;
  }
`

const ButtonDiv = styled.div`

    display: flex;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
`

const Menu = ({ history }) => {

    const [token, setToken] = useState(null);
    const [auth2, setAuth2] = useState(null);
    const [userState, setUserState] = useState({
        userId: "",
        name: "",
        email: "",
        imageUrl: "",
    })

    const login = () => {
        auth2.signIn().then(googleUser => {
            let profile = googleUser.getBasicProfile();
            const data = {
                userId: profile.getId(),
                name: profile.getName(),
                email: profile.getEmail(),
                imageUrl: profile.getImageUrl(),
                role: "USER",
            }

            setUserState({
                ...userState,
                userId: profile.getId(),
                name: profile.getName(),
                email: profile.getEmail(),
                imageUrl: profile.getImageUrl(),
            })

            const targetUrl = API_URL + ':8002/api/user/save'
            console.log(data);
            axios.post(targetUrl, data)
                .then(response => {
                    console.log(response)
                })
                .catch(function (error) {
                    console.log(error);
                })
            // console.log('ID : '+profile.getId());
            // console.log('Name : '+profile.getName());
            // console.log('Image URL : '+profile.getImageUrl());
            // console.log('Email : '+profile.getEmail());
            setToken(googleUser.getAuthResponse().id_token)
            window.sessionStorage.setItem("token", googleUser.getAuthResponse().id_token);
            window.sessionStorage.setItem("userState", JSON.stringify(data));
        })
    }
    const logout = () => {
        if (auth2 === null)
            googleSDK()
        setToken(null);
        setUserState(
            {
                userId: "",
                name: "",
                email: "",
                imageUrl: ""
            }
        )
        console.log("로그아웃 합니다");
        if (auth2) auth2.disconnect();

        window.sessionStorage.clear()
        
        history.push("/Home");
    }
    const googleSDK = () => {
        // platform.js 스크립트 로드 후 .. 
        window['googleSDKLoaded'] = () => {
            window['gapi'].load('auth2', () => {
                setAuth2(window['gapi'].auth2.init({
                    client_id: '4141518158-olfgnnv29g8163c0v5saq6dorpg806l2.apps.googleusercontent.com',
                    cookiepolicy: 'single_host_origin',
                    scope: 'profile email'
                }));
            })
        }
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'google-jssdk'));
    }
    useEffect(() => { // token 값이 업데이트 될 때만 실행
        const storageToken = window.sessionStorage.getItem("token")
        const storageState = window.sessionStorage.getItem("userState")
        if (token === null && storageToken) {
            setToken(storageToken)
            setUserState(JSON.parse(storageState))
        }
        else if (token === null)
            googleSDK();
    }, [token]);

    return (
        <UserContext.Provider value={userState}>
            <Fragment>
                <LogoDiv>
                    <div className="logo">
                        <Link to="/"><img src={LOGO_URL}
                                          alt="Win:G 로고"
                                          style={{ width: "330px", height: "120px" }}
                        /></Link>
                    </div>

                    <div className="avatar">
                        {
                            token ?
                                <>
                                    <Link to={"/mypage/" + userState.name}>
                                        <Avatar alt="Remy Sharp" src={userState.imageUrl}/>
                                    </Link>
                                </>
                                : <p></p>
                        }
                    </div>

                    <div className="hello">
                        {token ? <p>안녕하세요 </p> : <p></p>}
                    </div>

                    <div className="userName">
                        {token ? <p>{userState.name} 님^^</p> : <p></p>}
                    </div>

                    <div className="loginButton">
                        <LoginButton token={token} name={userState.name} login={login} logout={logout}/>
                    </div>
                </LogoDiv>
                <ButtonDiv>
                    <MenuButtons/>
                </ButtonDiv>
                <hr/>
                <Root/>
            </Fragment>
        </UserContext.Provider>
    )
};

export default withRouter(Menu);