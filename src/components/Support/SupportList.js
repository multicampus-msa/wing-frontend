import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import {Link} from 'react-router-dom'
import SupportCard from './SupportCard';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: 'block',
        width: '1080px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '10px',
        position: 'relative',
        fontFamily: "NanumSquare",
    },
    root: {
        justifyContent: 'center',
        display: 'block',
        height: '600px',
        marginBottom: '25px',
    },
    page: {
        display: 'grid',
        justifyContent: 'center',
    },
    body: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '10px',
        textAlign: 'center',
        color: '#FFF',
        width: '1080px',
        display: 'grid',
    },
    title: {
        textAlign: 'center',
        marginBottom: '10px',
        fontWeight: 'bold',
    },
    line: {
        borderWidth: '2px',
    },
  }));

function SupportList ({match}) {
    const classes = useStyles();
    const pageNum = match.params.pageNum == null ? 1 : match.params.pageNum;
    const cardIndex = [0, 1, 2, 3, 4, 5, 6, 7];
    const pageIndex = [1, 2, 3, 4, 5];

    return (
        <div className={classes.wrapper}>
            <h2 className={classes.title}>아티스트 후원 목록</h2>
            <hr className={classes.line}/>
            <div className={classes.body}>
                <div className={classes.root}>
                    {
                        cardIndex.map((idx) => {
                            return <SupportCard key={Number(pageNum) * 8 - 7 + Number(idx)} artistId={Number(pageNum) * 8 - 7 + Number(idx)}/>
                        })
                    }
                </div>
                <div className={classes.page}>
                    <Pagination aria-label="Page navigation">
                    <PaginationItem>
                        <PaginationLink>
                        {'≪'}
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink>
                        {'<'}
                        </PaginationLink>
                    </PaginationItem>
                    {
                        pageIndex.map((idx) => {
                            return (
                                <PaginationItem>
                                    <Link to={"/support/list/" + idx}>
                                        <PaginationLink>
                                            {idx}
                                        </PaginationLink>
                                    </Link>
                                </PaginationItem>
                            );
                        })
                    }
                    <PaginationItem>
                        <PaginationLink>
                        {'>'}
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink>
                        {'≫'}
                        </PaginationLink>
                    </PaginationItem>
                    </Pagination>
                </div>
            </div>
        </div>
    )
}

export default SupportList;
