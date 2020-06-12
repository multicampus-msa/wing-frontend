import React, {useState, useEffect, useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import queryString from 'query-string';
import axios from 'axios';
import API_URL from "../Constants/API_URL";

import {withRouter} from 'react-router-dom';
import UserContext from "../Context/UserContext";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch'
        }
    }
}));

function SupportPayment({history, match}) {

    const classes = useStyles();
    const [amount,
        setAmount] = React.useState('');
    const [buyerName,
        setBuyerName] = React.useState('');
    const [buyerTel,
        setBuyerTel] = React.useState('');
    const [buyerEmail,
        setBuyerEmail] = React.useState('');
    const [artist, setArtist] = useState([]);

    const userState = useContext(UserContext);

    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get(API_URL + "/api/artist/" + match.params.artistId)
          .then(res => setArtist(res.data))
          .catch(err => alert(err))
        setBuyerName(userState.name)
        setBuyerEmail(userState.email)
    }, [match.params.artistId, userState.name])

    function handleClick() {
        if (amount === '' || buyerName === '' || buyerTel === '' || buyerEmail === '') {
            alert('입력 형식이 잘못되었습니다.');
        } else if (Number(amount) === 0) {
            alert('후원 금액이 0원 입니다.');
        } else {
            const userCode = 'imp32346360';
            const {IMP} = window;
            if (amount == null || buyerName) 
                IMP.init(userCode);
            IMP.request_pay({
                pg: 'html5_inicis',
                pay_method: 'card',
                merchant_uid: 'artist_' + String(artist.artistId) + '_' + new Date().getTime(),
                name: String(artist.artistName) + ' 후원',
                amount: Number(amount),
                buyer_email: String(buyerEmail),
                buyer_name: String(buyerName),
                buyer_tel: String(buyerTel)
            }, callback);
        }
    };

    function callback(response) {
        const query = queryString.stringify(response);
        const date = new Date(response.paid_at * 1000);
        if (response.success) {
            axios.post(API_URL + ":8005/api/support/", {
                "amount": response.paid_amount,
                "artistId": artist.artistId,
                "datetime": String(date.toISOString().substr(0, 10)) + ' ' + String(date.toString().substr(16, 8)),
                "uid": response.merchant_uid,
                "userId": userState.userId,
              }).then(history.push(`/support/result?${query}`))
              .catch(err => alert(err));
        } else {
            history.push(`/support/result?${query}`);
        }
    }

    return (
        <Wrapper>
            <Header>{artist.artistName} 후원하기</Header>
            <form className={classes.root} noValidate autoComplete="off">
                <TextFieldWrapper>
                    <TextField
                        id="amount"
                        label="후원 금액"
                        type="number"
                        value={amount}
                        onChange={(event) => setAmount(event.target.value)}/>
                </TextFieldWrapper>
                <TextFieldWrapper>
                    <TextField
                        id="buyer_name"
                        label="후원자 이름"
                        value={buyerName}
                        onChange={(event) => setBuyerName(event.target.value)}/>
                </TextFieldWrapper>
                <TextFieldWrapper>
                    <TextField
                        id="buyer_tel"
                        label="후원자 전화번호"
                        type="number"
                        value={buyerTel}
                        onChange={(event) => setBuyerTel(event.target.value)}/>
                </TextFieldWrapper>
                <TextFieldWrapper>
                    <TextField
                        id="buyer_email"
                        label="후원자 이메일"
                        value={buyerEmail}
                        onChange={(event) => setBuyerEmail(event.target.value)}/>
                </TextFieldWrapper>
            </form>
            <br/>
            <div className={classes.root}>
                <Button variant="contained" onClick={() => handleClick()}>
                    후원하기
                </Button>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div `
  padding: 5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: NanumSquare;
`;

const TextFieldWrapper = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Header = styled.div `
  font-weight: bold;
  text-align: center;
  padding: 2rem;
  padding-top: 0;
  font-size: 3rem;
`;

export default withRouter(SupportPayment);
