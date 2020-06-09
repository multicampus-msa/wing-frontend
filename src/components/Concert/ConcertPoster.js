import React, {useState, useEffect} from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import API_URL from "../Constants/API_URL";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
      width: 300,
      height: 400,
      float: 'left',
      margin: '30px',
      border: '1px solid gray',
      '&:hover': {
        transform: 'scale(1.05)',
      },
      position: 'relative'
    },
    media: {
      height: 390,
      paddingBottom: '20%',
      margin: 'auto',
      maxWidth: 300,
      justifyContent: 'center',
      
    },
    headerTitle: {
      fontSize: '20px',
      fontWeight: "bold",
    },
    headerRoot: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      height: "40px",
    },
    text: {
      fontWeight: 'bold',
      fontSize: '20px',
      fontFamily: 'NanumSquare',
      height: 30,
      bottom: 32,
      position: 'absolute',
    }
}));

const ConcertPoster = ({concertId}) => {
  const classes = useStyles();
  const [concert, setConcert] = useState({});

  useEffect(() => {
    axios.get(API_URL + '/api/concert/' + concertId)
      .then(res => setConcert(res.data));
  },[concertId]);


  return (
    <div>
      {
        concert==null ||
        <Link to={`/concert/detail/${concert.concertId}`}>
          <Card className={classes.root}>
            <CardMedia
              component="img"
              className={classes.media}
              image={concert.imageUri}
              title={concert.concertName}
            />
            <CardContent >
              <Typography variant="h6" component="div" className={classes.text} align="left">
                {concert.concertName}
              </Typography>
            </CardContent>
            
          </Card>
        </Link>
      }
    </div>
  );
}

export default ConcertPoster;