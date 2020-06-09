import React from 'react'
import MusicDetailForm from "./MusicDetailForm";
import MusicDetailTemplate from "./MusicDetailTemplate";

const MusicDetailPage = ({ match }) => {

    return (
        <MusicDetailTemplate>
            <MusicDetailForm id={match.params.id}/>
        </MusicDetailTemplate>
    )
}

export default MusicDetailPage