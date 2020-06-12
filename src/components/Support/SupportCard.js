import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import axios from 'axios';
import API_URL from "../Constants/API_URL";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
    height: 280,
    float: 'left',
    margin: '10px',
    border: '1px solid gray',
    '&:hover': {
      transform: 'scale(1.02)',
      boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  headerTitle: {
    fontSize: '20px',
    fontWeight: "bold",
  },
  headerTitleSmall: {
    fontSize: '15px',
    fontWeight: "bold",
  },
  headerRoot: {
    background: "#e69cff",
    height: "40px",
  },
}));

export default function SupportCard(props) {
  const classes = useStyles();
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(API_URL + "/api/artist/" + props.artistId)
      .then(res => setArtist(res.data))
  }, [props.artistId])

  return (
    <div>
      {
        artist==null ||
        <Link to={`/support/detail/${artist.artistId}`}>
          <Card className={classes.root}>
            {
              artist.artistName.length > 20 ? (
                <CardHeader classes={{title: classes.headerTitleSmall, root: classes.headerRoot}}
                  title={artist.artistName}
                />
              ) : (
                <CardHeader classes={{title: classes.headerTitle, root: classes.headerRoot}}
                  title={artist.artistName}
                />
              )
            }
            <CardMedia
              className={classes.media}
              image={artist.imageUri}
              title={artist.artistName}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p" align='left'>
                {(artist.description.split('.')[0]).length > 55 ? artist.description.substr(0, 55) + '...' : artist.description.split('.')[0]}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      }
    </div>
  );
}
