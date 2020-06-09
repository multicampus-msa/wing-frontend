import React, {useState, useEffect} from 'react';
import API_URL from "../Constants/API_URL";
import axios from 'axios';
import MusicTable from '../Streaming/MusicTable';

const MusicSearch = ({searchWord}) => {

    const [musicList, setMusicList] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get(API_URL + `/api/music/name=${searchWord}`)
            .then(res => {
                setMusicList(res.data)
            })
            .catch(err => alert(err))
    }, [searchWord])

    return (
        <>
            <p style={{ fontSize: "28px", borderBottom: "1px solid", borderColor: "#c2c2c2", width: "900px" }}><b>곡</b> ({musicList.length})</p>
            {
                musicList.length === 0 ? (
                    <p style={{ fontSize: "18px", borderBottom: "1px solid", borderColor: "#c2c2c2", width: "900px", marginBottom: '20px' }}>
                        <b>'{searchWord}'</b>(으)로 검색한 결과가 없습니다.
                    </p>
                ) : (
                    <MusicTable musicList={musicList}/>
                )
            }
        </>
    )
}

export default MusicSearch;
