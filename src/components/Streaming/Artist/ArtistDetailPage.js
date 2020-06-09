import React from "react";
import ArtistDetailTemplate from "./ArtistDetailTemplate";
import ArtistDetailForm from "./ArtistDetailForm";

const ArtistDetailPage = ({ match }) => {

    return (
        <ArtistDetailTemplate>
            <ArtistDetailForm id={match.params.id}/>
        </ArtistDetailTemplate>
    )
}

export default ArtistDetailPage