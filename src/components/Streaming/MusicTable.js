import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Checkbox, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom"
import styled from "styled-components"
import axios from 'axios'
import API_URL from "../Constants/API_URL";
import UserContext from "../Context/UserContext";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const ButtonDiv = styled.div`
  margin-bottom: 1rem;
  
  button {
    box-shadow: none;
    background: white;
    border-color: silver;
    border-radius: 6px 6px 6px 6px;
    border-width: 1px;
    margin-right: 1rem;
    font-family: sans-serif;
  }

`

export default function ({ musicList }) {
    const classes = useStyles();
    const [checked, setChecked] = useState({})
    const [riseUseEffect, setRiseUseEffect] = useState(false);
    const userState = useContext(UserContext);

    useEffect(() => {
        axios.get(API_URL + "/api/user/liked/" + userState.userId)
            .then(res => {
                setChecked(res.data.musicIdSet);
                console.log("useEffect 완료")
            })
            .catch(() => {
                console.log("미로그인 오류")
        })
    }, [userState.userId, riseUseEffect])



    if (musicList === undefined)
        return (
            <div>로딩</div>
        )


    return (
        <>
            <ButtonDiv>
                <button>
                    <img
                        src="https://image.shutterstock.com/image-vector/play-sign-flat-style-icon-260nw-376854928.jpg"
                        alt="듣기"
                        style={{ width: "25px", height: "25px" }}
                    />
                    듣기
                </button>
                <button>
                    <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEX///8eIB0AAAAaHBkuLy3p6ekABQAIDAaOj46io6L6+vqWl5aTlJOam5rw8PCWlpWrq6oXGRVrbGuJiokSFRFGR0Xb29uvr68mKCZyc3Hq6uq8vbzGxsU/QD7ExMS1trVfYF5VVlQ0NTPd3d1cXVsLMkcOAAAEL0lEQVR4nO3dWVviMACF4TRlXy0UBxxQxPn/v3GsMnRJS5PaLIc535Ve8CSvoSliLUIwxoqt5rv9br7yPQ17/ZajJE5G8uh7IrY6yuirWD77noqlovhbGCUn31Ox0+t1CT970EVcjHPhm+/JWGmSC0dT35OxEoX4UYgfhfhRiB+F+FGIH4X4UYgfhfhRiB+F+FGIH4X4UYgfhfhRiB+F+FGIH4X4UYgfhfhRiB+F+FGIH4X4UYgfhfhRiB+F+FGIH4X4UYgfhfhRiB+F+FGIH4X4UYgfhfhRiB+F+FGIH4X4UYgfhfhRiB+F+FGIH5rwuD1vpkZ35u4sfJluzhPndx5+l+M0lfLJ4CFdhVM5StOx3JhO8We9X2crl/qP6ShcXm8hLc/Gs/xB09uNq+Va+0HdhOt8KJc3kB7Et8nKue6DOgmX+U3Ak123yXZpmA9rQOwiXJZGmnWdsHHPxXG1iR2E8/JA7j5UYVUaWJdoLiwDo7G7NRS7pEzU2m6MhesyMHV5vjiWx9Y7aZgKl9VBPn46bZOm1dEX7Y8xFC6qQzj+tAHlB9y+imbCeXWAX31M2ySF2HosGgmVFXQOrCG27agmwnUAQHOigVBZQZNX+D1mSNQXhgI0JWoLwwEabje6wklAQLOThqYwpBXMUojNp349YVgrmKW/ilrC0FYwS/tY1BGGt4JZujuqhjBMoDaxXRgqUJfYKgwXqElsEyrAoN4Y19luWoTbgFcwS/l1Tj1p3BeGvYJZClE59d8VKisYHFDj1H9PGP4KZrUdi3eECCuY1bKjNgtRgG3ERiEOsIXYJEQC1uyoBWKDEAtYQ8y3m3ohGrDmfcDbSaNWqAAN/qjsK4X479RfJ0QENr+AqxHiPUW/azgWVSHmCmbV76iKEBfYQKwKkYH1xIrQLXDV+zUANcSy0D4wR83WkZT7Rc+XAag76rIgfLINXG1jKQfLL9QwlXEUxTIa9jtG9bw4uuRfx5exXeDHePSF2n+u4yy6XleRJJZXsVhc/rb3FZTXAdJL6RK1vo+Ee0SrQLG9PUXkm9jdfpzJqedxdIn9bzL7HHUWhedL/9eNVY9FR8BZYdi9KA7V/1VV1T8l1QH1r9/UrSiMLAvbV1H/6k39nArbVtEG0LHwPtEK0LXwHlHncrgOuRY2Ey0B3QubiLaAHoT1RGtAH8I6oj2gF6FKtAj0I6wSbQI9CctEObE5lCdhkWgX6E2YEy0D/Qk/f9tO4yhOrb9t6E8onjeJjA/W/2/Co9BRFOJHIX4U4kchfhTiRyF+FOJHIX4U4kchfhTiRyF+FOJHIX4U4kchfhTi9z8Lhy/DR+hl2CSM5KMUNQkfMgrxoxA/sfc9A8sNxCb1PQerpQfxqvtPgpjJoxDnke9ZWEwesldxf2SaxI9Ykn4DhThuToNH7HRw/sEmjHXqL1G4T9s9MWJzAAAAAElFTkSuQmCC"
                        alt="다운"
                        style={{
                            width: "17px",
                            height: "17px",
                            marginTop: "1px",
                            marginBottom: "1px",
                            marginRight: "5px"
                        }}
                    />
                    다운
                </button>
            </ButtonDiv>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox"><Checkbox/></TableCell>
                            <TableCell>곡정보</TableCell>
                            <TableCell>아티스트</TableCell>
                            <TableCell align="right">좋아요</TableCell>
                            <TableCell align="right">다운</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            musicList.map((row) => (
                                <TableRow key={row.musicName}>
                                    <TableCell padding="checkbox"><Checkbox/></TableCell>
                                    <TableCell style={{ fontSize: "17px" }}>
                                        <RouterLink style={{ color: "black" }} to={"/streaming/music/" + row.musicId}>
                                            <img
                                                src="https://icons-for-free.com/iconfiles/png/512/file+menu+page+paper+icon-1320165846955357008.png"
                                                alt="lyrics"
                                                style={{ display: "inline", width: "22px", height: "22px" }}
                                            />
                                        </RouterLink>
                                        <Link href={row.fileUri} style={{ color: "black" }}>
                                            {row.musicName}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {row.artistList.map(artist => {
                                            return (
                                                <RouterLink style={{color: "black"}} to={"/streaming/artist/" + artist.artistId}>
                                                    {artist.artistName}
                                                </RouterLink>
                                            )
                                        })}
                                    </TableCell>
                                    <TableCell align="right">
                                        {
                                            userState.userId == null || (!checked.hasOwnProperty(row.musicId)) ?
                                                <img
                                                    onClick={() => {
                                                        // 좋아요 api post
                                                        axios.post(API_URL + "/api/user/liked", {
                                                            musicId: row.musicId,
                                                            userId: userState.userId
                                                        }).then(res => {
                                                            setRiseUseEffect(!riseUseEffect);
                                                            console.log(res)
                                                        })
                                                    }}
                                                    src="https://icons-for-free.com/iconfiles/png/512/heart-131965017458786724.png"
                                                    alt="like"
                                                    style={{ display: "inline", width: "35px", height: "35px" }}
                                                />

                                                :
                                                <img
                                                    onClick={() => {
                                                        axios.delete(API_URL + "/api/user/liked", {
                                                            data: {
                                                                musicId: row.musicId,
                                                                userId: userState.userId
                                                            }
                                                        }).then(res => {
                                                            setRiseUseEffect(!riseUseEffect);
                                                            console.log(res)
                                                        })
                                                    }}
                                                    src="https://i.ibb.co/f8y1tG4/liked.png"
                                                    alt="liked"
                                                    style={{ display: "inline", width: "35px", height: "35px" }}
                                                />
                                        }
                                    </TableCell>
                                    <TableCell align="right">
                                        <div>
                                            <Link href={row.fileUri}>
                                                <img
                                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEX///8eIB0AAAAaHBkuLy3p6ekABQAIDAaOj46io6L6+vqWl5aTlJOam5rw8PCWlpWrq6oXGRVrbGuJiokSFRFGR0Xb29uvr68mKCZyc3Hq6uq8vbzGxsU/QD7ExMS1trVfYF5VVlQ0NTPd3d1cXVsLMkcOAAAEL0lEQVR4nO3dWVviMACF4TRlXy0UBxxQxPn/v3GsMnRJS5PaLIc535Ve8CSvoSliLUIwxoqt5rv9br7yPQ17/ZajJE5G8uh7IrY6yuirWD77noqlovhbGCUn31Ox0+t1CT970EVcjHPhm+/JWGmSC0dT35OxEoX4UYgfhfhRiB+F+FGIH4X4UYgfhfhRiB+F+FGIH4X4UYgfhfhRiB+F+FGIH4X4UYgfhfhRiB+F+FGIH4X4UYgfhfhRiB+F+FGIH4X4UYgfhfhRiB+F+FGIH4X4UYgfhfhRiB+F+FGIH4X4UYgfhfhRiB+F+FGIH5rwuD1vpkZ35u4sfJluzhPndx5+l+M0lfLJ4CFdhVM5StOx3JhO8We9X2crl/qP6ShcXm8hLc/Gs/xB09uNq+Va+0HdhOt8KJc3kB7Et8nKue6DOgmX+U3Ak123yXZpmA9rQOwiXJZGmnWdsHHPxXG1iR2E8/JA7j5UYVUaWJdoLiwDo7G7NRS7pEzU2m6MhesyMHV5vjiWx9Y7aZgKl9VBPn46bZOm1dEX7Y8xFC6qQzj+tAHlB9y+imbCeXWAX31M2ySF2HosGgmVFXQOrCG27agmwnUAQHOigVBZQZNX+D1mSNQXhgI0JWoLwwEabje6wklAQLOThqYwpBXMUojNp349YVgrmKW/ilrC0FYwS/tY1BGGt4JZujuqhjBMoDaxXRgqUJfYKgwXqElsEyrAoN4Y19luWoTbgFcwS/l1Tj1p3BeGvYJZClE59d8VKisYHFDj1H9PGP4KZrUdi3eECCuY1bKjNgtRgG3ERiEOsIXYJEQC1uyoBWKDEAtYQ8y3m3ohGrDmfcDbSaNWqAAN/qjsK4X479RfJ0QENr+AqxHiPUW/azgWVSHmCmbV76iKEBfYQKwKkYH1xIrQLXDV+zUANcSy0D4wR83WkZT7Rc+XAag76rIgfLINXG1jKQfLL9QwlXEUxTIa9jtG9bw4uuRfx5exXeDHePSF2n+u4yy6XleRJJZXsVhc/rb3FZTXAdJL6RK1vo+Ee0SrQLG9PUXkm9jdfpzJqedxdIn9bzL7HHUWhedL/9eNVY9FR8BZYdi9KA7V/1VV1T8l1QH1r9/UrSiMLAvbV1H/6k39nArbVtEG0LHwPtEK0LXwHlHncrgOuRY2Ey0B3QubiLaAHoT1RGtAH8I6oj2gF6FKtAj0I6wSbQI9CctEObE5lCdhkWgX6E2YEy0D/Qk/f9tO4yhOrb9t6E8onjeJjA/W/2/Co9BRFOJHIX4U4kchfhTiRyF+FOJHIX4U4kchfhTiRyF+FOJHIX4U4kchfhTi9z8Lhy/DR+hl2CSM5KMUNQkfMgrxoxA/sfc9A8sNxCb1PQerpQfxqvtPgpjJoxDnke9ZWEwesldxf2SaxI9Ykn4DhThuToNH7HRw/sEmjHXqL1G4T9s9MWJzAAAAAElFTkSuQmCC"
                                                    alt="다운"
                                                    style={{
                                                        width: "23px",
                                                        height: "23px",
                                                        marginRight: "5px",
                                                        marginBottom: "3px"
                                                    }}
                                                />
                                            </Link>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}