import React, {useState, useEffect, useContext} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components'
import axios from 'axios';
import API_URL from '../Constants/API_URL';
import MusicTable from '../Streaming/MusicTable'
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import UserContext from "../Context/UserContext";

import Table from '@material-ui/core/Table';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';


import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        '& > *': {
        margin: theme.spacing(1),
      },
    },
    inline: {
        display: 'inline',
    },
    table: {
      minWidth: 650,
  },
}));

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [  // 동적으로 데이터를 넣자
  createData('아티스트 A', Date().toString(), 6.0, 24, 4.0, 3.99),
  createData('아티스트 B', 237, 9.0, 37, 4.3, 4.99),
  createData('아티스트 C', 262, 16.0, 24, 6.0, 3.79),
  createData('아티스트 D', 305, 3.7, 67, 4.3, 2.5),
];


const MyPage = () => {
  const classes = useStyles();  
  const userState = useContext(UserContext);
  const [likedMusicList, setLikedMusicList] = useState([]);

 // const [supportingMusician, setSupportingMusician] = useState({});
  useEffect(()=>{
      // 좋아요 한 음악 가져오기       
      if(userState.userId === "") return;
      axios.get(API_URL+"/api/user/liked/"+ userState.userId)
      .then(res =>{
        console.log(res.data); // musicIdSet에 들어있는 musicId, 
        setLikedMusicList(res.data.musicSet);
        console.log(likedMusicList ) // empty
      })
      .catch(err=>alert("로그인하세요"))
      //axios.get(API_URL+"/api/mypage/likedmusic")

  }, [userState.userId]) //  [userId, likedMusicList] -> 무한 렌더링
  
// 후원 뮤지션 : Collapsible table 사용  https://material-ui.com/components/tables/#collapsible-table
  
  return (
    <>
    <CssBaseline/>

    <Container maxWidth="md">   
        <Typography component="div" style={{backgroundColor: "whitesmoke", width: '60vw', height: '20vh'}}>
            <div align="center">
              <Avatar src = {userState.imageUrl } alt = "Profile Image"/>
              <h3>{userState.name}님 안녕하세요</h3>
              {/* 간격 띄어쓰기 */}
              <div align="left">
                <h4>{userState.name}님이 좋아하는 음악 입니다</h4>
              </div>
            </div>
        </Typography>
           
        <Typography component="table" style={{backgroundColor: "whitesmoke", width: '60vw', height: '50vh'}}>
              <MusicTable musicList={likedMusicList} />  
        </Typography>
    

        <Typography component="table" style={{backgroundColor: "whitesmoke", width: '60vw', height: '50vh'}}>
          <h4>{userState.name}님이 후원하는 아티스트 입니다</h4> 
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>아티스트 이름</TableCell>
                  <TableCell align="right">후원일자</TableCell>
                  <TableCell align="right">후원금액</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <Row key={row.name} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>          
        </Typography>
    </Container>
    </>
  );
}
export default MyPage;