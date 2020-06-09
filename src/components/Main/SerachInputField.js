import React from 'react'
import { TextField } from "@material-ui/core";
import { withRouter } from 'react-router-dom';

const SearchInputField = ({history}) => {
    // 검색창에 엔터키 입력했을 때 처리
    const HandleKey = (e) => {
        if (e.key === "Enter") {
            e.target.value === '' ?
            alert('검색어를 입력하세요') :
            history.push(`/search/${e.target.value}`)
            e.target.value = ''
        };
    };

    return (
        <TextField placeholder="검색어를 입력하세요" size="normal" id="outlined-basic" variant="outlined"
                       onKeyPress={HandleKey}/>
    )
};

export default withRouter(SearchInputField);
