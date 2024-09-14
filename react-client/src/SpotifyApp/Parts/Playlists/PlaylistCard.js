import { useEffect, useState } from "react";
import { getAllMyPlaylists } from "../../../utils/apiCalls";
import './PlaylistCard.css';
import { getImageSrcFromImages } from "../../../utils/utilFuncs";


function getOwnerType(id, currentUserID) {
    if (id === 'spotify') {
        return 'spotify';
    } else if (id === currentUserID) {
        return 'me';
    } else {
        return 'other'
    }
}


export function PlaylistCard(props) {
    const data = props.data;
    const userData = props.userData;

    const playlistName = data.name;
    const owner = data.ownerName;
    const length = data.length;
    const ownerType = getOwnerType(data.ownerId, userData.userId);
    const rmBtnText = ownerType === 'me' ? 'Delete' : 'Unfollow';
    const ownerClass = ownerType + '-style';
    const imageSource = getImageSrcFromImages(data.images, 65);


    return (
        <div className={'plCard ' + ownerClass}>
            <div className="plCard-col">
                <img src={imageSource} className="playlistImage" />
            </div>
            <div className="plCard-col">
                {playlistName}: {length}
                <br/>
                {owner}
            </div>
            <div className="plCard-col">
                <button disabled="true">{rmBtnText}</button>
                <button disabled="true">Add</button>
            </div>
            <div className="plCard-col">
            </div>


        </div>
    )
}