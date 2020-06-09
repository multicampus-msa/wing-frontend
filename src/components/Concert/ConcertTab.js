import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ConcertLocation from './ConcertLocation';
import { Link } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import { LocationOn, Person, Warning } from '@material-ui/icons';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    fontSize: '20px',
    fontFamily: "NanumSquare",
    backgroundColor: '#fafafa',
    color: 'black',
  },
  box: {
    width: '1200px',
    height: '500px'
  },
  image: {
    width: theme.spacing(30),
    height: theme.spacing(30),
    display: 'flex',
    float: 'left',
    marginLeft: '100px',
    marginBottom: '20px',
    '&:hover': {
      transform: 'scale(1.05)',
    },
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  name: {
    height: '250px',
    fontSize: '30px',
    fontWeight: 'bold',
    fontFamily: 'NanumSquare',
    float: "left",
    marginLeft: '100px',
    marginTop: '50px',
    display: 'block',
    color: 'black',
    '&:hover': {
      transform: 'scale(1.05)',
    }
  },
  info: {
    marginTop: '20px',
    display: 'block',
    fontSize: '20px',
    fontFamily: "NanumSquare",
    float: 'left',
    marginLeft: '50px',
  },
  place: {
    fontWeight: 'bold',
    fontSize: '18px',
    fontFamily: 'NanumSquare',
  },
  warning: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: '23px',
    position: 'absolute',
    marginLeft: '340px',
  }
  
}));

const ConcertTab = ({place, artistList}) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="simple tabs example" centered>
            <Tab className={classes.title} icon={<Person />} label="아티스트 정보" {...a11yProps(0)} />
            <Tab className={classes.title} icon={<LocationOn />} label="공연장 위치" {...a11yProps(1)} />
            <Tab className={classes.title} icon={<Warning />} label="예매시 주의사항" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel className={classes.box} value={value} index={0}>
          {
            artistList !== undefined ? (artistList.map((artist) => {
              return (
                <>
                  <Link to={"/streaming/artist/" + artist.artistId}>
                    <Avatar className={classes.image} src={artist.imageUri} alt="아티스트이미지"/>
                  </Link>
                  <Link to={"/streaming/artist/" + artist.artistId}>
                    <div className={classes.name}>{artist.artistName}</div>
                  </Link>                  
                  <div className={classes.info}>{artist.description}</div>
                </>
              )
            }))
            :
            <span>loading...</span>
          }


        </TabPanel>
        <TabPanel value={value} index={1}>
          <p className={classes.place}>공연장 : {place}</p>
          <ConcertLocation place={place}/>
        </TabPanel>
        <TabPanel className={classes.box} value={value} index={2}>
          <h5>티켓 수령 방법 안내</h5>
          <span>현장수령</span>
          <p>
          - 예매번호가 포함되어 있는 예매확인서와 예매자의 실물 신분증(복사본 및 사진 불가) 을 매표소에 제출하시면 편리하게 티켓을 수령하실 수 있습니다.
          <br></br>
          ※ 공연별 정책이 상이하니 자세한 내용은 예매페이지 내 상세정보 확인 부탁드립니다.
          </p>
          
          <span>배송</span>
          <p>
          - 배송을 선택하신 경우 예매완료(결제익일) 기준 4~5일 이내에 예매 시 입력하신 주소로 배송됩니다. (주말/공휴일 제외한 영업일 기준)
          <br></br>
          - 일괄배송의 경우 공연 별로 배송일자가 상이하며 지정된 배송일자 기준으로 배송이 시작됩니다. (지정된 배송일자는 상세정보 및 예매공지사항에서 확인할 수 있습니다.)
          <br></br>
          - 지역 및 배송서비스 사정에 따라 배송사가 변경될 수 있으며, 배송일이 추가적으로 소요될 수 있습니다. (CJ대한통운, 우체국 외 1개 업체)
          </p>
          <h5>취소/환불 안내</h5>
          <p>
          - 취소마감시간 이후 또는 관람일 당일 예매하신 건에 대해서는 취소/변경/환불이 불가합니다.
          <br></br>
          - 예매수수료는 예매 당일 밤 12시 이전까지 취소 시 환불 가능합니다.
          <br></br>
          - 배송이 시작된 경우 취소마감시간 이전까지 멜론티켓 고객센터로 티켓을 반환해주셔야 환불이 가능하며, 도착한 일자 기준으로 취소수수료가 부과됩니다.
          (* 단, 반환된 티켓의 배송료는 환불되지 않으며 일괄배송 상품의 경우 취소에 대한 자세한 문의는 고객센터로 문의해 주시기 바랍니다.)
          <br></br>
          - 예매취소 시점과 결제 시 사용하신 신용카드사의 환불 처리기준에 따라 취소금액의 환급방법과 환급일은 다소 차이가 있을 수 있습니다.
          <br></br>
          - 티켓 부분 취소 시 신용카드 할부 결제는 티켓 예매 시점으로 적용됩니다. (무이자할부 행사기간이 지날 경우 혜택 받지 못하실 수 있으니 유의하시기 바랍니다. )
          <br></br>
          - 취소일자에 따라 아래와 같이 취소수수료가 부과됩니다.
          (예매 후 7일 이내라도 취소시점이 관람일로부터 10일 이내라면 관람일 기준의 취소수수료가 부과됩니다.)
          </p>
          <br></br>
          <br></br>
          <footer className={classes.warning}>
            Win:G는 예매관련 모든 책임을 지지 않습니다.
          </footer>
        </TabPanel>
      </div>
    );

}

export default ConcertTab;