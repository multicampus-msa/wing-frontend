import React from 'react'
import { Button, withStyles } from "@material-ui/core";


const StyledButton = withStyles({
    root: {
        justifyContent: 'center',
        display: 'black',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 30,
        padding: '0 30px',
        fontSize: 15,
        gridRow: 2,
        gridColumn: 5,
        width: "98px"
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);

const LoginButton = ({ token, name, image, login, logout }) => {

    return (
        <>
            {token ?
                // todo : 로그인 시 프로필 이미지 보이게 하기
                // 이름을 누르면 마이페이지로 이동                

                <StyledButton className="logoutBtn" onClick={logout} variant="contained"
                              color="secondary">Logout</StyledButton>

                : <StyledButton className="loginBtn" onClick={login} variant="contained"
                                color="primary">Login</StyledButton>}
        </>

    );
}
export default LoginButton;
