import React from 'react'
import AlbumDetailTemplate from "./AlbumDetailTemplate";
import AlbumDetailForm from "./AlbumDetailForm";

const AlbumDetailPage = ({ match }) => {

    return (
        <AlbumDetailTemplate>
            <AlbumDetailForm id={match.params.id}/>
        </AlbumDetailTemplate>
    )
}

export default AlbumDetailPage