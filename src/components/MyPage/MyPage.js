import React, {Fragment, useState, useEffect, useContext} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import API_URL from '../Constants/API_URL';
import MusicTable from '../Streaming/MusicTable'
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import UserContext from "../Context/UserContext";

import Table from '@material-ui/core/Table';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';


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


function createData(mylist){
  const result = {};
  for(const i in mylist){
    if(result.hasOwnProperty(mylist[i].artistName)){
      result[mylist[i].artistName].push({userName:mylist[i].userName, amount:mylist[i].amount, datetime:mylist[i].datetime})
    }
    else{
      result[mylist[i].artistName] = [{userName:mylist[i].userName, amount:mylist[i].amount, datetime:mylist[i].datetime}];
    }
  }
   return result;
}

function Row(props) {
  const { row } = props;
  // console.log("Row 컴포넌트")
  // console.log(row);
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();
  return (
    <Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.artistName}
        </TableCell>
        <TableCell>{Object.keys(row.history).length}회</TableCell>        
        <TableCell align="right">
        {        
            (row.history.reduce((pre, item) => {
              return pre += item.amount;
            }, 0)).toLocaleString('en-US')
         
        }원

        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                {row.artistName} 후원기록
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>후원일자</TableCell>
                    <TableCell>유저명</TableCell>
                    <TableCell align="right">후원금액</TableCell>
                    {/* <TableCell align="right">Total price ($)</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>                  
                  {row.history.sort((a, b) => {
                      const dateA = new Date(a.datetime);
                      const dateB = new Date(b.datetime);
                      return dateA < dateB ? 1 : -1;
                    }).map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.datetime}
                      </TableCell>
                      <TableCell>{historyRow.userName}</TableCell>
                      <TableCell align="right">{(historyRow.amount).toLocaleString('en-US')}원</TableCell>
                      {/* <TableCell align="right"> */}
                        {/* {Math.round(historyRow.amount * row.price * 100) / 100} */}
                      {/* </TableCell> */}
                    </TableRow>
                  ))}
                  {/* 아티스트 별로 정리, 후원 날짜순으로 정렬 */}
              
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}


const MyPage = () => {
  const classes = useStyles();  
  const userState = useContext(UserContext);
  const [likedMusicList, setLikedMusicList] = useState([]);
  const [supportedList, setSupportedList] = useState([]);
  const [rowData, setRowData] = useState({});
  const [keyList, setKeyList] = useState([]);
  useEffect(()=>{
      // 좋아요 한 음악 가져오기       
      if(userState.userId === "") return;
      axios.get(API_URL+":8003/api/music/liked/"+ userState.userId)
      .then(res =>{
        console.log(res.data); // musicIdSet에 들어있는 musicId, 
        setLikedMusicList(res.data.musicSet);
       // console.log(likedMusicList ) // empty
      })
      .catch(err=>alert("로그인하세요"))
      //후원정보 가져오기
      axios.get(API_URL+":8005/api/support/user/"+userState.userId)
      .then(res=>{
        console.log(res.data);
        setSupportedList(res.data);
        setRowData(createData(res.data));
        setKeyList(Object.keys(createData(res.data)));
      })
  }, [userState.userId]) //  [userId, likedMusicList] -> 무한 렌더링
  
// 후원 뮤지션 : Collapsible table 사용  https://material-ui.com/components/tables/#collapsible-table
  
  return (
    <>
    <CssBaseline/>
    <Container maxWidth="md">   
        <Typography component="div" style={{backgroundColor: "whitesmoke", margin:'auto',}}>
            <div align="center">
              <Avatar src = {userState.imageUrl } alt = "Profile Image"/>
              <h3>{userState.name}님 안녕하세요</h3>
              {/* 간격 띄어쓰기 */}
              <div align="left">
                <h4>{userState.name}님이 좋아하는 음악 입니다</h4>
              </div>
            </div>
        </Typography>
           
        <Typography component="table" style={{backgroundColor: "whitesmoke", width: '40vw', height: '50vh'}}>
              <MusicTable musicList={likedMusicList} />  
        </Typography>
    

        <Typography component="table" style={{backgroundColor: "whitesmoke", width: '40vw', height: '50vh'}}>
          <h4>{userState.name}님이 후원하는 아티스트 입니다</h4> 
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>아티스트 이름</TableCell>
                  <TableCell>총 후원 횟수</TableCell>
                  <TableCell>총 후원금액</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>                
                {                  
                  keyList.sort((a, b) => {
                    return Object.keys(rowData[a]).length < Object.keys(rowData[b]).length ? 1 : -1;
                  }).map(obj => {
                    return (
                      <Row row={{artistName: obj, history: rowData[obj]}}/>
                    )
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>          
        </Typography>
    </Container>
    </>
  );
}
export default MyPage;