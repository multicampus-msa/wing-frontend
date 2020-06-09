import React , {useEffect } from 'react';
import ConcertPoster from './ConcertPoster';
import { makeStyles } from '@material-ui/core/styles';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: 'block',
        width: '1200px',
        height: '1200px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '10px',
        position: 'relative',
        fontFamily: "NanumSquare",
    },
    root: {
        justifyContent: 'center',
        display: 'block',
        height: '300px',
        marginBottom: '100px',
    },
    body: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '50px',
        textAlign: 'center',
        color: '#FFF',
        width: '1080px',
        height: '800px',
        display: 'block',
    },
    title: {
        textAlign: 'center',
        marginBottom: '10px',
        fontWeight: 'bold',
    },
    line: {
        borderWidth: '2px',
    },
    page: {
        display: 'block',
        bottom: 0,
        clear: 'both',
        width: '450px',
        marginLeft: 'auto',
        marginRight: 'auto',
    }
  }));

const ConcertList = () => {
    const classes = useStyles();
    const index = [0, 1, 2, 3];

    useEffect(() => {
          window.scrollTo(0,0);
      }, []);

    const pageIndex = [1, 2, 3, 4, 5];    
    
    return (
        <>
            <div className={classes.wrapper} >
                <h2 className={classes.title}>콘서트 목록</h2>
                <hr className={classes.line}/>
                <div className={classes.body}>               
                    <div className={classes.root}>
                    {
                        index.map((id) => 
                            <ConcertPoster concertId={id + 1}/>
                        )
                    }
                    </div>
                </div>

            </div>
            <footer className={classes.page}>
            <Pagination size="lg" aria-label="Page navigation example">
                <PaginationItem>
                    <Link to={"/concert"}>
                        <PaginationLink first />                                            
                    </Link>
                </PaginationItem>
                {
                    pageIndex.map((idx) => {
                        return (
                            <PaginationItem>
                                <Link to={"/concert/" + idx}>
                                    <PaginationLink>
                                        {idx}
                                    </PaginationLink>
                                </Link>
                            </PaginationItem>
                        );
                    })
                }
                <PaginationItem>
                    <Link to={"/concert/5"}>
                        <PaginationLink last/>                    
                    </Link>
                </PaginationItem>
            </Pagination>
            </footer>
        </>
    )
}

export default ConcertList;
